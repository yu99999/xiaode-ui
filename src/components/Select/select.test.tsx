import React from "react";
import { render, fireEvent, RenderResult, waitFor } from "@testing-library/react";
import { SelectProps } from "./select"
import Select from "./";
import { prefixClass } from "../../provider"

const {Option} = Select;

const renderSelect = (props) => {
  return (
    <Select {...props}>
      <Option value="option1">option1</Option>
      <Option value="option2">option2</Option>
      <Option value="option3">option3</Option>
      <Option value="option9">option4</Option>
    </Select>
  )
}


describe("测试 Select 组件", () => {
  let wrapper: RenderResult, clickEl: HTMLElement;
  const testProps: SelectProps = {
    onSelect: jest.fn(),
    placeholder: "test",
    onChange: jest.fn()
  }
  beforeEach(() => {
    wrapper = render(renderSelect(testProps));
    clickEl = wrapper.container.querySelector(`.${prefixClass}-select-input`) as HTMLElement;
  })

  test('测试 Select基础功能', async () => {
    const valueEl = wrapper.container.querySelector(`.${prefixClass}-select-input-value-radio`) as HTMLElement;
    expect(valueEl).toHaveTextContent("")
    fireEvent.click(clickEl);
    expect(wrapper.container.querySelectorAll(`.${prefixClass}-select-option-dropdown-item`).length).toEqual(4)
    const tmp = wrapper.getByText("option4")
    fireEvent.click(tmp)
    expect(tmp).toHaveClass(`${prefixClass}-select-option-dropdown-item-selected`)
    expect(valueEl).toHaveTextContent("option4")
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "option9",
      key: "option9",
      label: "option4"
    })
    expect(testProps.onChange).toHaveBeenCalledWith({
      value: "option9",
      key: "option9",
      label: "option4"
    })
  })

  test('测试 Select 点击显示和隐藏', async () => {
    expect(wrapper.container.querySelectorAll(`.${prefixClass}-select-option-dropdown-item`).length).toEqual(0)
    fireEvent.click(clickEl);
    expect(wrapper.container.querySelectorAll(`.${prefixClass}-select-option-dropdown-item`).length).toEqual(4)
    fireEvent.click(document.body);
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll(`.${prefixClass}-select-option-dropdown-item`).length).toEqual(0)
    })
    fireEvent.click(clickEl);
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll(`.${prefixClass}-select-option-dropdown-item`).length).toEqual(4)
    })
    fireEvent.click(clickEl);
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll(`.${prefixClass}-select-option-dropdown-item`).length).toEqual(0)
    })
  })
  
})


describe("测试 Select 多选以及hover事件", () => {
  let wrapper: RenderResult, hoverEl: HTMLElement;
  const testProps: SelectProps = {
    onSelect: jest.fn(),
    placeholder: "test",
    multiple: true,
    hoverTrigger: true,
    onChange: jest.fn()
  }

  beforeEach(() => {
    wrapper = render(renderSelect(testProps));
    hoverEl = wrapper.container.querySelector(`.${prefixClass}-select-option`) as HTMLElement;
  })
  
  test('测试 Select 移入触发显示和隐藏', async () => {
    expect(wrapper.container.querySelectorAll(`.${prefixClass}-select-option-dropdown-item`).length).toEqual(0)
    const valueEl = wrapper.container.querySelector(`.${prefixClass}-select-input-value-radio`) as HTMLElement;
    expect(valueEl).toHaveTextContent("")
    fireEvent.mouseEnter(hoverEl);
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll(`.${prefixClass}-select-option-dropdown-item`).length).toEqual(4)
    })
    fireEvent.mouseEnter(wrapper.getByText("option4"))
    expect(wrapper.container.querySelectorAll(`.${prefixClass}-select-option-dropdown-item`).length).toEqual(4)
    fireEvent.mouseLeave(hoverEl);
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll(`.${prefixClass}-select-option-dropdown-item`).length).toEqual(0)
    })
  })
  
  test('测试 Select 多选功能', async () => {
    fireEvent.mouseEnter(hoverEl);
    expect(wrapper.container.querySelectorAll(`${prefixClass}-tag`).length).toEqual(0)
    await waitFor(() => {
      fireEvent.click(wrapper.getByText("option4"))
    })
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "option9",
      key: "option9",
      label: "option4"
    })
    expect(testProps.onChange).toHaveBeenCalledWith([{
      value: "option9",
      key: "option9",
      label: "option4"
    }])
    expect(wrapper.container.querySelector(`.${prefixClass}-tag`)).toHaveTextContent("option4")

    fireEvent.click(wrapper.getByText("option3"))
    expect(testProps.onChange).toHaveBeenCalledWith([{
      value: "option9",
      key: "option9",
      label: "option4"
    }, {
      value: "option3",
      key: "option3",
      label: "option3"
    }])
    expect(wrapper.container.querySelectorAll(`.${prefixClass}-tag`).length).toEqual(2)

    fireEvent.click(wrapper.container.querySelector(`.${prefixClass}-tag-close`) as HTMLElement);
    expect(testProps.onChange).toHaveBeenCalledWith([{
      value: "option3",
      key: "option3",
      label: "option3"
    }])
    expect(wrapper.container.querySelector(`.${prefixClass}-tag`)).toHaveTextContent("option3")

    fireEvent.click(wrapper.container.querySelector(`.${prefixClass}-select-option-dropdown-item.${prefixClass}-select-option-dropdown-item-selected`) as HTMLElement);
    expect(testProps.onChange).toHaveBeenCalledWith([])
    expect(wrapper.container.querySelectorAll(`.${prefixClass}-tag`).length).toEqual(0)

  })
})