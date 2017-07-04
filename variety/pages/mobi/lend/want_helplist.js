/*
* @Author: Maolin
* @Date:   2017-05-15 18:21:35
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-25 10:26:19
*/

import Router from 'next/router';
import Confirm from '../common/confirm.js';
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import Text_none from '../common/text_none.js';

class WantList extends React.Component{
    constructor(props) {
        super(props);
        this.state={data:[],show:false,not:true,chossimg:null,yesmsg:'确认',nomsg:'取消'};
        this.choose = this.choose.bind(this);
        this.toPay = this.toPay.bind(this);
        this.canOk = this.canOk.bind(this);
        this.toUserInfo = this.toUserInfo.bind(this);
        this.checkData=null
    }
    componentDidMount(){
        var t = this;
        var type = t.props.url.query.type,id = t.props.url.query.id;

        /*想帮你的人/想帮她的人1*/
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/intentionCount.do',
            data:{id:id},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        data:d.data
                    });
                }else{
                    t.setState({
                        show:true,
                        content: d.msg,
                        code: d.code,
                        yesmsg: '确认',
                        nomsg: '取消'
                    });
                }
                
            }
        });
    }
    choose(userId,j){
        if(this.props.url.query.lendType == 'lendin'){
            var d = this.state.data;
            for(var i=0;i<d.length;i++){
                d[i].check=j==i?true:false;
            }
           this.setState({
                data:this.state.data,
                userId: d[j].userId,
                userName: d[j].userName,
                show: false,
                chossimg: d[j].portrait?d[j].portrait+'?x-oss-process=image/resize,m_fill,h_1000,w_200':'/static/circle/headportrait64x64@3x.png'
           })
           this.refs.payBtn.className = d[j].check ? 'yes':'no';
        }
        
    }
    toPay(e){
        var c = this.state.chossimg;
        if(e.target.className.indexOf('yes')>-1){
            this.setState({
                show:true,
                yesmsg: '同意',
                nomsg: '取消',
                content:'是否选择“'+this.state.userName+'”并支付意向金？',
                title:<div><img src={this.state.chossimg}/><span>{this.state.userName}</span></div>
                
            })
        }
        
    }
    canNot(){
        this.setState({
            not: !this.state.not,
            show: !this.state.show
        })
    }
    canOk(){
        var t = this;
        t.setState({show:false})
        //点击确定之后选择好心人
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/selected.do',
            data:{selectedId:t.state.userId,id:t.props.url.query.id},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    Router.push({
                        pathname:'/mobi/lend/pay',
                        query:{id:t.props.url.query.id}
                    })
                }else{
                    t.setState({
                        show:true,
                        content: d.msg,
                        code: d.code,
                        not:false,
                        yesmsg: '确定',
                        nomsg: '取消'
                    });
                }
                
            }
        });
        
    }
    toUserInfo(userId){
        Router.push({
            pathname:'/mobi/user/circle_user/userInfo',
            query:{id:userId}
        })
    }
    render(){
        var sex=['他','她','他'];
        var lendhas = this.props.url.query.lendType;
        var selUserId = this.props.url.query.selUserId,a=false;
        
        if(this.state.data.length){
            return(
                <div>
                    <Header_title text={this.props.url.query.type=='ni'?'好心人':'好心人'}/>
                    <Header text={this.props.url.query.type=='ni'?'好心人':'好心人'}/>
            <ul style={{'background':'#fff','paddingBottom':'0.6rem'}}>
                
                        {
                            this.state.data.map((e,i)=>{
                                var lends = e.location;
                                if(selUserId){
                                    if(selUserId == e.userId){
                                        a = true;
                                    }else{
                                        a = false
                                    }
                                }
                                var lendArray; 
                                if(lends){
                                    lendArray = (lends.split('-'))[1]+' '+(lends.split('-'))[2];
                                }else{
                                    lendArray = '暂无定位信息';
                                }
                               {e.index = i;} 
                                return(
                                    <li key={i} className={lendhas == 'lendin'? (e.check?"info checked_yes":"info checked_no"): (a ? "info checked_yes" : 'info') } data-userId={e.check?e.userId:''} onClick={lendhas == 'lendin' ? (userId,i)=>this.choose(e.userId,e.index) : (userId)=>this.toUserInfo(e.userId)}>
                                        <div className="help_left">
                                       <img className="img left clearfix" src={e.portrait?e.portrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':"/static/circle/headportrait64x64@3x.png"} onClick={(userId)=>this.toUserInfo(e.userId)}/>
                                        
                                            <p>
                                                <span className="name" onClick={(userId)=>this.toUserInfo(e.userId)}>{e.userName?e.userName:'-'}</span>
                                                <em className="flag" style={{display:'none'}}>已关注</em>
                                            </p>
                                            <p className="location">
                                                <span>{lendArray}</span>
                                            </p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        
                    </ul>
                    <Confirm type={2} yes={this.state.yesmsg} no={this.state.nomsg} confirm={this.state} isOk={()=>{this.state.not?this.canOk():this.canNot()}}/>
                    <footer style={{display:this.props.url.query.lendType == 'lendin'?'block':'none'}}>
                        <div className="no" ref="payBtn" onClick={(e)=>this.toPay(e)}>支付意向金</div>
                    </footer>
                    <style jsx global>{`
                        body{
                            background:#fff;
                        }
                        .title{
                            color:#222222 !important;
                        }
                        .title img{
                            width:0.6rem;
                            height:0.6rem;
                            border-radius:50%;
                        }
                        .title span{
                            display: block;
                        }
                        .sub-title{
                            padding-top:0.1rem !important;
                            color:#999999 !important;
                            font-size:0.12rem;
                        }
                    `}</style>
                    <style jsx>{`
                        
                        .info {
                            position: relative;
                            width: 100%;
                            padding: .1rem;
                            border-bottom: 1px solid #e7e7e8;
                            position: relative;
                            overflow: hidden;
                        }
                        .info p:first-child{
                            padding-top:.01rem;
                        }
                        .info .location{
                            font-size: .1rem;
                            color: #999999;
                            line-height:0.2rem;
                        }
                        .img {
                            display: inline-block;
                            width: .33rem;
                            height: .33rem;
                            border-radius: 50%;
                            margin-right: .09rem;
                        }
                        .name {
                            display: inline-block;
                            font-size: .16rem;
                            color: #222222;
                            margin: -.1rem .05rem 0 0 ;
                        }
                        .checked_yes{
                            background: url(/static/help/checkbox_click@2x.png) no-repeat 96% center;
                            background-size: 6%;
                        }
                        .checked_no{
                            background: url(/static/help/checkbox_click_uncheck@2x.png) no-repeat 96% center;
                            background-size: 6%;
                        }
                        footer div{
                            width: 100%;
                            height: .45rem;
                            line-height: .45rem;
                            text-align: center;
                            color: #fff;
                            font-size: .16rem;
                            position: fixed;
                            bottom: 0;
                            border-top: .01rem solid #e9e9e9;
                            z-index: 10;
                        }
                        footer div.no{
                            background: #82848a;
                        }
                        footer div.yes{
                            background: #cd4a47;
                        }
                        .help_left{
                            width:80%;
                            float: left;
                        }
                    `}</style>
                </div>
            )
        }else{
            return(
                <div>
                    <Header_title text='好心人'/>
                    <Header text='好心人'/>
                    <Text_none text=""/>
                </div>
            )
        }
        
    }
}

export default WantList;
