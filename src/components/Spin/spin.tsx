import React from "react";
import classNames from "classnames";
import { prefixClass } from "../../provider"

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
    const classes = classNames(`${prefixClass}-spin-spinning-wrapper`, {
      [`${prefixClass}-spin-spinning-wrapper-actived`]: spinning,
      [`${prefixClass}-spin-spinning-wrapper-description`]: description,
      [`${prefixClass}-spin-spinning-${size}`]: size
    })
    return (
      <div className={classes}>
        <span className={`${prefixClass}-spin-spinning`}>
          <i className={`${prefixClass}-spin-spinning-item`}></i>
          <i className={`${prefixClass}-spin-spinning-item`}></i>
          <i className={`${prefixClass}-spin-spinning-item`}></i>
          <i className={`${prefixClass}-spin-spinning-item`}></i>
          <i className={`${prefixClass}-spin-spinning-item`}></i>
          <i className={`${prefixClass}-spin-spinning-item`}></i>
          <i className={`${prefixClass}-spin-spinning-item`}></i>
          <i className={`${prefixClass}-spin-spinning-item`}></i>
          <i className={`${prefixClass}-spin-spinning-item`}></i>
          <i className={`${prefixClass}-spin-spinning-item`}></i>
        </span>
        {description && <div className={`${prefixClass}-spin-spinning-description`}>{description}</div>}
      </div>
    )
  }

  return (
    <>
      {
        children
        ? 
        <div className={`${prefixClass}-spin-wrapper`}>
          {spinning && renderSpin()}
          {
            children &&
            <div className={spinning ? `${prefixClass}-spin-contain` : ""}>
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