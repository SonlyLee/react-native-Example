import React,{Component} from "C:/Users/sonlylee/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react";
import {StyleSheet,Image,Text,Dimensions,TouchableOpacity} from "react-native";
import ToastUtil from '../utils/ToastUtil';
import VideoDetailPage from "../eyepetizer_demo/video_detail/VideoDetailPage";

export default class VideoListItem extends Component{
    constructor(props){
        super(props);
    }
    

    
    _onItemClick(id,playUrl){
        // const {navigator} = this.props;
        // if(navigator){
        //     console.log(navigator)
        // }
        // this.props.navigation.navigate('VideoPlayPage')
        console.log(this.props.Props)
        console.log(id,playUrl)
        this.props.Props.navigation.navigate('VideoPlayPage',{playUrl:playUrl})
    }
    

    render(){
        return(
            <TouchableOpacity activeOpacity={0.9} onPress={this._onItemClick.bind(this,this.props.id,this.props.playUrl)}>
                <Image style={VideoListItemStyle.image_bg} source={{uri:this.props.imgUrl}}/>
                <Text style={VideoListItemStyle.title}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}
const screenWidth = Dimensions.get('window').width;
const VideoListItemStyle = StyleSheet.create({
    image_bg:{
        height: 220,
        resizeMode: "cover",
    },
    title:{
        width: screenWidth,
        flex:1,
        backgroundColor: "#fff",
        textAlignVertical: 'center',
        textAlign: 'center',
        padding: 10,
        flex:1,
        fontSize: 16,
    }
})
