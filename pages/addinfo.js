import React, { useState } from 'react'
import styles from '../styles/addinfo.module.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { Typography } from '@mui/material'
import Navbar from '../components/Navbar'
import '@fontsource/roboto/400.css';

const addinfo = () => {
    const [stname, setStname] = useState()
    const [stclass, setStclass] = useState()
    const [stinquery, setStinquery] = useState()
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // fields check
        if (!stname || !stclass || !stinquery) return setError('All fields are required');

        // post structure
        let post = {
            stname,
            stclass,
            stinquery,
            createdAt: new Date().toISOString(),
        };
        // save the post
        let response = await fetch('/api/studentinfo/', {
            method: 'POST',
            body: JSON.stringify(post),
        });
        // get the data
        let data = await response.json();

        if (data.success) {
            // reset the fields
            setStname('');
            setStclass('');
            setStinquery('');
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            return setError(data.message);
        }

    }
    return (
        <div className={styles.container}>
            <Navbar />
            <Typography variant='h4' textAlign='center' marginTop={5} sx={{fontFamily: 'Roboto'}}>Add New Post To School</Typography>
            <div className={styles.formdiv}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {error ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}>{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    ) : null}
                    <TextField 
                    type='text' 
                    required
                    label="student name"
                    onChange={(e) => setStname(e.target.value)} 
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField 
                    required
                    type='text' 
                    label="student Class" 
                    onChange={(e) => setStclass(e.target.value)} 
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField 
                    required
                    type='text' 
                    multiline
                    rows={4} 
                    label='student inquery' 
                    onChange={(e) => setStinquery(e.target.value)} 
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HelpIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button type='submit' variant="contained">Submit</Button>
                </form>
            </div>
            
        </div>
    )
}

export default addinfo