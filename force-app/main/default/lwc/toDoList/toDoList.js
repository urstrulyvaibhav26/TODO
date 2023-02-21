import { LightningElement, api } from 'lwc';
import updateTodo from '@salesforce/apex/ToDoControllerClass.updateTodo';
import deleteTodo from '@salesforce/apex/ToDoControllerClass.deleteTodo';
export default class ToDoList extends LightningElement {
    //these are three properties all annotated by @api decorator.
    //So, all of these are public property and this component can accept the value from parent component.
    @api todoId;
    @api todoName;
    @api done = false;
    //@api todoDate = new Date();
    updatehandler(){
        const todo = {
            todoId : this.todoId,
            todoName : this.todoName,
            done : !this.done
        };
        updateTodo({payload: JSON.stringify(todo)}).then(result =>{
            console.log('Updated successfully');
            const updateEvent = new CustomEvent("update");
            this.dispatchEvent(updateEvent);
        }).catch(error =>{
            console.error('Error in update' +error);
        });
    }
    deletehandler(){
        deleteTodo({todoId: this.todoId}).then(result =>{
            console.log('Deleted succesfully');
            const deleteEvent = new CustomEvent("delete");
            this.dispatchEvent(deleteEvent);
        }).catch(error =>{
            console.error('Error in delete' +error);
        })
    }

    get containerClass(){
        return this.done ? "todo completed" : "todo upcoming";
    }

    get iconName(){
        return this.done ? "utility:check" : "utility:add"
    }
}