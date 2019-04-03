
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
    if (!name) {
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
    for (let i in params) {
        arr.push(`${i}=${params[i]}`)
    }
    return arr.join("&");
}

// 获取userId
sessionStorage.userId = getUrlParam('userId') ? getUrlParam('userId') : sessionStorage.userId;
const USER_ID = sessionStorage.userId;

var floatObj = function () {

    /*
     * 判断obj是否为一个整数
     */
    function isInteger(obj) {
        return Math.floor(obj) === obj
    }

    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    function toInteger(floatNum) {
        var ret = { times: 1, num: 0 }
        var isNegative = floatNum < 0
        if (isInteger(floatNum)) {
            ret.num = floatNum
            return ret
        }
        var strfi = floatNum + ''
        var dotPos = strfi.indexOf('.')
        var len = strfi.substr(dotPos + 1).length
        var times = Math.pow(10, len)
        var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10)
        ret.times = times
        if (isNegative) {
            intNum = -intNum
        }
        ret.num = intNum
        return ret
    }

    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    function operation(a, b, digits, op) {
        var o1 = toInteger(a)
        var o2 = toInteger(b)
        var n1 = o1.num
        var n2 = o2.num
        var t1 = o1.times
        var t2 = o2.times
        var max = t1 > t2 ? t1 : t2
        var result = null
        switch (op) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2)
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2
                }
                return result / max
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2)
                } else {
                    result = n1 * (t2 / t1) - n2
                }
                return result / max
            case 'multiply':
                result = (n1 * n2) / (t1 * t2)
                return result
            case 'divide':
                result = (n1 / n2) * (t2 / t1)
                return result
        }
    }

    // 加减乘除的四个接口
    function add(a, b, digits) {
        return operation(a, b, digits, 'add')
    }
    function subtract(a, b, digits) {
        return operation(a, b, digits, 'subtract')
    }
    function multiply(a, b, digits) {
        return operation(a, b, digits, 'multiply')
    }
    function divide(a, b, digits) {
        return operation(a, b, digits, 'divide')
    }

    // exports
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    }
}();

function initBridge() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
        function setupWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
        }

        //native调用js
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.registerHandler('userAttestation', function (data, responseCallback) {
                // alert('JS方法被调用:' + data);
                responseCallback('js执行过了');
            })
        })



        //js调用native
        function userAttestation(id) {
            WebViewJavascriptBridge.callHandler('userAttestation', "{\"id\" : " + id + "}", function (response) {
                // alert('native被调用:' + response);
                // document.getElementById("returnValue").value = response;
            });
        }
    }
    else if (isAndroid) {
        function connectWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady'
                    , function () {
                        callback(WebViewJavascriptBridge)
                    },
                    false
                );
            }
        }

        connectWebViewJavascriptBridge(function (bridge) {
            bridge.init(function (message, responseCallback) {
                console.log('JS got a message', message);
                var data = {
                    'Javascript Responds': '测试中文!'
                };

                if (responseCallback) {
                    console.log('JS responding with', data);
                    responseCallback(data);
                }
            });

            bridge.registerHandler("userAttestation", function (data, responseCallback) {
                // alert("data from Java: = " + data);
                if (responseCallback) {
                    var responseData = "Javascript Says Right back aka!";
                    responseCallback(responseData);
                }
            });
        })
        function userAttestation(id) {
            window.WebViewJavascriptBridge.callHandler('userAttestation', "{\"id\" : " + id + "}", function (response) {
                // alert('native被调用:' + response);
                // document.getElementById("returnValue").value = response;
            });
        }
    }
    return userAttestation;
}
let userAttestation = initBridge();

// 数字正则 包含小数
function checkNumber(n) {
    var filter = /^([1-9]\d*|0)(\.\d{1,2})?$/;
    return filter.test(n)
}

// 限制位数
function limitStr(str, n) {
    str = String(str);
    if (str.length > n) {
        return str.substr(0, n);
    } else {
        return str;
    }
}