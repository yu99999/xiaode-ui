import React, { FC, useState } from 'react'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/submenu';
import Transition from './components/Transition/transition';
import Button from './components/Button/button';

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


      {/* <Menu onSelect={(i) => {console.log(i); return 1;}} defalutIndex="55">
        <MenuItem>
          123
        </MenuItem>
        <MenuItem disabled>
          456
        </MenuItem>
        <MenuItem index="55">
          哈哈哈哈
        </MenuItem>
        <SubMenu title="dropdown" index="hhh">
          <MenuItem index="drop1">
            drop1
          </MenuItem>
          <MenuItem>
            drop2
          </MenuItem>
        </SubMenu>
        <MenuItem>
          哈哈哈哈
        </MenuItem>
      </Menu>

      <br /><br /><br /><br /><br />
      
      <Menu mode="vertical" style={{width: 256}} defaultOpenSubMenus={["hhh"]} onSelect={(i) => {console.log(i)}}>
        <MenuItem>
          active
        </MenuItem>
        <SubMenu title="下拉菜单" index="hhh">
          <MenuItem>
            5555
          </MenuItem>
          <MenuItem disabled>
            66
          </MenuItem>
        </SubMenu>
        <MenuItem disabled>
          disabled
        </MenuItem>
        <MenuItem>
          second
        </MenuItem>
      </Menu> */}
    </div>
  )
}

export default App