
$(document).ready(function () {
    getArticles()
})

// 게시글 목록 가져오기
function getArticles() {
    $('#card_list').empty()

    $.ajax({
        url: `${backend_base_url}/article/`,
        type: "GET",
        dataType: "json",
        success: function (response) {
            const rows = response;
            for (let i = 0; i < rows.length; i++) {
                let article_id = rows[i]['id']
                let article_title = rows[i]['title']
                let article_author = rows[i]['user']
                let article_image = rows[i]['changed_image']
                let hearts_count = rows[i]['hearts'].length

                let temp_html = `<div class="card">
                                    <div class="image_box">
                                        <a href="${frontend_base_url}/article/detail.html?id=${article_id}">
                                            <img class="image"
                                                src="${backend_base_url}${article_image}"
                                                alt="">
                                        </a>
                                    </div>
                                    <div class="box_wrap">
                                        <div class="text_box">
                                            <div class="title">
                                                <a href="${frontend_base_url}/article/detail.html?id=${article_id}">
                                                    ${article_title}
                                                </a>
                                            </div>
                                            <div class="author">
                                                <a href="${frontend_base_url}/user/profile.html?user_id=${article_author.id}">
                                                    ${article_author.nickname}
                                                </a>
                                            </div>
                                        </div>
                                        <div class="like_box" id="like_box">
                                            
                                            <div class="like_image_box" id="${article_id}">
                                                <a href="">
                                                    <img class="like_image"
                                                        src="https://png.pngtree.com/png-vector/20220428/ourmid/pngtree-smooth-glossy-heart-vector-file-ai-and-png-png-image_4557871.png"
                                                        alt="">
                                                </a>
                                            </div>
                                            <div class="like_count">
                                                ${hearts_count}
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>`
                $('#card_list').append(temp_html)
            }

        },
        error: function () {
            alert("불러오기 실패!");
        }
    });
}


// //로그아웃
// function confirmLogout() {
//     if (confirm("로그아웃하시겠습니까?")) {
//         handleLogout();
//     }
// }
// async function handleLogout() {
//     localStorage.removeItem("access")
//     localStorage.removeItem("refresh")
//     localStorage.removeItem("payload")
//     location.replace('../index.html')
// }


