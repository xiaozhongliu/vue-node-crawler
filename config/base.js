module.exports = {

    NODE_ENV: 'dev',

    //redis
    REDIS_HOST: '127.0.0.1',
    REDIS_PORT: 6379,

    //redis hashset key
    REDIS_SET_KEY: 'user',

    //security
    REQUEST_TOKEN: '!re9ue$t~T0KEN',
    HASH_SECRET: '!h@sh~$ECRET',
    //secret for cookie and session
    SECRET: '^u-Dont-KNOW$',

    //log
    API_LOG_PATH: `${__dirname}/../log/`,
    TASK_LOG_PATH: `${__dirname}/../log/task/`,

    //no auth files or paths
    NO_AUTH_REG: /\.log$|\.ico$/,
    NO_AUTH_PATHS: [
        '/'
    ],

    //apply http auth on log
    HTTP_AUTH: {
        username: 'admin',
        password: 'admin',
        itemsReg: /\.log$/,
    },
};