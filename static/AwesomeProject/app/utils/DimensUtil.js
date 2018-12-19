import {Dimensions} from "react-native";

export default class DimenUtil{
    static getScreenWidth(){
        return Dimensions.get('window').width;
    }
}