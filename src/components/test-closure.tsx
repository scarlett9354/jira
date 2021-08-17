import React, { useEffect, useState } from "react";

export const Test = () => {
  const [num, setNum] = useState(0)
  const add = () => setNum(num + 1)

  useEffect(() => {
    const id = setInterval(() => {
      console.log('num in setInterval:', num);
    }, 1000)
    return () => clearInterval(id)
  }, [num])

  useEffect(() => {
    return () => {
      console.log(num);
    }
  }, [num])

  return <div>
    <button onClick={add}>add</button>
    <p>number:{num}</p>
  </div>
}