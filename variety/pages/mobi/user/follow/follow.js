import React, {
  Component
} from 'react'
import Link from 'next/link';
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Style from '../setter/setter_css.js';

class Acclist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,

    }
  }
  handClick() {

  }
  componentDidMount() {

  }
  render() {
    let data = [{
      mes: '有心喜欢'
    }, {
      mes: '大叔大婶多'
    }],
      templete;
    if (data) {
        templete = data.map(function(v,r){
            return (
                <li key={r} className="clear">
                    <img src="../../static/head_visitor.png"/>
                    <div className="listcon">{v.mes}</div>
                    <a href="javascript:;;">解除</a>
                </li>
            )
        })
    }else{
        templete = "";
    }
    return (
      <section className="page-main main-mine">
        <Style/>
        <div className="content">
          <ul className="screen_list">
             {templete}
          </ul>
        </div>
      </section>
    )
  }
}

export default () => (
  <div>
    <Header_title text="乐米-关注"/>
    <div><Header text="关注" /></div>
    <Acclist/>
  </div>
)