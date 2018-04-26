import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View,
    ActivityIndicator
} from 'react-native'

export default class LoadingSpinner extends Component {
	render() {
		return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={this.props.animating}
					color='#FFDB42'
					size='large'
				/>
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})