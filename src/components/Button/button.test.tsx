import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import {Button} from './button'

describe("测试 Button 组件", () => {
  test('测试 default button', () => {
    const fn = jest.fn()
    const wrapper = render(<Button onClick={fn}>123</Button>)
    const el = wrapper.queryByText('123') as HTMLButtonElement
    expect(el).toBeInTheDocument()
    expect(el?.tagName).toEqual('BUTTON')
    expect(el.disabled).toBeFalsy()
    expect(el).toHaveClass('btn btn-defalut')
    fireEvent.click(el)
    expect(fn).toHaveBeenCalled()
  })
  
  test('测试 primary large hhh class button', () => {
    const wrapper = render(<Button size="large" btnType="primary" className="hhhh">123</Button>)
    const el = wrapper.queryByText('123')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('btn btn-large btn-primary hhhh')
  })
  
  test('测试 link button', () => {
    const wrapper = render(<Button btnType="link" href="xxx.com">链接</Button>)
    const el = wrapper.queryByText('链接')
    expect(el).toBeInTheDocument()
    expect(el?.tagName).toEqual("A");
    expect(el).toHaveClass("btn btn-link")
    expect(el).toHaveAttribute('href', 'xxx.com')
  })
  
  test('测试 disabled button', () => {
    const fn = jest.fn()
    const wrapper = render(<Button disabled onClick={fn}>disabled</Button>)
    const el = wrapper.queryByText('disabled') as HTMLButtonElement
    expect(el.disabled).toBeTruthy()
    fireEvent.click(el)
    expect(fn).not.toHaveBeenCalled()
  })
  
})