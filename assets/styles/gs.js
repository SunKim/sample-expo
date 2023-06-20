import {StyleSheet, Dimensions} from 'react-native'
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// global style
const gs = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	flexRow: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	flexRowBetween: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	flexRowStart: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	flexRowEnd: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	text14c3: {
		fontSize: 14,
		color: '#333',
	},
	text14c6: {
		fontSize: 14,
		color: '#666',
	},
	text14c9: {
		fontSize: 14,
		color: '#999',
	},
	text16c3: {
		fontSize: 16,
		color: '#333',
	},
	text16c6: {
		fontSize: 16,
		color: '#666',
	},
	text16c9: {
		fontSize: 16,
		color: '#999',
	},
})

export default gs
