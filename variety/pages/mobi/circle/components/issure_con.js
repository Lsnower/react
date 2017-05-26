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

    detail(e){
        var t = this,
            viewpointId = t.props.circle?t.props.info.dataId:t.props.info.id;
        Router.push({
          pathname: '/mobi/circle/components/service_detail',
          query: {viewpointId:viewpointId,type:'detail'}
        })
    }
    toProduct(event){
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
    render(){
        var bigVarietyTypeCode = {'future':'期货','forex':'外汇','stock':'股票'};
        var detail =this.props.url? this.props.url.query.type:false;
        var ihigh = ['opinion_up.png','opinion_up_succeed.png','opinion_up_fail.png'],
                ilow = ['opinion_down.png','opinion_down_succeed.png','opinion_down_fail.png'];
        var v = this.props.info.direction?ihigh:ilow;
        return(
            <div>
                <div onClick={this.detail}>
                    <div className="text">
                        <span>
                            <img src={'/static/future/'+v[this.props.info.guessPass]}/>
                        </span>
                        {this.props.info.content?(detail == 'detail'?this.props.info.content:(this.props.info.content.length>23?(this.props.info.content).substring(0,40)+'...':this.props.info.content)):'-'}
                    </div>
                    <div className="title" onClick={this.toProduct}>
                        <p className="left clearfix type">{bigVarietyTypeCode[this.props.info.bigVarietyTypeCode]}</p>
                        <div className="left clearfix">
                          <p className="content">
                              <strong className="title">{this.props.info.varietyName?this.props.info.varietyName:'-'}</strong>
                              <strong className={this.props.info.risePrice>0?"ratio colorR":"ratio colorG"} style={{display:'none'}}>{this.props.info.lastPrice?this.props.info.lastPrice:'-'}</strong>
                              <span className="count" style={{display:'none'}}>
                                  <i className={this.props.info.risePrice>0?"float colorR":"float colorG"} >{this.props.info.risePrice?this.props.info.risePrice:''}</i>
                                  <i className={this.props.info.risePrice>0?"profit colorR":"profit colorG"} >{this.props.info.risePre?this.props.info.risePre:''}</i>
                              </span>
                          </p>
                        </div>
                    </div>
                </div>
                <style jsx global>{`
                    html{-webkit-text-size-adjust:none;}
                `}</style>
                <style jsx>{`
                    .text{
                        line-height: .2rem;
                        height: auto;
                        margin-top: .09rem;
                        text-align: justify;
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
                    .title{
                        position: relative;
                        width: 100%;
                        height:.4rem;
                        margin-top: .1rem;
                        background: #f0f0f0;
                        border-radius:.04rem;
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
                        font-size: .16rem;
                        letter-spacing: .01rem;
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
                `}</style>
            </div>
        )
    }
}
export default Issure_con;
