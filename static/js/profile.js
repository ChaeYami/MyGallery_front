window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    Profile(urlParams);
}


const user_id = new URLSearchParams(window.location.search).get('user_id');
const loggedInUserId = localStorage.getItem("user_id");

console.log(user_id)
console.log(loggedInUserId)

async function Profile(user_id) {

    const response = await fetch(`${backend_base_url}/user/${user_id}`, {
        method: 'GET',
    })

    response_json = await response.json()

    document.getElementById('account').innerText = response_json.account
    document.getElementById('nickname').innerText = response_json.nickname
    document.getElementById('introduce').innerText = response_json.introduce
    document.getElementById('joined-at').innerText = response_json.joined_at

    if (user_id === loggedInUserId) {
        // 해당 프로필 페이지가 로그인된 사용자의 것일 때 - 수정,탈퇴 보이기
        document.getElementById('edit-account').style.display = "block";
        if (!response_json.is_active) {
            // 해당 사용자가 비활성화 상태일 때 - 활성화 보이기
            document.getElementById('reactivate-account').style.display = "block";
        }
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
        if (response.status == 204){
            return response
        }else{
            alert("비밀번호를 확인해주세요")
        }

    }
}

// 계정 재활성화
async function reactivateAccount() {
    const reactivateConfirm = confirm("계정을 재활성화하시겠습니까?");
    if (reactivateConfirm) {
        const token = localStorage.getItem("access")
        const email = document.getElementById("email").value;

        const response = await fetch(`${backend_base_url}/user/reactivation/`, {
            headers: {
                'content-type': 'application/json'
            },
            method:'POST',
            body: JSON.stringify({
                "email":email
            })
        })
        if (response.status == 200){
            alert("이메일을 통해 계정 재활성화 링크가 전송되었습니다.")
        }else {
            alert("존재하지 않거나 비활성화 상태가 아닌 계정입니다.")
        }
    }
}