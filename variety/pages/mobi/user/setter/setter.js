import React, {
  Component
} from 'react'
import Link from 'next/link';
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Style from './setter_css.js';

export default () => (
  <div>
        <Header_title text="设置"/>
        <div><Header text="设置" /></div>
         <section className="page-main main-mine">
            <Style/>
            <div className="content">
                <ul className="content_set">
                    <li>
                      <Link href='./screen'>
                        <a href="#">
                          屏蔽设置
                          <span className="youjt2"></span>
                        </a>
                      </Link>
                    </li>
                </ul>
            </div>
        </section>
    </div>
)