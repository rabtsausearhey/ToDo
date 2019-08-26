const SUCCESS_CODE = "ok";
const COMPLETED_STATUS = 'completed!';
const PROGRESS_STATUS = 'in progress';
let user = -1;

$(document).ready(function () {
    initControls();
});

function initControls() {
    $.ajaxSetup({'dataType': 'json'});
    $('.modal-control-btn-cancel').click(closeModal);
    $('#home-page').click(moveToHomePage);
    $('#task-page').click(moveToTasksPage);
    $('#settings-page').click(moveToSettings);
}

function initTasksControls() {
    $('#add-todo').click(showCreateTaskModal);
    $('#save-task-btn').click(saveTask);
    $('.modal-control-btn-cancel').click(closeModal);
    $('.tasks-manip').click(showManagmentTaskModal);
    $('#remove-task').click(removeTask)
    $('#apply-task-changes').click(updateTask);
    $('.acc-btn').click(showSecurityMenu);
}

function showSecurityMenu() {
    let element = $('#security-menu');


    const elClass = element.attr('class');

    if(elClass){
        if (elClass==='security-menu-open') {
            element.removeClass('security-menu-open');
            element.addClass('security-menu-close');
        }else{
            element.removeClass('security-menu-close');
            element.addClass('security-menu-open');
        }
    }else{
        element.addClass('security-menu-open');
    }
}

function updateTaskStatus(id, status, successF) {
    const url = '/api/update-task-status';
    const dataF = {id, status};
    $.ajax({url: url, method: 'PUT', data: dataF, success: successF, dataType: 'json'})
}

function updateTask() {
    const url = '/api/update-task';
    const id = $('#manegment-task-id').text();
    const status = $('#update-task-status').val();
    const priority = $('#update-task-priority').val();
    const content = $('#update-task-content-text').val();
    const dataF = {id, status, priority, content};
    const successF = data => {
        if (data.code === SUCCESS_CODE) {
            const target = $(`#${id}`);
            if (status === 'completed!') {
                $('#completed-pool').append(target)
            } else {
                $('#task-pool').append(target)
            }

            target.find('.tasks-content-in-pool').text(content);
            target.find('.status-in-pool').text(status);
            target.find('.priority-in-pool').text(priority);
            closeModal();
        } else {
            alert(data["message"]);
        }
    };
    $.ajax({url: url, method: 'PUT', data: dataF, success: successF, dataType: 'json'})

}

function removeTask() {
    const id = $('#manegment-task-id').text();
    const url = '/api/remove-task';
    const data = {
        'taskId': id
    };

    const successF = data => {
        if (data.code === SUCCESS_CODE) {
            $(`#${id}`).remove();
            closeModal();
        } else {
            alert(data["message"]);
        }
    };

    $.ajax(url, {type: 'DELETE', success: successF, dataType: 'json', data: data})
}

function showCreateTaskModal() {
    $('#create-task-modal').css('visibility', 'visible')
}

function closeModal() {
    $('.todo-modal').css('visibility', 'collapse')
}

function saveTask() {
    const date = new Date();
    let month = date.getMonth() + '';
    let min = date.getMinutes() + '';
    if (min.length < 2) {
        min = '0' + min;
    }
    if (month.length < 2) {
        month = '0' + month;
    }
    const dataR = {
        "owner": $('#new-task-owner').text(),
        "ownerImg": $('#new-task-owner-img').val(),
        "date": date.getDate() + '.' + month + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + min,
        "status": "start",
        "name": $('#new-task-name').val(),
        "content": $('#new-task-content-text').val(),
        "priority": $('#new-task-priority').val()
    };
    const url = '/api/new-task';
    const success = data => {
        if (data['code'] === SUCCESS_CODE) {
            const id = data.id;
            const taskHtml =
                `<div class="task" id="${id}" draggable="true" ondragstart="drag(event)">
                    <img class="owner-img" src="${dataR.ownerImg}" alt="${dataR.owner}">
                    <div class="tasks-conteiner-for-content">
                        <div class="tasks-name-in-pool">${dataR.name}</div>
                        <div class="tasks-content-in-pool">${dataR.content}</div>
                    </div>
                    <div class="created-date-in-pool">${dataR.date}</div>
                    <div class="priority-in-pool">${dataR.priority}</div>
                    <div class="status-in-pool">${dataR.status}</div>
                    <span class="glyphicon glyphicon-option-vertical tasks-manip"></span>
                </div>`;
            $('#task-pool').append(taskHtml);
            $(`#${id}`).find('.tasks-manip').click(showManagmentTaskModal)
        }
        closeModal()
    };
    $.post(url, dataR, success)
}

function showManagmentTaskModal() {
    const parent = $(this).parent();
    $('#update-task-content-text').text(parent.find('.tasks-content-in-pool').text());
    const id = parent.attr('id');
    $('#manegment-task-id').text(id);
    $('#task-manegment-modal').css('visibility', 'visible')
}

function moveToHomePage() {
    const url = '/api/home-page-content';
    const success = data => {
        if (data.code === SUCCESS_CODE) {
            $('#right-block').html(data.html);
        } else {
            alert(data["message"]);
        }
    };
    $.get(url, success)
}

function moveToTasksPage() {
    const url = '/api/tasks-page-content';
    const data = {};
    const success = data => {
        if (data.code === SUCCESS_CODE) {
            $('#right-block').html(data.html);
            initTasksControls();
        } else {
            alert(data["message"]);
        }
    };
    $.get(url, data, success);
}

function moveToSettings() {
    const url = '/api/settings-page-content';
    const success = data => {
        if (data.code === SUCCESS_CODE) {
            $('#right-block').html(data.html);
        } else {
            alert(data["message"]);
        }
    };
    $.get(url, success)
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropP(ev) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");

    const successF = data => {
        if (data.code === SUCCESS_CODE) {
            const element = $(`#${id}`);
            element.find('.status-in-pool').text(PROGRESS_STATUS).css('color', '#5f5f5f');
            $('#task-pool').append(element);
            countTasks()
        } else {
            alert(data.message)
        }
    };
    updateTaskStatus(id, PROGRESS_STATUS, successF)
}

function dropC(ev) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");

    const successF = data => {
        if (data.code === SUCCESS_CODE) {
            const element = $(`#${id}`);
            element.find('.status-in-pool').text(COMPLETED_STATUS).css('color', '#7ac974');
            const compPool = $('#completed-pool');
            compPool.append(element);
            countTasks()
        } else {
            alert(data.message)
        }
    };
    updateTaskStatus(id, COMPLETED_STATUS, successF)
}

function countTasks() {
    const compPool = $('#completed-pool');
    const progPool = $('#tasks');
    const pCount = progPool.find('.task').length;
    progPool.find('.tasks-count').text(`(${pCount})`);
    const cCount = compPool.find('.task').length;
    $('#completed-tasks').find('.tasks-count').text(`(${cCount})`);
}
