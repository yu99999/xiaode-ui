import { Select as SelectMain } from "./select";
import { Option } from "./option";

export type SelectComponent = typeof SelectMain & {
  Option: typeof Option
}

const Select = SelectMain as SelectComponent;
Select.Option = Option

export default Select;