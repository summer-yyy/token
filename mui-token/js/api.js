let apiUrl = 'http://47.244.9.84:8080/api/v1';
// let apiUrl = '/api/v1';
// let apiUrl2 = 'https://transfer.swft.pro/api/v1';
// let apiUrl2 = 'http://47.244.9.84:8080/api/v1/swft';
let apiUrl2 = apiUrl + '/swft';
// 永续基金
let buyFund = apiUrl + '/fund/buyFund',
	fundDetail = apiUrl + '/fund/fundDetail/',
	fundWeek = apiUrl + '/fund/fundWeek',
	fundMonth = apiUrl + '/fund/fundMonth',
	fundIndex = apiUrl + '/fund/fundIndex',
	fundStatus = apiUrl + '/fund/fundStatus/'
// OTC userId = 10119
let addBank = apiUrl + '/otc/addBank', // 添加到账银行卡
	buyShop = apiUrl + '/otc/buyShop', // 买币商家列表 /{pageNum}/{pageSize}
	buyerBank = apiUrl + '/otc/buyerBank', // 到账银行卡列表
	cancelTrade = apiUrl + '/otc/cancelTrade/', // 用户取消订单{id}
	confirmPayment = apiUrl + '/otc/confirmPayment/', // 用户确认付款{id}
	myRecords = apiUrl + '/otc/myRecords', // 用户买卖币记录
	oneKeyBuy = apiUrl + '/otc/oneKeyBuy', // 买卖币提交订单
	orderDetails = apiUrl + '/otc/orderDetails', // 订单详情
	sellShop = apiUrl + '/otc/sellShop/' // 卖币商家列表 /{pageNum}/{pageSize}
	
// 我的店铺
let confirmAgree = apiUrl + '/shop/confirmAgree/', // 店铺确认同意{id}
	confirmRefuse = apiUrl + '/shop/confirmRefuse/', // 店铺确认拒绝{id}
	payWayList = apiUrl + '/shop/payWayList/', // 查询收款方式{userId}
	shopInfo = apiUrl + '/shop/shopInfo/', // 查询货币管理{userId}/{status}
	updateAmount = apiUrl + '/shop/updateAmount', // 修改货币数量
	updatePayWay = apiUrl + '/shop/updatePayWay', // 添加修改收款方式
	updatePrice = apiUrl + '/shop/updatePrice', // 修改货币单价
	userBuyRecord = apiUrl + '/shop/userBuyRecord/' // 店铺-用户交易记录

// 一键兑换
let queryCoinList = apiUrl2 + '/queryCoinList', // 查询币种列
getBaseInfo = apiUrl2 + '/getBaseInfo', // 获取兑换汇率基本信息接口
coinList = apiUrl2 + '/coinList', // 查询平台支持币种列
accountExchange = apiUrl2 + '/accountExchange', // 创建订单
queryOrderState = apiUrl2 + '/queryOrderState'; // 查询订单状态