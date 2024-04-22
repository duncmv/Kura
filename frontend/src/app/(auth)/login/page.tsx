"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { button, input, a, h2, h3, form, formContainer, container} from '../../../components/styleVar';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Email:', email);
        // TODO: Implement login
    };

    return (
        <div className={container}>
            <h2 className={h2 + ' sm:pl-[6.7vw]'}>Welcome</h2>
            <div className={formContainer}>
                <form onSubmit={handleSubmit} className={form}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type="email" id='email' value={email} onChange={handleEmailChange} className={input} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type="password" id='password' value={password} onChange={handlePasswordChange} className={input} />
                    </div>
                    <button type='submit' className={button}>
                        Login
                    </button>
                    <Link className={a + ' block w-[150px]'} href='/forgot-password'>Forgot Password?</Link>
                    <p>Don't have an account? <Link className={a} href='/register'>Sign up</Link></p>
                </form>
                <div className='hidden sm:block py-10 px-3 border-2 shadow-md basis-1/3'>
                    <h3 className={h3}>Privacy Terms</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad inventore, nihil minus repudiandae aut architecto laborum obcaecati saepe ipsum, ratione quia reprehenderit accusamus similique eaque voluptas enim consequuntur eius tempore.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;