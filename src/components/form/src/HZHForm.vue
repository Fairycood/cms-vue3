<template>
  <div class="hzh-form">
    <el-form :label-width="labelWidth">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <el-row>
        <template v-for="item in formItems" :key="item.field">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :modelValue="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                </el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :modelValue="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :modelValue="modelValue[`${item.field}`]"
                    @update:modelValue="handleValueChange($event, item.field)"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from './type'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      require: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    //label宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    //el-form-item的样式
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    //el-form-item响应式布局的规则
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 12,
        xs: 24
      })
    }
  },
  setup(props, { emit }) {
    // const formData = ref({ ...props.modelValue })
    // watch(
    //   formData,
    //   (newValue) => {
    //     console.log(newValue)
    //     emit('update:modelValue', newValue)
    //   },
    //   { deep: true }
    // )
    //将输入框输入的新数据返回给父组件page-search
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return {
      // formData,
      handleValueChange
    }
  }
})
</script>

<style scoped>
.hzh-form {
  padding-top: 22px;
}
</style>
