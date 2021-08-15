import React, { useEffect, useRef, useState } from "react";
import { Input, InputProps } from "../Input/input";
import classNames from "classnames";
import {useDebounce, useClickAway} from "../../hooks";
import { Select } from "..";
import { SelectItemProps } from "../Select/select"
import { prefixClass } from "../../provider"

export type AutoCompleteDataType<T = {}> = T & SelectItemProps;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'>{
  defaultValue?: string,
  /** 搜索补全项的时候调用，返回展示在页面中的数据数组 */
  onSearch: (value: string) => AutoCompleteDataType[] | Promise<AutoCompleteDataType[]>,
  /** 被选中时调用，参数为选中项 */
  onSelect?(item: SelectItemProps): void,
  /** 自定义渲染下拉项 */
  renderOptions?(item: AutoCompleteDataType): React.ReactElement
}


export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {defaultValue = "", onSearch, onSelect = () => {}, renderOptions, style, className, ...resetProps} = props;
  const [options, setOptions] = useState<AutoCompleteDataType[]>([]);
  // const [selectedIndex, setSelectedIndex] = useState(-1);
  const [val, setVal] = useState<string>(defaultValue);
  const debouncedVal = useDebounce(val, 300);
  const searchFlag = useRef(true);    // 防止重复搜索
  const autoCompleteRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useClickAway(autoCompleteRef, () => {setIsOpen(false)})

  useEffect(() => {
    
    if(debouncedVal && searchFlag.current){
      const res = onSearch(debouncedVal)
      if(res instanceof Promise){
        setLoading(true)
        res.then(data => {
          setOptions(data)
          setLoading(false)
        })
      }else{
        setOptions(res)
      }
      setIsOpen(true)
    }else{
      setOptions([])
      setIsOpen(false)
    }
    // setSelectedIndex(-1);
  }, [debouncedVal])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.trim()
    setVal(v)
    searchFlag.current = true;
  }

  // const handleSelectItem = (item) => {
  //   onSelect(item)
  //   setVal(item.value)
  //   setOptions([])
  //   searchFlag.current = false;
  // }

  // const handleItemIndex = (index: number) => {
  //   if(index < 0) index = 0;
  //   if(index >= options.length){
  //     index = options.length-1;
  //   }
  //   setSelectedIndex(index)
  // }

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   switch(e.key){
  //     case "ArrowUp": handleItemIndex(selectedIndex-1); break;
  //     case "ArrowDown": handleItemIndex(selectedIndex+1); break;
  //     case "Enter": options[selectedIndex] && handleSelectItem(options[selectedIndex]); break;
  //     default: break;
  //   }
  // }

  const handleSelect = (item: SelectItemProps) => {
    onSelect(item)
    setVal(item.value)
    setIsOpen(false)
    searchFlag.current = false;
  }

  const renderDropdown = () => {
    return (
      <Select onSelect={handleSelect} open={isOpen} hiddenInput loading={loading}>
      {
        options.map((item) => {
          return (
            <Select.Option key={item.value} value={item.value}>
              {renderOptions ? renderOptions(item) : item.value}
            </Select.Option>
          )
        })
      }
      </Select>
    )
    // return (
    //   <Transition in={isOpen} timeout={300} animation="scale-top">
    //     <div className="auto-complete-dropdown-wrapper">
    //       <Spin description="loading..." spinning={loading}>
    //         <ul className="auto-complete-dropdown">
    //           {
    //             options.map((item, i) => {
    //               const classesItem = classNames("auto-complete-dropdown-item", {
    //                 "auto-complete-dropdown-item-selected": i === selectedIndex
    //               })
    //               return (
    //                 <li className={classesItem} key={i} onClick={() => handleSelectItem(item)}>
    //                   {renderTemplate(item)}
    //                 </li>
    //               )
    //             })
    //           }
    //         </ul>
    //       </Spin>
    //     </div>
    //   </Transition>
    // )
  }

  const classes = classNames(`${prefixClass}-auto-complete`, className, {})
  return (
    <div className={classes} style={style} ref={autoCompleteRef}>
      <Input 
        value={val} 
        onChange={onChange} 
        // onKeyDown={handleKeyDown} 
        onFocus={() => options.length>0 && setIsOpen(true)}
        {...resetProps} 
      />
      {renderDropdown()}
    </div>
  )
}
