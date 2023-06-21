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
	h1: {
		fontFamily: 'PretendardTabular-Bold-700',
		fontSize: 24,
		marginBottom: 10,
	},
	h2: {
		fontFamily: 'PretendardTabular-Bold-700',
		fontSize: 22,
		marginBottom: 8,
	},
	h3: {
		fontFamily: 'PretendardTabular-Bold-700',
		fontSize: 20,
		marginBottom: 8,
	},
	h4: {
		fontFamily: 'PretendardTabular-Bold-700',
		fontSize: 18,
		marginBottom: 6,
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

	comButtonSmall: {
		backgroundColor: '#fff',
		borderColor: '#DFDFDF',
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	comButtonSmallText: {
		fontSize: 12,
		lineHeight: 16,
		textAlign: 'center',
		color: '#050505',
	},
	// margin
	ml10: {marginLeft: 10},
	ml20: {marginLeft: 20},
	ml30: {marginLeft: 30},
	ml40: {marginLeft: 40},
	mr10: {marginRight: 10},
	mr20: {marginRight: 20},
	mr30: {marginRight: 30},
	mr40: {marginRight: 40},
	mt10: {marginTop: 10},
	mt20: {marginTop: 20},
	mt30: {marginTop: 30},
	mt40: {marginTop: 40},
	mb10: {marginBottom: 10},
	mb20: {marginBottom: 20},
	mb30: {marginBottom: 30},
	mb40: {marginBottom: 40},
	// padding
	pl10: {paddingLeft: 10},
	pl20: {paddingLeft: 20},
	pl30: {paddingLeft: 30},
	pl40: {paddingLeft: 40},
	pr10: {paddingRight: 10},
	pr20: {paddingRight: 20},
	pr30: {paddingRight: 30},
	pr40: {paddingRight: 40},
	pt10: {paddingTop: 10},
	pt20: {paddingTop: 20},
	pt30: {paddingTop: 30},
	pt40: {paddingTop: 40},
	pb10: {paddingBottom: 10},
	pb20: {paddingBottom: 20},
	pb30: {paddingBottom: 30},
	pb40: {paddingBottom: 40},
})

export default gs
