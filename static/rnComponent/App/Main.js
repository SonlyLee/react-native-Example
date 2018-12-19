import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Dimensions, Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';
import ShareDialog  from './ShareDialog';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.SelectToOpenLeft = this.SelectToOpenLeft.bind(this);
        this.SelectToOpenRight = this.SelectToOpenRight.bind(this);
    }
    SelectToOpenLeft() {
        this.props.SelectToOpenLeftSideMenu()
    }
    SelectToOpenRight() {
        this.props.SelectToOpenRightSideMenu()
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableWithoutFeedback onPress={this.SelectToOpenLeft}>
                        <Image style={styles.menu} source={require('./assest/menu.png')} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.SelectToOpenRight}>
                        <Image style={styles.dot} source={require('./assest/dot.png')} />
                    </TouchableWithoutFeedback>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.title}>
                        <Text style={styles.instructions}>{this.props.res.title}</Text>
                    </View>
                    <Text style={styles.author}>{this.props.res.author}</Text>
                    <View style={styles.content}>
                        <FlatList data={this.props.res.listContent}
                            renderItem={({ item }) => <Text style={styles.item}>{'        ' + item}</Text>} />
                    </View>
                    <Text style={styles.total}>全文完  共{this.props.res.total}字</Text>
                </ScrollView>
                <ShareDialog show={this.props.show} onShareDialog={this.props.onShareDialog}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 5,
        paddingBottom: 0
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    menu: {
        width: 30,
        height: 30
    },
    dot: {
        width: 25,
        height: 25,
        marginTop: 5,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    title: {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    instructions: {
        textAlign: 'center',
        color: '#000',
        marginBottom: 8,
        fontSize: 20,
        marginTop: 10
    },
    author: {
        textAlign: 'center',
        color: '#666',
        marginTop: 8,
        marginBottom: 12
    },
    content: {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 12,
        paddingHorizontal: 8
    },
    item: {
        color: '#000',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16
    },
    total: {
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 12,
        color: '#666'
    }
});

