import React from 'react'
import $ from 'jquery'
import Router from 'next/router';
import Header_title from '../../common/header/header_title.js'
import Head from '../../common/header/header_left.js'
import Type from '../../common/type.js'
import Text_none from '../../common/text_none.js';
import Confirm from '../../common/confirm.js';


class Flist extends React.Component {
    constructor(props){
        super(props)
		this.page = {
            startX: 0,
			startY:0,
            endX: 0,
			endY: 0,
			toNext: true
		};
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.handClick = this.handClick.bind(this);
		this.removeClick = this.removeClick.bind(this);
    }
	componentDidMount(){
		$(window).click(function(){
			$('.list').stop().animate({left: '0rem'},100);
		})
	}
	handleTouchStart(e){
		this.page.startX = e.changedTouches[0].pageX
		this.page.startY = e.changedTouches[0].pageY
		
    }
	handleTouchMove(e){
        this.page.endX = e.changedTouches[0].pageX
		this.page.endY = e.changedTouches[0].pageY
    }
	handleTouchEnd(i){
		var pageStart = this.page.startX;
		var pageEnd = this.page.endX;
		var pageStartY = this.page.startY;
		var pageEndY = this.page.endY;
		
		var listMove = $(this.refs[i]);
		var l = listMove.offset().left;
		
		if( ( (pageEnd-pageStart)<-50 ) &&  (pageEnd!=0) ){
			if( (pageEndY-pageStartY)<50 ){
				listMove.stop().animate({left: '-0.7rem'},100);
				this.page.toNext = false;
			}
		}
		else{
			if(l<0){
				listMove.stop().animate({left: '0'},100);
				this.page.toNext = true;
			}
		}
    }
	removeClick(id){
		//删除按钮
		$.ajax({
            type:'post',
            url:'/order/optional/deleteOptional.do',
            data:{varietyId:id},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    this.props.isChang('true')
                }
				else{
					this.props.isChang(d.msg)
				}
                
            }.bind(this)
        });
		
	}
	handClick(nextNum,myId,i,gpId){
		var listMove = $(this.refs[i]);
		var l = listMove.offset().left;
		if(!(l<0)){
			if(nextNum==0){//期货
				Router.push({
					pathname: '/mobi/future/future_quota',
					query : {
						varietyId : myId
					}
				})
			}
			else if(nextNum==1){//股票
				Router.push({
					pathname: '/mobi/stock/stock_quota',
					query : {
						varietyType : myId,
						varietyId : gpId
					}
				})
			}
		}
	}
    render(){
        if(this.props.data.length>0){
			
			var jsonCode = this.props.dataHq || {};
			var jsonCode1 = this.props.dataHq1 || {};
			
            return (
            <div className="main">
            	<ul className='top'>
                    <li className="name">名称</li>
                    <li>最新价格</li>
                    <li>涨跌幅</li>
                </ul>
			   <div className="main_ovx">
				{

					this.props.data.map((e,i) => {
						var lastPrice='',upDropSpeed='',myClass='',myCode='',myNext='',myNextId='',gpId='',_type;
						if(e.bigVarietyTypeCode=='stock'){//股票
                            _type = '股票';
							myCode = e.varietyType;
							
							lastPrice = jsonCode1[e.varietyType] ? jsonCode1[e.varietyType].lastPrice.toFixed(e.marketPoint) : '--';

							upDropSpeed = jsonCode1[e.varietyType] ? ( (jsonCode1[e.varietyType].upDropSpeed*100).toFixed(2)<0 ? (jsonCode1[e.varietyType].upDropSpeed*100).toFixed(2) : '+'+(jsonCode1[e.varietyType].upDropSpeed*100).toFixed(2) )+"%":'--';

							myClass = jsonCode1[e.varietyType] ?jsonCode1[e.varietyType].myClass : '';
							
							
							if(jsonCode1[e.varietyType].status == 0){
								myClass = 'istp_class';
								upDropSpeed = '停牌'
							}
							
							myNext = 1;
							myNextId = e.varietyType;
							gpId = e.varietyId;
						}
						else if( e.bigVarietyTypeCode=='future' ){//期货
                             _type = '期货';
							myCode = e.contractsCode;
							
							lastPrice = jsonCode[e.contractsCode] ? (jsonCode[e.contractsCode].lastPrice).toFixed(e.marketPoint):'--';

							upDropSpeed = jsonCode[e.contractsCode]?( (jsonCode[e.contractsCode].upDropSpeed*100).toFixed(2)<0?(jsonCode[e.contractsCode].upDropSpeed*100).toFixed(2):'+'+(jsonCode[e.contractsCode].upDropSpeed*100).toFixed(2) )+"%":'--';

							myClass = jsonCode[e.contractsCode] ?jsonCode[e.contractsCode].myClass : '';
							
							myNext = 0;
							myNextId = e.varietyId;
							
						}
						
						
						
						return(
							<div key={i}  ref={i} className='list' onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={()=>this.handleTouchEnd(i)} onClick={()=>this.handClick(myNext,myNextId,i,gpId)}>
								<span className='pz_bt'>{e.varietyName}<em>{_type} {myCode}</em></span>
								<span className={ myClass +' price'}>{lastPrice}</span>
								<span className='percent'><b className={myClass}>{upDropSpeed}</b></span>
								<div className='list_remove' onClick={()=>this.removeClick( e.varietyId)}>删除</div>
						   </div>
						)

					}) 
				}
				</div>

			</div>)
		}else{
			return <div className="main">
                <ul className='top'>
                    <li className="name">名称</li>
                    <li>最新价格</li>
                    <li>涨跌幅</li>
                </ul>
                <Text_none text="暂无自选股票/期货"/>
            </div>
		}
        
    }
}

