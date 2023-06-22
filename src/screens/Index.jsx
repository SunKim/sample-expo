import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {useAppDispatch, useAppState} from '../context/AppContext'
import MainTabNavigator from '../navigation/MainTabNavigator'

export default function Index() {
	const state = useAppState()
	const dispatch = useAppDispatch()

	useEffect(() => {
		// 사용자 체크
		checkUserSession()
	}, [])

	const checkUserSession = async () => {
		// console.log(`Index. state.isLogin: ${state.isLogin}, state.needLogin: ${state.needLogin}`)

		try {
			const rawUser = await AsyncStorage.getItem('user')
			const user = rawUser != null ? JSON.parse(rawUser) : null

			console.log(`Index. checkUserSession. user: `, user)
			dispatch({type: 'SET_USER', user})
		} catch (error) {
			console.log(`Index. AsyncStorage.getItem(user) error:`, error)
		}
	}

	return <MainTabNavigator />
}
