import React, { Component } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import TabNavigator from "react-native-tab-navigator";
import SelectedPage from "../05_scroll_demo/ListViewTest";
import BannerTest from "../03_library_demo/BannerTest";
import ProfilePage from "./ProfilePage";

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '精选'
        }
    }
    render() {
        return (
            <View style={MainPageStyle.container}>
                <TabNavigator tabBarStyle={MainPageStyle.tab_container}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '精选'}
                        title="精选"
                        titleStyle={MainPageStyle.tab_title}
                        selectedTitleStyle={MainPageStyle.tab_title_selected}
                        renderIcon={() => <Image style={MainPageStyle.tab_icon} source={require("../imgs/ic_tab_strip_icon_feed.png")} />}
                        renderSelectedIcon={() => <Image style={MainPageStyle.tab_icon} source={require("../imgs/ic_tab_strip_icon_feed_selected.png")} />}
                        onPress={() => this.setState({ selectedTab: '精选' })}>
                        <SelectedPage {...this.props} />
                        {/* <View style={MainPageStyle.page1}></View> */}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '发现'}
                        title="发现"
                        titleStyle={MainPageStyle.tab_title}
                        selectedTitleStyle={MainPageStyle.tab_title_selected}
                        renderIcon={() => <Image style={MainPageStyle.tab_icon} source={require("../imgs/ic_tab_strip_icon_category.png")} />}
                        renderSelectedIcon={() => <Image style={MainPageStyle.tab_icon} source={require("../imgs/ic_tab_strip_icon_category_selected.png")} />}
                        onPress={() => this.setState({ selectedTab: '发现' })}>
                        <BannerTest {...this.props} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '关注'}
                        title="关注"
                        titleStyle={MainPageStyle.tab_title}
                        selectedTitleStyle={MainPageStyle.tab_title_selected}
                        renderIcon={() => <Image style={MainPageStyle.tab_icon} source={require("../imgs/ic_tab_strip_icon_follow.png")} />}
                        renderSelectedIcon={() => <Image style={MainPageStyle.tab_icon} source={require("../imgs/ic_tab_strip_icon_follow_selected.png")} />}
                        onPress={() => this.setState({ selectedTab: '关注' })}>
                        <BannerTest {...this.props} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '我的'}
                        title="我的"
                        titleStyle={MainPageStyle.tab_title}
                        selectedTitleStyle={MainPageStyle.tab_title_selected}
                        renderIcon={() => <Image style={MainPageStyle.tab_icon} source={require("../imgs/ic_tab_strip_icon_profile.png")} />}
                        renderSelectedIcon={() => <Image style={MainPageStyle.tab_icon} source={require("../imgs/ic_tab_strip_icon_profile_selected.png")} />}
                        onPress={() => this.setState({ selectedTab: '我的' })}>
                        <ProfilePage {...this.props} />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    }
}

const MainPageStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tab_container: {
        height: 55,
        backgroundColor: '#fff'
    },
    tab_icon: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },
    tab_title: {
        color: "#929292",
        fontSize: 12,
    },
    tab_title_selected: {
        color: "#333333",
        fontSize: 12,
    },
    page1: {
        flex: 1,
        backgroundColor: 'red'
    },
    page2: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    page3: {
        flex: 1,
        backgroundColor: 'green'
    },
    page4: {
        flex: 1,
        backgroundColor: 'blue'
    },
})