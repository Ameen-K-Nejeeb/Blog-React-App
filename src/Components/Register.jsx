import React,{ useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Register = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
    <div>
      
    </div>
  )
}

export default Register
