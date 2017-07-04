import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import $ from 'jquery';
import Alert from '../../common/confirm.js';
import Confirm from '../../common/confirm.js';
class Edite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
            banklist:null,
            bankname:'请选择银行',
            bankId:'',
            inputone:null,
            inputtwo:null,
            inputthree:null,
            inputfour:null,
            tipcontent:null,
            tipasy:false,
            urlasy:false,
            id:null,
            tipmsg:'绑定成功',
            confirm:{
                show:false,
                content:'',
                title:''
            },
            fun:null,
        }
        this.getbank = this.getbank.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.topush = this.topush.bind(this);
        this.showtol = this.showtol.bind(this);
        this.rule = this.rule.bind(this);
        this.close = this.close.bind(this);
        this.showtotal = this.showtotal.bind(this);
    }
    componentDidMount(){
        var t = this;
        this.getbank()
        $(this.refs.haschange).on('change',function(){
            t.setState({
                bankname:$(t.refs.haschange).find('option:selected').attr('name'),
                bankId:$(t.refs.haschange).find('option:selected').attr('value')
            })
        });
        $.ajax({
            type:'post',
            url:'/user/bankCard/hasBindBankCard.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    if(d.data[0].bindStatus!='0'){
                        if(d.data[0].bindStatus == '1'){
                            var c = d.data[0];
                            $(t.refs.inputone).val(c.realName);
                            $(t.refs.inputtwo).val(c.idCard);
                            $(t.refs.inputthree).val(c.cardNumber);
                            $(t.refs.inputfour).val(c.cardPhone);
                            $(t.refs.showname).html(c.issuingBankName);
                            $(t.refs.haschange).val(c.bankId);
                            t.setState({
                                urlasy:true,
                                inputone:c.realName,
                                inputtwo:c.idCard,
                                inputthree:c.cardNumber,
                                inputfour:c.cardPhone,
                                id:c.id,
                                tipmsg:'修改成功',
                                bankname:c.issuingBankName,
                                bankId:c.bankId
                            })
                        }
                    }
                }
            }
        });
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
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    rule(){
        let that = this;
        that.setState({
            tipasy:true
        })
    }
    close(){
        let that = this;
        that.setState({
            tipasy:false
        })
    }
    showtol(){
       var that = this;
        $(that.refs.hintsC).show();
        $(that.refs.hintsC).animate({'opacity':1},1000,function(){	
            $(that.refs.hintsC).animate({'opacity':0},500,function(){
				$(that.refs.hintsC).hide();
			})	
		}) 
    }
    handleChange(e){
        let that = this;
        var Inp = $(that.refs[e]);
        var val = Inp.val();
        val = val == '' ? null : val;
        if(e == 'inputone'){
            that.setState({inputone:val})
        }else if(e == 'inputtwo'){
            that.setState({inputtwo:val})
        }else if(e == 'inputthree'){
            that.setState({inputthree:val})
        }else if(e == 'inputfour'){
            that.setState({inputfour:val})
        }
    }
    getbank(){
        var t = this;
        $.ajax({
            type:'get',
            url:'/user/bankCard/getBank.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        banklist:d.data
                    })
                }
            }
        });
    }
    topush(){
        var t = this;
        if((this.state.bankId !='') && (this.state.inputone!=null) && (this.state.inputtwo !=null) && (this.state.inputthree !=null) && (this.state.inputfour!=null)){
            var _json={};
            _json.realName = this.state.inputone;
            _json.idCard = this.state.inputtwo;
            _json.cardNumber = this.state.inputthree;
            _json.cardPhone = this.state.inputfour;
            _json.issuingBankName = this.state.bankname;
            _json.bankId = this.state.bankId;
            var _url;
            if(t.state.urlasy){
                _json.id = t.state.id;
                _url = '/user/bankCard/updateBankCard.do'
            }else{
                _url = '/user/bankCard/addBankCard.do'
            }
			$.ajax({
                type:'post',
                url:_url,
                data:_json,
                dataType:'json',
                success:function(d){
                    if(d.code==200){
                        if(!t.state.urlasy){
                            
                        }else{
                            t.showtotal();
                        }
                        
                        setTimeout(function(){
                            if(t.props.type=='1'){
                                if(!t.state.urlasy){
                                    Router.push({
                                        pathname: '/mobi/wallet/withdraw/withdrawhtml',
                                        query:{
                                            money:localStorage.getItem('walletmoney'),
                                            showtip:true
                                        }
                                    })
                                }else{
                                    Router.push({
                                        pathname: '/mobi/wallet/withdraw/withdrawhtml',
                                        query:{
                                            money:localStorage.getItem('walletmoney'),
                                            showtip:true
                                        }
                                    })
                                }
                                
                            }else{
                                if(!t.state.urlasy){
                                    localStorage.setItem('showalert','1');
                                    Router.push({
                                        pathname: '/mobi/wallet/wallet'
                                    })
                                }else{
                                    Router.push({
                                        pathname: '/mobi/wallet/wallet'
                                    })
                                }
                                
                            }
                        },800)
                        
                    }else if(d.code==503){
                        
                    }else{
                        t.setState({
                            tipcontent:d.msg
                        });
                        t.showtol();
                    }
                }
            });
		}
    }
    render() {
        var that = this,g,a;
        if((this.state.bankId !='') && (this.state.inputone!=null) && (this.state.inputtwo !=null) && (this.state.inputthree !=null) && (this.state.inputfour!=null)){
			g = 'selthat';
		}else{
            g = '';
        }
        a = this.state.tipasy ? 'tipmodel' : 'tipshow';
        return (
            <section className="page-main">
                <p className="maintip">持卡人必须与账户信息一致，信息不做其他用途</p>
                <ul className="banklist usermsg">
                    <li className="hastip">
                        <span>姓名</span>
                        <input ref="inputone" onChange={()=>this.handleChange('inputone')} type="text" placeholder="持卡人真实姓名"/>
                        <img onClick={this.rule} src="../../../../static/wallet/mine_bankcard_prompt@2x.png"/>
                    </li>
                    <li>
                        <span>身份证号</span>
                        <input ref="inputtwo" onChange={()=>this.handleChange('inputtwo')} type="text" placeholder="持卡人身份证号"/>
                    </li>
                </ul>
                <ul className="banklist usermsg">
                    <li>
                        <span>银行卡号</span>
                        <input ref="inputthree" onChange={()=>this.handleChange('inputthree')} type="text" placeholder="仅限借记卡（储蓄卡）"/>
                    </li>
                    <li>
                        <div>
                            <span>银行</span>
                            <select ref="haschange" className="right userSex">
                                <option value="" name='请选择银行'>请选择银行</option>
                                {
                                    that.state.banklist ?
                                        that.state.banklist.map((e,i)=>{
                                            {
                                                if(e.status ==1){
                                                    return(
                                                        <option key={i} name={e.name} value={e.id}>{e.name}</option>
                                                    )
                                                }
                                            }


                                        })
                                    : ''
                                    
                                }
                            </select>
                            <span className="right text-lesser" ref="showname" id="gender">{this.state.bankname}</span>
                            <b className="rightBg youjt2"></b>
                        </div>
                    </li>
                </ul>
                <ul className="banklist usermsg">
                    <li>
                        <span>手机号</span>
                        <input ref="inputfour" maxLength="11" onChange={()=>this.handleChange('inputfour')} type="text" placeholder="请输入银行预留手机号码"/>
                    </li>
                </ul>
                <div className={'linkbu'+' '+g} onClick={this.topush}>下一步</div>
                <div className='hint' ref='hintsC'><p><span>{this.state.tipcontent}</span></p></div>
                <div className={a}>
                    <div className="tipmain">
                        <div className='tiptitle'>
                            持卡人说明
                            <img onClick={this.close} className="tipclose" src="../../../../static/wallet/popup_delete@2x.png"/>
                        </div>
                        <div className="tipcontent">
                            <p>1.为了您的资金安全，只能绑定持卡人本人的银行卡。</p>
                            <p>2.未成年人禁止交易。</p>
                        </div>
                    </div>    
                </div>
							
				<div ref="success_mask" className="success_mask">
                    <img src="/static/circle/popovers_icon_succeed@3x.png" />
                    <p>{this.state.tipmsg}</p>
                </div>
				<Confirm type='1' confirm={this.state.confirm} isOk={this.state.fun}/>
                <style jsx global>{`
                    .page-main .maintip{
                        height:0.26rem;
                        width:100%;
                        line-height:0.26rem;
                        background:#f3b071;
                        color:#ffffff;
                        font-size:0.12rem;
                        text-indent: 0.15rem;
                    }
                    .banklist{
                        width:100%;
                        background:#ffffff;
                        margin-bottom:0.15rem;
                    }
                    .banklist li{
                        height:0.44rem;
                        width:90%;
                        margin:0 auto;
                        display: -webkit-flex;
                        display: flex;
                        position: relative;
                        
                    }
                    .banklist .hastip{
                        position:relative;
                    }
                    .banklist .hastip img{
                        position:absolute;
                        width:0.17rem;
                        right:0;
                        top:0.13rem;
                    }
                    .banklist li:after{
                        content: "";
                        display: block;
                        position: absolute;
                        left: 0;
                        width: 200%;
                        height: 1px;
                        background: #e7e7e8;
                        transform: scale(1);
                        -moz-transform: scale(1);
                        -o-transform: scale(1);
                        -webkit-transform: scale(1);
                        top:0.44rem;
                    }
                    .banklist li span{
                        display: inline-block;
                        width:0.8rem;
                        height:100%;
                        line-height:0.44rem;
                        font-size:0.15rem;
                        color:#222222;
                    }
                    .banklist li input{
                        flex-grow: 1;
                        height:0.2rem;
                        line-height:0.2rem;
                        margin-top:0.13rem;
                        color:#222222;
                        font-size:0.15rem;
                    }
                    .banklist .rightBg {
                        height: .53rem;
                        line-height: .53rem;
                        display: block;
                        font-size: 0.15rem;
                        color: #e43022;
                        position: absolute;
                        right: 2%;
                        top: 0;
                        text-align: right;
                    }
                    .youjt2:after {
                        content: " ";
                        display: inline-block;
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                        height: 10px;
                        width: 10px;
                        border-width: 1px 1px 0 0;
                        border-color: #95979c;
                        border-style: solid;
                        position: relative;
                        top: -2px;
                        position: absolute;
                        right: 0px;
                        top: 30%;
                    }
                    .right{
                        float:left;
                    }
                    .userSex {
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 10;
                    }
                    .text-lesser {
                        display: inline-block;
                        width:1.2rem !important;
                        height:100%;
                        line-height:0.44rem;
                        font-size:0.15rem;
                        color:#222222;
                        float: right;
                    }
                    .linkbu{
                        width:90%;
                        height:0.44rem;
                        line-height:0.44rem;
                        text-align: center;
                        margin:0.2rem auto;
                        background:#999999;
                        color:#ffffff;
                        font-size:0.15rem;
                        border-radius:0.05rem;
                    }
                    .selthat{
                        background:#cd4a47;
                        color:#fff;
                    }
                    .hint{
                        display:none;
                        width:100%;
                        height:.44rem;
                        position:fixed;
                        top:38%;
                    }
                    .hint p{
                        width:100%;
                        height:.44rem;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;
                    }
                    .hint span{
                        display:inline-block;
                        margin:0 auto;
                        background:rgba(0,0,0,0.75);
                        border-radius:4px;
                        padding:0 .1rem;
                        line-height:.44rem;
                        text-align:center;
                        font-family:.PingFangSC-Regular;
                        font-size:14px;
                        color:#ffffff;
                    }
                    .tipmodel{
                        height:100%;
                        width:100%;
                        background:rgba(0,0,0,0.40);
                        position: fixed;
                        top:0;
                        z-index: 20;
                    }
                    .tipshow{
                        display: none;
                    }
                    .tipmain{
                        position: fixed;
                        top:0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        margin: auto;
                        width:2.5rem;
                        height:1.4rem;
                        background: #fff;
                        padding-top:0.2rem;
                    }
                    .tiptitle{
                        height:0.2rem;
                        line-height:0.2rem;
                        text-align: center;
                        font-size:0.15rem;
                        color:#222222;
                        position: relative;
                    }
                    .tipcontent{
                        width:100%;
                    }
                    .tipcontent p{
                        width:90%;
                        margin:0 auto;
                        font-size:0.12rem;
                        color:#222222;
                        line-height: 0.2rem;
                    }
                    .tipclose{
                        position: absolute;
                        top: -0.8rem;
                        right: 0;
                        width: 0.3rem;
                    }
                    .success_mask{
                        position: fixed;
                        width: 2rem;
                        height: 1.55rem;
                        top: 30%;
                        left: 50%;
                        margin-left: -1rem;
                        z-index: 99;
                        background: rgba(0,0,0,.8);
                        font-size: 16px;
                        text-align: center;
                        color: #FFF;
                        border-radius: 5px;
                        overflow: hidden;
                        display: none;
                    }
                    .success_mask img{
                        width: 30%;
                        display: block;
                        margin: 0 auto;
                        margin-top: 15%;
                    }
                    .success_mask p{
                        font-size: 0.17rem;
                        line-height: 0.5rem;
                    }
                `}</style>
            </section>
        )
    }
}

