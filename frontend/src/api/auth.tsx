/**
 * Logs in a user with the provided email and password.
 * 
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns The user object if login is successful, otherwise null.
 */
export default async function login(email: string, password: string) {
    const req = fetch('https://661d384ee7b95ad7fa6c94ad.mockapi.io/api/v1/users');

    const res = await req;

    if (res.ok) {
        const data = await res.json();
        const user = data.find((user: any) => user.email === email && user.password === password);
        if (user) { 
            sessionStorage.setItem('user', JSON.stringify(user.id));
            return user;
        }

        return null;
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
    const req = fetch(`https://661d384ee7b95ad7fa6c94ad.mockapi.io/api/v1/users/${id}`);

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


/**
 * Registers a new user.
 * 
 * @param data - The data of the user to register.
 * @returns The user object if registration is successful, otherwise null.
 */
async function register(data: Object) {
    const req = fetch('https://661d384ee7b95ad7fa6c94ad.mockapi.io/api/v1/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const res = await req;

    if (res.ok) {
        return await res.json();
    }
    throw new Error('Failed to register');
}


export { login, logout, getCurrentUser, register};
