<template>
  <div class="playlist">
    <PlayListTop v-if="isLoading" :playlistDetail="state.playlistDetail"></PlayListTop>
    <PlayListBody :songs="state.songs" :playlistDetail="state.playlistDetail"></PlayListBody>
  </div>
</template>

<script setup>
import { getPlaylistDetail, getSongs } from '../api/playlist';
import { useRoute } from "vue-router";
import { ref, reactive } from 'vue';
import PlayListTop from "../components/playlist/PlayListTop.vue";
import PlayListBody from "../components/playlist/PlayListBody.vue";

const isLoading = ref(false)
const id = useRoute().query.id

const state = reactive({
  playlistDetail: {},
  songs: []
})

const playListInit = async () => {

  const { data: { playlist: playlistDetail } } = await getPlaylistDetail(id)
  state.playlistDetail = playlistDetail


  const { data: { songs: songs } } = await getSongs(id)

  state.songs = songs
  isLoading.value = true
}
playListInit()
</script>

<style lang="scss" scoped></style>