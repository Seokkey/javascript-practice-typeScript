"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
class Person {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        return "GoodBye, " + this.name;
    }
}
exports.Person = Person;
// const person = new Person('Lee');
//
// console.log(person.sayHello());
