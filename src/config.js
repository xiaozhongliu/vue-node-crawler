let config = {
    base: {
        ENV: 'dev'
    },
    dev: {
        API_HOST: 'http://127.0.0.1:3100/'
    },
    prod: {
        API_HOST: 'http://www.flashbeep.cn:3100/'
    }
};

export default config[config.base.ENV]