import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Trending () {
    
    const [tracks, setTracks] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [search, setSearch] = useState ()
    const [apiResponse, setApiResponse] = useState([]) 
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        const getTracks = async () => {
            try {
                // setting the URL to search track 
                const url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=${process.env.REACT_APP_API_KEY}&format=json`

                // setting the search result as a constant
                const response = await axios.get(url)
                console.log(response.data.results.trackmatches)
            } catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
            }
        }
    }
    getTracks()
}, [search])

const handleSubmit = e => {
    e.preventDefault()
    setSearch(inputValue)
}

    return (
        <div>
            <h1>Trending Page</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="input">Search:</label>
                <input 
                    type='text'
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />

                <button type='submit'>Search</button>
            </form>
        </div>
    )
}