import React, { useContext } from "react";
import classNames from "classnames";
import {SelectContext} from "./select"
import { Icon } from "..";
import { Check } from "@icon-park/react"

export interface OptionProps{
  /** 是否禁用 */
  disabled?: boolean;
  /** 默认根据此属性值进行筛选 */
  value: string;
}

export const Option: React.FC<OptionProps> = (props) => {
  const {disabled, value, children} = props;
  const {values = [], onChooseItem} = useContext(SelectContext)

  const key = value;
  const isSelectedIndex = values.findIndex(item => item.key === key);

  const classes = classNames("select-option-dropdown-item", {
    "select-option-dropdown-item-selected": isSelectedIndex !== -1,
    "select-option-dropdown-item-disabled": disabled,
  })

  const handleChoose = () => {
    !disabled &&
    onChooseItem && 
    onChooseItem({value, key, label: children})
  }
  return (
    <li 
      className={classes} 
      key={value} 
      onClick={handleChoose}
    >
      {children}
      {isSelectedIndex !== -1 ? <Icon IconOrigin={Check} /> : ""}
    </li>
  )
}

Option.displayName = "Option"