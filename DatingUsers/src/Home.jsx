import './App.css'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'



let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    auburn: theme.palette.augmentColor({
      color: {
        main: '#a22522ff',
      },
      name: 'auburn',
    }),
  },
});


function App() {
  let navigate = useNavigate()

  return (
    <ThemeProvider theme={theme}>
      <div className='home-container'>
        <div className='button-container'>
          <Button variant="contained" color='auburn' sx={{ mr: '20px', backgroundColor: '#a8c256ff' }} onClick={() => navigate('/login')}  >
            Sign IN
          </Button>
          <Button variant="contained" color='auburn' onClick={() => navigate('/register')}>
            Sign UP
          </Button>

        </div>


      </div>
    </ThemeProvider>
  )
}

export default App
