import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import $ from 'jquery';
import Link from 'next/link';
import Alert from '../../common/confirm.js';
import Style from './rechargehtmlcss.js';
class Edite extends Component {
    constructor(props) {
        super(props)
        this.state={
            html:'获取验证码',
            wait:60,
            confirm:{
                show:false,
                content:'',
                title:''
            },
            fun:null,
            has:null,
            type:false,
            bankmsg:null,
            nowtime:null,
            orderid:null,
            yzcode:null,
            agreeasy:false,
            yanzno:true
        }
        this.getTimeout = this.getTimeout.bind(this);
        this.getMsgCode = this.getMsgCode.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formattime = this.formattime.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showtotal = this.showtotal.bind(this);
        this.agree = this.agree.bind(this);
    }
    componentDidMount(){
        var t = this;
        var timestamp = Date.parse(new Date()); 
        t.formattime(timestamp);
        $(t.refs.clickinput).click();
        $.ajax({
            url:'/user/bankCard/hasBindBankCard.do',
            data:{},
            type:'post',
            success:function(d){
                if(d.code == 200){
                    t.setState({
                        bankmsg:d.data[0]
                    })
                }else{
                                
                }
            }
        })
    }
    showtotal(){
       var that = this;
        $(that.refs.success_mask).show();
        $(that.refs.success_mask).animate({'opacity':1},500,function(){	
			$(that.refs.success_mask).animate({'opacity':0},500,function(){
				$(that.refs.success_mask).hide();
                                
			})					
		}) 
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
        var c = t.state.bankmsg.cardPhone;
        t.setState({
            confirm:{
                show:false,
                content:'',
                title:''
            }
        })
        var _json={};
        _json.platform = t.props.platform;
        _json.money = t.props.paymoney;
        _json.bankcardId = t.state.bankmsg.id;
        if(t.state.yanzno){
            t.setState({
                yanzno:false
            })
            $.ajax({
                url:'/user/userpayForDeposit/payDepositMoney.do',
                data:_json,
                type:'post',
                success:function(d){
                    if(d.code == 200){
                        t.getTimeout()
                        t.setState({
                            orderid:d.data.merchantOrderId
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
    handleChange(e) {
	    var c = (e.target.value).replace(/^ +| +$/g,'');
        this.setState({
            yzcode:c,
            confirm:{
                show:false,
                content:'',
                title:'提示'
            }
        })
        var b = c.length > 0 ? this.setState({type:true}) : this.setState({type:false})
    }
    handleClick(){
        var t = this;
        if(this.state.type && this.state.agreeasy){
            var _json={},t=this;
            _json.merchantOrderId= this.state.orderid ? this.state.orderid : '';
            _json.checkCode = this.state.yzcode;
            $.ajax({
                url:'/user/userpayForDeposit/payCheckByQt.do',
                data:_json,
                type:'post',
                success:function(d){
                    if(d.code == 200){
                        t.showtotal();
                        setTimeout(function(){
                            Router.push({
                                pathname:'/mobi/wallet/wallet'
                            }) 
                        },800)
                    }else{
                        t.setState({
                            confirm:{
                                show:true,
                                content:d.msg,
                                title:'提示'
                            },
                            fun:function(){
                                t.setState({
                                    confirm:{
                                        show:false,
                                        content:'',
                                        title:''
                                    }
                                })
                            },
                            has:function(){
                                t.setState({
                                    confirm:{
                                        show:false,
                                        content:'',
                                        title:''
                                    }
                                })
                            }
                        })            
                    }
                }
            })
        }
        
    }
    agree(e){
        this.setState({
            agreeasy:!this.state.agreeasy
        })
    }
    formattime(n){
        
		var time = new Date(n).getTime();
		var year = new Date(n).getFullYear();
		var mon = new Date(n).getMonth() +1;
		mon = mon >= 10? mon:'0'+mon;
		var day = new Date(n).getDate();
		day = day >= 10? day:'0'+day;
		var hour=new Date(n).getHours()<10?"0"+new Date(n).getHours():new Date(n).getHours();
		var min=new Date(n).getMinutes()<10?"0"+new Date(n).getMinutes():new Date(n).getMinutes();
        var sec=new Date(n).getSeconds()<10?"0"+new Date(n).getSeconds():new Date(n).getSeconds();
		var t=  year+'-'+mon+'-'+day+' '+hour+':'+min+':'+sec;
        this.setState({
            nowtime:t
        })
	}
    render() {
        var b,c,d,f,g;
        b = this.state.bankmsg;
        c = b ? b.cardPhone : '';
        d = b ? b.issuingBankName+'('+b.cardNumber.substr(b.cardNumber.length-4,b.cardNumber.length)+')':'';
        f = b ? b.realName.substr(0,1)+'**':'';
        g = b ? b.idCard.substr(0,4)+'**********'+b.idCard.substr(b.idCard.length-4,b.idCard.length):'';
        var a = this.state.type && this.state.agreeasy ? 'linkbu selthat' : 'linkbu';
        return (
            <section className="page-main ourbank">
                <ul className="bankpay">
                    <li>
                        <p>交易金额：</p>
                        <p className="showmoney">{(this.props.paymoney).toFixed(2)+'元'}</p>
                    </li>
                    <li>
                        <p>交易时间：</p>
                        <p>{this.state.nowtime}</p>
                    </li>
                </ul>
                <ul className="bankpay" style={{'marginTop':'0.2rem'}}>
                    <li>
                        <p>银行卡号：</p>
                        <p>{d}</p>
                    </li>
                    <li>
                        <p>姓名：</p>
            
                        <p>{f}</p>
                    </li>
                    <li>
                        <p>身份证号：</p>
                        <p>{g}</p>
                    </li>
                    <li>
            
                        <p>手机号：</p>
                        <p>{c}</p>
                    </li>
                </ul>
                <div className="getyanzcode">
                    <div style={{'width':'90%','margin':'0 auto','height':'100%'}}>
                        <p>验证码：</p>
                        <input onChange={(e)=>{this.handleChange(e)}} type='text' placeholder="请输入短信验证码"/>
                        <span onClick={this.getMsgCode}>{this.state.html}</span>
                    </div>

                </div>
                 <div className={a} onClick={this.handleClick}>确认充值</div>
                <div className="agreement">
                    <label>
                        <input ref="clickinput" onClick={this.agree} name="agreement" type="checkbox" value="true" />
                        <span>我已阅读并同意</span>
                    </label>
                    <Link href="./bankrule">
                        <a href="javascript:;;">《认证支付服务协议》</a>
                    </Link>
                    
                </div>
                <Alert type='2' isNot={this.state.has} confirm={this.state.confirm} isOk={this.state.fun}/>
                <div ref="success_mask" className="success_mask">
					<img src="/static/circle/popovers_icon_succeed@3x.png" />
					<p>充值成功</p>
                </div>
            </section>
        )
    }
}

export default  class Username extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
        <Header_title text="确认充值"/>
        <div><Header text="确认充值" /></div>
        <Edite platform={this.props.url.query.platform} paymoney={parseFloat(this.props.url.query.money)}/>
        <Style/>
    </div>
    }
}
