<template>
  <div style="height: 100%">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('echarts.BasicBar')" name="BasicBar"><BasicBar /> </el-tab-pane>
      <el-tab-pane :label="$t('echarts.WaterfallChart')" name="WaterfallChart"><WaterfallChart /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import BasicBar from '@/views/echarts/bar/BasicBar.vue'
import WaterfallChart from '@/views/echarts/bar/WaterfallChart.vue'
const activeName = ref('BasicBar')
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
