"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class StartUp {
    static main() {
        const group = _.groupBy(['one', 'two', 'three'], 'length');
        const a = "b";
        console.log(group);
        return 0;
    }
}
StartUp.main();
//# sourceMappingURL=startUp.js.map