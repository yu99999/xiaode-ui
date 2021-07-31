import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Select } from "../components"

const {Option} = Select

export default {
  title: 'Example/Select 选择器',
  component: Select,
  subcomponents: {
    "Select.Option": Option
  }
} as ComponentMeta<typeof Select>;

export const Primary = () => {
  const onChange = (options) => {
    console.log("onChange", options)
  }
  return (
    <Select onChange={onChange} placeholder="选一个吧" style={{width: 400}}>
      <Option value="123">option1</Option>
      <Option value="555">option2</Option>
      <Option value="666" disabled>option3</Option>
      <Option value="777">option4</Option>
    </Select>
  )
}
Primary.storyName = "基础展示"

export const Multiple = () => {
  const onChange = (options) => {
    console.log(options)
  }
  return (
    <Select onChange={onChange} placeholder="选一个吧" style={{width: 400}} multiple>
      <Option value="123">123</Option>
      <Option value="555">555</Option>
      <Option value="666">666</Option>
      <Option value="777">777</Option>
    </Select>
  )
}
Multiple.storyName = "多选"

export const Hover = () => {
  return (
    <Select placeholder="选一个吧" hoverTrigger style={{width: 400}} multiple>
      <Option value="123">123</Option>
      <Option value="555">555</Option>
      <Option value="666">666</Option>
      <Option value="777">777</Option>
    </Select>
  )
}
Hover.storyName = "移入触发"