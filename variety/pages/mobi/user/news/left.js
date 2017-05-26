import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router'
//import Style from '../../style.js';
const Header = ({
    text
}) => (
    <div>
        <header id="head">
            <div className="head_content">
                <h3 className="productName">
                    <span>{text}</span>
                </h3>
                <div className="left">
                    <Link href="../../../mine">
                        <a href="javascript:;;" className="demozuo"></a>
                    </Link>
                </div>

                <div className="right">
                    <a href="#"></a>
                </div>
            </div>
        </header>
        <style jsx>{`

        `}</style>
    </div>
);

export default Header;
