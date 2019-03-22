
/**
 * 数字格式化金钱展示
 * @param {*} num 串数字
 * @returns
 */
function numFormat(num) {
	if (typeof (num) != 'number') {
	  num = Number(num)
	}
	num = num.toFixed(2);
	num = parseFloat(num);
	num = num.toLocaleString();
	var floatPart = '.00' // 预定义小数部分
	var numArry = num.split('.')
	// =2表示数据有小数位
	if (numArry.length === 2) {
	  floatPart = numArry[1].toString() // 拿到小数部分
	  if (floatPart.length === 1) { // 补0,实际上用不着
	    return numArry[0] + '.' + floatPart + '0'
	  } else {
	    return numArry[0] + '.' + floatPart
	  }
	} else {
	  return num + floatPart
	}
}

/**
 *
 * 金钱格式化数字
 * @param {*} 传字符串或者数字
 * @returns
 */
function number(value) {
	if (typeof (value) == 'number') {
	  return value
	} else {
	  if (value.indexOf(',') != -1) {
	    return Number(value)
	  } else {
	    return Number(value.replace(',', ''))
	  }
	}
}
// 解析时间格式
function formatTime(secondNum) {
	var day = Math.floor(secondNum / (60 * 60 * 24)), // 倒计时天数
	    hour = Math.floor(secondNum / (60 * 60)) - (day * 24), //倒计时小时
	    minute = Math.floor(secondNum / 60) - (day * 24 * 60) - (hour * 60), //倒计时分钟
	    second = Math.floor(secondNum) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60); //倒计时秒钟
	if (hour <= 9) hour = '0' + hour;
	if (minute <= 9) minute = '0' + minute;
	if (second <= 9) second = '0' + second;
	return hour + ":" + minute + ":" + second
}

// 解析url地址参数
function getUrlParam(name) {
		if(!name) {
			var data = decodeURI(window.location.search.substr(1)).split("&");
			var obj = {};
			data.forEach(item => {
				let key = item.split("=")[0];
				let val = item.split("=")[1];
				obj[key] = val;
			});
			return obj;
		}
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
};

	// url参数格式化
	function urlParamFormat(params) {
		let arr = [];
		for(let i in params) {
			arr.push(`${i}=${params[i]}`)
		}
		return arr.join("&");
	}

	// 获取userId
	sessionStorage.userId = getUrlParam('userId') ? getUrlParam('userId') : sessionStorage.userId;
	const USER_ID = sessionStorage.userId;