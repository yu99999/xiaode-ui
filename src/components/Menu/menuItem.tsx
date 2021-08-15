import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from './menu'
import { prefixClass } from "../../provider"

export interface MenuItemProps{
  /** 唯一标志 */
  index?: string;
  /** 是否禁用 */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {index, disabled, className, style, children} = props;
  const context = useContext(MenuContext)
  const classes = classNames(`${prefixClass}-menu-item`, className, {
    [`${prefixClass}-menu-item-disabled`]: disabled,
    [`${prefixClass}-menu-item-actived`]: index === context.index
  })
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if(context.onSelectItem && !disabled && typeof index === 'string'){
      context.onSelectItem(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={onClick} key={index}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'
