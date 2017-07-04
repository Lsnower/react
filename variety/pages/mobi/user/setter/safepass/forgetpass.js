import React, {
  Component
} from 'react'
import Router from 'next/router';
import Alert from '../../../common/confirm.js';
import Header_title from '../../../common/header/header_title.js';
import Header from '../../../common/header/header_left.js';
class Acclist extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            phone:localStorage.getItem('userphone'),
            html:'获取验证码',
            wait:60,
            type:false,
            confirm:{
                show:false,
                content:'',
                title:''
            },
            fun:null,
            has:null,
            yanzno:true
        }
        this.getMsgCode = this.getMsgCode.bind(this);
        this.getTimeout = this.getTimeout.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        
    }
    getTimeout(t){
        var that = this,html = that.state.html;
        if(that.state.wait == 0){
            that.setState({html:'重新获取',wait:60,smsCode:false,yanzno:true});
        }else{
            that.setState({
                v:true,
                html: that.state.wait + "s"
            });
            setTimeout(function(){
                that.state.wait--;
                that.getTimeout();
            },1000);
        }
    }
    getMsgCode(e){
        e.preventDefault();
        var t = this;
        t.setState({
            confirm:{
                show:false,
                content:'',
                title:''
            }
        })
        if(t.state.yanzno){
            t.setState({
                yanzno:false
            })
            $.ajax({
                url:'/user/userAccount/sendMsgCodeForPass.do',
                data:{phone:t.state.phone.replace(/[ ]/g,"")},
                type:'post',
                success:function(d){
                    if(d.code == 200){
                        t.getTimeout()
                    }else{

                    }

                }
            })
        }
        
	
    }
    handleChange(e) {
	    var c = e.target.value;
        var b = c.length > 3 ? this.setState({type:true}) : this.setState({type:false})
    }
    handleClick(){
        var t = this;
        if(t.state.type){
            $.ajax({
                url:'/user/userAccount/forgetPassword.do',
                data:{phone:t.state.phone.replace(/[ ]/g,""),code:$(t.refs.yzcode).val()},
                type:'post',
                success:function(d){
                    if(d.code == 200){
                        Router.push({
                            pathname: '/mobi/user/setter/safepass/changepass',
                            query:{code:$(t.refs.yzcode).val()}
                        })
                    }else{
                        t.setState({
                            confirm:{
                                show:true,
                                content:d.msg,
                                title:''
                            },
                            fun:function(){
                                t.setState({
                                    confirm:{
                                        show:false,
                                        content:'',
                                        title:''
                                    },
                                })
                            },
                            has:function(){
                                t.setState({
                                    confirm:{
                                        show:false,
                                        content:'',
                                        title:''
                                    },
                                })
                            }
                        })
                    }

                }
            })
        }
    }
    render() {
        var a = this.state.type ? 'upok upokactive' : 'upok';
        var b = this.state.phone;
        var c = b ? b.substr(0,4)+'****'+b.substr(8,12) :'';
        console.log(b)
        return (
            <div>
                <Header_title text="忘记安全密码"/>
                <div><Header text="忘记安全密码" /></div>
                 <section className="page-main main-mine">
                    <div className="content">
                        <ul className="content_forget">
                            <li>
                                <p>{c}</p>
                            </li>
                            <li>
                                <input ref="yzcode" onChange={(e)=>{this.handleChange(e)}} type="tel" name="phone" maxLength="13" placeholder="验证码"/>
                                <span onClick={this.getMsgCode}>{this.state.html}</span>
            
                            </li>
                        </ul>
                        <div className={a} onClick={this.handleClick}>确定</div>
                    </div>
                </section>
                <Alert type='2' confirm={this.state.confirm} isNot={this.state.has} isOk={this.state.fun}/>
                <style jsx global>{`
                    .content_forget{
                        width:100%;
                    }
                    .content_forget li{
                        height:0.45rem;
                        width:100%;
                        background:#fff;
                        position: relative;
                    }
                    .content_forget li p{
                        border-bottom:1px solid #e7e7e8;
                        height:100%;
                        width:100%;
                        line-height:0.45rem;
                        text-indent: 0.15rem;
                    }
                    .content_forget li input{
                        width:100%;
                        line-height:0.3rem;
                        text-indent: 0.15rem;
                        height:0.3rem;
                        margin-top:0.08rem;
                    }
                    .content_forget li span{
                        display: block;
                        width:0.9rem;
                        height:0.25rem;
                        background:#f5f5f5;
                        border-radius:0.1rem;
                        position: absolute;
                        top:0.11rem;
                        right:.21rem;
                        text-align: center;
                        line-height:0.25rem;
                        font-size: 0.14rem;
                        color:#222222;
                    }
                    .upok{
                        width:90%;
                        margin:0.4rem auto;
                        height:0.44rem;
                        text-align:center;
                        line-height:0.44rem;
                        font-size:0.15rem;
                        color:#ffffff;
                        background:#999999;
                        border-radius:0.05rem;
                    }
                    .upokactive{
                        background:#cd4a47;
                    }
                `}</style>
            </div>
        )
    
}
}

export default Acclist