import './PostDetails.css';
import {useEffect, useState} from "react";
import axios from "axios";


const PostDetails = (props) => {

    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(
        () => {
            if (props.selectedId) {
                axios.get("http://localhost:8080/api/v1/posts/" + props.selectedId)
                    .then((response) => {
                        setSelectedPost(response.data);
                    }).catch(error => {
                    console.log(error.message);
                })
            }
        }, [props.selectedId]
    )
    if (selectedPost != null) {

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

                        >
                            delete
                        </button>
                    </div>
                </div>
            </div>);

    } else
        return "";
}
export default PostDetails;