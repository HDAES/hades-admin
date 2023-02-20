<template>
  <div style="height: 100%">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('echarts.LineGradient')" name="LineGradient">
        <LineGradient v-if="activeName === 'LineGradient'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('echarts.LineRace')" name="LineRace">
        <LineRace v-if="activeName === 'LineRace'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('echarts.DynamicData')" name="DynamicData">
        <DynamicData v-if="activeName === 'DynamicData'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import LineGradient from '@/views/echarts/line/LineGradient.vue'
import LineRace from '@/views/echarts/line/LineRace.vue'
import DynamicData from '@/views/echarts/line/DynamicData.vue'
const activeName = ref('LineGradient')
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
