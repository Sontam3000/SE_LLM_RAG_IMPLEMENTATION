import { currentUser } from "../controller/firebase_auth.js";
import { AbstractView } from "./AbstractView.js";

export class PromptView extends AbstractView{
    
    controller = null;
    constructor(controller){
        super();
        this.controller = controller;
    }
    
    async onMount(){
        if(!currentUser){
            this.parentElement.innerHTML = '<h1> Access Denied </h1>';
            return;
        }
        console.log('PromptView.onMount() is implemented'); 
    }
    async updateView(){
        console.log('ProfileView.updateView() is implemented'); 
        const viewWrapper = document.createElement('div');
        const response = await fetch('/view/templates/prompt.html', {cache: "no-store"});
        viewWrapper.innerHTML = await response.text();
        return viewWrapper;
    }
    attachEvents(){
        console.log('PromptView.attachEvents() is implemented');
        const payload = document.forms.payload;
        payload.onsubmit = this.controller.onUpdatePayload;


    }
    async onLeave(){
        if(!currentUser){
            this.parentElement.innerHTML = '<h1> Access Denied </h1>';
            return;
        }
        console.log('PromptView.onLeave() is implemented');
    }
}