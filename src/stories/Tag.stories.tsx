import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Tag } from '../components';

export default {
  title: 'Example/Tag 标签',
  component: Tag
} as ComponentMeta<typeof Tag>;

export const Primary = () => {
  return (
    <div className="tag-demo-status">
      <Tag status="primary">标签1</Tag>
      <Tag status="danger">标签2</Tag>
      <Tag status="success">标签3</Tag>
      <Tag status="warning">标签4</Tag>
      <Tag status="info">标签5</Tag>
    </div>
  )
}
Primary.storyName = "基础用法"

export const Size = () => {
  return (
    <div className="tag-demo-size">
      <Tag size="large">标签1</Tag>
      <Tag size="middle">标签2</Tag>
      <Tag size="small">标签3</Tag>
    </div>
  )
}
Size.storyName = "不同尺寸"

export const Close = () => {

  return (
    <div className="tag-demo-size">
      <Tag status="primary" closable onClose={console.log}>标签1</Tag>
      <Tag status="danger" closable>标签2</Tag>
      <Tag status="success" closable>标签3</Tag>
      <Tag status="warning" closable>标签4</Tag>
      <Tag status="info" closable>标签5</Tag>
    </div>
  )
}
Close.storyName = "可关闭"