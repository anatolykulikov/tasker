function initApp() {
    // Приложение установлено
    if(localStorage.getItem('TaskerApp')) {
        app = loadApp();
        notify('Готово', 'Все данные загружены', 'success');
    } else {
        app = installApp();
        notify('Установлено', 'Приложение успешно установлено и готово к работе', 'success');
    }
    draw_Main();
    draw_Taskboard();
}

function installApp() {
    let app = {
        version: 1,
        task_coint: 0,
        plan: [],
        work: [],
        done: [],
        archive: []
    };
    localStorage.setItem('TaskerApp', JSON.stringify(app));
    notify('Готово!','Приложение успешно установлено и готово к работе', 'success');
    return app;
}
function loadApp() {
    app = JSON.parse(localStorage.getItem('TaskerApp'));
    return app;
}
function updateApp() {
    localStorage.setItem('TaskerApp', JSON.stringify(app));
}
function deleteApp() {
    localStorage.removeItem('TaskerApp');
    notify('Приложение удалено','Приложение полностью удалено, все данные уничтожены', 'error');
}