import React from 'react'
import {StackActions} from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import CustomTabBar from './CustomTapBar'
import HomeStackNavigator from './HomeStackNavigator'
import Tab1StackNavigator from './Tab1StackNavigator'
import Tab2StackNavigator from './Tab2StackNavigator'
import Tab3StackNavigator from './Tab3StackNavigator'
import Tab4StackNavigator from './Tab4StackNavigator'

const Tab = createBottomTabNavigator()

export default function MainTabNavigator() {
	return (
		<Tab.Navigator initialRouteName='Home' tabBar={(props) => <CustomTabBar {...props} />}>
			<Tab.Screen
				name='Tab1'
				component={Tab1StackNavigator}
				listeners={({navigation}) => {
					return {
						// 하단 탭 클릭시 stack navigator 초기화
						tabPress: (e) => {
							if (navigation.getState().routes.find((tab) => tab.name == 'Tab1')?.state?.index || 0 > 0) {
								navigation.dispatch(StackActions.popToTop())
							}
						},
						// 같은 화면에서 또 tab 클릭시
						tabPressOnSameScreen: (e) => {
							// dispatch({type: 'SET_SCROLL_TO_TOP_TREAT', scrollToTopTreat: true})
						},
					}
				}}
				options={{
					headerShown: false,
					tabBarLabel: 'Tab1',
					tabBarIcon: ({focused, color, size}) => <MaterialCommunityIcons name='stethoscope' color={color} size={24} />,
				}}
			/>
			<Tab.Screen
				name='Tab2'
				component={Tab2StackNavigator}
				listeners={({navigation}) => {
					return {
						// 하단 탭 클릭시 stack navigator 초기화
						tabPress: (e) => {
							if (navigation.getState().routes.find((tab) => tab.name == 'Tab2')?.state?.index || 0 > 0) {
								navigation.dispatch(StackActions.popToTop())
							}
						},
						// 같은 화면에서 또 tab 클릭시
						tabPressOnSameScreen: (e) => {},
					}
				}}
				options={{
					headerShown: false,
					tabBarLabel: 'Tab2',
					tabBarIcon: ({focused, color, size}) => <MaterialCommunityIcons name='basket' color={color} size={24} />,
				}}
			/>
			<Tab.Screen
				name='Home'
				component={HomeStackNavigator}
				// component={Ready}
				listeners={({navigation}) => {
					return {
						// 하단 탭 클릭시 stack navigator 초기화
						tabPress: (e) => {
							if (navigation.getState().routes.find((tab) => tab.name == 'Home')?.state?.index || 0 > 0) {
								navigation.dispatch(StackActions.popToTop())
							}
						},
						// 같은 화면에서 또 tab 클릭시
						tabPressOnSameScreen: (e) => {},
					}
				}}
				options={{
					headerShown: false,
					tabBarLabel: '홈',
					// tabBarShowLabel: false,
					tabBarIcon: ({focused, color, size}) => (
						<>
							<MaterialCommunityIcons name='basket' color={color} size={24} />
						</>
					),
				}}
			/>
			<Tab.Screen
				name='Tab3'
				component={Tab3StackNavigator}
				listeners={({navigation}) => {
					return {
						// 하단 탭 클릭시 stack navigator 초기화
						tabPress: (e) => {
							if (navigation.getState().routes.find((tab) => tab.name == 'Tab3')?.state?.index || 0 > 0) {
								navigation.dispatch(StackActions.popToTop())
							}
						},
						// 같은 화면에서 또 tab 클릭시 state 변경 -> screen에서 state 변경시 scroll to top
						tabPressOnSameScreen: (e) => {},
					}
				}}
				options={{
					headerShown: false,
					tabBarLabel: 'Tab3',
					tabBarIcon: ({focused, color, size}) => (
						<>
							<MaterialCommunityIcons name='bulletin-board' color={color} size={24} />
							<View style={{position: 'absolute', top: -8, right: -6, width: 16, height: 16, backgroundColor: 'red', borderRadius: 8, justifyContent: 'center', alignItems: 'center', opacity: 0.6}}>
								<Text style={{fontSize: 8, fontWeight: '900', color: '#fff'}}>N</Text>
							</View>
						</>
					),
				}}
			/>
			<Tab.Screen
				name='Tab4'
				component={Tab4StackNavigator}
				listeners={({navigation}) => {
					return {
						// 하단 탭 클릭시 stack navigator 초기화
						tabPress: (e) => {
							if (navigation.getState().routes.find((tab) => tab.name == 'Tab4')?.state?.index || 0 > 0) {
								navigation.dispatch(StackActions.popToTop())
							}
						},
						// 같은 화면에서 또 tab 클릭시 state 변경 -> screen에서 state 변경시 scroll to top
						tabPressOnSameScreen: (e) => {},
					}
				}}
				options={{
					headerShown: false,
					tabBarLabel: 'Tab4',
					tabBarIcon: ({focused, color, size}) => <MaterialCommunityIcons name='account' color={color} size={24} />,
				}}
			/>
		</Tab.Navigator>
	)
}
