import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router'
import Style from '../style.js';


const Header = ({
    text,little,path
}) => (
    <div>
        <header id="head" >
            <div className="head_content">
                <h3 className="productName">
                    <span>{text}</span>
                    <em>{little||''}</em>
                </h3>
                <div className="left">
                    <a href={path?path:"javascript:window.history.back()"} className="backIcon"></a>
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
                font-size: .1rem;
                left: 0;
                width: 100%;
                text-align: center;
                color:#999;
            }
            #head{
                background: #222;
                color: #ccc;
                border:none;
            }
            
            #head h3 span:nth-of-type(1) {
                font-size: .15rem;
            }
        `}</style>
    </div>
);

export default Header;
