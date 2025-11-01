import { HomeView } from "../view/HomeView.js";
import { ProfileView } from "../view/ProfileView.js";
import {PromptView } from '../view/PromptView.js';
import { UpdateContextView } from "../view/UpdateContextView.js";
import {FeedbackView} from "../view/FeedbackView.js";
import { HomeController } from "./HomeController.js";
import { ProfileController } from "./ProfileController.js";
import { PromptController } from "./PromptController.js";
import {UpdateContextController} from "./UpdateContextController.js";
import {FeedbackController} from "./FeedbackController.js";
import { Router } from "./Router.js";
import { loginFirebase , logoutFirebase ,createAccount} from "./firebase_auth.js";
import { startSpinner,stopSpinner } from "../view/util.js";
import { Chat, loadContext  } from "./ChatProcessing.js";

document.getElementById('appHeader').textContent = 'InfoBot';
document.title = 'InfoBot';

const routes = [
    {path: '/', view: HomeView, controller : HomeController}, 
    {path: '/promptsettings', view: PromptView, controller : PromptController},
    {path: '/feedback', view: FeedbackView, controller : FeedbackController},
    {path: '/updatecontext', view: UpdateContextView, controller : UpdateContextController},
    {path: '/profile', view: ProfileView, controller : ProfileController}
];

// create an instance of the Router 
export const router = new Router(routes);
router.navigate(window.location.pathname);

const menuItems = document.querySelectorAll('a[data-path]');
menuItems.forEach(item =>{
    item.onclick = function(e){
        const path = item.getAttribute('data-path');
        router.navigate(path);

    }
});

//login form
document.forms.loginForm.onsubmit = async function(e){
    e.preventDefault(); // prevent reload
    const email = e.target.email.value;
    const password = e.target.password.value;
    startSpinner();
    try{
        await loginFirebase(email, password);
        stopSpinner();
        console.log('logged in', email);
    }
    catch(e){
        stopSpinner();
        console.error('error logging in:',e);
        const errorCode = e.code;
        const errorMessage = e.message;
        alert('signin failed: ' + e.code + ', ' + e.message);
    }
}
//logout
document.getElementById('logoutButton').onclick =async function(e){
    startSpinner();
try {
    await logoutFirebase();
    stopSpinner();
    console.log('logged out');
} catch (error) {
    stopSpinner();
    console.error('error logging out:',error);
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('signout failed: ' + error.code + ', ' + error.message);
}}

//create account form
document.forms.createAccountForm.onsubmit = async function(e){
    e.preventDefault(); // prevent reload
    const email = e.target.email.value;
    const emailConfirm = e.target.emailConfirm.value;
    if(email !== emailConfirm){
        alert('email and email confirm do not match');
        return;
    }
    const password = e.target.password.value;
    startSpinner();
    try{
        await createAccount(email, password);
        stopSpinner();
        document.getElementById('createAccountDiv').classList.replace('d-block','d-none');
    }
    catch(e){
        stopSpinner();
        console.error('error creating account:',e);
        const errorCode = e.code;
        const errorMessage = e.message;
        alert('create account failed: ' + e.code + ', ' + e.message);
    }
}


// unhide create account hide login
document.getElementById('goToCreateAccount').onclick = function(e){
    document.getElementById('loginDiv').classList.replace('d-block','d-none');
    document.getElementById('createAccountDiv').classList.replace('d-none','d-block');
    document.forms.createAccountForm.reset();
}

document.getElementById('goToLogin').onclick = function(e){
    document.getElementById('createAccountDiv').classList.replace('d-block','d-none');
    document.getElementById('loginDiv').classList.replace('d-none','d-block');
    
}
document.getElementById('mainLoginBtn').onclick = function(e){
    document.getElementById('chat').classList.replace('d-block','d-none');

    document.getElementById('createAccountDiv').classList.replace('d-block','d-none');
    document.getElementById('loginDiv').classList.replace('d-none','d-block');
}
document.getElementById('goToChat').onclick = function(e){
    document.getElementById('chat').classList.replace('d-none','d-block');

    document.getElementById('createAccountDiv').classList.replace('d-block','d-none');
    document.getElementById('loginDiv').classList.replace('d-block','d-none');
    
}

//course
document.forms.courseForm.course.onchange = async function(e){
    e.preventDefault();
    try {
        const course = e.target.value;
        loadContext(course);
        console.log("course ", course);
    } catch (error) {
        console.error('error select course:',error);
    }
}


//chat 
document.forms.chatpage.onsubmit =async function(e){
    e.preventDefault();
    startSpinner();
    
try {
    const text = e.target.chat.value;
    if(text == '')
    {
        stopSpinner();

        return;}

    e.target.chat.value='';
    
    appendMessage('You', text);
    const response = await Chat(text);
    console.log(response);  
    stopSpinner();
    appendMessage('InfoBot', response);
} catch (error) {
    stopSpinner();
    console.error('error during chat:',error);
    
}}

export function appendMessage(sender, message) {
    const container = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');

    // Set text color based on sender
    const color = sender === 'You' ? 'blue' : 'red';

    messageDiv.innerHTML = `<strong style="color: ${color};">${sender}:</strong> ${message}`;
    messageDiv.className = "mb-2";
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}
