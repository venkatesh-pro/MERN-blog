import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LayOut from '../component/LayOut'
import { Delete } from '@material-ui/icons'
import { useToasts } from 'react-toast-notifications'

import styles from './index.module.css'
const index = () => {
  const { addToast } = useToasts()

  const router = useRouter()

  const [titleData, setTitleData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true)
      const { data } = await axios.get('https://venkatesh-blog.herokuapp.com')
      setTitleData(data)
      setIsLoading(false)
    }
    fetchAllData()
  }, [])

  const handleDelete = async (id, picture) => {
    const { data } = await axios.delete(
      `https://venkatesh-blog.herokuapp.com/topicNameDel/${id}`
    )
    const { data: da } = await axios.post(
      'https://venkatesh-blog.herokuapp.com/image-delete',
      { image: picture }
    )
    addToast('Deleted', { appearance: 'success' })
    window.location.assign('/')
  }
  return (
    <LayOut>
      <div className={styles.container}>
        <h1>Learn New Thing From This Platform</h1>
        {isLoading ? (
          'Loading...'
        ) : (
          <div className={styles.cardContainer}>
            {titleData.map((d) => {
              return (
                <div key={d._id} className={styles.cardContainer2}>
                  <div className={styles.imageContainer}>
                    <img src={d.picture && d.picture.Location} alt={d.title} />
                  </div>
                  <h1 className={styles.infoContainer}>
                    <Link href={`/${d && d._id}`}>{`Learn ${d.title}`}</Link>
                  </h1>
                  <button
                    onClick={() => handleDelete(d._id, d.picture)}
                    className={styles.DeleteButton}
                  >
                    <Delete />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </LayOut>
  )
}

export default index
