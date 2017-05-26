import React, {
    Component
} from 'react'
import Link from 'next/link';
import Router from 'next/router'
import Header_title from './mobi/common/header/header_title.js';
import Header from './mobi/common/header/header_noleft.js';
import Footer from './mobi/common/footer.js';
import Style from './mobi/user/mine_style.js';
import Alert from './mobi/common/confirm.js';

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
			login:false,
            userdata:{userName:null,userPortrait:null,userid:null},
            mesdata:{userattention:null,userfollower:null,userprofit:null},
            confirm:{show:false,content:''},
            fun:null
		};
        this.isLogin = this.isLogin.bind(this);
        this.tologin = this.tologin.bind(this);
    }
    
    isLogin(e){
        if(this.state.login){
            Router.push({
                pathname: e
            })
        }else{
            this.setState({
                 confirm:{
                    show:true,
                    content:'您未登录，请重新登录',
                },
                fun:function(){
                    Router.push({
                        pathname: '/login'
                    })
                }
            })
        }
    }
    tologin(){
        Router.push({
                pathname: '/login'
            })
    }
    myfabiao(e){
        if(this.state.login){
            Router.push({
                pathname: e
            })
        }else{
            this.setState({
                 confirm:{
                    show:true,
                    content:'您未登录，请重新登录',
                },
                fun:function(){
                    Router.push({
                        pathname: '/login'
                    })
                }
            })
        }
    }
    componentDidMount() {
        var that = this;
        $.ajax({
            url: '/user/user/findUserInfo.do',
            type: 'post',
            success:function(d){
               if(d.code == 200){
                    that.setState({
                        login:true,
                        userdata:{
                            userName:d.data.userName,
                            userPortrait:d.data.userPortrait,
                            userid:d.data.id
                        }
                    })
                    $.ajax({
                        url: '/coterie/userInterest/getStatistics.do',
                        type: 'post',
                        success:function(d){
                            if(d.code == 200){
                                that.setState({
                                    mesdata:{
                                        userattention:d.data.attention,
                                        userfollower:d.data.follower,
                                        userprofit:d.data.viewpoint
                                    }
                                })
                            }else{
                                that.setState({
                                    confirm:{show:true,content:d.msg}
                                })
                            }
                        }
                    })
                }else if(d.code == 503){
                    
                }else{
                    that.setState({
                        confirm:{
                            show:true,
                            content:d.msg
                        },
                        fun:function(){
                            Router.push({
                                pathname: '/login'
                            })
                        }
                    })
                }
            }
        })
        
    }
    render() {
        let _inCome,_usable,_totalProfit,_showl,_name,_src;
        if(!this.state.login){
            _inCome='-';_usable='-';_totalProfit='-';
            _src = '../static/mine/head_visitor.png';
            _showl=<div className="nologin" onClick={()=>{this.tologin()}}>登录</div>
        }else{
            let usermes = this.state.userdata,mesdata = this.state.mesdata;
            if(usermes.userPortrait){
                _src = usermes.userPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200';
            }else{
                _src = '../static/mine/headportrait160x160@3x.png';
            }
            _name = usermes.userName;
            _inCome = mesdata.userattention;
            _usable = mesdata.userfollower;
            _totalProfit = mesdata.userprofit;
            _showl=<a onClick={()=>{this.isLogin('/mobi/user/profile')}} className="goDetail" href="javascript:;;">
                <img src={_src} className="img" id="peopleT"/>
                <span className="name">{_name}</span></a>
        }
        return (
            <article className="accounts" id="accounts">
                <div className="user">
                    {_showl}
                </div>
                <div className="account">
                    <ul className="summary clearfix">
                        <li onClick={()=>{this.isLogin('/mobi/user/follow/attention')}}>
                            <p className="account-text">关注</p>
                            <p className="account-num" id="inCome">{_inCome}</p>
                        </li>
                        <li onClick={()=>{this.isLogin('/mobi/user/follow/fans')}}>
                            <p className="account-text">粉丝</p>
                            <p className="account-num" id="usable" >{_usable}</p>
                        </li>
                        <li onClick={()=>{this.myfabiao('/mobi/circle/components/issure')}}>
                            <p className="account-text">我的发表</p>
                            <p className="account-num" id="totalProfit">{_totalProfit}</p>
                        </li>
                    </ul>
                </div>
                <Alert type='2' confirm={this.state.confirm} isOk={this.state.fun}/>
            </article>
        )
    }
}


