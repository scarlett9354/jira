import { Rate } from "antd";
import React from "react";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void // 之所以把这个方法定为可选类型，是因为比如在title上是纯展示的，并不会用到它
}

export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  // const { checked, onCheckedChange, ...restProps } = props
  return <Rate
    count={1}
    value={checked ? 1 : 0}
    onChange={num => onCheckedChange?.(!!num)} // 如果onCheckedChange是undefined，就不能调用，所以需要?.；!!num相当于Boolean(num)
    {...restProps}
  />
}