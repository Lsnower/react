import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import $ from 'jquery';
import Alert from '../../common/confirm.js';
import Style from './rechargehtmlcss.js';
class Edite extends Component {
    constructor(props) {
        super(props)
        this.state={
            money:null,
            rechargeway:'',
            rechargename:'',
            platfrom:null,
            type:'',
            confirm:{
                show:false,
                content:'',
                title:''
            },
            fun:null,
            bankname:null,
            cardNumber:null,
            bankmoney:null,
            bankid:null,
            banklimit:null,
            islink:false
        }
        this.handchange = this.handchange.bind(this);
        this.toPay = this.toPay.bind(this);
        this.getplatform = this.getplatform.bind(this);
        this.isbangka = this.isbangka.bind(this);
        
    }
    componentDidMount(){
        var t = this;
        $(t.refs.inputmsg).focus();
        t.isbangka();
        t.getplatform();
        setTimeout(function(){
            if($(t.refs.haschange).find('option[type="1"]').length>0){
                $(t.refs.haschange).find('option[type="1"]').attr('selected',true);
                t.setState({
                    rechargename:$(t.refs.haschange).find('option[type="1"]').attr('name'),
                    rechargeway:$(t.refs.haschange).find('option[type="1"]').attr('value'),
                    type:'1'
                })
            }else{
                $(t.refs.haschange).find('option').attr('selected',true);
                t.setState({
                    rechargename:$(t.refs.haschange).find('option').attr('name'),
                    rechargeway:$(t.refs.haschange).find('option').attr('value'),
                    type:$(t.refs.haschange).find('option').attr('type')
                })
            }
        },500)
        
        
        
        $(this.refs.haschange).on('change',function(){
            t.setState({
                confirm:{
                    show:false,
                    content:'',
                    title:'提示'
                },
                rechargeway:$(this).val(),
                rechargename:$(t.refs.haschange).find('option:selected').attr('name'),
                type:$(t.refs.haschange).find('option:selected').attr('type')
            })
        });
    }
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    //判断是否绑定过银行卡
    isbangka(){
        var t = this;
        $.ajax({
            type:'post',
            url:'/user/bankCard/hasBindBankCard.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    var c = d.data[0];
                    if(c.bindStatus!='0'){
                        t.setState({
                            bankname:c.issuingBankName,
                            cardNumber:c.cardNumber,
                            bankid:c.id
                        })
                        $.ajax({
                            type:'post',
                            url:'/user/bankCard/getPayRule.do',
                            data:{bankId:c.bankId},
                            dataType:'json',
                            success:function(d){
                                if(d.code==200){
                                    t.setState({
                                        banklimit:d.data[0]
                                    })
                                }
                            }
                        });
                        
                        
                    }else{
                        t.setState({
                            islink:true
                        })
                    }
                }
            }
        });
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
            money:d,
            confirm:{
                show:false,
                content:'',
                title:'提示'
            },
        })
    }
    getplatform(){
        var t = this;
        $.ajax({
            type:'post',
            url:'/user/finance/platform/selectUsablePlatform.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        platfrom:d.data
                    })
                    d.data.map((e,i)=>{
                        if(e.type== '1'){
                            t.setState({
                                rechargeway:e.platform
                            })
                        }
                    })
                }
            }
        });
    }
    toPay(e){
        
        var t = this;
        var _json ={};
        _json.platform = t.state.rechargeway;
        _json.money = t.state.money;
        var m = t.state.banklimit ? t.state.banklimit.limitSingle : '';
        if((t.state.money >=5) && t.checkNumber(t.state.money)){
            if(t.state.type == '3'){
                if(m!=''){
                    if(t.state.money<=m){
                        if(t.state.islink){
                            Router.push({
                                pathname: '/mobi/wallet/bankcard/bankcardhtml'
                            })
                        }else{
                            Router.push({
                                pathname:'/mobi/wallet/recharge/bankpay',
                                query:{platform:t.state.rechargeway,money:t.state.money}
                            })
                        }
                    }
                }else{
                    if(t.state.islink){
                        Router.push({
                            pathname: '/mobi/wallet/bankcard/bankcardhtml'
                        })
                    }else{
                        Router.push({
                            pathname:'/mobi/wallet/recharge/bankpay',
                            query:{platform:t.state.rechargeway,money:t.state.money}
                        })
                    }
                }
                
            }else{
                $.ajax({
                    type:'post',
                    url:'/user/userpayForDeposit/payDepositMoney.do',
                    data:_json,
                    dataType:'json',
                    success:function(d){
                        if(d.code==200){
                            if(t.state.type == '2'){
                                Router.push({
                                    pathname:'/mobi/wallet/recharge/pay_WxBack',
                                    query:{codeUrl:d.data.codeUrl,orderId:d.data.thridOrderId,platform:d.data.platform}
                                    }) 
                            }else if(t.state.type == '1'){
                                window.location.href=d.data.codeUrl;
                                Router.push({
                                    pathname:'/mobi/wallet/recharge/pay_AliBack',
                                    query:{codeUrl:d.data.codeUrl,orderId:d.data.thridOrderId,platform:d.data.platform}
                                    })
                            }
                        }else{
                            t.setState({
                                confirm:{
                                    show:true,
                                    content:d.msg,
                                    title:'提示'
                                }
                            })   
                        }
                    }
                });
            }
            
            
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
    problom(){
        Router.push({                       
            pathname:'/mobi/user/feedback/feedback',
        })
    }
    render() {

        let that = this,g="",a,b,c,d,e,f,h,m,n,p,q;
        m = that.state.banklimit ? that.state.banklimit.limitSingle : '';
        if((this.state.money >= 5) && (this.state.rechargeway!='') && that.checkNumber(this.state.money)){
            if(this.state.type == '3'){
                if(m!=''){
                    if(this.state.money <= m){
                        g = 'selthat';
                    }else{
                        g = '';
                    }
                }else{
                    g = 'selthat';
                }
                
            }else{
                g = 'selthat';
            }
		}else{
            g = '';
        }
        q = that.state.bankname ? that.state.bankname : '银行卡';
        b = that.state.cardNumber;
        f = b ? b.substr(b.length-4,b.length) : '';
        h = that.state.banklimit ? that.state.banklimit.limitDay : '';
        n = that.state.type == '3' && that.state.banklimit ? 'showtip' : 'showtip noshow';
        a = that.state.type == '3' ? (that.state.banklimit ? <p className="right text-bank" ref="showname" id="gender"><em>{q+'('+f+')'}</em><em>{' 单笔限额¥'+m+'元'}</em></p>  : <span className="right text-lesser" ref="showname" id="gender">{that.state.rechargename}</span>) 
                            : <span className="right text-lesser" ref="showname" id="gender">{that.state.rechargename}</span>;
        return (
            <section className="page-main">
                <ul className="rechargelist usermsg">
                    <li>
                        <div>
            
                            <span>充值方式</span>
                            <select ref="haschange" className="right userSex">
                                {
                                    that.state.platfrom ?
                                        that.state.platfrom.map((e,i)=>{
                                            {
                                                if(that.state.islink){
                                                    p = <option key={i} value={e.platform} type={e.type} name={e.name}>{e.name}</option>
                                                }else{
                                                   if(e.type == '3'){
                                                       p = <option key={i} value={e.platform} type={e.type} name={q+'('+f+')'}>{q+'('+f+')'}</option>
                                                   }else{
                                                       p = <option key={i} value={e.platform} type={e.type} name={e.name}>{e.name}</option>
                                                   }
                                                }
                                                if(e.status ==1){
                                                    return(
                                                        p
                                                    )
                                                }
                                            }


                                        })
                                    : ''
                                    
                                }
                            </select>
                            {a}
                            <b className="rightBg youjt2"></b>
                        </div>
                    </li>
                    <li>
                        <span>充值金额</span>
                        <input ref="inputmsg" onChange={()=>this.handchange('inputmsg')} type="text" placeholder="5元起充" maxLength='9'/>
                    </li>
                </ul>
                <div className={'linkbu'+' '+g} onClick={this.toPay}>下一步</div>
            
                <p className="linkkf" onClick={this.problom}>遇到任何问题，请联系客服></p>
                <Alert type='2' confirm={this.state.confirm} isOk={this.state.fun}/>
                <style jsx>{`
                    
                `}</style>
            </section>
        )
    }
}

export default  class Username extends React.Component {
    
    render() {
        return <div>
        <Header_title text="充值"/>
        <div><Header text="充值" /></div>
        <Edite/>
        <Style/>
    </div>
    }
}
