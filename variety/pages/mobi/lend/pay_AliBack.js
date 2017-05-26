/*
* @Author: Maolin
* @Date:   2017-05-16 15:38:47
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-24 19:50:51
*/


import Router from 'next/router';
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import LendUserInfo from './lend_userInfo.js';
import Lend_con from './lend_con.js';
import Confirm from '../common/confirm.js';



class Pay_back extends React.Component{
    constructor(props) {
        super(props);
        this.state={};
        this.isPay = this.isPay.bind(this);
        this.paySuccess = this.paySuccess.bind(this);
    }
    componentDidMount(){

    }
    //继续支付
    isPay(){
        var t = this;
        var orderId = t.props.url.query.orderId,codeUrl=this.props.url.query.codeUrl;

        //判断当前订单有没有支付成功
        $.ajax({
            type:'post',
            url:'/user/userpay/confirmPay.do',
            data:{orderId:orderId},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    //支付成功跳转到订单详情
                    Router.push({
                        pathname:'/mobi/lend/pay_success',
                        query:{orderId:orderId}
                    }) 
                }else{
                    //未支付成功
                    window.location.href = codeUrl;
                }
                
            }
        });    
    }
    //已完成支付
    paySuccess(){
        var t = this;
        var orderId = t.props.url.query.orderId;

        //判断当前订单有没有支付成功
        $.ajax({
            type:'post',
            url:'/user/userpay/confirmPay.do',
            data:{orderId:orderId},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    //支付成功
                    Router.push({
                        pathname:'/mobi/lend/pay_success',
                        query:{orderId:orderId}
                    }) 
                }else{
                    // 支付未成功
                    t.setState({
                        show:true,
                        content:d.msg,
                        code: d.code
                    })
                }
                
            }
        }); 
    }
    canNot(){
        var orderId = this.props.url.query.orderId;
        this.setState({show:!this.state.show})
        Router.push({
            pathname:'/mobi/lend/pay',
            query:{id:orderId}
        }) 
    }
    canOk(){
        this.setState({show:!this.state.show})
    }
    render(){
        return (
            <div>
                <Header_title text="支付宝"/>
                <Header text="支付宝"/>
                <section className="wrap">
                    <div className="logo">
                        <img src="/static/circle/alipay@3x.png"/>
                    </div>
                    <div className="text">
                        <p>1.如果未打开支付宝或未完成付款，请点击“继续支付”；</p>
                        <p>2.如果你已完成，请点击“已完成支付”</p>
                    </div>
                    <ul className="prompt-btn">
                        <li className="go-on" onClick={()=>{this.isPay()}}>继续支付</li>
                        <li className="go-back" onClick={()=>{this.paySuccess()}}>已完成支付</li>
                    </ul>
                </section>
                <Confirm type={2} confirm={this.state} isOk={()=>{this.canOk()}}/>
                <style jsx global>{`
                    html,body{
                       background: #fff; 
                    }
                `}</style>
                <style jsx>{`
                    .wrap{
                        padding:.1rem;
                    }
                    .logo{
                        width: 100%;
                        height: 1.7rem;
                        line-height: 1.7rem;
                        text-align: center;
                    }
                    .logo img{
                        display: inline-block;
                        width: .71rem;
                        height: .71rem;
                        margin-top: .4rem;
                    }
                    .text{
                        color: #82848a;
                        margin-bottom: .2rem;
                    }
                    .text p{
                        height: .24rem;
                        line-height: .24rem;
                        font-size: .12rem;
                        text-align: justify;    
                    }
                    .prompt-btn li{
                        width: 100%;
                        height: .5rem;
                        line-height: .5rem;
                        color: #fff;
                        text-align: center;
                        font-size: .15rem;
                        border-radius: .04rem;
                        margin-top:.1rem;
                    }
                    .go-on{
                        background: #cd4a47;
                    }
                    .go-back{
                        background: #82848a;
                    }
                `}</style>
            </div>
        )
    }
}

export default Pay_back;
