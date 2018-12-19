import React,{Component} from "C:/Users/sonlylee/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react";
import {Text,Navigator,StyleSheet,View,Text} from "react-native";
import {Container,Header,Title,Content,Button,Icon,Left,Body} from "native-base";
import JsonUtil from "../../utils/JsonUtil";
// import Video from "react-native-video";

export default class VideoPlayPage extends Component{
    constructor(props){
        super(props);
        this._onBackPress = this._onBackPress.bind(this);
    }
    _onBackPress(){
        const {navigator} = this.props;
        if(navigator){
            navigator.pop();
        }
    }
    componentDidMount(){
        console.log(this.props.navigation.state.params.playUrl)
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'black'}}>
                {/* <Video 
                   source={{uri:"http://baobab.kaiyanapp.com/api/v1/playUrl?vid=141947&resourceType=video&editionType=default&source=aliyun"}}
                   ref={(ref)=>{
                       this.player = ref
                   }} 
                   rate={1.0}
                   volume={1.0}
                   muted={false}
                   paused={false}
                   resizeMode="contain"
                   repeat={false}
                   playInBackground={false}
                   playWhenInactive={false}
                   progressUpdateInterval={250.0}
                   style={styles.backgroundVideo}
                ></Video> */}
                <Text>Promise</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0
    }
})