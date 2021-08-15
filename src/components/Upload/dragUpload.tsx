import React, { DragEvent, useState } from "react";
import classNames from "classnames";
import { prefixClass } from "../../provider"

export interface DragUploadProps {
  onDropFile: (files: FileList) => void
}

const DragUpload: React.FC<DragUploadProps> = (props) => {
  const {onDropFile, children} = props
  const [isDraged, setIsDraged] = useState(false)

  const handleDrag = (e: DragEvent<HTMLDivElement>, flag: boolean) => {
    e.preventDefault()
    setIsDraged(flag)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    onDropFile(e.dataTransfer.files)
  }

  const classes = classNames(`${prefixClass}-upload-drap`, {
    [`${prefixClass}-upload-drap-actived`]: isDraged
  })

  return (
    <div 
      className={classes} 
      onDragLeave={(e) => handleDrag(e, false)} 
      onDragOver={(e) => handleDrag(e, true)} 
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default DragUpload;