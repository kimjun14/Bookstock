import React from 'react';

function CategoryList({ onCategoryClick }) {
  // 카테고리 목록
  const categories = [
    '소설',
    '경영/경제',
    '인문/사회/역사',
    '자기계발',
    '에세이/시',
    '여행',
    '종교',
    '외국어',
    '과학',
    '진로/교육/교재',
    '컴퓨터/IT',
    '건강/다이어트',
    '가정/생활',
    '어린이/청소년',
    '해외도서',
    '잡지',
  ];

  return (
    <ul>
      {categories.map((category, index) => (
        <li key={index} onClick={() => onCategoryClick(category)}>
          {category}
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
