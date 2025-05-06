// my-worklet-processor.js
class MyWorkletProcessor extends AudioWorkletProcessor {
    process(inputs, outputs, parameters) {
        const input = inputs[0];
        const output = outputs[0];

        for (let channel = 0; channel < input.length; ++channel) {
            const inputChannel = input[channel];
            const outputChannel = output[channel];
            for (let i = 0; i < inputChannel.length; i++) {
                // convert from [-1, 1] float to [0, 65535] integer
                const s = Math.max(-1, Math.min(1, inputChannel[i]));
                outputChannel[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
            }
        }

        return true;
    }
}

registerProcessor('my-worklet-processor', MyWorkletProcessor);