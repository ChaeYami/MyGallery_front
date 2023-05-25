
const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload)
const token = localStorage.getItem("access");
const user_id = payload_parse.user_id;

window.onload = () => {
    
    existingProfile(user_id)
}

async function existingProfile(){
    const response = await fetch(`${backend_base_url}/user/${user_id}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    response_json = await response.json()

    document.getElementById('nickname').value = response_json.nickname
    document.getElementById('introduce').value = response_json.introduce
    
}

async function updateProfile(){
    const nickname = document.getElementById('nickname').value
    const introduce = document.getElementById('introduce').value

    const response = await fetch(`${backend_base_url}/user/${user_id}/`, {
        headers: {
            "Authorization": "Bearer " + token,
            'content-type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
            "nickname": nickname,
            "introduce": introduce
        })
    })
    if (response.status == 200) {
        alert("수정 완료")
        window.location.replace(`../user/profile.html?user_id=${user_id}`)
    } else if (nickname == '' ) {
        alert("닉네임은 필수 입력값입니다.")
    } else {
        alert('으엥에ㅔ에에')
    }
}