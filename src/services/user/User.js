import fetch from 'fetch'

export const apiUrl = `http://localhost:3001/user`

export const createUser = (userObject) => {
  return fetch(`${apiUrl}`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //make sure to serialize your JSON body
    body: JSON.stringify({
      user: userObject
    })
  })
}

export const getUser = (userId) => {
  return fetch(`${apiUrl}`, {
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //make sure to serialize your JSON body
    body: JSON.stringify({
      user: userId
    })
  })

}

export const editUser = (userObject) => {
  return fetch(`${apiUrl}`, {
    method: "put",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //make sure to serialize your JSON body
    body: JSON.stringify({
      user: userObject
    })
  })

}

export const deleteUser = (userId) => {
  return fetch(`${apiUrl}`, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //make sure to serialize your JSON body
    body: JSON.stringify({
      user: userId
    })
  })

}

export const createAddress = (userId, address) => {
  return fetch(`${apiUrl}`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //make sure to serialize your JSON body
    body: JSON.stringify({
      user: userId,
      address: address
    })
  })

}

export const getAddress = (userId) => {
  return fetch(`${apiUrl}`, {
    method: "get",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //make sure to serialize your JSON body
    body: JSON.stringify({
      user: userId
    })
  })

}

export const deleteAddress = (userId, address) => {
  return fetch(`${apiUrl}`, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //make sure to serialize your JSON body
    body: JSON.stringify({
      user: userId,
      address: address
    })
  })

}
