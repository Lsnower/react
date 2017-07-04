import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import $ from 'jquery';
import Alert from '../../common/confirm.js';
import Style from './withdrawhtmlcss.js';
class Edite extends Component {
    constructor(props) {
        super(props)
        this.state={
            money:null,
            tipasy:'true',
            bankmsg:null,
            payshow:false,
            confirm:{
                show:false,
                content:'',
                title:''
            },
            fun:null,
            hasno:null,
            feeds:null
        }
        this.handchange = this.handchange.bind(this);
        this.rule = this.rule.bind(this);
        this.close = this.close.bind(this);
        this.getallmoney = this.getallmoney.bind(this);
        this.toPay = this.toPay.bind(this);
    }
    componentDidMount(){
        var t = this;
        if(localStorage.getItem('withdrawmsg')!=null){
            t.setState({
                tipasy:'false'
            })
        }
        localStorage.setItem('withdrawmsg','1');
        $(t.refs.inputmsg).focus();
        $.ajax({
            type:'post',
            url:'/user/withdraw/getFee.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        feeds:d.data.fee
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
                    if(d.data[0].bindStatus!='0'){
                        t.setState({
                            bankmsg:d.data[0]
                        })
                    }
                }
            }
        });
        var oDiv = t.refs.realInput;
        var bogusInput = t.refs.bogusInput;
        var c = 0;
        $(t.refs.formedit).find('.num').click(function(){
            c++;
            oDiv.innerHTML += this.innerHTML;
            $(t.refs['input'+c]).val(this.innerHTML);
            if(oDiv.innerHTML.length=='6'){
                $.ajax({
                    type:'post',
                    url:'/user/withdraw/withdrawByBankcard.do',
                    data:{money:$(t.refs.inputmsg).val(),BankcardId:t.state.bankmsg.id,password:oDiv.innerHTML},
                    dataType:'json',
                    success:function(d){
                        if(d.code==200){
                             Router.push({                       
                                pathname:'/mobi/wallet/withdraw/withdrawdetail',
                                query:{
                                    money:$(t.refs.inputmsg).val(),
                                    free:t.state.feeds
                                }
                            })
                        }else{
                            $(bogusInput).find('input').val('');
                            $(oDiv).html('');
                            c=0;
                            $(t.refs.layercontent).hide();
                            t.setState({
                                payshow:false,
                                confirm:{
                                    show:true,
                                    content:d.msg,
                                    title:'提现失败'
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
                                hasno:function(){
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
                });
            }
        })
        $(t.refs.remove).click(function(){
            if(c>0){
                var oDivHtml = oDiv.innerHTML;
                oDiv.innerHTML = oDivHtml.substring(0,oDivHtml.length-1);
                $(t.refs['input'+c]).val('');
                c--
            }
        })
        $(t.refs.closetip).click(function(){
            $(t.refs.layercontent).hide();
            t.setState({
                payshow:false
            })
            $(bogusInput).find('input').val('');
            $(oDiv).html('');
        })
    }
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    handchange(e){
        let that = this;
        var Inp = $(that.refs[e]);
        var val = Inp.val();
        val = val == '' ? null : val;
        var c = val,d,e,f,h;
        if(c!=null){
            d = ''
            if(c.indexOf(".") =='-1'){
                d = c.length> 10 ? c.substring(0,10) : c
            }else{
                e = c.split('.');
                f = e[0].length> 10 ? e[0].substring(0,10) : e[0];
                h = e[1].length> 2 ? e[1].substring(0,2) : e[1];
                d = f+'.'+h;
            }
            Inp.val(d)
        }
        
        that.setState({
            money:d
        })
    }
    rule(){
        let that = this;
        that.setState({
            tipasy:'true'
        })
    }
    close(){
        let that = this;
        that.setState({
            tipasy:'false'
        })
    }
    getallmoney(){
        var t = this;
        t.setState({
            money:t.props.canmoney
        })
        $(t.refs.inputmsg).val(t.props.canmoney);
    }
    toPay(e){
        if(this.state.money>=5 && this.checkNumber(this.state.money) &&this.state.money <= parseFloat(this.props.canmoney)){
            var t= this;
            $(t.refs.layercontent).show();
            t.setState({
                payshow:true
            })
            e.stopPropagation();
        }
    }
    problom(){
        Router.push({                       
            pathname:'/mobi/user/feedback/feedback',
        })
    }
    checkNumber(theObj) {
        var reg = /^([1-9][\d]{0,8}|0)(\.[\d]{1,2})?$/;
        if (reg.test(theObj)) {
            return true;
        }
        return false;
    }
    render() {
        let that = this,g="",a,b,c,d,e,f;
        if(this.state.money >=5 && this.state.money <= parseFloat(this.props.canmoney) && that.checkNumber(this.state.money)){
			g = 'selthat';
		}else{
            g = '';
        }
        a = this.state.tipasy=='true' ? 'tipmodel' : 'tipshow';
        b = this.state.bankmsg;
        c = b ? b.issuingBankName+'('+b.cardNumber.substr(b.cardNumber.length-4,b.cardNumber.length)+')':'';
        e = this.state.payshow ? 'showpay' :'showpay nopayshow';
        return (
            <section className="page-main">
                <p className="withdrawtip">工作日2小时内到账，具体请看 <span onClick={this.rule}>提现规则></span></p>
                <div className="bankcardid">
                    到账银行卡
                    <span>{c}</span>
                </div>
                <div className="withdrawmoney">
                    <div className="nei">
                        <span>提现金额</span>
                        <p>
            
                            <b>¥</b>
                            <input ref="inputmsg" onChange={()=>this.handchange('inputmsg')} type="text" placeholder="最低提现金额5元" maxLength="9"/>
                        </p>
                        <div className="cantix">当前可提余额: {parseFloat(this.props.canmoney).toFixed(2)}元
                            <span className="redtip" onClick={this.getallmoney}>全部提现</span>
                        </div>
                    </div>
                </div>

                <div className="thisfree">提现手续费：{parseFloat(this.state.feeds).toFixed(2)}元/笔</div>
                <div className={'linkbu'+' '+g} onClick={this.toPay}>提现</div>
                <div className={a}>
                    <div className="tipmain">
                        <div className='tiptitle'>
                            
                            提现规则
                            <img onClick={this.close} className="tipclose" src="../../../../static/wallet/popup_delete@2x.png"/>
                        </div>
                        <div className="tipcontent">
                            <p>{'1、用户提现将收手续费'+this.state.feeds+'元/笔；'}</p>
                            <p>2、手续费将从提现金额内直接扣除；</p>
                            <p>3、工作日（09:00-17:00）内提现1-2个小时内到账，周末及节假日提现顺延至下一个工作日处理。</p>
                        </div>
                    </div>    
                </div>
                <p className="linkkf" onClick={this.problom}>遇到任何问题，请联系客服></p>
                <div className={e}>
                    <div className="showpaymain">
                        <div className="showpaytitle">
                            
                            <img ref="closetip" src="../../../../static/login/common_shut_down@2x.png"/>
                            请输入安全密码
                        </div>
                        <div className="showpaycontent">
                            <p>提现</p>
                            <p>{'¥'+this.state.money}</p>
                            <div ref="inputBoxContainer" className="inputBoxContainer" id="inputBoxContainer">
                                <div className="realInput" ref="realInput"></div>
                                <div className="bogusInput" ref="bogusInput">
                                    <input type="password" maxLength="6" disabled ref='input1'/>
                                    <input type="password" maxLength="6" disabled ref='input2'/>
                                    <input type="password" maxLength="6" disabled ref='input3'/>
                                    <input type="password" maxLength="6" disabled ref='input4'/>
                                    <input type="password" maxLength="6" disabled ref='input5'/>
                                    <input type="password" maxLength="6" disabled ref='input6'/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="layer-content" ref='layercontent'>
                    <div className="form_edit clearfix" ref='formedit'>
                        <div className="num">1</div>
                        <div className="num">2</div>
                        <div className="num">3</div>
                        <div className="num">4</div>
                        <div className="num">5</div>
                        <div className="num">6</div>
                        <div className="num">7</div>
                        <div className="num">8</div>
                        <div className="num">9</div>
                        <div className="nonum"></div>
                        <div className="num">0</div>
                        <div id="remove" ref="remove">删除 </div>
                    </div>
                </div>
                <Alert type='2' confirm={this.state.confirm} isNot={this.state.hasno} isOk={this.state.fun}/>
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
        <Header_title text="提现"/>
        <div><Header path="/mobi/wallet/wallet" text="提现" /></div>
        <Edite showtip={this.props.url.query.showtip} canmoney = {this.props.url.query.money}/>
        <Style/>
    </div>
    }
}
