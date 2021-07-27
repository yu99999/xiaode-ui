import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Upload, UploadFile } from "../components/Upload/upload";
import { Button, Icon } from "../components";
import { UploadOne } from "@icon-park/react"

export default {
  title: 'Example/Upload 上传',
  component: Upload
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = (args) => <Upload {...args}/>;

export const Primary = Template.bind({})
Primary.args = {
  action: "https://jsonplaceholder.typicode.com/posts/",
  name: "fileName",
  children: (<Button btnType="primary">上传</Button>),
  onChange: () => {},
  onSuccess: () => {},
  onError: () => {},
  onRemove: () => {}
}
Primary.storyName = "点击上传"

export const BeforeUpload = () => {
  const beforeUpload = (file: File) => {
    console.log("beforeUpload: ", file)
    return true;
  }

  const onChange = (file: UploadFile) => {
    console.log("onChange: ", file)
  }

  const onSuccess = (data: any, file: UploadFile) => {
    console.log("onSuccess: ", data,  file)
  }

  const onError = (err: any, file: UploadFile) => {
    console.log("onError: ", err, file)
  }

  const onRemove = (file: UploadFile) => {
    console.log("onRemove: ", file)
  }

  return (
    <Upload 
      action="https://jsonplaceholder.typicode.com/posts/"
      beforeUpload={beforeUpload}
      onChange={onChange}
      onSuccess={onSuccess}
      onError={onError}
      onRemove={onRemove}
    >
      <Button btnType="primary">上传</Button>
    </Upload>
  )
}
BeforeUpload.storyName = "上传生命周期"

export const Drag = () => {
  return (
    <Upload 
      action="https://jsonplaceholder.typicode.com/posts/"
      drag
    >
      <Icon IconOrigin={UploadOne} size={40} design="primary" />
      <span>单击或拖动文件到该区域进行上传</span>
    </Upload>
  )
}
Drag.storyName = "拖拽上传"


export const PngUpload = () => {
  const beforeUpload = (file: File) => {
    if(file.type !== "image/png"){
      return Promise.reject("只允许png")
    }else{
      return new Promise<File>(resolve => {
        const newFile = new File([file], Date.now() + ".png", {type: file.type})
        resolve(newFile)
      })
    }
  }

  return (
    <Upload 
      action="https://jsonplaceholder.typicode.com/posts/"
      beforeUpload={beforeUpload}
      accept="image/png"
    >
      <Button btnType="primary">只支持上传 png 图片</Button>
    </Upload>
  )
}
PngUpload.storyName = "只支持上传 png 图片"
