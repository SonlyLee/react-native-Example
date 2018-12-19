import React, { Component } from "C:/Users/sonlylee/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react";
import { StyleSheet, Text, View, Image } from "react-native";
// import Banner from "react-native-banner";
import Banner, { IndicaterAlign, IndicaterType } from 'react-native-whc-banner'
export default class BannerTest extends Component {
    constructor(props) {
        super(props);

        this.banners = [
            {
                title: 'beauty 1',
                image: 'https://avatars3.githubusercontent.com/u/262517?v=4',
            },
            {
                title: 'beauty 2',
                image: 'https://avatars3.githubusercontent.com/u/262517?v=4',
            },
            {
                title: 'The next banner has no title',
                image: 'https://avatars3.githubusercontent.com/u/262517?v=4',
            },
            {
                // title: 'no title',
                image: 'https://avatars3.githubusercontent.com/u/262517?v=4',
            },
        ];

        this.state = {
            clickTitle: 'You can try clicking beauty',
            defaultIndex: 0,
        }
        this.defaultIndex = 0;
    }

    render() {
        return (
            <View style={styles.container}>
                <Banner
                    banners={this.banners}
                    defaultIndex={this.defaultIndex}
                    onMomentumScrollEnd={this.onMomentumScrollEnd.bind(this)}
                    intent={this.clickListener.bind(this)}
                />
                <Text>{this.state.clickTitle}</Text> 
                {/* <Banner>
                    <View><Image style={{width: 50, height: 50}} source={{uri:'https://avatars3.githubusercontent.com/u/262517?v=4'}}/></View>
                    <View><Image style={{width: 50, height: 50}} source={{uri:'https://avatars3.githubusercontent.com/u/262517?v=4'}} /></View> 
                    <View><Image style={{width: 50, height: 50}} source={{uri:'https://avatars3.githubusercontent.com/u/262517?v=4'}} /></View>
                </Banner> */}
            </View>
        );
    }

    clickListener(index) {
        this.setState({
            clickTitle: this.banners[index].title ? `you click ${this.banners[index].title}` : 'this banner has no title'
        })
    }

    onMomentumScrollEnd(event, state) {
        console.log(`--->onMomentumScrollEnd page index:${state.index}, total:${state.total}`);
        this.defaultIndex = state.index;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});