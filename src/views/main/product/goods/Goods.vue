<template>
  <div class="goods">
    <div class="table">
      <PageTable
        :tableConfig="goodsTableConfig"
        page-name="goods"
        ref="pageTableRef"
      >
        <template #image="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
            :z-index="100"
            fit="cover"
          >
          </el-image>
        </template>

        <template #oldPrice="scope">
          {{ '¥' + scope.row.oldPrice }}
        </template>

        <template #newPrice="scope">
          {{ '¥' + scope.row.newPrice }}
        </template>
      </PageTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { goodsTableConfig } from './config/goodsTableConfig'
import PageTable from '@/components/pageTable/src/PageTable.vue'

export default defineComponent({
  components: { PageTable },
  setup() {
    return {
      goodsTableConfig
    }
  }
})
</script>

<style scoped lang="less">
.table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;

  .el-image {
    z-index: 100;
  }
}
</style>
