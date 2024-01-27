import React, {SyntheticEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);


   const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/"/>
    }

    return (
        <form onSubmit={submit}>
            <h1>Please sign in</h1>
            <input type="email" placeholder="Email address" required 
                onChange={e => setEmail(e.target.value)}/>

            <input type="password" placeholder="Password" required 
                onChange={e => setPassword(e.target.value)}/>
            
            <button type="submit">Sign in</button>
        </form>
    );
};

export default Login;