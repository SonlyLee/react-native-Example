import React, { Component } from "react";
import { Text, Image, View, StyleSheet, ToastAndroid } from "react-native";

export default class FetchNetData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }
    //页面渲染完成后会主动回调该方法
    componentDidMount(){
        this.fetchUserList();
    }
    //发起网络请求
    fetchUserList = () => {
        const url = 'http://api.github.com/users/mralexgray/repos';
        fetch(url)
            .then((res)=>res.json())
            .then((responseJson)=>{
                var users = responseJson;
                ToastAndroid.show(responseJson.msg,ToastAndroid.SHORT);
                var firstUser = users[0].owner;
                console.log(firstUser);
                this.setState({
                    user:firstUser
                })
            })
            .catch((error)=>console.log(error))
    }
    //绘制界面
    render(){
        let item = this.state.user;
        //这里需要判断网络请求完成与否，如果item为空时，会发生空指针
        if(item){
            return this.renderItem(item);
        }
        return(
            <Text style={{textAlign:"center",fontSize:16,padding:20}}>加载中...</Text>
        )
    }
    renderItem(item){
        return(
            <View style={UserItemStyle.container_out}>
                <Image style={UserItemStyle.image_UserAvatar} source={{uri:item.avatar_url}}/>
                <View style={UserItemStyle.container_right}>
                    <Text style={UserItemStyle.text_UserID}>{item.id}</Text>
                    <Text style={UserItemStyle.text_UserType}>{item.type}</Text>
                </View>
            </View>
        )
    }
}

const UserItemStyle = StyleSheet.create({
    container_out: {
        backgroundColor: "white",
        height: 100,
        flexDirection: "row",
        alignItems: "center"
    },
    container_right: {
        flexDirection: "column",
        height: 80,
        flexGrow: 1,
    },
    image_UserAvatar: {
        borderRadius: 80,
        width: 80,
        height: 80,
        resizeMode: "cover",
        marginHorizontal: 30
    },
    text_UserID: {
        color: "black",
        fontSize: 16,
        lineHeight: 24,
    },
    text_UserType: {
        color: "gray",
        fontSize: 12,
        lineHeight: 20,
    },
})

