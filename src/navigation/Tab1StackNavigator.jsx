import React, {useState, useEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Tab1Main from '../screens/tab1/Tab1Main'

const Tab1Stack = createNativeStackNavigator()

export default function Tab1StackNavigator() {
	useEffect(() => {
		// const checkAndUpdate = async () => {
		//   try {
		//     Alert.alert('checkAndUpdate')
		//     // cf) https://docs.expo.dev/bare/updating-your-app/#automatic-updates
		//     const update = await Updates.checkForUpdateAsync()
		//     console.log(`Tab1StackNavigator. update:`, update)
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

	return (
		<Tab1Stack.Navigator>
			<Tab1Stack.Screen
				name='Tab1Main'
				component={Tab1Main}
				options={{
					headerShown: false,
				}}
			/>
			{/* <Tab1Stack.Screen
				name='DoctorList'
				component={DoctorList}
				options={{
					headerShown: true,
					headerTitle: '의사 목록',
					headerTintColor: 'black',
				}}
			/> */}
		</Tab1Stack.Navigator>
	)
}
