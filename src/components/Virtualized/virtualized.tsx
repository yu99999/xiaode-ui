import React, { FC } from "react";

export interface VirtualizedProps{
  options: []
}

export const Virtualized: FC<VirtualizedProps> = (props) => {
  const {options} = props;
  console.log(options)
  return (
    <div></div>
  )
}