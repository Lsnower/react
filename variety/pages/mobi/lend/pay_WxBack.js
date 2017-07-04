/*
* @Author: Maolin
* @Date:   2017-05-16 18:12:06
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-25 10:38:36
*/

import Router from 'next/router';
import QRCode from 'qrcode.react';
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import Confirm from '../common/confirm.js';

class WxPay extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            fun:null,
            confirm:{
                show:false,
                content:'',
                title:'',
            },
            src:null,
            uerseid:null,
            cannot:null
        };
        this.ensure = this.ensure.bind(this);
        this.canvasToImg=this.canvasToImg.bind(this);
        this.canNot=this.canNot.bind(this);
        this.handback=this.handback.bind(this);
    }
    componentDidMount(){
        let t = this;
        $.ajax({
            type:'post',
            url:'/user/user/findUserInfo.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        uerseid:d.data.id
                    });
                }else{
                    t.setState({
                        isLogin:false
                    });
                }
                
            }
        });
        this.canvasToImg();
    }
    ensure(){
        var t = this;
        var orderId = t.props.url.query.orderId;

        //判断当前订单有没有支付成功
        setTimeout(function(){
            $.ajax({
                type:'post',
                url:'/user/userpay/confirmPay.do',
                data:{orderId:orderId},
                dataType:'json',
                success:function(d){
                    if(d.code==200){
                        Router.push({
                            pathname:'/mobi/lend/lend_detail',
                            query:{id:orderId,userId:t.state.uerseid,type:'detail',lendType:'',yespay:'1'}
                        }) 
                    }else{
                        t.setState({
                            confirm:{
                                show:true,
                                content:d.msg,
                                title:'',
                            },
                            fun:function(){
                                t.setState({
                                    confirm:{
                                        show:false,
                                        content:'',
                                        title:'',
                                    }
                                })
                            },
                            cannot:t.canNot
                        })
                    }

                }
            });
        },3000)
    }
    handback(){
        var t = this;
        var orderId = t.props.url.query.orderId;
        setTimeout(function(){
            $.ajax({
                type:'post',
                url:'/user/userpay/confirmPay.do',
                data:{orderId:orderId},
                dataType:'json',
                success:function(d){
                    if(d.code==200){
                        //支付成功跳转到订单详情
                        Router.push({
                            pathname:'/mobi/lend/lend_detail',
                            query:{id:orderId,userId:t.state.uerseid,type:'detail',lendType:'',yespay:'1'}
                        }) 
                    }else{
                        //未支付成功
                        window.history.back()
                    }

                }
            });
        },3000)
    }
    canNot(){
        var orderId = this.props.url.query.orderId;
        Router.push({
            pathname:'/mobi/lend/pay',
            query:{id:orderId}
        }) 
    }
    canvasToImg(){
        var image = new Image(),
            canvas = document.getElementsByTagName('canvas')[0],
            
            src = canvas.toDataURL("image/png");
        this.setState({
            src:src
        })
    }
    render(){
        return(
            <div>
                <Header_title text="微信"/>
                <header id="head">
                    <div className="head_content">
                        <h3 className="productName">
                            <span>微信</span>
                            <em></em>
                        </h3>
                        <div className="left">
                            <a className="demozuo" onClick={this.handback}></a>
                        </div>
                    </div>
			     </header>
                <section className="wrap">
                    <div className="logo">
                        <img className="img" src={this.state.src}/>
                        <div style={{display:'none'}}>
                            <QRCode  id="canvas" value={this.props.url.query.codeUrl} size={184}/>
                        </div>
                    </div>
                    <div className="text">
                        <p>1.长按二维码保存至相册或直接使用微信扫描二维码</p>
                        <p>2.如果你已完成，请点击“已完成支付”</p>
                    </div>
                    <ul className="prompt-btn">
                        <li className="go-back" onClick={()=>{this.ensure()}}>已完成支付</li>
                    </ul>
                </section>
                <Confirm type='2' confirm={this.state.confirm} isNot={this.state.cannot} isOk={this.state.fun}/>
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
                        text-align: center;
                        margin: .2rem auto;
                    }
                    .logo .img{
                        display: inline-block;
                        width: 1.84rem;
                        height: 1.84rem;
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
                    .prompt-btn{
                        margin-top:.2rem;
                    }
                    .prompt-btn li{
                        width: 100%;
                        height: .5rem;
                        line-height: .5rem;
                        color: #cd4a47;
                        text-align: center;
                        font-size: .15rem;
                        border-radius: .04rem;
                        border: 1px solid #cd4a47;
                    }
                `}</style>
            </div>
        )
    }
}

export default WxPay;
