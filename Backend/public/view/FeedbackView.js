import { currentUser } from "../controller/firebase_auth.js";
import { AbstractView } from "./AbstractView.js";
export class FeedbackView extends AbstractView{
    
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
        console.log('FeedbackView.onMount() is implemented'); 
    }
    async updateView(){
        console.log('FeedbackView.updateView() is implemented'); 
        const viewWrapper = document.createElement('div');
        const response = await fetch('/view/templates/feedback.html', {cache: "no-store"});
        viewWrapper.innerHTML = await response.text();
        return viewWrapper;
    }
    attachEvents(){
        console.log('FeedbackView.attachEvents() is implemented');
    }
    async onLeave(){
        if(!currentUser){
            this.parentElement.innerHTML = '<h1> Access Denied </h1>';
            return;
        }
        console.log('FeedbackView.onLeave() is implemented');
    }
}