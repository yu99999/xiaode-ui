import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Spin } from '../components/Spin/spin';
import { Button } from '../components';

export default {
  title: 'Example/Spin 加载中',
  component: Spin
} as ComponentMeta<typeof Spin>;

const Template: ComponentStory<typeof Spin> = (args) => <Spin {...args}/>;

export const Primary = Template.bind({})
Primary.args = {
  
}
Primary.storyName = "基础用法"

export const SizesSpin = () => {
  return (
    <div className="spin-demo-size">
      <Spin size="small" />
      <Spin size="middle" />
      <Spin size="large" />
    </div>
  )
}
SizesSpin.storyName = "不同尺寸"

export const DescriptionSpin = () => {
  const [loading, setLoading] = useState(true)
  return (
    <div>
      <Spin description="Loading..." spinning={loading}>
        <div>
          这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
          <br />
          这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
          <br />
          这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
          <br />
          这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
          <br />
          这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
          <br />
          这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
          <br />
          这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
          <br />
          这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
          <br />
          这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
          <br />
          这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
          <br />
          这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本
        </div>
      </Spin>
      <Button btnType="primary" style={{marginTop: 10}} onClick={() => setLoading(!loading)}>切换</Button>
    </div>
  )
}
DescriptionSpin.storyName = "自定义描述文案"