// 共享表单校验模块
// 通过 env.js 挂载到 $mod.checkValue，供 input 系组件与 form 聚合校验使用。
//
// checkValue({ val, required, type, validate, opts, files, nativeTarget, $t })
//   val:          当前值
//   required:     是否必填
//   type:         输入类型（checkbox/switch/file 有特殊规则）
//   validate:     RegExp | regex 字符串 | (val) => true | 错误消息
//   opts:         类型附加配置（主要判断 options 是否存在）
//   files:        type=file 时的内部文件列表 [{status}]
//   nativeTarget: 原生表单元素（同步 setCustomValidity / 读取 validity）
//   $t:           i18n 翻译函数
// 返回 { valid: boolean, msg: string }

export function checkValue({ val, required, type, validate, opts, files, nativeTarget, $t }) {
  let valid = true
  let msg = ''

  // 1. Required 校验（最高优先级）
  if (required) {
    if (val === '' || val === null || val === undefined) {
      valid = false
    } else if (Array.isArray(val) && val.length === 0) {
      valid = false
    } else if ((type === 'checkbox' || type === 'switch') && !opts?.options && val === false) {
      valid = false
    }

    if (!valid) {
      if (type === 'file' && files?.some(f => f.status === 'pending' || f.status === 'uploading')) {
        msg = $t('input.validate.filePending')
      } else if (type === 'checkbox' && opts?.options) {
        msg = $t('input.validate.requiredSelect')
      } else {
        msg = $t('input.validate.required')
      }
    }
  }
  // 2. 自定义校验（函数 / RegExp / 字符串正则）
  else if (validate) {
    if (typeof validate === 'function') {
      const res = validate(val)
      if (res !== true) {
        valid = false
        msg = res || $t('input.validate.invalid')
      }
    } else {
      const regex = validate instanceof RegExp ? validate : new RegExp(validate)
      if (!regex.test(val)) {
        valid = false
        msg = $t('input.validate.format')
      }
    }
  }
  // 3. 原生校验兜底
  else if (nativeTarget?.validity && !nativeTarget.validity.valid) {
    valid = false
    msg = nativeTarget.validationMessage
  }

  // 4. 文件状态校验
  if (type === 'file' && valid && files) {
    if (files.some(f => f.status === 'uploading')) {
      valid = false
      msg = $t('input.validate.fileUploading')
    } else if (files.some(f => f.status === 'pending')) {
      valid = false
      msg = $t('input.validate.filePending')
    } else if (files.some(f => f.status === 'error')) {
      valid = false
      msg = $t('input.validate.fileError')
    }
  }

  // 5. 同步原生 customValidity，保证 form submit 时浏览器原生提示一致
  if (nativeTarget?.setCustomValidity) {
    nativeTarget.setCustomValidity(valid ? '' : msg)
  }

  return { valid, msg }
}
