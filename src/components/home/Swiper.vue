<template>
  <div class="swiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banners">
        <img :src="item.pic" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps(['banners'])
</script>

<style lang="scss" scoped>
.swiper {
  padding: .1rem 0;
}

img {
  padding: 0 .1rem;

  width: 100%;
  border-radius: 0.2rem;
}
</style>