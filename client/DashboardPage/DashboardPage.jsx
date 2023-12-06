import { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios'
export default function DashboardPage()
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
            console.log(data)
     

        axios.post('http://localhost:3000/blog/create',data)
        .then(function (response) {
            console.log("from server",response.data);
        })
        
    }
    return(
        <div className="container" onSubmit={createNewPost}>
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
                    <input type='file' className='form-control' onChange={e=>setImage(e.target.files[0])} />
                 </div>
                <div className='mod'> <button type='sumbit' className='form-control btn btn-primary'>Submit</button> </div>
            </form>
            <h1> {title}</h1>
            <h1> {summery}</h1>
            <>{contant}</>

        </div>
    )
}