import { Person } from './person';

class Student extends Person {
    study(): string {
        return `${this.name} is studyng`;
    }
}

const student = new Student('Lee');

console.dir(Student);
console.dir(student);
console.log(student.sayHello());
console.log(student.study());