/*
* @Author: Maolin
* @Date:   2017-05-08 16:47:06
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-26 00:10:42
*/
import React from 'react';
import Router from 'next/router';
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import LendUserInfo from './lend_userInfo.js';
import Lend_detail_con from './lend_detail_con.js';
import Confirm from '../common/confirm.js';
class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {isLogin:false}
    }
    render(){
        return(
            <div>
                <LendUserInfo urltype='1' user={this.props.info} userid={this.props.user} isLogin={this.props.isLogin}/>
                <Lend_detail_con info={this.props.info} query={this.props.query} />
            </div>
        )
    }
}
class Lending_detail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
                userPortrait:null,
                data:null,
                helpData:[],
                isLogin:false,
                btnHtml:'给予帮助',
                isClick:false,
                self: null,
				dataLeaving:[],
                fun:null,
                confirm:{
                    show:false,
                    content:'',
                    title:'',
                },
                lendid:null,
                myid:null
            };
        this.handler = this.handler.bind(this);
        this.canOk = this.canOk.bind(this);
        this.toHelperList = this.toHelperList.bind(this);
        this.getIntentCount = this.getIntentCount.bind(this);
		this.handClick = this.handClick.bind(this);
		this.handBlur = this.handBlur.bind(this);
		this.hanleSub = this.hanleSub.bind(this);
		this.commentList = this.commentList.bind(this);
        this.getlist = this.getlist.bind(this);
        this.qxok = this.qxok.bind(this);
        this.huankok = this.huankok.bind(this);
        this.handlerqux = this.handlerqux.bind(this);
        this.handlerhuank = this.handlerhuank.bind(this);
		this.goLogin = this.goLogin.bind(this);
        this.clickimg = this.clickimg.bind(this);
    }
    componentDidMount(){
        var t = this;
        var id = t.props.url.query.id,userId = t.props.url.query.userId;
        $.ajax({
            type:'post',
            url:'/user/user/findUserInfo.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        isLogin:true,
                        myid:d.data.id
                    });
                }else if(d.code==503){
                    t.setState({
                        isLogin:false
                    });
                }
                
            }
        });
         // 判断是否是自己
       
       
        t.getlist();
       t.getIntentCount();
        t.commentList();
        
		t.setState({
            confirm:{
                show:false,
                content:'',
                title:'',
            },
            lendid:id
        })
    }
	goLogin(){
		Router.push({
		  pathname: '/login'
		})
	}
    getlist(){
        var t = this;
        var id = t.props.url.query.id
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/showDetail.do',
            data:{id:id},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.setState({
                        data:d.data,
                        num:parseInt(screen.width/40)-2

                    });
                    $.ajax({
                        url: '/coterie/userInterest/checkMyself.do',
                        type: 'get',
                        data: {userId: d.data.userId},
                        success:function(d){
                            if(d.code == 200){
                                t.setState({
                                    self:d.data
                                });
                            }
                        }
                    })
                }else{
                    t.setState({
                        confirm:{
                            show:true,
                            content:d.msg,
                            title:'',
                        },
                        code: d.code
                    })
                }
                
            }
        });
    }
     
    getIntentCount(){
        var t = this;
        var id = t.props.url.query.id
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/intentionCount.do',
            data:{id:id},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.setState({helpData:d.data});
                }else{
                    t.setState({
                        confirm:{
                            show:true,
                            content:d.msg,
                            title:'',
                        }
                    })
                }
                
            }
        });
    }
    
    handlerqux(){
        var that = this;
        if(this.state.isLogin){
            this.setState({
                confirm:{
                    show:true,
                    content:'确认取消借款',
                    title:'取消借款',
                },
                fun:that.qxok
            })
        }else{
            this.setState({
                confirm:{
                    show:true,
                    content:'您未登录，请先登录',
                    title:'提示',
                },
				fun:this.goLogin
            })
        }
    }
    qxok(){
        this.setState({
                confirm:{
                    show:false,
                    content:'',
                    title:'',
                }
            })
        var t = this;
        var id = t.state.lendid;
        var that = this;
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/cancelLoan.do',
            data:{id:id},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.setState({
                        confirm:{
                            show:false,
                            content:'',
                            title:'',
                        }
                    })
                    that.getlist();
                }else{
                    t.setState({
                        confirm:{
                            show:true,
                            content:d.msg,
                            title:'',
                        },
                        fun:function(){
                            t.setState({
                                confirm:{
                                    show:false,
                                    content:'',
                                    title:'',
                                }
                            })
                        }
                    })
                }
            }
        });
    }
    //还款
    handlerhuank(){
        var that = this;
        if(this.state.isLogin){
            this.setState({
                confirm:{
                    show:true,
                    content:'是否确认对方已还款？',
                    title:'',
                },
                fun:that.huankok
            })
        }else{
            this.setState({
                confirm:{
                    show:true,
                    content:'您未登录，请先登录',
                    title:'提示',
                },
				fun:this.goLogin
            })
        }
    }
    huankok(){
        var t = this;
        var id = t.state.lendid;
        var that = this;
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/repayed.do',
            data:{id:id},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.setState({
                        confirm:{
                            show:false,
                            content:'',
                            title:'',
                        }
                    })
                    that.getlist();
                }else{
                    t.setState({
                        confirm:{
                            show:true,
                            content:d.msg,
                            title:'',
                        },
                        fun:function(){
                            t.setState({
                                confirm:{
                                    show:false,
                                    content:'',
                                    title:'',
                                }
                            })
                        }
                    })
                }
            }
        });
    }
    handler(e){
        var that = this;
        if(this.state.isLogin){
            this.setState({
                confirm:{
                    show:true,
                    content:'资金来往请谨慎操作',
                    title:'确认帮助？',
                },
                fun:that.canOk
            })  
        }else{
            this.setState({
                confirm:{
                    show:true,
                    content:'您未登录，请先登录',
                    title:'提示',
                },
				fun:this.goLogin
            })
        }
        
    }
    // 给予帮助
    canOk(e){
        var id = this.props.url.query.id;
        var t = this;
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/intention.do',
            data:{id:id},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.setState({
                        confirm:{
                            show:false,
                            content:'',
                            title:'',
                        }
                    })
                    t.getlist();
                    t.getIntentCount();
                    t.state.data.intentionCount++;
                }else{
                    t.setState({
                        confirm:{
                            show:true,
                            content:d.msg,
                            title:'',
                        },
                        fun:function(){
                            t.setState({
                                confirm:{
                                    show:false,
                                    content:'',
                                    title:'',
                                }
                            })
                        }
                    })
                }
                
            }
        });
        

    }
    toHelperList(e){
        var t = this;
        var b = this.state.data.status;
        if(this.state.isLogin){
            Router.push({
              pathname: '/mobi/lend/want_helplist',
              query: {type:this.state.self?'ni':'TA',sex:this.state.data.sex,id: t.props.url.query.id,lendType:this.state.self?((b=='4'|| b == '41'|| b == '42'|| b == '43'|| b =='8' || b == '7' || b == '9')?t.props.url.query.lendType:'lendin'):t.props.url.query.lendType,selUserId:(b=='7'||b=='8'||b=='9')? this.state.data.selectedUserId : ''}
            })
        }else{
            this.setState({
                confirm:{
                    show:true,
                    content:'您未登录，请先登录',
                    title:'提示',
                },
				fun:this.goLogin
            })
        }
        
    }
	commentList(){
		var v = this.props.url.query.id;
		var t = this
		$.ajax({
			type:'get',
			url:'/coterie/help/loanNote/showNotes.do',
			data:{loanId:v},
			dataType:'JSON',
			success:function(d){
				if(d.code == 200){
					t.setState({
						show:false,
                        dataLeaving : d.data
                    })
				}else{
                    t.setState({
                        confirm:{
                            show:true,
                            content: d.msg,
                            title: ''
                        }
                        
                    })
                }
			}
		})
	}
	handClick(){
		if(this.state.isLogin){
			$(this.refs.comment).show();
			$(this.refs.commentText).focus();
		}
		else{
            this.setState({
                confirm:{
                    show:true,
                    content:'您未登录，请先登录',
                    title:'提示',
                },
				fun:this.goLogin
            })
        }
	}
	handBlur(){
		var t = this
		setTimeout(function(){
			$(t.refs.comment).hide();
			t.refs.commentText.value = ''
		},300)	
	}
	hanleSub(){
        var t = this;
        this.setState({
            confirm:{
                show:false,
                content: '',
                title:'',
            }
        })
		$(this.refs.comment).hide();
		var val = $.trim(this.refs.commentText.value)
		if(val.length>0){
			
			var c = val,
			v = t.props.url.query.id;
			$.ajax({
				type:'post',
				url:'/coterie/help/loanNote/addNote.do',
				data:{content:c,loanId:v},
				dataType:'JSON',
				success:function(d){
					if(d.code == 200){
						t.commentList();
						t.refs.commentText.value = ''
					}else{
						t.setState({
                            confirm:{
                                show:true,
                                content:d.msg,
                                title:'',
                            }
						})
					}
				}
			})
		}else{
            t.setState({
                confirm:{
                    show:true,
                    content:'请先输入留言内容',
                    title:'',
                }
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
    clickimg(e){
		
		if(this.state.isLogin){
			Router.push({
				pathname: '/mobi/user/circle_user/userInfo',
				query: { id: e }
			})
		}
		else{
            this.setState({
                confirm:{
                    show:true,
                    content:'您未登录，请先登录',
                    title:'提示',
                },
				fun:this.goLogin
            })
        }
    }
    render(){
        if(this.state.data){
            let a,b,c,d,e,f,g,h,p,q,k,m,n;
            g = this.state.data;
            //1未审核(等待互助)、 2审核未通过(等待互助)、 3审核成功 4借款失败（41、无人帮助42、没有选择43、撤销）。 5确认接受帮助 6 支付意向金 7借款成功（用户在前台点击完成借款） 8 还款成功 9还款逾期
        //1 取消借款
        //2 取消借款
        
        //3 取消借款    发布人显示     已提交   好心人显示
        //5 取消借款    发布人显示     已提交   好心人显示
        //6 取消借款    发布人显示     已提交   好心人显示
        
        //7 发布人显示  联系对方    好心人   已借出XX
        //9 发布人显示  联系对方    好心人   已借出 逾期
        
        //4  41 42 43 已结束
        //8 已结束
            a = this.state.data.isIntention;//判断是否有过帮助意向
            b = this.state.self;//判断是否是自己
            c = this.state.data.status;//状态值
            h='lmessage_text';
            p = this.state.data.selectedUserId ? this.state.data.selectedUserId : '';
            q = this.state.myid;
            k = this.state.data.phoneNum?this.state.data.phoneNum:'';
            m = this.formattime(this.state.data.createDate);
            if(b == true){
                if(c == '1' || c == '2' || c == '3' || c == '5' || c == '6'){
                    d = <div className="lendcz qx" onClick={()=>{this.handlerqux(g.id)}}>
                        <a id="btn-help">取消借款</a>
                        </div>
                }else if(c == '7'|| c == '9'){
                    d = <div className="lendcz">
                        <a style={{'display':'block'}} href={'tel:'+k} id="btn-help">联系对方</a>
                        </div>
                    h = 'lmessage_text nowrite';
                }
            }else if(b == false){
                if(a == '2'){

                    if(c == '3' || c == '5' || c == '6' || c == '2' || c == '1'){
                        d=<div className="lendcz lendok">
                            <a id="btn-help">已提交</a>
                            </div>
                    }else if(c == '7' || c == '9'){
                        if(p != q){
                            d='';
                            
                            h = 'lmessage_text nowrite';
                        }else{
                            d=<div className="lendczff">
                                <a style={{'display':'inline-block'}} href={'tel:'+k} id="btn-help">联系对方</a>
                                <a style={{'display':'inline-block'}} onClick={()=>{this.handlerhuank()}}>确认还款</a>
                            </div>
                            h = 'lmessage_text nowrite';
                        }
                        
                    }else if(c == '4' || c == '41' || c == '42' || c == '43' || c == '8'){
                        d='';
                        h = 'lmessage_text nowrite'
                    }
                }else{
                    if(c == '7' || c == '9'){
                        d='';
                    }else if(c == '4' || c == '41' || c == '42' || c == '43' || c == '8'){
                        d='';
                        h = 'lmessage_text nowrite'
                    }else{
                        d = <div className="lendcz" onClick={()=>{this.handler()}}>
                                <a id="btn-help">给予帮助</a>
                            </div>
                    }
                }
            }
            if(c == '4' || c == '41' || c == '42' || c == '43' || c == '8'){
                h = 'lmessage_text nowrite'
            }
            var contentImg = this.state.data.contentImg?this.state.data.contentImg.split(','):[];
            var query = this.props.url.query.type,lendType = this.props.url.query.lendType;
            var btnHtml=['给予帮助','等待确认中','给予帮助',''];
			var classUl = 'wrap_hide';
            var lends = this.state.data.location;
             var lendArray; 
            if(lends){
                lendArray = lends;
            }else{
                lendArray = '暂无定位信息';
            }
			if(this.state.helpData.length>0){
				classUl = 'wrap_show';
			}
            return (
                <div>
                    <Header_title text="借款详情"/>
                    <Header path={this.props.url.query.yespay?'/mobi/mutual/borrow':"javascript:window.history.back()"} text='借款详情'/>
                    <section className="wrap">
                       <ul className="list">
                            <li>
                                <List info={this.state.data} user={this.state.myid} isLogin={this.state.isLogin} query={query} lendType = {lendType}/>
                                <div className="detail_time"><img src="/static/help/opinion_borrowing_small@2x.png"/><span>{m+' '+lendArray}</span></div>
                            </li>
                        </ul>
                        {
                        <div style={{ 'paddingLeft':'0.4rem','marginTop':'0.1rem' }}>
                            <div className="discuss">
                                <div className="red_left"></div>
                                <p className='discuss-title'>好心人</p>
                            </div>
							
                            <ul className={"help-wrap "+classUl} onClick={()=>{this.toHelperList(this.props.url.query.id)}}>
                            {
                                this.state.helpData.slice(0,this.state.num).map((e,i)=>{
                                    return(
                                        <li className="help-user" key={i} style={{background:e.portrait?('url('+e.portrait+'?x-oss-process=image/resize,m_fill,h_200,w_200) no-repeat left center'):('url(/static/circle/headportrait64x64@3x.png) no-repeat left center'),backgroundSize:'cover'}}>
                                        </li>
                                    )
                                })
                            }
                                <li className="help-other" style={{display:this.state.helpData.length>this.state.num?'block':'none'}}></li>
                            </ul>
							
							<div className="lmessage">
                                <div className="red_left red_left1"></div>
                                <p className='lmessage-title'>留言(<span>{this.state.dataLeaving.length}</span>)</p>
                            <div className={h} onClick={this.handClick}>写留言</div>
                            </div>
                            <ul>
                            	{
									this.state.dataLeaving.map((e,i)=>{
										return(
											<li key={i} className='leaving_li'><span onClick={()=>this.clickimg(e.userId)}>{e.userName}</span>{': '+e.content}</li>
										)
									})
								}
                            </ul>
							
                        </div>
                    }
                            
                    <div className="comment_main" ref='comment'>
						<div className="comment_inp">
							<textarea className="comment_text" placeholder='留言...' maxLength="100" ref='commentText' onBlur={this.handBlur}></textarea>
						</div>
						<div className="comment_btn" onClick={this.hanleSub}>发送</div>
					</div>
                    <Confirm type='2' confirm={this.state.confirm} isOk={this.state.fun}/>
                    </section>
                    {d}
                    <style jsx global>{`
						html,body{
							height: 100%;
							background: #FFF !important;
						}
                        .lendcz{
                            width:100%;
                            height:0.45rem;
                            position: fixed;
                            text-align: center;
                            line-height:0.45rem;
                            background:#cd4a47;
                            color:#fff;
                            bottom:0;
                            font-size:0.15rem;
                        }
                        .lendquren{
                            background:#999 !important;
                        }
                        .lendok{
                            background:#999 !important;
                        }
                        .lendczff{
                            width:100%;
                            height:0.45rem;
                            position: fixed;
                            bottom:0;
                            font-size:0.15rem;
                            border-top:1px solid #ddd;
                            box-sizing: border-box;
                            -webkit-box-sizing:border-box;
                        }
                        .lendczff a{
                            display: block;
                            float: left;
                            width:50%;
                            text-align: center;
                            line-height:0.45rem;
                            height:100%;
                        }
                        .lendczff a:nth-child(1){
                            background: #fff;
                            color:#cd4a47;
                        }
                        .lendczff a:nth-child(2){
                            background: #cd4a47;
                            color:#fff;
                        }
                        .nowrite{
                            display: none !important;
                        }
                        .qx{
                            color:#cd4a47;
                            background: #fff;
                            border-top:1px solid #ddd;
                        }
                        .detail_time{
                            margin-left: 0.4rem;
                        }
                        .detail_time img{
                            width:0.37rem;
                            margin-right: 0.1rem;
                            display: block;
                            float: left;
                        }
                        .detail_time span{
                            color:#999999;
                            font-size:0.12rem;
                        }
					`}</style>
                    <style jsx>{`
						
                        .wrap{
							height: 100%;
                            padding: .1rem .13rem;
                            background: #fff;
							padding-bottom: 0.6rem;
                        }
                        .wrap:not(nth-child(1)){
                            padding-bottom:0;
                        }
                        .colorR{
                            color: #cd4a47;
                        }
                        .help-status{
                            text-align: center;
                            height: .6rem;
                            line-height: .6rem;
                            color: #82848A;
                            border-top: 1px solid #e7e7e8;
                            background: #fff;
                        }
                        .lmessage,.discuss{
                            width:100%;
                            height: .32rem;
                            line-height: .32rem;
                            color: #222;
                            font-size: .14rem;
							position: relative;
							padding-top: 0.1rem;
						}
						.lmessage{
							padding: 0;
						}
                        .lmessage-title,.discuss-title{
                            padding-left: .1rem;
                        }
                        .discuss-num{
                            margin-left: .06rem
                        }
                        .help-wrap{
                            height: .42rem;
                        }
                        .help-user{
                            width: .32rem;
                            height: .32rem;
                            float: left;
                            border-radius: 50%;
                            border: 1px solid #eee;
                            margin-right: .05rem;
                            background-size: cover;
                        }
                        .help-other{
                            width: .32rem;
                            height: .32rem;
                            float: left;
                            background: url(/static/circle/helpdetail_icon_more@3x.png) no-repeat 0 center;
    						background-size: contain;
                        }
						
                        .help-btn{
                            display:inline-block;
                            width: 100%;
                            height: .44rem;
                            line-height: .44rem;
                            text-align: center;
                            color: #fff;
                            font-size: .15rem;
                        }
                        .help-ok{
                            background: #cd4a47;
                        }
                        .help-disabled{
                            background: #82848a;
                        }
						.red_left{
							width: 4px;
							height: 0.17rem;
							background: #ef6d6a;
							display: block;
							position: absolute;
							left: 0;
							top: 0.17rem;
						}
						.red_left1{
							top: 0.07rem;
						}
						.lmessage_text{
							height: 0.24rem;
							border: 1px solid #999;
							line-height: 0.24rem;
							padding: 0 0.1rem;
							border-radius: 0.12rem;
							font-size: 0.11rem;
							position: absolute;
							right: 0;
							top: 0.04rem;
							color: #666;
						}
						.btn-wrap{
							position: fixed;
							bottom: 0;
							left: 0;
							width: 100%;
							z-index: 9;
						}
						.wrap_show{
							display: block;
							margin-top: 0.2rem;
						}
						.wrap_hide{
							display: none;
						}
						
						.comment_main{
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
							left: 0;
							display: none;
							z-index: 10;
						}
						.comment_inp,.comment_btn{
							display: inline-block;
							box-sizing: border-box;
							padding-left: .1rem;
						}
						.comment_inp{
							width: 80%;
							height: 100%;
							position: absolute;
							left: 0;
							top: 0;
						}
						.comment_text{
							width: 95%;
							height: 70%;
							line-height: 0.2rem;
							position: absolute;
							bottom: 0;
							color: #222;
							resize:none;
						}
						.comment_btn{
							width: 20%;
							text-align: center;
							padding: 0;
							color: #222;
							border-left: 1px solid #e7e7e8;
							position: absolute;
							top: 0;
							right: 0;
						}
						.leaving_li{
							font-size: 0.14rem;
							color: #222;
							margin-top: 0.1rem;
							line-height: 0.2rem;
							word-wrap: break-word;
						}
						.leaving_li span{
							color: #cd4a47;
						}
						
                    `}</style>
                </div>
            )
        }else{
            return <div>
                    <Header_title text="借款详情"/>
                    <Header path={this.props.url.query.yespay?'/mobi/mutual/borrow':"javascript:window.history.back()"} text='借款详情'/>
                </div>
        }
       
    }
}

export default Lending_detail;
