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
    let template = _.template($('#database-error-template').html());
    let data = {
        error: 'No connection to database'
    };

    $(template(data)).appendTo('.userlist-wrapper');
    $('.user').addClass('database-error');
}

function renderUsers (data) {
    $.each(data, function(key, value) {
        let template = _.template($('#user-view-template').html());
        let data = {
            id: value.id,
            name: value.name,
            email: value.email
        };

        $(template(data)).appendTo('.userlist-wrapper');
    });
}

function editUser () {
    let template = _.template($('#user-edit-template').html());
    let data = {
        id: $(this).parent().find('.db-id').text(),
        name: $(this).parent().find('.db-name').text(),
        email: $(this).parent().find('.db-email').text()
    };

    $(this).parent().html(template(data));
}

function deleteUser () {
    $(this).parent().remove();
}

function saveUser () {
    let template = _.template($('#user-edited-template').html());
    let data = {
        id: $(this).parent().find('.db-id').val(),
        name: $(this).parent().find('.db-name').val(),
        email: $(this).parent().find('.db-email').val()
    };

    $(this).parent().html(template(data));
}

function backUser () {
    let currentCode = $(this).parent().data('code');

    $(this).parent().html(currentCode);
}