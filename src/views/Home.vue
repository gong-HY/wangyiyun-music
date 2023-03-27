<template>
  <div class="home">
    <Header></Header>
    <Swiper :banners="state.banners"></Swiper>
    <IconList></IconList>
    <Personalized :personalized="state.personalized"></Personalized>

  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { getBanner, getPersonalized, getTopList } from '../api/home';
import Swiper from '../components/home/Swiper.vue';
import IconList from '../components/home/IconList.vue';
import Personalized from '../components/home/Personalized.vue';
import Header from '../components/home/Header.vue';




const state = reactive({
  banners: [],
  personalized: [],
  topList: []
})
const homeInit = async () => {
  const { data: { banners: banners } } = await getBanner()

  state.banners = banners

  const { data: { result: personalized } } = await getPersonalized()
  state.personalized = personalized

  const { data: { list: topList } } = await getTopList()
  console.log(topList);
  state.topList = topList
}
homeInit()
</script>

<style lang="scss" scoped>
.home {
  padding: .2rem;
}
</style>