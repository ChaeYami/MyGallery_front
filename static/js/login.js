window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('alert');
    if (urlParams == '1') {
        alert('회원가입이 완료되었습니다! 회원가입 축하 선물로 500p를 지급해드렸습니다!');
        window.location.replace(`../user/login.html`)
    } else if (urlParams == '2') {
        alert('만료된 인증 링크입니다.');
        window.location.replace(`../index.html`)
    }
}


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


        $.ajax({
            url: `${backend_base_url}/user/check/`,
            type: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            success: function (response) {
                alert(response["message"]);
            },
            error: function (xhr) {
                const errorData = xhr.responseJSON;
                const errorArray = Object.entries(errorData);
                alert(errorArray[0][1]);
            }
        });



        location.replace('../index.html')

    } else if (response.status === 400 && response_json["non_field_errors"]) {
        alert(response_json["non_field_errors"])

    } else {
        alert("아이디와 비밀번호를 확인해주세요.");
    }
}


