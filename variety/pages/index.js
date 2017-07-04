import React from 'react'
import Link from 'next/link'
import Router from 'next/router';
import $ from 'jquery'
import Indexstyle from './mobi/index/style.js';
import Header_title from './mobi/common/header/header_title.js';
import Header from './mobi/common/header/header_noleft.js';
import Footer from './mobi/common/footer.js';
import Confirm from './mobi/common/confirm.js';

class Indextop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endInow: 1,
            showId : 0,
            startX: 0,
            endX: 0
        };
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.goPlay = this.goPlay.bind(this);
    }
    componentDidMount(){
        this.goPlay();
    }
    componentWillUnmount(){
        this.pausePlay()
    }
    goPlay(move_iNow) {
        
        var l = 0;
        var iNow = move_iNow || this.state.endInow;
        
        this.autoPlayFlag = setInterval(() => {
            l = this.leftMove(iNow)
            iNow < l ? iNow++ : iNow = 1;
        }, 5000);
        
        this.setState({showId : move_iNow});
        
    }
    pausePlay() {
        clearInterval(this.autoPlayFlag);
    }
    leftMove(iNow){
        
        var allLi = this.refs;
        
        var l = this.props.data.length;
        var toMove_iNow = 0
        
        if(l>1){
            
            $(allLi[iNow]).stop().animate({left: "-100%"});
            if( (iNow+1) > l ){
                $(allLi[1]).css({left: "100%"});
                $(allLi[1]).stop().animate({left: "0%"});
                toMove_iNow = 1
            }
            else{
                $(allLi[iNow+1]).css({left: "100%"});
                $(allLi[iNow+1]).stop().animate({left: "0%"});
                toMove_iNow = iNow+1
            }

            var spot = $(this.refs.spot).find('span');
            spot.removeClass('curr')
            spot.eq(toMove_iNow-1).addClass('curr')
            return toMove_iNow
            
        }
    }
    rightMove(typeNow){
        
        var allLi = this.refs;
        var l = this.props.data.length;
        var move_iNow = 0;
        
        if(l>1){
            $(allLi[typeNow]).stop().animate({left: "100%"});
            if( (typeNow - 1) < 1 ){
                $(allLi[l]).css({left: "-100%"});
                $(allLi[l]).stop().animate({left: "0%"});
                move_iNow = l
            }
            else{
                $(allLi[typeNow-1]).css({left: "-100%"});
                $(allLi[typeNow-1]).stop().animate({left: "0%"});
                move_iNow = typeNow - 1
            }
            
            var spot = $(this.refs.spot).find('span');
            spot.removeClass('curr')
            spot.eq(move_iNow-1).addClass('curr');
            
            return move_iNow
        }
        
    }
    handleTouchStart(e){
        
        this.pausePlay()
        
        this.setState({
            startX: e.changedTouches[0].pageX
        });
        
    }
    handleTouchMove(e){
        this.setState({
            endX: e.changedTouches[0].pageX
        })
    }
    handleTouchEnd(e){
        this.setState({
            endX: e.changedTouches[0].pageX
        });
        
        var typeNow = parseFloat(e.target.getAttribute('type'));
        var pageStart = this.state.startX;
        var pageEnd = this.state.endX;
        var move_iNow = 0;
        
        if( (pageStart - pageEnd) > 50){
            move_iNow = this.leftMove(typeNow)
        }
        else if( (pageEnd - pageStart) > 50){
            move_iNow = this.rightMove(typeNow)
        }
        this.goPlay(move_iNow)
        
    }
    render() {
		
        return <div className='index_top mod-carousel'>
       
                <ul className="clearfix">
                
                    {
                        this.props.data.map((e,i) => {
                            
                            var iNow = i+1;
                            e.style=='html' ? e.url ='/mobi/common/article?id='+e.id+'&myUrl=1' : e.url =e.content;
                            
                            return(
                                <li onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} ref={iNow} key={i}>
                                    <Link href={e.url}>
                                        <a><img type={iNow} src={e.cover} /></a>
                                    </Link>

                                </li>
                            )

                        })
                    }
            
                </ul>
                
                <div className="clearfix carousel-div" ref="spot">
                    {
                        this.props.data.length>1 ? this.props.data.map((e,i) => {
                            if(i == 0){
                                return (<span key={i} className="dot curr"></span>)
                            }
                            else{
                                return (<span key={i} className="dot"></span>)
                            }
                        }) : ''
                    }
                </div> 
                
              </div>;
    }
}


