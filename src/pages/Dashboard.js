import Posts from "../components/Posts/Posts";
import React, {useEffect, useRef, useState} from "react";
import PostDetails from "../components/PostDetails/PostDetails";
import axios from "axios";
import NewPost from "../components/NewPost/NewPost";
import {PostContext} from "../context/PostContext";


export default function Dashboard() {
    const [selectedId, setSelectedId] = useState(null);
    const [flagState, setFlagState] = useState(false);
    const titleRef = useRef(null);
    const [postsState, setPostsState] = useState(
        [
            {id: 111, title: "Happiness", author: "John", content: "This is the content in the post 111"},
            {id: 112, title: "MIU", author: "Dean", content: "This is the content in the post 112"},
            {id: 113, title: "Enjoy Life", author: "Jasmine", content: "This is the content in the post 113"}
        ]
    );

    const setSelected = (id) => {
        setSelectedId(id);
    }

    const updateFirstPostTitle = () => {
        let posts = [...postsState];
        posts[0].title = titleRef.current.value;
        setPostsState(posts);
    }

    useEffect(
        () => {
            axios.get("http://localhost:8080/api/v1/posts")
                .then((response) => {
                    setPostsState(response.data);
                    setSelectedId(null);
                }).catch(error => {
                console.log(error.message);
            })
        }, [flagState]
    )

    return (<React.Fragment>
            <PostContext.Provider value={selectedId}>
                <div>
                    <div className="Post">
                        <Posts
                            posts={postsState}
                            setSelected={setSelected}
                        />

                    </div>
                    <br/>
                    <div>
                        <input type="text" ref={titleRef} style={{padding: '10px', marginBottom: '10px'}}></input>
                        <br/>
                        <button onClick={updateFirstPostTitle}>Change Title</button>
                    </div>
                    <PostDetails flag={flagState} setFlagState={setFlagState}/>
                    <div>
                        <NewPost flag={flagState} setFlagState={setFlagState}></NewPost>

                    </div>
                </div>
            </PostContext.Provider>

        </React.Fragment>
    );
}