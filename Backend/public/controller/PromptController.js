import {PromptModel} from '../model/PromptModel.js';
import { Payload } from '../model/Payload.js';
export class PromptController{
    model = null;
    view = null;

    constructor(){
        this.model = new PromptModel();
    }

    setView(view){
        this.view = view;
    }

   async onUpdatePayload(e){
    e.preventDefault(); // prevent reload

        const form = e.target;
        const max_tokens = form.max_tokens.value;
        const temperature = form.temperature.value;
        const top_k = form.top_k.value;
        const top_p = form.top_p.value;
        const repetition_penalty = form.repetition_penalty.value;

        const payload = new Payload();

        await payload.setPayload( max_tokens, temperature, top_p, repetition_penalty, top_k);
        alert("update successful");
    }
}