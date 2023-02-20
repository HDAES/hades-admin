<template>
  <Icon name="SearchOutlined" @click="dialogVisible = true" />

  <el-dialog v-model="dialogVisible" title="搜索" width="30%">
    <el-input class="w-full h-10 rounded-3xl text-center" v-model="input" placeholder="Please input" />

    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const dialogVisible = ref(false)
const input = ref('')
</script>

<style lang="scss" scoped></style>
