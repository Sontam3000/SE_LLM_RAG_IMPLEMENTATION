import {FeedbackModel} from '../model/FeedbackModel.js';
export class FeedbackController{
    model = null;
    view = null;

    constructor(){
        this.model = new FeedbackModel();
    }

    setView(view){
        this.view = view;
    }
}