import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from './menu'

export interface MenuItemProps{
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {index, disabled, className, style, children} = props;
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'menu-item-disabled': disabled,
    'menu-item-actived': index === context.index
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

export default MenuItem