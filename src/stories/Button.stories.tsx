import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../components/Button';

export default {
  title: 'Example/Button 按钮',
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}/>;


export const Primary = Template.bind({})
Primary.args = {
  size: "middle",
  btnType: "primary",
  className: "my-class",
  children: "按钮"
}
Primary.storyName = "基础按钮"

export const TypesBtn = () => {
  return (
    <div className="button-demo-type">
      <Button btnType="primary">Primary Button</Button>
      <Button btnType="danger">Danger Button</Button>
      <Button btnType="defalut">Defalut Button</Button>
      <Button btnType="link">Link Button</Button>
    </div>
  )
}
TypesBtn.storyName = "按钮类型"

export const SizesBtn = () => {
  return (
    <div className="button-demo-size">
      <Button btnType="primary" size="large">Large Button</Button>
      <Button btnType="primary" size="middle">Middle Button</Button>
      <Button btnType="primary" size="small">Small Button</Button>
    </div>
  )
}
SizesBtn.storyName = "按钮尺寸"