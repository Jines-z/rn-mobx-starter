import React from 'react'
import {
  	View,
    ActivityIndicator
} from 'react-native'

const ScreenLoader = () =>{
	return (
		<View style={{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			<ActivityIndicator animating={true} color='black' size='large'/>
		</View>
	)
}
export default ScreenLoader