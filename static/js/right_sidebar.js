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
                intro.innerText = `${payload_parse.nickname}님 안녕하세요`;
                intro.href = `${frontend_base_url}/user/profile.html?user_id=` + payload_parse.user_id;

            
            })
            .catch(error => {
                console.error("Error fetching navigation bar:", error);
            });
    } 

})

//로그아웃
async function handlelogout(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}