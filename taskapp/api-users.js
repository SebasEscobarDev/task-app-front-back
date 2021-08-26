const API_USERS = 'http://192.168.0.15:3000/users'

export const getUsers = async () => {
    const res = await fetch(API_USERS)
    return await res.json()
}

export const getUser = async (id) => {
    const res = await fetch(`${API_USERS}/${id}`)
    return await res.json();
}

export const saveUser = async (newUser) => {
    const res = await fetch(API_USERS, { 
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify(newUser)
    })
    return await res.json()
}

export const deleteUser = async(id) => {
    await fetch(`${API_USERS}/${id}`, {
        method: 'DELETE',
    })
}

export const updateUser = async (id, newUser) =>{
    const res = await fetch(`${API_USERS}/${id}`, {
        method: 'PUT',
        headers: {Accept: 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify(newUser)
    })
    return res
}

export const loginUser = async (user) =>{
    const token = await fetch(`${API_USERS}/login`, {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify(user)
    })
    return token;
}

export const getUserLogin = async (token) => {
    const user = await fetch(`${API_USERS}/getuserlogin`, {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify(token)
    })
    return token;
}