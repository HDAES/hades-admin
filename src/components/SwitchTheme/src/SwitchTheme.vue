<template>
  <el-color-picker
    v-model="color"
    show-alpha
    :predefine="predefineColors"
    @change="handleThemeChange"
  />
</template>

<script lang="ts" setup>
import { getOpacityColor } from '@/utils'

const color = ref('#409EFF')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
])

const handleThemeChange = (color: string) => {
  const el = document.documentElement
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)
  el.style.setProperty(`--el-color-primary`, color)
  for (let i = 3; i < 10; i++) {
    el.style.setProperty(`--el-color-primary-light-${i}`, getOpacityColor(color, 1 - i / 10))
  }
}
</script>
