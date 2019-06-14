//
function addTask() {
    let task = {
        id: ++app.task_coint,
        name: 'Задача №'+ app.task_coint,
        decr: 'Описание задачи под номером ' + app.task_coint,
        data: getData()
    }
    app.plan.push(task);
    drawTasks('plan');
    updateApp();
}

function deleteTask(arr, element, from) {
    arr.splice(element, 1);
    drawTasks(from);
    updateApp();
}
function runtask(arr, element) {
    let run = arr[element];
    app.work.push(run);
    arr.splice(element, 1);
    drawTasks('plan');
    drawTasks('work');
    updateApp();
}

function drawTasks(field) {
    let data = app[field];
    let render = '';
    for (let i = 0; i < data.length; i++) {
        let id_delete = `deltask-${data[i].id}`;
        let id_run = `runtask-${data[i].id}`;
        let html = `<div class="task"><h3>${data[i].name}</h3><p>${data[i].decr}</p><div class="task__controls"><span class="control-active" id="${id_run}">Выполнение</span><span class="control-delete" id="${id_delete}">Удалить</span></div></div>`;
        render = render + html;
    }
    document.getElementById(field).innerHTML = render;
    for (let i = 0; i < data.length; i++) {
        let id_delete = `deltask-${data[i].id}`;
        let id_run = `runtask-${data[i].id}`;
        document.getElementById(id_delete).addEventListener('click', function() {deleteTask(data, [i], field);});
        document.getElementById(id_run).addEventListener('click', function() {runtask(data, [i]);});
    }
}

function getData() {
    let data = new Date();
    return data;
};

// Вызов оповещения
function notify(head, message, type) {
    let notify = document.createElement('div');
    notify.id = Math.trunc(Math.random() * 10);
    notify.className = `notify notify-${type} notify-arrive`;
    notify.innerHTML = `<h4>${head}</h4><p>${message}</p>`;
    document.body.appendChild(notify);
    setTimeout(function () {
        notify.classList.remove('notify-arrive');
        setTimeout(function () {
            notify.classList.add('notify-leave')
            setTimeout(function () {
                notify.remove();
            }, 1200);
        }, 4000)
    }, 1000);
}