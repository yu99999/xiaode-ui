import React, { useRef } from "react";
import {OptionProps} from "./option"
import { Input, Icon, Transition, Tag } from "..";
import useSelect, { SelectItemProps } from "../../hooks/useSelect"
import { Down } from "@icon-park/react";

export interface SelectProps{
  style?: React.CSSProperties;
  /** 选择框默认文本 */
  placeholder?: string;
  /** 多选 */
  multiple?: boolean
  /** 是否开启hover触发下拉的行为 */
  hoverTrigger?: boolean
  /** 被选中时调用，参数为选中项 */
  onSelect?: (option: SelectItemProps) => void
  /** 选中的 options 发生修改时 */
  onChange?: (option: SelectItemProps | SelectItemProps[]) => void
}

interface ContextItem{
  values?: SelectItemProps[];
  onChooseItem?: (item: SelectItemProps) => void;
  multiple?: boolean
}

export const SelectContext = React.createContext<ContextItem>({})

export const Select: React.FC<SelectProps> = (props) => {
  const {style, placeholder, multiple = false, hoverTrigger = false, onSelect, onChange, children} = props;
  const selectRef = useRef<HTMLDivElement>(null);

  const {
    values,
    isOpen,
    clickEvent,
    hoverEvent,
    onChooseItem
  } = useSelect({defaultOpen: false, isMulti: multiple, hoverTrigger, onSelect, targetRef: selectRef, onChange})

  const currentContext: ContextItem = {
    values,
    onChooseItem,
    multiple
  }

  const renderChildren = () => {

    return React.Children.map(children, (child) => {
      const childEl = child as React.FunctionComponentElement<OptionProps>
      if(childEl.type.displayName === 'Option'){
        return childEl
      }else{
        console.warn("Select 的 children 必须是 Option")
      }
    })
  }

  const renderMultiple = () => {
    return (
      <div className="select-multiple">
        {
          values.map(item => {
            const onClose = (e: React.MouseEvent) => {
              e.nativeEvent.stopImmediatePropagation();
              e.stopPropagation(); 
              onChooseItem(item)
            }
            return <Tag closable key={item.key} onClose={onClose}>{item.label}</Tag>
          })
        }
      </div>
    )
  }
  
  return (
    <div className="select-option" style={style} ref={selectRef} {...hoverEvent}>
      <div className="select-input" {...clickEvent}>
        <div className="select-input-value">
          {multiple && renderMultiple()}
          <span className="select-input-value-radio">{multiple ? "" : values[0]?.label || values[0]?.value || values[0]?.key || ""}</span>
        </div>
        <Input 
          placeholder={values.length>0 ? "" : placeholder}
          readOnly
          style={{cursor: "pointer"}}
          suffix={<Icon IconOrigin={Down} />}
        />
      </div>
      <Transition in={isOpen} timeout={300} animation="scale-top">
        <ul className="select-option-dropdown">
          <SelectContext.Provider value={currentContext}>
            {renderChildren()}
          </SelectContext.Provider>
        </ul>
      </Transition>
    </div>
  )
}

Select.defaultProps = {
  multiple: false,
  hoverTrigger: false
}