import Home from './Home.jsx'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'

const DatingRouter = () => {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<p>404 page not found</p>} />
            </Routes>
        </>
    )
}


export default DatingRouter