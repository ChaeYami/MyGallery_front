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
        console.log("Error: " + error);
        alert('오류 입니다.');
        // window.location.href = `${frontend_base_url}/404.html`
        return error;
    }
};

//게시글 post
function PostArticle() {
    // e.preventDefault(); // 폼의 기본 동작을 중지

    const title = $('#title-input').val();
    const content = $('#content-input').val();
    const image = $('#image-input')[0].files[0];
    const trans_image = $('#image-preview').attr('src');

    console.log(title)

    if (title == '' || content == '' || image == null || trans_image == null) {
        alert("입력해 주세요.")
        return
    }

    // const token = localStorage.getItem("access")
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("uploaded_image", image);
    // formData.append("changed_image", trans_image);
    formData.append("changed_image", image);

    // 잘 들어 갔는지 테스트
    console.log(formData.get("title"))
    console.log(formData.get("content"))
    console.log(formData.get("uploaded_image"))
    console.log(formData.get("changed_image"))

    $.ajax({
        url: `${backend_base_url}/article/`,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
            // Authorization: `Bearer ${token}`
        },
        success: function (response) {
            alert("글 작성 완료");
            window.location.href = `${frontend_base_url}/index.html`
        },
        error: function (error) {
            console.log("Error: " + error);
            alert('오류 입니다.');
            // window.location.href = `${frontend_base_url}/404.html`
        }

    });
};


//get
//put