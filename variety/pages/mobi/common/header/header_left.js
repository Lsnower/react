import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router'
import Style from '../style.js';


const Header = ({
    text,little,path
}) => (
    <div>
        <header id="head" className=''>
            <div className="head_content">
                <h3 className="productName">
                    <span>{text}</span>
                    <em>{little||''}</em>
                </h3>
                <div className="left">
                    <a href={path?path:"javascript:window.history.back()"} className="demozuo"></a>
                </div>

                <div className="right">
                    <a href="#"></a>
                </div>
            </div>
        </header>
        <style jsx>{`
            .hide{
                display:none;
            }
            .productName{
                position:relative;
            }
            .productName em{
                position: absolute;
                top: .18rem;
                font-size: .12rem;
                left: 50%;
                margin-left: -.32rem;
            }
        `}</style>
    </div>
);

export default Header;
