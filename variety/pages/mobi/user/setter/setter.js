import React, {
  Component
} from 'react'
import Link from 'next/link';
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Style from './setter_css.js';
class Acclist extends Component {
  constructor(props) {
        super(props)
        this.state={
            type:false
        }
        this.handclick = this.handclick.bind(this); 
  }
  componentWillMount(){
      
  }
  componentDidMount() {
      let that = this;
        $.ajax({
            url:'/user/userAccount/hasPassword.do',
            data:{},
            success:function(d){
                if(d.code == 200){
                    that.setState({
                        type:d.data
                    })
                }else{
                            
                }

            }
        })
  }
  handclick(){
      var t = this;
      t.state.type ? Router.push({pathname: '/mobi/user/setter/safepass/setpass'}) : Router.push({pathname: '/mobi/user/setter/safepass/setpasstwo'})
      
  }
  render() {
      
        return (
            <div className="content">
                <ul className="content_set">
                    <li onClick={this.handclick}>
                        <a href="javascript:;;">
                          安全中心
                          <span className="youjt2"></span>
                        </a>
                    </li>
                    <li>
                      <Link href='./screen'>
                        <a href="#">
                          屏蔽
                          <span className="youjt2"></span>
                        </a>
                      </Link>
                    </li>
                </ul>
            </div>
        )
    
  }
}
export default () => (
  <div>
        <Header_title text="设置"/>
        <div><Header path="/mine" text="设置" /></div>
         <section className="page-main main-mine">
            <Style/>
            <Acclist/>
        </section>
    </div>
)