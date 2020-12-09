import * as _ from 'lodash';

class StartUp {
  public  static main():number {
    const group = _.groupBy(['one', 'two', 'three'], 'length');
    const a = "b";
    console.log(group);
    return 0;
  }
}

StartUp.main();