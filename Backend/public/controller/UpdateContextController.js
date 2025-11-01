import {UpdateContextModel} from '../model/UpdateContextModel.js';
export class UpdateContextController{
    model = null;
    view = null;

    constructor(){
        this.model = new UpdateContextModel();
    }

    setView(view){
        this.view = view;
    }
    onUpdateContext(e){
        e.preventDefault();
        const context_form = e.target;

        const bigText = context_form.bigText;
        const pdf = context_form.pdfFile.files[0];

    }
}