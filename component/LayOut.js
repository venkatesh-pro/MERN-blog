import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar/Navbar'
// import hljs from 'highlight.js'
const LayOut = (props) => {
  return (
    <div>
      <Head>
        <link rel='icon' type='image/x-icon' href='/image/logo.svg'></link>
        <title>Venkatesh Blog</title>
      </Head>
      <Navbar />
      <main>{props.children}</main>
    </div>
  )
}

export default LayOut
