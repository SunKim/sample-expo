import React, {useState, useEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {ActivityIndicator} from 'react-native-paper'

import {useAppDispatch, useAppState} from '../context/AppContext'
import HomeMain from '../screens/home/HomeMain'

const HomeStack = createNativeStackNavigator()

export default function HomeStackNavigator() {
	const state = useAppState()

	useEffect(() => {
		// const checkAndUpdate = async () => {
		//   try {
		//     Alert.alert('checkAndUpdate')
		//     // cf) https://docs.expo.dev/bare/updating-your-app/#automatic-updates
		//     const update = await Updates.checkForUpdateAsync()
		//     console.log(`HomeStackNavigator. update:`, update)
		//     if (update.isAvailable) {
		//       Alert.alert('앱 업데이트를 진행중입니다.\n잠시만 기다려주세요')
		//       await Updates.fetchUpdateAsync()
		//       await Updates.reloadAsync()
		//     }
		//   } catch (e) {}
		// }
		//
		// checkAndUpdate()
	}, [])

	// return (
	return state.isGlobalLoading ? (
		<ActivityIndicator size={'large'} animating={true} color={'red'} style={{position: 'absolute', top: 300, alignSelf: 'center', zIndex: 10}} />
	) : (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name='HomeMain'
				component={HomeMain}
				options={{
					headerShown: false,
				}}
			/>
			{/* <HomeStack.Screen
				name='DoctorList'
				component={DoctorList}
				options={{
					headerShown: true,
					headerTitle: '의사 목록',
					headerTintColor: 'black',
				}}
			/> */}
		</HomeStack.Navigator>
	)
}
