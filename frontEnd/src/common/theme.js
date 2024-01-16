/**
 * 设置主题配置
 */

// 暗黑主题
const dark = {
  '--background-color': '#000000',
  '--background-color-2': '#111',
  '--border-color': '#666',
  '--font-color-1': '#fff',
  '--font-color-2': 'rgba(255, 255, 255, 0.7)',
  '--font-color-active': 'rgb(36, 104, 242)',
  '--el-bg-color': '#000',
  '--el-bg-hover-color': '#333',
  '--el-bg-active-color': '#222',
}

// 明亮主题
const light = {
  '--background-color': '#ffffff',
  '--background-color-2': '#fcfcfc',
  '--border-color': '#eee',
  '--font-color-1': '#000',
  '--font-color-2': 'rgba(0, 0, 0, 0.7)',
  '--font-color-active': 'rgb(36, 104, 242)',
  '--el-bg-color': '#fff',
  '--el-bg-hover-color': '#ccc',
  '--el-bg-active-color': '#eee',
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
