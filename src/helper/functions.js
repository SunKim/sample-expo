// 사용법)
// import sunFunctions from '../../helper/sunFunctions'
// sunFunctions.setcomma()
const functions = {
	calculateTime: (value) => {
		// console.log(value)
		const today = new Date()
		const timeValue = new Date(value)

		// console.log(timeValue)
		const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60)
		if (betweenTime < 1) return '방금전'
		if (betweenTime < 60) {
			return `${betweenTime}분전`
		}

		const betweenTimeHour = Math.floor(betweenTime / 60)
		if (betweenTimeHour < 24) {
			return `${betweenTimeHour}시간전`
		}

		const betweenTimeDay = Math.floor(betweenTime / 60 / 24)
		if (betweenTimeDay < 365) {
			return `${betweenTimeDay}일전`
		}

		return `${Math.floor(betweenTimeDay / 365)}년전`
	},

	timeFormat: (d) => {
		let date = new Date(d)
		return Number(date.getFullYear()) + '-' + Number(date.getMonth() + 1) + '-' + Number(date.getDate()) + ' ' + Number(date.getHours()) + ':' + Number(date.getMinutes())
	},

	// MySQL의 DATETIME 형식을 받아서 'yyyy-mm-dd H:i:s' 형태로 반환
	formatDttm: (d, _seperator) => {
		const seperator = _seperator || '-'
		const date = d ? new Date(d) : new Date()

		let month = date.getMonth() + 1
		let day = date.getDate()
		let hour = date.getHours()
		let minute = date.getMinutes()
		let second = date.getSeconds()

		month = month >= 10 ? month : '0' + month
		day = day >= 10 ? day : '0' + day
		hour = hour >= 10 ? hour : '0' + hour
		minute = minute >= 10 ? minute : '0' + minute
		second = second >= 10 ? second : '0' + second

		return date.getFullYear() + seperator + month + seperator + day + ' ' + hour + ':' + minute + ':' + second
	},

	// MySQL의 DATE 형식을 받아서 'yyyy-mm-dd' 형태로 반환
	formatDate: (d, _seperator) => {
		const seperator = _seperator || '-'
		const date = d ? new Date(d) : new Date()

		let month = date.getMonth() + 1
		let day = date.getDate()

		month = month >= 10 ? month : '0' + month
		day = day >= 10 ? day : '0' + day

		return date.getFullYear() + seperator + month + seperator + day
	},

	// MySQL의 DATE 형식을 받아서 'yyyy년 m월 d일' 형태로 반환
	formatDateMark: (d) => {
		const date = d ? new Date(d) : new Date()

		let month = date.getMonth() + 1
		let day = date.getDate()

		return date.getFullYear() + '년 ' + month + '월 ' + day + '일'
	},

	// 0~23까지 받아서 시간 형태로 return
	formatOpenHour: (gub, hour) => {
		const _hour = hour > 9 ? hour + '' : '0' + hour
		if (gub == 'start') {
			return _hour + ':00'
		} else if (gub == 'end') {
			return _hour + ':59'
		}
	},

	// 날짜를 받아서 현재시간과 비교후 차이에 대해 반환
	getTimeDiffNm: (d) => {
		const now = new Date()
		const targetDttm = new Date(d)
		const diffSec = Math.abs((now.getTime() - targetDttm.getTime()) / 1000)

		let timeDiffNm = '방금전'
		const minSec = 60
		const hourSec = minSec * 60
		const daySec = hourSec * 24
		const monthSec = daySec * 30
		const yearSec = monthSec * 12

		if (diffSec < minSec) {
			timeDiffNm = '방금'
		} else if (diffSec < hourSec) {
			timeDiffNm = `${Math.floor(diffSec / minSec)}분`
		} else if (diffSec < daySec) {
			timeDiffNm = `${Math.floor(diffSec / hourSec)}시간`
		} else if (diffSec < monthSec) {
			timeDiffNm = `${Math.floor(diffSec / daySec)}일`
		} else if (diffSec < yearSec) {
			timeDiffNm = `${Math.floor(diffSec / monthSec)}개월`
		} else {
			timeDiffNm = `${Math.floor(diffSec / yearSec)}년`
		}

		return timeDiffNm
	},

	// 날짜를 받아서 현재시간과 비교후 차이에 대해 반환 - 일/개월/년 까지만
	getTimeDiffNm2: (d) => {
		const now = new Date()
		const targetDttm = new Date(d)
		const diffSec = Math.abs((now.getTime() - targetDttm.getTime()) / 1000)

		let timeDiffNm = '오늘'
		const minSec = 60
		const hourSec = minSec * 60
		const daySec = hourSec * 24
		const monthSec = daySec * 30
		const yearSec = monthSec * 12

		if (formatDate(now) == formatDate(targetDttm)) {
			timeDiffNm = '오늘'
		} else if (diffSec < monthSec) {
			timeDiffNm = `${Math.ceil(diffSec / daySec)}일전`
		} else if (diffSec < yearSec) {
			timeDiffNm = `${Math.floor(diffSec / monthSec)}개월전`
		} else {
			timeDiffNm = `${Math.floor(diffSec / yearSec)}년전`
		}

		return timeDiffNm
	},

	// 날짜를 2개 받아서 차이에 대해 반환 (d2 - d1)
	getTimeDiffNm3: (d1, d2) => {
		const dttm1 = new Date(d1)
		const dttm2 = new Date(d2)
		const diffSec = Math.abs((dttm2.getTime() - dttm1.getTime()) / 1000)

		let befOrAft, befOrAftNm
		if (dttm2.getTime() == dttm1.getTime()) {
			befOrAft = ''
			befOrAftNm = ''
		} else if (dttm2.getTime() > dttm1.getTime()) {
			befOrAft = 'BEF'
			befOrAftNm = '전'
		} else {
			befOrAft = 'AFT'
			befOrAftNm = '후'
		}

		let timeDiffNm = ''
		const minSec = 60
		const hourSec = minSec * 60
		const daySec = hourSec * 24
		const monthSec = daySec * 30
		const yearSec = monthSec * 12

		if (diffSec == 0) {
			timeDiffNm = '작성시점'
		} else if (diffSec < minSec) {
			timeDiffNm = '1분'
		} else if (diffSec < hourSec) {
			timeDiffNm = `${Math.floor(diffSec / minSec)}분`
		} else if (diffSec < daySec) {
			timeDiffNm = `${Math.floor(diffSec / hourSec)}시간`
		} else if (diffSec < monthSec) {
			timeDiffNm = `${Math.floor(diffSec / daySec)}일`
		} else if (diffSec < yearSec) {
			timeDiffNm = `${Math.floor(diffSec / monthSec)}개월`
		} else {
			timeDiffNm = `${Math.floor(diffSec / yearSec)}년`
		}
		// console.log(`api_list. getTimeDiffNm3. dttm1: ${dttm1}, dttm2: ${dttm2}, diffSec: ${diffSec}, befOrAft: ${befOrAft}, timeDiffNm: ${timeDiffNm}`)

		return {timeDiffNm, befOrAft, befOrAftNm}
	},

	getMonthMark: (month) => {
		if (!month) return ''
		return month >= 12 ? `${Math.floor(month / 12)}년 이상 ` : `${month}개월 `
	},

	// 전화번호/휴대폰번호에 숫자 외의 다른 문자가 들어가있으면 제거 (이렇게 하고 다시 -를 넣으려고)
	simplifyMobile: (mobile) => {
		return mobile.replace(/[^0-9.]/g, '')
	},

	// 전화번호/휴대폰번호 format (즉 01011112222 받아서 010-1111-2222 리턴. 우선 숫자만 남기려면 simplifyMobile)
	formatMobile: (mobile) => {
		if (typeof (mobile * 1) !== 'number' || mobile.length > 11 || mobile.length < 9) {
			return '전화번호가 형식에 맞지 않습니다.(숫자 9~11자리)'
		} else {
			return mobile.replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-$2-$3')
		}
	},

	// 운송장번호 format
	formatInvocNo: (invocNo) => {
		if (!invocNo || invocNo == '') {
			return ''
		}
		const _invocNo = invocNo.split('-').join('')
		return _invocNo.substr(0, 4) + '-' + _invocNo.substr(4, 4) + '-' + _invocNo.substr(8, 5)
	},

	// 휴대폰번호 형식 체크 (- 없이 숫자만. -가 있을경우 simplifyMobile)
	checkMobile: (mobile) => {
		/* eslint-disable-next-line */
		//const re = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/
		const reMobile = /(01[016789])([0-9]{3,4})([0-9]{4})$/
		return reMobile.test(mobile)
	},

	// 숫자에 콤마
	setComma: (num) => {
		if (typeof (num * 1) !== 'number') {
			return 0
		}
		return Math.round(num)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	},

	// 콤마 표시, 값이 없거나 0일경우 - 로 반환 an
	setCommaDash: (num) => {
		if (typeof (num * 1) !== 'number' || num * 1 === 0) {
			return '-'
		}
		return Math.round(num)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	},

	getAllUrlParams: (url) => {
		// get query string from url (optional) or window
		let queryString = url ? url.split('?')[1] : window.location.search.slice(1)

		// we'll store the parameters here
		var obj = {}

		// if query string exists
		if (queryString) {
			// stuff after # is not part of query string, so get rid of it
			queryString = queryString.split('#')[0]

			// split our query string into its component parts
			var arr = queryString.split('&')

			for (var i = 0; i < arr.length; i++) {
				// separate the keys and the values
				var a = arr[i].split('=')

				// set parameter name and value (use 'true' if empty)
				var paramName = a[0]
				var paramValue = typeof a[1] === 'undefined' ? true : a[1]

				// (optional) keep case consistent
				paramName = paramName.toLowerCase()
				if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase()

				// if the paramName ends with square brackets, e.g. colors[] or colors[2]
				if (paramName.match(/\[(\d+)?\]$/)) {
					// create key if it doesn't exist
					var key = paramName.replace(/\[(\d+)?\]/, '')
					if (!obj[key]) obj[key] = []

					// if it's an indexed array e.g. colors[2]
					if (paramName.match(/\[\d+\]$/)) {
						// get the index value and add the entry at the appropriate position
						var index = /\[(\d+)\]/.exec(paramName)[1]
						obj[key][index] = paramValue
					} else {
						// otherwise add the value to the end of the array
						obj[key].push(paramValue)
					}
				} else {
					// we're dealing with a string
					if (!obj[paramName]) {
						// if it doesn't exist, create property
						obj[paramName] = paramValue
					} else if (obj[paramName] && typeof obj[paramName] === 'string') {
						// if property does exist and it's a string, convert it to an array
						obj[paramName] = [obj[paramName]]
						obj[paramName].push(paramValue)
					} else {
						// otherwise add the property
						obj[paramName].push(paramValue)
					}
				}
			}
		}

		return obj
	},
}

export default functions
