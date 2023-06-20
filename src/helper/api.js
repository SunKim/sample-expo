import axios from 'axios'
import * as Device from 'expo-device'
import {expo} from '../../app.json'

// server host 설정. .env에 하려 했으나 운영테스트로 자주 바꿔야 되므로 그냥 여기에 설정
// const host = 'https://manage.clubhold.com/api' // 운영서버
const host = 'http://localhost:3010' // local host

// cf) https://axios-http.com/kr/docs/req_config
const api = axios.create({
	baseURL: host,
	// params: { api_key: '10923b261ba94d897ac6b12323a3f', language: 'en-US' },
	timeout: 5000,
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
})

// 앱 버전 관련. 앱스토어/플레이스토어 버전, 코드푸쉬(퍼블리싱) 버전
export const appVerInfo = {
	appStoreVer: expo.version,
	appPublishVer: '20230620-01',
}

export const deviceInfo = {
	deviceModelName: Device.modelName,
	deviceOsName: Device.osName,
	deviceOsVersion: Device.osVersion,
	isDevice: Device.isDevice,
}

// prettier-ignore
export const apis = {
  TEST : (sampleParam1, sampleParam2) => api.post(`/test/api`, {sampleParam1, sampleParam2, appVerInfo, deviceInfo}).then((r)=> r.data).catch((err)=> err),
	// TEST : () => api.post(`/bottomPopup`, {}).then((r)=> r.data).catch((err)=> err),
}
