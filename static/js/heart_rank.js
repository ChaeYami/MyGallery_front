// ------------------------- 좋아요 순위 -------------------------

// 순위 데이터를 가져와서 화면에 표시하는 함수
async function displayRankings() {
    try {
      const response = await fetch(`${backend_base_url}/article/hearts_rank/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}` // 로컬 스토리지에서 토큰 값을 가져와 헤더에 추가합니다.
        },
        method: 'GET',
      }); 
      
      if (response.ok) {
        var rankList = await response.json();
        const rankContainer = document.getElementById('heart_rank');
      
        // 테이블 생성
        const table = document.createElement('table');
        table.classList.add('rank-table');
      
        // 테이블 헤더 생성
        const tableHeader = document.createElement('thead');
        tableHeader.innerHTML = `
          <tr>
            <th>순위</th>
            <th class = "rank-author">작성자</th>
            <th>제목</th>
            <th>❤️</th>
          </tr>
        `;
      
        table.appendChild(tableHeader);
      
        // 테이블 바디 생성
        const tableBody = document.createElement('tbody');
      
        rankList.forEach((rankItem) => {
          // 각 순위 항목을 테이블 행으로 추가
          const tableRow = document.createElement('tr');
          tableRow.innerHTML = `
            <td>${rankItem.rank}</td>
            <td class = "rank-author">${rankItem.author}</td>
            <td style="cursor: pointer; width:10px"><a href="${frontend_base_url}/article/detail.html?id=${rankItem.article_id}">${rankItem.title}</a></td>
            <td>${rankItem.hearts}</td>
          `;
          tableBody.appendChild(tableRow);
        });
      
        table.appendChild(tableBody);
        rankContainer.appendChild(table);
      } else {
        console.error('Failed to load rankings:', response.status);
      }
      
        
    } catch (error) {
      console.error('Error:', error);
    }

    
    
  };
  
  // 페이지 로드 시 순위 데이터를 가져와서 표시합니다.
  window.addEventListener('DOMContentLoaded', async () => {
    await displayRankings();
  });
  