var app;

// Проверка локального хранилища
function loadStorage() {
    if(localStorage.length == 0) {
        console.log('Локальное хранилище пусто');
        app = new App;
        app.install();
    } else {
        console.log('Приложение активно');
        app = new App;
    }
}

function updateStorage() {
    localStorage.setItem('Tasker', JSON.stringify(app));
    console.log('Локальное хранилище обновлено');
};

// Очистка локального хранилища
function clearStorage() {
    localStorage.clear();
    app = undefined;
    console.log('Локальное хранилище полностью удалено');
};