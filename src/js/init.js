function initApp() {
    // Приложение установлено
    if(localStorage.getItem('TaskerApp')) {
        app = loadApp();
        notify('success');
    } else {
        app = installApp();
        notify('success');
    }
    drawMain();
    drawMenu('tasks');
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
    notify('success');
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
    notify('error');
    drawMain();
    drawTaskboard();
}