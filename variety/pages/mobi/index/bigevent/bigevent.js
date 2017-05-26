import React from 'react'
import Link from 'next/link'
import Router from 'next/router';
import AllsecondStyle from '../secondcss.js';
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Text_none from '../../common/text_none.js';

import InfiniteScroll from 'react-infinite-scroll-component';


class Bigeventcontent extends React.Component {
	
	constructor(props){
        super(props)
		this.state={
            bigData:[],
            bigPage:0,
            bigMore:true,
			bigHeight:500
        };
		this.toLoadMost = this.toLoadMost.bind(this);
    }
	componentDidMount(){
		this.toLoadMost()
		
	}
	toLoadMost(){
		var _this =this;
		var H = $('.bigeventcontent').height() ? $('.bigeventcontent').height() : ($(window).height()-50) ;
		
		$.ajax({
            type:'post',
            url:'/user/breakingNews/findBreakingNewsList.do',
            data:{ page:_this.state.bigPage,pageSize:30},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    this.setState({
						bigPage:_this.state.bigPage+1,
						bigData:_this.state.bigData.concat(d.data),
						bigMore:d.resultCount>(_this.state.bigPage+1)*30?true:false,
						bigHeight:H
					});
                }
                
            }.bind(this)
        });
		
       
        
    }
    render() {
		
		if(this.state.bigData.length>0){
			
			return <div className="bigeventcontent">
			
				<InfiniteScroll next={this.toLoadMost} height={this.state.bigHeight} hasMore={this.state.bigMore} loader={ <i></i>} endMessage={ <i></i> }>
				
					<Bigscroll ref='big' data={this.state.bigData} />
					
				</InfiniteScroll>
			</div>;
		}
		else{
			return <Text_none text="还没有大事发生！"/>
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
	goNext(url,d){
		var myid = d.id;
		if(d.format == 2){
			Router.push({
				pathname: d.url
			})
		}
		else{
			Router.push({
				pathname: '/mobi/common/article',
				query : {
					id : myid,
					myUrl : url
				}
			})
		}
    }
    render() {
		return <ul>

					{
						this.props.data.map((e,i) => {
							var myUrl = ''
							e.format == 2 ? myUrl = e.url : myUrl ='/mobi/common/article?id='+e.id+'&myUrl=2';
							return(
								<li key={i}>
								
									<Link href={myUrl}><a>

										<div className="bigevent_lic">
											<h5>{e.title}</h5>
											<div className="bigevent_li_time">
												<p>{e.source}</p>
												<span>{this.formattime(e.createTime)}</span>	
											</div>
										</div>

									</a></Link>
									
									<span className="bottom_line"></span>
								</li>
							)

						})
					}
				
				</ul>
    }
}


export default  class extends React.Component {
	
	render() {
		return <div>
			<Header_title text="乐米-大事件"/>
			<div><Header text="大事件" /></div>
			<AllsecondStyle />

			<Bigeventcontent />
		</div>
	}
}