class Indexnav extends React.Component {
	constructor(props){
        super(props)
        this.state = {
			confirm:{
                show:false,
                content:'',
            }
        }
    }
	componentDidMount() {
		$.ajax({
            url: '/user/user/findUserInfo.do',
            type: 'post',
            success:function(d){
               if(d.code == 200){
               		localStorage.setItem('userid',d.data.id);
                }
            }
        })
	}
    isLogin(url){
		
		$.ajax({
            type:'post',
            url:'/user/user/findUserInfo.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    Router.push({
					  pathname: url
					})
                }
				else{
					this.setState({
						confirm:{
							show:true,
							content:d.msg
						}
					});
				}
                
            }.bind(this)
        });
		
        
    }
    render() {
       return <div className="indexnav">
            <div className="indexnav_tab">
            
                <Link href={'/mobi/future/futures'}><a>
                    <div className="icon_div icon_qh"></div>
                    <div>期货</div>
                </a></Link>
                
            </div>
            
            <div className="indexnav_tab">
            
                <Link href={'/mobi/stock/stock'}><a>
                    <div className="icon_div icon_gp"></div>
                    <div>股票</div>
                </a></Link>
                
            </div>
            
            <div className="indexnav_tab">
            
                <a onClick={()=>{this.isLogin('/mobi/mutual/borrow')}}>
                    <div className="icon_div icon_hz"></div>
                    <div>互助借款</div>
                </a>
                
            </div>
            
            <div className="indexnav_tab">
                
                <a onClick={()=>{this.isLogin('/mobi/index/optional/optional')}}>
                    <div className="icon_div icon_zx"></div>
                    <div>自选</div>
                </a>
                
            </div>
            
            <span className="bottom_line"></span>
            
            <Confirm type='2' confirm={this.state.confirm} isOk={ ()=>Router.push({pathname: '/login'}) }/>
            
        </div>;
    }
}

class Indexbig extends React.Component {
	
    render() {
        return <Link href={'/mobi/index/bigevent/bigevent'}><a className="big_href">
			<div className="indexbig clear">

				<div className="big_left">
					<div className="big_img">大事件</div>
				</div>

				<ul className="big_right">

					<li>{this.props.data}</li>

				</ul>

				<span className="clear_span"></span>
				<span className="bottom_line"></span>
			</div>
        </a></Link>;
    }
}

class Indexloan extends React.Component {
    
    render() {
        return <div className="indexloan clear">
        
            <ul>
                
                <li>
                    <Link href={'/mobi/pk/hall'}><a>
                    
                        <div className="loan_left">
                            <div className="loan_div loan_qhpk"></div>
                        </div>
                        
                        <div className="loan_con">
                            <h2>期货对决</h2>
                            <p>{this.props.msg==''?'来一把紧张激烈的对战吧！':this.props.msg}</p>
                        </div>
                        
                        <div className="loan_right arrow">
                            <span className="arrow_top"></span>
                            <span className="arrow_bottom"></span>
                        </div>
                        
                    </a></Link>
                
                    <span className="bottom_line"></span>
                    
                </li>
                
             	<li>
                    <Link href={'/mobi/future/view'}><a>
                    
                        <div className="loan_left">
                            <div className="loan_div loan_gdds"></div>
                        </div>
                        
                        <div className="loan_con">
                            <h2>观点大神</h2>
                            <p>眼光准，跟着做准没错</p>
                        </div>
                        
                        <div className="loan_right arrow">
                            <span className="arrow_top"></span>
                            <span className="arrow_bottom"></span>
                        </div>
                        
                    </a></Link>
                
                    <span className="bottom_line"></span>
                    
                </li>
                
            </ul>
            
            <span className="clear_span"></span>
            
        </div>;
    }
}

class Indexbottom extends React.Component {
    
    render() {
        
        return <div className="indexbottom clear">
           
            <div className="indexbottom_text">推荐</div>
            
            <div className="bottom_content clear">
                {
                    this.props.data.map((e,i) => {
                        var myImg = e.backgroundImg ? e.backgroundImg : '/static/index_img/pic.png';
						var myUrl = e.contextType==1 ? '/mobi/index/special/special?a='+e.id : (e.contextType==2?e.context:'/mobi/index/special/special_text?a='+e.id);
						
                        return(
                            <div key={i} className="bottom_allc">
                                <Link href={myUrl}><a className="bottom_allc_a">

                                    <div className="index_mask_all">
                                        <img src={myImg}/>
                                    </div>
									<div className="index_mask_all1">
										<h3>{e.title}</h3>
                                        <p>{e.subTitle}</p>
									</div>
                               
                                </a></Link>

                            </div>
                        )

                    })
                }
                
                <span className="clear_span"></span>
                
            </div>
            
            
            
            <span className="clear_span"></span>
            
        </div>;
    }
}

