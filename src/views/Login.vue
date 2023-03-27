<template>
  <div class="login">
    <div class="top">
      <svg class="icon" aria-hidden="true" @click="$router.push('/home')">
        <use xlink:href="#icon-xitongfanhui1"></use>
      </svg>
      <p>二维码登录</p>
    </div>
    <div class="QR-code">
      <img ref="QRcode" :src="src" alt="">
    </div>

  </div>
</template>

<script setup>
import { generateQrKey, createQrCode, checkQrStatus } from "../api/login";
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const src = ref('')
const user = useUserStore()

const QRcode = ref(null)
const router = useRouter()

onMounted(() => {

  generateQrKey().then(res => {
    // 生成二维码
    createQrCode(res.data.unikey).then(res => {
      src.value = res.data.qrimg
    })

    // 检查二维码状态
    let checkQr = () => {
      checkQrStatus(res.data.unikey).then(res => {
        console.log(res)
        // 803 代表已经扫码
        if (res.code == 803) {
          user.cookie = res.cookie
          clearInterval(check)
          router.push('/user')
        }

      })
    }
    // 每隔一秒检查一次
    const check = setInterval(checkQr, 1000)

  })

})

</script>

<style lang="scss" scoped>
.login {
  padding: 0.2rem;
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    align-items: center;


    .icon {
      transform: scale(0.77);
    }

    p {
      font-size: .48rem;
      color: #000;
      margin-left: .23rem;
    }
  }

  .QR-code {
    margin-top: .5rem;

    img {
      width: 100%;
    }
  }


}
</style>