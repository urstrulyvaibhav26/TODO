import { LightningElement, track } from 'lwc';
import addTodo from '@salesforce/apex/ToDoControllerClass.addTodo';
import getCurrentTodos from '@salesforce/apex/ToDoControllerClass.getCurrentTodos';
export default class ToDoManager extends LightningElement {

    time = "5:35 PM";
    greetings = "Good Day";
    @track todo = [];

    connectedCallback(){
        // lifecycle methods are part of LWC framework and gets automatically invoked by the framework itself
        this.getTime();
        this.fetchTodo();
        //this.sampleTodo();
        // setInterval method repeatedly calls a function or executes a code snippet,with a fixed time delay between each call
        setInterval(() =>{
            this.getTime();
        }, 1000)
    }

    getTime(){
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();
        // this keyword refers to the class instance and you need to use it to modify class properties.
        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(min)} ${this.getMidDay(hour)}`;

        this.setGreeting(hour);
    }

    getHour(hour){
        // ternary operator is a single line conditional statement
        return hour === 0 ? 12 : hour > 12 ? (hour-12) : hour;
    }
    getMidDay(hour){
        return hour >=12 ? "PM" :"AM";
    }
    getDoubleDigit(digit){
        return digit<10 ? "0"+digit : digit;
    }

    setGreeting(hour){
        if(hour < 12){
            this.greetings = "Good Morning";
        }
        else if(hour >=12 && hour <=17)
        {
            this.greetings = "Good Afternoon";
        }
        else{
            this.greetings = "Good Evening";
        }
    }

    addtohandler(){
        const inputBox = this.template.querySelector("lightning-input");
        const mytodo = {
            //todoId : this.todo.length,
            todoName : inputBox.value,
            done : false,
            //todoDate : new Date()

        };
        addTodo({payload : JSON.stringify(mytodo)})
        .then(response =>{
            console.log(('Item inserted successfully'));
            this.fetchTodo();
        })
        .catch(error =>{
            console.error('Error in inserting todo item'+error);
        });
        //this.todo.push(mytodo);
        inputBox.value = "";
    }

    fetchTodo(){
        getCurrentTodos().then(result =>{
            if(result){
                console.log("Retrived todos from server",result.length);
                this.todo = result;
            }
        }).catch(error => {
            console.error("Error in fetching todo " +error);
        })
    }
    //Get property is also a reactive property and it looks similar to a function and this get property must return a value at the end
    get upcomingTasks(){
        return this.todo && this.todo.length ? this.todo.filter(mytodo => !mytodo.done) : [];
    }
    get completedTasks(){
        return this.todo && this.todo.length ? this.todo.filter(mytodo => mytodo.done) : [];
    }
    sampleTodo(){
        const todosList = [
            {
                todoId: 0,
                todoName: "Feed the dog",
                done: false,
                todoDate: new Date()
            },
            {
                todoId : 1,
                todoName : "Feed the cat",
                done : false,
                todoDate : new Date()
            },
            {
                todoId : 2,
                todoName : "Start the bike",
                done : true,
                todoDate : new Date()
            }
        ];
        this.todo = todosList;
    }
}