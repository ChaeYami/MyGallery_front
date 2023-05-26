$(document).ready(async function () {
  // 토큰 가져오기
  let token = localStorage.getItem("access");

  // 토큰 존재 여부 확인
  if (!token) {
    window.location.href = `${frontend_base_url}/user/login.html`; // 토큰이 없을 경우 login.html로 리디렉션
  }

  // 이미지 띄우기, 아직 업로드X
  $('#image-input').change(async function () {
    var change_id = $('#model-select').val();
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

    if (file && change_id) {
      // FormData 객체 생성
      var formData = new FormData();
      formData.append('image', file);
      formData.append('change_id', change_id);

      // api.js와 연합
      const response = await TransForm(formData)

      // 이미지 프리뷰를 생성하여 표시
      if (response.image_data) {
        var imageData = response.image_data;
        var imageExtension = file.type.split('/')[1]; // 이미지 파일의 확장자 추출
        var imageSrc = `data:image/${imageExtension};base64,${imageData}`;
        $('#image-preview').attr('src', imageSrc);
      } else {
        console.log("Error: Image data not found in response");
      }

      // $('#image-preview').attr('src', `${backend_base_url}${response.image_url}`);
    } else if (change_id === undefined) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#image-preview').attr('src', e.target.result);
      };
      reader.readAsDataURL(file);
    }

  });

  $('#model-select').off('change').on('change', async function () {
    var change_id = $('#model-select').val()
    var file = $('#image-input').prop('files')[0];

    // 이미지가 있으면 추가
    if (file && change_id) {
      // FormData 객체 생성
      var formData = new FormData();
      formData.append('image', file);
      formData.append('change_id', change_id);

      // api.js와 연합
      const response = await TransForm(formData)

      // console.log(response);
      // console.log(response.image_data);

      // 이미지 프리뷰를 생성하여 표시
      if (response.image_data) {
        var imageData = response.image_data;
        var imageExtension = file.type.split('/')[1]; // 이미지 파일의 확장자 추출
        var imageSrc = `data:image/${imageExtension};base64,${imageData}`;
        $('#image-preview').attr('src', imageSrc);
      } else {
        console.log("Error: Image data not found in response");
      }

      // $('#image-preview').attr('src', `${backend_base_url}${response.image_url}`);
    } else if (change_id === undefined) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#image-preview').attr('src', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });




});
