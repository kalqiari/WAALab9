import './PostDetails.css';


const PostDetails = (props) => {
    if (props.selectedPost != null) {

        return (


            <div className="PostDetail">

                <h3><u>{props.selectedPost.title}</u> </h3>
                <div>
                    {props.selectedPost.author}
                    <br/>
                    <br/>
                    <div style={{textAlign: "left", paddingLeft: '10px'}}>
                        {props.selectedPost.content}
                    </div>
                    <br/>
                    <div style={{marginBottom: "10px"}}>
                      <a style={{cursor: 'pointer', color: 'red'}} href="#">edit</a> &nbsp;&nbsp;&nbsp;
                      <a style={{cursor: 'pointer', color: 'red'}} href="#">delete</a>
                    </div>
                </div>
            </div>);

    }

else
    return "";
}
export default PostDetails;