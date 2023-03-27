<template>
  <div class="user">
    <Header :active="1"></Header>

  </div>
</template>

<script setup>
import { getUserAccount, getUserLevel } from "../api/user";
import Header from "../components/home/Header.vue";
const userInit = () => {
  getUserAccount().then(res => {
    console.log(res)
  })
  getUserLevel().then(res => {
    console.log(res)
  })
}
userInit()
</script>

<style lang="scss" scoped>
.user {
  padding: .2rem;
}
</style>