// volume-processor.js
class VolumeProcessor extends AudioWorkletProcessor {
    process(inputs, outputs, parameters) {
      const input = inputs[0];
      const output = outputs[0];
      let sum = 0;
      for (let channel = 0; channel < input.length; channel++) {
        const inputChannel = input[channel];
        for (let i = 0; i < inputChannel.length; i++) {
          sum += Math.abs(inputChannel[i]);
        }
      }
      // Post the volume to the main thread, normalized to 0-100
      const volume = (sum / input[0].length) * 10000; // Adjust multiplier as needed for sensitivity
      this.port.postMessage({ volume });
      return true; // Keep processor alive
    }
  }
  
  registerProcessor('volume-processor', VolumeProcessor);
  