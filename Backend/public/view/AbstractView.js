import { currentUser } from "../controller/firebase_auth.js";
// common super class for all view classes

export class AbstractView{

    parentElement = document.getElementById('spaRoot');

    constructor(){
        if(new.target === AbstractView){
            throw new Error('Cannot instantiate AbstractView');
        }

    }
    // fetch initial data from resources (e.g. database, API) and update into the model
    async onMount(){
        throw new Error('onmount method must be implemented');
    }
    // to update the view to reflect the updated model
    async render(){
        if(!currentUser){
            this.parentElement.innerHTML = '<h1> Access Denied </h1>';
            return;
        }
        this.parentElement.innerHTML = '';
        const elementes = await this.updateView();
        this.parentElement.append(elementes);
        this.attachEvents();

    }

    async updateView(){
        throw new Error('updateView method must be implemented');
    }

    attachEvents(){
        throw new Error('attachEvents method must be implemented');
    }

    async onLeave(){
        throw new Error('onLeave method must be implemented');
    }
}