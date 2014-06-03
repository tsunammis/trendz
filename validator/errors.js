module.exports = {
    'unknow':                           { 'code': '0',     'message': "Unknow error" },
    'project': {
        'name_length':                  { 'code': 'P-1',   'message': "project.name's length must be between 3 and 30 caracters" },
        'slug_not_found':               { 'code': 'P-2',   'message': "project.slug doesn't exist" },
        'slug_already_exist':           { 'code': 'P-3',   'message': "project.slug already exist" },
        'slug_bad_length':              { 'code': 'P-4',   'message': "project.slug's length must be between 3 and 30 caracters" },
        'not_found':                    { 'code': 'P-5',   'message': "project not found" },
        'user_not_belong':              { 'code': 'P-6',   'message': "user not belong to project" },
        'not_owner':                    { 'code': 'P-7',   'message': "you are not the owner of the project" },
        'user_not_assigned':            { 'code': 'P-8',   'message': "the user is not assigned to the project" },
        'user_already_assigned':        { 'code': 'P-9',   'message': "the user is already assigned to the project" }
    },
    'user': {
        'password_confirmation_fail':   { 'code': 'U-1',    'message': "Both password are not the same" },
        'password_length_too_short':    { 'code': 'U-2',    'message': "the password's length is too short (3 min caracters)" },
        'password_length_too_long':     { 'code': 'U-3',    'message': "the password's length is too long (15 caracters max)" },
        'email_not_found':              { 'code': 'U-4',    'message': "this email is not registered" },
        'email_already_exist':          { 'code': 'U-5',    'message': "this email is already registered" },
        'not_found':                    { 'code': 'U-6',    'message': "user not found" }
    },
    'status': {
        'not_found':                    { 'code': 'S-1',    'message': "status not found" },
        'not_owner':                    { 'code': 'S-2',    'message': "you are not the owner of the status" },
        'content_bad_format':           { 'code': 'S-3',    'message': "status.content's length must be between 1 and 300 caracters." }
    },
    'string': {
        'not_null':                     { 'code': 'str-1',  'message': "the string must be not null" },
        'email_bad_format':             { 'code': 'str-2',  'message': "the email's format is not valid" },
        'slug_bad_format':              { 'code': 'str-3',  'message': "the slug's format is not valid" },
        'documentid_bad_format':        { 'code': 'str-4',  'message': "the id's format is not valid" }
    },
    'storage': {
        'connection_error':             { 'code': 'store-1','message': "Error durring connection with mongo" }
    }
};
/*
module.exports = [
    { 'code': 0,    'name': 'unknow',                           'message': "Unknow error" },
    { 'code': 1,    'name': 'project.name.length',              'message': "project.name's length must be between 3 and 30 caracters" },
    { 'code': 2,    'name': 'project.slug.doesnt_exist',        'message': "project.slug doesn't exist" },
    { 'code': 3,    'name': 'connection.error',                 'message': "Error durring connection with mongo" },
    { 'code': 4,    'name': 'project.slug.already_exist',       'message': "project.slug already exist" },
    { 'code': 5,    'name': 'user.password.length.too_short',   'message': "the password's length is too short (3 min caracters)" },
    { 'code': 6,    'name': 'user.password.length.too_long',    'message': "the password's length is too long (15 caracters max)" },
    { 'code': 7,    'name': 'user.email.doesnt_exist',          'message': "this email is not registered" },
    { 'code': 8,    'name': 'user.email.already_exist',         'message': "this email is already registered" },
    { 'code': 9,    'name': 'user.password.confirmation_fail',  'message': "Both password are not the same" },
    { 'code': 10,   'name': 'string.not_null',                  'message': "the string must be not null" },
    { 'code': 11,   'name': 'email.format',                     'message': "the email's format is not valid" },
    { 'code': 12,   'name': 'string.slug',                      'message': "the slug's format is not valid" },
    { 'code': 13,   'name': 'string.document_id',               'message': "the id's format is not valid" },
    { 'code': 14,   'name': 'user.not_found',                   'message': "user not found" },
    { 'code': 15,   'name': 'status.not_found',                 'message': "status not found" },
    { 'code': 16,   'name': 'user.doesnt_exist',                'message': "user id doesn't exist" },
    { 'code': 17,   'name': 'status.content',                   'message': "status.content's length must be between 1 and 300 caracters." },
    { 'code': 18,   'name': 'project.doesnt_exist',             'message': "project not found" },
    { 'code': 19,   'name': 'project.not_belong',               'message': "user not belong to project" },
    { 'code': 20,   'name': 'project.slug.length',              'message': "project.slug's length must be between 3 and 30 caracters" },
    { 'code': 21,   'name': 'status.not_owner',                 'message': "you are not the owner of the status" },
    { 'code': 22,   'name': 'project.not_owner',                'message': "you are not the owner of the project" },
    { 'code': 23,   'name': 'project.user_already_assigned',    'message': "the user is already assigned to the project" },
    { 'code': 24,   'name': 'project.user_is_not_assigned',     'message': "the user is not assigned to the project" }
];
*/