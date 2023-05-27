window.onload = () => {
    // const urlParams = new URLSearchParams(window.location.search).get('id');
    ArticleDetail();
    loadComments();
    CountHeart();
    isHearted()

}

const article_id = new URLSearchParams(window.location.search).get('id');
async function ArticleDetail() {


    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        method: 'GET',
    })

    response_json = await response.json()

    const author = document.getElementById('author');
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const created_at = document.getElementById('created-at');
    // const updated_at = document.getElementById('updated-at');

    const editBtn = document.getElementById('edit-btn');
    const deleteBtn = document.getElementById('delete-btn');

    const img = document.getElementById('article-img');

    author.innerHTML = response_json.user.nickname
    title.innerText = response_json.title
    content.innerText = response_json.content
    created_at.innerText = response_json.created_at
    // updated_at.innerText = response_json.updated_at

    img.innerHTML = `<img class="article-list-image" src="${backend_base_url}${response_json.changed_image}" alt="">`

    if (response_json.user.pk === user_id) {
        editBtn.style.display = 'block';    
        deleteBtn.style.display = 'block';  
    } else {
        editBtn.style.display = 'none';   
        deleteBtn.style.display = 'none'; 
    }
}

// 수정 페이지로 이동
function redirectUpdatePage() {
    window.location.href = `update_article.html?id=${article_id}`;
}


// 글 삭제

async function ArticleDelete() {
    if (confirm("삭제하시겠습니까?")) {
        const response = await fetch(`${backend_base_url}/article/${article_id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
                'content-type': 'application/json',
            },
            method: 'DELETE',
        })
        if (response.status === 204) {
            alert("삭제 완료!")
            location.replace('../index.html')
        } else {
            alert("권한이 없습니다.")
        }
    }
}


// 댓글 작성

async function save_comment() {
    const comment = document.getElementById("comment").value

    const token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/article/${article_id}/comment/`, {
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + token,
        },
        method: 'POST',
        body: JSON.stringify({
            "comment": comment,

        })
    })

    if (response.status == 201) {
        alert("댓글 작성 완료")
        location.reload();
    } else if (comment == '') {
        alert("댓글을 입력해 주세요.")
    }

}

// 댓글 불러오기

async function loadComments() {
    const response = await fetch(`${backend_base_url}/article/${article_id}/comment/`);
    const comments = await response.json();




    comments.forEach((comment) => {
        const commentList = document.getElementById('comment-list');
        commentList.insertAdjacentHTML('beforeend', `
        
        <div>
        
                <a href = "http://127.0.0.1:5500/user/profile.html?user_id=${comment.user.pk}">${comment.user.nickname}</a>
            </div>
            <div id="comment-${comment.id}" style="max-width: 1000px;">
                <div>
                    
                    <div>
                        <!-- 유저 프로필 사진 -->

                    </div>
                    <!-- 댓글 제목과 내용 입력-->
                    <div id="comment-section">
                        <div id="comment-body">
                            <pid="comment-content-${comment.id}">${comment.comment}</p>

                        </div>
                        <div id="comment-buttons-section">
    
                            <a href="#" onclick = "CommentDelete(${comment.id})">댓글삭제</a>
                        </div>
                        <div id="comment-created-at">${comment.comment_created_at}</div>
                    </div>
                </div>
            </div>
        
        `);
    });
}


// 댓글 삭제
async function CommentDelete(comment_id) {

    if (confirm("삭제하시겠습니까?")) {
        const response = await fetch(`${backend_base_url}/article/comment/${comment_id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access"),
                'content-type': 'application/json',
            },
            method: 'DELETE',
        })
        if (response.status === 204) {
            alert("삭제 완료!")
            location.reload();
        } else {
            alert("권한이 없습니다.")
        }
    }
}

// 좋아요 누르기
async function ClickHeart() {

    const response = await fetch(`${backend_base_url}/article/${article_id}/hearts/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            'content-type': 'application/json',
        },
        method: 'POST',
    })
    if (response.status === 200) {
        alert("❤️")
        location.reload();
    }
}


// 좋아요 갯수
async function CountHeart() {

    const response = await fetch(`${backend_base_url}/article/${article_id}/hearts/`, {
        headers: {

            'content-type': 'application/json',
        },
        method: 'GET',
    })
    response_json = await response.json()
    document.getElementById('heart-count').innerText = response_json.hearts
}


// 게시글 좋아요 여부
const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload)
const user_id = payload_parse.user_id

async function isHearted() {
    const response = await fetch(`${backend_base_url}/article/hearts/${user_id}`, {
        method: 'GET',
    });

    if (response.ok) {
        const articles = await response.json();
        const ids = articles.map(article => parseInt(article.id));
        const intarticle_id = parseInt(article_id)
        const isArticleExists = ids.includes(intarticle_id);
        if(isArticleExists){
            document.getElementById('heart-icon').innerText  ='❤️'
        }else{
            document.getElementById('heart-icon').innerText= '♡'

        }
    } else {
        console.error('Failed to load articles:', response.status);
    }
}