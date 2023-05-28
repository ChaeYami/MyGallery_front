$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    getFollowers(urlParams)
})

function getFollowers(user_id) {
    $('#following_list').empty()

    $.ajax({
        url: `${backend_base_url}/user/${user_id}/follow/`,
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        success: function (response) {
            const rows = response['follow'][0]['followings'];
            for (let i = 0; i < rows.length; i++) {
                let following_id = rows[i]['id']
                let following_nickname = rows[i]['nickname']
                let following_profile_image = rows[i]['profile_image']

                let temp_html = `<div class="user_wrap">
                                    <a href="#" onclick="openProfile(this)" name="${following_id}">
                                        <div class="profile_image_box">
                                            <img class="profile_image"
                                                src="${backend_base_url}${following_profile_image}"
                                                alt="No Image"
                                                onerror="this.onerror=null; this.src='../static/img/unknown.jpg'">
                                        </div>
                                        <div class="nickname">
                                            ${following_nickname}
                                        </div>
                                    </a>
                                </div>`

                $('#following_list').append(temp_html)
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