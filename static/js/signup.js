

async function handleSignup() {
    const account = document.getElementById("account").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const nickname = document.getElementById("nickname").value
    const profile_img = document.getElementById("profile_img").files[0]

    const formData = new FormData();
    formData.append("account", account);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("nickname", nickname);
    formData.append("profile_img", profile_img);

    const response = await fetch(`${backend_base_url}/user/signup/`, {
        headers: {
        },
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        return response
    } else {
        // 에러 처리
        const errorData = await response.json();
        const errorArray = Object.entries(errorData);
        alert(errorArray[0][1]);
    }
}


async function handleSignupButton() {
    const response = await handleSignup();

    if (response.status == 201) {
        alert("이메일 발송 완료. 이메일 인증 후 회원가입을 완료해주세요")
        window.location.replace(`../user/login.html`)
    }
}