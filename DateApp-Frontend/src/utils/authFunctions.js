import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const login = async (user) => {
    try {
        const logUser = await axios.post('http://localhost:8000/api/login',
            {
                email: user.email,
                password: user.password,
            })
        localStorage.setItem('token', logUser.data)

    }
    catch (err) {
        console.log(err)
    }
}

