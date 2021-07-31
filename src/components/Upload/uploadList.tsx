import React from "react";
import {UploadFile} from "./upload"
import {Link, Delete, Caution, LoadingOne, Success} from "@icon-park/react"
import {Icon, Progress} from ".."

interface UploadListProps {
  fileList: UploadFile[];
  onRemove?: (file: UploadFile) => void
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const {fileList, onRemove} = props;

  return (
    <ul className="upload-list">
      {
        fileList.map((item) => {
          return (
            <li className={`upload-list-item upload-list-item-status-${item.status}`} key={item.uid}>
              <div style={{display: "flex"}}>
                <Icon IconOrigin={Link} />
                <span className="upload-list-item-name">{item.name}</span>
                <span className="upload-list-item-status">
                  {item.status === "uploading" && <Icon IconOrigin={LoadingOne} />}
                  {item.status === "error" && <Icon IconOrigin={Caution} />}
                  {item.status === "success" && <Icon IconOrigin={Success} />}
                </span>
                <span className="upload-list-item-delete" onClick={() => onRemove && onRemove(item)}>
                  <Icon IconOrigin={Delete} design="danger"/>
                </span>
              </div>
              {item.status === "uploading" && <Progress percent={item.percent} showInfo/>}
            </li>
          )
        })
      }
    </ul>
  )
}

export default UploadList;