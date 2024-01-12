/**
 * 设置主题配置
 */

// 暗黑主题
const dark = {
  '--background-color': '#000000',
  '--background-hover-color': '#333',
  '--background-active-color': '#666',
  '--input-background-color': '#111',
  '--border-color': '#666',
  '--theme-color-1': '#222',
  '--theme-color-2': '#333',
  '--theme-color-3': '#444',
  '--font-color-1': '#fff',
  '--font-color-2': '#ddd',
  '--font-color-3': '#bbb',
  '--font-color-4': '#999',
  '--font-color-active': 'rgb(36, 104, 242)',
  '--main-header-bg-color': 'linear-gradient(90deg, #070303, #1c0064)',
  '--box-shadow-bottom': '0 4px 6px 0 rgb(65 159 248 / 33%), 0 1px 10px 0 rgb(225 240 82 / 5%), 0 2px 4px -1px rgb(101 244 234 / 34%)',
  '--box-shadow-right': '4px 4px 6px 0 rgb(65 159 248 / 33%), 1px 1px 10px 0 rgb(225 240 82 / 5%), 1px 2px 4px -1px rgb(101 244 234 / 34%)',
}

// 明亮主题
const light = {
  '--background-color': '#ffffff',
  '--background-hover-color': '#eee',
  '--background-active-color': '#ddd',
  '--input-background-color': '#ffffff',
  '--border-color': '#eee',
  '--theme-color-1': '#eee',
  '--theme-color-2': '#ddd',
  '--theme-color-3': '#ccc',
  '--font-color-1': '#000',
  '--font-color-2': '#333',
  '--font-color-3': '#666',
  '--font-color-4': '#999',
  '--font-color-active': 'rgb(36, 104, 242)',
  '--main-header-bg-color': 'linear-gradient(90deg, #fefefe, #fff)',
  '--box-shadow-bottom': '0 4px 6px 0 rgba(8, 14, 26, 0.04), 0 1px 10px 0 rgba(8, 14, 26, 0.05), 0 2px 4px -1px rgba(8, 14, 26, 0.06)',
  '--box-shadow-right': '4px 4px 6px 0 rgba(8, 14, 26, 0.04), 1px 1px 10px 0 rgba(8, 14, 26, 0.05), 1px 2px 4px -1px rgba(8, 14, 26, 0.06)',
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
