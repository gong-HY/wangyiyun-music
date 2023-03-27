<template>
  <div class="nav">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-qita"></use>
    </svg>

    <span @click="$router.push('/user')" ref="nav1">我的</span>
    <span class="active" ref="nav2" @click="$router.push('/home')">发现</span>
    <span ref="nav3">云村</span>
    <span ref="nav4">视频</span>

    <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
      <use xlink:href="#icon-sousuo"></use>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['active'])
const nav1 = ref(null)
const nav2 = ref(null)
onMounted(() => {
  if (props.active == 1) {
    nav2.value.classList.remove('active')
    nav1.value.classList.add('active')
  }

})
</script>

<style lang="scss" scoped>
.nav {
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: .4rem;

    &.active {
      font-weight: 800;
    }
  }

  .icon {
    width: 10%;
    height: .7rem;
  }
}
</style>