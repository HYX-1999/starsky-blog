import { createDiscreteApi } from 'naive-ui'
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const { message } = createDiscreteApi(['message'])

const requests = axios.create({
	baseURL: '/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
	},
})

requests.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (localStorage.getItem('starskyToken')) {
			config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('starskyToken')
		}
		return config
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

requests.interceptors.response.use(
	(response: AxiosResponse) => {
		switch (response.data.code) {
			case 400:
				message.error(response.data.msg)
				break
			case 402:
				message.info("登录状态已过期，您可以继续留在该页面，或者重新登录")
				localStorage.removeItem('starskyToken')
				location.href = '/login'
			case 500:
				message.error(response.data.msg)
				break
		}
		return response.data
	},
	(error: AxiosError) => {
		const { message: messageInfo } = error
		let description = ''
		if (messageInfo == 'Network Error') {
			description = '后端接口连接异常'
		} else if (messageInfo.includes('timeout')) {
			description = '系统接口请求超时'
		} else if (messageInfo.includes('Request failed with status code')) {
			description = '系统接口' + messageInfo.substring(messageInfo.length - 3) + '异常'
		}
		message.error(description)
		return Promise.reject(error)
	}
)

export default requests
