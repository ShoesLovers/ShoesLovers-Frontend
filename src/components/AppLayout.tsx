import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import MyNavBar from './MyNavbar'
import { userProps } from '../helpers/types'
import { useMutation } from '@tanstack/react-query'
import { generateImageAPI } from '../api/auth'
import { useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

export default function AppLayout({
  user,
  setUser,
  isLoggedIn,
  setIsLoggedIn,
}: userProps) {
  const [shoesImage, setShoesImage] = useState<string>('')

  const { mutate: generate, isPending } = useMutation({
    mutationFn: (prompt: string) => generateImageAPI(prompt),
    onSuccess: async data => {
      if (data.length > 0 && data[0].url) {
        setShoesImage(data[0].url)
      }
    },
  })
  const handleClick = async (e: React.MouseEvent) => {
    generate('Shoes')
    e.preventDefault()
  }

  return (
    <div>
      <MyNavBar
        user={user}
        setUser={setUser}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <img src={shoesImage} />
      <button onClick={handleClick} disabled={isPending}>
        Click
      </button>

      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
