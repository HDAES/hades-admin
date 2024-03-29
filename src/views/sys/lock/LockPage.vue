<template>
  <div class="lock">
    <div class="lock-unlock" @click="hanldeOpen">
      <LockOutlined v-show="showDate" />
      <span v-show="showDate">{{ $t('sys.lock.clickUnlock') }}</span>
    </div>

    <div class="time">
      <FlipClock style="margin-top: 20px" />

      <transition name="fade-slide">
        <div class="lock-enter" v-show="!showDate">
          <img class="avatar enter-x" src="@/assets/images/avatar.jpg" alt="avatar" />
          <div class="name enter-x">{{ nickName }}</div>
          <el-input
            ref="inputRef"
            v-model="psw"
            class="enter-x"
            style="width: 250px"
            :placeholder="$t('sys.lock.inputPlaceholder')"
            show-password
          />
          <div class="btn enter-x">
            <el-button :text="true" size="small" @click="handleShowForm(true)">{{ $t('sys.lock.back') }}</el-button>
            <el-button :text="true" size="small" @click="handleBackLogin">{{ $t('sys.lock.backSignIn') }}</el-button>
            <el-button :text="true" size="small" @click="handleEnter">{{ $t('sys.lock.enterSystem') }}</el-button>
          </div>
        </div>
      </transition>
    </div>

    <div class="date-time">
      <div class="dtime enter-x" v-show="!showDate">{{ hour }}:{{ minute }} {{ meridiem }}</div>
      <div class="date enter-y">{{ year }}/{{ month }}/{{ day }} 星期{{ week }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { LockOutlined } from '@ant-design/icons-vue'
import { FlipClock } from '@/components/Flip/index'
import { userHooks } from '@/hooks/user/index'
import { useLockStore } from '@/store/modules/lock'
import { encryptByMd5 } from '@/utils/crypto'
import { useNow } from './useNow'
import { ElMessage } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
const { year, month, day, hour, minute, week, meridiem } = useNow(true)
const { loginOut, clearLockInfo, nickName } = userHooks()
const { t } = useI18n()
const useLock = useLockStore()
const inputRef = ref()
const showDate = ref(true)
const psw = ref('')

const handleShowForm = value => (showDate.value = value)
const handleEnter = () => {
  if (!useLock.unLock(encryptByMd5(psw.value))) {
    ElMessage({
      message: t('sys.lock.errorMsg'),
      type: 'warning'
    })
  }
}
const handleBackLogin = () => {
  loginOut().then(() => {
    location.href = '/login'
    clearLockInfo()
  })
}

const hanldeOpen = () => {
  showDate.value = false
  inputRef.value.focus()
}
onMounted(() => {
  document.onkeydown = function (e) {
    if (e.keyCode == 13) {
      showDate.value ? hanldeOpen() : handleEnter()
    }
  }
})
onUnmounted(() => {
  document.onkeydown = null
})
</script>

<style lang="scss" scoped>
.lock {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  padding: 20px 100px;
  color: #fff;
  background-color: #000;

  .lock-unlock {
    display: flex;
    height: 45px;
    font-size: 18px;
    cursor: pointer;
    align-items: center;
    flex-direction: column;
  }

  .time {
    position: relative;
    top: 50px;
    display: flex;
    height: 80vh;
    justify-content: center;

    .lock-enter {
      position: absolute;
      z-index: 3;
      display: flex;
      width: 100%;
      height: 80vh;
      background-color: #00000080;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(8px);

      .avatar {
        width: 50px;
        border-radius: 50%;
      }

      .name {
        margin: 5px 0;
        color: #bababa;
      }

      .btn {
        display: flex;
        width: 250px;
        margin-top: 5px;
        justify-content: space-between;
      }
    }
  }

  .date-time {
    position: relative;
    top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 88px;
    text-align: center;

    .data {
      margin-bottom: 10px;
      font-size: 24px;
      text-align: center;
    }

    .dtime {
      font-size: 36px;
      text-align: center;
    }
  }
}
</style>
