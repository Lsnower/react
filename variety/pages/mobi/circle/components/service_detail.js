/*
* @Author: Maolin
* @Date:   2017-04-18 10:04:00
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-25 10:17:52
*/
import Router from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Userinfo from './userInfo.js';
import Issure_con from './issure_con.js';
import Text_none from '../../common/text_none.js';
import Confirm from '../../common/confirm.js';


class List extends React.Component{
    constructor(props) {
        super(props);
        this.state={data:[],show:false}
        this.dianzan = this.dianzan.bind(this);
        this.state={
            praiseCount:props.replyList.praiseCount
        }
    }
    dianzan(e){
        var t = this,
            replyId = this.props.replyList.id,
            _target = e.target;

        if(this.props.isLogin){
            $.ajax({
                type:'post',
                url:'/coterie/viewpoint/viewpointReplyPraise.do',
                data:{replyId:replyId},
                dataType:'JSON',
                success:function(d){
                    if(d.code == 200){
						t.props.dzfun('true');
                        
                    }else{
                       t.setState({
                            show:true,
                            content: d.msg,
                            code: d.code
                        }) 
                    }
                }
            })
        }else{
            this.setState({
                show:true,
                content: '您未登录，请重新登录',
                code: 503
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
                    }else{
                        var f = nowDay-day;
                        t = f == 1?'昨日'+hour+':'+min:mon+'月'+day+'日';
                    }
                }else{
                    t = mon+'月'+day+'日';
                }
            }else{
               t=  year+'年'+mon+'月'+day+'日';
            }
            return t

    }
    render(){
        return(
            <div className="li_main">
                <Userinfo user={this.props.replyList} isLogin={this.props.isLogin} notab={this.props.notab}/>
                <p className="text">
                	{this.props.replyList.content?this.props.replyList.content:'-'}
                	<span>{this.formattime(this.props.replyList.createTime)}</span>
                </p>
                <div className="like-wrap" >
                    <span className={this.props.replyList.isPraise?"like haslike":"like unlike"} onClick={(e)=>{this.dianzan(e)}}>{this.props.replyList.praiseCount?(this.props.replyList.praiseCount>999?'999+':this.props.replyList.praiseCount<0?'0':this.props.replyList.praiseCount):0}</span>
                </div>
                <Confirm type={1} confirm={this.state} />
                <style jsx>{`
					.li_main{
						margin: 0 .13rem .1rem;
					}
                    .text{
                        margin-top: .09rem;
                        line-height: .2rem;
						position: relative;
						padding-left: 0.4rem;
						word-wrap: break-word;
                    }
					.text span{
						width: 50%;
						height: 0.2rem;
						color: #999;
						font-size: 0.12rem;
						position: absolute;
						bottom: -0.33rem;
						left: 0.4rem;
					}
                    .like-wrap{
                        position: relative;
                        height: .22rem;
                        margin: .12rem 0;
                    }
                    .like{
                        display:inline-block;
                        position: absolute;
                        right:0;
                        width: .6rem;
                        height: .24rem;
                        line-height: .2rem;
                        border-radius: .12rem;
                        padding-left: .24rem;
                        font-size: .12rem;
                    }
                    .haslike{
                        background: url(/static/circle/circledetail_content_icon_like@3x.png) no-repeat .06rem .04rem;
                        background-size: 26%;
						border: 1px solid #ef6d6a;
						background-color: #ef6d6a;
                        color:#FFF;
						
                    }
                    .unlike{
                        background: url(/static/circle/circledetail_content_icon_unlike@3x.png) no-repeat .06rem .04rem;
                        background-size: 26%;
                        border: 1px solid #82848a;
                        color: #82848a;
                    }
                    .detail-title{
                        width:100%;
                        height: .32rem;
                        background: #e7e7e8;

                    }
                    `}
                </style>
            </div>
        )
    }
}

