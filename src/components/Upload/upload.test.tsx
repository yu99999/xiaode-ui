import { fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import React from "react";
import {Upload, UploadProps} from "./upload"
import {Button} from "../"
import axios from "axios";
import { prefixClass } from "../../provider";

jest.mock("axios")
const mockAxios = axios as jest.Mocked<typeof axios>
const testFile = new File(['aaa'], 'test.jpg', {type: 'image/jpg'})
const testFile2 = new File(['aaa'], 'test2.jpg', {type: 'image/jpg'})

// jest.mock("../Icon/icon.tsx", () => {
//   return ({IconOrigin}) => {
//     return <span>{IconOrigin}</span>
//   }
// })

describe("测试 Upload 组件", () => {
  const testProps: UploadProps = {
    action: "xxx.com",
    // beforeUpload: jest.fn(),
    onSuccess: jest.fn(),
    onError: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn(),
    drag: true
  }

  let wrapper: RenderResult, fileEl: HTMLInputElement, uploadEl: HTMLElement;
  beforeEach(() => {
    wrapper = render(
      <Upload {...testProps}>
        <Button>点击上传</Button>
      </Upload>
    )
    fileEl = wrapper.container.querySelector("input[type='file']") as HTMLInputElement;
    uploadEl = wrapper.getByText("点击上传")
  })

  test('测试基础', async () => {
    expect(uploadEl).toBeInTheDocument()
    expect(fileEl).not.toBeVisible()
    mockAxios.post.mockResolvedValueOnce({data: 'success'})
    await waitFor(() => {
      fireEvent.change(fileEl, {target: {files: [testFile]}})
    })
    // 上传进度
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      rawInfo: testFile,
      status: "uploading",
      percent: 0,
      name: "test.jpg"
    }))
    expect(wrapper.queryByText("test.jpg")).toBeInTheDocument()
    expect(wrapper.container.querySelector(`.${prefixClass}-upload-list-item`)).toHaveClass(`${prefixClass}-upload-list-item-status-success`)
    expect(testProps.onSuccess).toHaveBeenCalledWith('success', expect.objectContaining({
      rawInfo: testFile,
      name: "test.jpg",
      percent: 100,
      status: "success"
    }))

    
    // error
    mockAxios.post.mockRejectedValueOnce("error!!!")
    await waitFor(() => {
      fireEvent.change(fileEl, {target: {files: [testFile2]}})
    })
    expect(wrapper.queryByText("test2.jpg")).toBeInTheDocument()
    expect(wrapper.container.querySelectorAll(`.${prefixClass}-upload-list-item`).length).toEqual(2)
    expect(wrapper.container.querySelector(`.${prefixClass}-upload-list-item`)).toHaveClass(`${prefixClass}-upload-list-item-status-error`)
    expect(testProps.onError).toHaveBeenCalledWith('error!!!', expect.objectContaining({
      rawInfo: testFile2,
      name: "test2.jpg",
      percent: 100,
      status: "error"
    }))


    // 删除效果
    const delEl = wrapper.container.querySelector(`.${prefixClass}-upload-list-item-delete`) as HTMLElement
    expect(delEl).toBeInTheDocument()
    fireEvent.click(delEl)
    expect(wrapper.container.querySelectorAll(`.${prefixClass}-upload-list-item`).length).toEqual(1)
    expect(wrapper.queryByText("test2.jpg")).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      rawInfo: testFile,
      name: "test2.jpg"
    }))

  })
  
  test('测试拖拽', async () => {
    mockAxios.post.mockResolvedValue({data: 'success'})
    const uploadArea = wrapper.container.querySelector(`.${prefixClass}-upload-drap`) as HTMLElement;
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass(`${prefixClass}-upload-drap-actived`)
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass(`${prefixClass}-upload-drap-actived`)

    await waitFor(() => {
      fireEvent.drop(uploadArea, {dataTransfer: {files: [testFile]}})
    })
    
    expect(testProps.onSuccess).toHaveBeenCalledWith('success', expect.objectContaining({
      rawInfo: testFile,
      name: "test.jpg",
      percent: 100,
      status: "success"
    }))
  })

})