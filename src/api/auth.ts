import { CredentialResponse } from '@react-oauth/google'
import apiClient from './apiClient'
import { UpdateFormValues } from '../components/UpdateUserForm'
import { User } from '../helpers/types'
import { LoginProps } from '../helpers/types'
import { RegisterProps } from '../helpers/types'

export async function LoginAPI({ email, password }: LoginProps) {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  const data = await response.json()
  return data
}

export async function RegisterAPI({ email, password, name }: RegisterProps) {
  const response = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
      image: 'src/assets/images',
    }),
  })
  const data = await response.json()
  return data
}

export async function LogoutAPI() {
  const refreshToken = localStorage.getItem('refreshToken')
  await fetch('http://localhost:3000/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${refreshToken}`,
    },
  })
}

export async function LoginWithGoogleAPI<User>(credential: CredentialResponse) {
  return new Promise<User>((resolve, reject) => {
    console.log('googleSignin ...')
    apiClient
      .post('/auth/google', credential)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}

export async function UpdateUserAPI(
  id: string,
  accessToken: string,
  updatedUser: UpdateFormValues
) {
  return new Promise<User>((resolve, reject) => {
    console.log('updateUser ...')
    apiClient
      .put(`/account/${id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${accessToken}`,
        },
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}

export async function getUserAPI(id: string, accessToken: string) {
  return new Promise<User>((resolve, reject) => {
    console.log('getUser ...')
    apiClient
      .get(`/account/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${accessToken}`,
        },
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}
