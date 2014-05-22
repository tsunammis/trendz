module.exports = [
    { 'code': 0,    'name': 'unknow',                           'message': "Unknow error" },
    { 'code': 1,    'name': 'project.name',                     'message': "the length of name must contain between 3 and 30 characters" },
    { 'code': 2,    'name': 'user.slug.doesnt_exist',           'message': "this slug doesn't exist" },
    { 'code': 3,    'name': 'connection.error',                 'message': "Error durring connection with mongo" },
    { 'code': 4,    'name': 'user.slug.already_exist',          'message': "this slug already exist" },
    { 'code': 5,    'name': 'user.password.length.too_short',   'message': "the password's length is too short (3 min caracters)" },
    { 'code': 6,    'name': 'user.password.length.too_long',    'message': "the password's length is too long (15 caracters max)" },
    { 'code': 7,    'name': 'user.email.doesnt_exist',          'message': "this email is not registered" },
    { 'code': 8,    'name': 'user.email.already_exist',         'message': "this email is already registered" },
    { 'code': 9,    'name': 'user.password.confirmation_fail',  'message': "Both password are not the same" },
    { 'code': 10,   'name': 'string.not_null',                  'message': "the string must be not null" },
    { 'code': 11,   'name': 'email.format',                     'message': "the email's format is not valid" },
    { 'code': 12,   'name': 'string.slug',                      'message': "the slug's format is not valid" },
    { 'code': 13,   'name': 'string.document_id',               'message': "the id's format is not valid" },
    { 'code': 14,   'name': 'user.not_found',                   'message': "user not found" }
];
