import { LightningElement } from 'lwc';

export default class ToDoManager extends LightningElement {

    time = "5:35 PM";
    greetings = "Good Day";

    connectedCallback(){
        // lifecycle methods are part of LWC framework and gets automatically invoked by the framework itself
        this.getTime();
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
}