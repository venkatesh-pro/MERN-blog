import React, { useEffect, useState, useContext, Component } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Context } from '../../context/index'
import styles from './createArticle.module.css'
import LayOut from '../../component/LayOut'
import { useToasts } from 'react-toast-notifications'
const index = () => {
  const { addToast } = useToasts()
  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  const [title, setTitle] = useState('')
  const [markdown, setMarkdown] = useState('')
  const [isDisable, setIsDisable] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      setIsDisable(true)
      const token = window.localStorage.getItem('user')
        ? JSON.parse(window.localStorage.getItem('user'))
        : ''
      const config = {
        headers: {
          authorization: `Bearer ${token.token}`,
        },
      }
      const parentId = router && router.query && router.query.id
      const { data } = await axios.post(
        'https://venkatesh-blog.herokuapp.com/createArticle',
        {
          title,
          markdown,
          parentId,
        },
        config
      )
      setIsDisable(false)
      addToast('Success', { appearance: 'success' })
      if (data) {
        router.push(`/${router && router.query && router.query.id}`)
      }
    } catch (error) {
      setIsDisable(false)
      console.log(error.response)
      addToast(error.response.data.message, { appearance: 'error' })
    }
  }

  return (
    <div>
      {user && user.user && user.user.role && user.user.role.includes('ADMIN') && (
        <LayOut>
          <div className={styles.container}>
            <input
              type='text'
              placeholder='Enter the title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>

            <textarea
              placeholder='Enter the Markdown'
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            ></textarea>
            <button disabled={isDisable} type='submit' onClick={handleSubmit}>
              submit
            </button>
          </div>
        </LayOut>
      )}
    </div>
  )
}

export default index
