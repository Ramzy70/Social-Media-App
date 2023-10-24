import { useState , useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

export default function Feed({username}) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username 
      ? await axios.get("http://localhost:5000/api/posts/profile/" + username) 
      : await axios.get('http://localhost:5000/api/posts/timeline/65369a14d9b8884e3aad4351')
      setPosts(res.data)
    }
    fetchPosts()
  },[])

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
