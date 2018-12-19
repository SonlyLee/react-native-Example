export default class JsonUtil {

    //JSON对象转字符串
    static jsonToString(jsonObj){
        return JSON.stringify(jsonObj);
    }

    //字符串转json字符串
    static stringToJson(jsonStr){
        return JSON.parse(jsonStr);
    }
}