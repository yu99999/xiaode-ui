import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from "@storybook/addon-actions"
import Menu from "../components/Menu"

export default {
  title: 'Example/Menu 菜单',
  component: Menu,
  subcomponents: {
    "Menu.Item": Menu.Item, 
    "Menu.SubMenu": Menu.SubMenu
  }
} as ComponentMeta<typeof Menu>;

export const TopMenu = () => {
  return (
    <Menu onSelect={action("导航到")} defalutIndex="three">
      <Menu.Item>
        导航一
      </Menu.Item>
      <Menu.Item disabled>
        disabled -- 不可选
      </Menu.Item>
      <Menu.Item index="three">
        three
      </Menu.Item>
      <Menu.SubMenu title="下拉菜单" index="dropdown">
        <Menu.Item index="drop1">
          drop1
        </Menu.Item>
        <Menu.Item>
          drop2
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}
TopMenu.storyName = "顶部导航"

export const VerticalMenu = () => {
  return (
    <Menu mode="vertical" onSelect={action("导航到")} style={{width: 200}} defaultOpenSubMenus={["dropdown"]}>
      <Menu.Item>
        导航一
      </Menu.Item>
      <Menu.Item disabled>
        disabled -- 不可选
      </Menu.Item>
      <Menu.Item index="three">
        three
      </Menu.Item>
      <Menu.SubMenu title="下拉菜单" index="dropdown">
        <Menu.Item index="drop1">
          drop1
        </Menu.Item>
        <Menu.Item>
          drop2
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}
VerticalMenu.storyName = "垂直式导航"