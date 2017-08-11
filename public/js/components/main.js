$(window).on('load', getUsers);

$('body')
    .on('click', '.edit', editUser)
    .on('click', '.delete', deleteUser)
    .on('click', '.save', saveUser)
    .on('click', '.back', backUser);

function getUsers () {
    $.ajax('http://localhost:3000/users')
        .done(function (data) {
            renderUsers(data);
        })
        .catch(renderDatabaseError);
}

function renderDatabaseError () {
    let databaseErrorCode = `<div class="user">No connection to database</div>`;

    $(databaseErrorCode).appendTo('.userlist-wrapper');
    $('.user').addClass('database-error');
}

function renderUsers (data) {
    $.each(data, function(key, value) {
        let userCode = `<form class="user"><span class="db-id">${value.id}</span> <span class="db-name">${value.name}</span> <span class="db-email">${value.email}</span><input type="button" class="button delete" value="Delete"><input type="button" class="button edit" value="Edit"></form>`;

        $(userCode).appendTo('.userlist-wrapper');
    });
}

function editUser () {
    let currentCode = $(this).parent().html();
    let id = $(this).parent().find('.db-id').text();
    let name = $(this).parent().find('.db-name').text();
    let email = $(this).parent().find('.db-email').text();
    let userEditCode = `<input class="db-id" value="${id}"> <input class="db-name" value="${name}"> <input class="db-email" value="${email}"> <input type="button" class="button back" value="Back"><input type="button" class="button save" value="Save">`;

    $(this).parent().data('code', currentCode).html(userEditCode);
}

function deleteUser () {
    $(this).parent().remove();
}

function saveUser () {
    let id = $(this).parent().find('.db-id').val();
    let name = $(this).parent().find('.db-name').val();
    let email = $(this).parent().find('.db-email').val();
    let editedCode = `<span class="db-id">${id}</span> <span class="db-name">${name}</span> <span class="db-email">${email}</span><input type="button" class="button delete" value="Delete"><input type="button" class="button edit" value="Edit">`;

    $(this).parent().html(editedCode);
}

function backUser () {
    let currentCode = $(this).parent().data('code');

    $(this).parent().html(currentCode);
}