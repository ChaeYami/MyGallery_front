$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search).get('user_id');
    getFollowers(urlParams)
})



function getFollowers(user_id) {
    $('#card_list').empty()

    $.ajax({
        url: `${backend_base_url}/user/${user_id}/follow/`,
        type: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response)
            // const rows = response;
            // for (let i = 0; i < rows.length; i++) {

            //     let temp_html = ``
            // }

        },
        error: function () {
            alert("불러오기 실패!");
        }
    });
}