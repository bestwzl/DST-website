// 校验是否是json字符串
function isJsonString(str) {
  if (typeof str === "string") {
    try {
      const obj = JSON.parse(str);
      if (typeof obj === "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}

// 格式化时间
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

// 获取路由参数
export function getUrlParams() {
  let currentUrl = window.location.search.substr(1).split("&");
  let urlParams = {};
  currentUrl.map((item, index) => {
    let itemArr = item.split("=");
    urlParams[itemArr[0]] = itemArr[1];
  });
  return urlParams;
}

// 获取一个随机字符串
function getRandomKey() {
  const randomString = Math.random().toString(36).substring(2);
  return `${Date.now()}${randomString}`;
}

// 生成一个随机颜色
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 生成一个随机颜色，不要过深和过浅的颜色
function getRandomColor2() {
  const red = Math.random().toFixed(2) * 80 + 200;
  const green = Math.random().toFixed(2) * 80 + 150;
  const blue = Math.random().toFixed(2) * 150 + 120;
  return `rgb(${red}, ${green}, ${blue})`;
}

// 格式化 比特 数据格式
function formatFileSize(bytes, decimalPoint = 2) {
  if( null == bytes || bytes == '' || bytes == 0){
    return "0 Bytes";
  }
  const k = 1000;
  const  sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + " " + sizes[i]
  );
}

// 去除字符串中的空格
function removeStringSplice(str, type) {
  const sourceStr = str.toString() || "";
  let newString = sourceStr || "";
  if (type === "left") {
    newString = sourceStr.replace(/^\s*/, ""); // 左侧的
  } else if (type === "right") {
    newString = sourceStr.replace(/(\s*$)/g, ""); // 右侧的
  } else if (type === "leftRight") {
    newString = sourceStr.replace(/^\s*|\s*$/g, ""); // 两头的
  } else {
    newString = sourceStr.replace(/\s*/g, ""); // 全部的
  }
  return newString;
}

// 密码检验，新的密码规则
function validatePassword(rule, value, callback) {
  // 至少包含大写字母、小写字母、数字和特殊符号的3种
  // var regex = new RegExp('^(?![a-zA-Z]+$)   (?![A-Z0-9]+$)   (?![A-Z\W_!@#$%^&*`.~()-+=]+$)   (?![a-z0-9]+$)   (?![a-z\W_!@#$%^&*`.~()-+=]+$)   (?![0-9\W_!@#$%^&*`.~()-+=]+$)   [a-zA-Z0-9\W_!@#$%^&*`.~()-+=]{8,20}$')
  var regex = new RegExp(
    "^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-ZW_!@#$%^&*`.~()-+=]+$)(?![a-z0-9]+$)(?![a-zW_!@#$%^&*`.~()-+=]+$)(?![0-9W_!@#$%^&*`.~()-+=]+$)[a-zA-Z0-9W_!@#$%^&*`.~()-+=]{8,20}$"
  );

  if (value === null || value === undefined || value.length <= 0) {
    if (rule.required) {
      callback(new Error("请输入密码"));
    } else {
      callback();
    }
  } else if (String(value).trim()) {
    if (regex.test(String(value).trim())) {
      callback();
    } else {
      callback(new Error("格式不正确"));
    }
  }
}

// 校验文件路径： 只能包含: 数字、大小写字母、‘_’、‘%’、‘}’、‘{’、'/'。且只能以‘/’开始和结束；长度在2-200范围内
function validateFilePath(rule, value, callback) {
  // 只能包含字母和数字
  // const regex = new RegExp('^[A-Za-z0-9]+$')
  // 只能包含小写字母、数字、‘-’、‘_’, 且只能以字母或者数字作为开头和结尾。
  // const regex = new RegExp('(^[a-z0-9]$)|(^[a-z0-9]([a-z0-9_-]{0,48})[a-z0-9]$)');

  // 只能包含: 数字、大小写字母、‘_’、‘%’、‘}’、‘{’、'/'。且只能以‘/’开始和结束；长度在2-200范围内
  const regex = new RegExp("^[/]([a-zA-Z0-9._/{}%]{0,198})[/]$");

  if (value === null || value === undefined || value.length <= 0) {
    if (rule.required) {
      callback(new Error("请输入文件路径"));
    } else {
      callback();
    }
  } else if (String(value).trim()) {
    if (regex.test(String(value).trim())) {
      callback();
    } else {
      callback(new Error("输入的路径格式有误"));
    }
  }
}

// 校验文件用户名： 只能有 大小写英文字母数字和'_'
function validateFileUser(rule, value, callback) {
  // 只能包含字母和数字
  const regex = new RegExp("^[A-Za-z0-9_]+$");
  if (value === null || value === undefined || value.length <= 0) {
    if (rule.required) {
      callback(new Error("请输入用户名"));
    } else {
      callback();
    }
  } else if (String(value).trim()) {
    if (regex.test(String(value).trim())) {
      callback();
    } else {
      callback(new Error("输入的用户名不合规"));
    }
  }
}

// 校验手机号（中国11位手机号）
function validatePhone(rule, value, callback) {
  if (value === null || value === undefined) {
    if (rule.required) {
      callback(new Error("手机号不能为空"));
    } else {
      callback();
    }
  } else if (String(value).trim()) {
    if (/^1\d{10}$/.test(String(value).trim())) {
      // 0开头的10位数字
      callback();
    } else {
      callback(new Error("手机号格式不正确")); // 格式不正确
    }
  } else if (rule.required) {
    callback(new Error("手机号不能为空"));
  } else {
    callback();
  }
}


// 校验邮箱
function validateEmail(rule, value, callback) {
  if (value === null || value === undefined) {
    if (rule.required) {
      callback(new Error("邮箱不能为空"));
    } else {
      callback();
    }
  } else if (String(value).trim()) {
    if (/^(.{1,})@(.{1,})$/.test(String(value).trim())) {
      callback();
    } else {
      callback(new Error("邮箱格式不正确")); // 格式不正确
    }
  } else if (rule.required) {
    callback(new Error("邮箱不能为空"));
  } else {
    callback();
  }
}

// =============================== sessionStorage相关 ===================================
const prefix = "GCP_";
//添加 sessionStorage
export function setSessionItem(key, value) {
  const session = window.sessionStorage;
  if (session) {
    session.setItem(prefix + key, value);
  }
}
//获取 sessionStorage
export function getSessionItem(key) {
  return sessionStorage.getItem(prefix + key);
}

//删除 sessionStorage
export function removeSessionItem(key) {
  return sessionStorage.removeItem(prefix + key);
}



let commonUtils = {
  // 去除字符串中的空格
  removeStringSplice: function (str, type) {
    return removeStringSplice(str, type);
  },
  // 校验文件路径
  validateFilePath: function (rule, value, callback) {
    return validateFilePath(rule, value, callback);
  },
  // 校验文件用户
  validateFileUser: function (rule, value, callback) {
    return validateFileUser(rule, value, callback);
  },
  // 校验手机号
  validatePhone: function (rule, value, callback) {
    return validatePhone(rule, value, callback);
  },
  // 校验邮箱
  validateEmail: function (rule, value, callback) {
    return validateEmail(rule, value, callback);
  },
  getRandomKey: function () {
    return getRandomKey();
  },
  // 随机颜色
  getRandomColor: function () {
    // return getRandomColor();
    return getRandomColor2();
  },
  formatFileSize: function (bytes, decimalPoint) {
    return formatFileSize(bytes, decimalPoint);
  },
  parseTime: function (time, cFormat) {
    return parseTime(time, cFormat);
  },
  getUrlParams: function () {
    return getUrlParams();
  },
  setSessionItem: function (key, value) {
    return setSessionItem(key, value);
  },
  getSessionItem: function (key) {
    return getSessionItem(key);
  },
  removeSessionItem: function (key) {
    return removeSessionItem(key);
  },
};
export { commonUtils };
