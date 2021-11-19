import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Context } from '../../../context/index'
import styles from './edit.module.css'
import { useToasts } from 'react-toast-notifications'
import LayOut from '../../../component/LayOut'
const index = () => {
  const { addToast } = useToasts()

  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  const [articleData, setArticleData] = useState({})
  const [isDisable, setIsDisable] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchAllData = async () => {
      const { data } = await axios.get(
        `https://venkatesh-blog.herokuapp.com/getCurrentArticle/${
          router && router.query && router.query.id
        }`
      )

      setArticleData(data)
      setTitle(data.title)
      setMarkdown(data.markdown)
    }
    fetchAllData()
  }, [router && router.query && router.query.id])

  const [title, setTitle] = useState()
  const [markdown, setMarkdown] = useState()

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

      const { data } = await axios.post(
        `https://venkatesh-blog.herokuapp.com/editCurrentArticle/${
          router && router.query && router.query.id
        }`,
        {
          title,
          markdown,
        },
        config
      )
      setIsDisable(false)
      addToast('success', { appearance: 'success' })

      if (data) {
        router.push(`/readArticle/${router && router.query && router.query.id}`)
      }
    } catch (error) {
      setIsDisable(false)
      console.log(error.response.data.message)
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

            <button type='submit' disabled={isDisable} onClick={handleSubmit}>
              submit
            </button>
          </div>
        </LayOut>
      )}
    </div>
  )
}

export default index
