import React from "react";
import classNames from "classnames";
import { Icon } from "../Icon/icon";
import { CloseSmall } from "@icon-park/react"

export interface TagProps{
  /** 设置标签大小 */
  size?: "large" | "middle" | "small",
  /** 设置标签状态 */
  status?: "primary" | "success" | "danger" | "warning" | "info",
  /** 是否可关闭 */
  closable?: boolean
  /** 关闭 Tag 时触发的事件 */
  onClose?: (e: React.MouseEvent) => void
}

export const Tag: React.FC<TagProps> = (props) => {
  const {size, status, closable, onClose, children} = props;

  const classes = classNames("tag", {
    [`tag-status-${status}`]: status,
    [`tag-size-${size}`]: size,
  })
  return (
    <span className={classes}>
      {children}
      {
        closable && 
        <span className="tag-close" onClick={onClose}>
          <Icon IconOrigin={CloseSmall} />
        </span>
      }
    </span>
  )
}

Tag.defaultProps = {
  size: "middle",
  status: "primary",
  closable: false
}
