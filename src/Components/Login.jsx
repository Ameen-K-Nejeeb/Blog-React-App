import React, { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'


const Login = () => {

    const [email, setEmail ] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful');
        } catch(error){
            alert(error.message)
        }
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                placeholder='Email' />
            <input type="password" value={pasword} onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter Password' />
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login
