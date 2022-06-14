import { useEffect, useState } from "react"
import axios from 'axios'

const login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        axios({
            method: "post",
            url: `http://localhost:3000/users?username=${username}&password=${password}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((response) => {
            console.log(response.status)
        }, (error) => {
            console.log(error)
        })
    }

   
    return(
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
        <input type="text" value={password} onChange={e => setPassword(e.target.value)}></input>
        <input type="submit" value="submit"></input>
        </form>
        </>
    )
}

export default login