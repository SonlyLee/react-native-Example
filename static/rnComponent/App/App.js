import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Dimensions, Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';
import RightSlide from './RightSlide';
import LeftSlide from './LeftSlide';
import Main from './Main';
import Config from '../config';
const videoPath = '/article/';
import SideMenu from 'react-native-side-menu'
let { width, height } = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: {
        total: '',
        listContent: [],
        title: '',
        author: '',
      },
      datetime: '',
      isOpen: false,
      isOpenLeft: false,
      direction: false,
      showSharePop: false,   //分享弹窗，默认不显示
      collections: []
    }
  }
  _feathcData(params) {
    fetch(Config.proxy + videoPath + params)
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        //截取返回的HTML字符串
        var contentList = [];
        var positions = [];
        var dataBig = responseJson.data.content;
        var pos = dataBig.indexOf('<p>');
        var flag = true;
        while (pos > -1) {
          positions.push(pos);
          if (flag) {
            pos = dataBig.indexOf('</p>', pos + 1);
            flag = false
          } else {
            pos = dataBig.indexOf('<p>', pos + 1);
            flag = true
          }
        }
        var flags = true;
        for (var i = 0; i < positions.length - 1; i++) {
          if (flags) {
            contentList.push(dataBig.slice(positions[i] + 3, positions[i + 1]));
            flags = false;
          } else {
            contentList.push(dataBig.slice(positions[i] + 7, positions[i + 2]));
            flags = true;
          }
        }
        var contentArr = [];
        contentList.forEach((element, index) => {
          if (index === 0) {
            contentArr.push(element);
          }
          if (index !== 0 && index % 2 !== 0) {
            contentArr.push(element);
          }
        })
        this.setState({
          res: {
            title: responseJson.data.title,
            author: responseJson.data.author,
            total: responseJson.data.wc,
            listContent: contentArr
          },
          datetime: responseJson.data.date
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  componentDidMount() {
    var params = 'today?dev=1';
    this._feathcData(params);
  }
  onSelectToday = (date) => {
    if (!date) {
      var params = `random?dev=1`
      this._feathcData(params);
    } else {
      var params = `day?dev=1&date=${date}`
      this._feathcData(params);
    }
  }

  onShareDialog = () => {
    this.setState({
      showSharePop: !this.state.showSharePop
    },()=>{
      console.log(this.state.showSharePop)
      this.SelectMenuItemRightCallBack()
    })
  }
  // 打开右边侧边栏
  SelectToOpenRightSideMenu = () => {
    this.setState({
      isOpen: true,
      isOpenLeft: false,
      direction: false,
      showSharePop: false,
    })
  }
  //打开左边侧边栏
  SelectToOpenLeftSideMenu = () => {
    console.log(this.state.collections)
    this.setState({
      isOpen: false,
      isOpenLeft: true,
      direction: true,
      showSharePop: false,
    })
  }
  //点击侧边栏的按钮，回调此函数，关闭menu
  SelectMenuItemRightCallBack = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  SelectMenuItemLeftCallBack = () => {
    this.setState({
      isOpenLeft: !this.state.isOpenLeft,
    })
  }
  render() {
    //初始化右边的menu，传递回调函数
    // const menu = this.state.direction == true ? <LeftSlide onSelectMenuItem={this.SelectMenuItemLeftCallBack} /> : <RightSlide onSelectMenuItem={this.SelectMenuItemRightCallBack} />
    // const menu = <RightSlide onSelectMenuItem={this.SelectMenuItemCallBack} />
    return (
      
      this.state.direction ?

      <SideMenu menu={<LeftSlide onSelectMenuItem={this.SelectMenuItemLeftCallBack} />}
        isOpen={this.state.isOpenLeft}
        onChange={(isOpenLeft) => {
          if (isOpenLeft) {
            this.setState({
              isOpenLeft: isOpenLeft,
            })
          }
        }}
        menuPosition={'left'}
        openMenuOffset={0.20 * width}//侧边栏的宽度
        edgeHitWidth={200}>
        {/* 当前页的主要内容 */}
        <Main SelectToOpenLeftSideMenu={this.SelectToOpenLeftSideMenu} SelectToOpenRightSideMenu={this.SelectToOpenRightSideMenu} res={this.state.res}/>
      </SideMenu>

      :
   
      <SideMenu menu={<RightSlide onSelectMenuItem={this.SelectMenuItemRightCallBack} onSelectToday={this.onSelectToday} onShareDialog={this.onShareDialog} datetime={this.state.datetime} collections={this.state.collections} title={this.state.res.title} author={this.state.res.author}/>}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => {
          if (isOpen) {
            this.setState({
              isOpen: isOpen,
            })
          }
        }}
        menuPosition={'right'}
        openMenuOffset={0.20 * width}//侧边栏的宽度
        edgeHitWidth={200}>
        {/* 当前页的主要内容 */}
        <Main SelectToOpenLeftSideMenu={this.SelectToOpenLeftSideMenu} SelectToOpenRightSideMenu={this.SelectToOpenRightSideMenu} onShareDialog={this.onShareDialog} res={this.state.res} show={this.state.showSharePop}/>
      </SideMenu>

    );
  }
}
