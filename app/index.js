import document from "document"
import {monospaceDigits} from "./utils.js"
import {addFloatingPoints, 
        subtractFloatingPoints, 
        multiplyFloatingPoints, 
        divideFloatingPoints} from "./utils.js"
import * as messaging from "messaging";
import {me as device} from "device";

let memory = "";
let operator = "";
let operand = "";
const upperLimit = 99999999;
const lowerLimit = -9999999;

let numButtonColorClass = "blue";
let operatorButtonColorClass = "lime";

initNumScreen();

/*
 *  Add onmousedown and onmouseup events as a UI effect for a click
 */

function setMouseEvents() {
  let numKeys = document.getElementsByClassName("numberButtonRect");
  numKeys.forEach(function(numKey) {
    numKey.onmousedown = function(e) {
      numKey.class = "numberButtonRect down";
    }
    numKey.onmouseup = function(e) {
      numKey.class = "numberButtonRect transparent";
    }
  });

  let operatorKeys = document.getElementsByClassName("operatorButtonRect");
  operatorKeys.forEach(function(operatorKey) {
    operatorKey.onmousedown = function(e) {
      operatorKey.class = "operatorButtonRect down"
    }
    operatorKey.onmouseup = function(e) {
      operatorKey.class = "operatorButtonRect transparent";
    }
  });
}

/*
 *  Set color scheme based on setting
 */

messaging.peerSocket.onmessage = function(e) {
  switch(e.data.val) {
    case "fb-lime":
      numButtonColorClass = "blue";
      operatorButtonColorClass = "lime";
      break;
    case "fb-blue":
      numButtonColorClass = "lavender";
      operatorButtonColorClass = "blue";
      break;
    case "fb-slate":
      numButtonColorClass = "lightgray";
      operatorButtonColorClass = "slate";
      break;
    case "fb-indigo":
      numButtonColorClass = "cyan";
      operatorButtonColorClass = "indigo";
      break;
    case "fb-red":
      numButtonColorClass = "peach";
      operatorButtonColorClass = "red";
      break;
    default:
      numButtonColorClass = "blue";
      operatorButtonColorClass = "lime";
      break;
  }
  setNumKeys();
  setOperatorKeys();
}

function setNumKeys() {
  let numKeys = document.getElementsByClassName("numberButton");
  numKeys.forEach(function(numKey) {
    numKey.class = "numberButton " + numButtonColorClass;
  });
}

function setOperatorKeys() {
  let operatorKeys = document.getElementsByClassName("operatorButton");
  operatorKeys.forEach(function(operatorKey) {
    operatorKey.class = "operatorButton " + operatorButtonColorClass;
  });
}

/*
 *  Process number screen events
 */

function initNumScreen() {
  setMouseEvents();
  setNumKeys();
  setOperatorKeys();
  let num1 = document.getElementById("1");
  let num2 = document.getElementById("2");
  let num3 = document.getElementById("3");
  let num4 = document.getElementById("4");
  let num5 = document.getElementById("5");
  let num6 = document.getElementById("6");
  let num7 = document.getElementById("7");
  let num8 = document.getElementById("8");
  let num9 = document.getElementById("9");
  let dot = document.getElementById("dot");
  let num0 = document.getElementById("0");
  let operatorElement = document.getElementById("operator");

  num1.onclick = function(e) {
    operand = operand.concat("1");
  }
  num2.onclick = function(e) {
    operand = operand.concat("2");
  }
  num3.onclick = function(e) {
    operand = operand.concat("3");
  }
  num4.onclick = function(e) {
    operand = operand.concat("4");
  }
  num5.onclick = function(e) {
    operand = operand.concat("5");
  }
  num6.onclick = function(e) {
    operand = operand.concat("6");
  }
  num7.onclick = function(e) {
    operand = operand.concat("7");
  }
  num8.onclick = function(e) {
    operand = operand.concat("8");
  }
  num9.onclick = function(e) {
    operand = operand.concat("9");
  }
  dot.onclick = function(e) {
    operand = operand.concat(".");
  }
  num0.onclick = function(e) {
    operand = operand.concat("0");
  }
  operatorElement.onclick = function(e) {
    document.replaceSync("operator_screen.gui");
    initOperatorScreen();
    operand = parseFloat(operand);
    if (memory === "") {
      memory = operand;
    } else {
      switch (operator) {
        case "+":
          memory = addFloatingPoints(memory, operand);
          break;
        case "-":
          memory = subtractFloatingPoints(memory, operand);
          break;
        case "*":
          memory = multiplyFloatingPoints(memory, operand);
          break;
        case "/":
          memory = divideFloatingPoints(memory, operand);
          break;
      }
    }
    operand = "";
    let result = document.getElementById("result");
    if (memory > upperLimit || memory < lowerLimit) {
      result.text = "OVERFLOW";
    } else {
      result.text = monospaceDigits(memory);
    }
  }
}

/*
 *  Process operator screen events
 */

function initOperatorScreen() {
  setMouseEvents();
  setOperatorKeys();
  let add = document.getElementById("add");
  let subtract = document.getElementById("subtract");
  let multiply = document.getElementById("multiply");
  let divide = document.getElementById("divide");
  let clear = document.getElementById("clear");
  let result = document.getElementById("result");

  let clearKey = document.getElementById("clear");
  clearKey.onmousedown = function(e) {
    clearKey.class = "clearButtonRect down"
  }
  clearKey.onmouseup = function(e) {
    clearKey.class = "clearButtonRect transparent";
  }
  
  add.onclick = function(e) {
    document.replaceSync("index.gui");
    initNumScreen();
    operator = "+";
  }
  subtract.onclick = function(e) {
    document.replaceSync("index.gui");
    initNumScreen();
    operator = "-";
  }
  multiply.onclick = function(e) {
    document.replaceSync("index.gui");
    initNumScreen();
    operator = "*";
  }
  divide.onclick = function(e) {
    document.replaceSync("index.gui");
    initNumScreen();
    operator = "/";
  }
  clear.onclick = function(e) {
    result.text = "";
    document.replaceSync("index.gui");
    initNumScreen();
    memory = "";
    operand = "";
    operator = "";
  }
}
