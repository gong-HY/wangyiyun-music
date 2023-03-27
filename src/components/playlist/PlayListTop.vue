<template>
  <div class="top">
    <img :src="playlistDetail.creator.backgroundUrl" alt="">
    <div class="header">
      <svg class="icon" aria-hidden="true" @click="$router.back()">
        <use xlink:href="#icon-fanhui1-white"></use>
      </svg>
      <span id="title">歌单</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo-white"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-qita-white"></use>
      </svg>

    </div>
    <div class="detail">
      <img :src="playlistDetail.coverImgUrl" alt="">
      <div class="info">
        <p id="name">{{ playlistDetail.name }}</p>
        <p id="author">
          <van-image round width=".6rem" height=".6rem" :src="playlistDetail.creator.avatarUrl" />
          {{ playlistDetail.creator.nickname }}
        </p>
        <p id="desc">{{ playlistDetail.description }}</p>
      </div>
    </div>
    <div class="icon-list">
      <div class="pinlun">
        <svg class="icon" aria-hidden="true" @click="$router.back()">
          <use xlink:href="#icon-pinlun-white"></use>
        </svg>
        <span id="pinlun">{{ playlistDetail.commentCount }}</span>
      </div>

      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang1-white-copy"></use>
        </svg>
        <span id="shareCount">{{ playlistDetail.shareCount }}</span>
      </div>
      <div class="xaizai">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-white-copy"></use>
        </svg>
        <span id="xaizai">下载</span>
      </div>

      <div class="duoxuan">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xuanze-duoxuan-white"></use>
        </svg>
        <span id="duoxuan">多选</span>
      </div>


    </div>
  </div>
</template>

<script setup>
const props = defineProps(['playlistDetail'])
</script>

<style lang="scss" scoped>
.top {
  padding-bottom: .4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  position: relative;


  >img {

    position: absolute;
    z-index: -1;
    width: 100%;
    filter: brightness(80%) blur(8px);
  }

  .header {
    padding: 0 .1rem;

    height: 1.2rem;
    display: grid;
    grid-template-columns: 1.4fr 6fr 1.2fr 1fr;
    align-items: center;

    #title {
      font-size: .45rem;
    }




  }

  .detail {
    padding: .5rem .2rem;
    display: flex;
    justify-content: space-between;


    img {
      width: 40%;
      border-radius: 10px;
      box-shadow: 0px 10px 6px rgba(0, 0, 0, 0.2);
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 55%;

      #name {
        font-weight: 700;
        font-size: .33rem;
      }

      #author {
        display: flex;
        align-items: center;
      }

      #desc {
        color: #e1e1e1;
        font-size: .27rem;
        height: 1rem;
        overflow: scroll;
      }
    }
  }

  .icon-list {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: column;
      width: 25%;
      align-items: center;

      span {
        margin-top: .1rem;
      }
    }
  }
}
</style>