import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { observer } from 'mobx-react';
import Button from 'react-native-button';
import PropTypes from 'prop-types'

@observer
export default class Context extends Component<{}> {
    static contextTypes = {
        store: PropTypes.object,
    };
    render() {
        const { store } = this.context;
        return (
            <View>
                <Text>
                    {store.userInfo.userName}
                </Text>
                <Button onPress={e=>store.changeStore('asd')}
                        style={styles.buttonText}
                        containerStyle={styles.buttonContainer}
                >
                    点我改变contextStore
                </Button>
                <Button disabled={true}
                        disabledContainerStyle={styles.disabledButton}
                >
                    我是一个diasbled·Button
                </Button>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    buttonText:{
        fontSize:14,
        color:'white'
    },
    buttonContainer:{
        padding:10,
        width:200,
        borderRadius:5,
        backgroundColor:'black'
    },
    disabledButton:{
        backgroundColor:'#aaa4a4',
        marginBottom:20
    }
});