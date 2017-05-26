import React from 'react'
import Link from 'next/link'
import $ from 'jquery'
import Router from 'next/router';
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import AllsecondStyle from '../secondcss.js';

export default class Specialmain extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: {} };
	}
	componentDidMount(){
		var showId = this.props.url.query.a;
		var _this =  this;
		
		$.ajax({
			url: '/coterie/subject/findCoterieInfo.do',
			type: 'GET',
			dataType: 'json',
			data: {id: showId},
			success: function(d){
				if(d.code==200) {
					
					var Scode = ''
					var d2 = d.data.SubjectDetailModelList ? d.data.SubjectDetailModelList : [];
					var jsonCode = {};
					
					if( (d2.length>0) && (d2[0].bigVarietyTypeCode=='stock') ){//股票
						
						
						for(var i=0;i<d2.length;i++){
							Scode += d2[i].varietyType + ','
						}
						Scode = Scode.substring(0,Scode.length-1);
						
						$.ajax({
							type:'get',
							url:'/stock/comb',
							data:{stock_code:Scode},
							dataType:'json',
							async:false,
							success:function(d){
								
								if(d.result[0].data.length>0){
									var mydata = d.result[0].data;
									for(var i=0;i<mydata.length;i++){

										jsonCode[mydata[i].stock_code] = mydata[i];
										jsonCode[mydata[i].stock_code].rise_price > 0 ? jsonCode[mydata[i].stock_code].myClass = 'special_red' : jsonCode[mydata[i].stock_code].myClass = 'special_green';

									}
									_this.setState({
										dataHq : jsonCode
									});
								}
							}
						});
					}
					else if( (d2.length>0) && (d2[0].bigVarietyTypeCode=='future') ){//期货
						for(var i=0;i<d2.length;i++){
							Scode += d2[i].contractsCode + ','
						}
						Scode = Scode.substring(0,Scode.length-1);
						$.ajax({
							type:'get',
							url:'/fut/quota/list.do',
							data:{codes:Scode},
							dataType:'json',
							async:false,
							success:function(d){
								if(d.code==200){
									for(var i=0;i<d.data.length;i++){

										jsonCode[d.data[i].instrumentId] = d.data[i];
										jsonCode[d.data[i].instrumentId].upDropPrice > 0 ? jsonCode[d.data[i].instrumentId].myClass = 'special_red' : jsonCode[d.data[i].instrumentId].myClass = 'special_green';

									}
									_this.setState({
										dataHq : jsonCode
									});
								}
							}
						});
					}
					
					
					this.setState({
						data : d.data
					});
					localStorage.setItem('future', JSON.stringify(d.data.SubjectDetailModelList));
				}    
			}.bind(this)
		})
		
		
	}
	toNext(id,num,gpId){
		if(num==0){//期货
			
			Router.push({
				pathname: '/mobi/future/future_quota',
				query : {
					varietyId : id
				}
			})
		}
		else if(num==1){//股票
			Router.push({
				pathname: '/mobi/stock/stock_quota',
				query : {
					varietyType : id,
					varietyId : gpId
				}
			})
		}
        
    }
	render() {
		var data = this.state.data;
		var jsonCode = this.state.dataHq || {};
		
		return <div>

			<Header_title text="乐米-专题"/>
			<div><Header text={data.subjectModel ? data.subjectModel.title : ''} /></div>
			<AllsecondStyle />
			<div className="special_top clear">

				<img src="/static/index_img/subject_pic_bg@2x.png" />
				<p>{data.subjectModel ? data.subjectModel.introduction : ''}</p>
				<div className="special_mask"></div>
				
				<span className="clear_span"></span>
				
			</div>
			<ul className="special_content">
				
				{
					data.SubjectDetailModelList ? data.SubjectDetailModelList.map((e,i) => {
						
						
						var myCode = '',lastPrice = '',upDropSpeed = '',myClass = '',myNext = '',myNextId = '',gpId='';
						
						if(e.bigVarietyTypeCode=='stock'){//股票
							myCode = e.varietyType;
							
							lastPrice = jsonCode[e.varietyType] ? jsonCode[e.varietyType].last_price : '--';

							upDropSpeed = jsonCode[e.varietyType] ? ( (jsonCode[e.varietyType].rise_pre-0).toFixed(2)<0 ? (jsonCode[e.varietyType].rise_pre-0).toFixed(2) : '+'+(jsonCode[e.varietyType].rise_pre-0).toFixed(2) )+"%":'--';

							myClass = jsonCode[e.varietyType] ?jsonCode[e.varietyType].myClass : '';
							
							myNext = 1;
							myNextId = e.varietyType;
							gpId = e.varietyId;
						}
						else if( e.bigVarietyTypeCode=='future' ){//期货
							myCode = e.contractsCode;
							
							lastPrice = jsonCode[e.contractsCode] ? jsonCode[e.contractsCode].lastPrice : '--';

							upDropSpeed = jsonCode[e.contractsCode] ? ( (jsonCode[e.contractsCode].upDropSpeed*100).toFixed(2)<0 ? (jsonCode[e.contractsCode].upDropSpeed*100).toFixed(2) : '+'+(jsonCode[e.contractsCode].upDropSpeed*100).toFixed(2) )+"%":'--';

							myClass = jsonCode[e.contractsCode] ?jsonCode[e.contractsCode].myClass : '';
							
							myNext = 0;
							myNextId = e.varietyId;
							
						}
						return(
							<li key={i}>

								<a onClick={()=>{this.toNext(myNextId,myNext,gpId)}}>

									<div className="special_cleft">
										<div>{e.varietyName}</div>
										<span>{myCode}</span>
									</div>
									<div className="special_cright">
										<span className={ myClass +" special_bd"}>{lastPrice}</span>
										<span className={ myClass +" special_bf"}>{upDropSpeed}</span>
									</div>

								</a>
								<span className="bottom_line"></span>

							</li>
						)

					}) : ''
				}
				


			</ul>

		</div>
		
    }
}
