import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { board } from '../interface/Board'
import { addr } from '../Common/serverAddr';
import AWS from 'aws-sdk';
import { getCookie } from '../Common/Cookies';
import { Avatar, Button, Card, CardHeader, IconButton, TextField, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

//자유게시판 글 작성 컴포넌트
function FreeWrite() {

    const [board, setBoard] = useState<board>({
        title: "",
        contents: "",
        boardType: ""
    })
    const navigate = useNavigate();

    /* 아이디 세션 처리 어떻게 할지 정해지면
    useEffect(() => {
        
    },[])
    */

    const onchange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement> | any) => {
        const { name, value } = e.target;
        setBoard({
            ...board,
            [name]: value
        });
    }

    const onclick = async () => {



        if (!board.title || !board.contents) {
            alert("제목과 내용을 입력해주세요");
            return;
        }

        if (!board.boardType) {
            alert("카테고리를 입력해주세요");
            return;
        }
        const tok = getCookie('myToken');

        fetch(addr + '/board/s3url', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

            }
        }).then((res) => res.json())
            .then((res) => {
                console.log(res.data);

                let imageUrl = "";

                fetch(res.data, {
                    method: "put",
                    headers: {
                        "Content-Type": "multipart/form-data",

                    },
                    body: selectedFile
                })
                if (selectedFile.size > 0) {
                    imageUrl = res.data.split('?')[0];
                } else {
                    imageUrl = "";
                }



                fetch(addr + '/board/write', {
                    method: "POST",
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:5000",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ` + tok,
                    },
                    body: JSON.stringify({
                        title: board.title,
                        contents: board.contents,
                        boardType: board.boardType,
                        imgUrl: imageUrl

                    }),
                }).then((res) => res.json())
                    .then((res) => {
                        if (res.success) {
                            alert("등록 성공");
                            navigate('/free')
                        } else {
                            console.log("등록 과정 중 에러 발생.");
                            alert("등록 과정 중 에러발생 \n다시 시도해주세요");
                        }
                    })
            })
    }





    const [selectedFile, setSelectedFile] = useState<any>('');
    const handleFileInput = (e: any) => {
        console.log("event : " + e);
        const file = e.target.files[0];
        console.log(file);
        setSelectedFile(file);
    }

    return (
        <div>
            <Card style={{ marginBlock: 20, backgroundColor: '#FFFFB6', color: 'maroon', position: 'relative' }}>
                <CardHeader
                    title={<Typography variant='h5' sx={{
                        marginBottom: '1rem'
                    }}>
                        글 제목
                    </Typography>}
                    subheader={
                        <TextField
                            id="outlined-multiline-flexible-title"
                            label="제목"
                            name='title'
                            multiline
                            maxRows={2}
                            autoFocus
                            fullWidth
                            inputProps={{ maxLength: 39 }}
                            onChange={onchange}
                        />}
                />
                <Typography sx={{
                    marginBottom: '1rem',
                    marginRight: '1rem',
                    float: 'right'
                }}>
                    {board.title.length}/40
                </Typography>
            </Card>

            <Card style={{ marginBlock: 20, backgroundColor: '#FFFFB6', color: 'maroon', position: 'relative' }}>

                <div className='bar2'>
                    <CardHeader
                        title={<Typography variant='h5' sx={{
                            marginBottom: '1rem'
                        }}>
                            내용
                        </Typography>}
                        subheader={
                            <TextField
                                id="outlined-multiline-flexible-contents"
                                name='contents'
                                label="내용"
                                multiline
                                fullWidth
                                inputProps={{ maxLength: 199 }}
                                rows={10}
                                onChange={onchange}
                            />}
                    />
                    <Typography sx={{
                        marginBottom: '1rem',
                        marginRight: '1rem',
                        float: 'right'
                    }}>
                        {board.contents.length}/200
                    </Typography>

                </div>

            </Card>

            <select name="boardType" id="selectBoard" onChange={onchange}>
                <option>카테고리 선택</option>
                <option value="F">자유게시판</option>
                <option value="A">술 관련 게시판</option>
                <option value="R">레시피 게시판</option>
            </select>
            <div>
                <Button variant="contained" component="label">
                    Upload
                    <input hidden accept="image/*" multiple type="file" onChange={handleFileInput} />
                </Button>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={handleFileInput} />
                    <PhotoCamera />
                </IconButton>
            </div>

            <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="warning"
                onClick={onclick}
                sx={{
                    marginBlock: "1rem"
                }}>등록</Button>
        </div>
    )
}

export default FreeWrite;