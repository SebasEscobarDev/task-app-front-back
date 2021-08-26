const API_TASKS = 'http://192.168.0.15:3000/tasks'

export const getTasks = async () => {
    const res = await fetch(API_TASKS)
    return await res.json()
}

export const getTask = async (id) => {
    const res = await fetch(`${API_TASKS}/${id}`)
    return await res.json();
}

export const saveTask = async (newTask) => {
    const res = await fetch(API_TASKS, { 
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify(newTask)
    })
    return await res.json()
}

export const deleteTask = async(id) => {
    await fetch(`${API_TASKS}/${id}`, {
        method: 'DELETE',
    })
}

export const updateTask = async (id, newTask) =>{
    const res = await fetch(`${API_TASKS}/${id}`, {
        method: 'PUT',
        headers: {Accept: 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify(newTask)
    })
    return res
}