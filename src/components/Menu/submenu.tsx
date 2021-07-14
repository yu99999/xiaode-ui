import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import {MenuContext} from './menu'
import {MenuItemProps} from './menuItem'
import {Down} from '@icon-park/react'
import {Transition, Icon} from '../index'
import {useSelect} from "../../hooks/index"

interface SubMenuProps{
  /** 唯一标志 */
  index?: string,
  /** 子菜单项值 */
  title: string,
  className?: string
}

export const SubMenu: React.FC<SubMenuProps> = (props) => {
  const context = useContext(MenuContext);
  const {index, title, className, children} = props;

  const defaultOpenSubMenus = context.defaultOpenSubMenus as string[];
  const {isOpen, clickEvent, hoverEvent} = useSelect({
    defaultOpen: Boolean(index && context.mode === "vertical" && defaultOpenSubMenus.includes(index)),
    isMulti: false,
    hoverTrigger: context.mode !== "vertical",

  })

  const renderChildren = () => {
    const wrapperClasses = classNames("sub-menu", {
      "sub-menu-open": isOpen
    })
    // 过滤出无效的 child，以及自动生成索引
    const list = React.Children.map(children, (child, i) => {
      const childEl = child as React.FunctionComponentElement<MenuItemProps>
      if(childEl.type.displayName === 'MenuItem'){
        return React.cloneElement(childEl, { index: index + "-" + (childEl.props.index ? childEl.props.index : i) })
      }else{
        console.warn("SubMenu 的 children 必须是 MenuItem")
      }
    })

    return (
      <Transition in={isOpen} timeout={300} animation="scale-top" unmountOnExit>
        <ul className={wrapperClasses}>
          {list}
        </ul>
      </Transition>
    )
  }

  const classes = classNames('sub-menu-wrapper', className, {
    'sub-menu-actived': index === context.index?.split("-")[0],
    'sub-menu-wrapper-isOpened': isOpen
  })

  return (
    <li key={index} className={classes} {...hoverEvent}>
      <div className="sub-menu-title menu-item" {...clickEvent}>
        {title}
        <Icon IconOrigin={Down} className="icon-arrow" />
      </div>
      {renderChildren()}
    </li>
  )
}
SubMenu.displayName = 'SubMenu'

