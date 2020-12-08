export class Person {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }
    sayHello() {
        return "GoodBye, " + this.name;
    }
}

// const person = new Person('Lee');
//
// console.log(person.sayHello());