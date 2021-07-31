import React from "react";
import classNames from "classnames";

export interface SpinProps{
  /** 组件大小 */
  size?: "small" | "middle" | "large";
  /** 是否为加载中状态 */
  spinning?: boolean;
  /** 描述文案 */
  description?: string;
  /** 是否作为容器 */
  container?: boolean;
}

export const Spin: React.FC<SpinProps> = (props) => {
  const {size, spinning, description, children} = props;


  const renderSpin = () => {
    const classes = classNames("spin-spinning-wrapper", {
      "spin-spinning-wrapper-actived": spinning,
      "spin-spinning-wrapper-description": description,
      [`spin-spinning-${size}`]: size
    })
    return (
      <div className={classes}>
        <span className="spin-spinning">
          <i className="spin-spinning-item"></i>
          <i className="spin-spinning-item"></i>
          <i className="spin-spinning-item"></i>
          <i className="spin-spinning-item"></i>
          <i className="spin-spinning-item"></i>
          <i className="spin-spinning-item"></i>
          <i className="spin-spinning-item"></i>
          <i className="spin-spinning-item"></i>
          <i className="spin-spinning-item"></i>
          <i className="spin-spinning-item"></i>
        </span>
        {description && <div className="spin-spinning-description">{description}</div>}
      </div>
    )
  }

  return (
    <>
      {
        children
        ? 
        <div className="spin-wrapper">
          {spinning && renderSpin()}
          {
            children &&
            <div className={spinning ? "spin-contain" : ""}>
              {children}
            </div>
          }
        </div>
        :
        (spinning && renderSpin())
      }
    </>
  )
}
Spin.defaultProps = {
  size: "middle",
  spinning: true,
  container: false
}