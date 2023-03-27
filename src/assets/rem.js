const remSize = () => {
  let deviceWidth = window.innerWidth || document.documentElement.clientWidth

  if (deviceWidth > 750) {
    deviceWidth = 750
  }

  if (deviceWidth < 375) {
    deviceWidth = 375
  }
  const fontSize = (deviceWidth / 750) * 100 // 设计稿宽度为 750px，1rem = 25px
  document.documentElement.style.fontSize = `${fontSize}px`
}

remSize() // 页面加载时设置字体大小
window.addEventListener('resize', remSize) // 监听窗口大小变化，动态设置字体大小
