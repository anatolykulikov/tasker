// Отрисовка приложения
function draw_Main() {
    let html = '<aside class="app__sidebar"><h1>Tasker<span>.app</span></h1><nav class="app__menu"><span class="app__menu_addtask" id="addtask">Добавить</span><span class="app__menu_element app__menu-selected">Задачи</span><span class="app__menu_element">Архив</span><hr class="app__menu_divider"><span class="app__menu_element">Настройки</span></nav></aside><div id="appbody" class="app__body"></div>';
    document.getElementById('main').innerHTML = html;
    document.getElementById('addtask').addEventListener('click', createTask);
}

// Отрисовка доски задач
function draw_Taskboard() {
    let html = '<section class="app__task_col"><h2>План</h2><div class="app__task_wrapper" id="plan"></div></section><section class="app__task_col"><h2>В работе</h2><div class="app__task_wrapper" id="work"></div></section><section class="app__task_col"><h2>Выполнены</h2><div class="app__task_wrapper" id="done"></div></section>';
    document.getElementById('appbody').innerHTML = html;
    drawTasks('plan');
    drawTasks('work');
    drawTasks('done');
}

// Отрисовка задачи
function drawTasks(field) {
    let data = app[field];
    let render = '';

    switch(field) {
        // Отрисовываем элементы в плане
        case 'plan': {
            for (let i = 0; i < data.length; i++) {
                let id_delete = `deltask-${data[i].id}`;
                let id_run = `runtask-${data[i].id}`;
                let html = `<div class="task"><h3>${data[i].name}</h3><p>${data[i].decr}</p><div class="task__controls"><span class="control-active" id="${id_run}">В работу</span><span class="control-delete" id="${id_delete}">Удалить</span></div></div>`;
                render = render + html;
            }
            document.getElementById(field).innerHTML = render;
            for (let i = 0; i < data.length; i++) {
                let id_delete = `deltask-${data[i].id}`;
                let id_run = `runtask-${data[i].id}`;
                document.getElementById(id_delete).addEventListener('click', function() {
                    deleteTask(data, [i], field);
                });
                document.getElementById(id_run).addEventListener('click', function() {
                    moveTask(data, 'plan', 'work', [i]);
                });
            }
        break;
        }
        case 'work': {
            for (let i = 0; i < data.length; i++) {
                let id_delete = `deltask-${data[i].id}`;
                let id_done = `donetask-${data[i].id}`;
                let id_plan = `toplantask-${data[i].id}`;
                let html = `<div class="task"><h3>${data[i].name}</h3><p>${data[i].decr}</p><div class="task__controls"><span class="control-active" id="${id_done}">Выполнено</span><span class="control-back"  id="${id_plan}">В план</span><span class="control-delete" id="${id_delete}">Удалить</span></div></div>`;
                render = render + html;
            }
            document.getElementById(field).innerHTML = render;
            for (let i = 0; i < data.length; i++) {
                let id_delete = `deltask-${data[i].id}`;
                let id_done = `donetask-${data[i].id}`;
                let id_plan = `toplantask-${data[i].id}`;
                document.getElementById(id_delete).addEventListener('click', function() {
                    deleteTask(data, [i], field);
                });
                document.getElementById(id_done).addEventListener('click', function() {
                    moveTask(data, 'work', 'done', [i]);
                });
                document.getElementById(id_plan).addEventListener('click', function() {
                    moveTask(data, 'work', 'plan', [i]);
                });
            }
        break;
        }
        case 'done': {
            for (let i = 0; i < data.length; i++) {
                let id_delete = `deltask-${data[i].id}`;
                let id_run = `runtask-${data[i].id}`;
                let id_archive = `archtask-${data[i].id}`;
                let html = `<div class="task"><h3>${data[i].name}</h3><p>${data[i].decr}</p><div class="task__controls"><span class="control-archive" id="${id_archive}">В архив</span><span class="control-back" id="${id_run}">В работу</span><span class="control-delete" id="${id_delete}">Удалить</span></div></div>`;
                render = render + html;
            }
            document.getElementById(field).innerHTML = render;
            document.getElementById(field).innerHTML = render;
            for (let i = 0; i < data.length; i++) {
                let id_delete = `deltask-${data[i].id}`;
                let id_run = `runtask-${data[i].id}`;
                let id_archive = `archtask-${data[i].id}`;
                document.getElementById(id_delete).addEventListener('click', function() {
                    deleteTask(data, [i], field);
                });
                document.getElementById(id_run).addEventListener('click', function() {
                    moveTask(data, 'done', 'work', [i]);
                });
                document.getElementById(id_archive).addEventListener('click', function() {
                    moveTask(data, 'done', 'archive', [i]);
                });
            }
        break;
        }
    }
}

// Окно добавления задания
function createTask() {
    let addTaskId = Math.trunc(Math.random() * 10);
    let dialog = document.createElement('div');
        dialog.className = 'dialog';
        dialog.id = 'dialog-' + addTaskId;
        dialog.innerHTML = '<header>Новая задача</header><div class="dialog__body"><input type="text" id="dialog-' + addTaskId + '-name" placeholder="Название задачи"><textarea id="dialog-' + addTaskId + '-decr" placeholder="Краткое описание задачи"></textarea><button class="add" id=' + addTaskId + '>Добавить</button><button class="delete" id="close-' + addTaskId + '">Закрыть</button></div>';

    document.body.appendChild(dialog);
    document.getElementById(addTaskId).addEventListener('click', function() {
        createTaskСheck(addTaskId);
    });
    document.getElementById('close-'+addTaskId).addEventListener('click', function() {
        closeTask(addTaskId);
    });
}

// Закрытие окна добавления задания
function closeTask(id) {
    document.getElementById(id).removeEventListener('click', function() {
        createTaskСheck(id);
    });
    document.getElementById('close-'+id).removeEventListener('click', function() {
        closeTask(id);
    });
    document.getElementById('dialog-' + id).remove();
}

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