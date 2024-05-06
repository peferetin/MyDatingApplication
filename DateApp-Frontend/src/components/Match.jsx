import { jwtDecode } from 'jwt-decode'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'


const Match = () => {
    let navigate = useNavigate()
    const { isLoggedIn } = useContext(AuthContext)
    console.log(isLoggedIn)



    useEffect(() => {
        if (!isLoggedIn) {
            return navigate('/')
        }
    }, [])

    // const token = localStorage.getItem('token')
    // const decodedToken = jwtDecode(token)
    // console.log(decodedToken)


    // API CALL : to =>>> http:localhost:8000/api/random/user${decodedToken._id}

    return (
        <>
            <h1>Hello Match </h1>

        </>
    )
}



export default Match