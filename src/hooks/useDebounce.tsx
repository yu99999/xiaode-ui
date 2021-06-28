import React, { useEffect, useState } from "react";

/**
 * 防抖 hook
 * @param value 需要防抖的值
 * @param wait 等待时间
 * @returns 防抖结果返回
 */
function useDebounce(value: any, wait = 300){
  const [debouced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value)
    }, wait)

    return () => {
      clearTimeout(timer)
    }
  }, [value]);

  return debouced;
}

export default useDebounce;