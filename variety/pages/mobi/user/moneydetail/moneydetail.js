import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Text_none from '../../common/text_none.js';
import Alert from '../../common/confirm.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import $ from 'jquery'
class Edite extends Component {
    constructor(props) {
        super(props)
        this.state={
            viewData:[],
            type:true,
            viewPage:0,
            viewMore:true,
            bigHeight:500,
            confirm:{
                show:false,
                content:'',
                title:'',
            },
            fun:null,
            login:false,
            moneydata:null
        } 
    }
    componentDidMount() {
        let that = this;
        that.showlistmsg();
        this.showlistmsg = this.showlistmsg.bind(this);
    }
    showlistmsg(){
        var t =this;
        var H = $('.detail_list').height() ? $('.detail_list').height() : ($(window).height()-50);
        t.serverRequest=$.ajax({
            type:'get',
            url:'/user/userFlow/queryUserFlow.do',
            data:{page:t.state.viewPage,pageSize:20},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                    t.setState({
                        viewData:t.state.viewData.concat(e.data),
                        viewPage:t.state.viewPage+1,
                        viewMore:e.resultCount>(t.state.viewPage+1)*20?true:false,
                        bigHeight:H
                    })
                }else{
                    if(d.code == 503){
                        t.setState({
                            login:false,
                            confirm:{
                                show:true,
                                content:d.msg,
                            },
                            fun:t.isnoLogin
                        })
                    }else{
                        t.setState({
                            confirm:{
                                show:true,
                                content:d.msg,
                            }
                        })
                    }
                }
            }
        })
    }
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    //时间戳
    formattimes(n){
		var time = new Date(n).getTime();
		var year = new Date(n).getFullYear();
		var mon = new Date(n).getMonth() +1;
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
        var t=[];
        if(year == nowYear){
			if(mon == nowMon){
                t[0] = '本月';
                if(day == nowDay){
                    t[1] ='今天'
                }else{
                    var f = nowDay-day;
                    t[1] = f == 1?'昨天':day+'日';
                }
			}else{
				t[0] = mon+'月';
                t[1] = day+'日';
			}
		}else{
            t[0] = year+'年'+mon+'月';
            t[1] = day+'日';
        }
        
        t[2] = hour+':'+min;
		return t
	}
    render() {
        let that=this,a,b,c,d,e,f,g,h;
        let _datalist = that.state.viewData;
        let _array=[];
        var  newList = [];
        for(var i=0;i<_datalist.length;i++){
            var o={}
            o['time'] =  that.formattimes(_datalist[i].createTime)[1];
            o['createTime'] = that.formattimes(_datalist[i].createTime)[0];
            o['houre'] = that.formattimes(_datalist[i].createTime)[2];
            o['data']=_datalist[i];
            _array.push(o);
        }
        _array.forEach(function(data){
            for(var i=0;i<newList.length;i++){
              if(newList[i].title === data.createTime){
                newList[i].nodeList.push(data);  
                return;
              }
            }
              newList.push({
                title:data.createTime,
                nodeList:[data]
              });
          });
        let doc = '';
        if (_datalist.length>0) {
                return (
                    <ul className="detail_list">
                    <InfiniteScroll  next={this.showlistmsg} height={this.state.bigHeight} hasMore={this.state.viewMore} loader={ <div className="view-bottom">加载更多</div>} endMessage={<div className="view-bottom">已加载全部</div>}>
                  
                        {   
                            newList.map(function(v,r){
                                doc = v.nodeList.map(function(m,n){
                                    a = m.data.platformName;
                                    b = m.time;
                                    e = m.houre;
                                    f = m.data.type>0 ? '+':'-';
                                    
                                    h = m.data.platformName ? '('+m.data.platformName+')' : ''
                                    return(                 
                                        <li key={n}>  
                                            <div className="left">
                                                <p>{b}</p>
                                                <p>{e}</p>
                                            </div>
                                            <div className="center">
                                                <p>{m.data.remark+h}</p>
                                            </div>
                                            <div className="right">
                                                <p className="usermoney">{f+m.data.money.toFixed(2)} 元</p>
                                            </div>
                                        </li>
                                    )
                                })
                                return (
                                        <div key={r}>
                                            <div className="title">{v.title}</div>
                                            {doc}
                                        </div>
                                    )
                            })
                        }
                  
                    </InfiniteScroll>
                    </ul>
                )
        }else{
            return <Text_none text="你还没有交易过哦"/>;
        }
    }
}


export default class Feedback extends React.Component {
    
    render() {
        return <div>
        <Header_title text="明细"/>
        <div><Header text="明细" /></div>
        <Edite/>
        <style jsx global>{`
            html{background:#e7e7e8;}
            .detail_list li{
                padding: 0 0.15rem;
                background: #fff;
                border-bottom: 1px solid #e7e7e8;
                overflow: hidden;
                height: 0.6rem;
            }
            .detail_list li p{
                color:#999999;
                font-size:0.14rem;
                line-height:0.23rem;
            }
            .detail_list li .usermoney{
                color:#222222;
                font-size:0.15rem;
                text-align:right;
            }
            .title{
                line-height:0.4rem;
                color:#b3b3b3;
                text-indent: 10px;
            }
            .center{
                float:left;
                height:100%;
                width:46%;
            }
            
            .center p{
                float:left;
                height:100%;
                width:100%;
                padding-top:0.15rem;
            }
            .left{
                height:100%;
                width:15%;
                padding-top:0.1rem;
            }
            .right p{
                height:100%;
                line-height:0.6rem !important;
            }
        `}</style>
    </div>
    }
}
