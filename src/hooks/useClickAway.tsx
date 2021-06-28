import React, { useEffect } from "react";

/**
 * 监听除目标 DOM 对象之外任意一处的点击
 * @param ref Ref 对象
 * @param handler 触发事件的函数
 */
const useClickAway = (ref: React.RefObject<HTMLElement>, handler: Function) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if(!ref.current || ref.current.contains(e.target as HTMLElement))
        return
      handler(e)
    }
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    }
  }, [ref, handler])
}

export default useClickAway;