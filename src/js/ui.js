// Отрисовка приложения
function drawMain() {
    let html = '<aside class="app__sidebar"><h1>Tasker<span>.app</span></h1><nav class="app__menu" id="appmenu"></nav></aside><div id="appbody" class="app__body"></div>';
    document.getElementById('main').innerHTML = html;
}

//Отрисовка меню
function drawMenu(page) {
    app.state = page;
    switch(page) {
        case 'tasks': {
            let html = `<span class="app__menu_addtask" id="addtask">Добавить</span><span class="app__menu_element app__menu-selected">Задачи</span><span class="app__menu_element" onclick="drawMenu('archive')">Архив</span><hr class="app__menu_divider"><span class="app__menu_element" onclick="drawMenu('settings')">Приложение</span>`;
            document.getElementById('appmenu').innerHTML = html;
            drawTaskboard();
        break;}
        case 'archive': {
            let html = `<span class="app__menu_addtask" id="addtask">Добавить</span><span class="app__menu_element" onclick="drawMenu('tasks')">Задачи</span><span class="app__menu_element app__menu-selected">Архив</span><hr class="app__menu_divider"><span class="app__menu_element" onclick="drawMenu('settings')">Приложение</span>`;
            document.getElementById('appmenu').innerHTML = html;
            drawArchive();
        break;}
        case 'settings': {
            let html = `<span class="app__menu_addtask" id="addtask">Добавить</span><span class="app__menu_element" onclick="drawMenu('tasks')">Задачи</span><span class="app__menu_element" onclick="drawMenu('archive')">Архив</span><hr class="app__menu_divider"><span class="app__menu_element app__menu-selected">Приложение</span>`;
            document.getElementById('appmenu').innerHTML = html;
            drawSettings();
        break;}
    }
    document.getElementById('addtask').addEventListener('click', createTask);
    updateApp();
}

// Отрисовка доски задач
function drawTaskboard() {
    let html = '<section class="app__task_col"><h2>План</h2><div class="app__wrapper" id="plan"></div></section><section class="app__task_col"><h2>В работе</h2><div class="app__wrapper" id="work"></div></section><section class="app__task_col"><h2>Выполнены</h2><div class="app__wrapper" id="done"></div></section>';
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
        dialog.className = 'modalwrap';
        dialog.id = 'dialog-' + addTaskId;
        dialog.innerHTML = '<div class="dialog"><header>Новая задача</header><div class="dialog__body"><input type="text" id="dialog-' + addTaskId + '-name" placeholder="Название задачи"><textarea id="dialog-' + addTaskId + '-decr" placeholder="Краткое описание задачи"></textarea><button class="add" id=' + addTaskId + '>Добавить</button><button class="delete" id="close-' + addTaskId + '">Закрыть</button></div></div>';
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

// Отрисовка архива
function drawArchive() {
    let html = '<section class="app__archive"><h2>Архив задач</h2><div class="app__wrapper" id="archive"></div></section><section class="app__archive_decr"><p>Здесь хранятся все выполненные вами задачи</p>';
    document.getElementById('appbody').innerHTML = html;
    drawArchiveTask();
}
// Отрисовка задачи из архива
function drawArchiveTask() {
    let data = app.archive;
    let render = '';
    if(data.length !== 0) {
        for(let i = data.length - 1; i > -1; i--) {
            let dataCreateTask = humanizeData(data[i].data);
            let dataFinishedTask
            if(data[i].datafinished) {
                dataFinishedTask = humanizeData(data[i].datafinished);
            } else {
                dataFinishedTask = 'нет данных';
            }
            let html = `<div class="task-archived"><h3>${data[i].name}</h3><p>${data[i].decr}</p><time>Задача создана: ${dataCreateTask}</time><time>Задача завершена: ${dataFinishedTask}</time></div>`;
            render = render + html;
        }
    } else {
        render = '<div class="empty__archive">В архиве ничего нет</div>'
    }
    document.getElementById('archive').innerHTML = render;
}

// Отрисовка настроек
function drawSettings() {
    let appVersion = `<div class="setting__param"><span>Версия приложения:</span>${app.version}</div>`;
    let usedPlace = `<div class="setting__param"><span>Используемое место:</span>${sizeUsed()}</div>`;
    let usedBar = `<div class="setting__placebar"><span style="width:${sizeUsedPercent()}%;"></span></div>`;
    let delele = `<div class="setting__delete"><button onclick="deleteAppProcess()">Удалить все данные</button></div>`;
    let html = `<section class="app__settings"><h2>Сведения о приложении</h2><div class="app__wrapper">${appVersion + usedPlace + usedBar + delele}</div></section><section class="app__settings_decr"><p>Настройки приложения и основная информация</p><p>Разработчик: <a href="https://anatolykulikov.ru" target="_blank">Анатолий Куликов</a></p><p>Репозиторий на <a href="https://github.com/anatolykulikov/tasker" target="_blank">Github</a></p></section>`;
    document.getElementById('appbody').innerHTML = html;
}

// Полное удаление приложения
function deleteAppProcess() {
    let dialog = document.createElement('div');
        dialog.className = 'modalwrap';
        dialog.id = 'deleteApp';
        dialog.innerHTML = '<div class="dialog dialog-delete"><header>Удаление приложения</header><div class="dialog__body"><p>Вы собираетесь удалить данные приложения Tasker.</p><p>Все данные будут удалены, восстановить их будет невозможно!</p><button class="add" id="close-deleteApp">Отменить удаление</button><button class="delete" id="KillApp">Удалить</button></div></div>';

    document.body.appendChild(dialog);
    document.getElementById('close-deleteApp').addEventListener('click', closeDeleteApp);
    document.getElementById('KillApp').addEventListener('click', KillApp);
}
function closeDeleteApp() {
    document.getElementById('close-deleteApp').removeEventListener('click', closeDeleteApp);
    document.getElementById('KillApp').removeEventListener('click', KillApp);
    document.getElementById('deleteApp').remove();
}
function KillApp() {
    document.getElementById('close-deleteApp').removeEventListener('click', closeDeleteApp);
    document.getElementById('KillApp').removeEventListener('click', KillApp);
    document.getElementById('deleteApp').remove();
    deleteApp();
}

// Вызов оповещения
function notify(type) {
    let notify = document.createElement('div');
    notify.className = 'notify';
    notify.innerHTML = `<div class="notify-${type}"></div>`; 
    document.body.appendChild(notify);
    setTimeout(function () {
        notify.remove();
    }, 1250);
}