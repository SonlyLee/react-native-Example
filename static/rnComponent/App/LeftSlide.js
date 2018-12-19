import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image
} from 'react-native';

export default class LeftSLide extends Component {
    constructor(props) {
        super(props);
        this.selectSideMenu = this.selectSideMenu.bind(this);
    }


    //函数回调
    selectSideMenu() {
        this.props.onSelectMenuItem();
    }
    componentDidMount(){
        console.log('加载完成')
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => {
                    this.selectSideMenu();
                }}>
                    <View style={styles.collection}>
                        <Image style={styles.IconImg} source={require('./assest/collection.png')} />
                        <Text style={styles.instructions}>收藏</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    this.selectSideMenu();
                }}>
                    <View style={styles.modal}>
                        <Image style={styles.IconImg} source={require("./assest/share.png")} />
                        <Text style={styles.instructions}>分享</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    this.selectSideMenu();
                }}>
                    <View style={styles.modal}>
                        <Image style={styles.IconImg} source={require("./assest/beforeDay.png")} />
                        <Text style={styles.instructions}>前一天</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    this.selectSideMenu();
                }}>
                    <View style={styles.modal}>
                        <Image style={styles.IconImg} source={require("./assest/random.png")} />
                        <Text style={styles.instructions}>随机</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    this.selectSideMenu();
                }}>
                    <View style={styles.modal}>
                        <Image style={styles.IconImg} source={require("./assest/afterDay.png")} />
                        <Text style={styles.instructions}>后一天</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    this.selectSideMenu();
                }}>
                    <View style={styles.modal}>
                        <Image style={styles.IconImg}source={require("./assest/today.png")} />
                        <Text style={styles.instructions}>今日</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center'
    },
    modal:{
        width: 50,
        height: 60,
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 6
    },
    collection:{
        width: 50,
        height: 60,
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 20
    },
    instructions:{
        color: 'white'
    },
    IconImg:{
        width: 30,
        height: 30
    },
});
