import { Typography } from "@mui/material";
import  Button  from "@mui/material/Button";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "@fontsource/roboto/400.css";
import styles from "../styles/SearchByname.module.css";

const secondtry = ({}) => {
  const [stname, setstName] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  const handlesearch = async (e) => {
    e.preventDefault();
    //alert('wait')
    const response = await fetch(`/api/single?stname=${stname}`);
    const data = await response.json();
    const posts = JSON.parse(JSON.stringify(data.message));
    setPosts(posts);
    console.log(data.message);
  };
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.title}>
          <Typography
            variant="h2"
            textAlign="center"
            sx={{ fontFamily: "Anton", fontSize: "50px" }}
          >
            Students
          </Typography>
        </div>
        <div className={styles.formdev}>
          <form>
            <input
              type="text"
              onChange={(e) => setstName(e.target.value)}
              value={stname}
            />
            <Button variant='contained' onClick={handlesearch}>Search</Button>
          </form>
        </div>
        <div className={styles.searchdata}>
          {posts.map((post, i) => (
            <div key={i}>
              <h2>{post.stname}</h2>
              <p>{post.stclass}</p>
              <p>{post.stinquery}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default secondtry;
