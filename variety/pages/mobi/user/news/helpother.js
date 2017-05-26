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
            _helpdata:null,
            viewData:[],
            viewPage:0,
            viewMore:true,
            bigHeight:500,
            confirm:{
                show:false,
                content:''
            },
            fun:null
        }
        this.wanthelp = this.wanthelp.bind(this);
        this.nohelp = this.nohelp.bind(this);
        this.clickimg = this.clickimg.bind(this);
        this.linkhelp = this.linkhelp.bind(this);
        this.gethelp = this.gethelp.bind(this);
        this.showlistmsg = this.showlistmsg.bind(this);
    }
    componentDidMount() {
        this.showlistmsg();
    }
    //跳转想帮我的人
    wanthelp(e,r){
        Router.push({
          pathname: r,
          query: { id: e }
        })
    }
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    showlistmsg(){
        let t = this;
        let H = $('.circle_list').height() ? $('.circle_list').height() : ($(window).height()-50) ;
        t.serverRequest=$.ajax({
            type:'get',
            url:'/msg/msg/history.do',
            data:{autoRead:false,page:t.state.viewPage,size:15,classify:2},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                    t.setState({
                        viewData:t.state.viewData.concat(e.data),
                        viewPage:t.state.viewPage+1,
                        viewMore:e.resultCount>(t.state.viewPage+1)*15?true:false,
                        bigHeight:H
                    })
                }
//                else{
//                    if(e.code == 503){
//                        t.setState({
//                            confirm:{
//                                show:true,
//                                content:d.msg,
//                            },
//                            fun:t.isnoLogin
//                        })
//                    }else{
//                        t.setState({
//                            confirm:{
//                                show:true,
//                                content:d.msg,
//                            }
//                        })
//                    }
//                }
            }
        })
    }
    //点击不发生跳转，改变是否已读状态
    nohelp(e){
        let that = this;
        $.ajax({
            url:'/msg/msg/read.do',
            data:{msgId:e},
            success:function(d){
                if(d.code == 200){
                    $(that.refs[e]).find('.circle_main p span').removeClass('noisread').addClass('isread');
                    clearTimeout(t);
                    var t=setTimeout(function() {
                        that.props.shownum()
                    },500); 
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
    //点击跳转想要帮助我的人
    linkhelp(e,f,h){
        $.ajax({
            url:'/msg/msg/read.do',
            data:{msgId:f},
            success:function(d){
                if(d.code == 200){
                    
                }
            }
        })
        if(h == '3'){
        }else{
            Router.push({
              pathname: '/mobi/lend/want_helplist',
              query: {
                  id: e,
                  type:'ni',
                  lendType:'lendin'
              }
            })
        }
        
    }
    
    //点击跳转我的借出
    gethelp(e,f,h){
        $.ajax({
            url:'/msg/msg/read.do',
            data:{msgId:f},
            success:function(d){
                if(d.code == 200){
                    
                }
            }
        })
        if(h == '3'){
            
        }else{
            Router.push({
               pathname: '/mobi/lend/lendHistory',
               query: {
                  type:'lendout'
              }
            })
        }
        
    }
    //点击头像
    clickimg(e){
        Router.push({
          pathname: '/mobi/user/circle_user/userInfo',
          query: { id: e }
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
					t = f == 1?'昨日'+hour+':'+min:mon+'月'+day+'日';
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
        let data=this.state._helpdata,that=this,a,b,c,e,f,g;
        let _temp="";
        if(this.state.viewData.length>0){
            return (
                <div>
                    <ul className="circle_list">
                        <InfiniteScroll next={this.showlistmsg} height={this.state.bigHeight} hasMore={this.state.viewMore} loader={ <div className="view-bottom">加载更多</div>} endMessage={<div className="view-bottom">已加载全部</div>}>
                        {

                            this.state.viewData.map(function(v,r){
                                e =v.status == '0' ? 'noisread' : 'isread';
                                g = v.sourceUser.userPortrait?v.sourceUser.userPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'../../../static/mine/headportrait160x160@3x.png';
                                f = that.formattime(v.createDate);
                                if(v.type == '10'){
                                    a = <div className="circle_main" style={{float:'left',paddingTop:'0.1rem'}} onClick={()=>{that.linkhelp(v.dataId,v.id,v.status)}}>
                                                <p style={{color:'#cd4a47'}}>{v.sourceUser.userName} <span className={e}>想要帮助你</span></p>
                                            </div>
                                }else if(v.type == '11'||v.type == '15'||v.type == '16'){
                                    a =  <div className="circle_main" style={{float:'left',paddingTop:'0.1rem'}} onClick={()=>{that.nohelp(v.id)}}>
                                                <p style={{color:'#cd4a47'}}>{v.sourceUser.userName} <span className={e}>{v.title}</span></p>
                                            </div>
                                }
                                else if(v.type == '12'){
                                    a = <div className="circle_main" style={{float:'left',paddingTop:'0.1rem'}} onClick={()=>{that.gethelp(v.dataId,v.id,v.status)}}>
                                                <p style={{color:'#cd4a47'}}>{v.sourceUser.userName} <span className={e}>接受了你的帮助</span></p>
                                            </div>
                                }
                                return (
                                    <li key={r} ref={v.id}>
                                        <div className="clear cir_all">
                                            <img src={g} onClick={()=>{that.clickimg(v.sourceUser.id)}}/>
                                            {a}
                                            <span style={{float:'right',float: 'right',display: 'block',width:'22%',paddingTop:'0.1rem',height:'100%',color:'#b3b3b3',fontSize:'0.13rem',textAlign:'right'}}>{f}</span>
                                        </div>
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
            return <Text_none text=""/>;
        }
}
}

export default  class Cyts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
			fir:null,
            sec:null,
            third:null
        }
        this.noreadnum = this.noreadnum.bind(this);
    }
    componentDidMount() {
        clearTimeout(t);
        var that = this;
        var t=setTimeout(function() {
            that.noreadnum();
        },500); 
    }
    //未读消息数 量显示
    noreadnum(){
        let that = this;
         $.ajax({
            url:'/msg/msg/count.do',
            success:function(d){
                if(d.code == 200){
                    for(var i=0;i<d.data.length;i++){
                        if(d.data[i].classify == '1'){
                            that.setState({
                                fir : d.data[i].count
                            })
                        }else if(d.data[i].classify == '3'){
                            that.setState({
                                sec : d.data[i].count
                            })
                        }else if(d.data[i].classify == '2'){
                            that.setState({
                                third:d.data[i].count
                            })
                        }      
                    }
                }
            }
        })   
    }
    render() {
        let a,b,c;
        a = this.state.fir > 0 ? 'showred':'';
        b = this.state.sec > 0 ? 'showred':'';
        c = this.state.third > 0 ? 'showred':'';
        return <div>
        <Header_title text="消息"/>
        <div><Header text="消息" /></div>
        <section className="page-main">
            <ul className="mes_list">
                <li>
                    <Link href="./economiccircle">
                        <a>经济圈<span className={b}></span></a>
                    </Link>
                </li>   
                <li>
                    <a className="active">互助<span className={c}></span></a>
                </li>
                <li>
                    <Link href="./systemmes">
                        <a>系统消息<span className={a}></span></a>
                    </Link>
                </li>
            </ul>
            <Circle shownum={this.noreadnum}/>
            <Style/>
        </section>
    </div>
    }
}


