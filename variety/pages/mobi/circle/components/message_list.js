import React from 'react'
import Link from 'next/link'
import Router from 'next/router';
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Style from './messagecss.js';
import Text_none from '../../common/text_none.js';
import InfiniteScroll from 'react-infinite-scroll-component';


class Bigeventcontent extends React.Component {
	
	constructor(props){
        super(props)
		this.state={
            bigData:[],
            bigMore:true,
			bigHeight:800,
			firstData:[],
			firstOnoff:true,
			firstH : 400
        };
		this.firstData = this.firstData.bind(this);
		this.toLoadMost = this.toLoadMost.bind(this);
    }
	componentDidMount(){
		
		var fH = $('body').outerHeight(true)-50;
		this.setState({firstH:fH});
		
		if(this.props.from=='1'){
			this.setState({
				firstOnoff:false
			});
			this.toLoadMost();
		}
		else{
			this.firstData();
		}
		
	}
	firstData(){
		$.ajax({
            type:'post',
            url:'/msg/msg/history.do',
            data:{classify:'2,3',status:'0'},
            dataType:'json',
            success:function(d){
                if(d.code==200){
					this.setState({
						firstData:d.data,
						bigData:d.data
					});
					
					if(d.data.length == 0){
						this.setState({
							firstOnoff:false
						});
						this.toLoadMost();
					}
                }
                
            }.bind(this)
        });
	}
	toLoadMost(){
		
		var _this =this;
		var H = $('.message_content').height() ? $('.message_content').height() : ($(window).height()-50) ;
		
		var timeLast = _this.state.bigData[_this.state.bigData.length-1] ?_this.state.bigData[_this.state.bigData.length-1].createTime : '';
		
		var json = {};
		if(this.props.from=='1'){
			json = {classify:'2,3',autoRead:false,createTime:timeLast,size:15}
		}
		else{
			json = {classify:'2,3',status:'1',createTime:timeLast,size:15}
		}
		$.ajax({
            type:'post',
            url:'/msg/msg/history.do',
            data:json,
            dataType:'json',
            success:function(d){
                if(d.code==200){
					if(_this.state.firstOnoff){
						$('.all_msg').scrollTop(0)
						this.setState({
							firstOnoff:false,
							bigMore:d.data.length>14?true:false,
							bigData:_this.state.firstData.concat(d.data)
						});
						
					}else{
						this.setState({
							bigData:_this.state.bigData.concat(d.data),
							bigMore:d.data.length>14?true:false,
							bigHeight:H
						});
					}
                    
                }
                
            }.bind(this)
        });
		
       
        
    }
    render() {
		if(this.state.firstOnoff){
			if(this.state.firstData.length>0){

				return <div ref='mesScoll' className='all_msg' style={{height:this.state.firstH}}>

					<Bigscroll data={this.state.firstData} />
					<div className="message_more" onClick={this.toLoadMost}>查看更早期的消息...</div>
					
				</div>;
			}
			else{
				return <div className="message_more" onClick={this.toLoadMost}>查看更早期的消息...</div>
			}
		}
		else{
			if(this.state.bigData.length>0){

				return <div className="message_content all_msg" ref='mesScoll' style={{height:this.state.firstH}}>

					<InfiniteScroll next={this.toLoadMost} height={this.state.bigHeight} hasMore={this.state.bigMore} loader={ <i></i>} endMessage={ <i></i> }>

						<Bigscroll data={this.state.bigData} />

					</InfiniteScroll>
					
				</div>;
			}
			else{
				return <Text_none />
			}
		}
		
    }
}


class Bigscroll extends React.Component {
	constructor(props){
        super(props)
		
		this.toNext = this.toNext.bind(this);
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
	toNext(type,url,type_id2,type_userid2,type_viewpointId1,myid){
		
		if(type==2){
			//'/mobi/lend/lend_detail?id='+e.dataId+'&userId='+myORuser+'&type=detail&lendType=' 
			Router.push({
				pathname: url,
				query: {id:type_id2,userId:type_userid2,type:'detail',lendType:''}
			});
		}
		else{
			//'/mobi/circle/components/service_detail?viewpointId='+gdId+'&type=detail&myreplyId='+e.dataId;
			Router.push({
				pathname: url,
				query: {viewpointId:type_viewpointId1,type:'detail'}
			});
			localStorage.setItem('myreplyId',myid);
		}
	}
    render() {
		
		return <ul>

					{
						this.props.data.map((e,i) => {
							var userImg = e.sourceUser.userPortrait ? e.sourceUser.userPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/mine/headportrait160x160@3x.png';
							
							var myORuser = (e.type == 10 || e.type == 17 || e.type == 18) ? e.userId : e.sourceUserId;
							var gdId = (e.type == 3 || e.type == 4 || e.type == 5) ? e.viewpointId : e.dataId;
							var linkUrl = e.classify==2 ? '/mobi/lend/lend_detail' : '/mobi/circle/components/service_detail';
			
							//借款详情  观点详情
							var imgArr = [];
							var imgClass = '';
							if(e.data.contentImg){
								imgArr = e.data.contentImg.split(',');
								imgClass = imgArr.length>1?'possiimg_show':'possiimg_hide'
							}
							
							return (
							<li key={i}>

								<div onClick={()=>this.toNext(e.classify,linkUrl,e.dataId,myORuser,gdId,e.dataId)}>

									<div className="message_li">

										<div className="message_left">
										
											<img src={userImg} />
											
											<div className="message_left_text">
												<div className="message_name">{e.sourceUser.userName}</div>
												<div className="message_span">{e.msg}</div>
												<div className="message_time">{this.formattime(e.createTime)}</div>
											</div>
											
										</div>

										<div className="message_right">
											<div>
												{
												e.data.contentImg ? 
													<div>
														<img src={imgArr[0]} />
														<img className={'possiimg '+imgClass}  src='/static/help/circle_more_pic@2x.png' />
													</div>
												: 
												(e.data.content ? 
													<div className="message_right_text">{e.data.content}</div>
													: 
													e.data.money ? 
												 	<div>
														<span>{'借'+e.data.money+'元'}</span>
														<span>{'期限'+e.data.days+'天'}</span>
														<span>{'利息'+e.data.interest+'元'}</span>
													</div> : <div></div>)
												}

											</div>
										</div>

									</div>

								</div>

							</li>)

						})
					}
				
				</ul>
		
    }
}


export default  class extends React.Component {
	
	render() {
		return <div>
			<Header_title text="消息"/>
			<div><Header text="消息" /></div>
			<Style />
			<Bigeventcontent from={this.props.url.query.from} />
		</div>
	}
}
