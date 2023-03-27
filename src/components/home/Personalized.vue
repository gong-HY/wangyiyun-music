<template>
  <div class="personalized">
    <div class="hd">
      <span id="title">发现好歌单</span>
      <span id="more">查看更多</span>
    </div>
    <div class="bd">
      <van-swipe :loop="false" :width="160" :show-indicators="false">
        <van-swipe-item v-for="item in personalized" :key="item.id">
          <router-link :to="{ path: '/playlist', query: { id: item.id } }">
            <img :src="item.picUrl" alt="">
            <span id="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang-white-copy"></use>
              </svg>
              {{ numFormat(item.playCount) }}
            </span>
            <p id="name">{{ item.name }}</p>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup>
import { numFormat } from "../../utils/format";
const props = defineProps(['personalized'])
</script>

<style lang="scss" scoped>
.personalized {
  .hd {
    padding: .3rem 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    #title {
      font-size: .4rem;
      font-weight: 800;
    }

    #more {
      padding: .1rem .2rem;
      border: 1px solid #ccc;
      border-radius: .4rem;
    }

  }

  .bd {
    #name {
      font-size: .3rem;
      margin-top: .2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    img {

      width: 2.73rem;
      max-width: 88%;
      border-radius: .4rem;
      box-shadow: 0 0 7px 3px rgba(0, 0, 0, 0.2);
    }

    #playCount {

      position: absolute;
      top: 0;
      right: .5rem;
      color: #fff;
      display: flex;
      align-items: center;

      .icon {
        width: 0.4rem;
        height: 0.4rem;
        vertical-align: middle;
        margin-right: .06rem;
      }
    }
  }
}
</style>