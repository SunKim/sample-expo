import React, {useState, useEffect, useRef} from 'react'
import {View, SafeAreaView, ScrollView, Alert, TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

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
		await getSomeData()
	}

	// XX 데이터 불러오기
	const getSomeData = async () => {
		try {
			const result = await apis.TEST('hello', 'tab4')
			// console.log(`Tab4Main - getSomeData. result: `, result)

			if (result.success == '200') {
			} else {
				Alert.alert('잠깐!', result.message)
			}
		} catch (e) {
			console.error(`Tab4Main - getSomeData. error: `, e)
			Alert.alert('잠깐!', `XXXX 도중 오류가 발생했습니다.\n고객센터로 연락 바랍니다.(카카오채널 @HOLD)`)
		}
	}

	return progress ? (
		<ActivityIndicator size={'large'} animating={true} color={'red'} style={{position: 'absolute', top: 300, alignSelf: 'center', zIndex: 10}} />
	) : (
		<SafeAreaView style={gs.container}>
			<ScrollView>
				<Text style={ls.text}>Tab4Main</Text>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Tab4Main

const ls = StyleSheet.create({
	text: {
		fontSize: 16,
		fontWeight: '700',
	},
})
