// 编写好规则
export const phoneTules = {
  num: [
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
      message: '输入的手机号有误',
      trigger: 'blur'
    }
  ],
  primary: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{8,}$/,
      message: '请输入正确的验证码',
      trigger: 'blur'
    }
  ]
}
