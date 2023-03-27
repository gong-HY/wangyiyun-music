<template>
  <audio ref="audio" :src="url" @canplay="playHandle" @timeupdate="onTimeUpdate" @ended="audioEnd"></audio>
  <div class="playBar">
    <van-slider v-model="currentTime" :max="duration" @change="sliderChange" @drag-start="isSliderDrag = true"
      @drag-end="isSliderDrag = false" />
    <van-swipe :show-indicators="false" @change="swipeChange" ref="swiper" lazy-render>
      <van-swipe-item v-for="song in songs" :key="song.id">
        <div class="left" @click="songDetailShow = true">
          <van-image round width="1rem" height="1rem" :src="song.al.picUrl" />

          <div class="info">
            <p id="name">{{ song.name }}</p>
            <span id="tip">横滑切换上下首哦</span>
          </div>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true" v-show="isPlay" @click="pause">
            <use xlink:href="#icon-zanting14-red-copy"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-show="!isPlay" @click="play">
            <use xlink:href="#icon-yinpinbofang-red-copy"></use>
          </svg>

          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-playlistMusic-red-copy"></use>
          </svg>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
  <van-popup v-model:show="songDetailShow" position="bottom" :style="{ height: '100%', width: '100%' }">
    <MusicDetail :song="currentSong" @slider-change="sliderChange" @emit-play="play" @emit-pause="pause" />
  </van-popup>
</template>

<script setup>
import MusicDetail from './playBar/MusicDetail.vue'
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { usePlayBarStore } from '../stores/playBar';
const { index, isPlay, currentSong, url, songs, currentTime, duration, songDetailShow, isSliderDrag } = storeToRefs(usePlayBarStore())

const audio = ref(null)
const swiper = ref(null)

const play = () => {
  audio.value.play()
  isPlay.value = true

}
const pause = () => {
  audio.value.pause()
  isPlay.value = false
}

const playHandle = () => {
  isPlay.value ? play() : pause()
  duration.value = audio.value.duration
}

const swipeChange = (i) => {
  index.value = i
}

const onTimeUpdate = () => {
  if (!isSliderDrag.value) currentTime.value = audio.value.currentTime
}
const audioEnd = () => {
  index.value++
}


const sliderChange = (value) => {
  audio.value.currentTime = value
}

watch(index, (newVal) => {
  swiper.value.swipeTo(newVal)
})


</script>

<style lang="scss" scoped>
.playBar {
  position: fixed;

  bottom: -2px;
  width: 100%;
  height: 1.33rem;
  background-color: #fff;

  .van-swipe {
    height: 100%;

    .van-swipe-item {
      padding: 0 .13rem;
      display: flex;
      justify-content: space-between;
      align-items: center;


      .left {
        display: flex;
        align-items: center;

        .info {

          padding-left: .2rem;

          #name {
            width: 4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: .36rem;
            font-weight: 600;
            padding-bottom: .05rem;
          }

          #tip {
            color: #606060;
          }
        }
      }

      .right {
        display: flex;
        align-items: center;

        .icon {
          margin-right: .13rem;
        }
      }
    }

  }
}
</style>