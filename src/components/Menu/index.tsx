import { Menu as MenuMain} from "./menu"
import { SubMenu } from "./submenu"
import { MenuItem } from "./menuItem"

export type MenuComponent = typeof MenuMain & {
  Item: typeof MenuItem,
  SubMenu: typeof SubMenu
}

const Menu = MenuMain as MenuComponent;

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;

export default Menu;
