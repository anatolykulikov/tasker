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
// Приведение даты к человеческому состоянию
function humanizeData(d) {
    let data = new Date(d);
    let day = data.getDate(),
        month = data.getMonth(),
        year = data.getFullYear(),
        hour = data.getHours(),
        minute = data.getMinutes();
    let monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    let humanMonth = monthNames[month];
    let response = day + ' ' + humanMonth + ' ' + year + ' в ' + hour + ':' + minute;
    return response;
}


// Свободное место
function sizeUsed() {
    let appToString = JSON.stringify(app);
    let appSize = ((appToString.length * 2) / 1024).toFixed(2);
    let percent = ((appSize / 5120) * 100).toFixed(2);
    let response = appSize + 'Кб из 5Мб (' + percent +'% используется)';
    return response;
}
function sizeUsedPercent() {
    let appToString = JSON.stringify(app);
    let appSize = ((appToString.length * 2) / 1024).toFixed(2);
    let percent = ((appSize / 5120) * 100).toFixed(2);
    if(percent < 1) {
        percent = 1;
    }
    return percent;
}