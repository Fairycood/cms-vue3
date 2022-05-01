import { IForm } from '@/components/form/src/type'

export const roleModalConfig: IForm = {
  labelWidth: '100px',
  itemStyle: {
    padding: '0px 10px 0px 10px'
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  colLayout: { span: 24 }
}
