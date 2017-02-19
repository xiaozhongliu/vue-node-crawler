/**
 * enums for both server and client
 */
if (!global) global = window;

global.Enum = {

    /**
     * 数据来源
     */
    Source: {
        LNKD: {value: 1, text: ''},    //领英
        GARYL: {value: 2, text: ''}    //GARY LIU
    },

    /**
     * 性别
     */
    Gender: {
        Male: {value: 0, text: ''},
        Female: {value: 1, text: ''}
    },

    /**
     * 学历
     */
    Edu: {
        HighSchool: {value: 1, text: ''},      //高中
        JuniorCollege: {value: 2, text: ''},   //大专
        Bachelor: {value: 3, text: ''},        //本科
        Postgraduate: {value: 4, text: ''},    //研究生
        Doctor: {value: 5, text: ''},          //博士
        Postdoctor: {value: 6, text: ''}       //博士后
    },

    getEnumByValue(enumObj, value) {
        let target;
        Object.keys(enumObj).some(key => {
            let current = enumObj[key];
            if (current.value == value) {
                target = current;
                return true;
            }
        });
        return target;
    },

    getNameByValue(enumObj, value) {
        let target;
        Object.keys(enumObj).some(key => {
            if (enumObj[key].value == value) {
                target = key;
                return true;
            }
        });
        return target;
    },

    getEnumTexts (enumObj) {
        return Object.keys(enumObj).map(key => {
            return enumObj[key].text;
        })
    }
};