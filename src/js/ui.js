function draw_Main() {
    let html = '<aside class="app__sidebar"><h1>Tasker<span>.app</span></h1><nav class="app__menu"><span class="app__menu_addtask" id="addtask">Добавить</span><span class="app__menu_element app__menu-selected">Задачи</span><span class="app__menu_element">Архив</span><hr class="app__menu_divider"><span class="app__menu_element">Настройки</span></nav></aside><div id="appbody" class="app__body"></div>';
    document.getElementById('main').innerHTML = html;
    document.getElementById('addtask').addEventListener('click', addTask);
}

function draw_Taskboard() {
    let html = '<section class="app__task_col"><h2>План</h2><div class="app__task_wrapper" id="plan"></div></section><section class="app__task_col"><h2>В работе</h2><div class="app__task_wrapper" id="work"></div></section><section class="app__task_col"><h2>Выполнены</h2><div class="app__task_wrapper" id="done"></div></section>';   document.getElementById('appbody').innerHTML = html;
    drawTasks('plan');
    drawTasks('work');
    drawTasks('done');
}

function drawTask() {
    let html = '<div class="task"><h3>Название задания</h3><p>Краткое описание задания, не очень много, не более 600 символов (но можно и больше, конечно)</p><div class="task__controls"><span class="control-active">Выполнение</span><span class="control-delete">Удалить</span><span class="control-archive">В архив</span><span class="control-back">Вернуть</span></div></div>';    
}