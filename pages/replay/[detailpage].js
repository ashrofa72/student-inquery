import { useRouter } from "next/router";
import React, { useState } from "react";
import { connectToDatabase } from "../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId;
import Navbar from "../../components/Navbar";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import styles from "../../styles/detailpage.module.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "next/link";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import ForwardToInboxTwoToneIcon from "@mui/icons-material/ForwardToInboxTwoTone";

const firstpage = ({ posts }) => {
  const [streplay, setstreplay] = useState("");
  const [student, setStudent] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleReplay = async (postId) => {
    let replay = {
      streplay,
    };
    let res = await fetch(`/api/studentinfo?streplay=${streplay}`, {
      method: "PUT",
      body: postId,
    });
    // get the data
    let data = await res.json();

    if (data.success) {
      // reset the fields
      setstreplay("");
      router.push(router.asPath);

      // set the message
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div>
        <div className={styles.header}>
          <Typography variant="h5" textAlign="center" color="red">
            Student Id:
          </Typography>
          <Typography variant="h5" textAlign="center">
            ({router.query._id})
          </Typography>
        </div>
        <div className={styles.formdev}>
          <form>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                
              }}
            >
              {message ? (
              <div className={styles.formItem}>
                <h3 className={styles.message} mb='10px'>{message}</h3>
              </div>
            ) : null}
              <TextField
                type="text"
                multiline
                rows={4}
                fullWidth
                label="Replay To Student"
                onChange={(e) => setstreplay(e.target.value)}
              />
            </Box>
            <p>{streplay}</p>
            
          </form>
        </div>
      </div>
      <div>
        {posts.length === 0 ? (
          <h2>No added posts</h2>
        ) : (
          <ul>
            <Grid
              container
              columns={{ xs: 2, sm: 6, md: 12}}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {posts.map((post, i) => (
                // <PostCard post={post} key={i} />
                <Grid xs={2} sm={2} md={4} lg={6} key={i} rowSpacing={1}>
                  <Card
                    sx={{
                      minWidth: 400,
                      marginBottom: 3,
                      marginRight: 5,
                      marginLeft: 5,
                      marginTop: 5,
                      background: "#F8EDE3",
                      color: "white",
                      borderRadius: 7,
                    }}
                    key={i}
                  >
                    <Link href={`/api/searchById?_id=${post._id}`}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="#85586F"
                          gutterBottom
                        >
                          Student Details
                        </Typography>
                        <Typography
                          variant="h5"
                          component="div"
                          color="#85586F"
                        >
                          Student Name: {post.stname}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="#85586F">
                          Student Grade: {post.stclass}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="#85586F">
                          Student Id: {post._id}
                        </Typography>
                        <Typography variant="h6" color="#083AA9">
                          <strong>Inquery: </strong> {post.stinquery}
                          <br />
                          {formatDistanceToNow(new Date(post.createdAt), {
                            addSuffix: true,
                          })}
                        </Typography>
                        <Typography variant="h6" color="red">
                          <strong>Replay: </strong> {post.streplay}
                        </Typography>
                      </CardContent>
                    </Link>
                    <CardActions>
                      <Button onClick={() => handleReplay(post["_id"])}>
                        <ForwardToInboxTwoToneIcon />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </ul>
        )}
      </div>
    </div>
  );
};

export default firstpage;

export async function getServerSideProps(context) {
  const _id = context.query._id;
  const { db } = await connectToDatabase();
  const data = await db
    .collection("student_inquery")
    .find({ _id: ObjectId(_id) })
    .toArray();
  const posts = JSON.parse(JSON.stringify(data));
  console.log({ posts });
  return {
    props: {
      posts: posts,
    },
  };
}
