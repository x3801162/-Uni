// 反时间 {day: 18 hour: 10 minute: 59 mmmmyydd: "2024-07-18" month: "07" second: 17 time: "2024-07-18 10:59:17" year: 2024}
export function timeExChange() {

  // 获取时间
  var date = new Date();
  //年 getFullYear()：四位数字返回年份
  var year = date.getFullYear(); //getFullYear()代替getYear()
  //月 getMonth()：0 ~ 11
  var month = date.getMonth() + 1;
  //日 getDate()：(1 ~ 31)
  var day = date.getDate();
  var next = date.getDate();
  next = next + 1
  //时 getHours()：(0 ~ 23)
  var hour = date.getHours();
  //分 getMinutes()： (0 ~ 59)
  var minute = date.getMinutes() - 0;


  //秒 getSeconds()：(0 ~ 59)
  var second = date.getSeconds();
  if (month < 10) {
    month = `0${month}`
  }
  if (day < 10) {
    day = `0${day}`
  }
  if (next < 10) {
    next = `0${next}`
  }

  if (minute < 10) {
    minute = `0${minute}`
  }

  var time = year + '-' + month + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(
    second);
  var mmmmyydd = year + '-' + month + '-' + day


  var nextday = year + '-' + month + '-' + next

  let GMT = {
    year,
    month,
    day,
    hour,
    minute,
    second,
    time,
    mmmmyydd,
    nextday
  }
  return GMT
}

export function addZero(s) {
  return s < 10 ? ('0' + s) : s;
}


// 反时间戳或者yyyy-mm-dd反星期几
export function getDayOfWeek(input) {
  const date = typeof input === 'string' ? new Date(input) : new Date(input * 1000);
  const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const dayOfWeek = date.getDay();

  return daysOfWeek[dayOfWeek];
}

// yyyy-mm-dd+1 日期加一
export function getNextDay(dateString, daysToAdd) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + daysToAdd);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// 时间差
export function timeDifference(da1, da2) {
  // 时间差
  var date1 = new Date(da1);
  var date2 = new Date(da2);
  var Difference_In_Time = date2.getTime() - date1.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Difference_In_Days
}

// 将时间戳转换为 JavaScript Date 对象 yyyy-dd-mm hh:mm:ss
export function timestampToDate(timestamp, type) {

  const date = new Date(timestamp * 1000);

  // 创建一个对象来存储月份的名称
  const monthNames = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];

  // 获取年、月、日、小时、分钟和秒数
  // 如果当天日期大于17.30分，则从第二天开始

  const year = date.getFullYear();
  var month = monthNames[date.getMonth()];
  var day = date.getDate();

  if (day <= 10) {
    day = '0' + day
  }

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  if (minutes <= 10) {
    minutes = '0' + minutes
  }
  if (seconds <= 10) {
    seconds = '0' + seconds
  }

  if (hours >= 17 && minutes >= 30) {
    day = day + 1
  }

  if (type == 'mmmmyyddhhmmss') {
    // 使用字符串插值创建日期字符串
    var dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  if (type == 'mmmmyydd') {
    // 使用字符串插值创建日期字符串
    var dateString = `${year}-${month}-${day}`;
  }

  // 返回日期字符串
  return dateString;
}

export function getImage_url(image_url) {
  const base_url = 'https://cd-1314234533.cos.ap-chengdu.myqcloud.com'
  if (image_url) {
    image_url = image_url.split(",");
    image_url = image_url.map(v => base_url + v)
    return image_url
  } else {
    return ''
  }

}

export function reg(tel) {
  // 正则
  let regRule = /^(?:(?:\+86)?1[3-9]\d{9}|0\d{2,3}-?\d{7,8})$/;
  let flag = regRule.test(tel);
  return flag
}

export function getLogin() {
  const is_force = wx.getStorageSync('is_force')



  var turn = wx.getStorageSync('turn')
  const is_examine = wx.getStorageSync('is_examine')

  if (!is_examine) {
    if (wx.getStorageSync('Yuyue')) {
      turn = false
    }
    if (!wx.getStorageSync('token') && turn) {

      wx.navigateTo({
        url: `/pages/login/choose/index`,
      })
      wx.setStorageSync('turn', false)

      return false
    }
  }

  return true


}

export function goYuyue(item, navigate) {
  const turn = wx.getStorageSync('turn')
  wx.setStorageSync('Yuyue', true)
  if (wx.getStorageSync('token')) {
    wx.navigateTo({
      url: navigate
    })
    return true
  }
  if (!turn) {
    // 如果没有turn标记，跳转到登录页面
    wx.navigateTo({
      url: `/pages/login/choose/index?navigate=${encodeURIComponent(navigate)}`,
    })
    wx.setStorageSync('turn', true)
    return false
  } else {
    // 如果有turn标记，直接跳转到预约页面

    wx.navigateTo({
      url: navigate
    })
    return true
  }
}


export function getPublic(that) {
  // 公用颜色、是否审核、就诊时间
  if (wx.getStorageSync('visit_time')) {
    const visit_time = wx.getStorageSync('visit_time')
    const is_examine = wx.getStorageSync('is_examine')
    const color = wx.getStorageSync('color')
    that.setData({
      visit_time,
      is_examine,
      color
    })
  }
}

export function getVisitTime() {
  let visit_time = wx.getStorageSync('visit_time')


  // 获取当前时间
  const now = new Date();
  const currentTimestamp = now.getTime();

  // 将 visit_time.end_time 加上当天日期并转换为时间戳
  let endTimeTimestamp = null;
  if (visit_time && visit_time.end_time) {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const fullDateTime = `${year}-${month}-${day} ${visit_time.end_time}`;
    endTimeTimestamp = new Date(fullDateTime).getTime();
  }

  // currentTimestamp 当前时间戳
  // endTimeTimestamp 结束时间戳

  // 检查当前时间是否超过结束时间
  const isAfterEndTime = endTimeTimestamp ? currentTimestamp > endTimeTimestamp : false;
  return {
    isAfterEndTime
  }
}


export default {
  timeExChange,
  addZero,
  getDayOfWeek,
  getNextDay,
  timestampToDate,
  timeDifference,
  getImage_url,
  reg,
  getLogin,
  goYuyue,
  getPublic,
  getVisitTime,
  // 其他方法...
};


