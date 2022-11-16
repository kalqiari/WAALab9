import Posts from "../components/Posts/Posts";
import React, {useRef, useState} from "react";
import PostDetails from "../components/PostDetails/PostDetails";


export default function Dashboard() {
    const [selectedState, setSelectedState] = useState(111);
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
            <PostDetails  selectedPost= { postsState.find(e => e.id === selectedState)} />
            <div>
            </div>
        </div>

    </React.Fragment>
    );
}