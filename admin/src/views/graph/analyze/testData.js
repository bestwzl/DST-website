export const allAnalyzeList = [
  {
    label: 'pagerank',
    id: 'pagerank',
    disabled: false,
    formParams: [
      {
        field: 'delta',
        fieldLabel: 'delta',
        fieldValue: 0.25,
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'number', // 在表单中的组件 字符串：input, number, integer,  radio, checkbox，select, multipleSelect
          valueType: 'Number', // 字段值的类型
          min: 0, // 如果是数字类型，范围最小值
          max: 1, // 如果是数字类型，范围最大值
          selectOption: [], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          step: 0.05, // 如果是数字类型，点击加减号时的 跳跃步长 (小数类型默认0.1， 整数类型默认1)
          precision: 2, // 如果是number类型，保留的小数点位数 默认是2
          required: true, // 用于校验 是否必填
          placeholder: '', // 提示语
          tipMsg: '', // 用于校验时的错误提示
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
        }
      },
      {
        field: 'max_round',
        fieldLabel: 'max_round',
        fieldValue: 1,
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'integer', // 在表单中的组件 input, checkbox，select...
          valueType: 'Number', // 字段值的类型
          min: 1, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          selectOption: [], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: false, // 是否必填
          tipMsg: '不能为空', // 错误提示
          placeholder: '', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: 1, // 跳跃步长
        }
      },
      {
        field: 'order',
        fieldLabel: 'order',
        fieldValue: '',
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'select', // 在表单中的组件 input, checkbox，select...
          valueType: 'string', // 字段值的类型
          min: null, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          selectOption: [
            {label: 'desc', value: 'desc'},
            {label: 'asc', value: 'asc'},
          ], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: true, // 是否必填
          tipMsg: '请选择order', // 错误提示
          placeholder: '请选择order', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: null, // 跳跃步长
        }
      },
      {
        field: 'top_n',
        fieldLabel: 'top_n',
        fieldValue: 2,
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'integer', // 在表单中的组件 input, checkbox，select...
          valueType: 'Number', // 字段值的类型
          min: 1, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          selectOption: [], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: true, // 是否必填
          tipMsg: '不能为空', // 错误提示
          placeholder: '', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: 1, // 跳跃步长
        }
      },


      {
        field: '_radio',
        fieldLabel: '_radio',
        fieldValue: '',
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'radio', // 在表单中的组件 input, checkbox，select...
          valueType: 'string', // 字段值的类型
          min: null, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          selectOption: [
            {label: 'redio_111', value: 'redio_111'},
            {label: 'redio_222', value: 'redio_222'},
          ], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: true, // 是否必填
          tipMsg: '请选择radio', // 错误提示
          placeholder: '', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: null, // 跳跃步长
        }
      },

      {
        field: '_checkbox',
        fieldLabel: '_checkbox',
        fieldValue: [],
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'checkbox', // 在表单中的组件 input, checkbox，select...
          valueType: 'array', // 字段值的类型
          min: null, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          selectOption: [
            {label: 'checkbox_111', value: 'checkbox_111'},
            {label: 'checkbox_222', value: 'checkbox_222'},
          ], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: true, // 是否必填
          tipMsg: '请选择checkbox', // 错误提示
          placeholder: '', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: null, // 跳跃步长
        }
      },

      {
        field: '_desc',
        fieldLabel: '描述',
        fieldValue: '',
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'input', // 在表单中的组件 input, checkbox，select...
          valueType: 'string', // 字段值的类型
          min: null, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          selectOption: [], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: true, // 是否必填
          tipMsg: '请输入描述', // 错误提示
          placeholder: '', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: null, // 跳跃步长
        }
      },

    ]
  },
  {
    label: 'lpa',
    id: 'lpa',
    disabled: true,
    formParams: [
      {
        field: 'name',
        fieldLabel: '名字',
        fieldValue: '优妮',
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'input', // 在表单中的组件 input, checkbox，select...
          valueType: 'string', // 字段值的类型
          min: 0, // 如果是数字类型，范围最小值
          max: 1, // 如果是数字类型，范围最大值
          selectOption: [], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: true, // 是否必填
          tipMsg: '不能为空', // 错误提示
          placeholder: '', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: 0.1, // 跳跃步长
        }
      },
      {
        field: 'age',
        fieldLabel: '年龄',
        fieldValue: 17,
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'integer', // 在表单中的组件 input, checkbox，select...
          valueType: 'Number', // 字段值的类型
          min: 1, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          selectOption: [], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: false, // 是否必填
          tipMsg: '不能为空', // 错误提示
          placeholder: '请输入年龄', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: 1, // 跳跃步长
        }
      },
      {
        field: 'gender',
        fieldLabel: '性别',
        fieldValue: 'female',
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'radio', // 在表单中的组件 input, checkbox，select...
          valueType: 'string', // 字段值的类型
          min: null, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          selectOption: [
            {label: '男', value: 'male'},
            {label: '女', value: 'female'},
          ], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: true, // 是否必填
          tipMsg: '性别不能为空', // 错误提示
          placeholder: '请选择性别', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: null, // 跳跃步长
        }
      },
    ]
  },
  {
    label: 'hits',
    id: 'hits',
    disabled: false,
    formParams: [
      {
        field: 'jiqun',
        fieldLabel: '集群',
        fieldValue: '319',
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'radio', // 在表单中的组件 字符串：input, number, integer,  radio, checkbox，select, multipleSelect
          valueType: 'string', // 字段值的类型
          min: null, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          step: null, // 如果是数字类型，点击加减号时的 跳跃步长
          precision: 2, // 如果是number类型，保留的小数点位数
          selectOption: [
            {label: '319', value: '319'},
            {label: '419', value: '419'},
            {label: '183', value: '183'},
          ], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: true, // 用于校验 是否必填
          tipMsg: '集群不能为空', // 用于校验时的错误提示
          placeholder: '请选择集群', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
        }
      },
      {
        field: 'database',
        fieldLabel: '数据库',
        fieldValue: 'base_1',
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'select', // 在表单中的组件 input, checkbox，select...
          valueType: 'string', // 字段值的类型
          min: null, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          selectOption: [
            {label: 'base_1', value: 'base_1'},
            {label: 'base_2', value: 'base_2'},
            {label: 'base_3', value: 'base_3'},
            {label: 'base_4', value: 'base_4'},
            {label: 'base_5', value: 'base_5'},
          ], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: true, // 是否必填
          tipMsg: '数据库不能为空', // 错误提示
          placeholder: '请选择数据库', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: null, // 跳跃步长
        }
      },
      {
        field: 'table_name',
        fieldLabel: '表名称',
        fieldValue: '',
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'input', // 在表单中的组件 input, checkbox，select...
          valueType: 'string', // 字段值的类型
          min: 0, // 如果是数字类型，范围最小值
          max: 1, // 如果是数字类型，范围最大值
          selectOption: [], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: true, // 是否必填
          tipMsg: '不能为空', // 错误提示
          placeholder: '请输入表名称', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: 0.1, // 跳跃步长
        }
      },
      {
        field: 'field_total',
        fieldLabel: '字段总数量',
        fieldValue: 275,
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'integer', // 在表单中的组件 input, checkbox，select...
          valueType: 'Number', // 字段值的类型
          min: 1, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          selectOption: [], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: false, // 是否必填
          tipMsg: '不能为空', // 错误提示
          placeholder: '请输入字段总数量', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: 1, // 跳跃步长
        }
      },
      {
        field: 'status',
        fieldLabel: '是否启用',
        fieldValue: true,
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'radio', // 在表单中的组件 input, checkbox，select...
          valueType: 'string', // 字段值的类型
          min: null, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          selectOption: [
            {label: '启用', value: true},
            {label: '停用', value: false},
          ], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: true, // 是否必填
          tipMsg: '请选择启用状态', // 错误提示
          placeholder: '请选择状态', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: null, // 跳跃步长
        }
      },
    ]
  },
  {
    label: 'k_core',
    id: 'k_core',
    disabled: false,
    formParams: [
      {
        field: 'foods',
        fieldLabel: '喜欢的食物',
        fieldValue: ['1'],
        fieldTips: '', // 展示字段的解释说明
        formOption: {
          formItemType: 'checkbox', // 在表单中的组件 input, checkbox，select...
          valueType: 'array', // 字段值的类型
          min: null, // 如果是数字类型，范围最小值
          max: null, // 如果是数字类型，范围最大值
          selectOption: [
            {label: '牛肉堡', value: '1'},
            {label: '黄焖鸡', value: '2'},
            {label: '红烧肉', value: '3'},
            {label: '啤酒鸭', value: '4'},
            {label: '羊蝎子', value: '5'},
            {label: '小烧肉', value: '6'},
          ], // 如果是下拉框，单选框，复选框之类的 备选项的列表
          required: true, // 是否必填
          tipMsg: '就没有你喜欢的菜吗？', // 错误提示
          placeholder: '请选择喜欢的', // 提示语
          disabled: false, // 是否禁用
          regExp: '', // 自定义校验的正则表达式
          precision: 2, // 如果是number类型，保留的小数点位数
          step: null, // 跳跃步长
        }
      },
    ]
  }
]

