import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Context } from '../../context/index'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import styles from './readArticle.module.css'
import { Delete, Edit, Whatshot } from '@material-ui/icons'
import { useToasts } from 'react-toast-notifications'
import LayOut from '../../component/LayOut'

const ReadArticle = () => {
  const { addToast } = useToasts()

  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  const [articleData, setArticleData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const routerId = router && router.query && router.query.id
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true)

      const { data } = await axios.get(
        `https://venkatesh-blog.herokuapp.com/getCurrentArticle/${
          router && router.query && router.query.id
        }`
      )
      setArticleData(data)
      setIsLoading(false)
    }
    fetchAllData()
  }, [routerId])

  const handleDelete = async (id) => {
    let out = window.confirm('Are you sure')

    if (out) {
      const { data } = await axios.delete(
        `https://venkatesh-blog.herokuapp.com/${id}`
      )
      addToast('Deleted', { appearance: 'success' })
      router.push('/')
    }
  }
  return (
    <div className={styles.container}>
      <LayOut>
        {user &&
          user.user &&
          user.user.role &&
          user.user.role.includes('ADMIN') && (
            <div className={styles.editButton}>
              <Link
                href={`/readArticle/edit/${
                  router && router.query && router.query.id
                }`}
              >
                <Edit
                  className={styles.editButtonIcon}
                  style={{
                    height: '70px',
                    borderRadius: '50%',
                    background: 'red',
                    width: ' 70px',
                  }}
                />
              </Link>
              <button
                onClick={() =>
                  handleDelete(router && router.query && router.query.id)
                }
              >
                <Delete />
              </button>
            </div>
          )}
        {isLoading ? (
          'Loading...'
        ) : (
          <div className={styles.blog_container}>
            <div className={styles.my_title}>
              <h1>
                {' '}
                <Whatshot style={{ marginRight: '10px' }} />{' '}
                {articleData && articleData.title}
              </h1>
            </div>
            <div className={styles.markdownContainer}>
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        language={match[1]}
                        PreTag='div'
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {articleData && articleData.markdown}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </LayOut>
    </div>
  )
}

export default ReadArticle
