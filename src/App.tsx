import React, { FC, useState } from 'react'
import {
  Menu,
  MenuItem,
  SubMenu,
  Transition,
  Button,
} from "./components/index"

const App: FC = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="abc" style={{padding: '20px'}}>
      <Button onClick={() => setShow(!show)}>按钮</Button>
      <Transition in={show} timeout={300} animation="scale-left">
        <ul style={{listStyle: 'none'}}>
          <li>asdasdasdasdasdasdasd</li>
          <li>asdasdasdasdasdasdasd</li>
          <li>asdasdasdasdasdasdasd</li>
          <li>asdasdasdasdasdasdasd</li>
          <li>asdasdasdasdasdasdasd</li>
          <Button size="large">按钮</Button>
        </ul>
      </Transition>


    </div>
  )
}

export default App