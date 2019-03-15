/*
 * @Author: wuzhen
 * @Date: 2019-01-22 09:18:13
 * @LastEditors: wuzhen
 * @LastEditTime: 2019-02-21 13:50:35
 * @Description: fetch.js网络请求数据
 */
var baseUrl = 'http://47.244.9.84:8080/api/v1'
/**
 * @description:
 * @param {String} url - 请求地址
 * @param {Object} data - 请求数据
 * @param {String} type - 请求类型 'POST/GET/DELETE'
 * @return:
 */
function fetch(url, data, type) {
	var type = type.toUpperCase(),
		url = baseUrl + url;
		method = 'fetch'
	if (type == 'GET') {
		var dataStr = ''; // 数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		});
		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
	if (method === 'fetch') {
		var requestObj;
		return new Promise((resolve, reject) => {
			if (window.XMLHttpRequest) {
				// eslint-disable-next-line
				requestObj = new XMLHttpRequest();
			} else {
				// eslint-disable-next-line
				requestObj = new ActiveXObject();
			}
		
			var sendData = '';
			if (type === 'POST' || type === 'DELETE' || type === 'PUT') {
				sendData = JSON.stringify(data);
			}
			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/json"); //application/x-www-form-urlencoded application/json; charset=utf-8
			requestObj.send(sendData);
			// 连接数据库
			requestObj.onreadystatechange = () => {
				if (requestObj.readyState === 4) {
					// HTTP 响应已经完全接收
					if (requestObj.status === 200) {
						// 请求成功
						var obj = requestObj.response;
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj);
					} else {
						var obj = requestObj.response;
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						reject(obj);
					}
				}
			};
		});
	}
}
