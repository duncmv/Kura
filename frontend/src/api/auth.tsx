import { useEffect, useState } from "react";
import crypto from 'crypto';
import axios from 'axios';

/**
 * Logs in a user with the provided email and password.
 * 
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns The user object if login is successful, otherwise null.
 */
export default async function login(email: string, password: string) {
    const req = fetch('http://18.207.112.170/api/v1/users');

    const res = await req;

    if (res.ok) {
        password = crypto.createHash('md5').update(password).digest('hex'); // Hash the password before checking
        email = email.toLowerCase(); // Make the email case insensitive
        const data = await res.json();
        const user = data.find((user: any) => user.email === email && user.password === password);
        if (user) { 
            sessionStorage.setItem('user', JSON.stringify(user.id));
            return user;
        }

        throw new Error('Failed to log in');
    }
}


/**
 * Logs out the current user.
 */
function logout() {
    sessionStorage.removeItem('user');
}


/**
 * Get a user by their id.
 * 
 * @param id - The id of the user.
 * @returns The user object if found, otherwise null.
 */
async function getUserById(id: string) {
    const req = fetch(`http://18.207.112.170/api/v1/users/${id}`);

    const res = await req;

    if (res.ok) {
        return await res.json();
    }
}


/**
 * Get the currently logged in user.
 * 
 * @returns The user object if found, otherwise null.
 */
async function getCurrentUser() {
    let userId = sessionStorage.getItem('user') ?? '';
    if (userId) {
        userId = JSON.parse(userId);
        return getUserById(userId);
    }
    throw new Error('User not found');
}


function getUserData() {
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

function signup(data: any) {
    axios.post('http://18.207.112.170/api/v1/signup', data).then((res) => {
        sessionStorage.setItem('user', JSON.stringify(res.data.id));
        window.location.reload();
    }).catch((e) => {
        alert('Failed to sign up'); // TODO: Better error handling
        console.log(e);
    });
}

export { login, logout, getCurrentUser, getUserData, signup};
