<template>
  <div class="body" v-if="songs.length > 0">
    <div class="hd">
      <div class="left" @click="bofang(0)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang5"></use>
        </svg>
        播放全部
        <span>(共{{ songs.length }}首)</span>
      </div>

    </div>
    <div class="bd">
      <van-list v-model:loading="loading" :finished="finished" :disabled="true">
        <van-cell v-for="item, index in songs" :key="index">
          <div class="song" @click="bofang(index)">
            <div class="left">
              <span id="index">{{ index + 1 }}</span>
              <div class="info">
                <p id="title">{{ item.name }}</p>
                <span id="singer" v-for="singer in item.ar">{{ singer.name }}</span>
              </div>
            </div>
            <div class="right">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qita"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-if="item.mv">
                <use xlink:href="#icon-yinlequan"></use>
              </svg>

            </div>
          </div>
        </van-cell>
      </van-list>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePlayBarStore } from '../../stores/playBar';
const playBar = usePlayBarStore()


const props = defineProps(['songs'])
const loading = ref(false)
const finished = ref(true)


const bofang = (i) => {
  // 加入判断，防止出现空指针错误
  playBar.songs = props.songs
  playBar.index = i
  playBar.isPlay = true
}


</script>

<style lang="scss" scoped>
.body {
  .hd {
    margin-top: -0.2rem;
    background-color: #fff;
    border-radius: .33rem .33rem 0 0;
    padding: .18rem .1rem .2rem .1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      font-weight: 800;
      font-size: .37rem;

      span {
        font-weight: 400;
        font-size: .3rem;
      }

    }

  }

  .bd {
    padding-bottom: 1.3rem;

    .song {

      text-align: left;
      color: #000;
      display: flex;
      justify-content: space-between;

      .left {
        width: 70%;
        display: flex;
        align-items: center;

        #index {
          width: 11%;
          color: #959595;
          font-size: .31rem;
        }

        .info {
          width: 4rem;
          padding-left: .08rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          #title {
            font-weight: 650;
            font-size: .34rem;
            padding-bottom: .13rem;
          }

          #singer {


            padding-right: .1rem;
            font-size: .26rem;
            color: #959595;
          }
        }
      }

      .right {
        width: 30%;
        display: flex;
        flex-direction: row-reverse;


        .icon {
          transform: scale(0.93);
          margin-left: .2rem;
        }
      }
    }
  }



}
</style>