import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import DragUpload from "./dragUpload";
import { prefixClass } from "../../provider"

export interface UploadFile{
  /** 唯一标识符 */
  uid: string;
  /** 文件大小 */
  size: number;
  /** 文件名 */
  name: string;
  /** 上传状态 */
  status: "error" | "success" | "uploading";
  /** 源文件信息 */
  rawInfo: File
  /** 上传进度 */
  percent: number
}

export interface UploadProps{
  /** 上传地址 */
  action: string;
  /** 上传成功的回调 */
  onSuccess?: (data: any, file: UploadFile) => void;
  /** 上传失败的回调 */
  onError?: (err: any, file: UploadFile) => void;
  /** 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 是否支持多选文件 */
  multiple?: boolean;
  /** 接受上传的文件类型 */
  accept?: string;
  /** 上传文件改变时的状态，上传完成、失败都会调用这个函数。 */
  onChange?: (file: UploadFile) => void;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击移除文件时的回调 */
  onRemove?: (file: UploadFile) => void;
  /** 设置上传的请求头部 */
  headers?: object;
  /** 发到后台的文件参数名 */
  name?: string;
  /** 上传请求时是否携带 cookie */
  withCredentials?: boolean
  /** 上传所需额外参数 */
  data?: object;
  /** 是否使用拖拽上传 */
  drag?: boolean;
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action, 
    onSuccess, 
    onError, 
    beforeUpload, 
    onChange, 
    onRemove, 
    style, 
    headers,
    name,
    withCredentials,
    data,
    drag,
    children,
    ...restProps
  } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  
  const handleClick = () => {
    if(fileInputRef.current){
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(!files) return;
    handleUploadPrev(files)
  }

  const handleUploadPrev = (files: FileList) => {
    const filesArr = Array.from(files);
    filesArr.forEach((file) => {
      if(!beforeUpload){
        handleUploadFiles(file)
      }else{
        const res = beforeUpload(file);
        if(res instanceof Promise){
          res.then(newFile => {
            handleUploadFiles(newFile)
          })
        }else if(res){
          handleUploadFiles(file)
        }
      }
    })
    if(fileInputRef.current){
      fileInputRef.current.value = ""
    }
  }

  const updateFileList = (targetFile: UploadFile) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if(file.uid === targetFile.uid){
          return targetFile
        }else{
          return file;
        }
      })
    })
  }

  const handleUploadFiles = (file: File) => {
    const tempFile: UploadFile = {
      uid: Date.now() + 'file',
      name: file.name,
      size: file.size,
      percent: 0,
      rawInfo: file,
      status: "uploading"
    }
    setFileList(preFileList => {
      return [tempFile, ...preFileList]
    })
    const formData = new FormData();
    formData.append(name || 'file', file);
    data && Object.keys(data).forEach(key => formData.append(key, data[key]))
    axios.post(action, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers
      },
      withCredentials,
      onUploadProgress(e){
        const percentage = Math.round((e.loaded*100)/e.total) || 0
        if(percentage < 100){
          updateFileList({...tempFile, percent: percentage})
        }
      }
    }).then(res => {
      const targetFile: UploadFile = {...tempFile, status: "success", percent: 100}
      updateFileList(targetFile)
      onSuccess && onSuccess(res.data, targetFile);
    }).catch(err => {
      const targetFile: UploadFile = {...tempFile, status: "error", percent: 100}
      updateFileList(targetFile)
      onError && onError(err, targetFile);
    }).finally(() => {
      onChange && onChange(tempFile)
    })
  }

  const handleRemoveFile = (file: UploadFile) => {
    setFileList(preFileList => preFileList.filter(item => item.uid !== file.uid));
    onRemove && onRemove(file);
  }

  return (
    <div className={`${prefixClass}-upload-wrapper`} style={style}>
      <div className={`${prefixClass}-upload-main`} onClick={handleClick}>
        {
          drag 
          ? <DragUpload onDropFile={(files) => handleUploadPrev(files)} >{children}</DragUpload>
          : children
        }
      </div>
      <input 
        type="file" 
        style={{display: "none"}}
        onChange={handleFileChange}
        ref={fileInputRef}
        {...restProps}
      />
      <UploadList 
        fileList={fileList}
        onRemove={handleRemoveFile}
      />
    </div>
  )
}

Upload.defaultProps = {
  multiple: false,
  name: 'file',
  withCredentials: false,
  drag: false
}