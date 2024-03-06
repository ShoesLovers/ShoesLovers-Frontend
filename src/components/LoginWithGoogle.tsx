import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { LoginWithGoogleAPI } from '../api/auth'
import { UserWithTokens } from '../helpers/types'
import { User } from '../helpers/types'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function LoginWithGoogle({
  setUser,
  setIsLoggedIn,
}: {
  setUser: (user: User) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
}) {
  const navigate = useNavigate()
  const onSuccess = async (response: CredentialResponse) => {
    try {
      const userWithToken: UserWithTokens = await LoginWithGoogleAPI(response)
      const { account: user, accessToken, refreshToken } = userWithToken
      setUser(user)
      setIsLoggedIn(true)

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('accessToken', accessToken)

      toast.success(`Hello ${user.name}! You have successfully logged in 😄`)
      navigate('/myaccount')
    } catch (err) {
      console.log(err)
    }
  }
  const onFailure = () => {
    console.log('Failed to login with Google')
  }
  return <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
}
