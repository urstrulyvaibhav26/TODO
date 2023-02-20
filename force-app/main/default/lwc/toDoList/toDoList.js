import { LightningElement, api } from 'lwc';

export default class ToDoList extends LightningElement {
    //these are three properties all annotated by @api decorator.
    //So, all of these are public property and this component can accept the value from parent component.
    @api todoId;
    @api todoName;
    @api done = false;
    //@api todoDate = new Date();
    get containerClass(){
        return this.done ? "todo completed" : "todo upcoming";
    }
}