<template>
  <div class="music-detail">
    <!-- 歌曲封面图 -->
    <img :src="song.al.picUrl" alt="">
    <div class="top">
      <div class="left">
        <!-- 返回上一页的按钮 -->
        <svg class="icon" aria-hidden="true" @click="back">
          <use xlink:href="#icon-fanhui1-copy"></use>
        </svg>

        <div class="info">
          <!-- 歌曲名称 -->
          <van-notice-bar scrollable color="#ffffff" background="transparent" speed="30"> {{ song.name }}</van-notice-bar>

          <div class="singer">
            <!-- 歌手名称，支持多位歌手 -->
            <span v-for="singer in song.ar">{{ singer.name + ' ' }} </span>

            <!-- 前进到下一页的按钮 -->
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-qianjin-white-copy"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 分享按钮 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang1-white-copy"></use>
        </svg>
      </div>
    </div>

    <!-- 歌曲封面和播放指针的区域 -->
    <div class="center" v-show="!isLyricShow" @click="isLyricShow = true">
      <img src="../../assets/needle-ab.png" alt="" id="zhen" ref="zhen">
      <img :src="song.al.picUrl" alt="" id="al" ref="alPic">
      <img src="../../assets/al.png" alt="" id="al-side">
    </div>

    <!-- 歌词显示区域 -->
    <div ref="lrc" class="lyric" v-show="isLyricShow" @click="isLyricShow = false">
      <p ref="lrcList" v-for="item in lyricArr">
        {{ item.lrc }}
      </p>
    </div>

    <!-- 底部控制栏 -->
    <div class="footer">
      <div class="icon-list">
        <!-- 收藏按钮 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xihuan-e6e6e6-copy"></use>
        </svg>
        <!-- 下载按钮 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai2-e6e6e6-copy"></use>
        </svg>
        <!-- 发现按钮 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-faxian-e6e6e6"></use>
        </svg>
        <!-- 评论按钮 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinlun-e6e6e6-copy"></use>
        </svg>
        <!-- 循环播放按钮 -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan-e6e6e6-copy"></use>
        </svg>
      </div>
      <div class="progress">
        <!-- 进度条 -->
        <van-slider v-model="currentTime" :max="duration" @change="sliderChange" @drag-start="isSliderDrag = true"
          @drag-end="isSliderDrag = false" button-size="0.27rem" />
      </div>
      <div class="control">
        <!-- 上一首按钮 -->
        <svg class="icon" aria-hidden="true" @click="index == 0 ? index = 9 : index -= 1">
          <use xlink:href="#icon-shangyishou-e6e6e6-copy"></use>
        </svg>
        <!-- 播放按钮 -->
        <svg class="icon con" aria-hidden="true" v-if="!isPlay" @click="play">
          <use xlink:href="#icon-bofang-e6e6e6-copy"></use>
        </svg>
        <!-- 暂停按钮 -->
        <svg class="icon con" aria-hidden="true" v-else @click="pause">
          <use xlink:href="#icon-zanting-e6e6e6-copy"></use>
        </svg>
        <!-- 下一首按钮 -->
        <svg class="icon" aria-hidden="true" @click="index == 9 ? index = 0 : index += 1">
          <use xlink:href="#icon-xiayishou-e6e6e6-copy"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'; // 引入pinia中的storeToRefs方法
import { watch, ref, computed } from 'vue'; // 引入vue3中的watch, ref, computed方法
import { usePlayBarStore } from "../../stores/playBar"; // 引入播放栏状态管理的vuex store

// 定义可响应式的属性
const emit = defineEmits(['slider-change', 'emit-play', 'emit-pause']) // 定义事件
const props = defineProps(['song']) // 定义props
const { index, currentTime, duration, isSliderDrag, songDetailShow, isPlay, lyric } = storeToRefs(usePlayBarStore()) // 引入vuex store中的状态并将其转化为可响应式的

// 计算属性
const lyricArr = computed(() => lyric.value.split('\n').filter((item, i) => item != '').map((item, i) => {
  let min = parseInt(item.slice(1, 3))
  let sec = parseInt(item.slice(4, 6))
  let mill = parseInt(item.slice(7, 9))
  let time = min * 60 + sec + mill * 0.01
  let lrc = item.split(']')[1]
  return { time, min, sec, mill, lrc }
}))

