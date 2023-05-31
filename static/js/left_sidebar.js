document.addEventListener("DOMContentLoaded", function () {

    // 왼 사이드바를 삽입할 위치
    const leftSidebarContainer = document.querySelector("#left-sidebar");

    if (leftSidebarContainer) {
        fetch("../left_sidebar.html")
            .then(response => response.text())
            .then(data => {
                leftSidebarContainer.innerHTML = data;
            })
            .then(() => {
                // 이 것이 없어서 로그아웃이 나오는 것 같음 오류 발생 시 삭제 하시면 됨.

                const payload = localStorage.getItem("payload");
                const payload_parse = JSON.parse(payload);
                const me_id = payload_parse.user_id;

                if (me_id) {
                    $.ajax({
                        url: `${backend_base_url}/user/${me_id}/`,
                        type: "GET",
                        dataType: "json",
                        success: function (response) {
                            console.log(response)
                            const nickname = response['nickname']
                            const point = response['point']
                            const account = response['account']
                            const profile_image = response['profile_img']
                            const email = response['email']

                            $('#profile_url_tag').attr('href', `${frontend_base_url}/user/profile.html?user_id=${me_id}`)
                            $('#profile_img_tag').attr('src', `${backend_base_url}${profile_image}`)
                            $('#nickname_tag').text(`${nickname}(${account})`)
                            $('#point_tag').text(`포인트 : ${point} point`)
                            $('#email_tag').text(email)
                        }
                    });
                }

                let navbarRight = document.getElementById("navbar-right");
                let newLi = document.createElement("li");
                newLi.setAttribute("class", "nav-item");

                let logoutBtn = document.createElement("a");
                logoutBtn.setAttribute("class", "nav-link btn");
                logoutBtn.innerHTML = `
                <img src="../static/img/logout.png" alt="" style="width:40px;">&nbsp로그아웃
                `;
                logoutBtn.setAttribute("href", "#");

                logoutBtn.setAttribute("onclick", "confirmLogout()");


                newLi.appendChild(logoutBtn);

                navbarRight.appendChild(newLi);


                let loginbtn = document.getElementById("login-btn");
                let signupbtn = document.getElementById("signup-btn");

                let createbtn = document.getElementById('create-article')
                if (loginbtn) {
                    loginbtn.style.display = "none";
                    createbtn.style.display = "block";
                    signupbtn.style.display = "none";
                }



            })
            .catch(error => {
                console.error("사이드바를 불러오는데 오류가 발생했습니다.", error);
            });
    }

})

//로그아웃
function confirmLogout() {
    if (confirm("로그아웃하시겠습니까?")) {
        handleLogout();
    }
}
async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.replace('../index.html')
}


// 글 작성 팝업 열기
function openPosting() {
    $('#posting_popup_iframe').attr('src', `${frontend_base_url}/article/create_article.html`);
    $('html, body').css({
        'overflow': 'hidden'
    });
    $('#posting_popup').fadeIn(200);
    $('.popup').scrollTop(0);
}


// 글 작성 팝업 닫기
function closePosting() {
    $('html, body').css({
        'overflow': 'auto'
    });
    $('#posting_popup').fadeOut(200);
}
