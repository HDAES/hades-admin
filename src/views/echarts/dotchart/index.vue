<template>
  <div style="height: 100%">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('echarts.BasicScatterChart')" name="BasicScatterChart"
        ><BasicScatterChart v-if="activeName === 'BasicScatterChart'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('echarts.AnscombQuartet')" name="AnscombQuartet"
        ><AnscombQuartet v-if="activeName === 'AnscombQuartet'"
      /></el-tab-pane>
      <el-tab-pane :label="$t('echarts.AggregateScatterToBar')" name="AggregateScatterToBar">
        <AggregateScatterToBar v-if="activeName === 'AggregateScatterToBar'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import BasicScatterChart from '@/views/echarts/dotchart/BasicScatterChart.vue'
import AnscombQuartet from '@/views/echarts/dotchart/AnscombQuartet.vue'
import AggregateScatterToBar from '@/views/echarts/dotchart/AggregateScatterToBar.vue'
const activeName = ref('BasicScatterChart')
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
