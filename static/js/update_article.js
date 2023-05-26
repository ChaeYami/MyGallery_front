$(document).ready(async function () {
    let urlParam = new URLSearchParams(window.location.search);

    const article_id = new URLSearchParams(window.location.search).get('id');
    const response = await GetArticle(article_id);

    if (localStorage.getItem("payload")) {

        const payload = localStorage.getItem("payload");
        const payload_parse = JSON.parse(payload)

        const token = localStorage.getItem("access");
        const me_id = payload_parse.user_id;

        console.log('me_id');
        console.log(me_id);
        console.log('response.user');
        console.log(response.user);
        // 접속 유저와 작성 유저가 같다면?
        if (me_id != response.user) {
            alert('권한이 없습니다!')
            window.location.href = `${frontend_base_url}/index.html`;
        }
    }
    else {
        alert('로그인 하지 않았습니다!')
        window.location.href = `${frontend_base_url}/index.html`;
    }

    console.log(response.change_id);
    $('#image-input').val(response.uploaded_image);
    $('#title-input').val(response.title);
    $('#content-input').val(response.content);
    $('#model-select').val(response.change_id);



});

