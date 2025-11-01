import { currentUser } from "../controller/firebase_auth.js";
import { AbstractView } from "./AbstractView.js";
export class UpdateContextView extends AbstractView{
    
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
        console.log('UpdateContextView.onMount() is implemented'); 
    }
    async updateView(){
        console.log('UpdateContextView.updateView() is implemented'); 
        const viewWrapper = document.createElement('div');
        const response = await fetch('/view/templates/update.html', {cache: "no-store"});
        viewWrapper.innerHTML = await response.text();
        return viewWrapper;
    }
    attachEvents(){
        console.log('UpdateContextView.attachEvents() is implemented');
        const context = document.forms.context;
        context.onsubmit = this.controller.onUpdateContext;
    }
    async onLeave(){
        if(!currentUser){
            this.parentElement.innerHTML = '<h1> Access Denied </h1>';
            return;
        }
        console.log('UpdateContextView.onLeave() is implemented');
    }
}