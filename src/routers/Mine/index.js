import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Button from 'react-native-button'
import {TextInputLayout} from 'rn-textinputlayout'
const EMAIL_REGEX = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export default class Mine extends Component<{}> {
    render() {
        return (
            <View>
                <Icon name="user" size={20} color="#900" />
                <Text>
                    我的
                </Text>
                <Button
                    containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
                    disabledContainerStyle={{backgroundColor: 'grey'}}
                    style={{fontSize: 20, color: 'green'}}
                    onPress={()=>{this.props.navigation.navigate('InPage')}}
                >
                    点我跳转到InPage
                </Button>
                <TextInputLayout
                    style={styles.inputLayout}
                    checkValid={t => EMAIL_REGEX.test(t)}
                >
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Email'}
                    />
                </TextInputLayout>
                <TextInputLayout style={styles.inputLayout}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Password'}
                        secureTextEntry={true}
                    />
                </TextInputLayout>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100
    },
    textInput: {
        fontSize: 16,
        height: 40
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    }
})