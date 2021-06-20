import { FC } from "react";
import Button from "./components/Button/button";

const App: FC = () => {

  return (
    <div className="abc">
      <Button onClick={() => {console.log(123)}}>按钮</Button>
      <Button size="large" btnType="primary">按钮</Button>
      <Button size="small" btnType="danger">按钮</Button>
      <Button target="_blank" href="https://ant.design/components/button-cn/#API" btnType="link">45</Button>
      <Button disabled>按钮</Button>
      <Button href="https://ant.design/components/button-cn/#API" btnType="link" disabled>45</Button>
    </div>
  )
}

export default App