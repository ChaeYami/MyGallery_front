$(document).ready(async function () {
  // 토큰 가져오기
  let token = localStorage.getItem("access");

  // 토큰 존재 여부 확인
  if (!token) {
    window.location.href = `${frontend_base_url}/user/login.html`; // 토큰이 없을 경우 login.html로 리디렉션
  }

  // 이미지 띄우기, 아직 업로드X
  $('#image-input, #model-select').click(function () {    
    $('#image-input').change(function () {
      console.log("이미지 인풋 바뀜")
      var file = $('#image-input').prop('files')[0];

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
      // console.log($('#model-select').val())
      var reader = new FileReader();

      // FileReader를 사용하여 이미지 파일을 읽고, 미리보기 이미지로 설정
      reader.onload = function (e) {
          $('#image-preview').attr('src', e.target.result);

          
          // $('.view-img').addClass('card-img-top')
      }
      reader.readAsDataURL(file);
    });

    $('#model-select').off('change').on('change', async function () {
      console.log("모델 선택 바뀜")
      var change_id = $('#model-select').val()
      var file = $('#image-input').prop('files')[0];
      
      // FormData 객체 생성
      var formData = new FormData();
      
      console.log("모델 선택 바뀜2")
      // 이미지가 있으면 추가
      if (file && change_id) {
        formData.append('image', file);
        
        // api.js와 연합
        const response = await TransForm(change_id, formData)

        $('#image-preview').attr('src', `${backend_base_url}${response.image_url}`);      
      } else if (change_id === undefined){
        var reader = new FileReader();
        reader.onload = function(e) {
          $('#image-preview').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
      }  
    });

  });



});
