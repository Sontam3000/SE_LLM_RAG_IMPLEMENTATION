import {getinfo ,onUpdatePayload} from '../controller/firebase_controller.js'
export class Payload {
  prompt;
  max_tokens = 250;
  temperature = 0.7;
  top_p = 1.0;
  repetition_penalty = 1.0;
  top_k = 50;

  static async init() {
      const instance = new Payload();
      const values = await getinfo();

      if (values) {
          instance.max_tokens = values.max_tokens;
          instance.temperature = values.temperature;
          instance.top_p = values.top_p;
          instance.repetition_penalty = values.repetition_penalty;
          instance.top_k = values.top_k;
      }

      return instance;
  }

  async setPayload(max_tokens = 250, temperature = 0.7, top_p = 1.0, repetition_penalty= 1.0, top_k=50) {
    if(max_tokens==''){
      max_tokens = 250;
    }
    if(temperature==''){
      temperature = 0.7;
    }
    if(top_p==''){
      top_p = 1.0;
    }
    if(repetition_penalty==''){
      repetition_penalty = 1.0;
    }
    if(top_k==''){
      top_k= 50;
    }
    
    const update = {  
    max_tokens : Number(max_tokens),
    temperature: Number( temperature),
    top_p : Number(top_p),
    repetition_penalty : Number(repetition_penalty),
    top_k : Number(top_k)

  }
            try {
              await onUpdatePayload(update);
               
          } catch (error) {
              console.error("update failed", error);
          }
}

  getPayload() {
      return {
          max_tokens: this.max_tokens,
          temperature: this.temperature,
          top_p: this.top_p,
          repetition_penalty: this.repetition_penalty,
          top_k: this.top_k
      };
  }
}
