import { fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import React from "react";
import {AutoComplete, AutoCompleteProps} from "./autoComplete"

jest.mock("axios")


const data = [
  {id: 1, value: "aaaa"},
  {id: 2, value: "arva"},
  {id: 3, value: "aqi"},
  {id: 4, value: "dwah"},
]
describe("测试 AutoComplete 组件", () => {
  let wrapper: RenderResult, el: HTMLInputElement
  const testProps: AutoCompleteProps = {
    placeholder: "test",
    onSearch: (value) => data.filter(item => item.value.includes(value)),
    onSelect: jest.fn()
  }

  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps}/>);
    el = wrapper.getByPlaceholderText("test") as HTMLInputElement;
  })

  test('测试基础数据展示', async () => {
    fireEvent.change(el, {target: {value: "a"}});
    await waitFor(() => {
      expect(wrapper.queryByText("arva")).toBeInTheDocument()
    })
    expect(wrapper.container.querySelectorAll(".auto-complete-dropdown-item").length).toEqual(4)
    fireEvent.click(wrapper.getByText("arva"))
    expect(testProps.onSelect).toHaveBeenCalledWith({id: 2, value: "arva"})
    expect(wrapper.queryByText("arva")).not.toBeInTheDocument()
    expect(el.value).toBe('arva')
  })
  
  test('测试键盘移动', async () => {
    fireEvent.change(el, {target: {value: "a"}});
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll(".auto-complete-dropdown-item").length).toEqual(4)
    })
    fireEvent.keyDown(el, {key: "ArrowDown"});
    expect(wrapper.queryByText("aaaa")).toHaveClass("auto-complete-dropdown-item-selected")
    fireEvent.keyDown(el, {key: "ArrowDown"});
    expect(wrapper.queryByText("arva")).toHaveClass("auto-complete-dropdown-item-selected")

    fireEvent.keyDown(el, {key: "ArrowUp"});
    expect(wrapper.queryByText("aaaa")).toHaveClass("auto-complete-dropdown-item-selected")

    fireEvent.keyDown(el, {key: "Enter"});
    expect(testProps.onSelect).toHaveBeenCalledWith({id: 1, value: "aaaa"})
    expect(wrapper.queryByText("aaaa")).not.toBeInTheDocument()
    expect(el.value).toBe('aaaa')
  })

  test('测试点击下拉菜单外部隐藏下拉菜单', async () => {
    fireEvent.change(el, {target: {value: "aa"}});
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll(".auto-complete-dropdown-item").length).toEqual(1)
    })
    fireEvent.click(document)
    await waitFor(() => {
      expect(wrapper.queryByText("aaaa")).not.toBeInTheDocument()
    })
  })
  
})

test("测试 AutoComplete 组件的 renderOptions 以及异步请求", async () => {
  const onSearch = async (value: string) => {
    return new Promise<{id: number, value: string}[]>(resolve => {
      setTimeout(() => {
        resolve(data.filter(item => item.value.includes(value)))
      }, 300)
    })
  }
  const testProps: AutoCompleteProps = {
    placeholder: "test",
    onSearch,
    renderOptions: (item) => (
      <div className="test-render-options">{item.value}</div>
    )
  }
  
  const wrapper = render(<AutoComplete {...testProps}/>);
  const el = wrapper.getByPlaceholderText("test") as HTMLInputElement;
  
  fireEvent.change(el, {target: {value: "aa"}});
  await waitFor(() => {
    // 展示 loading 动画
    expect(wrapper.container.querySelector(".spin-spinning")).toBeInTheDocument()
  })
  await waitFor(() => {
    expect(wrapper.container.querySelectorAll(".auto-complete-dropdown-item").length).toEqual(1)
  })
  expect(wrapper.container.querySelector(".spin-spinning")).not.toBeInTheDocument()
  expect(wrapper.container.querySelectorAll(".test-render-options").length).toEqual(1)
})