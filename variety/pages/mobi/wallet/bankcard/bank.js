import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import $ from 'jquery';
import Alert from '../../common/confirm.js';
class Edite extends Component {
    constructor(props) {
        super(props)
        this.state={
            bankmsg:null,
            confirm:{
                show:false,
                content:'',
                title:''
            },
            fun:null
        }
        this.handclick = this.handclick.bind(this);
    }
    componentDidMount(){
        var t = this;
        $.ajax({
            type:'post',
            url:'/user/bankCard/queryBankCard.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.setState({
                        bankmsg:d.data[0]
                    })
                }
            }
        });
    }
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    handclick(){
        var t = this;
        t.setState({
            confirm:{
				show:true,
				content:'为了保障用户信息安全，如需解绑银行卡,请点击联系客服',
                title:'解绑银行卡'
            },
            
            fun:function(){
                Router.push({
                    pathname: '/mobi/user/feedback/feedback'
                })
            }
        })
    }
    render() {
        var a,b,c,d,f;
        a = this.state.bankmsg ? this.state.bankmsg.issuingBankName : '';
        b = this.state.bankmsg ? (this.state.bankmsg.cardNumber).substr((this.state.bankmsg.cardNumber).length-4) : '';
        return (
            <section className="page-main">
                <div className="showbankimg">
                    <div className="jiebang" onClick={this.handclick}>解绑</div>
                    <p>{a}</p>
                    <span>储蓄卡</span>
                    <b>{b}</b>
                </div>
                <Alert type='2' yes='联系客服' confirm={this.state.confirm} isOk={this.state.fun}/>
                <style jsx>{`
                    .showbankimg{
                        width:95%;
                        margin:0.1rem auto;
                        height:1rem;
                        background:url(../../../../static/wallet/mine_wallet_cardbg@2x.png) no-repeat top left;
                        background-size: 100% 1rem;
                        padding:0.15rem 9%;
                        box-sizing: border-box;
                        -webkit-box-sizing:border-box;
                        -moz-box-sizing:border-box;
                        position: relative;
                    }
                    .showbankimg p{
                        color:#ffffff;
                        font-size:0.15rem;
                    }
                    .showbankimg span{
                        font-size:0.12rem;
                        color:#ffffff;
                    }
                    .showbankimg b{
                        position: absolute;
                        top: 72%;
                        right: 20%;
                        color: #fff;
                        font-size:0.14rem;
                    }
                    .jiebang{
                        position: absolute;
                        top: 10%;
                        right: 6%;
                        color: #fff;
                        font-size:0.14rem;
                        color:#969696;
                    }
                `}</style>
            </section>
        )
    }
}

export default  class Username extends React.Component {
    
    render() {
        return <div>
        <Header_title text="银行卡"/>
        <div><Header path='/mobi/wallet/wallet' text="银行卡" /></div>
        <Edite/>
    </div>
    }
}
