$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    getFollowers(urlParams)
})

const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload)
const me_id = payload_parse.user_id;


function getFollowers(user_id) {
    $('#follower_list').empty()

    $.ajax({
        url: `${backend_base_url}/user/${user_id}/follow/`,
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        success: function (response) {

            let id_list = [];  // id 값을 저장할 배열 초기화

            for (let i = 0; i < response['request_follow'][0]['followings'].length; i++) {
                let item = response['request_follow'][0]['followings'][i];
                id_list.push(item['id']);  // 각 객체의 id 값을 배열에 추가
            }

            const rows = response['follow'][0]['followers'];

            for (let i = 0; i < rows.length; i++) {
                let follower_id = rows[i]['id']
                let follower_nickname = rows[i]['nickname']
                let follower_profile_image = rows[i]['profile_image']

                if (id_list.includes(follower_id)) {
                    let temp_html = `<div class="user_wrap">
                                    <a href="#" onclick="openProfile(this)" name="${follower_id}">
                                        <div class="profile_image_box">
                                            <img class="profile_image"
                                                src="${backend_base_url}${follower_profile_image}"
                                                alt="No Image"
                                                onerror="this.onerror=null; this.src='../static/img/unknown.jpg'">
                                        </div>
                                        <div class="nickname">
                                            ${follower_nickname}
                                        </div>
                                    </a>
                                    <button class="follow_btn" onclick="listHandleFollow(${follower_id})">언팔로우</button>
                                </div>`

                    $('#follower_list').append(temp_html)
                } else if (follower_id === me_id) {
                    let temp_html = `<div class="user_wrap">
                                    <a href="#" onclick="openProfile(this)" name="${follower_id}">
                                        <div class="profile_image_box">
                                            <img class="profile_image"
                                                src="${backend_base_url}${follower_profile_image}"
                                                alt="No Image"
                                                onerror="this.onerror=null; this.src='../static/img/unknown.jpg'">
                                        </div>
                                        <div class="nickname">
                                            ${follower_nickname}
                                        </div>
                                    </a>
                                    <button class="follow_btn" disabled>나</button>
                                </div>`

                    $('#follower_list').append(temp_html)
                } else {
                    let temp_html = `<div class="user_wrap">
                                    <a href="#" onclick="openProfile(this)" name="${follower_id}">
                                        <div class="profile_image_box">
                                            <img class="profile_image"
                                                src="${backend_base_url}${follower_profile_image}"
                                                alt="No Image"
                                                onerror="this.onerror=null; this.src='../static/img/unknown.jpg'">
                                        </div>
                                        <div class="nickname">
                                            ${follower_nickname}
                                        </div>
                                    </a>
                                    <button class="follow_btn" onclick="listHandleFollow(${follower_id})">팔로우</button>
                                </div>`

                    $('#follower_list').append(temp_html)
                }
            }
        },
        error: function () {
            alert("불러오기 실패!");
        }
    });
}


function openProfile(element) {
    let user_id = element.name
    window.parent.location.href = `${frontend_base_url}/user/profile.html?user_id=${user_id}`;
}


async function listHandleFollow(target_id) {
    const response = await fetch(`${backend_base_url}/user/${target_id}/follow/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',

    })
    if (response.status === 200) {
        alert("팔로우 완료")
        window.location.reload()
    } else if (response.status === 205) {
        alert("언팔로우 완료")
        window.location.reload()
    } else if (response.status === 403) {
        alert("팔로우 실패")
    }

}