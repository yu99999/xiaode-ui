import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import {MenuContext} from './menu'
import {MenuItemProps} from './menuItem'
import {Down} from '@icon-park/react'
import {Transition, Icon} from '../index'

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
  const isOpen: boolean = (index && context.mode === "vertical") ? defaultOpenSubMenus.includes(index) : false
  const [open, setOpen] = useState(isOpen)

  const renderChildren = () => {
    const wrapperClasses = classNames("sub-menu", {
      "sub-menu-open": open
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
      <Transition in={open} timeout={300} animation="scale-top" unmountOnExit>
        <ul className={wrapperClasses}>
          {list}
        </ul>
      </Transition>
    )
  }


  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!open)
  }
  let timer: any = null;
  const handleHover = (e: React.MouseEvent, flag: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(flag)
    }, 200)
  }
  
  const clickEvent = context.mode === "vertical" ? {onClick: handleClick} : {};
  const hoverEvent = context.mode === "horizontal" ? {
    onMouseEnter: (e: React.MouseEvent) => {handleHover(e, true)},
    onMouseLeave: (e: React.MouseEvent) => {handleHover(e, false)}
  } : {}

  const classes = classNames('sub-menu-wrapper menu-item', className, {
    'menu-item-actived': index === context.index?.split("-")[0],
    'sub-menu-wrapper-isOpened': open
  })

  return (
    <li key={index} className={classes} {...hoverEvent}>
      <div className="sub-menu-title" {...clickEvent}>
        {title}
        <Icon IconOrigin={Down} className="icon-arrow" />
      </div>
      {renderChildren()}
    </li>
  )
}
SubMenu.displayName = 'SubMenu'

