<template>
  <v-chart ref="chartRef" autoresize :option="option" />
</template>

<script lang="ts" setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { CandlestickChart } from 'echarts/charts'
import VChart from 'vue-echarts'
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
use([CanvasRenderer, CandlestickChart, GridComponent, TitleComponent, TooltipComponent, LegendComponent])
const option = {
  xAxis: {
    data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
  },
  yAxis: {},
  series: [
    {
      type: 'candlestick',
      data: [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42]
      ]
    }
  ]
}
</script>
