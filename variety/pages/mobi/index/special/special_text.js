import React from 'react'
import Link from 'next/link'
import $ from 'jquery'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';

export default class ArticleContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: {} };
	}
	componentDidMount(){
		
		var obj = this.props.url.query;
		var myId = obj.a;
		
		$.ajax({
            type:'get',
            url:'/coterie/subject/findCoterieInfo.do',
            data:{id:myId},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    this.setState({
						data : d.data.subjectModel
					});
					this.refs.content.innerHTML = d.data.subjectModel.context;
                }
                
            }.bind(this)
        });
		
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
		var d = this.state.data;
		if(d != {}){
			
			return <div>
    		
				<Header_title text={d.title} />
				<div><Header text={d.title} /></div>
				<div className="aticle_main">
					<h3 className="aticle_title">{d.subTitle}</h3>
					<div className="aticle_topC">
						<span className="aticle_time aticle_timeN">{this.formattime(d.createDate)}</span>
					</div>
					<div className="aticle_content" ref="content"></div>
				</div>
				<style jsx>{`

					.aticle_main{
						width: 90%;
						margin: 0 auto;
					}
					.aticle_title{
						text-align: center;
						line-height: 0.4rem;
						margin-top: 0.1rem;
						color: #0C0F16;
					}
					.aticle_topC{
						text-align: center;
					}
					.aticle_from{
						margin-right: 0.1rem;
					}
					.aticle_timeN{
						margin-left: 0.1rem;
					}
					.aticle_from,.aticle_time{
						text-align: center;
						display: inline-block;
						font-size: 0.12rem;
						line-height: 0.3rem;
						font-size: 0.13rem;
						color: #B3B3B3;
					}
					.aticle_content{
						margin-top: 0.2rem;
						line-height: 0.25rem;
						color: #5F6166;
					}
				`}</style>

			</div>
		}
		else{
			return ''
		}
    	
    }
}