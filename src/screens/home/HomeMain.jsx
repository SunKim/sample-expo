import React, {useState, useEffect, useRef} from 'react'
import {View, SafeAreaView, ScrollView, Alert, TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

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

	// XX 데이터 불러오기
	const getSomeData = async () => {
		try {
			const result = await apis.TEST('hello', 'world')
			console.log(`HomeMain - getSomeData. result: `, result)

			if (result.success == '200') {
			} else {
				Alert.alert('잠깐!', result.message)
			}
		} catch (e) {
			console.error(`HomeMain - getSomeData. error: `, e)
			Alert.alert('잠깐!', `XXXX 도중 오류가 발생했습니다.\n고객센터로 연락 바랍니다.(카카오채널 @HOLD)`)
		}
	}

	return progress ? (
		<ActivityIndicator size={'large'} animating={true} color={'#ff0229'} style={{position: 'absolute', top: height / 2 - 30, alignSelf: 'center', zIndex: 9999}} />
	) : (
		<SafeAreaView style={gs.container}>
			<ScrollView>
				<Text style={ls.text}>HomeMain</Text>

				<Text style={ls.text2}>Hello</Text>
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
