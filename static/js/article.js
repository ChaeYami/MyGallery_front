$(document).ready(async function () {
  // 토큰 가져오기
  let token = localStorage.getItem("access");

  // 토큰 존재 여부 확인
  if (!token) {
    window.location.href = `${frontend_base_url}/user/login.html`; // 토큰이 없을 경우 login.html로 리디렉션
  }

  // 이미지 띄우기, 아직 업로드X
  $('#image-input').click(function () {
      $('#image-input').change(function () {
          var file = this.files[0];
          var reader = new FileReader();

          // 파일 크기 제한 (단위: 바이트)
          var maxSize = 3 * 100 * 1024; // 300KB 제한

          // 파일 유효성 검사
          var validImageTypes = ['image/jpeg', 'image/png']; // 허용되는 이미지 파일의 MIME 유형들
          if (!validImageTypes.includes(file.type)) {
              alert('이미지 파일만 업로드할 수 있습니다.');
              return;
          }

          if (file.size > maxSize) {
              alert('이미지 파일 크기는 3KB를 초과할 수 없습니다.');
              return;
          }

          // if 1,2,3,4,5,6,7,8, else
          console.log($('#model-select').val())
          
          // FileReader를 사용하여 이미지 파일을 읽고, 미리보기 이미지로 설정
          reader.onload = function (e) {
              $('#image-preview').attr('src', e.target.result);

              var change_id = $('#model-select').val()
              // $('.view-img').addClass('card-img-top')
          }
          reader.readAsDataURL(file);
      })
  });

  $('#model-select').click(function () {
    $('#model-select').change(function () {

      var change_id = $('#model-select').val()
      console.log(change_id)
      var file = $('#image-input').prop('files')[0];
      console.log(file)

      // FormData 객체 생성
      var formData = new FormData();

      // 이미지가 있으면 추가
      if (file && change_id) {
        formData.append('image', file);
        console.log('테스트');
        
        $.ajax({
          url: `${backend_base_url}/change/` + change_id + `/`,
          type: 'POST',
          data: formData,
          Headers: {
            "Authorization": `Bearer ${token}`,
          },
          success: function (data) {
            console.log(data)
            console.log(data.url)
            $('#image-preview').attr('src', data.url);
          },
          error: function (error) {
            window.location.href = "404.html";
          }
        });  
      };    
    });
  });



});
