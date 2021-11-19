import React, { useEffect, useState, useContext } from 'react'
import styles from './login.module.css'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Context } from '../../context/index'
import LayOut from '../../component/LayOut'
import { useToasts } from 'react-toast-notifications'

const Login = () => {
  const { addToast } = useToasts()

  // state
  const [isDisable, setIsDisable] = useState(false)

  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  // router
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    try {
      setIsDisable(true)

      e.preventDefault()
      const { data } = await axios.post(
        'https://venkatesh-blog.herokuapp.com/login',
        {
          email,
          password,
        }
      )
      dispatch({ type: 'LOGIN', payload: data })
      window.localStorage.setItem('user', JSON.stringify(data))
      setIsDisable(false)
      addToast('Success', { appearance: 'success' })

      router.push('/')
    } catch (error) {
      setIsDisable(false)
      console.log(error.response)
      addToast(error.response.data, { appearance: 'error' })
    }
  }

  useEffect(() => {
    if (user && user.user) {
      router.push('/')
    }
  }, [user])
  return (
    <LayOut>
      <div className={styles.container}>
        <div>
          <h3>LOGIN</h3>
          <form>
            <div>
              <input
                type='text'
                value={email}
                placeholder='Enter Your Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type='password'
                value={password}
                placeholder='Enter Your Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button disabled={isDisable} onClick={handleSubmit}>
                LOGIN
              </button>
            </div>
            <div>
              <p>
                Not have an account,
                <Link href='/user/signup'>Create</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </LayOut>
  )
}

export default Login
