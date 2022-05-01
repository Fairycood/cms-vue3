<template>
  <div class="menu">
    <div class="table">
      <PageTable
        btn-title="新建菜单"
        :tableConfig="menuTableConfig"
        page-name="menu"
        ref="pageTableRef"
      ></PageTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { menuTableConfig } from './config/menuTableConfig'
import PageTable from '@/components/pageTable/src/PageTable.vue'

export default defineComponent({
  components: { PageTable },
  setup() {
    return {
      menuTableConfig
    }
  }
})
</script>

<style scoped>
.table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
