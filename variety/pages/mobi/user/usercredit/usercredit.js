import React, {
  Component
} from 'react'
import Router from 'next/router'
import Link from 'next/link';
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Style from '../mine_style.js';
import $ from 'jquery'

class Edite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }
    componentDidMount(){
        var _this=this;
        $.ajax({
            type:'get',
            url:'/user/user/userCertification.do',
            data:{id:_this.props.id},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    this.setState({
						data : d.data
					});
                }
                
            }.bind(this)
        });
    }
    render() {
		var s = {0:'审核中',1:'已认证',2:'未认证'};
		var userStatus = this.state.data ? s[this.state.data.status] : '未认证';
        if (userStatus=='已认证') {
            $('#renzheng').css('color','#869bcb')
        }
        return (
            <section className="page-main">
                <ul className="page-mainC">
                    <li>
                        <div className="page-content">
                            <Link href="/mobi/user/usercredit/approve"><a style={{ position: 'relative' }}>
                                <span>实名认证</span>
                                <span className="youjt"></span>
                                <span className="right text-lesser" ref='shenhe' id="renzheng">{userStatus}</span>
                            </a></Link>
                        </div>
                    </li>
                </ul>
            </section>
        )
    }
}
export default () => (
  <div>
        <Header_title text="信用"/>
        <div><Header text="信用" /></div>
        <Style/>
        <Edite/>
    </div>
)