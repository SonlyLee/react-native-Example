import React, { Component } from 'C:/Users/sonlylee/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import { FlatList, Text, RefreshControl, StyleSheet, View, Image } from "react-native";

import VideoListItem from './VideoListItem';
import ToastUtil from '../utils/ToastUtil';
import DimensUtil from "../utils/DimensUtil";
import proxyConfig from '../../config';
const videoPath = '/api/v4/tabs/selected';

export default class ListViewTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // dataSource: defaultDS,
            data: [],
            nextPageUrl: '',
            isRefreshing: false,
        }
    }

    //渲染视图
    render() {
        return (
            this._renderList({...this.props})
        )
    }

    //渲染列表
    _renderList(Props) {
        if (this.state.data) {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => { return <VideoListItem Props={Props} title={item.title} id={item.id} playUrl={item.playUrl} imgUrl={item.imgUrl.feed}/> }}
                    ></FlatList>
                </View>
            )
        } else {
            return (
                <Text style={{ flex: 1, textAlignVertical: 'center', textAlign: 'center' }}>加载中...</Text>
            )
        }
    }
    //发起网络请求，获取数据
    _fetchVideoList() {
        fetch(proxyConfig.proxy + videoPath)
            .then(response => response.json())
            .then(
                (responseJson) => {
                    console.log(responseJson)
                    var videos = []
                    responseJson.itemList.forEach(element => {
                        if (!!element.data.title) {
                            var obj = {};
                            obj.title = element.data.title;
                            obj.imgUrl = element.data.cover;
                            obj.id = element.data.id;
                            obj.playUrl = element.data.playUrl;
                            videos.push(obj);
                        }
                    });
                    console.log(videos)
                    let nextPage = responseJson.nextPageUrl;
                    ToastUtil.show("网络请求完成")
                    console.log("下一页：" + nextPage)
                    this.setState({
                        data: videos,
                        nextPageUrl: nextPage,
                        isRefreshing: false,

                    })
                }
            )
            .catch((error) => {
                console.error(error);
                this.setState({
                    isRefreshing: false,
                })
            })
    }

    //页面渲染完成后会主动回调该方法
    componentDidMount() {
        // ToastUtil.show("组件加载完成，开始网络请求");
        this._fetchVideoList();
        console.log(this.props)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#fff"
    },
    parallaxHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 15,
    },
    avatar: {
        height: 150,
        width: 150,
    },
    img_header_background: {
        width: DimensUtil.getScreenWidth(),
        height: 210,
        resizeMode: 'cover'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})
