import React from 'react'
import Link from 'next/link'
import styles from './DropDown.module.css'
const DropDown = ({ name, logOut, user }) => {
  return (
    <div className={styles.dropdown}>
      <p>Hi {name} !</p>
      {user && user.role && user.role.includes('ADMIN') && (
        <Link href='/topicName'>Create Topic </Link>
      )}
      <button onClick={logOut}>Log Out</button>
    </div>
  )
}

export default DropDown
