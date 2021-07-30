import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";

export const RegisterScreen = () => {
  const { register, user } = useAuth()

  // HtmlFormElement extends Element
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // 此处如果不断言成HtmlInputElement，就会报错：“Element”上不存在属性“value”
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    register({ username, password })
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">用户名</label>
      <input type="text" id={'username'} />
    </div>
    <div>
      <label htmlFor="password">密码</label>
      <input type="password" id={'password'} />
    </div>
    <button type={'submit'}>注册</button>
  </form>
}