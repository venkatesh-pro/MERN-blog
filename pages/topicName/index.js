import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Resizer from 'react-image-file-resizer'
import LayOut from '../../component/LayOut'
import styles from './topicName.module.css'
import { Publish } from '@material-ui/icons'
import { useToasts } from 'react-toast-notifications'

const index = () => {
  const { addToast } = useToasts()

  const [inputValue, setInputValue] = useState('')
  const [preview, setPreview] = useState('')
  const [image, setImage] = useState('')
  const [isDisable, setIsDisable] = useState(false)

  const router = useRouter()
  const handleSubmit = async () => {
    try {
      setIsDisable(true)

      const { data } = await axios.post(
        'https://venkatesh-blog.herokuapp.com/',
        {
          title: inputValue,
          picture: image,
        }
      )
      setIsDisable(false)

      addToast('Success', { appearance: 'success' })

      router.push(`/${data && data._id}`)
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
        <input
          type='text'
          placeholder='Enter the name of the course'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
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
        <button disabled={isDisable} type='submit' onClick={handleSubmit}>
          submit
        </button>
      </div>
    </LayOut>
  )
}

export default index
