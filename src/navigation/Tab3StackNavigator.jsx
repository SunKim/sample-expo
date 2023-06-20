import React, {useState, useEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Tab3Main from '../screens/tab3/Tab3Main'

const Tab3Stack = createNativeStackNavigator()

export default function Tab3StackNavigator() {
	useEffect(() => {
		// const checkAndUpdate = async () => {
		//   try {
		//     Alert.alert('checkAndUpdate')
		//     // cf) https://docs.expo.dev/bare/updating-your-app/#automatic-updates
		//     const update = await Updates.checkForUpdateAsync()
		//     console.log(`Tab3StackNavigator. update:`, update)
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
		<Tab3Stack.Navigator>
			<Tab3Stack.Screen
				name='Tab3Main'
				component={Tab3Main}
				options={{
					headerShown: false,
				}}
			/>
			{/* <Tab3Stack.Screen
				name='DoctorList'
				component={DoctorList}
				options={{
					headerShown: true,
					headerTitle: '의사 목록',
					headerTintColor: 'black',
				}}
			/> */}
		</Tab3Stack.Navigator>
	)
}
