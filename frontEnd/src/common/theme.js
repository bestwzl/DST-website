/**
 * 设置主题配置
 */

// 暗黑主题
const dark = {
  '--background-color': '#000000',
  '--border-color': '#666',
  '--font-color-1': '#fff',
  '--font-color-active': 'rgb(36, 104, 242)',
}

// 明亮主题
const light = {
  '--background-color': '#ffffff',
  '--border-color': '#eee',
  '--font-color-1': '#000',
  '--font-color-active': 'rgb(36, 104, 242)',
}

// 将颜色添加到 :root 中
export default function setSysTheme(threme) {
  if (threme === 'light') {
    for (const i in light) {
      document.documentElement.style.setProperty(i, light[i])
    }
  } else {
    for (const i in dark) {
      document.documentElement.style.setProperty(i, dark[i])
    }
  }
}
