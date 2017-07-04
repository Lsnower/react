import Router from 'next/router';

class Issure_con extends React.Component{
    constructor(props) {
        super(props);
        this.detail = this.detail.bind(this);
        this.toProduct = this.toProduct.bind(this);
    }
    componentWillReceiveProps(){

    }
    componentDidMount(){
        var t = this;
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
    detail(e){
        var t = this,
        viewpointId = t.props.circle?t.props.info.dataId:t.props.info.id;
		if(!(this.props.myfb=='true')){
			if(!(this.props.notab=='true')){
				Router.push({
					pathname: '/mobi/circle/components/service_detail',
					query: {viewpointId:viewpointId,type:'detail'}
				})
			}
		}
		
        
    }
    toProduct(event){
		if(!(this.props.fb=='true')){
			if(this.props.url.query.type){
				event.stopPropagation();
			}
			// 股票：varietyType=000001&varietyId=1739
			var bigVarietyTypePath = {
				'future':['/mobi/future/future_quota',{varietyId:this.props.varietyDate.varietyId}],
				'stock':['/mobi/stock/stock_quota',{varietyId:this.props.varietyDate.varietyId,varietyType:this.props.varietyDate.varietyType}]
			};
			var pathName = bigVarietyTypePath[this.props.varietyDate.bigVarietyTypeCode][0],
				productQuery = bigVarietyTypePath[this.props.varietyDate.bigVarietyTypeCode][1]
			Router.push({
				pathname:pathName,
				query:productQuery
			})
		}
        
    }
    render(){
        var bigVarietyTypeCode = {'future':'期货: ','forex':'外汇: ','stock':'股票: '};
        var detail =this.props.url? this.props.url.query.type:false;
        var ihigh = ['opinion_up.png','opinion_up_succeed.png','opinion_up_fail.png'],
                ilow = ['opinion_down.png','opinion_down_succeed.png','opinion_down_fail.png'];
        var v = this.props.info.direction?ihigh:ilow;
		var notab = this.props.notab ? this.props.notab : 'false';
		var headnoClass= notab=='true' ? 'notab_hide title' : 'title';
		var headnoClass1= notab=='true' ? 'head_show head_title' : 'head_hide head_title';
		
		//{this.props.info.content?(detail == 'detail'?this.props.info.content:(this.props.info.content.length>23?(this.props.info.content).substring(0,32)+'...':this.props.info.content)):'-'}
		
        return(
            <div>
                <div onClick={this.detail} className='gp_all'>
                    <div className="text" ref='text'>
                        <pre className={detail == 'detail'?"text_pre2":"text_pre"}>{this.props.info.content?this.props.info.content:'-'}</pre>
                    </div>
                    
                    <div className={headnoClass1}>
                    	<img src={'/static/future/'+v[this.props.info.guessPass]}/>
                    	<div>{this.formattime(this.props.info.createTime)}</div>
                    </div>
                     
                    <div className={headnoClass} onClick={this.toProduct} >
                    
						<img src={'/static/future/'+v[this.props.info.guessPass]}/>
                       
                        <div className="left clearfix">
                          <p className="content">
                              <strong className="title">{(bigVarietyTypeCode[this.props.info.bigVarietyTypeCode]) +(this.props.info.varietyName?this.props.info.varietyName:'-')}</strong>
                              <strong className={this.props.info.risePrice>0?"ratio colorR":"ratio colorG"} style={{display:'none'}}>{this.props.info.lastPrice?this.props.info.lastPrice:'-'}</strong>
                              <span className="count" style={{display:'none'}}>
                                  <i className={this.props.info.risePrice>0?"float colorR":"float colorG"} >{this.props.info.risePrice?this.props.info.risePrice:''}</i>
                                  <i className={this.props.info.risePrice>0?"profit colorR":"profit colorG"} >{this.props.info.risePre?this.props.info.risePre:''}</i>
                              </span>
                          </p>
                        </div>
                        <div className="pl_time">{this.formattime(this.props.info.createTime)}</div>
                    </div>
                </div>
                <style jsx global>{`
                    html{-webkit-text-size-adjust:none;}
                `}</style>
                <style jsx>{`
					.gp_all{
						padding-left: 0.4rem;
					}
                    .text{
                        line-height: .2rem;
                        height: auto;
                        margin-top: .09rem;
                        text-align: justify;
						color: #222;
					    word-wrap: break-word;
                    }
					
					.text_pre{
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						word-wrap: break-word;
						whitewhite-space: pre-wrap;
						whitewhite-space: -moz-pre-wrap;
						whitewhite-space: -pre-wrap;
						whitewhite-space: -o-pre-wrap;
						word-wrap: break-word;
						white-space: pre-wrap;
					}
					.text_pre2{
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						display: block;
						word-wrap: break-word;
						display: block;
						whitewhite-space: pre-wrap;
						whitewhite-space: -moz-pre-wrap;
						whitewhite-space: -pre-wrap;
						whitewhite-space: -o-pre-wrap;
						word-wrap: break-word;
						white-space: pre-wrap;
					}
                    .text span{
                        display: inline-block;
                        width: .33rem;
                        height: .13rem;
                        margin-right: .08rem;
                    }
                    .text span img{
						width: 0.33rem;
                        display:block;
                        margin-top:.01rem;
                    }
                    .text .flag{
                        display: inline-block;
                        height: .18rem;
                        line-height: .16rem;
                        padding: 0 .06rem;
                        margin-right: .1rem;
                        border-radius: .02rem;
                        font-size: .12rem;
                        text-align: center;
                    }
                    .text .win{
                        color: #cd4a47;
                        border: 1px solid #cd4a47;
                    }
                    .text .loss{
                        color: #33d37d;
                        border: 1px solid #33d37d;
                    }
					.text span{
						color: #999;
					}
					.text .span_show{
						display: inline-block;
					}
					.text .span_hide{
						display: none;
					}
                    .title{
                        position: relative;
                        width: 100%;
                        height:.4rem;
                        margin-top: .1rem;
                        background: #fff;
						border: 1px solid #ddd;
                    }
					.title img{
						width: 0.42rem;
						float: left;
						margin: 0.12rem 0 0 0.1rem;
					}
					.pl_time{
						width: 50%;
						height: 0.2rem;
						color: #999;
						font-size: 0.12rem;
						position: absolute;
						bottom: -0.33rem;
						left: 0;
					}
                    .type{
                        display: inline-block;
                        width: .18rem;
                        padding: .06rem .03rem;
                        line-height: .14rem;
                        background: #869bcb;
                        color:#fff;
                        border-radius: .04rem/.04rem 0 0 .04rem;
                        font-size: .12rem;
                    }
                    .content{
                        width:100%;
                        height: .4rem;
                        line-height: .4rem;
                        padding-left: .09rem
                    }
                    .content .title{
						border: none;
                    }
                    .ratio{ 
                        font-size: .18rem;
                        position: absolute;
                        right: .7rem;
                    }
                    .count{
                        position: absolute;
                        width: .5rem;
                        right: .1rem;
                        font-size: .1rem;
                    }
                    .count i{
                        position: absolute;
                        left:0;
                    }
                    .count .float{
                        top:-.07rem;
                    }
                    .count .profit{
                        margin-top: .02rem;
                        top:.05rem;
                    }
					.notab_hide{
						display: none;
					}
					.head_show{
						display: block;
					}
					.head_hide{
						display: none;
					}
					.head_title img{
						width: 0.4rem;
						margin-right: 0.1rem;
						margin-top: 0.1rem;
						float: left;
					}
					.head_title div{
						color: #999;
						font-size: 0.12rem;
						margin-top: 0.09rem;
						float: left;
					}
                `}</style>
            </div>
        )
    }
}
export default Issure_con;
