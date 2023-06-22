import React, {useState, useEffect, useRef} from 'react'
import {View, SafeAreaView, ScrollView, Alert, TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'
import moment from 'moment-timezone'

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
	const [testData, setTestData] = useState('')
	const [testDate, setTestDate] = useState('')

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

	// Index에서 await으로 asyncStorage에서 lang을 가져와야 하는데 이미 HomeMain은 render가 되므로 state.lang이 바뀌면 다시 init()을 수행하도록.
	useEffect(() => {
		init()
	}, [state.lang])

	const init = async () => {
		await getSomeData()
	}

	// api request for test data
	const getSomeData = async () => {
		try {
			const result = await apis.TEST('hello', 'home')
			console.log(`HomeMain - getSomeData. result: `, result)

			if (result.success == '200') {
				setTestData(result.testData)
				setTestDate(result.testDate)
			} else {
				Alert.alert(i18n.t('dict.alert'), result.message)
			}
		} catch (e) {
			console.error(`HomeMain - getSomeData. error: `, e)
			Alert.alert(i18n.t('dict.alert'), i18n.t('error.apiFail'))
		}
	}

	// return progress ? (
	// 	<ActivityIndicator size={'large'} animating={true} color={'#ff0229'} style={{position: 'absolute', top: height / 2 - 30, alignSelf: 'center', zIndex: 9999}} />
	// ) : (
	return (
		<SafeAreaView style={gs.container}>
			<ScrollView style={{padding: 18}}>
				<View style={gs.mb20}>
					<Text style={gs.h2}>{i18n.t('dict.hello')}</Text>

					<Text style={gs.text14c3}>{testData}</Text>
					<Text style={gs.text14c3}>{testDate}</Text>
				</View>

				<View style={gs.mb20}>
					<Text style={gs.h2}>{'Custom Font'}</Text>
					<Text style={gs.h4}>
						{'PretendardTabular 700'} {'프리텐다드'}
					</Text>
					<Text style={{fontWeight: '700', fontSize: 18}}>
						{'System default font'} {'시스템기본'}
					</Text>
					<Text style={{fontFamily: 'RokafSlab-Medium-500', fontWeight: '700', fontSize: 18}}>
						{'RokafSlab-Medium-500'} {'로카스'}
					</Text>
				</View>

				<View style={gs.mb20}>
					<Text style={gs.h2}>{'Local Calendar'}</Text>
					{/* <Text style={gs.text14c3}>Locale: {JSON.stringify(state.locale)}</Text> */}
					{/* <Text style={gs.text14c3}>Calendar: {JSON.stringify(state.calendar)}</Text> */}
					<Text style={gs.text14c3}>Timezone: {state.calendar.timeZone}</Text>
					<Text style={gs.text14c3}>UTC: {testDate}</Text>
					<Text style={gs.text14c3}>Local Time: {moment(testDate).tz(state.calendar.timeZone)?.format('YYYY-MM-DD HH:mm:ss')}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomeMain

// local style
const ls = StyleSheet.create({
	lsText: {
		// font family는 App.jsx에서 설정한 것을 사용할 수 있음. cf) https://docs.expo.dev/develop/user-interface/fonts/
		fontFamily: 'PretendardTabular-ExtraBold-800',
		fontSize: 16,
	},
	lsText2: {
		fontFamily: 'PretendardTabular-Regular-400',
		fontSize: 16,
	},
})
