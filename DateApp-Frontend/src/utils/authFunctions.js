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



export const register = async (user) => {
    console.log(user);
    try {
        const regUser = await axios.post('http://localhost:8000/api/register',
            {
                email: user.email,
                password: user.password,
                username: user.username,
                description: user.description,
                preferences: user.preferences,
                hobbies: user.hobbies,
                interests: user.interests
            })
        // localStorage.setItem('token', regUser.data)
        console.log(regUser);
    }

    catch (err) {
        console.log(err)
    }
}