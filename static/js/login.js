


//로그인
async function Login() {
    const account = document.getElementById("account").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${backend_base_url}/user/login/`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "account": account,
            "password": password
        })
    })
    const response_json = await response.json()

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    if (response.status === 200) {

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(function (c) {
                return '%' + (
                    '00' + c.charCodeAt(0).toString(16)
                ).slice(-2);
            }).join('')
        );

        localStorage.setItem("payload", jsonPayload);
        alert("로그인 성공");
        
        location.replace('../index.html')

    } else if (response.status === 400 && response_json["non_field_errors"]) {
        alert(response_json["non_field_errors"])

    } else {
        alert("아이디와 비밀번호를 확인해주세요.");
    }
}



// // 회원탈퇴 (미완성)
// async function withdrawal() {
//     var delConfirm = confirm("정말 계정 비활성화를 진행하시겠습니까?")
//     if (delConfirm) {
//     const response = await fetch(`${backend_base_url}/users/withdraw/<int:user_id>/`, {
//         method: "DELETE",
//         headers: {
//         Accept: "application/json",
//         "Content-type": "application/json",
//         "Authorization": "Bearer " + localStorage.getItem("access")
//         }
//     })

//     withdrawal_json = await response.json()
//     if (response.status === 200) {
//     alert(withdrawal_json["message"])
//     localStorage.removeItem("payload")
//     localStorage.removeItem("access")
//     localStorage.removeItem("refresh")
//     location.replace('user.html')    }
//     }
// }


