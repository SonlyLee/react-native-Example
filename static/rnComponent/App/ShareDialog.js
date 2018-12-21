import React, { Component } from "react";
import { View, TouchableOpacity, Alert, StyleSheet, Dimensions, Modal, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './store/actions'

const { width, height } = Dimensions.get('window');
const dialogH = 150;

class ShareDialog extends Component {
    constructor(props) {
        super(props);
    }

    closeModal() {
        this.props.onSelectShare();
        this.props.onSelectRightOpen()
    }

    renderDialog() {
        return (
            <View style={styles.modalStyle}>
                <Text style={styles.share}>分享</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.item} onPress={() => Alert.alert('分享到朋友圈')}>
                        <Image resizeMode="contain" style={styles.image} source={require('./assest/share_ic_friends.png')} />
                        <Text>微信朋友圈</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => Alert.alert('分享到微信好友')}>
                        <Image resizeMode="contain" style={styles.image} source={require('./assest/share_ic_weixin.png')} />
                        <Text>微信好友</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => Alert.alert('分享到新浪微博')}>
                        <Image resizeMode="contain" style={styles.image} source={require('./assest/share_ic_weibo.png')} />
                        <Text>新浪微博</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { showSharePop } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Modal transparent={true} visible={showSharePop} animationType={'fade'}
                    onRequestClose={() => this.closeModal()}>
                    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => this.closeModal()}>
                        {this.renderDialog()}
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showSharePop: state.showSharePop
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSelectShare: () => dispatch(actions.onSelectShare()),
        onSelectRightOpen: () => dispatch(actions.onSelectRightOpen())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShareDialog)

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalStyle: {
        position: "absolute",
        // top: height - 170,
        bottom: 0,
        left: 0,
        width: width,
        height: dialogH,
        backgroundColor: '#ffffff'
    },
    share: {
        textAlign: 'center',
        fontSize: 20,
        paddingVertical: 10
    },
    item: {
        width: width / 3,
        height: 80,
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 8
    }
})