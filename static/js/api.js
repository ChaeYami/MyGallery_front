const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

$(document).ready(async function () {
    let urlParam = new URLSearchParams(window.location.search);
    let user_id = urlParam.get('user_id');
});

////게시글 작성 수정////////////////////////////////////////////
//이미지변환 post
async function TransForm(formData) {
    try {
        const response = await $.ajax({
            url: `${backend_base_url}/change/`,
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
        // window.location.href = `${frontend_base_url}/article/404.html`
        return error;
    }
};

// 게시글 post
function PostArticle() {
    const title = $('#title-input').val();
    const content = $('#content-input').val();
    const image = $('#image-input')[0].files[0];
    const trans_image = $('#image-preview').attr('src');
    const change_id = $('#model-select').val()

    console.log(title);

    if (title == '' || content == '' || image == null || trans_image == null) {
        alert("입력해 주세요.");
        return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("uploaded_image", image);
    formData.append("change_id", change_id);

    // 이미지 데이터를 File 객체로 변환하여 추가
    var imageFile = dataURLtoFile(trans_image, 'changed_image.png');
    formData.append("changed_image", imageFile);

    $.ajax({
        url: `${backend_base_url}/article/`,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        },
        success: function (response) {
            alert("글 작성 완료");
            window.location.href = `${frontend_base_url}/index.html`;
        },
        error: function (error) {
            console.log("Error: " + error);
            alert('오류입니다.');
            // window.location.href = `${frontend_base_url}/article/404.html`
        }
    });
};

// Data URL을 File 객체로 변환하는 함수
function dataURLtoFile(dataURL, filename) {
    var arr = dataURL.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

//게시글 get
async function GetArticle(article_id) {
    try {
        const response = await $.ajax({
            url: `${backend_base_url}/article/${article_id}/`,
            method: 'GET'
        });
        console.log('response');
        console.log(response);
        console.log('response.id');
        console.log(response.id);
        // 응답 데이터 처리
        return response; // 결과 반환

    } catch (error) {
        console.error(error);
        // 실패 시 처리
        window.location.href = `${frontend_base_url}/article/404.html`
    }
};
//put