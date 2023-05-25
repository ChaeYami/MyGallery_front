const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

$(document).ready(async function () {
    let urlParam = new URLSearchParams(window.location.search);
    let user_id = urlParam.get('user_id');
});

////게시글 작성 수정////////////////////////////////////////////
//이미지변환 post
//게시글 post
//get
//put