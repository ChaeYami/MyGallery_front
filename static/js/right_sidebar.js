document.addEventListener("DOMContentLoaded", function () {

    // 오른 사이드바를 삽입할 위치
    const rightSidebarContainer = document.querySelector("#right-sidebar");

    if (rightSidebarContainer) {
        fetch("../right_sidebar.html")
            .then(response => response.text())
            .then(data => {
                rightSidebarContainer.innerHTML = data;


                const payload = localStorage.getItem("payload");
                const payload_parse = JSON.parse(payload);
                intro.innerHTML = `
                <a href="${frontend_base_url}/user/profile.html?user_id=${payload_parse.user_id}">
                <span><img class="profile-img" src="${backend_base_url}/media/${payload_parse.profile_img}" alt=""></span>
                ${payload_parse.nickname}</a>
            `


            })
            .catch(error => {
                console.error("사이드바를 불러오는데 오류가 발생했습니다.", error);
            });
    }

})

//로그아웃
async function handlelogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}