

async function handleSignup() {
    const account = document.getElementById("account").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const nickname = document.getElementById("nickname").value
    const categories = document.getElementById("categories").value

    const response = await fetch(`${backend_base_url}/users/signup/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "account": account,
            "password": password,
            "nickname": nickname,
            "email": email,
            "categories": categories
        })
    })
    if (response.status==201){
        return response
    }else if (account == '' || password == '' || nickname == '' || email == ''){
        alert("빈칸을 입력해 주세요.")
        
    }else if (response.status == 400){
        alert("이미 존재하는 아이디 또는 이메일입니다.");
    }
}


async function handleSignupButton() {
    const response = await handleSignup();
    const responseData = await response.json();

    if (response.status == 201) {
        alert("이메일 발송 완료. 이메일 인증 후 회원가입을 완료해주세요")
        window.location.replace(`/login.html`)
    }
    
}