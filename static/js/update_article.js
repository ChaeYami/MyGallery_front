$(document).ready(async function () {
    const article_id = new URLSearchParams(window.location.search).get('id');
    const response = await GetArticle(article_id);

    if (localStorage.getItem("payload")) {

        const payload = localStorage.getItem("payload");
        const payload_parse = JSON.parse(payload)

        const token = localStorage.getItem("access");
        const me_id = payload_parse.user_id;

        // 접속 유저와 작성 유저가 같다면?
        if (me_id != response.user.id) {
            alert('권한이 없습니다!')
            window.location.href = `${frontend_base_url}/index.html`;
        }
    }
    else {
        alert('로그인 하지 않았습니다!')
        window.location.href = `${frontend_base_url}/index.html`;
    }

    $('#image-preview').attr('src', `${backend_base_url}${response.changed_image}`);
    $('#title-input').val(response.title);
    $('#content-input').val(response.content);
    $('#model-select').val(response.change_id);

    // 이미지 띄우기, 아직 업로드X
    $('#image-input').change(async function () {
        var change_id = $('#model-select').val();
        var file = $('#image-input').prop('files')[0];

        if (file) {
            $('#model-description').css('display', 'none');
            $('#model-select').css('display', 'block');
        }

        // 파일 크기 제한 (단위: 바이트)
        var maxSize = 3 * 100 * 1024; // 300KB 제한

        // 파일 유효성 검사
        var validImageTypes = ['image/jpg', 'image/jpeg', 'image/png']; // 허용되는 이미지 파일의 MIME 유형들
        if (!validImageTypes.includes(file.type)) {
            alert('이미지 파일만 업로드할 수 있습니다.');
            return;
        }

        if (file.size > maxSize) {
            alert('이미지 파일 크기는 3KB를 초과할 수 없습니다.');
            return;
        }

        if (file && change_id) {
            // FormData 객체 생성
            var formData = new FormData();
            formData.append('image', file);
            formData.append('change_id', change_id);

            // api.js와 연합
            const response = await TransForm(formData)

            // 이미지 프리뷰를 생성하여 표시
            if (response.image_data) {
                var imageData = response.image_data;
                var imageExtension = file.type.split('/')[1]; // 이미지 파일의 확장자 추출
                var imageSrc = `data:image/${imageExtension};base64,${imageData}`;
                $('#image-preview').attr('src', imageSrc);
            } else {
                console.log("이미지 데이터를 찾지 못했습니다.");
            }

            // $('#image-preview').attr('src', `${backend_base_url}${response.image_url}`);
        } else if (change_id === undefined) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#image-preview').attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        }

    });

    $('#model-select').off('change').on('change', async function () {
        var change_id = $('#model-select').val()
        var file = $('#image-input').prop('files')[0];
        if (!file) {
            alert('새로운 파일이 필요합니다');
            return;
        }

        // 이미지가 있으면 추가
        if (file && change_id) {
            // FormData 객체 생성
            var formData = new FormData();
            formData.append('image', file);
            formData.append('change_id', change_id);

            // api.js와 연합
            const response = await TransForm(formData)

            // 이미지 프리뷰를 생성하여 표시
            if (response.image_data) {
                var imageData = response.image_data;
                var imageExtension = file.type.split('/')[1]; // 이미지 파일의 확장자 추출
                var imageSrc = `data:image/${imageExtension};base64,${imageData}`;
                $('#image-preview').attr('src', imageSrc);
            } else {
                console.log("이미지 데이터를 찾지 못했습니다.");
            }

            // $('#image-preview').attr('src', `${backend_base_url}${response.image_url}`);
        } else if (change_id === undefined) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#image-preview').attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

});

