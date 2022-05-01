<template>
  <div class="rose-echart">
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import BaseEchart from '@/components/baseEchart/src/BaseEchart.vue'
import { IDataType } from './type'

export default defineComponent({
  props: {
    roseData: {
      type: Array as PropType<IDataType[]>,
      require: true
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        // legend: {
        //   top: 'bottom'
        // },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '类别数据',
            type: 'pie',
            radius: [4, 80],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.roseData
          }
        ]
      }
    })
    return { options }
  },
  components: { BaseEchart }
})
</script>

<style scoped></style>
