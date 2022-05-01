<template>
  <div class="dash-board">
    <el-row :gutter="10" class="content-row">
      <el-col :span="7">
        <Card title="分类商品数量(饼图)"
          ><PieEchart :pie-data="categoryGoodsCount"></PieEchart
        ></Card>
      </el-col>
      <el-col :span="10">
        <Card title="不同城市商品销量">
          <MapEchart :map-data="addressGoodsSale"></MapEchart>
        </Card>
      </el-col>
      <el-col :span="7"
        ><Card title="分类商品数量(玫瑰图)"
          ><RoseEchart :rose-data="categoryGoodsCount"></RoseEchart></Card
      ></el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12"
        ><Card title="分类商品的销量">
          <LineEchart v-bind="categoryGoodsSale"></LineEchart> </Card
      ></el-col>
      <el-col :span="12"
        ><Card title="分类商品的收藏">
          <BarEchart v-bind="categoryGoodsFavor"></BarEchart> </Card
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import PieEchart from '@/components/pageEcharts/src/PieEchart.vue'
import RoseEchart from '@/components/pageEcharts/src/RoseEchart.vue'
import LineEchart from '@/components/pageEcharts/src/LineEchart.vue'
import BarEchart from '@/components/pageEcharts/src/BarEchart.vue'
import MapEchart from '@/components/pageEcharts/src/MapEchart.vue'

import Card from '@/components/card/Card.vue'

export default defineComponent({
  components: { Card, PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    // 获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
