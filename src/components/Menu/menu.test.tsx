import React from "react";
import {fireEvent, render, RenderResult, waitFor} from '@testing-library/react'
import {Menu} from "../index"
import {MenuProps} from "./menu"
import { prefixClass } from "../../provider"

const {Item: MenuItem, SubMenu} = Menu

const genMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem className="abc">
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem index="third">
        third
      </MenuItem>
      <SubMenu title="dropdown" index="hhh">
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

const createStyle = () => {
  const css = `
    .${prefixClass}-sub-menu{
      display: none;
    }
    .${prefixClass}-sub-menu-open{
      display: block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = css;
  return style;
}

describe("测试 horizontal Menu 组件", () => {
  let wrapper: RenderResult, menuEl: HTMLElement, activeEl: HTMLElement, disabledEl: HTMLElement, thirdEl: HTMLElement;

  const testProps: MenuProps = {
    mode: "horizontal",
    defalutIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
  }

  beforeEach(() => {
    wrapper = render(genMenu(testProps))
    wrapper.container.append(createStyle())
    menuEl = wrapper.getByTestId('test-menu')
    activeEl = wrapper.getByText('active')
    disabledEl = wrapper.getByText('disabled')
    thirdEl = wrapper.getByText('third')
  })

  test('测试 menu 组件存在以及样式的正确性', () => {
    expect(menuEl).toBeInTheDocument()
    expect(menuEl).toHaveClass(`${prefixClass}-menu ${prefixClass}-menu-horizontal test`)
    expect(menuEl.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeEl).toHaveClass(`${prefixClass}-menu-item ${prefixClass}-menu-item-actived abc`)
    expect(disabledEl).toHaveClass(`${prefixClass}-menu-item ${prefixClass}-menu-item-disabled`)
  })
  test('测试事件触发时应该修改样式以及 disabled 组件无法触发事件', () => {
    fireEvent.click(thirdEl);
    expect(thirdEl).toHaveClass(`${prefixClass}-menu-item-actived`)
    expect(activeEl).not.toHaveClass(`${prefixClass}-menu-item-actived`)
    expect(testProps.onSelect).toBeCalledWith("third")
    fireEvent.click(disabledEl)
    expect(disabledEl).not.toHaveClass(`${prefixClass}-menu-item-actived`)
    expect(testProps.onSelect).toBeCalledTimes(1)
  })
  test('测试 submenu 组件的显示和隐藏', async () => {
    const dropdownEl = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownEl);
    let el;
    await waitFor(() => {
      el = wrapper.queryByText('drop1');
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(el)
    expect(testProps.onSelect).toBeCalledWith("hhh-drop1")
    fireEvent.mouseLeave(dropdownEl);
    await waitFor(() => {
      expect(el).not.toBeVisible()
    })
  })
  
})


describe("测试 vertical Menu 组件", () => {
  let wrapper: RenderResult, menuEl: HTMLElement;

  const testProps: MenuProps = {
    mode: "vertical",
    defalutIndex: 'third',
    defaultOpenSubMenus: ["hhh"]
  }

  beforeEach(() => {
    wrapper = render(genMenu(testProps))
    wrapper.container.append(createStyle())
    menuEl = wrapper.getByTestId('test-menu')
  })

  test('测试样式以及默认 index ', () => {
    expect(menuEl).toBeInTheDocument()
    expect(menuEl).toHaveClass(`${prefixClass}-menu ${prefixClass}-menu-vertical`)
    expect(menuEl.querySelectorAll(':scope > li').length).toEqual(4);
    expect(wrapper.getByText('third')).toHaveClass(`${prefixClass}-menu-item ${prefixClass}-menu-item-actived`)
  })
  
  test('测试 submenu 默认展开情况', async () => {
    const el = wrapper.queryByText('drop1') as HTMLElement;
    expect(el).toBeVisible()
    const dropdownEl = wrapper.getByText('dropdown')
    fireEvent.click(dropdownEl);
    expect(el).not.toBeVisible()
  })
  
})

