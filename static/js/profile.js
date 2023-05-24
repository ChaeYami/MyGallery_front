window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    Profile(urlParams);
}


const user_id = new URLSearchParams(window.location.search).get('user_id');

console.log(user_id)

async function Profile(user_id) {

    const response = await fetch(`${backend_base_url}/user/${user_id}`, {
        method: 'GET',
    })

    response_json = await response.json()

    document.getElementById('account').innerText = response_json.account
    document.getElementById('nickname').innerText = response_json.nickname
    document.getElementById('introduce').innerText = response_json.introduce
    document.getElementById('joined-at').innerText = response_json.joined_at
}


// 회원탈퇴 (미완성)
async function withdrawal() {
    var delConfirm = confirm("정말 계정 비활성화를 진행하시겠습니까?")
    if (delConfirm) {
        const response = await fetch(`${backend_base_url}/user/${user_id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            }
        })

        withdrawal_json = await response.json()
        if (response.status === 200) {
            alert(withdrawal_json["message"])
            localStorage.removeItem("payload")
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            location.replace('user.html')
        }
    }
}