export default  class  Future extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data:[],
			dataHq : {},
			dataHq1 : {},
			confirm:{
                show:false,
                type:1,
                content:''            
            },
            opType:0
        }
		this.ready = this.ready.bind(this);
		this.nextChange = this.nextChange.bind(this);
        this.hanleType = this.hanleType.bind(this);
    }
    componentDidMount(){
		this.ready()
    }
	ready(){
		var _this = this;
		$.ajax({
            type:'post',
            url:'/order/optional/findOptional.do',
            data:{page:0,pageSize:200},
            dataType:'json',
            success:function(d){
                if(d.code==200){
					
					nextFn(d.data)
					
                    this.setState({
						data : d.data
					});
					localStorage.setItem('future', JSON.stringify(d.data));
                }
                
            }.bind(this)
        });
		function nextFn(arr){
			var Scode = '';
			var Scode1 = '';
			var jsonCode = {};
			var jsonCode1 = {};
			var d2 = arr;
			
			
			for(var i=0;i<d2.length;i++){
				if(d2[i].bigVarietyTypeCode == 'stock'){
					Scode1 += d2[i].varietyType + ','
				}
				else if(d2[i].bigVarietyTypeCode == 'future'){
					Scode += d2[i].contractsCode + ','
				}
			}
			
			Scode = Scode.substring(0,Scode.length-1);
			Scode1 = Scode1.substring(0,Scode1.length-1);
			
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
							jsonCode[d.data[i].instrumentId].upDropPrice >= 0 ? jsonCode[d.data[i].instrumentId].myClass = 'thigh' : jsonCode[d.data[i].instrumentId].myClass = 'tlow';
						}
						_this.setState({
							dataHq : jsonCode
						});
					}
				}
			});
			$.ajax({
				type:'get',
				url:'/stk/stk/list.do',
				data:{codes:Scode1},
				dataType:'json',
				async:false,
				success:function(d){
					if(d.data.length>0){
						var mydata = d.data;
						for(var i=0;i<mydata.length;i++){
							jsonCode1[mydata[i].instrumentId] = mydata[i];
							jsonCode1[mydata[i].instrumentId].upDropSpeed >= 0 ? jsonCode1[mydata[i].instrumentId].myClass = 'thigh' : jsonCode1[mydata[i].instrumentId].myClass = 'tlow';
						}
						
						_this.setState({
							dataHq1 : jsonCode1
						});
					}
				}
			});
		}
		
		
	}
	nextChange(onoff){
		if(onoff == 'true'){
			this.ready()
		}
		else{
			
			this.setState({
				confirm:{
					show:true,
					content:onoff
				}
			});
			
		}
	}
    hanleType(){
        this.setState({
            opType:!this.state.opType
        })
    }
    render (){
        return <div>
           
            <Header_title text='乐米自选'/>
            <Head text="自选" />
            <Flist data={this.state.data} dataHq={this.state.dataHq}  dataHq1={this.state.dataHq1} isChang={this.nextChange}/>
            <foot onClick={this.hanleType}>添加自选</foot>
            <Confirm confirm={this.state.confirm} />
            <Type show={this.state.opType} callback={this.hanleType} type={0}/>
            <style>{`
				body{
					overflow-x: hidden;
				}
                ul.top{
                    width:100%;
                    display:flex;
                    background:#f5f5f5;
                    border-bottom:.01rem solid #ddd;
                    padding:0 .1rem;
                }
                ul.top li{
                    flex:1;
                    text-align:left;
                    font-size:.1rem;
                    color:#999;
                    line-height:.32rem;
                }
                ul.top li.name{
                    flex:2;
                }
                ul.top li:last-child{
                    text-align:right;
                }
                div.mian{
                    padding-bottom:.5rem;
                }
                div.list{
                    width:100%;
                    display:flex;
                    display:-webkit-flex; 
                    padding:.1rem; 
                    border-bottom:.01rem solid #ddd; 
					position: relative;
                    background:#fff;
                }
                div.list span{
                    flex:1;
                    -webkit-flex:1;
                    display:block;
                    font-size:.15rem;
                }
				div.list span.pz_bt{
					color: #0c0f16;
				}
				
                
                 div.list span:first-child{
                    flex:2;
                    -webkit-flex:2;
                    color:#222;
                    font-size:.15rem;
                }
                div.list span em{
                    display:block;
                    font-size:.1rem;
                    font-style:normal;
                    color:#999;
                }
                span.price,span.percent{
                    line-height:.32rem;
                    color:#838489;
                    font-size:.17rem;
                }
                span.thigh{
                    color:#cd4a47;
                }
               span.tlow{
                    color:#2ecc9f;
               }
               div.list span b{
                    width:.7rem;
                    height:.27rem;
                    display:block;
                    color:#fff;
                    text-align:center;
                    line-height:.27rem;
                    font-size:.15rem;
                    float: right;
                    font-weight: normal;
               }
               div.list span b.thigh{
                background:#cd4a47;
               }
                div.list span b.tlow{
                background:#2ecc9f;
               }
				div.list span b.istp_class{
                background:#838489;
               }
				div.list_remove{
					width: 0.7rem;
					height: 100%;
					background: #cd4a47;
					line-height: 0.57rem;
					text-align: center;
					color: #FFF;
					position: absolute;
					top: 0;
					right: -0.7rem;
				}
				.main_ovx{
					width: 100%;
					overflow-x: hidden;
                    padding-bottom:.5rem;
				}
                foot{
                    position:fixed;
                    bottom:0;
                    left:0;
                    width:100%;
                    height:.49rem;
                    border-top:.01rem solid #ddd;
                    background:#fff;
                    color:#cd4a47;
                    line-height:.49rem;
                    text-align:center;
                    font-size:.15rem;
                }
            `}</style>
          </div>
        
    } 
}
