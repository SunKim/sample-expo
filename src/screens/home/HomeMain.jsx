import React, {useState, useEffect, useRef} from 'react'
import {View, SafeAreaView, ScrollView, Alert, TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import i18n from '../../helper/i18n'
import {useAppDispatch, useAppState} from '../../context/AppContext'
import {apis, setGlobalLoading} from '../../helper/api'
import gs from '../../../assets/styles/gs'
import functions from '../../helper/functions'

const {width, height} = Dimensions.get('window')

function HomeMain({navigation, route}) {
	const state = useAppState()
	const dispatch = useAppDispatch()

	const [progress, setProgress] = useState(false)
	const [testData, setTestData] = useState({})

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
		await getSomeData()
	}

	// api request for test data
	const getSomeData = async () => {
		try {
			const result = await apis.TEST('hello', 'home')
			// console.log(`Tab4Main - getSomeData. result: `, result)

			if (result.success == '200') {
			} else {
				Alert.alert(i18n.t('dict.alert'), result.message)
			}
		} catch (e) {
			console.error(`HomeMain - getSomeData. error: `, e)
			Alert.alert(i18n.t('dict.alert'), i18n.t('error.apiFail'))
		}
	}

	return progress ? (
		<ActivityIndicator size={'large'} animating={true} color={'#ff0229'} style={{position: 'absolute', top: height / 2 - 30, alignSelf: 'center', zIndex: 9999}} />
	) : (
		<SafeAreaView style={gs.container}>
			<ScrollView>
				<Text style={ls.text}>HomeMain</Text>

				<Text style={gs.h2}>{i18n.t('dict.hello')}</Text>
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomeMain

// local style
const ls = StyleSheet.create({
	text: {
		// font family는 App.jsx에서 설정한 것을 사용할 수 있음. cf) https://docs.expo.dev/develop/user-interface/fonts/
		fontFamily: 'PretendardTabular-ExtraBold-800',
		fontSize: 16,
	},
	text2: {
		fontFamily: 'PretendardTabular-Regular-400',
		fontSize: 16,
	},
})
