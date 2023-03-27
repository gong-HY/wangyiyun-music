<template>
  <div class="icon-list">
    <div class="tuijian">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_xindong"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="FM">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_diantai"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="playlist">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_tingyinle"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="top">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_paihang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.icon-list {
  padding: .3rem 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      width: .7rem;
      height: .7rem;
    }

    span {
      margin-top: .1rem;
    }
  }
}
</style>