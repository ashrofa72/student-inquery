// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../lib/mongodb');

const ObjectId = require('mongodb').ObjectId;

import {useRouter} from 'next/router'


export default async function handler(req, res) {
    
    const  {db} = await connectToDatabase()
    
    
}