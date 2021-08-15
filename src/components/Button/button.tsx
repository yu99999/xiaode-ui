import React from "react";
import classNames from "classnames";
import { prefixClass } from "../../provider"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement>{
  /** 用户自定义类 */
  className?: string;
  /** 按钮失效状态 */
  disabled?: boolean;
  /** 设置按钮大小 */
  size?: "large" | "middle" | "small",
  /** 设置按钮类型 */
  btnType?: "primary" | "link" | "danger" | "defalut",
  /** 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 */
  href?: string,
  /** 相当于 a 链接的 target 属性 */
  target?: string
}


/** 按钮用于开始一个即时操作。 */
export const Button: React.FC<ButtonProps> = (props) => {
  const {className, disabled, size, children, btnType, href, target, ...resetProps} = props;
  const classes = classNames(`${prefixClass}-btn`, {
    [`${prefixClass}-btn-${btnType}`]: btnType,
    [`${prefixClass}-btn-${size}`]: size,
    disabled,
    [`${className}`]: className
  })

  if(btnType === "link"){
    return (
      <a href={href} className={classes} target={target} {...resetProps}>{children}</a>
    )
  }else{
    return (
      <button className={classes} disabled={disabled} {...resetProps}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: "defalut"
}

