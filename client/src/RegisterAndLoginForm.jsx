import React, { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from './UserContext.jsx';
function RegisterAndLoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isloginOrRegister, setIsLoginOrRegister] = useState('register');
    const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);;
    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = isloginOrRegister === 'register' ? 'register' : 'login';
        const { data } = await axios.post(url, { username, password });
        setLoggedInUsername(username);
        setId(data.id);

    }
    return (
        <div className='bg-blue-50 h-screen flex items-center'>
            <form className='w-64 mx-auto mb-12' onSubmit={handleSubmit}>
                <input value={username} onChange={ev => setUsername(ev.target.value)} type='text' placeholder='usrname' className='block  w-full rounded-sm p-2 mb-2 border' />
                <input value={password} onChange={ev => setPassword(ev.target.value)} type='password' placeholder='password' className='block w-full rounded-sm p-2 mb-2 border' />
                <button className='bg-blue-500 text-white block w-full rounded-sm'>
                    {isloginOrRegister === 'register' ? 'Register' : 'Login'}</button>
                {isloginOrRegister === 'register' && (<div className="text-center mt-2">
                    Already a member? <button onClick={() => setIsLoginOrRegister('login')}>Login Here</button>
                </div>)}

                {isloginOrRegister === 'login' && (<div className="text-center mt-2">
                    Don't have an account?  <button onClick={() => setIsLoginOrRegister('register')}>Register </button>
                </div>)}
            </form>
        </div>
    )
}

export default RegisterAndLoginForm;