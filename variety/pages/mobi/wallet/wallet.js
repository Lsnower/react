import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import Style from './walletcss.js';
import $ from 'jquery';
import Alert from '../common/confirm.js';
class Edite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirm:{
                show:false,
                content:''
            },
            fun:null,
            nofun:null,
            login:false,
            moneymsg:null,
            isbank:false,
            ispass:false,
            showyes:'确定',
            backasy:false,
            nohas:null
        }
        this.mxclick = this.mxclick.bind(this);
        this.rechargeclick = this.rechargeclick.bind(this);
        this.bankclick = this.bankclick.bind(this);
        this.withdrawclick = this.withdrawclick.bind(this);
    }
    componentDidMount(){
        var t = this;
        if(localStorage.getItem('showalert')=='1'){
            this.setState({
                 confirm:{
                    show:true,
                    content:'银行卡信息已填写，交易后绑定',
                },
                nohas:'1',
                fun:function(){
                    localStorage.setItem('showalert','');
                    t.setState({
                         confirm:{
                            show:false,
                            content:'',
                        }
                    })
                }
            })
        }
        $.ajax({
            type:'post',
            url:'/user/userAccount/userAccountInfo.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        moneymsg:d.data,
                        login:true
                    })
                }else if(d.code==503){
                    t.setState({
                        login:false
                    })
                }
            }
        });
        $.ajax({
            type:'post',
            url:'/user/bankCard/hasBindBankCard.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    if(d.data[0].bindStatus){
                        t.setState({
                            isbank:true
                        })
                        if(d.data[0].bindStatus=='2'){
                            t.setState({
                                backasy:true
                            })
                        }
                    }
                }
            }
        });
        $.ajax({
            type:'get',
            url:'/user/userAccount/hasPassword.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    if(d.data){
                        t.setState({
                            ispass:true
                        })
                    }
                }
            }
        });
    }
    //充值跳转
    rechargeclick(){
        if(this.state.login){
            Router.push({
                pathname: '/mobi/wallet/recharge/rechargehtml'
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
    withdrawclick(){
        var t = this;
        if(this.state.login){
            if(this.state.ispass == false){
                Router.push({
                    pathname: '/mobi/user/setter/safepass/password',
                    query:{
                        type:'1'
                    }
                })
            }else if(this.state.isbank == false){
                t.setState({
                    confirm:{
                        show:true,
                        content:'您还未绑定任何银行卡',
                    },
                    nohas:'2',
                    fun:function(){
                        Router.push({
                            pathname: '/mobi/wallet/bankcard/bankcardhtml',
                            query:{
                                type:'1'
                            }
                        })
                    },
                    showyes:'去绑卡',
                    nofun:function(){
                        t.setState({
                            confirm:{
                                show:false,
                                content:'',
                            }
                        })
                    }
                    
                })
                
            }else if(this.state.isbank && this.state.ispass){
                Router.push({
                    pathname: '/mobi/wallet/withdraw/withdrawhtml',
                    query:{

                        money:this.state.moneymsg ? this.state.moneymsg.money.toFixed(2) : '00.00',
                        showtip:false
                    }
                })
            }
        }else{
            this.setState({
                 confirm:{
                    show:true,
                    content:'您未登录，请重新登录',
                },
                nohas:'2',
                fun:function(){
                    Router.push({
                        pathname: '/login'
                    })
                },
                showyes:'确定'
            })
        }
    }
    //明细跳转
    mxclick() {
        if(this.state.login){
            Router.push({
                pathname: '/mobi/wallet/bankcard/bankcardhtml'
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
    
    //银行卡跳转
    bankclick(){
        if(this.state.isbank == true && this.state.backasy == true){
            Router.push({
                pathname: '/mobi/wallet/bankcard/bank'
            })
        }else{
            Router.push({
                pathname: '/mobi/wallet/bankcard/bankcardhtml'
            })
        }
    }
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    moneydeail(){
        Router.push({
            pathname: '/mobi/user/moneydetail/moneydetail'
        })
    }
    render() {
        var a = this.state.moneymsg ? this.state.moneymsg.money.toFixed(2):'0.00';
        return (
            <section className="page-main">
                <div className="showmoney">
                    <p>账户余额</p>
                    <span>{a}</span>
                </div>
                <ul className="mod-list mod-list-sample mine-mod-list last">
                    <li className="height" id="tradeAccount">
                            <a href="javascript:void(0);" id="tuig" onClick={this.rechargeclick}>
                                <span className="leftBg extension imgrecharge">
                                </span>
                                <span>充值</span>
                                <span className="rightBg rightBg1 youjt2"></span>
                            </a>
                    </li>
                    <li className="height" id="history">
                        <a className="test" href="javascript:;" onClick={this.withdrawclick}>
                            <span className="leftBg imgwithdraw"></span>
                            <span>提现</span>
                            <span className="rightBg youjt2"></span>
                        </a>
                    </li>
                    <li className="height" id="history">
                        <a className="test" href="javascript:;" onClick={this.moneydeail}>
                            <span className="leftBg imgdetail"></span>
                            <span>明细</span>
                            <span className="rightBg youjt2"></span>
                        </a>
                    </li>
                </ul>
                <ul className="mod-list mod-list-sample mine-mod-list last gotspy">
                    <li className="height">
                        <a className="goCash buttn test" onClick={this.bankclick}>
                            <span className="leftBg history imgcard">

                            </span>
                            <span>银行卡</span>
                            <span className="rightBg youjt2"></span>
                        </a>
                    </li>
                </ul>
                <Alert type={this.state.nohas} yes={this.state.showyes} confirm={this.state.confirm} isNot={this.state.nofun} isOk={this.state.fun}/>
            </section>
        )
    }
}

export default  class Username extends React.Component {
    
    render() {
        return <div>
        <Header_title text="钱包"/>
        <div><Header path="/mine" color='headcolor' text="钱包" /></div>
        <Style/>
        <Edite/>
    </div>
    }
}
