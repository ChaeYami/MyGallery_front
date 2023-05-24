window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    Profile(urlParams);
}


const user_id = parseInt(new URLSearchParams(window.location.search).get('user_id'));


const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload)

const token = localStorage.getItem("access");
const logined_id = parseInt(payload_parse.user_id);
const account = payload_parse.account;



async function Profile(user_id) {

    const response = await fetch(`${backend_base_url}/user/${user_id}`, {
        method: 'GET',
    })

    response_json = await response.json()
    const user_id_int = parseInt(user_id)

    document.getElementById('nickname').innerText = response_json.nickname
    document.getElementById('introduce').innerText = response_json.introduce
    document.getElementById('article-count').innerText = response_json.article_count;
    document.getElementById('followers-count').innerText = response_json.followers_count;
    document.getElementById('following-count').innerText = response_json.following_count;
    

    if (user_id_int === logined_id) {
        // 해당 프로필 페이지가 로그인된 사용자의 것일 때 - 수정,탈퇴 보이기
        document.getElementById('edit-account').style.display = "block";
        document.getElementById('delete-account').style.display = "block";

    }else{
        document.getElementById('edit-account').style.display = "none";
    }
}

function toggleDeleteForm() {
    var deleteForm = document.getElementById("delete-form");
    if (deleteForm.style.display === "none") {
        deleteForm.style.display = "block";
    } else {
        deleteForm.style.display = "none";
    }
}

// 회원탈퇴
async function deactivateAccount() {
    const delConfirm = confirm("정말 계정 비활성화를 진행하시겠습니까?")
    const token = localStorage.getItem("access")
    const password = document.getElementById("password").value
    if (delConfirm) {
        const response = await fetch(`${backend_base_url}/user/${user_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                "password": password
            })
        })
        if (response.status == 204) {
            handleLogout()
        } else {
            alert("비밀번호를 확인해주세요")
        }

    }
}

// 계정 재활성화
// async function reactivateAccount() {
//     const reactivateConfirm = confirm("계정을 재활성화하시겠습니까?");
//     if (reactivateConfirm) {
//         const token = localStorage.getItem("access")
//         const email = document.getElementById("email").value;

//         const response = await fetch(`${backend_base_url}/user/reactivation/`, {
//             headers: {
//                 'content-type': 'application/json'
//             },
//             method:'POST',
//             body: JSON.stringify({
//                 "email":email
//             })
//         })
//         if (response.status == 200){
//             alert("이메일을 통해 계정 재활성화 링크가 전송되었습니다.")
//         }else {
//             alert("존재하지 않거나 비활성화 상태가 아닌 계정입니다.")
//         }
//     }
// }