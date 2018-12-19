import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image,
    ToastAndroid
} from 'react-native';

export default class RightSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            timenow: '',
            heart: false
        }
        this.selectSideMenu = this.selectSideMenu.bind(this);
        this.lastDay = this.lastDay.bind(this);
        this.nextDay = this.nextDay.bind(this);
        this.Today = this.Today.bind(this);
    }


    //函数回调
    selectSideMenu() {
        this.setState({
            heart: !this.state.heart,
        },()=>{
            this.state.heart ? ToastAndroid.showWithGravity('收藏成功',ToastAndroid.SHORT,ToastAndroid.CENTER) : ToastAndroid.showWithGravity('取消收藏',ToastAndroid.SHORT,ToastAndroid.CENTER);
            var result = {
                title: this.props.title,
                author: this.props.author,
                time: this.props.datetime.curr
            }
            this.state.heart ? this.props.collections.push(result) : this.props.collections.slice(0,this.props.collections.length-1)
            this.props.onSelectMenuItem();
        });
    }
    onSharePress(){
        this.props.onShareDialog();
    }
    lastDay() {
        var timeLast = this.props.datetime.prev
        this.setState((preState, props) => ({
            flag: true,
            timenow: timeLast
        }), () => {
            this.props.onSelectToday(this.state.timenow);
        })
        this.props.onSelectMenuItem();
    }
    nextDay() {
        var timeNext = this.props.datetime.next
        this.setState((preState, props) => ({
            timenow: timeNext
        }), () => {
            let timeNowShow = this.timeNow()
            if (this.state.timenow == timeNowShow) {
                this.setState({
                    flag: false
                })
            } else {
                this.setState({
                    flag: true,
                })
            }
            this.props.onSelectToday(this.state.timenow);
            this.props.onSelectMenuItem();
        });
    }
    Today() {
        let timeNowToday = this.timeNow();
        this.setState({
            flag: false,
            timenow: timeNowToday
        }, () => {
            this.props.onSelectToday(this.state.timenow);
        })
        this.props.onSelectMenuItem();
    }
    timeNow() {
        var date = new Date();
        var nowMonth = date.getMonth() + 1;
        var strDate = date.getDate();
        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var nowDate = `${date.getFullYear()}${nowMonth}${strDate}`;
        return nowDate;
    }
    randomDay(){
        this.setState({
            flag: true
        })
        this.props.onSelectToday();
        this.props.onSelectMenuItem();        
    }
    componentDidMount() {
        let nowDate = this.timeNow();
        this.setState({
            timenow: nowDate
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => {
                    this.selectSideMenu();
                }}>
                    <View style={styles.collection}>
                        <Image style={styles.IconImg} source={this.state.heart ? require('./assest/collectioned.png'): require('./assest/collection.png')} />
                        <Text style={styles.instructions}>收藏</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    this.onSharePress();
                }}>
                    <View style={styles.modal}>
                        <Image style={styles.IconImg} source={require("./assest/share.png")} />
                        <Text style={styles.instructions}>分享</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    this.lastDay();
                }}>
                    <View style={styles.modal}>
                        <Image style={styles.IconImg} source={require("./assest/beforeDay.png")} />
                        <Text style={styles.instructions}>前一天</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    this.randomDay();
                }}>
                    <View style={styles.modal}>
                        <Image style={styles.IconImg} source={require("./assest/random.png")} />
                        <Text style={styles.instructions}>随机</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    this.nextDay();
                }}>
                    <View style={[styles.modal, this.state.flag ? '' : styles.today]}>
                        <Image style={styles.IconImg} source={require("./assest/afterDay.png")} />
                        <Text style={styles.instructions}>后一天</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    this.Today();
                }}>
                    <View style={[styles.modal, this.state.flag ? '' : styles.today]}>
                        <Image style={styles.IconImg} source={require("./assest/today.png")} />
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
    modal: {
        width: 50,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6
    },
    collection: {
        width: 50,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    today: {
        display: "none"
    },
    instructions: {
        color: 'white'
    },
    IconImg: {
        width: 30,
        height: 30
    },
});
