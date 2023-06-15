import { Route, Routes } from "react-router-dom"
import Welcome from "./components/Welcome"
import ChatBox from "./components/ChatBox"
import ReadyForQuiz from "./components/ReadyForQuiz"

export const URLs = () => {
    return (
      <>
          <Routes>
            <Route path='/login' element={<Welcome/>}/>
            <Route path='/' element={<ChatBox/>}/>
            <Route path='/quiz' element={<ReadyForQuiz/>}/>
          </Routes>
      </>
    )
  }