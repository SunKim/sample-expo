import React, {useRef, useCallback} from 'react'
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {useFonts} from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import {AppContextProvider} from './src/context/AppContext'
import Index from './src/screens/Index'

// SplashScreen.preventAutoHideAsync()

export default function App() {
	// navigation 밖에서 ref를 통해 navigation, route 접근
	// cf) https://reactnavigation.org/docs/navigation-container
	const navigationRef = useNavigationContainerRef()
	const routeNameRef = useRef()

	// https://docs.expo.dev/develop/user-interface/fonts/
	const [fontsLoaded] = useFonts({
		'PretendardTabular-Regular-400': require('./assets/fonts/pretendard/PretendardTabular-Regular-400.otf'),
		'PretendardTabular-Medium-500': require('./assets/fonts/pretendard/PretendardTabular-Medium-500.otf'),
		'PretendardTabular-Bold-700': require('./assets/fonts/pretendard/PretendardTabular-Bold-700.otf'),
		'PretendardTabular-ExtraBold-800': require('./assets/fonts/pretendard/PretendardTabular-ExtraBold-800.otf'),
		'RokafSlab-Medium-500': require('./assets/fonts/rokaf/RokafSlab-Medium-500.otf'),
		'RokafSlab-Bold-800': require('./assets/fonts/rokaf/RokafSlab-Bold-800.otf'),
	})

	// const onLayoutRootView = useCallback(async () => {
	// 	if (fontsLoaded) {
	// 		await SplashScreen.hideAsync()
	// 	}
	// }, [fontsLoaded])

	if (!fontsLoaded) {
		return null
	}

	return (
		<AppContextProvider>
			<SafeAreaProvider>
				<NavigationContainer
					ref={navigationRef}
					onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute()?.name)}
					onStateChange={async () => {
						const previousScreenName = routeNameRef.current
						const currentRoute = navigationRef.current.getCurrentRoute()
						const currentScreenName = `${currentRoute?.name}_${Object.values(currentRoute?.params || {}).join('/')}`

						if (currentRoute && previousScreenName !== currentScreenName) {
							try {
								console.log(`NavigationContainer - onStateChange. ${previousScreenName} -> ${currentScreenName}`)
								// await analytics().logEvent('screen_view', {
								// 	// ex) screen_class: DoctorDetail, screen_name: DoctorDetail_30
								// 	screen_class: currentRoute.name,
								// 	screen_name: currentScreenName,
								// })
							} catch (e) {
								console.error(`App.jsx - NavigationContainer - onStateChange. error: `, e)
							}
						}
						// Save the current route name for later comparision
						routeNameRef.current = currentScreenName
					}}
				>
					<Index />
				</NavigationContainer>
			</SafeAreaProvider>
		</AppContextProvider>
	)
}
