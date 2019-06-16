// Проверка заполнения задания
function createTaskСheck(id) {
    let taskName = document.getElementById('dialog-' + id + '-name').value;
    let taskDesc = document.getElementById('dialog-' + id + '-decr').value;

    if(taskName.length > 0 && taskDesc .length > 0) {
        addTask(taskName, taskDesc);
        document.getElementById(id).removeEventListener('click', function() {
            createTaskСheck(id);
        });
        document.getElementById('dialog-' + id).remove();
    }
}

// Добавление задачи
function addTask(name, desc) {
    let task = {
        id: ++app.task_coint,
        name: name,
        decr: desc,
        data: getData()
    }
    app.plan.push(task);
    drawTasks('plan');
    updateApp();
}

// Удаление задачи
function deleteTask(arr, element, from) {
    arr.splice(element, 1);
    drawTasks(from);
    updateApp();
}

// Перемещение задачи
function moveTask(arr, from, to, element) {
    console.info(`Переместить задачу id${element} из ${from} в ${to}`);
    let run = arr[element];
    app[to].push(run);
    arr.splice(element, 1);
    drawTasks(from);
    drawTasks(to);
    updateApp();
}

// Функция текущей даты
function getData() {
    let data = new Date();
    return data;
};