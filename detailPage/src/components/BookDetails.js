import React from 'react';
import Comments from './Comments';

function BookDetails() {
  // 실제 데이터는 API에서 가져올 수 있습니다.
  const book = {
     title: "책 제목",
     author: "저자",
     price: "가격",
     publisher: "출판사",
     description: "판매자가 작성한 상세 설명"
 };

return (
<div className="book-details">
<h2>{book.title}</h2>
<p>{book.author}</p>

{/* 여기에 이미지 슬라이더 추가 */}

<p>{book.price}</p>
<p>{book.publisher}</p>

{/* 판매자 설명 */}
<div className="description">
<h3>상세설명</h3>
<p>{book.description}</p>

{/* 댓글 영역 */}
<div className="comments">
   <Comments />
</div>

</div>
</div>
);
}

export default BookDetails;
