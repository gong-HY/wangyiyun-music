<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transitionName || ''" mode="out-in">
      <keep-alive :include="['Home', 'Search', 'Login']">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

  <PlayBar />
</template>

<script setup>
import PlayBar from './components/PlayBar.vue';

</script>

<style lang="scss" scoped>
.bottom-rising-enter-from {
  transform: translateY(100%);
}

.bottom-rising-enter-to {
  transform: translateY(0%);
}

.bottom-rising-enter-active {
  transition: transform 0.5s ease-out;
}



.top-bottom-enter-from {
  transform: translateY(-100%);
}

.top-bottom-enter-to {
  transform: translateY(0%);
}

.top-bottom-enter-active {
  transition: transform 1s ease-out;
}

.rightToLeft-enter-from {
  transform: translateX(100%);
}

.rightToLeft-enter-to {
  transform: translateX(0%);
}

.rightToLeft-enter-active {
  transition: transform 0.3s ease-out;
}
</style>