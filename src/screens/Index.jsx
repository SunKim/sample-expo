import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import i18n from '../helper/i18n'
import {useAppDispatch, useAppState} from '../context/AppContext'
import MainTabNavigator from '../navigation/MainTabNavigator'

export default function Index() {
	const state = useAppState()
	const dispatch = useAppDispatch()

	useEffect(() => {
		// 사용자 체크
		checkUserSession()
		setLang()
	}, [])

	useEffect(() => {
		console.log(`Index - useEffect. i18n.locale changed: `, i18n.locale)
	}, [i18n.locale])

	const checkUserSession = async () => {
		// console.log(`Index. state.isLogin: ${state.isLogin}, state.needLogin: ${state.needLogin}`)

		try {
			const rawUser = await AsyncStorage.getItem('user')
			const user = rawUser != null ? JSON.parse(rawUser) : null

			console.log(`Index. checkUserSession. user: `, user)

			// if (user) {
			// 	dispatch({type: 'SET_USER', user})
			// } else {
			// 	dispatch({type: 'SET_IS_LOGIN', user: null})
			// }
			dispatch({type: 'SET_USER', user})
		} catch (error) {
			console.log(`Index. AsyncStorage.getItem(user) error:`, error)
		}
	}

	const setLang = async () => {
		const savedLang = await AsyncStorage.getItem('lang')
		console.log(`Index. setLang. savedLang: `, savedLang)
		if (savedLang != null) {
			i18n.locale = savedLang
		}
	}

	return <MainTabNavigator />
}
