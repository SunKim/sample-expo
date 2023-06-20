import React, {useState, useEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Tab2Main from '../screens/tab2/Tab2Main'

const Tab2Stack = createNativeStackNavigator()

export default function Tab2StackNavigator() {
	useEffect(() => {
		// const checkAndUpdate = async () => {
		//   try {
		//     Alert.alert('checkAndUpdate')
		//     // cf) https://docs.expo.dev/bare/updating-your-app/#automatic-updates
		//     const update = await Updates.checkForUpdateAsync()
		//     console.log(`Tab2StackNavigator. update:`, update)
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
		<Tab2Stack.Navigator>
			<Tab2Stack.Screen
				name='Tab2Main'
				component={Tab2Main}
				options={{
					headerShown: false,
				}}
			/>
			{/* <Tab2Stack.Screen
				name='DoctorList'
				component={DoctorList}
				options={{
					headerShown: true,
					headerTitle: '의사 목록',
					headerTintColor: 'black',
				}}
			/> */}
		</Tab2Stack.Navigator>
	)
}
