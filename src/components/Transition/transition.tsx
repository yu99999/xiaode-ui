import React from "react";
import {CSSTransition} from 'react-transition-group'
import {CSSTransitionProps} from 'react-transition-group/CSSTransition'

type AnimationName = 'scale-top' | 'scale-bottom' | 'scale-left' | 'scale-right'
interface TransitionProps{
  animation?: AnimationName
}

export const Transition: React.FC<TransitionProps & CSSTransitionProps> = (props) => {
  const {classNames, animation, children, ...resetProps} = props;
  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...resetProps}>
      {children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true
}
