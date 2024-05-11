import { useEffect, useState } from "react";
import crypto from 'crypto';
import axios from 'axios';

/**
 * Logs in a user with the provided email and password.
 * 
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns True if login is successful, otherwise null.
 */
export default async function login(email: string, password: string) {
    // initialize the email and password before checking
    email = email.toLocaleLowerCase();
    password = crypto.createHash('md5').update(password).digest('hex');
    
    return (await axios.post('http://18.207.112.170/api/v1/login', { email, password }).then((res) => {
        if (res.data.id) {
            sessionStorage.setItem('user', JSON.stringify(res.data.id));
            return true;
        }
    }).catch((e) => {
        return null;
    }));
}


/**
 * Logs out the current user.
 */
function logout() {
    sessionStorage.removeItem('user');
    window.location.reload();
}


/**
 * Get a user by their id.
 * 
 * @param id - The id of the user.
 * @returns The user object if found, otherwise null.
 */
async function getUserById(id: string) {
    // if it is a user then fetch the user's data, if not, fetch the institution's data
    try {
        let req = fetch(`http://18.207.112.170/api/v1/users/${id}`);
        let res = await req;

        if (!res.ok) {
            req = fetch(`http://18.207.112.170/api/v1/institutions/${id}`);
            res = await req;
        }

        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.error(error);
    }

    return null;
}


/**
 * Get the currently logged in user.
 * 
 * @returns The user object if found, otherwise throughs an error.
 */
async function getCurrentUser() {
    let userId = sessionStorage.getItem('user') ?? '';
    if (userId) {
        userId = JSON.parse(userId);
        return getUserById(userId);
    }
    throw new Error('User not found');
}


/**
 * Retrieves the user data from the server.
 * @returns The user data.
 */
function GetUserData() {
    const [userData, setUserData] = useState(Object.create(null));

    useEffect(() => {
        getCurrentUser().then((user) => {
            if (user) {
                setUserData(user);
            }
        }).catch((e) => {
            setUserData(null);
        });
    }, []);

    return userData;
}

/**
 * Signs up a user by sending a POST request to the signup API endpoint.
 * 
 * @param {any} data - The data to be sent in the request body.
 * @returns {Promise<boolean|null>} A promise that resolves to `true` if the signup is successful, `null` otherwise.
 */
async function signup(data: any): Promise<boolean|null> {
    return (await axios.post('http://18.207.112.170/api/v1/signup', data).then((res) => {
        sessionStorage.setItem('user', JSON.stringify(res.data.id));
        return true;
    }).catch((e) => {
        return null;
    }));
}

export { login, logout, getCurrentUser, GetUserData, signup, getUserById};
