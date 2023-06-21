import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import i18n from '../helper/i18n'
import {getLocales} from 'expo-localization'
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

	const [curLang, setCurLang] = useState(null)

	const checkUserSession = async () => {
		// console.log(`Index. state.isLogin: ${state.isLogin}, state.needLogin: ${state.needLogin}`)

		try {
			const rawUser = await AsyncStorage.getItem('user')
			const user = rawUser != null ? JSON.parse(rawUser) : null

			// console.log(`Index. checkUserSession. user: `, user)

			dispatch({type: 'SET_USER', user})
		} catch (error) {
			console.log(`Index. AsyncStorage.getItem(user) error:`, error)
		}
	}

	const setLang = async () => {
		const savedLang = (await AsyncStorage.getItem('lang')) || getLocales()[0].languageCode
		// console.log(`Index. setLang. savedLang: `, savedLang)
		if (savedLang != null) {
			i18n.locale = savedLang
			setCurLang(savedLang)
		}
	}

	// async storage에서 await으로 설정언어를 가져와야 하기 때문에 없으면 기다림.
	if (!curLang) {
		return null
	}

	return <MainTabNavigator />
}
