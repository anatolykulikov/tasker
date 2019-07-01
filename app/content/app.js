"use strict";function createTaskСheck(e){var a=document.getElementById("dialog-"+e+"-name").value,t=document.getElementById("dialog-"+e+"-decr").value;0<a.length&&(addTask(a,t),document.getElementById(e).removeEventListener("click",function(){createTaskСheck(e)}),document.getElementById("dialog-"+e).remove())}function addTask(e,a){"tasks"!==app.state&&(app.state="tasks",drawMenu(app.state));var t={id:++app.task_coint,name:e,decr:a,data:getData()};app.plan.push(t),drawTasks("plan"),updateApp()}function deleteTask(e,a,t){e.splice(a,1),drawTasks(t),updateApp()}function moveTask(e,a,t,n){var c=e[n];"work"==a&&"done"==t&&(c.datafinished=getData()),app[t].push(c),e.splice(n,1),drawTasks(a),drawTasks(t),updateApp()}function getData(){return new Date}function humanizeData(e){var a=new Date(e),t=a.getDate(),n=a.getMonth(),c=a.getFullYear(),s=a.getHours(),d=a.getMinutes();d<10&&(d="0"+d);return t+" "+["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"][n]+" "+c+" в "+s+":"+d}function sizeUsed(){var e=(2*JSON.stringify(app).length/1024).toFixed(2);return e+"Кб из 5Мб ("+(e/5120*100).toFixed(2)+"% используется)"}function sizeUsedPercent(){var e=((2*JSON.stringify(app).length/1024).toFixed(2)/5120*100).toFixed(2);return e<1&&(e=1),e}var app;function initApp(){app=localStorage.getItem("TaskerApp")?loadApp():installApp(),notify("success"),drawMain(),drawMenu(app.state)}function installApp(){var e={version:"0.9.5",task_coint:0,plan:[],work:[],done:[],archive:[],state:"tasks"};return localStorage.setItem("TaskerApp",JSON.stringify(e)),notify("success"),e}function loadApp(){var e=JSON.parse(localStorage.getItem("TaskerApp"));return"0.9.5"!==e.version&&(e.state="tasks",e.version="0.9.5"),e}function updateApp(){localStorage.setItem("TaskerApp",JSON.stringify(app))}function deleteApp(){localStorage.removeItem("TaskerApp"),app=null,notify("error"),setTimeout(function(){document.location.reload(!0)},1250)}function drawMain(){document.getElementById("main").innerHTML='<aside class="app__sidebar"><h1>Tasker<span>.app</span></h1><nav class="app__menu" id="appmenu"></nav></aside><div id="appbody" class="app__body"></div>'}function drawMenu(e){switch(app.state=e){case"tasks":document.getElementById("appmenu").innerHTML='<span class="app__menu_addtask" id="addtask">Добавить</span><span class="app__menu_element app__menu-selected">Задачи</span><span class="app__menu_element" onclick="drawMenu(\'archive\')">Архив</span><hr class="app__menu_divider"><span class="app__menu_element" onclick="drawMenu(\'settings\')">Приложение</span>',drawTaskboard();break;case"archive":document.getElementById("appmenu").innerHTML='<span class="app__menu_addtask" id="addtask">Добавить</span><span class="app__menu_element" onclick="drawMenu(\'tasks\')">Задачи</span><span class="app__menu_element app__menu-selected">Архив</span><hr class="app__menu_divider"><span class="app__menu_element" onclick="drawMenu(\'settings\')">Приложение</span>',drawArchive();break;case"settings":document.getElementById("appmenu").innerHTML='<span class="app__menu_addtask" id="addtask">Добавить</span><span class="app__menu_element" onclick="drawMenu(\'tasks\')">Задачи</span><span class="app__menu_element" onclick="drawMenu(\'archive\')">Архив</span><hr class="app__menu_divider"><span class="app__menu_element app__menu-selected">Приложение</span>',drawSettings()}document.getElementById("addtask").addEventListener("click",createTask),updateApp()}function drawTaskboard(){document.getElementById("appbody").innerHTML='<section class="app__task_col"><h2>План</h2><div class="app__wrapper" id="plan"></div></section><section class="app__task_col"><h2>В работе</h2><div class="app__wrapper" id="work"></div></section><section class="app__task_col"><h2>Выполнены</h2><div class="app__wrapper" id="done"></div></section>',drawTasks("plan"),drawTasks("work"),drawTasks("done")}function drawTasks(c){var s=app[c],e="";switch(c){case"plan":for(var a=0;a<s.length;a++){var t="deltask-".concat(s[a].id),n="runtask-".concat(s[a].id);e+='<div class="task"><h3>'.concat(s[a].name,"</h3><p>").concat(s[a].decr,'</p><div class="task__controls"><span class="control-active" id="').concat(n,'">В работу</span><span class="control-delete" id="').concat(t,'">Удалить</span></div></div>')}document.getElementById(c).innerHTML=e;for(var d=function(e){var a="deltask-".concat(s[e].id),t="runtask-".concat(s[e].id);document.getElementById(a).addEventListener("click",function(){deleteTask(s,[e],c)}),document.getElementById(t).addEventListener("click",function(){moveTask(s,"plan","work",[e])})},i=0;i<s.length;i++)d(i);break;case"work":for(var o=0;o<s.length;o++){var p="deltask-".concat(s[o].id),l="donetask-".concat(s[o].id),r="toplantask-".concat(s[o].id);e+='<div class="task"><h3>'.concat(s[o].name,"</h3><p>").concat(s[o].decr,'</p><div class="task__controls"><span class="control-active" id="').concat(l,'">Выполнено</span><span class="control-back"  id="').concat(r,'">В план</span><span class="control-delete" id="').concat(p,'">Удалить</span></div></div>')}document.getElementById(c).innerHTML=e;for(var u=function(e){var a="deltask-".concat(s[e].id),t="donetask-".concat(s[e].id),n="toplantask-".concat(s[e].id);document.getElementById(a).addEventListener("click",function(){deleteTask(s,[e],c)}),document.getElementById(t).addEventListener("click",function(){moveTask(s,"work","done",[e])}),document.getElementById(n).addEventListener("click",function(){moveTask(s,"work","plan",[e])})},m=0;m<s.length;m++)u(m);break;case"done":for(var v=0;v<s.length;v++){var k="deltask-".concat(s[v].id),_="runtask-".concat(s[v].id),g="archtask-".concat(s[v].id);e+='<div class="task"><h3>'.concat(s[v].name,"</h3><p>").concat(s[v].decr,'</p><div class="task__controls"><span class="control-archive" id="').concat(g,'">В архив</span><span class="control-back" id="').concat(_,'">В работу</span><span class="control-delete" id="').concat(k,'">Удалить</span></div></div>')}document.getElementById(c).innerHTML=e,document.getElementById(c).innerHTML=e;for(var h=function(e){var a="deltask-".concat(s[e].id),t="runtask-".concat(s[e].id),n="archtask-".concat(s[e].id);document.getElementById(a).addEventListener("click",function(){deleteTask(s,[e],c)}),document.getElementById(t).addEventListener("click",function(){moveTask(s,"done","work",[e])}),document.getElementById(n).addEventListener("click",function(){moveTask(s,"done","archive",[e])})},f=0;f<s.length;f++)h(f)}}function createTask(){var e=Math.trunc(10*Math.random()),a=document.createElement("div");a.className="modalwrap",a.id="dialog-"+e,a.innerHTML='<div class="dialog"><header>Новая задача</header><div class="dialog__body"><input type="text" id="dialog-'+e+'-name" placeholder="Название задачи"><textarea id="dialog-'+e+'-decr" placeholder="Краткое описание задачи"></textarea><button class="add" id='+e+'>Добавить</button><button class="delete" id="close-'+e+'">Закрыть</button></div></div>',document.body.appendChild(a),document.getElementById(e).addEventListener("click",function(){createTaskСheck(e)}),document.getElementById("close-"+e).addEventListener("click",function(){closeTask(e)})}function closeTask(e){document.getElementById(e).removeEventListener("click",function(){createTaskСheck(e)}),document.getElementById("close-"+e).removeEventListener("click",function(){closeTask(e)}),document.getElementById("dialog-"+e).remove()}function drawArchive(){document.getElementById("appbody").innerHTML='<section class="app__archive"><h2>Архив задач</h2><div class="app__wrapper" id="archive"></div></section><section class="app__archive_decr"><p>Здесь хранятся все выполненные вами задачи</p>',drawArchiveTask()}function drawArchiveTask(){var e=app.archive,a="";if(0!==e.length)for(var t=e.length-1;-1<t;t--){var n=humanizeData(e[t].data),c=void 0;c=e[t].datafinished?humanizeData(e[t].datafinished):"нет данных",a+='<div class="task-archived"><h3>'.concat(e[t].name,"</h3><p>").concat(e[t].decr,"</p><time>Задача создана: ").concat(n,"</time><time>Задача завершена: ").concat(c,"</time></div>")}else a='<div class="empty__archive">В архиве ничего нет</div>';document.getElementById("archive").innerHTML=a}function drawSettings(){var e='<div class="setting__param"><span>Версия приложения:</span>'.concat(app.version,"</div>"),a='<div class="setting__param"><span>Используемое место:</span>'.concat(sizeUsed(),"</div>"),t='<div class="setting__placebar"><span style="width:'.concat(sizeUsedPercent(),'%;"></span></div>'),n='<section class="app__settings"><h2>Сведения о приложении</h2><div class="app__wrapper">'.concat(e+a+t+'<div class="setting__delete"><button onclick="deleteAppProcess()">Удалить все данные</button></div>','</div></section><section class="app__settings_decr"><p>Настройки приложения и основная информация</p><p>Разработчик: <a href="https://anatolykulikov.ru" target="_blank">Анатолий Куликов</a></p><p>Репозиторий на <a href="https://github.com/anatolykulikov/tasker" target="_blank">Github</a></p></section>');document.getElementById("appbody").innerHTML=n}function deleteAppProcess(){var e=document.createElement("div");e.className="modalwrap",e.id="deleteApp",e.innerHTML='<div class="dialog dialog-delete"><header>Удаление приложения</header><div class="dialog__body"><p>Вы собираетесь удалить данные приложения Tasker.</p><p>Все данные будут удалены, восстановить их будет невозможно!</p><button class="add" id="close-deleteApp">Отменить удаление</button><button class="delete" id="KillApp">Удалить</button></div></div>',document.body.appendChild(e),document.getElementById("close-deleteApp").addEventListener("click",closeDeleteApp),document.getElementById("KillApp").addEventListener("click",KillApp)}function closeDeleteApp(){document.getElementById("close-deleteApp").removeEventListener("click",closeDeleteApp),document.getElementById("KillApp").removeEventListener("click",KillApp),document.getElementById("deleteApp").remove()}function KillApp(){document.getElementById("close-deleteApp").removeEventListener("click",closeDeleteApp),document.getElementById("KillApp").removeEventListener("click",KillApp),document.getElementById("deleteApp").remove(),deleteApp()}function notify(e){var a=document.createElement("div");a.className="notify",a.innerHTML='<div class="notify-'.concat(e,'"></div>'),document.body.appendChild(a),setTimeout(function(){a.remove()},1250)}window.onload=function(){initApp()};