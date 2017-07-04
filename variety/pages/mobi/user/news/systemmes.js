
import React, {
  Component
} from 'react'
import Link from 'next/link';
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from './left.js';
import Style from './news_css.js';
import Text_none from '../../common/text_none.js';
import Alert from '../../common/confirm.js';
import InfiniteScroll from 'react-infinite-scroll-component';
class Circle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            psstatus:true,
            viewData:[],
            viewPage:0,
            viewMore:true,
            bigHeight:600,
            _sysdata:null,
            confirm:{
                show:false,
                content:''
            },
            fun:null,
            moneymsg:null
        }
        this.nolink = this.nolink.bind(this);
        this.showlistmsg = this.showlistmsg.bind(this);
    }
    componentDidMount() {
        var t = this;
        $.ajax({
            type:'post',
            url:'/user/userAccount/userAccountInfo.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        moneymsg:d.data.money,
                        login:true
                    })
                }
            }
        });
        this.showlistmsg();
    }
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    showlistmsg(){
        let t = this;
        let lasttime = t.state.viewData[t.state.viewData.length-1]?t.state.viewData[t.state.viewData.length-1].createTime:'';
        let H = $('.circle_list').height() ? $('.circle_list').height() : ($(window).height()-50) ;
        t.serverRequest=$.ajax({
            type:'post',
            url:'/msg/msg/history.do',
            data:{autoRead:false,createTime:lasttime,size:15,classify:1},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                    t.setState({
                        viewData:t.state.viewData.concat(e.data),
                        viewPage:t.state.viewPage+1,
                        viewMore:e.data.length>14?true:false,
                        bigHeight:H
                    })
                }
            }
        })
    }
    //点击不发生跳转，改变是否已读状态
    nolink(e){
        let that = this;
        $.ajax({
            url:'/msg/msg/read.do',
            data:{msgId:e},
            success:function(d){
                if(d.code == 200){
                   $(that.refs[e]).find('.sys_top span').removeClass('noisread').addClass('isread');
                   
                }else{
                    that.setState({
                        confirm:{
                            show:true,
                            content:d.msg,
                        }
                    })
                }
            }
        })
    }
    yeslink(e,url,h,p,m){
        var t = this;
        $.ajax({
            url:'/msg/msg/read.do',
            data:{msgId:p},
            success:function(d){
                if(d.code == 200){
                    
                }
            }
        })
        if(e){
            if(h == '3'){
            
            }else{
                if(m == '28' || m == '27'){
                    Router.push({
                        pathname: url,
                        query:{ id: e ,
                                money: t.state.moneymsg 
                            }
                    })
                }else{
                    Router.push({
                        pathname: url,
                        query: { id: e }
                    })
                }
                
            }
        }
    }
    tolink(e,url,h){
            $.ajax({
                url:'/msg/msg/read.do',
                data:{msgId:e},
                success:function(d){
                    if(d.code == 200){

                    }
                }
            })
            if(h == '3'){

            }else{
                Router.push({
                  pathname: url,
                  query: { type: 'lendin' }
                })
            }

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

		var now = new Date().getTime(),
		nowYear = new Date().getFullYear(),
		nowMon = new Date().getMonth()+1,
		nowDay = new Date().getDate(),
		nowHour = new Date().getHours(),
		nowMin = new Date().getMinutes();

		var t='';
		if(year == nowYear){
			if(mon == nowMon){
				if(day == nowDay){
					t = hour+':'+min;
				}
				else{
					var f = nowDay-day;
					t = f == 1?'昨日'+' '+hour+':'+min:mon+'月'+day+'日';
				}
			}
			else{
				t = mon+'月'+day+'日';
			}
		}
		else{
			t=  year+'年'+mon+'月'+day+'日';
		}
		return t

	}
    render() {
        let data=this.state._sysdata,that=this,a,b,c,e,f;
        let _temp="";
        if(this.state.viewData.length>0){
            return (
                <div>
                    <ul className="circle_list">
                        <InfiniteScroll next={this.showlistmsg} height={this.state.bigHeight} hasMore={this.state.viewMore} loader={ <div className="view-bottom">加载更多</div>} endMessage={<div className="view-bottom">已加载全部</div>}>
                        {

                            this.state.viewData.map(function(v,r){
                                e =v.status == '0' ? 'noisread' : 'isread';
                                f = that.formattime(v.createTime);
                                if(v.type == '1'){
                                    a = <div className="clear cir_all" onClick={()=>{that.tolink(v.id,'/mobi/user/follow/fans',v.status)}}>
                                            <div className="sys_top clear">
                                                <p>{v.sourceUser.userName}</p>
                                                <span className={e}></span>
                                                <span className="systime">{f}</span>
                                            </div>
                                            <div className="sys_bottom">
                                                <p>关注了你</p>
                                            </div>
                                        </div>
                                }else if(v.type == '20'){
                                    a = <div className="clear cir_all" onClick={()=>{that.yeslink(v.id,'/mobi/future/view',v.status,v.id)}}><div className="sys_top clear"><p>{v.title}</p>
                                    <span className={e}></span>
                                    <span className="systime">{f}</span></div><div className="sys_bottom"><p>{v.msg}</p></div></div>
                                }else if(v.type == '21' || v.type == '22'){
                                    a = <div className="clear cir_all" onClick={()=>{that.yeslink(v.dataId,'/mobi/user/usercredit/approve',v.status,v.id)}}><div className="sys_top clear"><p>{v.title}</p>
                                    <span className={e}></span>
                                    <span className="systime">{f}</span></div><div className="sys_bottom"><p>{v.msg}</p></div></div>
                                }else if(v.type == '25' || v.type == '26'){
                                    a = <div className="clear cir_all" onClick={()=>{that.yeslink(v.id,'/mobi/circle/components/issure',v.status,v.id)}}><div className="sys_top clear"><p>{v.data.content}</p>
                                    <span className={e}></span>
                                    <span className="systime">{f}</span></div><div className="sys_bottom"><p>{v.msg}</p></div></div>
                                }else if(v.type == '27'){
                                    a = <div className="clear cir_all" onClick={()=>{that.yeslink(v.id,'/mobi/user/moneydetail/moneydetail',v.status,v.id)}}><div className="sys_top clear"><p>{v.title}</p>
                                    <span className={e}></span>
                                    <span className="systime">{f}</span></div><div className="sys_bottom"><p>{v.msg}</p></div></div>
                                }else if(v.type == '28'){
                                    a = <div className="clear cir_all" onClick={()=>{that.yeslink(v.id,'/mobi/wallet/withdraw/withdrawhtml',v.status,v.id,v.type)}}><div className="sys_top clear"><p>{v.title}</p>
                                    <span className={e}></span>
                                    <span className="systime">{f}</span></div><div className="sys_bottom"><p>{v.msg}</p></div></div>
                                }
                                else{
                                    a = ''
                                }
                                return (
                                    <li key = {r} ref={v.id}>
                                        {a}
                                    </li>
                                )
                            })
                        }
                        </InfiniteScroll>
                    </ul>
                    <Alert type='2' confirm={this.state.confirm} isOk={this.state.fun}/>
                    
                </div>
            )
        }else{
            return <Text_none text="暂无消息"/>;
        }
}
}

export default  class Cyts extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        
    }
    
    render() {
        return <div>
        <Header_title text="消息"/>
        <div><Header text="消息" /></div>
        <section className="page-main">
            <Circle/>
            <Style/>
        </section>
    </div>
    }
}
