import { useEffect, useState } from "react"
import axios from 'axios'
import EditPage from "./EditPage";
import { useNavigate } from "react-router-dom" 
import DashboardPage from "./DashboardPage";
function Card(props)
{
    let btnhandler=()=>{
        props.editBtnHandler(props.id);
     }
    return(
        <div >
            <div className="card bg-dark" style={{width:"18rem", height:"25rem" ,color:"white"}}>
    <img className="card-img-top"  src={"http://localhost:3000/images/"+props.photo} style={{width:"200px"}} />
    <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text"> {props.summery} </p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
 
    </div>
</div>
    <div class="card-footer " style={{marginBottom:"1.2rem"}}>
        <div className="input-group mb-2"style={{width:"100%"}}> 
           
            <button className="btn btn-primary" onClick={btnhandler} style={{width:"50%"}} > Edit </button>
            <button className="btn btn-danger" style={{width:"50%"}}> Remove </button>
         
        </div>
    </div>
        </div>
    )
}
function PostCard(props)
{
  let posts= props.posts
  
    return(
<div  style={{display:"flex", flexWrap:"wrap"}}>
{posts.map((post)=><div key={post._id} style={{margin:"2rem"}}>
                             <Card id={post._id} title={post.title} summery = {post.summery}
                                     photo={post.image} editBtnHandler={props.editBtnHandler} />
           
          </div>)}
</div>
    )
}
export default function BlogPosts()
{
    let [posts,setPosts] = useState([]); 
    useEffect(()=>{
        const fetchData = async()=>{
          
            let result = await axios.get('http://localhost:3000/blog')
            .then(res=>{
                setPosts(res.data)
                console.log(res.data)
            })
            .catch(e=>console.log(e))
              
        };
        fetchData();
    },[]);
    let [editMode,setEditMode] = useState(false)
    let [editID,setEditID] = useState();
let postPags =()=>{
    
}
const editBtnHandler=(id)=>{
console.log("parent is called",id)
setEditID(id)
setEditMode(!editMode)

}
return(
    <div>
        {editMode ? <EditPage id={editID}/> :    <PostCard posts={posts} editBtnHandler={editBtnHandler}/> }

    </div>
    )
}