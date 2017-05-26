import Head from 'next/head';
import Head_title from './header_title.js';
const Header = ({text}) => (
    <div>
        <header id="head" className=''>
            <div className="head_content">
                <h3 className="productName">
                    <span>{text}</span>
                </h3>
            </div>
        </header>
        <style jsx>{`
        .hide{display:none}
        `}</style>
    </div>
);

export default Header;
