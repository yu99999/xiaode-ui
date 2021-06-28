import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AutoComplete } from "../components";
import { AutoCompleteDataType } from "../components/AutoComplete/autoComplete"

export default {
  title: 'Example/AutoComplete',
  component: AutoComplete
} as ComponentMeta<typeof AutoComplete>;

const Template: ComponentStory<typeof AutoComplete> = (args) => <AutoComplete {...args}/>;

export const Primary = () => {
  const data = [
    {value: "aaaa"},
    {value: "arva"},
    {value: "aqi"},
    {value: "dwah"},
  ]
  const onSearch = async (value: string) => {
    return data.filter(item => item.value.includes(value))
  }

  return (
    <AutoComplete 
      onSearch={onSearch}
      style={{width: 300}}
      placeholder="试试输入a"
    />
  )
}
Primary.storyName = "基础展示"

export const AsyncSearch = () => {

  const onSearch = async (value: string) => {
    return fetch("http://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(json => json.filter(item => item.title.includes(value)).map(({title, ...rest}) => ({...rest, value: title})))
  }

  return (
    <AutoComplete onSearch={onSearch} />
  )
}
AsyncSearch.storyName = "异步请求数据"

export const Show = () => {
  interface DataType{
    id: number,
    value: string
  }
  const data: DataType[] = [
    {id: 1, value: "aaaa"},
    {id: 2, value: "arva"},
    {id: 3, value: "aqi"},
    {id: 4, value: "dwah"},
  ]
  const onSearch = async (value: string) => {
    return data.filter(item => item.value.includes(value))
  }

  const onSelect = (item: DataType) => {
    console.log(`点击了 id: ${item.id}`)
  }
  const renderOptions = (item: DataType) => (
    <div>id: {item.id} ----- value: {item.value}</div>
  )
  return (
    <AutoComplete 
      onSearch={onSearch}
      onSelect={onSelect} 
      renderOptions={renderOptions}
    />
  )
}
Show.storyName = "自定义下拉模板"