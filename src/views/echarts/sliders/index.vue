<template>
  <div style="height: 100%">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('echarts.BasicCandlestick')" name="BasicCandlestick"><BasicCandlestick /> </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import BasicCandlestick from '@/views/echarts/sliders/BasicCandlestick.vue'
const activeName = ref('BasicCandlestick')
</script>
<style lang="scss" scoped>
:deep(.el-tabs) {
  display: flex;
  height: 100%;
  flex-direction: column;

  .el-tabs__content {
    flex: 1;

    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
