// cf) https://snack.expo.dev/@kartikeyvaish/bottom-tabs-example
import React, {useState} from 'react'
import {Animated, Alert, View, Text, TouchableOpacity, ImageBackground, Image, Platform, Dimensions, StyleSheet} from 'react-native'

const {width, height} = Dimensions.get('window')
// gnb에 투명을 주려면 position을 absolute로 줘야함. 화면내 absolute는 bottom을 gnbHeight 만큼 띄워줘야함
const gnbHeight = (width * 76) / 360

const gnb_bg_noshadow = require('../../assets/gnb/gnb_bg_noshadow.png')
const gnb_bg_shadow = require('../../assets/gnb/gnb_bg_shadow.png')
const gnb_home_off = require('../../assets/gnb/gnb_home_off.png')
const gnb_home_on = require('../../assets/gnb/gnb_home_on.png')
const gnb_treat_off = require('../../assets/gnb/gnb_treat_off.png')
const gnb_treat_on = require('../../assets/gnb/gnb_treat_on.png')
const gnb_store_off = require('../../assets/gnb/gnb_store_off.png')
const gnb_store_on = require('../../assets/gnb/gnb_store_on.png')
const gnb_content_off = require('../../assets/gnb/gnb_content_off.png')
const gnb_content_on = require('../../assets/gnb/gnb_content_on.png')
const gnb_settings_off = require('../../assets/gnb/gnb_settings_off.png')
const gnb_settings_on = require('../../assets/gnb/gnb_settings_on.png')

const IOS_BOTTOM_PADDING = Platform.OS == 'ios' ? 24 : 0

const gnbHomeHeight = (width * 68) / 360

