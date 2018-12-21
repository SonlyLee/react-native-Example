import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image,
    ToastAndroid
} from 'react-native';
import * as actions from './store/actions';
import { connect } from 'react-redux';

class RightSlide extends Component {
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
        }, () => {
            this.state.heart ? ToastAndroid.showWithGravity('收藏成功', ToastAndroid.SHORT, ToastAndroid.CENTER) : ToastAndroid.showWithGravity('取消收藏', ToastAndroid.SHORT, ToastAndroid.CENTER);
            let skr = this.props.result;
            var result = {
                title: skr.title,
                author: skr.author,
                time: skr.datetime.curr
            }
            this.state.heart ? this.props.onCollctionsPush(result) : this.props.onCollctionsCancle()
            this.props.onSelectRightOpen();
        });
    }
    onSharePress() {
        this.props.onSelectShare();
    }
    lastDay() {
        var timeLast = this.props.result.datetime.prev
        this.setState({
            flag: true,
            timenow: timeLast
        }, () => {
            var params = `day?dev=1&date=${this.state.timenow}`;
            this.props.request(params);
        })
        this.props.onSelectRightOpen();
    }
    nextDay() {
        var timeNext = this.props.result.datetime.next;
        this.setState({
            timenow: timeNext
        }, () => {
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
            var params = `day?dev=1&date=${this.state.timenow}`;
            this.props.request(params)
            this.props.onSelectRightOpen();
        });
    }
    Today() {
        let timeNowToday = this.timeNow();
        this.setState({
            flag: false,
            timenow: timeNowToday
        }, () => {
            var params = `day?dev=1&date=${this.state.timenow}`;
            this.props.request(params);
            this.props.onSelectRightOpen();
        })
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
    randomDay() {
        this.setState({
            flag: true
        });
        var params = `random?dev=1`;
        this.props.request(params);
        this.props.onSelectRightOpen();
    }
    componentDidMount() {
        let nowDate = this.timeNow();
        this.setState({
            timenow: nowDate
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => {
                    this.selectSideMenu();
                }}>
                    <View style={styles.collection}>
                        <Image style={styles.IconImg} source={this.state.heart ? require('./assest/collectioned.png') : require('./assest/collection.png')} />
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

const mapStateToProps = (state) => {
    return {
        collections: state.collections,
        result: state.result
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSelectRightOpen: () => dispatch(actions.onSelectRightOpen()),
        onCollctionsPush: (data) => dispatch(actions.onCollctionsPush(data)),
        onCollctionsCancle: () => dispatch(actions.onCollctionsCancle()),
        request: (data) => dispatch(actions.onRequestApiResult(data)),
        onSelectShare: () => dispatch(actions.onSelectShare())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RightSlide);

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
