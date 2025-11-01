import { currentUser } from "../controller/firebase_auth.js";
import { AbstractView } from "./AbstractView.js";
export class HomeView extends AbstractView{
    
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
        console.log('HomeView.onMount() is implemented'); 
    }
    async updateView(){
        console.log('HomeView.updateView() is implemented'); 
        const viewWrapper = document.createElement('div');
        const response = await fetch('/view/templates/home.html', {cache: "no-store"});
        viewWrapper.innerHTML = await response.text();
        
        return viewWrapper;
    } 
    attachEvents(){
       
    }
    async onLeave(){
        if(!currentUser){
            this.parentElement.innerHTML = '<h1> Access Denied </h1>';
            return;
        }
        console.log('HomeView.onLeave() is implemented');
    }
}