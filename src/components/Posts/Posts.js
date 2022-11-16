import * as React from "react";
import Post from "../Post/Post";


const Posts = (props) => {

    const posts = props.posts.map(post => {
        return <Post
            title={post.title}
            author={post.author}
            id={post.id}
            key={post.id}
            setSelected={props.setSelected}

        />
    });
    return posts;
}

export default Posts;