function CustomTabBar({state, descriptors, navigation}) {
	const focusedOptions = descriptors[state.routes[state.index].key].options

	// useEffect(() => {
	//   console.log(`CustomTabBar - Platform.OS: ${Platform.OS}, width: ${width}, height: ${height}, gnbHeight: ${gnbHeight}, gnbHomeHeight: ${gnbHomeHeight}`)
	//   console.log(`CustomTabBar - focusedOptions: `, focusedOptions)
	// }, [focusedOptions])

	if (focusedOptions.tabBarVisible === false) {
		return null
	}

	// home버튼 animation용
	// cf) https://javascript.plainenglish.io/creating-a-rotation-animation-in-react-native-45c3f2973d62
	const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0))
	const handleAnimation = () => {
		Animated.timing(rotateAnimation, {
			toValue: 1,
			duration: 400,
			useNativeDriver: true,
		}).start(() => {
			rotateAnimation.setValue(0)
		})
	}
	const interpolateRotating = rotateAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '180deg'],
	})
	const animatedStyle = {
		transform: [
			{
				rotate: interpolateRotating,
			},
		],
	}

	const getGnbItem = (index, isFocused, label) => {
		if (index == 0 && isFocused) {
			return (
				<View style={{alignItems: 'center'}} elevation={5}>
					<Image source={gnb_treat_on} style={{alignSelf: 'center', width: 24, height: 24}} resizeMethod={'resize'} resizeMode={'contain'} />
					<Text style={ls.gnbTextSelected}>{label}</Text>
				</View>
			)
		} else if (index == 0 && !isFocused) {
			return (
				<View style={{alignItems: 'center'}}>
					<Image source={gnb_treat_off} style={{alignSelf: 'center', width: 24, height: 24, opacity: 0.5}} resizeMethod={'resize'} resizeMode={'contain'} />
					<Text style={ls.gnbText}>{label}</Text>
				</View>
			)
		} else if (index == 1 && isFocused) {
			return (
				<View style={{alignItems: 'center'}}>
					<Image source={gnb_store_on} style={{alignSelf: 'center', width: 24, height: 24}} resizeMethod={'resize'} resizeMode={'contain'} />
					<Text style={ls.gnbTextSelected}>{label}</Text>
				</View>
			)
		} else if (index == 1 && !isFocused) {
			return (
				<View style={{alignItems: 'center'}}>
					<Image source={gnb_store_off} style={{alignSelf: 'center', width: 24, height: 24, opacity: 0.5}} resizeMethod={'resize'} resizeMode={'contain'} />
					<Text style={ls.gnbText}>{label}</Text>
				</View>
			)
		} else if (index == 2 && isFocused) {
			return (
				<View style={{paddingTop: 2, paddingLeft: Platform.OS == 'ios' ? 0.5 : 1}}>
					<Animated.Image source={gnb_home_on} style={{alignSelf: 'center', width: gnbHomeHeight, height: gnbHomeHeight, ...animatedStyle}} resizeMethod={'resize'} resizeMode={'contain'} />
				</View>
			)
		} else if (index == 2 && !isFocused) {
			return (
				<View style={{paddingTop: 2, paddingLeft: Platform.OS == 'ios' ? 0.5 : 1}}>
					<Animated.Image source={gnb_home_off} style={{alignSelf: 'center', width: gnbHomeHeight, height: gnbHomeHeight, ...animatedStyle}} resizeMethod={'resize'} resizeMode={'contain'} />
				</View>
			)
		} else if (index == 3 && isFocused) {
			return (
				<View style={{alignItems: 'center'}}>
					<Image source={gnb_content_on} style={{alignSelf: 'center', width: 24, height: 24}} resizeMethod={'resize'} resizeMode={'contain'} />
					<Text style={ls.gnbTextSelected}>{label}</Text>
				</View>
			)
		} else if (index == 3 && !isFocused) {
			return (
				<View>
					<Image source={gnb_content_off} style={{alignSelf: 'center', width: 24, height: 24, opacity: 0.5}} resizeMethod={'resize'} resizeMode={'contain'} />
					<Text style={ls.gnbText}>{label}</Text>
				</View>
			)
		} else if (index == 4 && isFocused) {
			return (
				<View style={{alignItems: 'center'}}>
					<Image source={gnb_settings_on} style={{alignSelf: 'center', width: 24, height: 24}} resizeMethod={'resize'} resizeMode={'contain'} />
					<Text style={ls.gnbTextSelected}>{label}</Text>
				</View>
			)
		} else if (index == 4 && !isFocused) {
			return (
				<View>
					<Image source={gnb_settings_off} style={{alignSelf: 'center', width: 24, height: 24, opacity: 0.5}} resizeMethod={'resize'} resizeMode={'contain'} />
					<Text style={ls.gnbText}>{label}</Text>
				</View>
			)
		}
	}

	return (
		<View style={ls.container}>
			<ImageBackground source={gnb_bg_shadow} resizeMethod={'scale'} resizeMode={'cover'} style={ls.backgroundImage}>
				{state.routes.map((route, index) => {
					const {options} = descriptors[route.key]
					const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name

					const isFocused = state.index === index

					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						})

						// console.log(`tab pressed. ===========================================`)
						// console.log(`tab pressed. navigation: `, navigation)
						// console.log(`tab pressed. navigation.state.history: `, navigation.getState().history)
						// console.log(`tab pressed. route: `, route)

						// home이면 animation
						if (route.name == 'Home') {
							handleAnimation()
						}

						if (isFocused) {
							// Alert.alert(`또눌렀니. route.key: ${route.key}`)

							// focus된 상태에서 또 gnb 터치
							navigation.emit({
								type: 'tabPressOnSameScreen',
								target: route.key,
								canPreventDefault: true,
							})
						} else if (!isFocused && !event.defaultPrevented) {
							// MainTabNavigator에서 tabPress에 popToTop을 하므로 scroll은 안해줘도 됨
							navigation.navigate(route.name)
						}
					}

					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						})
					}

					return (
						<TouchableOpacity
							key={index}
							accessibilityRole='button'
							accessibilityState={isFocused ? {selected: true} : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={index == 2 ? ls.gnbHomeBtn : ls.gnbBtn}
						>
							{getGnbItem(index, isFocused, label)}
						</TouchableOpacity>
					)
				})}
			</ImageBackground>
		</View>
	)
}

export default CustomTabBar

const ls = StyleSheet.create({
	container: {
		// 중간에 홈 배경 투명이 안먹어서 position:abolute 주니 해결됨. https://stackoverflow.com/questions/49988486/how-do-you-make-the-react-native-react-navigation-tab-bar-transparent
		position: 'absolute',
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: 'transparent',

		flexDirection: 'row',

		// backgroundColor:'#eee',
		// backgroundColor:'#333',
		// elevation: 50,
	},
	backgroundImage: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
		height: gnbHeight,
		paddingBottom: IOS_BOTTOM_PADDING,
		// shadowColor: "#000",
		// shadowOffset: { width: 0, height: 2 },
		// shadowOpacity: 0.4,
		// shadowRadius: 3.84,
		// elevation: 50,
	},
	gnbBtn: {
		flex: 1,
		height: 72,
		marginBottom: IOS_BOTTOM_PADDING,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor:'blue',
	},
	gnbHomeBtn: {
		width: gnbHomeHeight,
		height: gnbHomeHeight,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
		// backgroundColor:'green',
	},
	gnbText: {
		fontSize: 12,
		marginTop: 4,
		fontWeight: '600',
		// color: '#ff0229',
		color: '#999',
	},
	gnbTextSelected: {
		fontSize: 12,
		marginTop: 4,
		fontWeight: '600',
		// color: '#ff0229',
		color: '#333',
	},
})
