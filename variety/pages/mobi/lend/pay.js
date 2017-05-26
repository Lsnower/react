/*
* @Author: Maolin
* @Date:   2017-05-15 19:19:04
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-26 14:32:18
*/

import Router from 'next/router';
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import LendUserInfo from './lend_userInfo.js';
import Lend_con from './lend_con.js';
import Confirm from '../common/confirm.js';



class Pay extends React.Component{
    constructor(props) {
        super(props);
        this.state={payMoney:5,platFormData:[],platform:null};
        this.choose = this.choose.bind(this);
        this.toPay = this.toPay.bind(this);
        this.canOk = this.canOk.bind(this);
    }
    componentDidMount(){
        var t = this;
        var orderId = t.props.url.query.id;

        // 获取意向金
        $.ajax({
            type:'post',
            url:'/user/userpay/getUserLoanMoney.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        payMoney:d.data
                    })
                }else{
                    t.setState({
                        show:true,
                        content: d.msg,
                        code: d.code
                    });
                }
                
            }
        });

        //获取支付平台
        $.ajax({
            type:'post',
            url:'/user/finance/platform/selectUsablePlatform.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        platFormData:d.data
                    })
                }else{
                    t.setState({
                        show:true,
                        content: d.msg,
                        code: d.code
                    });
                }
                
            }
        });
    }
    choose(j){
        var d = this.state.platFormData;
        for(var i=0;i<d.length;i++){
            d[i].check=j==i?true:false;
        }
        this.setState({
            platFormData:this.state.platFormData,
            platform: d[j].platform,
            type: d[j].type

       })
        this.refs.payBtn.className = d[j].check ? 'yes':'no';
    }
    toPay(e){
        // 测试代码
        // var orderId = this.props.url.query.id;
        // Router.push({
        //     pathname:'/mobi/lend/pay_success',
        //     query:{orderId:orderId}
        // })
        if(e.target.className.indexOf('yes')>-1){
            var t = this;
            var orderId = t.props.url.query.id;
            $.ajax({
                type:'post',
                url:'/user/userpay/payLoanMoney.do',
                data:{orderId:orderId,platform:t.state.platform},
                dataType:'json',
                success:function(d){
                    if(d.code==200){
                        //var url = d.data.platform == 'qtwxscan'?'http://qr.liantu.com/api.php?text='+d.data.codeUrl:d.data.codeUrl;
                        if(t.state.type == 2){
                            Router.push({
                                pathname:'/mobi/lend/pay_WxBack',
                                query:{codeUrl:d.data.codeUrl,orderId:orderId,platform:t.state.platform}
                            }) 
                        }else{
                            window.location.href=d.data.codeUrl;
                            Router.push({
                                pathname:'/mobi/lend/pay_AliBack',
                                query:{codeUrl:d.data.codeUrl,orderId:orderId,platform:t.state.platform}
                            })
                        }
                        
                    }else{
                        t.setState({
                            show:true,
                            content: d.msg,
                            code: d.code
                        });
                    }
                    
                }
            });
        }
        
    }
    canNot(){
        this.setState({show:!this.state.show})
    }
    canOk(){
        this.setState({show:!this.state.show})
    }
    render(){
        return (
            <div>
                <Header_title text="支付意向金"/>
                <Header text="支付意向金"/>
                <div className="wrap">
                    <img src="/static/circle/pay_bg_money@3x.png" />
                    <div className="wrap-con">
                        <p className="pay-title">意向金</p>
                        <p className="pay-money">
                            <span className="colorR">￥{this.state.payMoney?this.state.payMoney:5}</span>
                        </p>
                        <p className="advice">意向金为平台服务费，无论用户是否成功借款都不予退还，请谅解</p>
                    </div>
                </div>
                <ul className="pay-list">
                    {
                        this.state.platFormData.map((e,i)=>{
                            {
                                e.index = i;
                                if(e.status ==1){
                                    return(
                                        <li className={e.check?"yes":"no"} key={i} onClick={(i)=>this.choose(e.index)}>
                                            <span className="pay-txt" data-type={e.platform?e.platform:'-'}>{e.name?e.name:'-'}</span>
                                        </li>
                                    )
                                }
                            }

                            
                        })
                    }
                    
                </ul>
                <div className="pay-btn">
                    <a className="no" ref='payBtn' onClick={(e)=>{this.toPay(e)}}>支付意向金</a>
                </div>
                <Confirm type={2} confirm={this.state} isOk={()=>{this.canOk()}} isNot={()=>{this.canNot()}}/>
                <style jsx global>{`
                    html,body{
                       background: #e7e7e8; 
                    }
                `}</style>
                <style jsx>{`
                    .wrap{
                        position: relative;
                        width: 100%;
                        height: 1.5rem;
                        margin: .2rem auto;
                        padding: 0 .3rem;
                    }
                    .wrap-con{
                        position: absolute;
                        width: 100%;
                        top: 0;
                        margin-left: -.3rem;
                    }
                    .wrap img{
                        display: inline-block;
                        width: 100%;
                    }
                    .wrap p{
                        padding-top: .2rem;
                    }
                    .pay-title{
                        color: #b3b3b3;
                        font-size: .14rem;
                        height: .22rem;
                        line-height: .22rem;
                        text-align: center;
                    }
                    .pay-money{
                        font-size: .38rem;
                        font-weight: 500;
                        text-align: center;
                    }
                    .wrap p.advice{
                        font-size: .12rem;
                        color: #82848a;
                        padding: .2rem .3rem 0;
                    }
                    .pay-list{
                        background: #fff;
                    }
                    .pay-list li{
                        position: relative;
                        width: 100%;
                        height: .6rem;
                        line-height: .6rem;
                        padding-left: .3rem;
                        border-bottom: 1px solid #e7e7e8;
                    }
                    .pay-list li.no{
                        background: url(/static/circle/newaccount_btn_nor@3x.png) no-repeat .22rem center;
                        background-size: 5%;
                    }
                    .pay-list li.yes{
                        background: url(/static/circle/newaccount_btn_click@3x.png) no-repeat .22rem center;
                        background-size: 5%;
                    }
                    .pay-list li:last-child{
                        border-bottom: 0 none;
                    }
                    .pay-txt{
                        margin-left: .2rem;
                    }
                    .pay-btn{
                        padding: .5rem .1rem;
                    }
                    .pay-btn a{
                        display: inline-block;
                        width: 100%;
                        text-align: center;
                        height: .5rem;
                        line-height: .5rem;
                        border-radius: .04rem;
                        color: #fff;
                        font-size: .15rem;
                    }
                    .pay-btn a.no{
                        background: #b3b3b3;
                    }
                    .pay-btn a.yes{
                        background: #cd4a47;
                    }
                `}</style>
            </div>
        )
    }
}

export default Pay;
