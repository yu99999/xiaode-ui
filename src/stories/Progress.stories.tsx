import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Progress } from '../components';

export default {
  title: 'Example/Progress 进度条',
  component: Progress
} as ComponentMeta<typeof Progress>;

export const Primary = () => {
  return (
    <div className="progress-demo-status">
      <Progress status="danger" showInfo percent={50} />
      <Progress status="primary" showInfo percent={80} />
      <Progress status="success" showInfo percent={100} />
    </div>
  )
}
Primary.storyName = "基础用法"
