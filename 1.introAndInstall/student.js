"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person_1 = require("./person");
class Student extends person_1.Person {
    study() {
        return `${this.name} is studyng`;
    }
}
const student = new Student('Lee');
console.dir(Student);
console.dir(student);
console.log(student.sayHello());
console.log(student.study());
