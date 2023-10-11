import React, { useState } from 'react';

function CategoryList({ onCategoryClick }) {
    const categories = [
        {
            name: '소설',
            category:1
        },
        {
            name: '경영/경제',
            category:2
        },
        {
            name: '인문/사회/역사',
            category:3
        },
        {
            name: "자기계발",
            category:4
        },
        {
            name: "에세이/시",
            category:5
        },
        {
            name: "여행",
            category:6
        },
        {
            name: "종교",
            category:7
        },
        {
            name: '외국어',
            category:8
        },
        {
            name: '과학',
            category:9
        },
        {
            name: '진로/교육/교재',
            category:10
        },
        {
            name: '컴퓨터/IT',
            category:11
        },
        {
            name: '건강/다이어트',
            category:12
        },
        {
            name: '가정/생활',
            category:13
        },
        {
            name: "어린이/청소년",
            category:14
        },
        {
            name: '해외도서',
            category:15
        },
        {
            name: '잡지',
            category:16
        }
    ];

    return (
        <div className="category-list">
            <ul>
                {categories.map((category, in_dex) => (
                    <li className='mainCate'
                        key={in_dex}
                        onClick={() => onCategoryClick(category)}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;
