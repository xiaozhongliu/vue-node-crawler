module.exports = new Map([
    ['CommonErr', {code: 1000}], //scenes which have no specific action plz use this code
    ['AuthFail', {code: 1001, msg: 'request auth fail'}],
    ['AuthAlreadyDone', {code: 1002, msg: 'request auth already done'}],
    ['NotFound', {code: 1003, msg: 'api or file does not exist'}],
    ['UsernameEmpty', {code: 1101, msg: ''}],
    ['PasswordEmpty', {code: 1102, msg: ''}],
    ['AccessTokenEmpty', {code: 1103, msg: 'write your message'}],
    ['LoginFail', {code: 1104, msg: 'write your message'}],
    ['VerifyFail', {code: 1105, msg: 'write your message'}],
]);