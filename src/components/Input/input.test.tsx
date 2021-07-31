import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {Input, InputProps} from "./input"
import {Icon} from "../index"
import {Search, User} from "@icon-park/react"

const defalutProps: InputProps = {
  placeholder: "test",
  size: "large",
  onChange: jest.fn()
}

describe("测试 Input 组件", () => {
  test('测试 Input 的正确性以及前置/后置标签', () => {
    const wrapper = render(<Input prepend="prepend" append="append" {...defalutProps} />)
    const elWrapper = wrapper.container.querySelector('.input-wrapper')
    expect(elWrapper).toHaveClass("input-wrapper input-wrapper-large")
    expect(wrapper.getByText('prepend')).toBeInTheDocument()
    expect(wrapper.getByText('append')).toBeInTheDocument()

    const el = wrapper.getByPlaceholderText("test") as HTMLInputElement
    fireEvent.change(el, {target: {value: 'iii'}})
    expect(defalutProps.onChange).toHaveBeenCalled()
    expect(el.value).toEqual("iii")
  })
  
  test('测试 Input 的 disabled 是否可用', () => {
    const wrapper = render(<Input disabled {...defalutProps} />)
    const elWrapper = wrapper.container.querySelector('.input-wrapper')
    expect(elWrapper).toHaveClass("input-wrapper input-wrapper-disabled")
    const el = wrapper.getByPlaceholderText("test") as HTMLInputElement
    expect(el.disabled).toBeTruthy()
  })
  
  test('测试 Input 的前缀和后缀图标', () => {
    const wrapper = render(
      <Input 
        prefix={<Icon IconOrigin={User} data-testid="test-prefix" />}
        suffix={<Icon IconOrigin={Search} data-testid="test-suffix" />}
      />
    );
    expect(wrapper.getByTestId("test-prefix")).toBeInTheDocument()
    expect(wrapper.getByTestId("test-suffix")).toBeInTheDocument()
  })
  
})

