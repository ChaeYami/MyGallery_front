$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    getFollowers(urlParams)
})

// 팔로우
async function handleFollow(user_id) {
    const response = await fetch(`${backend_base_url}/user/${user_id}/follow/`, {
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
            // console.log(response)
            const rows = response['follow'][0]['followers'];
            for (let i = 0; i < rows.length; i++) {
                let follower_id = rows[i]['id']
                let follower_nickname = rows[i]['nickname']
                let follower_profile_image = rows[i]['profile_image']

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
                                    <button type="button" onclick="handleFollow(${follower_id})">버튼 ㅎㅎ</button>
                                </div>`

                $('#follower_list').append(temp_html)
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