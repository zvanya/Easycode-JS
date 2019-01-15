/**
 * TODOS
 * 1. Добавление задачи
 * 2. Удаление задачи
 * 3. Редактирование задачи
 */

 /**
 * Одна задача это объект из следующих полей
 * id - произвольная уникальная строка
 * title - заголовок задачи
 * text - текст задачи
 */


 /**
  * todosStorage - обьект для хранения всех todos
  */
 const todosStorage = {
     currentTodos: [],
     deletedTodos: []
 };

/**
 * 
 * @param {String} title 
 * @param {String} text
 * @returns {[]} currentTodos
 */
 const addTodoItem = (title, text) => {
    if (!title) return console.log('Please provide todo title');
    if (!text) return console.log('Please provide todo text');

    todosStorage.currentTodos.push({title, text, id: generateId()});
    return todosStorage.currentTodos;
 };

 /**
 * generateId - создает произвольную строку 
 * @returns {string} - новый id
 */
// const generateId = () => {
//     const uniqueValues = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
//     let id = '';
//
//     for (let i = 0; i < 10; i++) {
//         const index = Math.floor(Math.random() * uniqueValues.length);
//         id += uniqueValues[index];
//     }
//
//     return id;
// };

const generateId = () => {
    const uniqueValues = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    return "ssssssssss".replace(/s/g, () => uniqueValues[Math.floor(Math.random() * uniqueValues.length)]);
};

/**
 * 
 * @param {String} id 
 * @returns {[]} currentTodos
 */
const deleteTodoItem = (id) => {
    if (!id) return console.log("Передайте id удаляемой задачи.");
    
    todosStorage.currentTodos = todosStorage.currentTodos.filter((todoItem) => todoItem.id !== id);
    return todosStorage.currentTodos;
};

/**
 * editTodoItem - Изменяет поля title и text todoItem с id равным id
 * @param {String} id 
 * @param {String} title
 * @param {String} text
 * @returns {boolean}
 */
const editTodoItem = (id, title, text) => {
    if (!!!todosStorage.currentTodos.filter((todoItem) => todoItem.id === id).length) return false; // В списке нет задачи с таким id
    
    todosStorage.currentTodos.forEach((item) => {
        if (item.id === id) {
            if (title) item.title = title;
            if (text) item.text = text;
        }
    });
    
    return true;
};
