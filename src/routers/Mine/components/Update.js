import React, {Component} from 'react'
import {
    StyleSheet,
    Platform,
    Linking,
    Alert,
} from 'react-native'
import {
    isFirstTime,
    isRolledBack,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update'
import Button from 'apsl-react-native-button'

let appKey = ''
if (Platform.OS == "android") {
    appKey = 'CLLwkMd2peUEyvKtYpwIMrcHtQZLsnrj'
} else {
    appKey = 'g-qit4rL2WEKhpXHl1-cgZuXfT6YATUd'
}

export default class Update extends Component<{}> {
    componentWillMount(){
        if (isFirstTime) {
            markSuccess()
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.')
        }
    }
    doUpdate = info => {
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                {text: '是', onPress: ()=>{switchVersion(hash)}},
                {text: '否',},
                {text: '下次启动时', onPress: ()=>{switchVersionLater(hash)}},
            ])
        }).catch(err => {
            Alert.alert('提示', '更新失败.')
        })
    }
    check = () => {
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                    {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
                ])
            } else if (info.upToDate) {
                Alert.alert('提示', '您的应用版本已是最新.')
            } else {
                Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
                    {text: '是', onPress: ()=>{this.doUpdate(info)}},
                    {text: '否',},
                ])
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.')
        })
    }
    render() {
        return (
            <Button
                style={styles.btnContainer}
                textStyle={styles.btnText}
                onPress={this.check}
            >
                UPDATE
            </Button>
        )
    }
}
const styles = StyleSheet.create({
    btnContainer:{
        width:100,
        height:100,
        borderRadius:100,
        backgroundColor: 'black',
        alignSelf: "center",
        position:'absolute',
        top:250,
        overflow:'hidden'
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight:'300'
    }
})