import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    Platform,
    Linking,
    Alert
} from 'react-native'
import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update'
const {width} = Dimensions.get('window')
import Button from 'apsl-react-native-button'

const ground = require('../../assets/landGround.png')

let appKey = ''
if (Platform.OS == "android") {
    appKey = 'CLLwkMd2peUEyvKtYpwIMrcHtQZLsnrj'
} else {
    appKey = 'g-qit4rL2WEKhpXHl1-cgZuXfT6YATUd'
}

export default class Mine extends Component<{}> {
    componentWillMount(){
        if (isFirstTime) {
            Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
                {text: '是', onPress: ()=>{throw new Error('模拟启动失败,请重启应用')}},
                {text: '否', onPress: ()=>{markSuccess()}},
            ])
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
    checkUpdate = () => {
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
            <View style={styles.container}>
                <Image source={ground} style={styles.ground}/>
                <View style={styles.shadow}></View>
                <Button
                    style={styles.btnContainer}
                    textStyle={styles.btnText}
                    onPress={this.checkUpdate}
                >
                    UPDATE
                </Button>
                <View style={styles.willLogin}>
                    <Text style={styles.edition}>版本号: {packageVersion}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    ground:{
        width:width,
        height:(730*width)/750
    },
    shadow:{
        width:width,
        height:100,
        transform: [
            {translateY: -20}
        ],
        backgroundColor:'white',
        shadowColor:'white',
        shadowOffset:{
            width: 0,
            height: -40
        },
        shadowOpacity:1,
        shadowRadius:20
    },
    btnContainer:{
        width:100,
        height:100,
        borderRadius:100,
        backgroundColor: 'black',
        alignSelf: "center",
        transform:[
            {translateY:-200}
        ]
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight:'300'
    },
    willLogin:{
        alignSelf: "center"
    },
    edition:{
        color:'gray',
        fontSize:12,
        marginTop:10
    }

})