class WebSocketAudioProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this.webSocket = null;
    }
  
    process(inputs, outputs, parameters) {
      const input = inputs[0];
      const output = outputs[0];
  
      if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
        const audioData = input[0];
        const dataToSend = new Float32Array(audioData);
        this.webSocket.send(dataToSend);
      }
  
      return true;
    }
  
    onmessage(event) {
      if (event.data.type === 'connect') {
        this.webSocket = new WebSocket(event.data.url);
        this.webSocket.onopen = () => {
          this.port.postMessage({ type: 'connected' });
        };
        this.webSocket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
      } else if (event.data.type === 'disconnect') {
        if (this.webSocket) {
          this.webSocket.close();
          this.webSocket = null;
        }
      }
    }
  }
  
  registerProcessor('web-socket-audio-processor', WebSocketAudioProcessor);