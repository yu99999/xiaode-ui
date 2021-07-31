import React, { useState, useEffect } from "react";
import {useClickAway} from "./"

export type SelectItemProps<T = {}> = T & {
  value: string;
  key?: string;
  label?: React.ReactNode;
}

interface useSelectProps{
  defaultOpen: boolean,
  isMulti: boolean,
  hoverTrigger: boolean,
  onSelect?: (option: SelectItemProps) => void,
  targetRef?: React.RefObject<HTMLElement>, 
  onChange?: (options: SelectItemProps | SelectItemProps[]) => void,
  onDropdownVisibleChange?: (isOpen: boolean) => void
}


const useSelect = (
  {
    defaultOpen,
    isMulti,
    hoverTrigger,
    onSelect,
    targetRef,
    onChange,
    onDropdownVisibleChange
  }: useSelectProps
) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [values, setValues] = useState<SelectItemProps[]>([])

  targetRef && useClickAway(targetRef, () => {setIsOpen(false)})

  useEffect(() => {
    onDropdownVisibleChange && onDropdownVisibleChange(isOpen)
  }, [isOpen])
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen)
  }
  let timer: any = null;
  const handleHover = (e: React.MouseEvent, flag: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setIsOpen(flag)
    }, 200)
  }
  
  const hoverEvent = hoverTrigger ? {
    onMouseEnter: (e: React.MouseEvent) => {handleHover(e, true)},
    onMouseLeave: (e: React.MouseEvent) => {handleHover(e, false)}
  } : {}

  const clickEvent = hoverTrigger ? {} : {
    onClick: handleClick
  }

  const onChooseItem = (item: SelectItemProps) => {
    onSelect && onSelect(item)
    if(!isMulti){
      setValues([item])
      onChange && onChange(item)
    }else{
      setValues(preValues => {
        const index = preValues.findIndex(cur => cur.key === item.key)
        if(index === -1){
          preValues.push(item)
        }else{
          preValues.splice(index, 1);
        }
        let res = [...preValues]
        onChange && onChange(res)
        return res
      })
    }
    
  }

  return {
    values,
    isOpen,
    setIsOpen,
    clickEvent,
    hoverEvent,
    onChooseItem,
  }
}

export default useSelect;