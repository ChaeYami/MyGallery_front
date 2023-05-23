document.addEventListener("DOMContentLoaded", function () {

    // 왼 사이드바를 삽입할 위치
    const leftSidebarContainer = document.querySelector("#left-sidebar");

    if (leftSidebarContainer) {
        fetch("../right_sidebar.html")
            .then(response => response.text())
            .then(data => {
                leftSidebarContainer.innerHTML = data;

                
                const payload = localStorage.getItem("payload");
                const payload_parse = JSON.parse(payload);
                intro.innerText = `${payload_parse.nickname}님 안녕하세요`;
                intro.href = `${frontend_base_url}/user/profile.html?user_id=` + payload_parse.user_id;

                let navbarRight = document.getElementById("navbar-right");
                let newLi = document.createElement("li");
                newLi.setAttribute("class", "nav-item");

                let logoutBtn = document.createElement("button");
                logoutBtn.setAttribute("class", "nav-link btn");
                logoutBtn.innerText = "로그아웃";
                logoutBtn.setAttribute("onclick", "handleLogout()");


                newLi.appendChild(logoutBtn);

                navbarRight.appendChild(newLi);
            

                let loginbtn = document.getElementById("login-btn");
                if (loginbtn) {
                    loginbtn.style.display = "none";
                }

                let signupbtn = document.getElementById("signup-btn");
                if (signupbtn) {
                    signupbtn.style.display = "none";
                }

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