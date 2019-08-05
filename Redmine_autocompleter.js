// ==UserScript==
// @name         Auto completer for Redmine
// @version      0.1
// @description  Complete task in Redmine
// @author       YuriyB
// @match        http://ic-engine.ru/issues/*
// @run-at document-body
// ==/UserScript==

let closeTask = function(time = null){
    console.log('work!');
    // Находим кнопку "обновить"
    /*     let taskPath = location.pathname + '/edit';
    taskPath.click(); */
    document.links[35].click();
    // Меняем статус задачи на "Протестировать"
    let issueStatusID = document.getElementById("issue_status_id");
    issueStatusID.options[0].removeAttribute("selected");
    issueStatusID.options[4].setAttribute("selected", "selected");
    // Меняем "готовность" на 100%
    let issueDoneRatio = document.getElementById("issue_done_ratio");
    issueDoneRatio.options[0].removeAttribute("selected");
    issueDoneRatio.options[10].setAttribute("selected", "selected");
    // Меняем деятельность на "Разработка"
    let timeEntryActivity = document.getElementById("time_entry_activity_id");
    timeEntryActivity.options[2].setAttribute("selected", "selected");
    // Ставим время
    // здесь надо добавить условие, если время передано, тогда указываем его иначе оставляем поле пустым
    let timeSpent = document.getElementById("time_entry_hours");
    if (time !== null) {
        timeSpent.value = time;
    }
    // Нажимаем "Принять"
    let save = document.querySelectorAll("input");
    save[save.length-1].click();
};

function run() {
    'use strict';
    // Your code here...
    // создаем элементы
    // создаем контейнер и стилизуем его
    let forma = document.createElement("div");
    forma.style.position = "absolute";
    forma.style.top = "30px";
    forma.style.left = "40%";
    forma.style.width = "200px";
    forma.style.padding = "5px";
    forma.style.display = "flex";
    forma.style.flexDirection = "column";
    forma.style.justifyContent = "space-around";
    forma.style.background = "yellow";
    forma.setAttribute("id", "forma");
    let inputTime = document.createElement("input");
    inputTime.style.paddingLeft = "5px";
    inputTime.style.marginBottom = "5px";
    inputTime.setAttribute("placeholder", "Time");
    inputTime.setAttribute("autofocus", "");
    let inputDesc = document.createElement("textarea");
    inputDesc.style.padding = "5px";
    inputDesc.setAttribute("placeholder", "Description");
    let completeButton = document.createElement("button");
    completeButton.innerHTML = "Complete";
    completeButton.setAttribute("id", "complete");
    /*     completeButton.setAttribute("onclick", "closeTask(" + inputTime.value + ")"); */
    completeButton.addEventListener("click", closeTask);
    // объединяем их
    forma.append(inputTime, inputDesc, completeButton);
    // добавлем его в body
    document.body.append(forma);
};
run();