import { connectToDatabase } from '../../lib/mongodb';

function Post({ post,id }) {
  return (
    <>
      <h2>
        {post._id}--{post.stname}
      </h2>
      <p>{post.stinquery}</p>
    </>
  );
}
export default Post;



export async function getServerSideProps(context) {
  let {req} = context
  
  let {_id} =  req
  
  const {db} = await connectToDatabase()
   const data = await fetch(`http://localhost:3000/api/single?_id=${_id}`);
   const post = JSON.parse(JSON.stringify(data));
   console.log({post})
   return {
    props: {
        post:post
    }
   }
    
}
