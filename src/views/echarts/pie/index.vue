<template>
  <div style="height: 100%">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('echarts.BasicPie')" name="BasicPie">
        <BasicPie v-if="activeName === 'BasicPie'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('echarts.DoughnutChart')" name="DoughnutChart">
        <DoughnutChart v-if="activeName === 'DoughnutChart'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('echarts.TexturePieChart')" name="TexturePieChart">
        <TexturePieChart v-if="activeName === 'TexturePieChart'"
      /></el-tab-pane>
      <el-tab-pane :label="$t('echarts.NightingaleChart')" name="NightingaleChart">
        <NightingaleChart v-if="activeName === 'NightingaleChart'"
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import DoughnutChart from '@/views/echarts/pie/DoughnutChart.vue'
import TexturePieChart from '@/views/echarts/pie/TexturePieChart.vue'
import NightingaleChart from '@/views/echarts/pie/NightingaleChart.vue'
import BasicPie from '@/views/echarts/pie/BasicPie.vue'
const activeName = ref('BasicPie')
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
