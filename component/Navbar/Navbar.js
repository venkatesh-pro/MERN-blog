import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'
import { Context } from '../../context/index'
import DropDown from '../DropDown/DropDown'
const Navbar = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  const [profileImageClick, setProfileImageClick] = useState(false)

  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT', payload: null })
    window.localStorage.clear('user')
  }
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.logoContainer}>
          <Link href='/'>
            <img src='/image/logo.svg' alt='Logo' />
          </Link>
        </div>
        <ul>
          {user ? (
            <>
              <li onClick={() => setProfileImageClick(!profileImageClick)}>
                <img
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                  }}
                  src={`${
                    user.user &&
                    user.user.profilePic &&
                    user.user.profilePic.Location
                  }`}
                ></img>
              </li>
            </>
          ) : (
            <li style={{ marginRight: '30px' }}>
              <Link href='/user/login'>Log In</Link>
            </li>
          )}
        </ul>
      </div>
      {user && (
        <div className={styles.DropDownInNavbar}>
          {profileImageClick && (
            <DropDown
              user={user.user}
              name={user.user && user.user.name}
              logOut={handleLogOut}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar
