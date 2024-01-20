import { $g } from '../Modules/helpers.js'
window.onload = () => {
    initScreen();
}
//格式 [{id: "1705556777588", todo: "事情", completeness: true}]
const localStorageKey = "my-todo";
let todoItemArray = [];
const todoAddInput = document.querySelector('#todo_input');
const addBtn = document.querySelector('#button-add');
let todo_template = $g('#todo-template') //抓取template元素


addBtn.addEventListener("click", () => {
    //防呆
    if (todoAddInput.value.trim() === "") {
        todoAddInput.value = "";
        return
    }
    addTodoList(todoAddInput.value);
    initScreen();
    todoAddInput.value = "";
})

function addTodoList(content) {
    const todoItemObject = { "id": Date.now().toString(), "todo": content, "completeness": false }
    todoItemArray.push(todoItemObject);
    saveStorage();
}

// 儲存資料到 localStorage
function saveStorage() {
    const jsonStr = JSON.stringify(todoItemArray);
    localStorage.setItem(localStorageKey, jsonStr);
}

//創造事項清單 渲染畫面
function createTodoItems(item) {
    let cloneTodo = todo_template.content.cloneNode(true); //複製一份todo_template
    cloneTodo.querySelector('.input-group.mb-1').id = item.id; // 設置id 
    const input = cloneTodo.querySelector('.form-control');
    input.value = item.todo; //設置事項內容
    input.disabled = true;  //關閉內容框
    const editBtn = cloneTodo.querySelector('.btn-renew');
    const saveBtn = cloneTodo.querySelector('.btn-save');
    const deleteBtn = cloneTodo.querySelector('.btn-delete');
    const checkBox = cloneTodo.querySelector('.checkbox');

    saveBtn.style.display = "none"; //隱藏保存按鈕

    //初始勾選狀況  值true為打勾 (id 為當下這筆的id)
    if (item.completeness == true) {
        checkBox.checked = true;
        input.classList.add("text-decoration-line-through") //字加上刪除線
    }

    //創造事項同時設定清單內按鈕
    checkBox.addEventListener("change", () => {
        item.completeness = checkBox.checked;
        saveStorage();

        const todoItemContainer = saveBtn.parentNode; // 獲取父層
        const todoItemContent = todoItemContainer.querySelector('.todo_content') // 獲取要動作的內容
        if (checkBox.checked) {
            todoItemContent.classList.add("text-decoration-line-through")
        } else {
            todoItemContent.classList.remove("text-decoration-line-through")
        }
    })

    //編輯 把事件框打開
    editBtn.addEventListener("click", () => {
        input.disabled = false
        saveBtn.style.display = "";
        editBtn.style.display = "none"; //隱藏編輯按鈕
    })

    //更改內容且保存
    saveBtn.addEventListener("click", () => {
        const todoItemContainer = saveBtn.parentNode; // 獲取父層
        const todoItemNewContent = todoItemContainer.querySelector('.todo_content').value//獲取要動作的內容

        if (todoItemNewContent.trim() !== "") {
            item.todo = todoItemNewContent;
            saveStorage();
        } else {
            return;
        }

        input.disabled = true;
        saveBtn.style.display = "none";
        editBtn.removeAttribute("style"); //d-none
    })

    deleteBtn.addEventListener("click", () => {
        const todoItemContainer = deleteBtn.parentNode; // 獲取當筆資料的父層
        const idx = todoItemArray.indexOf(item); //找到當筆資料在陣列中的索引
        todoItemArray.splice(idx, 1);
        todoItemContainer.remove();
        saveStorage();
    })
    document.querySelector(".todoItems-container").append(cloneTodo);
}

//取得localStorage資料
function getTodoFromStorage() {
    const todoArray = JSON.parse(localStorage.getItem(localStorageKey));//轉換格式 取出來
    if (todoArray) {
        todoItemArray = todoArray; //全部的JSON資料 這裡是轉成陣列 if(todoArray)如果有的話放進todoItemArray
    }
}

function initScreen() {
    //初始畫面
    document.querySelector(".todoItems-container").innerHTML = ""; //清空事項清單
    getTodoFromStorage();
    if (todoItemArray.length === 0) return; //陣列沒有內容不載入
    todoItemArray.forEach(item => {
        createTodoItems(item);
    })
}
