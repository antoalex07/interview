import { Route, Routes } from 'react-router-dom'
import './App.css'
import Scene1 from './pages/scene1/Scene1'
import Scene2 from './pages/scene2/Scene2'
import Scene3 from './pages/scene3/Scene3'

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path='/scene1' element={<Scene1/>}/>
        <Route path='/scene2' element={<Scene2/>}/>
        <Route path='/scene3' element={<Scene3/>}/>
      </Routes>
    </div>
  )
}

export default App
