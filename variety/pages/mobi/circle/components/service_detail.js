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
            praiseCount:this.props.replyList.praiseCount
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
						_target.className = _target.className.indexOf('haslike')>-1?'like unlike':'like haslike';
                        t.setState({
                            praiseCount:_target.className.indexOf('haslike')>-1?t.state.praiseCount+1:t.state.praiseCount-1
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
    render(){
        return(
            <div>
                <Userinfo user={this.props.replyList} isLogin={this.props.isLogin}/>
                <p className="text">{this.props.replyList.content?this.props.replyList.content:'-'}</p>
                <div className="like-wrap" >
                    <span className={this.props.replyList.isPraise?"like haslike":"like unlike"} onClick={(e)=>{this.dianzan(e)}}>{this.state.praiseCount?(this.state.praiseCount>999?'999+':this.state.praiseCount):0}</span>
                </div>
                <Confirm type={1} confirm={this.state} />
                <style jsx>{`
                    .text{
                        margin-top: .09rem;
                        line-height: .2rem;
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
                        width: .57rem;
                        height: .22rem;
                        line-height: .19rem;
                        border-radius: .04rem;
                        padding-left: .22rem;
                        font-size: .12rem;
                    }
                    .haslike{
                        background: url(/static/circle/circledetail_content_icon_like@3x.png) no-repeat .04rem .03rem;
                        background-size: 26%;
                        border: 1px solid #cd4a47;
                        color:#cd4a47;

                    }
                    .unlike{
                        background: url(/static/circle/circledetail_content_icon_unlike@3x.png) no-repeat .04rem .03rem;
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

        
        //观点回复列表
        t.toLoadView();
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
    toLoadView(){
        var t =this;
        var viewpointId = t.props.url.query.viewpointId,replyId = localStorage.getItem('replyId');
        var H = $('.infinite').height() ? $('.infinite').height() : ($(window).height()-50) ;
        t.serverRequest=$.ajax({
            type:'get',
            url:'/coterie/viewpoint/findViewpointReply.do',
            data:{createTime:t.state.createTime,pageSize:15,viewpointId:viewpointId,replyId:replyId},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                    t.setState({
                        viewData:t.state.viewData.concat(e.data),
                        viewPage:t.state.viewPage+1,
                        viewMore:e.resultCount>(t.state.viewPage+1)*15?true:false,
                        bigHeight:H,
                    })

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
    render(){
        var query = this.props.url.query.type;
        return (
            <div>
                <Header_title text="经济圈"/>
                <Header text="详情" />
                <section className="wrap">
                    <Userinfo user={this.state.data} isLogin={this.state.isLogin} query={query}/>
                    <Issure_con info={this.state.data} url={this.props.url} varietyDate={this.state.varietyDate}/>
                    <div className="like-wrap">
                         <span className={this.state.data.isPraise?"like haslike":"like unlike"} onClick={(e)=>{this.praise(e)}}>{this.state.data.praiseCount?(this.state.data.praiseCount>999?'999+':this.state.data.praiseCount):0}</span>
                    </div>
                </section>
                <div className="discuss">
                    <p className='discuss-title'>讨论区 <span className="discuss-num">({this.state.data.replyCount?(this.state.data.replyCount>999?'999+':this.state.data.replyCount):0})</span></p>
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
                                        <li><List replyList={e} isLogin={this.state.isLogin}/></li>
                                    </div>
                                )
                            })
                        }
                        </InfiniteScroll>   
                    </ul>):(<div className="view-bottom"></div>)
                }
                </section>
                <div className="reply-wrap" onClick={()=>{this.discuss()}}>
                    <div className="reply-inp">评论......</div>
                    <div className="reply-txt">回复</div>
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
                        width: .57rem;
                        height: .22rem;
                        line-height: .19rem;
                        border-radius: .04rem;
                        padding-left: .22rem;
                        font-size: .12rem;
                    }
                    .haslike{
                        background: url(/static/circle/circledetail_content_icon_like@3x.png) no-repeat .04rem .03rem;
                        background-size: 26%;
                        color: #cd4a47;
                        border: 1px solid #cd4a47;

                    }
                    .unlike{
                        background: url(/static/circle/circledetail_content_icon_unlike@3x.png) no-repeat .04rem .03rem;
                        background-size: 26%;
                        color: #82848a;
                        border: 1px solid #82848a;
                    }
                    .discuss{
                        width:100%;
                        height: .32rem;
                        line-height: .32rem;
                        background: #e7e7e8;
                        color: #82848A;
                        font-size: .14rem;
                    }
                    .discuss-title{
                        background: url(/static/circle/circledetail_content_icon_discuss@3x.png) no-repeat .09rem .06rem;
                        background-size: .24rem;
                        padding-left: .36rem;
                    }
                    .discuss-num{
                        margin-left: .06rem
                    }
                    .list li{
						margin:0 .13rem .1rem;
                        border-bottom: 1px solid #e7e7e8;
                        padding-top: .1rem;
                    }
                    .list li:last-child{
                        padding-bottom: .1rem;
                    }
                    .reply-list{
                        margin-bottom:.5rem;
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
                    }
                    .reply-txt{
                        border-left: 1px solid #e7e7e8;
                    }
                `}</style>
            </div>
        )
        
    }
}

export default Service_detail;
