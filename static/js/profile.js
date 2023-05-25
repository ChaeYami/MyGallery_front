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
        alert(response)
        window.location.reload()
    } else if (response.status === 403) {
        alert(response)
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

    profile_img_element.setAttribute("src", profile_img_url)

    document.getElementById('nickname').innerText = response_json.nickname
    document.getElementById('introduce').innerText = response_json.introduce

    document.getElementById('followers-count').innerText = response_json.followers_count;
    document.getElementById('following-count').innerText = response_json.following_count;
    document.getElementById('list-switch').innerHTML = `<a href="profile.html?user_id=${user_id}">게시물</a> | <a href="profile_heart_list.html?user_id=${user_id}">좋아요</a>`;

    if (user_id_int === logined_id) {
        // 해당 프로필 페이지가 로그인된 사용자의 것일 때 - 수정,탈퇴 보이기
        document.getElementById('edit-account').style.display = "block";

        document.getElementById('delete-account').style.display = "block";
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

async function loadArticles(user_id) {
    const response = await fetch(`${backend_base_url}/article/list/${user_id}`, {
        method: 'GET',
    });

    if (response.ok) {
        const articles = await response.json();
        const articleListContainer = document.getElementById('article-list');

        articles.forEach((article) => {
            const articleElement = document.createElement('div');
            articleElement.innerHTML = `
            <a href="../article/detail.html?id=${article.id}">
                <h3>${article.title}</h3>
                <img class="article-list-image" src="${backend_base_url}${article.changed_image}" alt="">
                <p>${article.content}</p>
                </a>
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