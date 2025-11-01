import { currentUser } from "../controller/firebase_auth.js";
import { AbstractView } from "./AbstractView.js";
export class ProfileView extends AbstractView{
    
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
        console.log('ProfileView.onMount() is implemented'); 
    }
    async updateView(){
        console.log('ProfileView.updateView() is implemented'); 
        const viewWrapper = document.createElement('div');
        viewWrapper.innerHTML = `
        <h1>Profile</h1>
        <p>welcome to the profile page</p>
        <p>current user: ${currentUser.email}</p>
        <p>current user id: ${currentUser.uid}</p>
        `;
        return viewWrapper;
    }
    attachEvents(){
        console.log('ProfileView.attachEvents() is implemented');
    }
    async onLeave(){
        if(!currentUser){
            this.parentElement.innerHTML = '<h1> Access Denied </h1>';
            return;
        }
        console.log('ProfileView.onLeave() is implemented');
    }
}