import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from '../styles/Users.module.css'
import Navbar from '../components/Navbar'

const users = ({getusers}) => {
    const [name, setName] = useState()
    const [user, setUser]= useState()
    const data = () => {
        fetch('/api/hello')
            .then((res) => res.json())
            .then((data) => setName(data.name))
    }
    useEffect(() => {
        data()
    }, [])
    return (
        <div className={styles.container}>
            <Navbar/>
            <div style={{marginLeft:'500px'}}>
               
                <h2 style={{marginTop:'20px'}}>{name}</h2>
            </div>
            <div style={{height:'700px'}}>
                <select className={styles.select}
                
                onChange={(e)=> setUser(e.target.value)}
                > 
                    {getusers.map((user,i)=>(
                        <option key={i}>{user.name}</option>
                    ))}
                </select>
                <p style={{marginLeft:'500px',marginTop:'20px'}}>{user}</p>
            </div>
        </div>
    )
}

export default users

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const getusers = await res.json()
  
    // Pass data to the page via props
    return { props: { getusers } }
  }
  