import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from "@storybook/addon-actions"
import {Menu, MenuItem, SubMenu} from "../components/index"

export default {
  title: 'Example/Menu 菜单',
  component: Menu,
  subcomponents: {MenuItem, SubMenu}
} as ComponentMeta<typeof Menu>;

export const TopMenu = () => {
  return (
    <Menu onSelect={action("导航到")} defalutIndex="three">
      <MenuItem>
        导航一
      </MenuItem>
      <MenuItem disabled>
        disabled -- 不可选
      </MenuItem>
      <MenuItem index="three">
        three
      </MenuItem>
      <SubMenu title="下拉菜单" index="dropdown">
        <MenuItem index="drop1">
          drop1
        </MenuItem>
        <MenuItem>
          drop2
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
TopMenu.storyName = "顶部导航"

export const VerticalMenu = () => {
  return (
    <Menu mode="vertical" onSelect={action("导航到")} style={{width: 200}} defaultOpenSubMenus={["dropdown"]}>
      <MenuItem>
        导航一
      </MenuItem>
      <MenuItem disabled>
        disabled -- 不可选
      </MenuItem>
      <MenuItem index="three">
        three
      </MenuItem>
      <SubMenu title="下拉菜单" index="dropdown">
        <MenuItem index="drop1">
          drop1
        </MenuItem>
        <MenuItem>
          drop2
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
VerticalMenu.storyName = "垂直式导航"