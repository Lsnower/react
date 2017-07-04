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
            login: false,
            userdata: {
                userName: null,
                userPortrait: null,
                userid: null
            },
            mesdata: {
                userattention: null,
                userfollower: null,
                userprofit: null
            },
            confirm: {
                show: false,
                content: ''
            },
            fun: null
        };
        this.isLogin = this.isLogin.bind(this);
        this.tologin = this.tologin.bind(this);
        this.haslogin = this.haslogin.bind(this);
    }
    haslogin(e) {
        if (this.state.login) {
            Router.push({
                pathname: e
            })
        } else {
            Router.push({
                pathname: '/login'
            })
        }
    }
    isLogin(e) {
        if (this.state.login) {
            Router.push({
                pathname: e
            })
        } else {
            this.setState({
                confirm: {
                    show: true,
                    content: '您未登录，请重新登录',
                },
                fun: function() {
                    Router.push({
                        pathname: '/login'
                    })
                }
            })
        }
    }
    tologin() {
        Router.push({
            pathname: '/login'
        })
    }
    myfabiao(e) {
        if (this.state.login) {
            Router.push({
                pathname: e
            })
        } else {
            this.setState({
                confirm: {
                    show: true,
                    content: '您未登录，请重新登录',
                },
                fun: function() {
                    Router.push({
                        pathname: '/login'
                    })
                }
            })
        }
    }
    componentDidMount() {
        var that = this;
        localStorage.setItem('withdraw','0');
        $.ajax({
            url: '/user/user/findUserInfo.do',
            type: 'post',
            success: function(d) {
                if (d.code == 200) {
                    that.setState({
                        login: true,
                        userdata: {
                            userName: d.data.userName,
                            userPortrait: d.data.userPortrait,
                            userid: d.data.id
                        }
                    })
                    $.ajax({
                        url: '/coterie/userInterest/getStatistics.do',
                        type: 'post',
                        success: function(d) {
                            if (d.code == 200) {
                                that.setState({
                                    mesdata: {
                                        userattention: d.data.attention,
                                        userfollower: d.data.follower,
                                        userprofit: d.data.viewpoint
                                    }
                                })
                            } else {
                                that.setState({
                                    confirm: {
                                        show: true,
                                        content: d.msg
                                    }
                                })
                            }
                        }
                    })
                } else if (d.code == 503) {

                } else {
                    that.setState({
                        confirm: {
                            show: true,
                            content: d.msg
                        }
                    })
                }
            }
        })

    }
    render() {
        let _inCome, _usable, _totalProfit, _showl, _name, _src;
        let usermes = this.state.userdata,
            mesdata = this.state.mesdata;
        if (usermes.userPortrait) {
            _src = usermes.userPortrait + '?x-oss-process=image/resize,m_fill,h_200,w_200';
        } else {
            _src = '../static/mine/headportrait160x160@3x.png';
        }
        _name = usermes.userName ? usermes.userName : '登录';
        _inCome = mesdata.userattention ? mesdata.userattention : '-';
        _usable = mesdata.userfollower ? mesdata.userfollower : '-';
        _totalProfit = mesdata.userprofit ? mesdata.userprofit : '-';
        _showl = <a onClick={()=>{this.haslogin('/mobi/user/profile')}} className="goDetail" href="javascript:;;">
            <img src={_src} className="img" id="peopleT"/>
            <span className="name">{_name}</span>
            <span className="rightBg youjt2"></span>
            </a>

        return (
            <article className="accounts" id="accounts">
                <div className="user">
                    {_showl}
                </div>
                <div className="account">
                    <ul className="summary clearfix">
                        <li onClick={()=>{this.isLogin('/mobi/user/follow/attention')}}>
                            <p className="account-num" id="inCome">{_inCome}</p>
                            <p className="account-text">关注</p>
                            
                        </li>
                        <li onClick={()=>{this.isLogin('/mobi/user/follow/fans')}}>
                            <p className="account-num" id="usable" >{_usable}</p>
                            <p className="account-text">粉丝</p>
                            
                        </li>
                        <li onClick={()=>{this.myfabiao('/mobi/circle/components/issure')}}>
                            <p className="account-num" id="totalProfit">{_totalProfit}</p>
                            <p className="account-text">我的发表</p>
                            
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
            login: false,
            count: null,
            confirm: {
                show: false,
                content: ''
            },
            fun: null,
            feedcode: null
        };
        this.mxclick = this.mxclick.bind(this);
        this.bowlclick = this.bowlclick.bind(this);
        this.feedback = this.feedback.bind(this);
    }
    mxclick() {
        if (this.state.login) {
            Router.push({
                pathname: '/mobi/wallet/wallet'
            })
        } else {
            this.setState({
                confirm: {
                    show: true,
                    content: '您未登录，请重新登录',
                },
                fun: function() {
                    Router.push({
                        pathname: '/login'
                    })
                }
            })
        }
    }

    bowlclick() {
        if (this.state.login) {
            Router.push({
                pathname: '/mobi/bowl/bowl'
            })
        } else {
            this.setState({
                confirm: {
                    show: true,
                    content: '您未登录，请重新登录',
                },
                fun: function() {
                    Router.push({
                        pathname: '/login'
                    })
                }
            })
        }
    }

    feedback(e) {
        if (this.state.login) {
            Router.push({
                pathname: e
            })
        } else {
            this.setState({
                confirm: {
                    show: true,
                    content: '您未登录，请重新登录',
                },
                fun: function() {
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
            success: function(d) {
                if (d.code == 200) {
                    let c = d.data;
                    let _count = c[0].count;
                    that.setState({
                        login: true,
                        count: _count
                    })
                }
            }
        })
        $.ajax({
            url: '/user/userFeedback/findFeedback.do',
            type: 'post',
            success: function(d) {
                if (d.code == 200) {
                    let c = d.data;
                    that.setState({
                        login: true,
                        feedcode: c
                    })
                }
            }
        })
    }
    render() {
        let _msgcount = this.state.count,
            h, g;
        let _feedmsgcount = this.state.feedcode;
        h = _msgcount == null || _msgcount == 0 ? '' : <span className="newmestip"></span>;
        g = _feedmsgcount == null || _feedmsgcount == 0 ? '' : <span className="newmestip"></span>;
        return (
            <div>
            <ul className="mod-list-sample mod-list mine-mod-list last0">
                <li className="height">
                    <a className="goCash buttn test" onClick={this.mxclick}>
                        <span className="leftBg history imgvallet">
                            
                        </span>
                        <span>钱包</span>
                        <span className="rightBg youjt2"></span>
                    </a>
                </li>
                <li className="height">
                    <a className="goCash buttn test" onClick={this.bowlclick}>
                        <span className="leftBg history imgbowl">
                            
                        </span>
                        <span>聚宝盆</span>
                        <span className="rightBg youjt2"></span>
                    </a>
                </li>
            </ul>
           
            <ul className="mod-list mod-list-sample mine-mod-list last">
                <li className="height" id="tradeAccount" onClick={()=>{this.feedback('/mobi/user/news/systemmes')}}>
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
                <li className="height" id="history" onClick={()=>{this.feedback('/mobi/user/setter/setter')}}>
                        <a className="test" href="javascript:;">
                            <span className="leftBg imgsetting"></span>
                            <span>设置</span>
                            <span className="rightBg youjt2"></span>
                        </a>
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
    constructor(props) {
        super(props)
        this.state = {

        };
    }
    componentDidMount() {}
    render() {
        return <div className="indexcontent">
       		<Account/>

            <Acclistsec/>
       		
		</div>;
    }
}

export default class MineAll extends React.Component {
    constructor(props) {
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