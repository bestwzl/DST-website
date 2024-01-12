
function BizEnum(enums) {
	this.enums = enums;
}

// 获取列表
BizEnum.prototype.getList = function () {
	return this.enums;
}

// 根据code拿汉字
BizEnum.prototype.getLabel = function (value) {
	for (let key in this.enums) {
		if (this.enums[key].value == value) {
			return this.enums[key].Label;
		}
	}
	return '';
}

// 根据汉字拿code
BizEnum.prototype.getValue = function (label) {
	for (let key in this.enums) {
		if (this.enums[key].label == label) {
			return this.enums[key].Value;
		}
	}
	return '';
}

export default {

	// 性别
	GENDER: new BizEnum([
		{value: '1', label: '女'},
		{value: '2', label: '男'}
	]),

	// 角色
	ROLE: new BizEnum([
		{value: '1', label: '超级管理员'},
		{value: '2', label: '管理员'},
		{value: '3', label: '用户'},
	]),

	// 账号状态
	STATUS: new BizEnum([
		{value: '1', label: '正常'},
		{value: '2', label: '停用'},
		{value: '3', label: '使用中'},
	]),

	//常用正则
	REG: {
		tel   : /^1[3456789]\d{9}$/,   // 手机号码
		ein   : /^[0-9A-Z]{18}$/,      // 税号
		hukou : /^[a-zA-Z0-9]{3,21}$/, // 户口本
		phone : /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,  // 联系电话（包括手机、座机）
		idCard  : /(^\d{15}$)|(^\d{17}([0-9]|X)$)/, // 身份证号简单校验
		bankNum : /^\d{12,30}$/, // 银行账号
		realName  : /(^[\u4E00-\u9FA5]{2,8}$)|(^[0-9a-zA-Z]{2,18}$)/, // 姓名
		password  : /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/, // 密码：6到18位字母数字组合
		loginName : /^[0-9a-zA-Z]{3,20}$/, // 注册账号
		twoDecimal  : /(^[0-9]{1,20}$)|(^[0-9]{1,20}[.][0-9]{1,2}$)/, // 2位小数
		materialBarcode  : /^[A-Za-z0-9]+$/, // 商品条码
		positiveInteger  : /^[1-9]\d*$/, // 正整数
		birthCertificate : /^[a-zA-Z0-9]{5,21}$/, // 出生证
		socialCreditCode : /^[0-9a-zA-Z]{18}$/, // 社会信用代码
		nonnegativeInteger : /^\d+$/, // 非负整数
	},

	DEFAULTPASSWORD: '12345678', // 默认初始密码

}
