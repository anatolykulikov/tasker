class App {
    constructor(plan, work, ready, archive, counter, version, username, active) {
        this.plan = [];
        this.work = [];
        this.ready = [];
        this.archive = [];
        this.counter = 0;
        this.version = 1;
        this.username = '';
        this.active = false;
    }
    // Инициализация приложения
    install() {
        app.active = true;
        localStorage.setItem('TaskerApp', JSON.stringify(app));
        console.log('Локальное хранилище создано');
    }

    // Добавление задания
    addTask() {
        let ask = prompt('Enter', 'Пробный таск');
        let task = {
            id: ++app.counter,
            name: ask,
            content: '',
            date: getData()
        };
        this.plan.push(task);
        updateStorage();
    }
}

function getData() {
    // Получаем текущую дату
    let date = new Date();
    // День
    let day = date.getDay();
    if (day < 10) day = '0' + day;
    // Месяц
    let month = date.getMonth();
    let mountNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    let monthName = mountNames[month];
    // Год
    let year = date.getFullYear();
    // собираем и возвращаем
    let response = date.getHours() + ':' + date.getMinutes()  + ' | ' + day + ' ' + monthName  + ' ' + year;
    return response;
}


function renderPlan() {
    app.renderPlan();
}