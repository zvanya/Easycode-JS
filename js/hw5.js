// Helper functions
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/isarray#Polyfill
if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
// Helper functions end

// ******************* Функции высшего порядка ************************************************************************

// 1. Создать две функции и дать им осмысленные названия:
//    - первая функция принимает массив и колбэк (одна для всех вызовов)
//    - вторая функция (колбэк) обрабатывает каждый элемент массива (для каждого вызова свой callback)
//
// Первая функция возвращает строку “New value: ” и результат обработки:
// firstFunc([‘my’, ‘name’, ‘is’, ‘Trinity’], handler1) → “New value: MyNameIsTrinity”
// firstFunc([10, 20, 30], handler2) → “New value: 100, 200, 300,”
// firstFunc([{age: 45, name: ‘Jhon’}, {age: 20, name: ‘Aaron’}], handler3) → “New value: Jhon is 45, Aaron is 20,”
// firstFunc([‘abc’, ‘123’], handler4) → “New value: cba, 321,” // строки инвертируются
//
// Подсказка: secondFunc должна быть представлена функцией, которая принимает
// один аргумент (каждый элемент массива) и возвращает результат его обработки

function stringConversion(arr, callback) {

    let str = "New value: ";
    
    if (!Array.isArray(arr)) return false;
    
    for (let value of arr) {
        let newValue = callback(value);
        
        if (!newValue) return false;
        
        str += newValue;
    }
    
    return str;
}

function toConcatUppFirstLetter(str) {
    
    if (typeof(str) !== "string") return false;
    
    let newStr = str[0].toUpperCase();

    for (let i = 1; i < str.length; i++) {
         newStr += str[i];
    }
    
    return newStr;
}

function getMultiplication10(value) {
    
    if (!isNumeric(value)) return false;
    
    return value * 10 + ", ";
}

let arr = ["my", "name", "is", "Trinity"];
console.log(stringConversion(arr, toConcatUppFirstLetter));
arr = ["my", 15, "is", "Trinity"];
console.log(stringConversion(arr, toConcatUppFirstLetter));

arr = [10, 20, 30];
console.log(stringConversion(arr, getMultiplication10));

// 2. Написать аналог метода every. Создайте функцию every, она должна принимать первым
//    аргументом массив (обязательно проверьте что передан массив) вторым аргументом callback
//    функция должна возвращать true или false в зависимости от результата вызова callback.
//    Callback должен принимать один элемент массива, его индекс в массиве и весь массив.



// ******************* Перебирающие методы ****************************************************************************

// 1. На основе массива [1,2,3,5,8,9,10] сформировать новый массив,
//    каждый элемент которого будет хранить информацию о числе и его четности:
//    [{digit: 1, odd: true}, {digit: 2, odd: false}, {digit: 3, odd: true}...]



// 2. Проверить, содержит ли массив [12, 4, 50, 1, 0, 18, 40] элементы, равные нулю. Если да - вернуть false.



// 3. Проверить, содержит ли массив ['yes', 'hello', 'no', 'easycode', 'what'] хотя бы одно слово длиной
//    больше 3х букв. Если да - вернуть true



// 4. Дан массив объектов, где каждый объект содержит информацию о букве и месте её положения
//    в строке {буква: “a”, позиция_в_предложении: 1}:
// [{char:"a",index:12}, {char:"w",index:8}, {char:"Y",index:10}, {char:"p",index:3}, {char:"p",index:2},
//  {char:"N",index:6}, {char:" ",index:5}, {char:"y",index:4}, {char:"r",index:13}, {char:"H",index:0},
//  {char:"e",index:11}, {char:"a",index:1}, {char:" ",index:9}, {char:"!",index:14}, {char:"e",index:7}]
// Напишите функцию, которая из элементов массива соберет и вернёт строку, основываясь на index каждой буквы.
// Например: [{char:"i",index: 1}, {char:"H",index:0}, {char:"!",index:2}] → “Hi!”
// Подсказка: вначале отсортируйте массив по index, затем используйте reduce() для построения строки



// ******************* Метод Sort *************************************************************************************

// 1. Отсортируйте массив массивов так, чтобы вначале располагались наименьшие массивы
//    (размер массива определяется его длиной): [ [14, 45], [1], ['a', 'c', 'd'] ] → [ [1], [14, 45], ['a', 'c', 'd'] ]



// 2. Есть массив объектов:
//     [
//         {cpu: 'intel', info: {cores:2, сache: 3}},
//         {cpu: 'intel', info: {cores:4, сache: 4}},
//         {cpu: 'amd', info: {cores:1, сache: 1}},
//         {cpu: 'intel', info: {cores:3, сache: 2}},
//         {cpu: 'amd', info: {cores:4, сache: 2}}
//     ]
// Отсортировать их по возрастающему количеству ядер (cores).



// 3. Создать функцию, которая будет принимать массив продуктов и две цены. Функция должна
//    вернуть все продукты, цена которых находится в указанном диапазоне, и сортировать от дешевых к
//    дорогим:
//     let products = [
//         {title: 'prod1', price: 5.2}, {title: 'prod2', price: 0.18},
//         {title: 'prod3', price: 15}, {title: 'prod4', price: 25},
//         {title: 'prod5', price: 18.9}, {title: 'prod6', price: 8},
//         {title: 'prod7', price: 19}, {title: 'prod8', price: 63}
//     ];
//    filterCollection(products, 15, 30) → [{...price: 15}, {...price: 18.9}, {...price: 19}, {...price: 25}]


