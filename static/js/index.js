const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

$(document).ready(function () {
    getArticles()
})


function getArticles() {
    $('#card_list').empty()

    $.ajax({
        url: `${backend_base_url}/article/`,
        type: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response[0])
            const rows = response;
            for (let i = 0; i < rows.length; i++) {
                let article_id = rows[i]['id']
                let article_title = rows[i]['title']
                let article_author = rows[i]['user']
                let article_image = rows[i]['changed_image']

                let temp_html = `<div class="card">
                                    <div class="image_box">
                                        <a href="" id="img${article_id}">
                                            <img class="image"
                                                src="${backend_base_url}${article_image}"
                                                alt="">
                                        </a>
                                    </div>
                                    <div class="box_wrap">
                                        <div class="text_box">
                                            <div class="title">
                                                <a href="" id="title${article_id}">
                                                    ${article_title}
                                                </a>
                                            </div>
                                            <div class="author">
                                                <a href="">
                                                    ${article_author}
                                                </a>
                                            </div>
                                        </div>
                                        <div class="like_box">
                                            <div class="like_image_box">
                                                <a href="">
                                                    <img class="like_image"
                                                        src="https://png.pngtree.com/png-vector/20220428/ourmid/pngtree-smooth-glossy-heart-vector-file-ai-and-png-png-image_4557871.png"
                                                        alt="">
                                                </a>
                                            </div>
                                            <div class="like_count">
                                                27
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