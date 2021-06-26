import React from "react";
import classNames from 'classnames';
import {IIconProps} from "@icon-park/react/lib/runtime/index"

type ThemeProps = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "default"

interface IconProps extends IIconProps {
  /** 目标图标，从第三方图标库导出的图标，例如 import {Search} from "@icon-park/react" */
  IconOrigin: (props: any) => React.ReactElement;
  className?: string;
  /** 主题样式 */
  design?: ThemeProps;
}

/** 为语义化的矢量图形提供主题样式。建议安装 @icon-park/react 图标组件包
 * 
 * ```
 * npm install @icon-park/react
 * ```
 * 
 * 支持 @icon-park/react 图标组件自带的属性。具体可以查看官网：https://iconpark.oceanengine.com/official
 */
export const Icon: React.FC<IconProps> = (props) => {
  const {IconOrigin, design, className, ...resetProps} = props;
  const classes = classNames('icon', className, {
    [`icon-${design}`]: design
  })
  
  return (
    <IconOrigin className={classes} {...resetProps}></IconOrigin>
  )
}
