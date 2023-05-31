
const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload)
const token = localStorage.getItem("access");
const user_id = payload_parse.user_id;

window.onload = () => {

    existingProfile(user_id)
}

// 입력폼에 기존 값 넣기
async function existingProfile() {
    const response = await fetch(`${backend_base_url}/user/${user_id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    response_json = await response.json()

    document.getElementById('nickname').value = response_json.nickname
    document.getElementById('introduce').value = response_json.introduce

    // 프로필 이미지 미리보기
    const profileImg = document.getElementById('profile_img');
    if (response_json.profile_img) {
        const imageUrl = `${backend_base_url}${response_json.profile_img}`;
        document.getElementById('profile_preview').src = imageUrl;
    }

}
function toggleFileInput() {
    const fileInput = document.getElementById("profile_img");
    if (fileInput.style.display === "none") {
        fileInput.style.display = "block";
    } else {
        fileInput.style.display = "none";
    }
}

// 이미지 미리보기
function previewImage() {
    const fileInput = document.getElementById('profile_img');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        const previewImg = document.getElementById('profile_preview');
        previewImg.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}

// 수정하기 버튼 눌렀을 때
async function updateProfile() {
    const nickname = document.getElementById('nickname').value
    const introduce = document.getElementById('introduce').value
    const fileInput = document.getElementById('profile_img');
    const file = fileInput.files[0];
    const formData = new FormData();

    formData.append('nickname', nickname);
    formData.append('introduce', introduce);

    if (file) {
        formData.append('profile_img', file);
    } else {
        formData.set('profile_img', '');
    }


    const response = await fetch(`${backend_base_url}/user/${user_id}/`, {
        headers: {
            "Authorization": "Bearer " + token,
        },
        method: 'PATCH',
        body: formData
    });

    if (response.status == 200) {
        alert("수정 완료")
        window.location.replace(`../user/profile.html?user_id=${user_id}`)
    } else if (nickname == '') {
        alert("닉네임은 필수 입력값입니다.")
    } else {
        alert('으엥에ㅔ에에')
    }
}


function deleteProfileImage() {
    const formData = new FormData();

    fetch(`${backend_base_url}/user/${user_id}/`, {
        headers: {
            "Authorization": "Bearer " + token,
        },
        method: 'PATCH',
        body: formData
    }).then(response => {
        if (response.status == 200) {
            alert("프로필 이미지가 삭제되었습니다.");
            // 이미지 미리보기 초기화
            document.getElementById('profile_preview').src = "";
        } else {
            alert("프로필 이미지 삭제 실패");
        }
    }).catch(error => {
        console.error("프로필 이미지 삭제 오류:", error);
    });
}