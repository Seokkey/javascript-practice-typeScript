/**
 * 변수
 * */
let count = 0; // 숫자
count += 1;
// count = '갑자기 분위기 문자열'; // 이러면 에러가 납니다!

const message: string = 'hello world'; // 문자열

const done: boolean = true; // 불리언 값

const numbers: number[] = [1, 2, 3]; // 숫자 배열
const messages: string[] = ['hello', 'world']; // 문자열 배열

// messages.push(1); // 숫자 넣으려고 하면.. 안된다!

let mightBeUndefined: string | undefined = undefined; // string 일수도 있고 undefined 일수도 있음
let nullableNumber: number | null = null; // number 일수도 있고 null 일수도 있음

let color: 'red' | 'orange' | 'yellow' = 'red'; // red, orange, yellow 중 하나임
color = 'yellow';
// color = 'green'; // 에러 발생!


/**
 * 함수
 * */
const sum = (x: number, y: number): number => {
  return x + y;
};

console.log(sum(1, 2));


function sumArray(numbers: number[]): number {
  return numbers.reduce((acc, current) => acc + current, 0);
}

const total = sumArray([1, 2, 3, 4, 5]);

/**
 * interface
 * */
// Shape 라는 interface 를 선언합니다.
interface Shape {
  getArea(): number; // Shape interface 에는 getArea 라는 함수가 꼭 있어야 하며 해당 함수의 반환값은 숫자입니다.
}

class Circle implements Shape {
  // `implements` 키워드를 사용하여 해당 클래스가 Shape interface 의 조건을 충족하겠다는 것을 명시합니다.

  radius: number; // 멤버 변수 radius 값을 설정합니다.

  constructor(radius: number) {
    this.radius = radius;
  }

  // 너비를 가져오는 함수를 구현합니다.
  getArea() {
    return this.radius * this.radius * Math.PI;
  }
}

class Rectangle implements Shape {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
}

const shapes: Shape[] = [new Circle(5), new Rectangle(10, 5)];

shapes.forEach(shape => {
  console.log(shape.getArea());
});

// 타입스크립트에서는 constructor 의 파라미터 쪽에 public 또는 private accessor 를 사용하면
// 직접 하나하나 설정해주는 작업을 생략해줄 수 있습니다.

class Square implements Shape {
  // `implements` 키워드를 사용하여 해당 클래스가 Shape interface 의 조건을 충족하겠다는 것을 명시합니다.
  constructor(public radius: number) {
    this.radius = radius;
  }

  // 너비를 가져오는 함수를 구현합니다.
  getArea() {
    return this.radius * this.radius * Math.PI;
  }
}

class Triangle implements Shape {
  constructor(private width: number, private height: number) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
}


/**
 * 클래스가 아닌 일반 객체를 interface 를 사용하여 타입을 지정
 * */
interface Person {
  name: string;
  age?: number; // 물음표가 들어갔다는 것은, 설정을 해도 되고 안해도 되는 값이라는 것을 의미합니다.
}
interface Developer extends Person { //interface도 extends로 상속 가능
  skills: string[];
}

/* 타입 앨리어스 사용 - extends, implements 불가. 유니온 또는 튜플을 사용 */
// & 는 Intersection 으로서 두개 이상의 타입들을 합쳐줍니다.
// 참고: https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types
// type Developer = Person & {
//   skills: string[];
// };

const person: Person = {
  name: '김사람',
  age: 20
};

const expert: Developer = {
  name: '김개발', //Developer 인터페이스가 Person을 상속 받았기 때문에 name을 써줘야 함
  skills: ['javascript', 'react']
};

const people: Person[] = [person, expert];


/**
 * 함수에서 제네릭 사용
 * */

// function merge(a: any, b: any): any {
// 위 처럼 사용 시 타입추론이 깨지게 돼서 함수 안에 뭐가 들어 있는지 모름
// <>를 사용해 제네릭타입을 사용하면 뭐든지 들어가면서도 타입 추론이 가능해짐
function merge<A, B>(a: A, b: B): A & B {
  return {
    ...a,
    ...b
  };
}

const merged = merge({ foo: 1 }, { bar: 1 });

/**
 * 인터페이스에서 제네릭 사용
 * */
interface Items<T> {
  list: T[];
}

// 타입 지정 시 타입 지정 가능
const itemString: Items<string> = {
  list: ['a', 'b', 'c']
};

const itemNumber: Items<number> = {
  list: [1,2,3]
};

// 똑같이 Items 타입이지만 string, number 다 가능하다.


/**
 * 타입 앨리어스에서 제네릭 사용
 * */
type ItemTypes<T> = {
  list: T[];
};

const items: ItemTypes<string> = {
  list: ['a', 'b', 'c']
};

/**
 * 클래스에서 제네릭 사용
 * */
class Queue<T> {
  list: T[] = [];
  get length() {
    return this.list.length;
  }
  enqueue(item: T) {
    this.list.push(item);
  }
  dequeue() {
    return this.list.shift();
  }
}
// 마찬가지 클래스 인스턴스화 시 타입 지정 가능
const queueNumber = new Queue<number>();
const queueString = new Queue<string>();