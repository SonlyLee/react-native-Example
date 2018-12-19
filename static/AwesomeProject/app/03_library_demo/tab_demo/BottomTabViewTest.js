import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

export default class BottomTabViewTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'First' },
                { key: 'second', title: 'Second' },
            ]
        }
    }
    _renderScene = ({ route }) => {
        switch (route.key) {
            case "first":
                return FirstRoute();
            case "second":
                return SecondRoute();
        }
    }
    render() {
        return (
            <TabView navigationState={this.state}
                renderScene={this._renderScene}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            ></TabView>
        )
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1
    }
})

