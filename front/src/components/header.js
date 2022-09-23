import {React, useState} from "react";
import profile from '../assets/sample_profile.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isLogin, setisLogin] = useState(true)

	return (
    <header>
      <nav className="relative bg-white shadow dark:bg-gray-800">
        <div className="container px-6 py-4 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-orange-600">
                <Link to="/" className="text-2xl font-bold text-orange-600 transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
                  Weplace
                </Link>
              </div>

              <div className="flex lg:hidden">
                  <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                      </svg>
              
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                  </button>
              </div>
            </div>
            <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
              <div className="flex items-center mt-4 lg:mt-0 gap-3">
                <button 
                  onClick={() => setisLogin(!isLogin)}
                  className={(isLogin ? '' : 'hidden ') + 'flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-400 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80'}>
                  <img className="w-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAB0UlEQVRIie3Wz25NYRQF8H3MBBOhoU3boAkjr+ABxESK0CdANRLepSWRiEQIrYToCzCQ0BEJRgz8G6qOSt3+DO5uetHb+91zSyddw3PWXmvvfb5vnx2xhf+EqpSIwYg4FxHHIuJoROyOiOWI+BAR7yNiNiIeVlX1cUMywxBuoaEzlnAd/b2ansF8ii7iNk5hGNuxA4dxFnfxPbkLOFHXdALLKXQfQwUxBzGdMQ2Md2s6mqYNXKqR9BX8zPiyyjGQrYKJbk3/MIdv2F8ScCMDpuuatmjNpNa1EvIkPuf1acd5gjn0ddA6lAduCQM1cv9L8HlW8qrA/F5yL2yEcV+adjTHWPIe92ycgnvxMkXftDtAec/h7XpiT9XHXBvNXfl+ofX5tp7K3gys0ep9bXhHkvN6I0w353DhRYlpcleu0/lOopP4Yv0B8kzZABlROkCsjsyZdYkFwIPUmioh92sOdrjcg+nV1Jhvd/DWCjqp+VtcrmOepiu/xePdBo9bXQSmMVwQM9LS3gYudpv0itAovqbQIu7gNA5orj47856OaW4pP1ra212la5gP4ma2rhOWMFXyTbtZbwfi9/V2T0Q0ornevovmevuoqqpPtSrcwr/CL+M4DzTsEXbEAAAAAElFTkSuQmCC" alt="login"/>
                  <span className="mx-1">Login</span>
                </button>
                <button type="button" className={(isLogin ? 'hidden ' : '') + "flex items-center focus:outline-none"} aria-label="toggle profile dropdown">
                  <div className="w-10 h-10 overflow-hidden border border-gray-400 rounded-full">
                    <img src={profile} className="object-cover w-full h-full" alt="avatar"/>
                  </div>
                  <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">jj.park</h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
