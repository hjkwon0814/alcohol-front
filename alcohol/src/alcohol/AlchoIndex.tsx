import { useNavigate } from "react-router"

const AlchoIndex = () =>{
    const navigate = useNavigate();
    const info = () => {
        navigate('/alcohol/info');
    }

    const recipe = () =>{
        navigate('/cocktail/recipe/all')
    }
    return (
        <div>
            <h2>술 정보</h2>
            <span>다양한 술 정보와 칵테일 레시피</span>
            <hr></hr>
            <div>
                <img onClick={info} src="https://myhsproject.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20221231_173124605.jpg"/>
                <strong>다양한 술을 알아보자</strong>
            </div>
            <hr></hr>
            <div>
                <img onClick={recipe} src="https://myhsproject.s3.ap-northeast-2.amazonaws.com/istockphoto-1302161390-612x612.jpg"/>
                <strong>홈텐딩을 위한 칵테일 레시피</strong>
            </div>
            
        </div>
    )
}

export default AlchoIndex;