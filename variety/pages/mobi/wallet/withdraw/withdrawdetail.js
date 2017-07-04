import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_noleft.js';
import $ from 'jquery';
import Alert from '../../common/confirm.js';
import Style from './withdrawhtmlcss.js';
class Edite extends Component {
    constructor(props) {
        super(props)
        this.state={
            confirm:{
                show:false,
                content:'',
                title:''
            },
            fun:null,
            hasno:null,
            bankmsg:null
        }
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
                    }
                }
            }
        });
    }
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    toPay(){
        Router.push({pathname: '/mobi/wallet/wallet'});
    }
    render() {
        let that = this,g="",a,b,c,d,e,f;
        b = this.state.bankmsg;
        c = b ? b.issuingBankName+'('+b.cardNumber.substr(b.cardNumber.length-4,b.cardNumber.length)+')':'';
        return (
            <section className="page-main">
                <div className="withdrawdetail">
                    提现审核已提交
                </div>
                <ul className="withdrawdetaillist">
                    <li>
                        <span>银行卡</span>
                        <b>{c}</b>
                    </li>
                    <li>
                        <span>提现金额</span>
                        <b>{'¥'+parseFloat(this.props.canmoney).toFixed(2)}</b>
                    </li>
                    <li>
						<span>预计手续费</span>
                        <b>{'¥'+parseFloat(this.props.free).toFixed(2)}</b>
                    </li>
                </ul>
                <div style={{'marginTop':'0.5rem'}} className='linkbu selthat' onClick={this.toPay}>完成</div>
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
        <Header_title text="提现详情"/>
        <div><Header text="提现详情" /></div>
        <Edite canmoney = {this.props.url.query.money} free = {this.props.url.query.free}/>
        <Style/>
    </div>
    }
}
