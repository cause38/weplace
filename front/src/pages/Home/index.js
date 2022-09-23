import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container-wb'>
      <div className="flex flex-col justify-center items-center gap-10 w-full font-sans-g">
        <h3 className='text-3xl font-semibold text-orange-500 mb-10'>🤔오늘의 메뉴는</h3>
        <div className='relative flex items-center w-6/12 w-lg:w-1/3'>
          <div className='w-10/12 p-6 py-8 bg-orange-400 rounded-lg shadow-md'>
            <div className='p-8 py-10 bg-white rounded-lg shadow-inner text-4xl font-bold text-orange-500 text-center'>
              제육볶음
            </div>
          </div>
          <div className='absolute right-0 bottom-2 w-2/12 h-3/5 bg-orange-500 rounded-r-lg'>
            <svg viewBox="0 0 114 355" version="1.1" className="absolute top-0 left-1/2 -translate-y-full -translate-x-1/2 w-2/4 cursor-pointer">
              <g id="lever">
                <rect id="socket" fill="#3A6255" x="43" y="355" width="28" height="91.5"></rect>
                <rect id="rod" fill="#D8D8D8" x="43" y="57" width="28" height="298"></rect>
                <g id="top">
                  <circle fill="#F0A830" cx="57" cy="57" r="57"></circle>
                  <path d="M102.570209,40.1833305 C102.676794,40.0838119 102.777304,39.9779482 102.871517,39.8656698 C105.889032,36.2695351 101.304331,27.4546828 92.6313004,20.177146 C83.9582698,12.8996092 74.4812099,9.91524313 71.4636947,13.5113778 C71.3644458,13.629658 71.273421,13.753584 71.1904954,13.8829152 C76.2444491,16.5602964 82.1808506,20.6036755 88.1462014,25.6091992 C94.0729258,30.5823114 99.0593916,35.6922002 102.570209,40.1833305 Z" id="highlight" fill="#FFFFFF" transform="translate(87.494931, 26.085223) rotate(7.000000) translate(-87.494931, -26.085223) "></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className='flex gap-4 bg-white shadow-lg rounded-lg p-10 mt-12 text-center'>
        <div className='w-1/3 bg-white shadow-lg rounded-lg p-10'>slide1</div>
        <div className='w-1/3 bg-white shadow-lg rounded-lg p-10'>slide1</div>
        <div className='w-1/3 bg-white shadow-lg rounded-lg p-10'>slide1</div>
        <div className='w-1/3 bg-white shadow-lg rounded-lg p-10'>slide1</div>
        <div className='w-1/3 bg-white shadow-lg rounded-lg p-10'>slide1</div>
      </div>

      <div className='grid grid-cols-4 gap-6 mt-12 text-center text-lg font-semibold text-orange-500'>
          <Link to="/category" className='col-span-2 bg-white shadow-lg rounded-lg p-10'>전체 보기<p className='mt-6 text-5xl'>😋🍴</p></Link>
          <Link to="/category" className='bg-white shadow-lg rounded-lg p-10'>한식<p className='mt-6 text-5xl'>🍚</p></Link>
          <Link to="/category" className='bg-white shadow-lg rounded-lg p-10'>중식<p className='mt-6 text-5xl'>🥟</p></Link>
          <Link to="/category" className='bg-white shadow-lg rounded-lg p-10'>일식<p className='mt-6 text-5xl'>🍣</p></Link>
          <Link to="/category" className='bg-white shadow-lg rounded-lg p-10'>양식<p className='mt-6 text-5xl'>🍝</p></Link>
          <Link to="/category" className='bg-white shadow-lg rounded-lg p-10'>분식<p className='mt-6 text-5xl'>🥠</p></Link>
          <Link to="/category" className='bg-white shadow-lg rounded-lg p-10'>아시안 매장<p className='mt-6 text-5xl'>🍜</p></Link>
      </div>
    </div>
  );
};

export default Home;
