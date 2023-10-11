import React, { useState } from 'react';

function CategoryList({ onCategoryClick }) {
    const categories = [
        {
            name: '소설',
        },
        {
            name: '경영/경제',
        },
        {
            name: '인문/사회/역사',
        },
        {
            name: "자기계발",
        },
        {
            name: "에세이/시",
        },
        {
            name: "여행",
        },
        {
            name: "종교",
        },
        {
            name: '외국어',
        },
        {
            name: '과학',
        },
        {
            name: '진로/교육/교재',
        },
        {
            name: '컴퓨터/IT',
        },
        {
            name: '건강/다이어트',
        },
        {
            name: '가정/생활',
        },
        {
            name: "어린이/청소년",
        },
        {
            name: '해외도서',
        },
        {
            name: '잡지',
        }
    ];

    return (
        <div className="category-list">
            <ul>
                {categories.map((category, in_dex) => (
                    <li className='mainCate'
                        key={in_dex}
                        onClick={() => onCategoryClick(category.name)}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;
