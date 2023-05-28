window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    Profile(urlParams);
    loadArticles(urlParams);
}


const user_id = parseInt(new URLSearchParams(window.location.search).get('user_id'));

const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload)

const token = localStorage.getItem("access");
const logined_id = parseInt(payload_parse.user_id);
const account = payload_parse.account;


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


async function Profile(user_id) {
    const response = await fetch(`${backend_base_url}/user/${user_id}`, {
        method: 'GET',
    })

    response_json = await response.json()

    const user_id_int = parseInt(user_id)
    const profile_img_url = `${backend_base_url}${response_json.profile_img}`;
    const profile_img_element = document.getElementById("profile_img")

    if (response_json.profile_img != null) {
        profile_img_element.setAttribute("src", profile_img_url)
    }
    document.getElementById('point').innerText = response_json.point + 'p'
    document.getElementById('nickname').innerHTML = `${response_json.nickname}&nbsp(${response_json.account})`
    document.getElementById('introduce').innerText = response_json.introduce

    document.getElementById('followers-count').innerText = `팔로워 ${response_json.followers_count}`;
    document.getElementById('following-count').innerText = `팔로잉 ${response_json.following_count}`;
    document.getElementById('list-switch').innerHTML = `<a id="profile_article_list" class="text_bold" href="#" onclick ="loadArticles(${user_id})">게시물</a> <a id="profile_heart_list" class="text_normal" href="#" onclick="loadHeartArticles(${user_id})">좋아요</a>`;

    if (user_id_int === logined_id) {
        // 해당 프로필 페이지가 로그인된 사용자의 것일 때 - 수정,탈퇴 보이기
        document.getElementById('edit-account').style.display = "block";

        document.getElementById('owner-section-btn').style.display = "block";
        document.getElementById('follow-button').style.display = "none";

    } else {

        const followButton = document.getElementById('follow-button')

        const followers = response_json.followers.includes(account)
        console.log(followers)
        if (followers) {
            followButton.innerHTML = `<button onclick="handleFollow(${user_id})">언팔로우</button>`;
        } else {
            followButton.innerHTML = `<button onclick="handleFollow(${user_id})">팔로우</button>`;
        }
        document.getElementById('edit-account').style.display = "none";
    }
    fetch(`${backend_base_url}/article/list/${user_id}`)
        .then(response => response.json())
        .then(data => {
            // 게시글 목록의 개수 세기
            const articleCount = data.length;

            // 프로필 페이지에 게시글 개수 표시
            document.getElementById('article-count').innerText = articleCount;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function toggleDeleteForm() {
    var deleteForm = document.getElementById("delete-form");
    if (deleteForm.style.display === "none") {
        deleteForm.style.display = "block";
    } else {
        deleteForm.style.display = "none";
    }
}

function toggleOwnerSection() {
    var ownerSection = document.getElementById("owner-section");
    if (ownerSection.style.display === "none") {
        ownerSection.style.display = "flex";
    } else {
        ownerSection.style.display = "none";
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
        if (response.status == 204) {
            handleLogout()
        } else {
            alert("비밀번호를 확인해주세요")
        }
    }
}
// 작성한 글 목록
async function loadArticles(user_id) {

    $("#profile_article_list").removeClass("text_normal").addClass("text_bold");
    $("#profile_heart_list").removeClass("text_bold").addClass("text_normal");

    $('#article-list').empty()

    const response = await fetch(`${backend_base_url}/article/list/${user_id}`, {
        method: 'GET',
    });

    if (response.ok) {
        const articles = await response.json();
        const articleListContainer = document.getElementById('article-list');

        articles.forEach((article) => {

            const articleElement = document.createElement('div');
            articleElement.innerHTML = `
            <div class="CardContainer">
                        
                            <a href="../article/detail.html?id=${article.id}">
                                <img class="CardBox article-list-image" src="${backend_base_url}${article.changed_image}"
                                    alt="">
                            </a>
                        
                    </div>
            `;
            articleListContainer.appendChild(articleElement);
        });
    } else {
        console.error('Failed to load articles:', response.status);
    }
}

// 하트 누른 글 목록
async function loadHeartArticles(user_id) {

    $("#profile_heart_list").removeClass("text_normal").addClass("text_bold");
    $("#profile_article_list").removeClass("text_bold").addClass("text_normal");

    $('#article-list').empty()

    const response = await fetch(`${backend_base_url}/article/hearts/${user_id}`, {
        method: 'GET',
    });

    if (response.ok) {
        const articles = await response.json();
        console.log(articles)
        const articleListContainer = document.getElementById('article-list');
        articles.forEach((article) => {
            const articleElement = document.createElement('div');
            articleElement.innerHTML = `
            <div class="CardContainer">

                            <a href="../article/detail.html?id=${article.id}">
                                <img class="CardBox article-list-image" src="${backend_base_url}${article.changed_image}"
                                    alt="">
                            </a>
                        
                    </div>
            `;
            articleListContainer.appendChild(articleElement);
        });
    } else {
        console.error('Failed to load articles:', response.status);
    }
}

// 계정 재활성화
// async function reactivateAccount() {
//     const reactivateConfirm = confirm("계정을 재활성화하시겠습니까?");
//     if (reactivateConfirm) {
//         const token = localStorage.getItem("access")
//         const email = document.getElementById("email").value;

//         const response = await fetch(`${backend_base_url}/user/reactivation/`, {
//             headers: {
//                 'content-type': 'application/json'
//             },
//             method:'POST',
//             body: JSON.stringify({
//                 "email":email
//             })
//         })
//         if (response.status == 200){
//             alert("이메일을 통해 계정 재활성화 링크가 전송되었습니다.")
//         }else {
//             alert("존재하지 않거나 비활성화 상태가 아닌 계정입니다.")
//         }
//     }
// }


// 팔로워 목록 열기
function openFollowers() {
    $('#follower_popup_iframe').attr('src', `${frontend_base_url}/user/follower.html?user_id=${user_id}`);
    $('html, body').css({
        'overflow': 'hidden'
    });
    $('#follower_popup').fadeIn(200);
    $('.popup').scrollTop(0);
}


// 팔로잉 목록 열기
function openFollowings() {
    $('#following_popup_iframe').attr('src', `${frontend_base_url}/user/following.html?user_id=${user_id}`);
    $('html, body').css({
        'overflow': 'hidden'
    });
    $('#following_popup').fadeIn(200);
    $('.popup').scrollTop(0);
}


// 팔로워 목록 닫기
function closeFollowers() {
    $('html, body').css({
        'overflow': 'auto'
    });
    $('#follower_popup').fadeOut(200);
}


// 팔로워 목록 열기
function closeFollowings() {
    $('html, body').css({
        'overflow': 'auto'
    });
    $('#following_popup').fadeOut(200);
}