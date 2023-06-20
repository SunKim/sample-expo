import React, {useState, useEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Tab4Main from '../screens/tab4/Tab4Main'

const Tab4Stack = createNativeStackNavigator()

export default function Tab4StackNavigator() {
	useEffect(() => {
		// const checkAndUpdate = async () => {
		//   try {
		//     Alert.alert('checkAndUpdate')
		//     // cf) https://docs.expo.dev/bare/updating-your-app/#automatic-updates
		//     const update = await Updates.checkForUpdateAsync()
		//     console.log(`Tab4StackNavigator. update:`, update)
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
		<Tab4Stack.Navigator>
			<Tab4Stack.Screen
				name='Tab4Main'
				component={Tab4Main}
				options={{
					headerShown: false,
				}}
			/>
			{/* <Tab4Stack.Screen
				name='DoctorList'
				component={DoctorList}
				options={{
					headerShown: true,
					headerTitle: '의사 목록',
					headerTintColor: 'black',
				}}
			/> */}
		</Tab4Stack.Navigator>
	)
}
