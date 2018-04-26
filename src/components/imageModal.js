import React, { Component, PropTypes } from 'react'
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View,
	Image,
	Animated,
	Dimensions,
	TouchableWithoutFeedback,
	CameraRoll,
	TouchableOpacity,
	Platform,
    ToastAndroid
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import LoadingSpinner from './loadingSpinner'

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

export default class ImageModal extends Component {

	constructor() {
		super()

		this.state = {
			modalSize: new Animated.Value(0.5),
			modalOpacity: new Animated.Value(1.0),
			modalWidth: new Animated.Value(deviceWidth),
			animatedDuration: 400,
			loading: true,
		}
  	}
	
	componenetDidMount() {
		
	}

	componentDidUpdate() {
		this.props.hide ? this._hideModal() : this._showModal()
	}

	_showModal() {
		let animated = Animated.sequence([
			Animated.timing(this.state.modalWidth, {
				toValue: deviceWidth,
				duration: 1,
			}),
			Animated.parallel([
				Animated.timing(this.state.modalSize, {
					toValue: 1.0,
					duration: this.state.animatedDuration,
				}),
				Animated.timing(this.state.modalOpacity, {
					toValue: 1.0,
					duration: this.state.animatedDuration,
				})
			])
		])
		animated.start()
	}

	_hideModal() {
		let animated = Animated.sequence([
			Animated.parallel([
				Animated.timing(this.state.modalSize, {
					toValue: .5,
					duration: this.state.animatedDuration,
				}),
				Animated.timing(this.state.modalOpacity, {
					toValue: 0.0,
					duration: this.state.animatedDuration,
				})
			]),
			Animated.timing(this.state.modalWidth, {
				toValue: 0,
				duration: 1,
			})
		])
		animated.start()
	}

	_renderSaveBtn() {
		if (Platform.OS === 'ios') {
			return (
				<TouchableOpacity 
					style={{position: 'absolute', backgroundColor:'rgba(0,0,0,.5)',padding: 10,borderRadius:20,bottom:40,right: 30}}
					onPress={() => {
						let a = CameraRoll.saveToCameraRoll(this.props.uri,'photo')
							a.then((e) => ToastAndroid.show('保存成功',ToastAndroid.CENTER)
							)
							a.catch((e) => ToastAndroid.show(e.message,ToastAndroid.CENTER)
							)
					}}
				>
					<Icon name='download' size={20} color='#FFDB42' />
				</TouchableOpacity>
			)
		}
	}

	render() {
		if (!this.props.uri) return <View></View>
		return (
                <Animated.View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						paddingTop: Platform.OS === 'ios' ? 60 : 54,
						paddingBottom: 50,
						width: this.state.modalWidth,
						height: deviceHeight,
						backgroundColor: 'black',
						zIndex: 100000,
						opacity: this.state.modalOpacity,
						transform: [
							{scale: this.state.modalSize},
						]
					}}
				>
				<TouchableWithoutFeedback onPress={this.props.onPress}>
					<Image 
						source={{uri: this.props.uri}}
						style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
						resizeMode='cover'
						resizeMethod='scale'
						onLoadStart={() => this.setState({loading: true})}
						onLoad={() => this.setState({loading: false})}
						onLoadEnd={() => console.log('end')}
						onProgress={(e) => console.log(e.nativeEvent)}
					>
						
					{this._renderSaveBtn()}
					{this.state.loading && <LoadingSpinner animating={true} />}
					
					</Image>
				</TouchableWithoutFeedback>
					
				</Animated.View>
		)
	}
}

ImageModal.propTypes = {
	hide: PropTypes.bool.isRequired,
   	uri: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
	container: {
		width: 200,
		height: 200,
		backgroundColor: 'skyblue',
	},
})