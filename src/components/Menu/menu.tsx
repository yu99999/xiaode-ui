import React, { useState } from "react";
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'
import { prefixClass } from "../../provider"

type MenuMode = 'vertical' | 'horizontal'

export interface MenuProps{
  /** 初始选中的菜单项 index */
  defalutIndex?: string;
  /** 自定义类名 */
  className?: string;
  /** 菜单类型，现在支持垂直、水平两种 */
  mode?: MenuMode;
  /** 支持自定义样式 */
  style?: React.CSSProperties;
  /** 被选中时调用 */
  onSelect?: (selectedIndex: string) => any;
  /** 初始展开的 SubMenu 菜单项 index 数组 */
  defaultOpenSubMenus?: string[]
}

interface ContextItem{
  index?: string;
  onSelectItem?: (selectedIndex: string) => any;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[]
}

export const MenuContext = React.createContext<ContextItem>({})

/**  */
export const Menu: React.FC<MenuProps> = (props) => {
  const {defalutIndex, className, mode, style, onSelect, defaultOpenSubMenus, children, ...resetProps} = props;
  const [currentIndex, setCurrentIndex] = useState(defalutIndex)
  const classes = classNames(`${prefixClass}-menu`, className, {
    [`${prefixClass}-menu-${mode}`]: true
  })

  const currentContext: ContextItem = {
    index: currentIndex ? currentIndex : '0',
    onSelectItem: (index: string) => {
      setCurrentIndex(index);
      if(onSelect){
        onSelect(index);
      }
    },
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    // 过滤出无效的 child，以及自动生成索引
    return React.Children.map(children, (child, index) => {
      const childEl = child as React.FunctionComponentElement<MenuItemProps>
      if(childEl.type.displayName === 'MenuItem' || childEl.type.displayName === 'SubMenu'){
        return React.cloneElement(childEl, { index: childEl.props.index ? childEl.props.index : index+"" })
      }else{
        console.warn("Menu 的 children 必须是 MenuItem")
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu" {...resetProps}>
      <MenuContext.Provider value={currentContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultOpenSubMenus: []
}
