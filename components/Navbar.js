import React from 'react'
import Link from 'next/link'
import styles from '../styles/Nav.module.css'

const Navbar = () => {
    return (
        <div  className={styles.container}>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                    <li>
                        <Link href='/users'>Users</Link>
                    </li>
                    <li>
                        <Link href='/addinfo'>AddPost</Link>
                    </li>
                    <li>
                        <Link href='/replay/'>Posts</Link>
                    </li>
                    <li>
                        <Link href='/SearchByname/'>Search</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar