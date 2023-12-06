import { useState,useEffect } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios'
export default function EditPage(props)
{
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];
    let modules={
        toolbar:toolbarOptions,
    }
    let [title,setTitle]= useState();
    let[ summery,setSummery] = useState();
    let [contant,setContant] = useState();
    let [image,setImage] = useState();
    function createNewPost(e)
    {
       e.preventDefault();
        let data = new FormData();
        data.append('title',title);
        data.append('summery',summery)
        data.append('contant',contant)
        data.append('image',image)  
        axios.post('http://localhost:3000/blog/create',data)
        .then(function (response) {
            console.log("from server",response.data);
        })
        
    }
    let postid = {
        id:props.id
    }
    useEffect(()=>{
        const fetchData = async()=>{
          console.log("fetch data is called in edit",postid)
            let result = await axios.put('http://localhost:3000/blog/getPost',postid)
            .then(result=>{
                    console.log(result.data)
                    setTitle(result.data.title) 
                    setSummery(result.data.summery)
                    setImage(result.data.image)       
                });
             
        };
        fetchData();
    },[]);
    return(
        <div className="container" onSubmit={createNewPost}>
            <h1>  In Edit Page</h1>
            <form >
                <div className='mod'> <input type='text' className='form-control' placeholder='Title'
                                        value={title} onChange={(e)=>setTitle(e.target.value)}            />
                 </div>
                <div className='mod'> <input type='text' className='form-control' placeholder='Summery'
                                        value={summery} onChange={e=>setSummery(e.target.value)}    /> 
                </div>
                <div className='mod'> <ReactQuill modules={modules}
                                        value={contant} onChange={newContant=>setContant(newContant)} />
                 </div>
                 <div className='mod'>

                    <input type='file' className='form-control ' onChange={e=>setImage(e.target.files[0])} />
                 </div>
                <button type='sumbit' className='form-control btn btn-primary' style={{marginTop:"2rem"}}>Update</button> 
            </form>
            <h1> {title}</h1>
            <h1> {summery}</h1>
            <>{contant}</>
            <img className="card-img-top"  src={"http://localhost:3000/images/"+image} style={{width:"200px"}} />

        </div>
    )
}