class Service_detail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
                userPortrait:null,
                data:[],
                show:false,
                viewData:[],
                viewPage:0,
                viewMore:true,
                isLogin:false,
                bigHeight:360,
                createTime:null
            }
        this.discuss = this.discuss.bind(this);
        this.praise = this.praise.bind(this);
        this.toLoadView = this.toLoadView.bind(this);
        this.getVariety = this.getVariety.bind(this);
		this.hanleSub=this.hanleSub.bind(this);
		this.togdxq=this.togdxq.bind(this);
		this.dianz=this.dianz.bind(this);
    }
    componentDidMount(){
        var t = this;
        var viewpointId = t.props.url.query.viewpointId,varietyId;
		
        $.ajax({
            type:'post',
            url:'/user/user/findUserInfo.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        isLogin:true
                    });
                }else{
                    t.setState({
                        isLogin:false
                    });
                }
                
            }
        });
        // 观点详情
        t.togdxq()

        
        //观点回复列表
        t.toLoadView();
    }
	togdxq(){
		var t = this;
        var viewpointId = t.props.url.query.viewpointId,varietyId;
		$.ajax({
          url: '/coterie/viewpoint/findViewpointInfo.do',
          type: 'post',
          data: {viewpointId: viewpointId},
          dataType:'json',
          async: false,
          success:function(d){
            if(d.code == 200){
                t.setState({data:d.data});
                t.getVariety(d.data.varietyId)
            }else{
                t.setState({
                    show:true,
                    content: d.msg,
                    code: d.code
                })
            }
          }
        })
	}
    getVariety(d){
        var t = this;
        var varietyId = d;
        $.ajax({
             url: '/order/order/getVarietyInfoById.do',
             type: 'post',
             data: {varietyId: varietyId},
             dataType:'json',
             success:function(d){
               if(d.code == 200){
                   t.setState({varietyDate:d.data});
               }else{
                   t.setState({
                       show:true,
                       content: d.msg,
                       code: d.code
                   })
               }
             }
            })
    }
    toLoadView(isF){
        var t =this;
        var viewpointId = t.props.url.query.viewpointId,replyId = localStorage.getItem('replyId');
		var myreplyId = localStorage.getItem('myreplyId');
		
		if(myreplyId){
			replyId = replyId != '' ? replyId : myreplyId;
			localStorage.removeItem('myreplyId');
		}
		
        var H = $('.infinite').height() ? $('.infinite').height() : ($(window).height()-50) ;
        t.serverRequest=$.ajax({
            type:'get',
            url:'/coterie/viewpoint/findViewpointReply.do',
            data:{createTime:isF?'':t.state.createTime,pageSize:15,viewpointId:viewpointId,replyId:replyId},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
					if(isF=='true'){
						var arr = []
						arr[0] = e.data[0];
						t.setState({
							viewData:arr.concat(t.state.viewData),
							viewPage:t.state.viewPage,
							viewMore:t.state.viewMore,
							bigHeight:H,
						})
						t.togdxq()
					}
					else if(isF=='false'){
						t.setState({
							viewData:e.data,
						})
					}
					else{
						t.setState({
                        	viewData:t.state.viewData.concat(e.data),
							viewPage:t.state.viewPage+1,
							viewMore:e.resultCount>(t.state.viewPage+1)*15?true:false,
							bigHeight:H,
						})
					}
                    

                    if(e.data.length>0){
                        t.setState({
                            createTime: t.state.viewPage == 0? '':t.state.viewData[t.state.viewData.length-1].createTime
                        })
                    }
                    
                    localStorage.setItem('replyId','');
                }else{
                    t.setState({
                        show:true,
                        content: e.msg,
                        code: e.code
                    })
                }
            }
        })
    }
    praise(e){
        var t = this,
            viewpointId = this.props.url.query.viewpointId,
            _target = e.target;
        if(t.state.isLogin){
            $.ajax({
                type:'post',
                url:'/coterie/viewpoint/viewpointPraise.do',
                data:{viewpointId:viewpointId},
                dataType:'JSON',
                success:function(d){
                    if(d.code == 200){
                        _target.className= _target.className.indexOf('haslike')>-1?'like unlike':'like haslike';
                        t.state.data.praiseCount=_target.className.indexOf('haslike')>-1?t.state.data.praiseCount+1:t.state.data.praiseCount-1;
    					t.setState({
                            data:t.state.data
                        })
                    }else{
                       t.setState({
                            show:true,
                            content: d.msg,
                            code: d.code
                        }) 
                    }
                }
            })
        }else{
            this.setState({
                show:true,
                content: '您未登录，请重新登录',
                code: 503
            })
        }
        
    }
    discuss(e){
        if(this.state.isLogin){
            Router.push({
                pathname:'/mobi/circle/components/discuss',
                query:{viewpointId: this.props.url.query.viewpointId}
            })
        }else{
            this.setState({
                show:true,
                content: '您未登录，请重新登录',
                code: 503
            })
        }
        
    }
	hanleSub(e){
		
		var val = $.trim(this.refs.replyText.value)
		if(this.state.isLogin){
			if(val.length>0){
				var t = this,
				c = val,
				v = t.props.url.query.viewpointId;
				$.ajax({
					type:'post',
					url:'/coterie/viewpoint/viewpointReply.do',
					data:{content:c,viewpointId:v},
					dataType:'JSON',
					success:function(d){
						if(d.code == 200){
							t.toLoadView('true');
							t.refs.replyText.value = ''
						}else{
							t.setState({
								show:true,
								code: d.code,
								content: d.msg,
							})
						}
					}
				})
			}
		}
		else{
			this.setState({
                show:true,
                content: '您未登录，请重新登录',
                code: 503
            })
		}

    }
	dianz(obj){
		if(obj == 'true'){
			this.toLoadView('false');
		}
	}
    render(){
        var query = this.props.url.query.type;
		var notab = this.props.url.query.notab ? this.props.url.query.notab : 'false';
		var fb = this.props.url.query.fb ? this.props.url.query.fb : 'fasle'
        return (
            <div>
                <Header_title text="经济圈"/>
                <Header text="详情" />
                <section className="wrap">
                    <Userinfo user={this.state.data} isLogin={this.state.isLogin} query={query} notab={notab} myfb={fb}/>
                    <Issure_con info={this.state.data} url={this.props.url} varietyDate={this.state.varietyDate} notab={notab} myfb={fb}/>
                    <div className="like-wrap">
                         <span className={this.state.data.isPraise?"like haslike":"like unlike"} onClick={(e)=>{this.praise(e)}}>{this.state.data.praiseCount?(this.state.data.praiseCount>999?'999+':this.state.data.praiseCount<0?'0':this.state.data.praiseCount):0}</span>
                    </div>
                </section>
                <div className="discuss">
                    <p className='discuss-title'><span className='red_left'></span>评论<span className="discuss-num">({this.state.data.replyCount?(this.state.data.replyCount>999?'999+':this.state.data.replyCount<0?'0':this.state.data.replyCount):0})</span><span className={this.state.data.replyCount==0?'zwpl_show zwpl':'zwpl_hide zwpl'}>暂无评论~快来发表您的评论把</span></p>
                    
                </div>
                <section className="reply-list">
                {
                    this.state.viewData.length > 0 ?(<ul className="list">
                        <InfiniteScroll next={this.toLoadView} height={this.state.bigHeight} hasMore={this.state.viewMore} loader={ <div className="view-bottom">加载更多</div>} endMessage={<div className="view-bottom">已加载全部</div>}>
                        {
                            this.state.viewData.map((e,i) => {
                                e.viewPage = this.state.viewPage;
                                return(
                                    <div key={i}>
                                        <li><List replyList={e} isLogin={this.state.isLogin} dzfun={this.dianz} notab={notab} /></li>
                                    </div>
                                )
                            })
                        }
                        </InfiniteScroll>   
                    </ul>):(<div className="view-bottom"></div>)
                }
                </section>
                <div className="reply-wrap">
					<div className="reply-inp">
						<textarea className="reply_text" placeholder='发表评论...' maxLength="300" ref='replyText'></textarea>
					</div>
                    <div className="reply-txt" onClick={this.hanleSub}>发送</div>
                </div>
                <Confirm type={1} confirm={this.state} />
                <style jsx>{`
                    section{
                        background:#fff;
                    }
                    .wrap{
                        padding: .1rem .13rem;
                    }
                    
                    .like-wrap{
                        position: relative;
                        height: .22rem;
                        margin: .12rem 0;
                    }
                    .like{
                        display:inline-block;
                        position: absolute;
                        right:0;
                        width: .6rem;
                        height: .24rem;
                        line-height: .2rem;
                        border-radius: .12rem;
                        padding-left: .24rem;
                        font-size: .12rem;
                    }
                    .haslike{
                        background: url(/static/circle/circledetail_content_icon_like@3x.png) no-repeat .06rem .04rem;
                        background-size: 26%;
                        color: #FFF;
                        border: 1px solid #ef6d6a;
						background-color: #ef6d6a;
                    }
                    .unlike{
                        background: url(/static/circle/circledetail_content_icon_unlike@3x.png) no-repeat .06rem .04rem;
                        background-size: 26%;
                        color: #82848a;
                        border: 1px solid #82848a;
                    }
                    .discuss{
                        width:100%;
                        line-height: .32rem;
                        background: #f5f5f5;
                        color: #82848A;
                        font-size: .14rem;
						overflow: hidden;
                    }
                    .discuss-title{
						background: #FFF;
                        background-size: .24rem;
                        padding-left: .25rem;
						margin-top: 0.2rem;
						padding-top: 0.2rem;
						color: #222;
						position: relative;
                    }
					.red_left{
						width: 4px;
						height: 0.17rem;
						background: #ef6d6a;
						display: block;
						position: absolute;
						left: 0.15rem;
						top: 0.27rem;
					}
                    .discuss-num{
                        margin-left: .02rem
                    }
                    .list li{
                        border-bottom: 1px solid #e7e7e8;
                        padding-top: .1rem;
						background: #FFF;
                    }
                    .list li:last-child{
                        padding-bottom: .1rem;
                    }
                    .reply-list{
                        margin-bottom:.5rem;
						background: #f5f5f5;
                    }
                    .reply-wrap{
                        width:100%;
                        height: .49rem;
                        line-height: .49rem;
                        border: 1px solid #e5e5e5;
                        color: #d8d8d8;
                        background: #fff;
                        font-size: .15rem;
                        display: flex;
                        display: -webkit-flex;
                        position: fixed;
                        bottom: 0;
                    }
                    .reply-inp,.reply-txt{
                        display: inline-block;
                        box-sizing: border-box;
                        padding-left: .1rem;
                    }
                    .reply-inp{
                        width: 80%;
						position: relative;
					}
					.reply_text{
						width: 100%;
						height: 70%;
						line-height: 0.2rem;
						position: absolute;
						bottom: 0;
						color: #222;
						resize:none;
					}
                    .reply-txt{
						width: 20%;
						text-align: center;
						padding: 0;
						color: #222;
                        border-left: 1px solid #e7e7e8;
                    }
					.zwpl{
						float: right;
						margin-right: 0.12rem;
						font-size: 0.1rem;
						color: #999;
					}
					.zwpl_show{
						display: block;
					}
					.zwpl_hide{
						display: none;
					}
                `}</style>
            </div>
        )
        
    }
}

export default Service_detail;