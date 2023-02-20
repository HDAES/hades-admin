<template>
  <el-popover placement="bottom-start" :width="200" trigger="click">
    <template #reference>
      <div class="relative w-6 h-6">
        <Icon name="ChatLineRound" />
      </div>
    </template>
    <el-radio-group v-model="radio">
      <el-radio :label="3">Option A</el-radio>
      <el-radio :label="6">Option B</el-radio>
      <el-radio :label="9">Option C</el-radio>
    </el-radio-group>
  </el-popover>
</template>
<script lang="ts" setup>
const radio = ref(3)
</script>
