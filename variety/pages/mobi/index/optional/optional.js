import React from 'react'
import $ from 'jquery'
import Router from 'next/router';
import Header_title from '../../common/header/header_title.js'
import Head from '../../common/header/header_left.js'
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
                    <li>名称</li>
                    <li>最新价格</li>
                    <li>涨跌幅</li>
                </ul>
			   <div className="main_ovx">
				{

					this.props.data.map((e,i) => {
						var lastPrice='',upDropSpeed='',myClass='',myCode='',myNext='',myNextId='',gpId='';
						if(e.bigVarietyTypeCode=='stock'){//股票
							myCode = e.varietyType;
							
							lastPrice = jsonCode1[e.varietyType] ? jsonCode1[e.varietyType].last_price : '--';

							upDropSpeed = jsonCode1[e.varietyType] ? ( (jsonCode1[e.varietyType].rise_pre-0).toFixed(2)<0 ? (jsonCode1[e.varietyType].rise_pre-0).toFixed(2) : '+'+(jsonCode1[e.varietyType].rise_pre-0).toFixed(2) )+"%":'--';

							myClass = jsonCode1[e.varietyType] ?jsonCode1[e.varietyType].myClass : '';
							
							myNext = 1;
							myNextId = e.varietyType;
							gpId = e.varietyId;
						}
						else if( e.bigVarietyTypeCode=='future' ){//期货
							myCode = e.contractsCode;
							
							lastPrice = jsonCode[e.contractsCode] ? (jsonCode[e.contractsCode].lastPrice).toFixed(e.marketPoint):'--';

							upDropSpeed = jsonCode[e.contractsCode]?( (jsonCode[e.contractsCode].upDropSpeed*100).toFixed(2)<0?(jsonCode[e.contractsCode].upDropSpeed*100).toFixed(2):'+'+(jsonCode[e.contractsCode].upDropSpeed*100).toFixed(2) )+"%":'--';

							myClass = jsonCode[e.contractsCode] ?jsonCode[e.contractsCode].myClass : '';
							
							myNext = 0;
							myNextId = e.varietyId;
							
						}
						
						
						
						return(
							<div key={i}  ref={i} className='list' onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={()=>this.handleTouchEnd(i)} onClick={()=>this.handClick(myNext,myNextId,i,gpId)}>
								<span className='pz_bt'>{e.varietyName}<em>{myCode}</em></span>
								<span className={ myClass +' price'}>{lastPrice}</span>
								<span className={ myClass +' percent'}>{upDropSpeed}</span>
								<div className='list_remove' onClick={()=>this.removeClick( e.varietyId)}>删除</div>
						   </div>
						)

					}) 
				}
				</div>

			</div>)
		}else{
			return <Text_none text="暂无自选"/>
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
            }
        }
		this.ready = this.ready.bind(this);
		this.nextChange = this.nextChange.bind(this);
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
							jsonCode[d.data[i].instrumentId].upDropPrice > 0 ? jsonCode[d.data[i].instrumentId].myClass = 'color_red' : jsonCode[d.data[i].instrumentId].myClass = 'color_green';
						}
						_this.setState({
							dataHq : jsonCode
						});
					}
				}
			});
			$.ajax({
				type:'get',
				url:'/stock/comb',
				data:{stock_code:Scode1},
				dataType:'json',
				async:false,
				success:function(d){
					if(d.result[0].data.length>0){
						var mydata = d.result[0].data;
						for(var i=0;i<mydata.length;i++){
							jsonCode1[mydata[i].stock_code] = mydata[i];
							jsonCode1[mydata[i].stock_code].rise_price > 0 ? jsonCode1[mydata[i].stock_code].myClass = 'color_red' : jsonCode1[mydata[i].stock_code].myClass = 'color_green';
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
    render (){
        return <div>
           
            <Header_title text='乐米自选'/>
            <Head text="自选" />
            
            <Flist data={this.state.data} dataHq={this.state.dataHq}  dataHq1={this.state.dataHq1} isChang={this.nextChange}/>
            
            <Confirm confirm={this.state.confirm} />

            <style>{`
				body{
					background: #efefef;
					overflow-x: hidden;
				}
                 nav{
                    width:100%;
                    display:flex;
                    display:-weblit-flex;
                    background:#fff;
                }
                nav div{
                    flex:1;
                    -webkit-flex:1;
                    text-align:center;
                }
                nav  span{
                    line-height:.5rem;
                    color:#0c0f16;
                    font-size:.16rem;
                    display:block;
                    position:relative;
                }
                 nav span.on{
                    color:#869bcb;
                }
                 nav span.on:after{
                    content:'';
                    border-bottom:.02rem solid #869bcb;
                    width:.5rem;
                    position:absolute;
                    left:50%;
                    top:.48rem;
                    margin-left:-.25rem;
                }
                div.con{
                    display:none;
                }
                div.active{
                    display:block;
                }
                ul.top{
                    width:100%;
                    display:flex;
                    background:#fff;
                    border-bottom:.01rem solid #f0efef;
                }
                ul.top li{
                    flex:1;
                    text-align:left;
                    padding-left:.12rem;
                    font-size:.14rem;
                    color:#82848a;
                    line-height:.36rem;
                }
                 div.main{
                    background:#fff;
                }
                div.list{
                    width:100%;
                    display:flex;
                    display:-webkit-flex; 
                    padding:.1rem 0; 
                    border-bottom:.01rem solid #f0efef; 
					position: relative;
                }
                div.list span{
                    flex:1;
                    -webkit-flex:1;
                    display:block;
                    padding-left:.1rem;
                    font-size:.16rem;
					color: #838489;
                }
				div.list span.pz_bt{
					color: #0c0f16;
				}
				div.list span.color_red{
					color: #cd4a47;
				}
				div.list span.color_green{
					color: #33d37e;
				}
                div.list span em{
                    display:block;
                    font-size:.12rem;
                    font-style:normal;
					color: #838489;
                }
                span.price,span.percent{
                    line-height:.32rem;
                    color:#cd4a47;
                    font-size:.16rem;
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
					overflow: hidden;
				}
            `}</style>
          </div>
        
    } 
}
