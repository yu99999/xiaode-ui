import React from "react";
import classNames from "classnames";

type Size = "large" | "middle" | "small";
type Type = "primary" | "link" | "danger" | "defalut";

interface BaseButtonProps{
  className?: string;
  disabled?: boolean;
  size?: Size,
  btnType?: Type,
  href?: string,
  target?: string
}

type ButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>

const Button: React.FC<ButtonProps> = (props) => {
  const {className, disabled, size, children, btnType, href, target, ...resetProps} = props;
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
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

export default Button;