export default  class Username extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            confirm:{
                show:false,
                content:'',
                title:''
            },
            noshow:'否',
            yesshow:'是',
            fun:null,
            hasno:null,
            backasy:false,
            bankmsg:null
        }
        this.qxbank = this.qxbank.bind(this);
    }
    componentDidMount(){
        var t = this;
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
                        if(d.data[0].bindStatus =='1'){
                            t.setState({
                                backasy:true
                            })
                        }
                    }
                }
            }
        });
    }
    qxbank(){
        var t = this;
        if(t.state.backasy){
            Router.push({
                pathname: '/mobi/wallet/wallet'
            })
        }else{
            this.setState({
                confirm:{
                    show:true,
                    content:'是否放弃绑定银行卡',
                    title:''
                },
                fun:function(){
                    Router.push({
                        pathname: '/mobi/wallet/wallet'
                    })
                },
                hasno:function(){
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
    render() {
        return (<div>
        <Header_title text="银行卡"/>
        <header id="head">
            <div className="head_content">
                <h3 className="productName">
                    <span>银行卡</span>
                    <em></em>
                </h3>
                <div className="left">
                    <a href="javascript:;;" onClick={this.qxbank} className="demozuo"></a>
                </div>
            </div>
        
        </header>
        <Edite bankdata={this.state.bankmsg?this.state.bankmsg:''} type={this.props.url.query.type}/>
        <Alert type='2' confirm={this.state.confirm} no={this.state.noshow} yes={this.state.yesshow} isNot={this.state.hasno} isOk={this.state.fun}/>
    </div>
    )
    }
}
