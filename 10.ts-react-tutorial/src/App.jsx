"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Gretings_1 = require("./Gretings");
var App = function () {
    var onClick = function (name) {
        console.log(name + " says hello");
    };
    return <Gretings_1.default name="Hello" onClick={onClick}/>;
};
exports.default = App;
