import React, {SyntheticEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';



const Login = (props: { setName: (name: string) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);


   const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();


        setNavigate(true);
        props.setName(content.name);
        props.setName("");
    }

    if (navigate) {
        return <Navigate to="/"/>
    }

    return (
        <form onSubmit={submit} className="login">
            <input type="email" placeholder="Email address" required 
                onChange={e => setEmail(e.target.value)}
            />

            <input type="password" placeholder="Password" required 
                onChange={e => setPassword(e.target.value)}
            />
            
            <button type="submit">Sign in</button>
        </form>
    );
};

export default Login;