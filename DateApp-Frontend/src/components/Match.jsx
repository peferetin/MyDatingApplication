import { jwtDecode } from 'jwt-decode'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';




const Match = () => {
    let navigate = useNavigate()
    const { isLoggedIn } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [matchData, setMatchData] = useState(null)

    // We get the token from the localStorage
    const token = localStorage.getItem('token')
    // We decode this token using our library jwt-decode
    const decodedToken = jwtDecode(token)
    console.log(decodedToken._id)

    // API CALL : to =>>> http:localhost:8000/api/random/user${decodedToken._id}
    const generateMatch = async () => {
        try {
            const createdMatch = await axios.get(`http://localhost:8000/api/random/user/${decodedToken._id}`)
            const getMatchCreated = await axios.get(`http://localhost:8000/api/match/${createdMatch.data._id}`)
            console.log(getMatchCreated)
            setMatchData(getMatchCreated.data)
        }
        catch (err) {
            console.error(err.response.data.error)
            setError(err.response.data.error)
        }
        finally {
            setLoading(false)
        }
    }

    const acceptedMatch = async () => {
        console.log(acceptedMatch);
        const userId = decodedToken._id
        const matchId = matchData._id
        try {
            const match = await axios.put(`http://localhost:8000/api/matches/${userId}/${matchId}`, { status: 'accepted' })
            console.log(match);
            generateMatch()
        }
        catch (err) {
            console.error(err.response.data.error)
            setError(err.response.data.error)
        }
    }

    const declinedMatch = async () => {
        console.log(declinedMatch);
        const userId = decodedToken._id
        const matchId = matchData._id
        try {
            const match = await axios.put(`http://localhost:8000/api/matches/${userId}/${matchId}`, { status: 'declined' })
            console.log(match);
            generateMatch()
        }
        catch (err) {
            console.error(err.response.data.error)
            setError(err.response.data.error)
        }

    }

    useEffect(() => {
        // If isLoggedI, my state coming from my authContext is false I redirect to the home page
        if (!isLoggedIn) {
            return navigate('/')
        }
        if (decodedToken._id) {
            generateMatch()
        }
    }, [])


    console.log(matchData)


    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {matchData && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Card sx={{ width: '40vw', height: '80vh' }}>
                        <p>{matchData.user2.username}</p>
                        <img src='https://images-platform.99static.com/stwk_yXbjUi6CKHxmcY248vtRvA=/31x49:1652x1670/500x500/top/smart/99designs-contests-attachments/101/101032/attachment_101032501' />
                        <p>{matchData.user2.age}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                            <Button onClick={() => { declinedMatch() }} sx={{ mr: '20px', backgroundColor: '#a22522ff', color: 'white' }}>X</Button>
                            <Button onClick={() => { acceptedMatch() }} sx={{ mr: '20px', backgroundColor: '#a8c256ff', color: 'white' }}>V</Button>

                        </div>
                    </Card>
                </div>
            )}

        </>
    )
}



export default Match