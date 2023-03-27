<template>
  <div class="search">
    <div class="search-top">
      <svg class="icon" aria-hidden="true" @click="$router.back()">
        <use xlink:href="#icon-xitongfanhui1"></use>
      </svg>
      <input v-model.trim="searchTerm" @keyup.enter="searchSongs" placeholder="周杰伦" />
    </div>
    <div class="search-history">
      <span id="title">历史</span>
      <div class="key">
        <span class="search-key" @click="keyWordSearch(item)" v-for="item, index in searchHistorySet" :key="index">{{ item
        }}</span>
      </div>
      <svg class="icon" aria-hidden="true" @click="searchHistory = []">
        <use xlink:href="#icon-lajixiang"></use>
      </svg>
    </div>
    <div class="search-results">
      <SongList :songs="searchResults"></SongList>
    </div>
  </div>
</template>

<script setup>
import { search } from "../api/search";
import { ref, computed } from 'vue';
import SongList from "../components/common/SongList.vue";

// #region 搜索相关变量
const searchTerm = ref('');
const searchHistory = ref([])
const searchResults = ref([]);
// #endregion

// #region 对搜索历史进行权重比较
function sortByFrequency(arr) {
  // 计算每个元素的出现次数
  let frequencyMap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  // 去除重复元素
  let uniqueArr = [...new Set(arr)];

  // 按照出现次数对数组元素进行排序
  return uniqueArr.sort((a, b) => {
    // 先比较出现次数，再比较原始顺序
    return frequencyMap[b] - frequencyMap[a] || arr.indexOf(a) - arr.indexOf(b);
  });
}
const searchHistorySet = computed(() => sortByFrequency(searchHistory.value))
// #endregion

// #region 搜索函数
const searchSongs = () => {
  if (searchTerm.value == '') return
  searchHistory.value.push(searchTerm.value)
  // 在此处执行歌曲搜索，例如发起 API 请求
  search(searchTerm.value).then((res) => {
    console.log(res.data.result.songs);
    searchResults.value = res.data.result.songs
  })
};
const keyWordSearch = (key) => {
  searchTerm.value = key
  searchSongs()
}
// #endregion


</script>

<style lang="scss" scoped>
.search {
  padding: .1rem 0;
  display: flex;
  flex-direction: column;
}

.search-top {
  padding: 0 .3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon {
    width: .5rem;
    height: .5rem;
  }

  input {

    width: 90%;
    font-size: .38rem;
    padding: .2rem .1rem;
    border: 0;
    border-bottom: 2px solid #8c8c8caf;

  }


}


.search-history {
  padding: .3rem .12rem;
  display: flex;


  font-size: 0.4rem;

  #title {
    margin-top: .15rem;
    font-weight: bolder;
  }

  .key {
    padding-left: .2rem;
    width: 78%;

    .search-key {
      display: inline-block;
      white-space: nowrap;
      font-size: .34rem;
      padding: .08rem .2rem;
      background-color: rgb(214, 214, 214);
      border-radius: .4rem;
      margin: .1rem .1rem;
    }
  }

  .icon {
    margin-top: .15rem;
    width: .57rem;
    height: .57rem;
  }

}


.search-results {
  margin-top: 20px;
  width: 100%;

  ul {
    padding: 0;
    list-style-type: none;

    li {
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }
  }


}
</style>
