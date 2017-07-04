import React from 'react'
import Link from 'next/link'
import Router from 'next/router';
import AllhistoryStyle from './pk_historycss.js';
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import Text_none from '../common/text_none.js';

import InfiniteScroll from 'react-infinite-scroll-component';


class Bigeventcontent extends React.Component {
	
	constructor(props){
        super(props)
		this.state={
            bigData:[],
            bigMore:true,
			bigHeight:500,
			userId:''
        };
		this.toLoadMost = this.toLoadMost.bind(this);
    }
	componentDidMount(){
		this.toLoadMost()
		
	}
	toLoadMost(){
		var _this =this;
		
		var H = $('.bigeventcontent').height() ? $('.bigeventcontent').height() : ($(window).height()-50) ;
		
		var arr = _this.state.bigData;
		var location = arr[arr.length-1]?arr[arr.length-1].createTime:'';
		
		$.ajax({
            type:'get',
            url:'/game/battle/myBattleGamed.do',
            data:{ location:location,pageSize:15},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    this.setState({
						bigData:_this.state.bigData.concat(d.data.list),
						bigMore:d.data.list.length>14?true:false,
						bigHeight:H,
						userId:d.data.loginUser
					});
                }
                
            }.bind(this)
        });
		
       
        
    }
    render() {
		
		if(this.state.bigData.length>0){
			
			return <div className="bigeventcontent">
			
				<InfiniteScroll next={this.toLoadMost} height={this.state.bigHeight} hasMore={this.state.bigMore} loader={ <i></i>} endMessage={ <i></i> }>
				
					<Bigscroll ref='big' userId={this.state.userId} data={this.state.bigData} />
					
				</InfiniteScroll>
			</div>;
		}
		else{
			return <div className="textNone_content">
        
					<div className="textNone_img"></div>
					
				</div>
		}
    }
}


class Bigscroll extends React.Component {
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
		//发起左  应战右
		return <ul className='pxh_main'>

					{
						this.props.data.map((e,i) => {
							var yzImg = e.againstUserPortrait ? e.againstUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200' : '/static/mine/headportrait160x160@3x.png';
							var fqImg = e.launchUserPortrait ? e.launchUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200' : '/static/mine/headportrait160x160@3x.png';
							
							var pkImg = '/static/pk/futuresvs_recordlist_failure@2x.png';
							var pkStr = '';
							var pkGold = 0;
							var pkjson = {1:'现金',2:'元宝',3:'积分'};
							var pkcolor = 'pxh_win';
							
							if(this.props.userId==e.againstUser){//用户是应战者
								if(e.winResult == 2){
									pkImg = '/static/pk/futuresvs_recordlist_victory@2x.png';
									pkStr = '获胜';
									pkGold = '+'+( e.reward-(e.commission?e.commission:0) );
								}
								else if(e.winResult == 0){
									pkStr = '平局';
									pkcolor = 'pxh_low';
									pkGold = 0;
								}
								else{
									pkStr = '败北';
									pkcolor = 'pxh_low';
									pkGold = '-'+e.reward;
								}
							}
							else{//用户是发起者
								if(e.winResult == 1){
									pkImg = '/static/pk/futuresvs_recordlist_victory@2x.png';
									pkStr = '获胜';
									pkGold = '+'+( e.reward-(e.commission?e.commission:0) );
								}
								else if(e.winResult == 0){
									pkStr = '平局';
									pkcolor = 'pxh_low';
									pkGold = 0;
								}
								else{
									pkStr = '败北';
									pkcolor = 'pxh_low';
									pkGold = '-'+e.reward;
								}
							}
							
							return(
								<li key={i}><Link href={'/mobi/pk/pk_detailed?pkid='+e.id}><a>
				
									<div className={'pxh_left '+pkcolor}>
										<div className='pxh_bt'><img src={pkImg}/><span>{pkStr}</span></div>
										<div className='pxh_game'>{e.varietyName+' '+pkGold+pkjson[e.coinType]}</div>
									</div>

									<div className='pxh_right'>

										<div className='pxh_user'>
											<img className='pxh_people' src={fqImg} />
											<div>{e.launchUserName}</div>
										</div>
										<img className='pxh_pk' src='/static/pk/futuresvs_list_vs@2x.png'/>
										<div className='pxh_user pxh_userR'>
											<img className='pxh_people' src={yzImg} />
											<div>{e.againstUserName}</div>
										</div>
									</div>

								</a></Link></li>
							)

						})
					}
				
				</ul>
    }
}


export default  class extends React.Component {
	
	render() {
		return <div>
			<Header_title text="期货对战-战绩"/>
			<div><Header text="期货对战-战绩" /></div>
			<AllhistoryStyle />
				
			<Bigeventcontent />
			
		</div>
	}
}
