// my-audio-processor.js
class MyAudioProcessor extends AudioWorkletProcessor {
    constructor(options) {
        super();
        this.port.onmessage = this.handleMessage.bind(this);
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        const output = outputs[0];

        // 오디오 데이터 처리 로직 (예: 단순 복사)
        for (let channel = 0; channel < input.length; ++channel) {
            output[channel].set(input[channel]);
        }

        // 필요한 경우 WebSocket을 통해 데이터 전송 로직 추가
        // 예제: 첫 번째 입력의 첫 번째 채널에서 첫 번째 샘플을 전송
        if (inputs[0].length > 0 && inputs[0][0].length > 0) {
            const firstSample = inputs[0][0][0];
            this.port.postMessage(firstSample);
        }
        return true; // 오디오 프로세싱 계속 유지
    }

    handleMessage(event) {
        // WebSocket 연결 관리나 데이터 전송 관련 메시지 처리
    }
}

registerProcessor('my-audio-processor', MyAudioProcessor);
