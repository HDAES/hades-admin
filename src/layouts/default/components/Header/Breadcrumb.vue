<template>
  <div v-if="isBreadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>{{ matched[0].name }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ matched[1].name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { useSetting } from '@/hooks/setting'

const { isBreadcrumb } = useSetting()

const route = useRoute()
const matched = ref<any[]>(route.matched)

watchEffect(() => (matched.value = route.matched))
</script>
