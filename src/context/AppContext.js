import React, {createContext, useReducer, useContext} from 'react'

// AppContext 에서 사용 할 기본 상태
const initialState = {
	isGlobalLoading: false,
	// default locale(language)은 영어로 (i18n.js에도 설정). 사용자가 선택한 언어로 변경됨
	lang: 'en',
	// 사용자 기본 locale 정보 (currencyCode, currencySymbol, decimalSeparator, digitGroupingSeparator, measurementSystem, regionCode, textDirection)
	locale: {},
	calendar: {},

	user: {},

	someArray: [],
	someObj: {},
	someStr: 'Hello World',
}

// 위에서 만든 객체, 유틸 함수들을 사용하여 리듀서 작성
// 호출 예제) dispatch({type: 'SET_SOME_ALL', someArray: []], someObj: {userNm: '홍길동', uidx: 37}, someStr: 'Hello'})
function appReducer(state, action) {
	switch (action.type) {
		case 'SET_GLOBAL_LOADING':
			return {
				...state,
				isGlobalLoading: action.isGlobalLoading,
			}
		case 'SET_LANG':
			return {
				...state,
				lang: action.lang,
			}
		case 'SET_LOCALE':
			return {
				...state,
				locale: action.locale,
			}
		case 'SET_CALENDAR':
			return {
				...state,
				calendar: action.calendar,
			}
		case 'SET_USER':
			return {
				...state,
				user: action.user,
			}
		case 'SET_SOME_ALL':
			return {
				...state,
				someArray: [...action.someArray],
				someObj: action.someObj,
				someStr: action.someStr,
			}
		case 'SET_SOME_ARRAY':
			return {
				...state,
				someArray: [...action.someArray],
			}
		case 'SET_SOME_OBJ':
			return {
				...state,
				someObj: action.someObj,
			}
		case 'SET_SOME_STR':
			return {
				...state,
				someStr: action.someStr,
			}
		default:
			console.log('error catch')
			throw new Error(`Unhandled action type: ${action.type}`)
	}
}

// State 용 Context 와 Dispatch 용 Context 따로 만들어주기
const AppStateContext = createContext(null)
const AppDispatchContext = createContext(null)

// HOC pattern
// 위에서 선언한 두가지 Context들을 Provider 로 감싸주는 컴포넌트
export function AppContextProvider({children}) {
	const [state, dispatch] = useReducer(appReducer, initialState)

	return (
		<AppStateContext.Provider value={state}>
			<AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
		</AppStateContext.Provider>
	)
}

// State 를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
export function useAppState() {
	const state = useContext(AppStateContext)
	if (!state) {
		throw new Error('Cannot find Provider')
	}
	return state
}

// Dispatch 를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
export function useAppDispatch() {
	const dispatch = useContext(AppDispatchContext)
	if (!dispatch) {
		throw new Error('Cannot find Provider')
	}
	return dispatch
}
