import React from 'react'
import { connectToDatabase } from '../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;

const index = ({posts}) => {
  return (
    <div>
        {posts.map((post,i)=>(
            <div key={i}>
            <h2>{post.stname}</h2>
            
            </div>
        ))}
    </div>
  )
}

export default index

export async function getServerSideProps(context) {
    
    
    const {db} = await connectToDatabase()
    const data = await db.collection('student_inquery').find({}).toArray();
    const posts = JSON.parse(JSON.stringify(data));
    console.log({posts})
    return {
     props: {
         posts:posts
     }
    }
 }
 

