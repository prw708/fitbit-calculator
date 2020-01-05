/*
 *  Perform math operations as integers
 */

function decimalDigits(num) {
  let numStr = num.toString();
  let dotLocation = numStr.lastIndexOf(".");
  if (dotLocation == 0) {
    return numStr.length - 1;
  } else if (dotLocation != -1) {
    return numStr.length - (dotLocation + 1);
  } else {
    return 0;
  }
}

export function addFloatingPoints(num1, num2) {
  let num1DecimalDigits = decimalDigits(num1);
  let num2DecimalDigits = decimalDigits(num2);
  let num1Int = num1;
  let num2Int = num2;
  if (num1DecimalDigits < num2DecimalDigits) {
    num1Int *= Math.pow(10, num2DecimalDigits);
    num2Int *= Math.pow(10, num2DecimalDigits);
  } else {
    num1Int *= Math.pow(10, num1DecimalDigits);
    num2Int *= Math.pow(10, num1DecimalDigits);
  }
  let dec = Math.max(num1DecimalDigits, num2DecimalDigits);
  return ((num1Int + num2Int) / Math.pow(10, dec)).toFixed(dec);
}

export function subtractFloatingPoints(num1, num2) {
  let num1DecimalDigits = decimalDigits(num1);
  let num2DecimalDigits = decimalDigits(num2);
  let num1Int = num1;
  let num2Int = num2;
  if (num1DecimalDigits < num2DecimalDigits) {
    num1Int *= Math.pow(10, num2DecimalDigits);
    num2Int *= Math.pow(10, num2DecimalDigits);
  } else {
    num1Int *= Math.pow(10, num1DecimalDigits);
    num2Int *= Math.pow(10, num1DecimalDigits);
  }
  let dec = Math.max(num1DecimalDigits, num2DecimalDigits);
  return ((num1Int - num2Int) / Math.pow(10, dec)).toFixed(dec);
}

export function multiplyFloatingPoints(num1, num2) {
  let num1DecimalDigits = decimalDigits(num1);
  let num2DecimalDigits = decimalDigits(num2);
  let num1Int = num1 * Math.pow(10, num1DecimalDigits);
  let num2Int = num2 * Math.pow(10, num2DecimalDigits);
  let dec = num1DecimalDigits + num2DecimalDigits;
  return ((num1Int * num2Int) / Math.pow(10, dec));
}

export function divideFloatingPoints(num1, num2) {
  let num1DecimalDigits = decimalDigits(num1);
  let num2DecimalDigits = decimalDigits(num2);
  let num1Int = num1 * Math.pow(10, num1DecimalDigits);
  let num2Int = num2 * Math.pow(10, num2DecimalDigits);
  let dec = num1DecimalDigits - num2DecimalDigits;
  return ((num1Int / num2Int) / Math.pow(10, dec));
}

/*
 *  Monospace strings of digits
 */

export function monospaceDigits(num) {
  let newStr = "";
  let numStr = num.toString();
  let length = numStr.length;
  for (let i = 0; i < length; i++) {
    switch (numStr.charAt(i)) {
      case "0":
        newStr = newStr.concat(String.fromCharCode(0x10));
        break;
      case "1":
        newStr = newStr.concat(String.fromCharCode(0x11));
        break;
      case "2":
        newStr = newStr.concat(String.fromCharCode(0x12));
        break;
      case "3":
        newStr = newStr.concat(String.fromCharCode(0x13));
        break;
      case "4":
        newStr = newStr.concat(String.fromCharCode(0x14));
        break;
      case "5":
        newStr = newStr.concat(String.fromCharCode(0x15));
        break;
      case "6":
        newStr = newStr.concat(String.fromCharCode(0x16));
        break;
      case "7":
        newStr = newStr.concat(String.fromCharCode(0x17));
        break;
      case "8":
        newStr = newStr.concat(String.fromCharCode(0x18));
        break;
      case "9":
        newStr = newStr.concat(String.fromCharCode(0x19));
        break;
      default:
        newStr = newStr.concat(numStr.charAt(i));
        break;
    }
  }
  return newStr;
}