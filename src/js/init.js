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
    drawMenu(app.state);    
}

function installApp() {
    let app = {
        version: '0.9.5',
        task_coint: 0,
        plan: [],
        work: [],
        done: [],
        archive: [],
        state: 'tasks'
    };
    localStorage.setItem('TaskerApp', JSON.stringify(app));
    notify('success');
    return app;
}
function loadApp() {
    let localapp = JSON.parse(localStorage.getItem('TaskerApp'));
    if(localapp.version !== '0.9.5') {
        localapp.state = 'tasks';
        localapp.version = '0.9.5';
    }
    return localapp;
}
function updateApp() {
    localStorage.setItem('TaskerApp', JSON.stringify(app));
}
function deleteApp() {
    localStorage.removeItem('TaskerApp');
    app = null;
    notify('error');
    setTimeout(function () {
        document.location.reload(true);
    }, 1250);
}