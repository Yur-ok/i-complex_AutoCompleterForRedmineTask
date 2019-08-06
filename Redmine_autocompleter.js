// ==UserScript==
// @name         AutoCompleterForRedmine
// @version      0.4
// @description  Complete task in Redmine
// @author       YuriyB
// @match        http://ic-engine.ru/issues/*
// @run-at document-body
// ==/UserScript==


// объявлем нужные переменные
var status = 7, // это статус "протестировать"
    readiness = 100, // это готовность "100%"
    development = 9; // это деятельность "разработка"


// ф-ия для простановки нужных значений в выпадающих списках
var setValue = function(elementID, valueToSelect){
    var element = document.getElementById(elementID);
    var option = element.options;
    option[0].removeAttribute("selected");
    for (var i = 1; i < option.length; i++) {
        if (option[i].value == valueToSelect){
            option[i].setAttribute("selected", "selected");
            break;
        }
    }
};

// ф-ия для заполнения времени и описания
let fillInput = function(elementID, taskInput){
    let element = document.getElementById(elementID);
    if(element.value !== null){
        taskInput.value = element.value;
    };
};

// действия выполняемы после нажатия на кнопку Complete
let closeTask = function(){
    let taskTime = document.getElementById("time_entry_hours"), // поле для ввода времени в Redmine
        taskDesc = document.getElementById("issue_notes"), // поле для ввода описания
        timeForFill = document.getElementById("spended_time").value, // значение поля времени из доп. формы
        descForFill = document.getElementById("desc_for_fill").value; // значение поля описания из доп. формы
    // Находим кнопку "обновить"
    document.links[35].click();
    // Меняем статус задачи на "Протестировать"
    setValue("issue_status_id", status);
    // Меняем "готовность" на 100%
    setValue("issue_done_ratio", readiness);
    // Меняем деятельность на "Разработка"
    setValue("time_entry_activity_id", development);
    // Ставим время
    // если время передано, тогда указываем его иначе оставляем поле пустым
    if (timeForFill !== null) {
        taskTime.value = timeForFill;
    }
    // добавляем описание
    if (descForFill !== null) {
        taskDesc.value = descForFill;
    };
    // Нажимаем "Принять"
    document.getElementsByName("commit")[1].click();
};
// проверка на то, что время указано и после этого разблокируется кнопка иначе кнопка отключена
// ПОКА НЕ ИСПОЛЬЗУЕТСЯ
/* let switchButton = function(){
    var btn = document.getElementById("complete"),
        input = document.getElementById("spended_time");
    if(input.value){
        btn.removeAttribute("disabled");
    };
}; */
// отрисовка формы
(function run() {
    'use strict';
    // создаем контейнер с элементами и стилизуем его
    let forma = document.createElement("div");
    forma.style.position = "absolute";
    forma.style.top = "30px";
    forma.style.left = "30%";
    forma.style.width = "400px";
    forma.style.padding = "2px";
    forma.style.display = "flex";
    forma.style.flexDirection = "column";
    forma.style.justifyContent = "space-around";
    forma.style.background = "yellow";
    forma.setAttribute("id", "forma");
    let inputTime = document.createElement("input");
    inputTime.style.paddingLeft = "5px";
    inputTime.style.marginBottom = "2px";
    inputTime.setAttribute("placeholder", "Time");
    inputTime.setAttribute("id", "spended_time");
    inputTime.setAttribute("autofocus", "");
    /*     inputTime.addEventListener("onchange", switchButton); */
    let inputDesc = document.createElement("textarea");
    inputDesc.style.padding = "5px";
    inputDesc.setAttribute("placeholder", "Description");
    inputDesc.setAttribute("id", "desc_for_fill");
    inputDesc.style.marginBottom = "2px";
    let completeButton = document.createElement("button");
    completeButton.innerHTML = "Complete";
    completeButton.setAttribute("id", "complete");
    /*     completeButton.setAttribute("disabled", ""); */
    completeButton.addEventListener("click", closeTask);
    // объединяем их
    forma.append(inputTime, inputDesc, completeButton);
    // добавлем его в body
    document.body.append(forma);
})();