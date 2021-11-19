import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Context } from '../context/index'
import LayOut from '../component/LayOut'
import { AddCircle, ThumbUp, AccessTimeRounded } from '@material-ui/icons'
import styles from './allArticle.module.css'

const ds = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  const [allArticle, setAllArticle] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true)
      const { data } = await axios.get(
        `https://venkatesh-blog.herokuapp.com/getRelatedArticleToTheTitle/${
          router && router.query && router.query.id
        }`
      )
      setAllArticle(data)
      setIsLoading(false)
    }
    fetchAllData()
  }, [router && router.query && router.query.id])

  return (
    <LayOut>
      {user &&
      user.user &&
      user.user.role &&
      user.user.role.includes('ADMIN') ? (
        <div className={styles.addButton}>
          <Link
            href={`/createArticle/${router && router.query && router.query.id}`}
          >
            <AddCircle
              className={styles.addButtonIcon}
              style={{ height: '70px', width: ' 70px' }}
            />
          </Link>
        </div>
      ) : (
        <>
          <p className={styles.smallQuotesParaTag}>Don't Waste Your Time</p>
          <div className={styles.addButton}>
            <AccessTimeRounded
              className={styles.addButtonIcon}
              style={{ height: '70px', width: ' 70px' }}
            />
          </div>
        </>
      )}
      <div className={styles.articleContainer}>
        <h1>
          All Topics you want to learn{' '}
          <span>
            <ThumbUp />
          </span>
        </h1>
        {isLoading
          ? 'Loading...'
          : allArticle &&
            allArticle.map((a, i) => {
              return (
                <div key={i} className={styles.articleNameH1}>
                  <h1>
                    <span>
                      <Link href={`/readArticle/${a._id}`}>
                        <a>
                          {i + 1}. {a.title}
                        </a>
                      </Link>
                    </span>
                  </h1>
                </div>
              )
            })}
      </div>
    </LayOut>
  )
}

export default ds
