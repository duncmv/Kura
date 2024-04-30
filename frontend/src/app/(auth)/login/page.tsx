"use client";
import React, { use, useState } from 'react';
import Link from 'next/link';
import { button, input, a, h2, h3, form, formContainer, container} from '../../../components/styleVar';
import { login, getCurrentUser } from '../../../api/auth';
import { useRouter } from 'next/navigation'
import Header from '../../../components/header';

const LoginPage: React.FC = () => {
    const [data, setData] = useState(Object.create(null));
    const router = useRouter();
    const [notexists, setNotExsists] = useState(false);

    // Check if user is already logged in
    getCurrentUser().then(() => {
        setNotExsists(false);
        router.push("/");
    }).catch(() => {
        // Do nothing
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.email || !data.password || !(await login(data.email, data.password))) {
            setNotExsists(true);
        }
    }

    return (
        <>
            <Header/>
            <div className={container}>
                <h2 className={h2 + ' sm:pl-[6.7vw]'}>Welcome</h2>
                <div className={formContainer}>
                    <form onSubmit={handleSubmit} className={form}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input type="email" id='email' name='email' value={data.email} onChange={handleChange} className={input} autoComplete="email" />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input type="password" id='password' name='password' value={data.password} onChange={handleChange} className={input} autoComplete="current-password" />
                        </div>
                        {notexists && <p className='text-red-500'>Email or password is incorrect</p>}
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
        </>
    );
};

export default LoginPage;