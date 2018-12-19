import React, { Component } from "C:/Users/sonlylee/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react";
import { BackHandler, Platform} from "react-native";
import MainPage from "./MainPage";
import ListViewTest from "../05_scroll_demo/ListViewTest";
import VideoListItem from "../05_scroll_demo/VideoListItem";
import VideoPlayPage from "./video_detail/VideoPlayPage";
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import ToastUtil from "../utils/ToastUtil";

//标记是第几次按下返回键
let isFirstQuit = 0;
const RootStack = createSwitchNavigator(
    {
        Home: MainPage,
        ListViewTest: ListViewTest,
        VideoListItem: VideoListItem,
        VideoPlayPage: VideoPlayPage
    }, 
    {
        initialRouteName: 'Home'
    });
const AppContainer = createAppContainer(RootStack);

export default class InitApp extends Component {
     constructor(props){
        super(props);
        this.state = {};
        this.onBackAndroid = this.onBackAndroid.bind(this);
    }

    componentDidMount(){
        if(Platform.OS === 'android'){
            BackHandler.addEventListener('hardwareBackPress',this.onBackAndroid);
        }
    }
    componentWillUnMount(){
        this.timer && clearTimeout(this.timer);
        if(Platform.OS === 'android'){
            BackHandler.removeEventListener('hardwareBackPress',this.onBackAndroid);
        }
    }
    // 监听安卓物理返回键事件，页面返回功能正常
    onBackAndroid(){
        const nav = this.refs.navigator;
        if(nav && nav.getCurrentRoutes().length > 1){
            nav.pop();
            return true;  //返回true表示消费该事件
        }else{
            if(isFirstQuit == 0){
                ToastUtil.show('再按一次退出应用');
                isFirstQuit = 1;
                this.timer = setTimeout(()=>{
                    isFirstQuit = 0;
                },1000)
                return true;
            }else if(isFirstQuit === 1){
                return false;   //返回false，表示执行系统默认实现
            }
        }
    }
    render() {
        return (
            <AppContainer />
        )
    }
}
//     // constructor(props){
    //     super(props);
    //     this.state = {};
        // this.onBackAndroid = this.onBackAndroid.bind(this);
    // }

    // componentDidMount(){
    //     if(Platform.OS === 'android'){
    //         BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid);
    //     }
    // }
    // componentWillUnMount(){
    //     this.timer && clearTimeout(this.timer);
    //     if(Platform.OS === 'android'){
    //         BackAndroid.removeEventListener('hardwareBackPress',this.onBackAndroid);
    //     }
    // }
    //监听安卓物理返回键事件，页面返回功能正常
    //但是退出目前有些问题，只有第一次可以退出APP，第二次就会报错
    // onBackAndroid(){
    //     const nav = this.refs.navigator;
    //     if(nav && nav.getCurrentRoutes().length > 1){
    //         nav.pop();
    //         return true;  //返回true表示消费该事件
    //     }else{
    //         if(isFirstQuit == 0){
    //             ToastUtil.show('再按一次退出应用');
    //             isFirstQuit = 1;
    //             this.timer = setTimeout(()=>{
    //                 isFirstQuit = 0;
    //             },1000)
    //             return true;
    //         }else if(isFirstQuit === 1){
    //             return false;   //返回false，表示执行系统默认实现
    //         }
    //     }
    // }
    // render(){
    //     return(
    //         <Navigator 
    //             ref="navigator"
    //             //初始化默认页面，也就是app启动看到的第一屏
    //             initialRoute={{name: 'MainPage',Component:MainPage}}

                // //配置页面之间跳转的动画，还有其他动画可以使用，所有动画均带手势
                // //动画效果有三种：push,float,swipe,支持上下左右四个方向
                // configureScene = {(route)=>{
                //     var config;
                //     //先判断一下传入页面是否自己定义可转场动画
                //     if(route.sceneConfig){
                //         config = route.seceneConfig;
                //     }else{
                //         config = Navigator.SceneConfigs.HorizontalSwipeJump;
                //     }
                //     //禁用config中的手势返回，否则会导致页面可以左右滑动
                //     config.gestures = null;
                //     return config;
                // }}

                //这里注意，Navigator一经初始化后，就可以多处使用，整个工程维持一个就好了
                // renderScene = {(route,navigator)=>{
                //     let Component = route.component;
                //     return <Component {...route.params} navigator={navigator}/>
                // }}
            // />
//         )
//     }
// }

