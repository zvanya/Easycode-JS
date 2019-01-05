// Helper functions
if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
};

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getRandomInt(min, max) {
    if (isNumeric(min) && isNumeric(max))
        return Math.floor(Math.random() * (max - min)) + min;
    else
        return false;
}
// Helper functions end

// 1. Создать функцию multiply, которая будет принимать любое количество чисел и возвращать
//    их произведение: multiply(1,2,3) = 6 (1*2*3)
//    Если нет ни одного аргумента, вернуть ноль: multiply() // 0

function multiply() {
    const err = ["no arguments", "one of arguments is't a number"];
    let res = 1;
    
    if (arguments.length) {
        for (let elem of arguments) {
            if (isNumeric(elem)) {
                if (elem === 0){
                    return 0;
                }
                res *= elem;
            } else {
                return err[1];
            }
        }
    } else {
        return err[0];
    }
    
    return res;
}

// 2. Создать функцию, которая принимает строку и возвращает строку-перевертыш:
//    reverseString(‘test’) // “tset”.

function reverse(str) {
    if (typeof(str) === "string")
        return str.split("").reverse().join("");
    else
        return -1;
}

// 3. Создать функцию, которая в качестве аргумента принимает строку из букв и возвращает строку,
//    где каждый символ разделен пробелом и заменен на юникод-значение символа:
//    getCodeStringFromText(‘hello’) // “104 101 108 108 111”
//    подсказка: для получения кода используйте специальный метод

function getCodeStringFromText(str) {
    const err = [-1, -2];
    let arr = [];
    
    if (typeof(str) === "string") {
        
        if (str.length === 0) return err[1];
        
        for (let i = 0; i < str.length; i++) {
            arr.push(str.charCodeAt(i));
        }
    
        return arr.join(" ");
    }
    else
        return err[0];
}

// 4. Создать функцию угадай число. Она принимает число от 1-10 (обязательно проверить, что
//    число не больше 10 и не меньше 0). Генерирует рандомное число от 1-10 и сравнивает с
//    переданным числом если они совпали то возвращает “Вы выиграли”, если нет то “Вы не угадали,
//    ваше число 8, а выпало число 5”. Числа в строке указаны как пример вы подставляете реальные числа.

function guessNumber(n) {
    let randomNumber = 0;
    
    if (isNumeric(n)) {
        if (n > 0 && n <= 10) {
            if (n % 1 !== 0) return "Введите целое число!";
            
            randomNumber = getRandomInt(1, 11);
            
            if (n === randomNumber) {
                return "Вы выиграли!";
            } else {
                return `Вы не угадали. Ваше число: ${n}, а выпало число ${randomNumber}.`;
            }
        } else {
            return `Вы ввели ${n}. Введите число в диапазоне от 1 до 10`;
        }
    } else {
        return false;
    }
}

// 5. Создать функцию, которая принимает число N и возвращает массив, заполненный числами от 1 до N:
//    getArray(10); // [1,2,3,4,5,6,7,8,9,10]

function getArray(n) {
    const err = ["Вы ввели не число. Введите число больше нуля", "Число должно быть больше нуля"];
    let arr = [];
    
    if (isNumeric(n)) {
        if (n > 0) {
            for (let i = 0; i < n; i++) {
                arr.push(i+1);
            }
            
            return arr;
        } else {
            return err[1];
        }
    } else {
        return err[0];
    }
}

// 6. Создать функцию, которая принимает массив, а возвращает новый массив с дублированными элементами входного массива:
//    doubleArray([1,2,3]) // [1,2,3,1,2,3]

function doubleArray(arr) {
    
    if (!Array.isArray(arr)) return false;
    
    let newArr = arr.slice(0, arr.length);
    
    for (let elem of arr) {
        newArr.push(elem);
    }
    
    return newArr;
}

// 7. Создать функцию, которая принимает произвольное (любое) число массивов и удаляет из каждого
//    массива первый элемент, а возвращает массив из оставшихся значений:
//    changeCollection([1,2,3], [‘a’, ’b’, ‘c’]) → [ [2,3], [‘b’, ‘c’] ], changeCollection([1,2,3]) → [ [2,3] ] и т.д.

function changeCollection() {

}

// 8. Создать функцию которая принимает массив пользователей, поле на которое хочу проверить и
//    значение на которое хочу проверять. Проверять, что все аргументы переданы. Возвращать новый
//    массив с пользователями соответсвующими указанным параметрам.
//    funcGetUsers(users, “gender”, “male”); // [ {name: “Denis”, age: “29”, gender: “male”} , {name: “Ivan”, age: “20”, gender: “male”} ]

function getUsers(users, property, value) {

}

