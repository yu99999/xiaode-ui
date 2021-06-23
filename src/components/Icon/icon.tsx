import React from "react";
import classNames from 'classnames'

type ThemeProps = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "default"

interface IconProps {
  icon: React.ReactNode;
  theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = (props) => {
  const {icon, theme, children} = props;
  const classes = classNames({
    [`xiaode-icon-${theme}`]: theme
  })
  

  return (
    <span className={classes}>{icon}</span>
  )
}

export default Icon