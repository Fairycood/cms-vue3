import { IForm } from '@/components/form/src/type'

export const departmentModalConfig: IForm = {
  labelWidth: '100px',
  itemStyle: {
    padding: '0px 10px 0px 10px'
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称'
    },
    {
      field: 'leader',
      type: 'input',
      label: '部门领导',
      placeholder: '请输入部门领导'
    }
  ],
  colLayout: { span: 24 }
}
