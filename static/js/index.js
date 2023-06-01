
$(document).ready(function () {
    getArticles()

    $('#toggle-btn').click(function () {
        if ($('.playlist--list').is(":visible")) {
            $('#toggle-btn').text("▶ Playlist");
        } else {
            $('#toggle-btn').text("▼ 숨기기");
        }
        $('.playlist--list').slideToggle('slow');
    });

})


// 게시글 목록 가져오기
function getArticles() {
    $('#card_list').empty()

    const payload = localStorage.getItem("payload");
    const payload_parse = payload ? JSON.parse(payload) : null;
    const user_id = payload_parse ? payload_parse.user_id : null;

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

                if (rows[i]['hearts'].includes(user_id)) {
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
                                            
                                            <div class="like_image_box">
                                                <a href="#" id="${article_id}" onclick="clickIndexHeart(this)">❤️</a>
                                            </div>
                                            <div class="like_count">
                                                ${hearts_count}
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>`
                    $('#card_list').append(temp_html)
                } else {
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
                                            
                                            <div class="like_image_box">
                                                <a href="#" id="${article_id}" onclick="clickIndexHeart(this)">♡</a>
                                            </div>
                                            <div class="like_count">
                                                ${hearts_count}
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>`
                    $('#card_list').append(temp_html)
                }
            }
        },
        error: function () {
            alert(response.status);
        }
    });
}



// 좋아요 누르기
async function clickIndexHeart(element) {
    const article_id = element.id
    const response = await fetch(`${backend_base_url}/article/${article_id}/hearts/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            'content-type': 'application/json',
        },
        method: 'POST',
    }).then((res) => res.json()).then((data) => {
        if (data['message']) {
            alert(data['message'])
            location.reload();
        } else {
            alert("로그인 해주세요.")
        }

    });

}