class Indexcontent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dataTop : [],
            dataBottom : [],
			dataBig : '',
			msg:''
        };
    }
    componentDidMount(){
	
        $.ajax({
            type:'post',
            url:'/user/news/findBannerList.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    this.setState({
						dataTop : d.data
					});
                }
                
            }.bind(this)
        });
		
		$.ajax({
            type:'post',
            url:'/coterie/subject/find.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    this.setState({
						dataBottom : d.data
					});
                }
                
            }.bind(this)
        });
		
		$.ajax({
            type:'get',
            url:'/user/breakingNews/findOneTitle.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    this.setState({
						dataBig : d.data
					});
                }
                
            }.bind(this)
        });
		
		$.ajax({
            type:'get',
            url:'/game/battle/userBattle.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
					var msg = '';
					
					if(d.data){
						if(d.data.gameStatus == 1){
							msg = '等待中';
						}
						else if(d.data.gameStatus == 2){
							msg = '对战中';
						}
						this.setState({
							msg : msg
						});
					}
					
                }
                
            }.bind(this)
        });
		
    }
    render() {
        return <div className="indexcontent">
           
            <Indextop data={this.state.dataTop} />
            <Indexnav />
            <Indexbig data={this.state.dataBig} />
            <Indexloan msg={this.state.msg} />
            <Indexbottom data={this.state.dataBottom} />
            
        </div>;
    }
}
class Indexmask extends React.Component {
	constructor(props){
        super(props)
        this.state = {
            data:[],
			btnNum:1,
			confirm:{
                show:false,
				title:'',
                content:'',
				yes:''
            }
        };
		this.joinpk = this.joinpk.bind(this);
		this.confirmNone = this.confirmNone.bind(this);
		this.confirmNone1 = this.confirmNone1.bind(this);
    }
    componentDidMount(){
		var _this = this;
		if( _this.props.code && (_this.props.code!='') ){
			$.ajax({
				url: '/game/battle/findBattle.do',
				type: 'get',
				data: {batchCode:_this.props.code},
				success:function(d){
					if(d.code == 200){
						_this.setState({
							data:d.data
						});
						if( localStorage.getItem('indexMask') != _this.props.code ){
							$(_this.refs.indexMask).show();
							localStorage.setItem('indexMask', _this.props.code);
						}
						
					}
					else{
						_this.setState({
							btnNum:1,
							confirm:{
								show:true,
								title:'',
								content:d.msg,
								yes:''
							}
						});
					}
				}
			});
		}
	}
	joinpk(){
		var _this = this;
		var id = _this.state.data.id;
		var from = (_this.props.isWechat!='') ? 'friend' : 'weibo';
		
		$.ajax({
			url: '/game/battle/joinBattle.do',
			type: 'post',
			data: {battleId:id,userFrom:from},
			success:function(d){
				if(d.code == 200){
					$(_this.refs.indexMask).hide();
					
					Router.push({
						pathname: '/mobi/pk/trade',
						query: {varietyId:d.data.varietyId,battleId:d.data.id,batchCode:d.data.batchCode}
						       	
					})
				}
				else if(d.code == 2201){
					$(_this.refs.indexMask).hide();
					
					_this.setState({
						btnNum:2,
						confirm:{
							show:true,
							title:'加入失败',
							content:'余额不足，请兑换或选择其他赏金较低的对战',
							yes:'去充值'
						}
					});
				}
				else{
					$(_this.refs.indexMask).hide();
					
					_this.setState({
						btnNum:1,
						confirm:{
							show:true,
							title:'',
							content:d.msg,
							yes:''
						}
					});
				}
			}
		});
	}
	confirmNone(){
		if(this.state.btnNum==2){
			Router.push({
			  pathname: '/mobi/bowl/bowl'
			})
		}
		this.setState({
			btnNum:1,
			confirm:{
				show:false,
				title:'',
				content:'',
				yes:''
			}
		});
	}
	confirmNone1(){
		this.setState({
			btnNum:1,
			confirm:{
				show:false,
				title:'',
				content:'',
				yes:''
			}
		});
	}
	render() {
		var data = this.state.data;
		var time = '';
		var pkCode = '';
		
		if(data.endline){
			var json = {1:'现金',2:'元宝',3:'积分'};
			time = (data.endline/60).toFixed(0)+'分钟';
			pkCode = data.reward + json[data.coinType];
		}
        return <div>
           
            <div className="index_mask" ref="indexMask">
            	<div className="index_mask_content">
            		<div className="index_mask_top">
            			<h3>是否加入对战</h3>
            			<div>对战品种：{data.varietyName?data.varietyName:''}</div>
            			<div>对战时长：{time}</div>
            			<div>对战赏金：{pkCode}</div>
            			<div className="mask_last_p">（加入对战后，赏金将会暂时冻结，对战胜利后返还，失败扣除）</div>
            		</div>
            		<div className="index_mask_bottom">
            			<div className="mask_btn_l" onClick={()=>{$(this.refs.indexMask).hide()}}>我怂了</div>
            			<div className="mask_btn_r" onClick={this.joinpk}>干一票</div>
            		</div>
            	</div>
            </div>
            
            <Confirm type={this.state.btnNum} confirm={this.state.confirm} isOk={this.confirmNone} isNot={this.confirmNone1}/>
            
        </div>
    }
	
}
export default  class IndexAll extends React.Component {
	
    render() {
        return <div>
           
            <Header_title text="乐米"/>
            <Header  text="乐米"/>
            <Indexstyle />
            <Indexcontent />
            <Footer active="index" />
            <Indexmask code={this.props.url.query.code}  isWechat={(this.props.url.query.isWechat==1)?this.props.url.query.isWechat:''} />
			
        </div>
    }
}
