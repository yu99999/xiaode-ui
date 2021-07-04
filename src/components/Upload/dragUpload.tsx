import React, { DragEvent, MouseEvent, useState } from "react";
import classNames from "classnames";

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

  const classes = classNames("drap-upload", {
    "drap-upload-actived": isDraged
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