import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { getSongUrl, getSongLyric } from '../api/playbar'

export const usePlayBarStore = defineStore('playBar', () => {
  const index = ref(0)
  const playlist = ref({})
  const songs = ref([
    {
      name: '以剑试情长',
      id: 1995162601,
      al: {
        id: 154328656,
        name: '以剑试情长',
        picUrl:
          'https://p1.music.126.net/fpZ1cNDThi1vmiaDMhFe5Q==/109951168027075034.jpg',
        tns: [],
        pic_str: '109951168027075034',
        pic: 109951168027075040,
      },
      ar: [
        {
          id: 54306262,
          name: '青龙捕快',
          tns: [],
          alias: [],
        },
        {
          id: 31512071,
          name: '镜予歌',
          tns: [],
          alias: [],
        },
      ],
    },
    {
      name: '桃花诺',
      id: 480579393,
      al: {
        id: 35689357,
        name: '上古情歌 电视剧原声带',
        picUrl:
          'https://p1.music.126.net/_v7ezNPQOEJ3aFir8MZmzQ==/19050138463061697.jpg',
        tns: [],
        pic_str: '19050138463061697',
        pic: 19050138463061696,
      },
      ar: [
        {
          id: 7763,
          name: 'G.E.M.邓紫棋',
          tns: [],
          alias: [],
        },
      ],
    },
  ])
  const isPlay = ref(false)

  const currentTime = ref(0)
  const duration = ref(0)
  const progress = computed(() => (currentTime.value / duration.value) * 100)
  const songDetailShow = ref(false)
  const url = ref('')
  const lyric = ref('')
  const currentSong = computed(() => songs.value[index.value])
  const isSliderDrag = ref(false)
  watch(
    currentSong,
    (newVal, oldVal) => {
      getSongUrl(newVal.id).then(res => {
        url.value = res.data.data[0].url
      })
      getSongLyric(newVal.id).then(res => {
        lyric.value = res.data.lrc.lyric
      })
    },
    { immediate: true }
  )

  return {
    index,
    playlist,
    songs,
    isPlay,
    currentSong,
    url,
    currentTime,
    duration,
    progress,
    songDetailShow,
    isSliderDrag,
    lyric,
  }
})
