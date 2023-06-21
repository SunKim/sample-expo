import React, {useState, useEffect, useRef} from 'react'
import {View, SafeAreaView, ScrollView, Alert, TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Updates from 'expo-updates'
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

	// XX 데이터 불러오기
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
			Alert.alert(i18n.t('dict.alert'), `처리 도중 오류가 발생했습니다.\n고객센터로 연락 바랍니다.`)
		}
	}

	const changeLang = async (lang) => {
		await AsyncStorage.setItem('lang', lang)
		i18n.locale = lang

		// await Updates.reloadAsync()
		console.log(`Tab4Main - changeLang. lang: ${lang}, i18n.locale: `, i18n.locale)
		console.log(`Tab4Main - changeLang. lang: ${lang}, i18n: `, i18n)
		// navigation.replace('Tab4Main')

		Alert.alert('알림', i18n.t('message.languageChanged'), [
			{
				text: i18n.t('dict.ok'),
				onPress: async () => {
					await Updates.reloadAsync()
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
						style={gs.comButtonSmall}
						onPress={async () => {
							await changeLang('en')
						}}
					>
						<Text style={gs.comButtonSmallText}>English</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[gs.comButtonSmall, gs.ml10]}
						onPress={async () => {
							await changeLang('ko')
						}}
					>
						<Text style={gs.comButtonSmallText}>한국어</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[gs.comButtonSmall, gs.ml10]}
						onPress={async () => {
							await changeLang('in')
						}}
					>
						<Text style={gs.comButtonSmallText}>Bahasa Indonesia</Text>
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