class Acclistsec extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login:false,
			count:null,
            confirm:{show:false,content:''},
            fun:null,
            feedcode:null
		};
        this.isxiaox = this.isxiaox.bind(this);
        this.mxclick = this.mxclick.bind(this);
        this.feedback = this.feedback.bind(this);
    }
    mxclick() {
        if(this.state.login){
            Router.push({
                pathname: '/mobi/user/moneydetail/moneydetail'
            })
        }else{
            this.setState({
                 confirm:{
                    show:true,
                    content:'您未登录，请重新登录',
                },
                fun:function(){
                    Router.push({
                        pathname: '/login'
                    })
                }
            })
        }
    }
    isxiaox(e){
        Router.push({
            pathname: e
        })
    }
    feedback(e){
        if(this.state.login){
            Router.push({
                pathname: e
            })
        }else{
            this.setState({
                 confirm:{
                    show:true,
                    content:'您未登录，请重新登录',
                },
                fun:function(){
                    Router.push({
                        pathname: '/login'
                    })
                }
            })
        }
    }
    componentDidMount() {
        
        let that = this;
        $.ajax({
            url: 'msg/msg/count.do',
            type: 'post',
            success:function(d){
                if(d.code == 200){
                    let c = d.data;
                    let _count = c[0].count + c[1].count + c[2].count;
                    that.setState({
                        login:true,
                        count:_count
                    })
                }
            }
        })
        $.ajax({
            url: '/user/userFeedback/findFeedback.do',
            type: 'post',
            success:function(d){
                if(d.code == 200){
                    let c = d.data;
                    that.setState({
                        login:true,
                        feedcode:c
                    })
                }
            }
        })
    }
    render() {
        let _msgcount = this.state.count,h,g;
        let _feedmsgcount = this.state.feedcode;
        h = _msgcount == null || _msgcount == '0' ? '' :(_msgcount > 99 ? <span className="newmestip">新消息<b>99+</b></span> : <span className="newmestip">新消息<b> {_msgcount} </b>条</span>);
        g = _feedmsgcount == null || _feedmsgcount == '0' ? '' : (_feedmsgcount > 99 ? <span className="newmestip">未读反馈<b>99+</b></span> : <span className="newmestip">未读反馈<b> {this.state.feedcode} </b>条</span>);
        return (
            <div>
            <ul className="mod-list mod-list-sample mine-mod-list ">
                <li className="height">
                    <a className="goCash buttn test" onClick={this.mxclick}>
                        <span className="leftBg history imgdeali">
                            
                        </span>
                        <span>明细</span>
                        <span className="rightBg youjt2"></span>
                    </a>
                </li>
            </ul>
            <ul className="mod-list mod-list-sample mine-mod-list last">
                <li className="height" id="tradeAccount" onClick={()=>{this.isxiaox('/mobi/user/news/economiccircle')}}>
                        <a href="javascript:void(0);" id="tuig">
                            <span className="leftBg extension imgnews">
                    
                            </span>
                            <span>消息</span>
                            <span className="rightBg rightBg1 youjt2"></span>
                            {h}
                        </a>
                </li>
                <li className="height" id="history" onClick={()=>{this.feedback('/mobi/user/feedback/feedback')}}>
                        <a className="test" href="javascript:;">
                            <span className="leftBg imgopinion"></span>
                            <span>意见反馈</span>
                            <span className="rightBg youjt2"></span>
                            {g}
                        </a>
                </li>
                <li className="height" id="history">
                    <Link href="./mobi/user/setter/setter">
                        <a className="test" href="javascript:;">
                            <span className="leftBg imgsetting"></span>
                            <span>设置</span>
                            <span className="rightBg youjt2"></span>
                        </a>
                    </Link>
                </li>
                <li className="height" id="history">
                    <Link href="./mobi/user/about/about">
                        <a className="test" href="javascript:;">
                            <span className="leftBg imgaboutus"></span>
                            <span>关于我们</span>
                            <span className="rightBg youjt2"></span>
                        </a>
                    </Link>
                </li>
                <Alert type='2' confirm={this.state.confirm} isOk={this.state.fun}/>
            </ul>
            </div>
        )
    }
}

class Minecontent extends React.Component {
	constructor(props){
        super(props)
		this.state = {
			
		};
    }
	componentDidMount(){
    }
    render() {
    	return <div className="indexcontent">
       		<Account/>

            <Acclistsec/>
       		
		</div>;
    }
}

export default  class MineAll extends React.Component {
    constructor(props){
        super(props)
        
    }
    render() {
        return <div style={{'overflow-x': 'hidden'}}>
        <Header_title text="乐米-我的"/>
         <section className="page-main main-mine">
            <Style/>
            <div className="content">
                <Minecontent/>
            </div>
        </section>
        
        <Footer active="mine"/>
        
    </div>
    }
}
