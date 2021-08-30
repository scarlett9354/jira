import { Select } from "antd";
import React from "react";
import { Raw } from "types";

// Select身上自带的所有属性类型
type SelectProps = React.ComponentProps<typeof Select>
// 继承时新定义的类型与母类型可能会有冲突，需要借助Omit
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined
  onChange: (value?: number) => void // 不管value传什么值，当onChange时，我们把值向外传时，会把所有的值都转化成number，这样使select的行为前后一致，更容易预测
  defaultOptionName?: string // 默认值/空值
  options?: { name: string, id: number }[]
}

/**
 * value 可以传入多种类型的值
 * onChange 只会回调 number|undefined类型
 * 当 isNaN(Number(value)) 为true时，代表选择默认类型
 * 当选择默认类型时，onChange会回调undefined
 * @param props 
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props
  return <Select
    value={options?.length ? Number(value) : 0}
    // 非0时表示选择了有效项，是0时表示选择了默认项，返回undefined
    onChange={value => onChange(toNumber(value) || undefined)}
    {...restProps}
  >
    {
      defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
    }
    {
      options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
    }
  </Select>
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)