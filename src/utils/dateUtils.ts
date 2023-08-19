/**
 * 格式化时间
 * @param time 需要转换的时间
 * @param fmt 需要转换的格式，如：yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export const formatTime = (time: any, fmt: string) => {
  if (!time) return ''
  const date = new Date(time)
  const obj: any = {
    'M+': date.getMonth() + 1, // 月份 返回的是 0~11   即 1 到 12 月之间的整数
    'd+': date.getDate(), // 返回 1~31之间的整数
    'H+': date.getHours(), // 返回的是对象的小时 0~23
    'm+': date.getMinutes(), // 返回的是对象的分钟 0~59
    's+': date.getSeconds(), // 返回的是秒 0~59
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    's': date.getMilliseconds(), // 毫秒 0~999
  }

  // 处理年份
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))

  // 遍历obj对象
  for (const k in obj) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[k]) : ((
        '00' + obj[k]).substr(('' + obj[k]).length)))
    }
  }

  return fmt
}


/**
 * 计算天数
 * @param time
 */
export const calculateDays = (time: any) => {
  if (!time) return ''
  else {
    let day = Math.floor(new Date().getTime() / 1000) - (new Date(time).getTime() / 1000)
    let day2 = Math.floor(day / (24 * 3600))
    return day2
  }
}
