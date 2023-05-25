const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

$(document).ready(async function () {
    let urlParam = new URLSearchParams(window.location.search);
    let user_id = urlParam.get('user_id');
});

////게시글 작성 수정////////////////////////////////////////////
//이미지변환 post
async function TransForm(change_id, formData) {
    try {
        const response = await $.ajax({
            url: `${backend_base_url}/change/${change_id}/`,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`
                // Authorization: `Bearer ${token}`
            }
        });        
        
        // 응답 데이터 처리
        return response; // 결과 반환

    } catch (error) {
    console.error(error);
    // window.location.href = "404.html";
    }  
};

//게시글 post
async function PostArticle() {

}


//get
//put