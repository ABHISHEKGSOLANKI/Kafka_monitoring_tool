import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {

  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
