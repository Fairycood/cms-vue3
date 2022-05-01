<template>
  <div class="pie-echart">
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import BaseEchart from '@/components/baseEchart/src/BaseEchart.vue'
import { IDataType } from '@/network/type'

export default defineComponent({
  props: {
    pieData: {
      type: Array as PropType<IDataType[]>,
      require: true
    }
  },
  components: { BaseEchart },
  setup(props) {
    const options = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'left'
        },
        series: [
          {
            name: '分类数据',
            type: 'pie',
            radius: '50%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })
    return { options }
  }
})
</script>

<style scoped></style>
