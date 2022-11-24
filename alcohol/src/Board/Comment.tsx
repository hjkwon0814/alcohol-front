import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addr } from '../interface/serverAddr';

function Comment(){
    const [content, setContent] = useState<string>();
    const {id} = useParams();

    const commentList = async () => {
        fetch(addr+'/board/comment/'+id,{
            method:"GET",
            headers: {
                "Content-Type" : "application/json",
            }
        }).then((res)=>res.json())
        .then((res) => {
            console.log(res);
        })
    }

    useEffect(() => {
        commentList();
    },[]);

    const onchange = (e:any) => {
        setContent(e.target.value);
    }
    const onclick = () => { 
        fetch(addr+'/board/insertComment',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                contents : content,
                nickname : "bk",//가라데이터 임시 사용
                boardId : id
            }),
        }).then((res) => res.json())
        .then((res) => {
            if(res.success){
                alert("등록 성공");
                setContent('');
            }else{
                alert("등록 실패");
            }
        })
    }

    return(
        <div>
            <div>
                <span>댓글</span>
                <hr></hr>
            </div>
            <div className="comment-box">
                <input type="text" name="comment" className='select-search' value={content||''} onChange={onchange}></input>
                <button className = "btn-submit" onClick={onclick}>등록</button>
            </div>
        </div>
        
    )
}

export default Comment;