// 定义ref属性
const isLyricShow = ref(false) // 是否展示歌词
const alPic = ref(null) // 歌曲封面图
const zhen = ref(null) // 唱针

// 定义方法
const sliderChange = (value) => {
  emit('slider-change', value) // 触发事件
}

const play = () => {
  emit('emit-play') // 触发事件
}

const pause = () => {
  emit('emit-pause') // 触发事件
}

const back = () => {
  isLyricShow.value = false // 收起歌词
  songDetailShow.value = false // 隐藏歌曲详情
}

const lrc = ref(null) // 歌词容器
const lrcList = ref([]) // 歌词列表

// watch监听
watch(isPlay, (newVal) => {
  if (newVal) { // 播放时旋转封面图
    alPic.value.style.animationPlayState = "running"
    zhen.value.style.transform = 'rotate(8deg)'
  } else { // 暂停时停止封面图旋转
    alPic.value.style.animationPlayState = "paused"
    zhen.value.style.transform = 'rotate(-14deg)'
  }
})

watch(currentTime, (newVal) => {
  lyricArr.value.some((item, i) => {
    if (newVal - item.time <= 0.3 && newVal - item.time >= 0) {
      lrcList.value.forEach(item => item.classList.remove('active')) // 将上一个高亮歌词的样式去除
      lrcList.value[i].classList.add('active') // 高亮当前歌词
      let rootFontSize = parseInt(getComputedStyle(document.documentElement).fontSize);
      if (lrcList.value[i].offsetTop >= 6.2 * rootFontSize) { // 当高亮的歌词已经超出了歌词容器的scrollTop，让歌词容器向上滚动一行
        lrc.value.scrollTop = lrcList.value[i].offsetTop - 6.2 * rootFontSize
      }
      return true
    }
    return false
  })
})
</script>

<style lang="scss" scoped>
.music-detail {

  overflow: hidden;
  position: relative;
  height: 100%;
  padding: .2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  >img {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 98%;
    filter: blur(70px) brightness(70%);
  }

  .top {
    padding: .2rem .3rem;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .info {
        margin-left: .25rem;
        display: flex;
        flex-direction: column;

        .singer {
          width: 3.8rem;
          overflow: hidden;
          text-overflow: ellipsis;

          span {
            padding-left: .05rem;
            white-space: nowrap;

          }
        }

        .van-notice-bar {
          padding: 0;
          height: .4rem;
          font-size: .35rem;

          .van-notice-bar {
            margin-left: -0.2rem;
            width: 1.2rem;
          }
        }


        .singer {
          display: flex;
          align-items: center;

          span {
            font-size: .28rem;
            color: #ffffff;
          }

          .icon {
            width: .4rem;
            height: .4rem;
          }
        }

      }
    }
  }

  .center {

    width: 100%;
    height: 4rem;
    position: relative;


    display: grid;
    place-items: center;


    img {
      width: 4rem;
      height: 4rem;
    }

    #zhen {
      position: absolute;
      z-index: 3;
      width: 2rem;
      height: 3rem;
      top: -2.2rem;
      right: 1rem;
      transform-origin: .33rem .4rem;
      transform: rotate(-14deg);
      transition: 0.4s;


    }

    #al {
      border-radius: 50%;
      position: absolute;
      z-index: 1;
      animation: rotate 8s linear infinite;
      animation-play-state: paused;
    }

    #al-side {
      position: absolute;
      width: 6rem;
      height: 6rem;
      z-index: 2;

    }

  }

  .lyric {
    height: 10.5rem;
    padding: .3rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    p {
      font-size: .3rem;
      white-space: nowrap;
      color: #dfdfdf;
      margin: .27rem 0;

      &.active {
        font-weight: 630;
        color: #fff;
        font-size: .39rem;
      }


    }
  }


  .footer {

    display: flex;
    flex-direction: column;

    .icon-list {
      padding: 0 .5rem;
      display: flex;
      justify-content: space-between;


    }

    .progress {

      padding: .6rem .2rem;
    }

    .control {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: -.3rem;

      .icon {
        width: .8rem;
        height: .8rem;

        &.con {
          margin: 0 .6rem;
          width: 1.1rem;
          height: 1.1rem;

        }
      }
    }
  }
}


@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>