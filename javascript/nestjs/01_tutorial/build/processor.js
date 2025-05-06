class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.webSocket = null;
        this.port.onmessage = this.onMessage.bind(this);
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0][0];
        const buffer = new ArrayBuffer(input.length * 2); // 16-bit samples
        const view = new DataView(buffer);
        for (let i = 0; i < input.length; i++) {
            // convert from [-1, 1] float to [0, 65535] integer
            const s = Math.max(-1, Math.min(1, input[i]));
            view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
        if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.send(buffer); // send raw data
        }

        // 음량 계산
        let currentVolume = 0;
        for (let i = 0; i < input.length; i++) {
            const sample = Math.abs(input[i]); // 절댓값으로 음량 계산
            currentVolume = Math.max(currentVolume, sample); // 최대값 추출
        }
        this.port.postMessage({ volume: currentVolume });

        return true;
    }

    onMessage(event) {
        if (event.data.type === 'connect') {
            this.webSocket = new WebSocket(event.data.url);
            this.webSocket.onopen = () => console.log("WebSocket connected");
            this.webSocket.onerror = (error) => console.error("WebSocket error:", error);
            this.webSocket.onmessage = (event) => console.log('Received message from server:', event.data);
        } else if (event.data.type === 'disconnect') {
            this.webSocket?.close();
            this.webSocket = null;
        }
    }
}

registerProcessor('audio-processor', AudioProcessor);