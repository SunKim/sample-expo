import React, {useState, useEffect, useRef} from 'react'
import {View, SafeAreaView, ScrollView, Alert, TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart'
import {ActivityIndicator} from 'react-native-paper'

import i18n from '../../helper/i18n'
import {useAppDispatch, useAppState} from '../../context/AppContext'
import {apis} from '../../helper/api'
import gs from '../../../assets/styles/gs'
import functions from '../../helper/functions'

const {width, height} = Dimensions.get('window')

function Tab4Main({navigation, route}) {
	const state = useAppState()
	const dispatch = useAppDispatch()

	// 로딩중
	const [progress, setProgress] = useState(false)

	// 최초 화면 진입시 progress 보여줌.
	useEffect(() => {
		setProgress(true)

		setTimeout(() => {
			setProgress(false)
		}, 300)
	}, [])

	// 뒤로가기로 화면 진입시 데이터만 갱신(scroll 위치도 그대로임)
	useEffect(() => {
		// focus 될때마다 수행
		const unsubscribe = navigation.addListener('focus', () => {
			init()
		})
		// return을 해줘야 unmount시 listener 해제
		return unsubscribe
	}, [navigation])

	const init = async () => {
		console.log(`Tab4Main - init. i18n.locale: `, i18n.locale)
		await getSomeData()
	}

	// api request for test data
	const getSomeData = async () => {
		try {
			const result = await apis.TEST('hello', 'tab4')
			// console.log(`Tab4Main - getSomeData. result: `, result)

			if (result.success == '200') {
			} else {
				Alert.alert(i18n.t('dict.alert'), result.message)
			}
		} catch (e) {
			console.error(`Tab4Main - getSomeData. error: `, e)
			Alert.alert(i18n.t('dict.alert'), i18n.t('error.apiFail'))
		}
	}

	const changeLang = async (lang) => {
		await AsyncStorage.setItem('lang', lang)
		i18n.locale = lang

		// await Updates.reloadAsync()
		console.log(`Tab4Main - changeLang. lang: ${lang}, i18n.locale: `, i18n.locale)
		// navigation.replace('Tab4Main')

		Alert.alert(i18n.t('dict.noti'), i18n.t('message.languageChanged'), [
			{
				text: i18n.t('dict.ok'),
				onPress: () => {
					RNRestart.restart()
				},
			},
		])
	}

	return progress ? (
		<ActivityIndicator size={'large'} animating={true} color={'red'} style={{position: 'absolute', top: 300, alignSelf: 'center', zIndex: 10}} />
	) : (
		<SafeAreaView style={gs.container}>
			<ScrollView style={{padding: 20}}>
				<Text style={ls.text}>Tab4Main</Text>

				<Text style={gs.h2}>
					{i18n.t('dict.language')} {i18n.t('dict.setting')}
				</Text>

				<View style={gs.flexRow}>
					<TouchableOpacity
						style={gs.smBtn}
						onPress={async () => {
							await changeLang('en')
						}}
					>
						<Text style={gs.smBtnText}>English</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[gs.smBtn, gs.ml10]}
						onPress={async () => {
							await changeLang('ko')
						}}
					>
						<Text style={gs.smBtnText}>한국어</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[gs.smBtn, gs.ml10]}
						onPress={async () => {
							await changeLang('in')
						}}
					>
						<Text style={gs.smBtnText}>Bahasa Indonesia</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[gs.smBtn, gs.ml10]}
						onPress={async () => {
							await changeLang('th')
						}}
					>
						<Text style={gs.smBtnText}>แบบไทย</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Tab4Main

const ls = StyleSheet.create({
	text: {
		fontSize: 16,
		fontWeight: '700',
		marginBottom: 20,
	},
})
