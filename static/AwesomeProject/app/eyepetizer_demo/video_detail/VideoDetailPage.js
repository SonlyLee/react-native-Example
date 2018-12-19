import React,{Component} from "C:/Users/sonlylee/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react";
import {Text,Navigator,StyleSheet,View,Image,TouchableWithFeedback} from "react-native";
import JsonUtil from '../../utils/JsonUtil';
import ToastUtil from '../../utils/ToastUtil';
import VideoPlayPage from './VideoPlayPage';

class ActionIcon extends Component{
    render(){
        return(
            <Image source={this.props.source} style={styles.img_bottom_action}/>
        )
    }
}


export default class VideoDetailPage  extends Component{
    constructor(props){
        super(props);
        //如果不进行bind,是拿不到传递过来的默认属性
        this._onBackPress = this._onBackPress.bind(this);
    }
    //播放视频
    _playVideo(){
        ToastUtil.show("播放视频");
        const {navigator} = this.props;
        if(navigator){
            navigator.push({
                name: 'VideoPlayPage',
                component: VideoPlayPage,
                params: {
                    rowData:this.props.rowData
                }
            })
        }
    }

    //返回按钮
    _onBackPress(){
        const {navigator} = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    render(){
        let rowData = this.props.rowData;
        return(
            <View style={{flexDirection: 'column',flex:1}}>
                <TouchableWithFeedback onPress={this._playVideo.bind(this)}>
                    <Image style={styles.img_cover_detail} 
                           source={{uri:rowData.coverForDetail}}>
                           <Image style={styles.img_icon_play} 
                                source={require('../../imgs/ic_action_play.png')}></Image>
                    </Image>
                </TouchableWithFeedback>
                <Image style={styles.img_cover_blurred} 
                       source={{uri:rowData.coverBlurred}}>
                    <View style={styles.container_bottom}>
                        <Text style={styles.txt_title}>{rowData.title}</Text>
                        <Text
                            style={styles.txt_description}
                        >{rowData.description}</Text>
                        <View style={{flexDirection: 'row', position: 'absolute', bottom: -100, left: 20}}>
                            <ActionIcon source={require('../../imgs/ic_action_favorites_without_padding.png')}/>
                            <ActionIcon source={require('../../imgs/ic_action_share_without_padding.png')}/>
                            <ActionIcon source={require('../../imgs/ic_action_reply_nopadding.png')}/>
                            <ActionIcon source={require('../../imgs/ic_action_offline_without_padding.png')}/>
                        </View>
                    </View>
                </Image>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container_bottom: {
        flexDirection: 'column',
        paddingTop: 20,
        paddingLeft: 20
    },
    img_cover_detail: {
        flexGrow: 20,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img_icon_play: {
        height: 60,
        width: 60,
    },
    img_cover_blurred: {
        resizeMode: 'cover',
        flexGrow: 10
    },
    txt_title: {
        color: 'white',
        fontSize: 16,
    },
    txt_description: {
        color: '#D1CDCD',
        fontSize: 12,
        marginTop: 32,
        paddingTop: 14,
        borderTopWidth: 0.3,
        borderTopColor: '#716668',
        lineHeight: 18,
    },
    img_bottom_action: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginRight: 40,
    }
});