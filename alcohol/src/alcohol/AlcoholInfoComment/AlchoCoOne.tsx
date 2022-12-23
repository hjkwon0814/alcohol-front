import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../Common/Cookies";
import { addr } from "../../Common/serverAddr";

function AlchoCoOne(prop:any){
    console.log("qlqlqlq")
    useEffect(()=>{
        console.log("hihihihih"+prop.data)
    },[]);
    const navigate = useNavigate();
    const onclick = async () => {
        
        console.log(prop.data.userId)
        fetch(addr + '/alcohol/delete',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${getCookie('myToken')}`,
            },
            body : JSON.stringify({
                id:prop.data.id,
                userId:prop.data.userId
            }),
        }).then((res)=>res.json())
        .then((res) => {
            if(res.success){
                alert('댓글이 삭제되었습니다');
                prop.onRemove(prop.data.id);
            }else{
                if(res.message=='Unauthorized'){
                    alert('로그인 후 이용 가능합니다')
                    navigate('/login');
                }else{
                    if(res.msg==='fail'){
                        alert('권한이 없습니다');
                        return;
                    }
                    console.log("댓글 삭제 과정 중 에러발생");
                    alert("삭제 과정 중 에러발생 \n다시 시도해주세요");
                }
                
            }
        });
    }
    return(
        <div className="g">
            {prop.data.nickname} : <input type="text" className="comment-input" value={prop.data.content} disabled/> <span onClick={onclick} className="comment-span">삭제</span>
            <hr></hr>
        </div>
    )
}

export default AlchoCoOne;