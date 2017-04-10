export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time) {
  //方法返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数。
  const getTime = new Date(time)
  const between = (new Date() - getTime) / 1000
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute ago')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour ago')
  } else if (between < 2592000) {
    return pluralize(~~(between / 86400), ' day ago')
  } else {
    return getTime.getFullYear() + "-" + (getTime.getMonth() + 1) + "-" + getTime.getDate()
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}