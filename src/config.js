let config = {
    base: {
        ENV: 'dev',
        PAGE_SIZE: 50
    },
    dev: {
        //API_HOST: 'http://127.0.0.1:3100/'
        API_HOST: 'http://192.168.1.8:3100/'
    },
    prod: {
        API_HOST: 'http://www.flashbeep.cn:3100/'
    }
}

window.config = Object.assign(config.base, config[config.base.ENV])