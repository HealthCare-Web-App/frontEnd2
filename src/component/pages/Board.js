import Layout from "../common/Layout"
import Posts from "../function/Post"
import axios from "axios";

import { useState, useEffect } from "react"
import Pagination from "../function/Pagination";

const Board=()=>{

    const [posts, setPosts] = useState([]);
    const limit = 15;
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
  

    const fetchAndSetPosts=async()=>{
        try{
            const response = await axios.get("http://localhost:4000/posts")
            setPosts(response.data)
        }
        catch(error){
            console.error(error)
        }
      }
    
      useEffect(()=>{
        fetchAndSetPosts()
      }, []);

    return(
        <>
            <Layout>
                <Posts posts={posts} offset={offset} limit={limit} page={page} setPage={setPage}/>
                <Pagination total={posts.length} limit={limit} page={page} setPage={setPage}/>
            </Layout>
        </>
    )
}



export default Board