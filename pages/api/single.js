// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            return getPosts(req, res);
            
        }
    }
}
// Getting all posts.
async function getPosts(req, res) {
    
    try {
        let { db } = await connectToDatabase();
        let stname = req.query.stname
        let post = await db
            .collection('student_inquery')
            .find({stname: stname})
            .sort({ published: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(post)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}