import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import { useRouter } from 'next/router'
import { Context } from '../../context'
import LayOut from '../../component/LayOut'
import styles from './signup.module.css'
import { useToasts } from 'react-toast-notifications'
import { Publish } from '@material-ui/icons'
const signup = () => {
  const { addToast } = useToasts()

  const {
    state: { user },
    dispatch,
  } = useContext(Context)
  // router
  const router = useRouter()

  const [name, setName] = useState('venkat')
  const [email, setEmail] = useState('venakt@g.c')
  const [password, setPassword] = useState('1234')
  const [preview, setPreview] = useState('')
  const [image, setImage] = useState('')
  const [isDisable, setIsDisable] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsDisable(true)

      const { data } = await axios.post(
        'https://venkatesh-blog.herokuapp.com/signup',
        {
          name,
          email,
          password,
          profilePic: image,
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

  const handleImage = async (e) => {
    setIsDisable(true)
    const files = e.target.files[0]
    setPreview(window.URL.createObjectURL(files))
    Resizer.imageFileResizer(files, 720, 500, 'JPEG', 100, 0, async (uri) => {
      try {
        const { data } = await axios.post(
          'https://venkatesh-blog.herokuapp.com/image-upload',
          {
            image: uri,
          }
        )
        setImage(data)
        setIsDisable(false)
        addToast('Image Uploaded', { appearance: 'success' })
      } catch (error) {
        setIsDisable(false)
        addToast(error.response.data, { appearance: 'error' })
      }
    })
  }
  return (
    <LayOut>
      <div className={styles.container}>
        <div>
          <h3>SIGNUP</h3>
          <form>
            <div>
              <label className={styles.fileUploadLabel} htmlFor='fileUpload'>
                Upload Picture
                <Publish />
                <input
                  id='fileUpload'
                  hidden
                  type='file'
                  accept='image/*'
                  onChange={handleImage}
                ></input>
              </label>
              {preview && (
                <img
                  src={preview}
                  width='40px'
                  height='40px'
                  style={{ borderRadius: '50%' }}
                ></img>
              )}
            </div>
            <div>
              <input
                type='text'
                placeholder='Enter your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type='password'
                placeholder='Enter your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button disabled={isDisable} onClick={handleSubmit}>
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayOut>
  )
}

export default signup
