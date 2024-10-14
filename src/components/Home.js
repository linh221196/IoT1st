import { Stack } from "react-bootstrap"
import './Home.scss'
import Content from "./Content"
import LogginView from "./LogginView"
const Home= ()=>{

    return(
    <div className="body-container">
      <Stack direction="horizontal" >
        <div className="content-container">
        <Content/>
        </div>
        <div className="loggin-container">
        <LogginView/>
        </div>
      </Stack>
    </div>
    )
}

export default Home