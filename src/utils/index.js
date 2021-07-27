// 排除value为0的情况
export const isFalsy = (value) => value === 0 ? false : !value

export const cleanObject = (obj) => {
  const result = { ...obj }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}