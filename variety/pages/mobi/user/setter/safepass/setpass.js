import React, {
  Component
} from 'react'
import Link from 'next/link';
import Router from 'next/router';
import Alert from '../../../common/confirm.js';
import Header_title from '../../../common/header/header_title.js';
import Header from '../../../common/header/header_left.js';
import Style from '../setter_css.js';
import Text_none from '../../../common/text_none.js';
import InfiniteScroll from 'react-infinite-scroll-component';
class Acclist extends React.Component{
  constructor(props) {
        super(props)
  }
  componentDidMount() {

  }
  render() {
        return (
            <div>
                <Header_title text="安全设置"/>
                <div><Header path="/mobi/user/setter/setter" text="安全设置" /></div>
                 <section className="page-main main-mine">
                    <Style/>
                    <div className="content">
                        <ul className="content_set">
                            <li>
                                <Link href='./changepass'>
                                    <a href="#">修改安全密码<span className="youjt2"></span></a>   
                                </Link>
                            </li>
                            <li>
                              <Link href='./forgetpass'>
                                <a href="#">
                                  忘记安全密码
                                  <span className="youjt2"></span>
                                </a>
                              </Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        )
    
}
}

export default Acclist