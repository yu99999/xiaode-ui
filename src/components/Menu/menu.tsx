import React, { useState } from "react";
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'

type MenuMode = 'vertical' | 'horizontal'
type SelectedCallback = (selectedIndex: string) => any

export interface MenuProps{
  defalutIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectedCallback;
  defaultOpenSubMenus?: string[]
}

interface ContextItem{
  index?: string;
  onSelectItem?: SelectedCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[]
}

export const MenuContext = React.createContext<ContextItem>({})

const Menu: React.FC<MenuProps> = (props) => {
  const {defalutIndex, className, mode, style, onSelect, defaultOpenSubMenus, children} = props;
  const [currentIndex, setCurrentIndex] = useState(defalutIndex)
  const classes = classNames('menu', className, {
    [`menu-${mode}`]: true
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
    <ul className={classes} style={style} data-testid="test-menu">
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

export default Menu