import './PostDetails.css';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Comment from "../Comment/Comment";
import {PostContext} from "../../context/PostContext";


const PostDetails = (props) => {
    const postContext = useContext(PostContext);
    const [selectedPost, setSelectedPost] = useState(null);
     const [postComments, setPostComments] = useState([]);
    useEffect(
        () => {
            if (postContext) {
                axios.get("http://localhost:8080/api/v1/posts/" + postContext)
                    .then((response) => {
                        setSelectedPost(response.data);
                        axios.get("http://localhost:8080/api/v1/posts/" + postContext +"/comments").then(rs => {
                            setPostComments(rs.data);
                        }).catch(error => {
                            console.log(error.message);
                        })


                    }).catch(error => {
                    console.log(error.message);
                })
            }
        }, [postContext]
    )

    const deleteHandler = () => {
        if (postContext) {
            axios.delete("http://localhost:8080/api/v1/posts/" + postContext).then(response => {
                props.setFlagState(!props.flag);
            }).catch(error => {
                console.log(error.message);
            })
        }
    }

    if (postContext && selectedPost) {
        return (
            <div className="PostDetail">

                <h3><u>{selectedPost.title}</u></h3>
                <div>
                    {selectedPost.author}
                    <br/>
                    <br/>
                    <div style={{textAlign: "left", paddingLeft: '10px'}}>
                        {selectedPost.content}
                    </div>
                    <br/>
                    <div style={{marginBottom: "10px"}}>
                        <button
                            type="button"
                            className="link-button"

                        >
                            edit
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button
                            type="button"
                            className="link-button"
                            onClick={deleteHandler}

                        >
                            delete
                        </button>
                        <div style={{ textAlign: "left", marginLeft: '10px', marginTop: '20px'}}>
                            Comments <br />
                            {postComments.map(c => {
                                return <Comment name={c.name} key={c.id} />
                            })}
                        </div>
                    </div>
                </div>
            </div>);

    } else
        return "";

}
export default PostDetails;