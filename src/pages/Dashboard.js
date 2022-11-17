import Posts from "../components/Posts/Posts";
import React, {useEffect, useRef, useState} from "react";
import PostDetails from "../components/PostDetails/PostDetails";
import axios from "axios";
import NewPost from "../components/NewPost/NewPost";


export default function Dashboard() {
    const [selectedState, setSelectedState] = useState(null);
    const [flagState, setFlagState] = useState(1);
    const titleRef = useRef(null);
    const [postsState, setPostsState] = useState(
        [
            {id: 111, title: "Happiness", author: "John", content: "This is the content in the post 111"},
            {id: 112, title: "MIU", author: "Dean", content: "This is the content in the post 112"},
            {id: 113, title: "Enjoy Life", author: "Jasmine", content: "This is the content in the post 113"}
        ]
    );

    const setSelected = (id) => {
        setSelectedState(id);
    }

    const updateFirstPostTitle = () =>
    {
       let posts = [...postsState];
        posts[0].title = titleRef.current.value;
        setPostsState(posts);
    }

    useEffect(
        () => { axios.get("http://localhost:8080/api/v1/posts")
            .then((response) => {
                setPostsState(response.data);
                setSelectedState(null);
            }).catch(error => {
                console.log(error.message);
            }) }, [flagState]

    )

    return( <React.Fragment>
        <div>
            <div className="Post">
                <Posts
                    posts={postsState}
                    setSelected={setSelected}
                />

            </div>
            <br/>
            <div>
                <input type="text" ref={titleRef} style={{ padding: '10px', marginBottom: '10px' }}></input>
                <br/>
                <button onClick={updateFirstPostTitle}>Change Title</button>
            </div>
            <PostDetails  selectedId= {selectedState} flag={flagState} setFlagState= { setFlagState} />
            <div>
                <NewPost flag={flagState} setFlagState= { setFlagState}></NewPost>

            </div>
        </div>

    </React.Fragment>
    );
}