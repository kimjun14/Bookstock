import React, { useState } from 'react';

function CategoryList({ onCategoryClick }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = [
        {
            name: '소설',
            subcategories: [
                '소설 전체',
                '한국소설',
                '영미소설',
                '일본 소설',
                '중국 소설',
                '북유럽 소설',
                '독일 소설',
                '프랑스 소설',
                '기타 국가 소설',
                '추리/미스터리/스릴러',
                'SF 소설',
                '국내 판타지 소설',
                '해외 판타지 소설',
                '국내 역사소설',
                '해외 역사소설',
                '대체 역사소설',
                '동양 고전문학',
                '서양 고전문학'
            ],
        },
        {
            name: '경영/경제',
            subcategories: [
                '경영/경제 전체',
                '경영일반',
                '경제일반',
                '마케팅/세일즈',
                '재테크/금융/부동산',
                'CEO/리더십'
            ],
        },
        {
            name: '인문/사회/역사',
            subcategories: [
                '인문/사회/역사 전체',
                '인문',
                '정치/사회',
                '예술/문화',
                '역사'
            ],
        },
        {
            name: "자기계발",
            subcategories: [
                '자기계발 전체',
                '성공/삶의자세',
                '기획/창의/리더십',
                '설득/화술/협상',
                '취업/창업',
                '여성',
                '인간관계'
            ]
        },
        {
            name: "에세이/시",
            subcategories: [
                '에세이/시 전체',
                '에세이',
                '시'
            ]
        },
        {
            name: "여행",
            subcategories: [
                '여행 전체',
                '국내여행',
                '해외여행'
            ]
        },
        {
            name: "종교",
            subcategories: [
                '종교 전체',
                '종교일반',
                '가톨릭',
                '기독교(개신교)',
                '불교',
                '기타'
            ]
        },
        {
            name: '외국어',
            subcategories: ['외국어 전체',
                '비즈니스영어',
                '일반영어',
                '제2외국어',
                '어학시험']
        },
        {
            name: '과학',
            subcategories: [
                '과학 전체',
                '과학일반',
                '수학',
                '자연과학',
                '응용과학']
        },
        {
            name: '진로/교육/교재',
            subcategories: ['진로/교육/교재 전체',
                '공부법',
                '특목고/자사고',
                '대입 수시',
                '대입 논술',
                '대입 합격수기',
                '진로 탐색',
                '유학/MBA',
                '교재/수험서']
        },
        {
            name: '컴퓨터/IT',
            subcategories: [
                '컴퓨터/IT 전체',
                'IT 비즈니스',
                '개발/프로그래밍',
                '컴퓨터/앱 활용',
                'IT자격증',
                'IT 해외원서'
            ],
        },
        {
            name: '건강/다이어트',
            subcategories: [
                '건강/다이어트 전체',
                '다이어트/운동/스포츠',
                '스타일/뷰티',
                '건강'
            ],
        },
        {
            name: '가정/생활',
            subcategories: [
                '가정/생활 전체',
                '결혼/임신/출산',
                '육아/자녀교육',
                '취미/요리/기타'
            ],
        },
        {
            name: "어린이/청소년",
            subcategories: [
                '어린이/청소년 전체',
                '유아',
                '어린이',
                '청소년',
            ]
        },
        {
            name: '해외도서',
            subcategories: ['해외도서 전체']
        },
        {
            name: '잡지',
            subcategories: ['잡지 전체',
                '경영/재테크',
                '문학/교양',
                '여성/패션/뷰티',
                '디자인/예술',
                '건강/스포츠',
                '취미/여행/요리',
                '과학/IT',
                '종교',
                '만화']
        }
    ];

    return (
        <div className="category-list">
            <ul>
                {categories.map((category, in_dex) => (
                    <li className='mainCate'
                        key={in_dex}
                        onClick={() => onCategoryClick(category.name)}
                        onMouseEnter={() => setSelectedCategory(category)}
                    >
                        {category.name}<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-compact-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671" /> {/* stroke-width를 조절 */}
                        </svg>
                    </li>
                ))}
            </ul>

            {/* 두 번째 컬럼 */}
            <ul style={{ background: 'rgba(17, 135, 207, 0.2)', marginLeft: '0.5rem' }}>
                {selectedCategory?.subcategories && selectedCategory.subcategories.map((sub, idx) => (
                    <li className='subCate' key={idx}>{sub}</li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;

