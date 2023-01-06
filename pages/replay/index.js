import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../styles/getinquery.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import formatDistanceToNow from "date-fns/formatDistanceToNow";



import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { connectToDatabase } from "../../lib/mongodb";
import BackspaceTwoToneIcon from '@mui/icons-material/BackspaceTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

const getinquery = ({ posts }) => {
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handledetail = async (postId) => {
    console.log(postId);
    const data = await fetch(`http://localhost:3000/api/single?_id=${postId}`);
    //router.push(`/api/single?_id=${postId}`)

    const student = await data.json();

    console.log(student);
    router.push(`/replay/detailpage?_id=${postId}`);
  };

  // Delete post
  const deletePost = async (postId) => {
    //change deleting state
    setDeleting(true);

    try {
      // Delete post
      await fetch("/api/studentinfo/", {
        method: "DELETE",
        body: postId,
      });

      // reset the deleting state
      setDeleting(false);
      // reload the page
      return router.push(router.asPath);
    } catch (error) {
      // stop deleting state
      return setDeleting(false);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Students Posts</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <Navbar />
      <Typography variant="h3" textAlign="center" marginTop={5}>
        Get Students Inqueries
      </Typography>

      <div>
        {posts.length === 0 ? (
          <h2>No added posts</h2>
        ) : (
          <ul>
            <Grid
              container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {posts.map((post, i) => (
                // <PostCard post={post} key={i} />
                <Grid  key={i} xs={12} sm={12} md={6} lg={4}>
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
                        <Typography variant="body2" color="#083AA9">
                        <strong>Inquery: </strong>{post.stinquery}
                          <br/>
                          <strong>Replay: </strong> {post.streplay}
                          <br />
                          {formatDistanceToNow(new Date(post.createdAt), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </CardContent>
                    </Link>
                    <CardActions>
                      <Button onClick={() => handledetail(post["_id"])}>
                        <InfoTwoToneIcon />
                      </Button>
                      <Button onClick={() => deletePost(post["_id"])}>
                        <BackspaceTwoToneIcon/>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </ul>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default getinquery;

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const data = await db.collection("student_inquery").find({}).toArray();
  const posts = JSON.parse(JSON.stringify(data));
  console.log({ posts });
  return {
    props: {
      posts: posts,
    },
  };
}
