// Helper functions
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/isarray#Polyfill
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
// Helper functions end


// 1. Создайте функцию которая бы умела делать:
//    minus(10)(6); // 4
//    minus(5)(6); // -1
//    minus(10)(); // 10
//    minus()(6); // -6
//    minus()(); // 0

function minus(x) {
    if (!isNumeric(x)) x = 0;
    
    return (y) => x - (!isNumeric(y) ? 0 : y);
    
    // return function(y) {
    //     if (!isNumeric(y)) y = 0;
    //     return x - y;
    // }
}

// 2. Реализовать функцию, которая умножает и умеет запоминать
//    возвращаемый результат между вызовами:
//     function MultiplyMaker ...
//     const multiply = MultiplyMaker(2);
//     multiply(2); // 4 (2 * 2)
//     multiply(1); // 4 (4 * 1)
//     multiply(3); // 12 (4 * 3)
//     multiply(10); // 120 (12 * 10)

function multiplyMaker(x) {
    let res = !isNumeric(x) ? 0 : x;
    return (y) => res *= !isNumeric(y) ? 0 : y;
}


// 3. Реализовать модуль, который работает со строкой и имеет методы:
//    a. установить строку
//      i.  если передано пустое значение, то установить пустую строку
//      ii. если передано число, число привести к строке
//    b. получить строку
//    c. получить длину строки
//    d. получить строку-перевертыш
//    Пример:
//     модуль.установитьСтроку(‘abcde’);
//     модуль.получитьСтроку(); // ‘abcde’
//     модуль.получитьДлину(); // 5

const line = (function() {
    let _str = "";
    
    function setString(str = "") {
        if (typeof (str) === "string") _str = str;
        else if (isNumeric(str)) _str = str.toString();
        else _str = "";
    }
    
    function getString() {
        return _str;
    }
    
    function getStrLength() {
        return _str.length;
    }
    
    function getReverseString() {
        return _str.split("").reverse().join("");
    }
});

// 4. Создайте модуль “калькулятор”, который умеет
//    складывать, умножать, вычитать, делить и возводить в степень.
//    Конечное значение округлить до двух знаков после точки
//    (значение должно храниться в обычной переменной, не в this).
//     модуль.установитьЗначение(10); // значение = 10
//     модуль.прибавить(5); // значение += 5
//     модуль.умножить(2); // значение *= 2
//     модуль.узнатьЗначение(); // вывести в консоль 30 (здесь надо округлить)
//    Также можно вызывать методы цепочкой:
//     модуль.установитьЗначение(10).вСтепень(2).узнатьЗначение(); // 100

const calc = (function() {
    //TODO: добавить проверки входных данных
    
    let _value;
    
    function setValue(value) {
        if (arguments.length > 0) _value = !isNumeric(value) ? 0 : value;
        else console.log(`Задайте аргумент ф-ции ${arguments.callee.toString().match(/function ([^(]*)\(/)[1]}.`);
    }
    
    function getValue() {
        return Math.round(_value * 100) / 100;
    }

    function plus(value) {
        if (arguments.length > 0) _value = !isNumeric(value) ? 0 : value;
        else console.log(`Задайте аргумент ф-ции ${arguments.callee.toString().match(/function ([^(]*)\(/)[1]}.`);
        _value += value;
        return this;
    }
    
    function minus(value) {
        if (arguments.length > 0) _value = !isNumeric(value) ? 0 : value;
        else console.log(`Задайте аргумент ф-ции ${arguments.callee.toString().match(/function ([^(]*)\(/)[1]}.`);
        _value -= value;
        return this;
    }
    
    function multiply(value) {
        if (arguments.length > 0) _value = !isNumeric(value) ? 0 : value;
        else console.log(`Задайте аргумент ф-ции ${arguments.callee.toString().match(/function ([^(]*)\(/)[1]}.`);
        _value *= value;
        return this;
    }
    
    function divide(value) {
        if (arguments.length > 0) _value = !isNumeric(value) ? 0 : value;
        else console.log(`Задайте аргумент ф-ции ${arguments.callee.toString().match(/function ([^(]*)\(/)[1]}.`);
        _value /= value;
        return this;
    }
    
    return {
        setValue: setValue,
        getValue: getValue,
        plus: plus,
        minus: minus,
        multiply: multiply,
        divide: divide
    }
}());