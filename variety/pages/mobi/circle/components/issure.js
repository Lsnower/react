/*
* @Author: Maolin
* @Date:   2017-04-20 15:30:11
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-12 16:17:56
*/
import InfiniteScroll from 'react-infinite-scroll-component';
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Userinfo from './userInfo.js';
import Issure_con from './issure_con.js';
import Confirm from '../../common/confirm.js';
import Text_none from '../../common/text_none.js';
import Type from '../../common/type.js'
import Router from 'next/router';

class Issure extends React.Component{
    constructor(props) {
        super(props);
        this.state={
                show:false,
                data:[],
                viewData:[],
                viewPage:0,
                viewMore:true,
                bigHeight:500
            }
        this.toLoadView = this.toLoadView.bind(this);
		this.hanleTrade = this.hanleTrade.bind(this);
		this.hanleTradeNone = this.hanleTradeNone.bind(this);
    }
    componentDidMount(){
        var t = this,userId = t.props.url.query.userId;
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

        // TA的发表
        t.toLoadView();

    }
    toLoadView(){
        var t =this,userId = t.props.url.query.userId,type = t.props.url.query.type||'';
        var H = $('.finance').height() ? $('.finance').height() : ($(window).height()-50) ;
        t.serverRequest=$.ajax({
            type:'get',
            url:'/coterie/userInterest/queryClickUserViewPoint.do',
            data:{page:t.state.viewPage,pageSize:15,userId:type.length>0?userId:''},
            dataType:'JSON',
            success:function(e){
                if(e.code==200&&e.data.length){
                    t.setState({
                        viewData:t.state.viewData.concat(e.data),
                        viewPage:t.state.viewPage+1,
                        viewMore:e.resultCount>(t.state.viewPage+1)*15?true:false,
                        bigHeight:H
                    })
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
	hanleTrade(onoff){
        this.setState({
            trade:onoff
        })
    }
	hanleTradeNone(){
		this.setState({
            trade:false
        })
	}
	detail(myId){
		Router.push({
			pathname: '/mobi/circle/components/service_detail',
			query: {viewpointId:myId,type:'detail',fb:'true'}
		})
	}
    render(){
        if(this.state.viewData.length>0){
            return(
                <div>
                    <Header_title text="发表"/>
                    <Header text={this.props.url.query.type == 'TA'?"TA的发表":"我的发表"} messg={this.props.url.query.type=='TA'?"fasle":"true"} messClick={this.hanleTrade} />
                    <ul className="finance">
                        <InfiniteScroll next={this.toLoadView} height={this.state.bigHeight} hasMore={this.state.viewMore} loader={ <div className="view-bottom">加载更多</div>} endMessage={<div className="view-bottom">已加载全部</div>}>
                        {
                            this.state.viewData.map((e,i) => {
                                return (
                                    <div>
                                        <li onClick={()=>this.detail(e.id)}>
                                            <Userinfo user={e} isLogin={this.state.isLogin} query='detail' myfb='true'/>
                                            <Issure_con info={e} varietyDate={e} url={this.props.url} fb="true"/>
                                        </li>
                                    </div> 
                                )
                            })
                           
                        }
                        </InfiniteScroll>
                    </ul>
                    
                    <Type show={this.state.trade} callback={this.hanleTradeNone} type={2}/>
                    
                    <Confirm type={1} confirm={this.state} />
                    <style jsx global>{`
                      html,body{background: #f5f5f5;}  
                    `}</style>
                    <style jsx>{`
                        .finance {

                        }
                        .finance li{
                            padding: .1rem .13rem;
                            background: #fff;
                            margin-top: .13rem;
							padding-bottom: 0.53rem;
							border-bottom: 1px solid #ddd;
							border-top: 1px solid #ddd;
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
                        .discuss{
                            right:.6rem;
                            background: url(/static/circle/circledetail_content_icon_discuss@3x.png) no-repeat .04rem .03rem;
                            background-size: 26%;
                        }
                        .haslike{
                            background: url(/static/circle/futures_opinion_icon_like@3x.png) no-repeat .04rem .03rem;
                            background-size: 26%;

                        }
                    `}</style>
                </div>
            )
        }else{
            return(
                <div>
                    <Header_title text="发表"/>
                    <Header text={this.props.url.query.type == 'TA'?"TA的发表":"我的发表"} messg={this.props.url.query.type=='TA'?"fasle":"true"} messClick={this.hanleTrade} />
                    <Text_none text=""/>
                    <Type show={this.state.trade} callback={this.hanleTradeNone} type={2}/>
                </div>
            )
        }
        
    }
}

export default Issure;
