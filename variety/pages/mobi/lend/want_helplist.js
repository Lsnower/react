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
        this.state={data:[],show:false,not:true};
        this.choose = this.choose.bind(this);
        this.toPay = this.toPay.bind(this);
        this.canOk = this.canOk.bind(this);
        this.toUserInfo = this.toUserInfo.bind(this);
        this.checkData=null
    }
    componentDidMount(){
        var t = this;
        var type = t.props.url.query.type,id = t.props.url.query.id;

        /*想帮你的人/想帮她的人*/
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
                        code: d.code
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
                show: false
           })
           this.refs.payBtn.className = d[j].check ? 'yes':'no';
        }
        
    }
    toPay(e){
        if(e.target.className.indexOf('yes')>-1){
            this.setState({
                show:true,
                content:'是否选择“'+this.state.userName+'”帮助你并支付意向金？',
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
                        not:false
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
        if(this.state.data.length){
            return(
                <div>
                    <Header_title text={this.props.url.query.type=='ni'?'想帮助你的人':'想帮助TA的人'}/>
                    <Header text={this.props.url.query.type=='ni'?'想帮助你的人':'想帮助'+sex[this.props.url.query.sex]+'的人'}/>
                    <ul>
                        {
                            this.state.data.map((e,i)=>{
                               {e.index = i;} 
                                return(
                                    <li key={i} className={e.check?"info checked_yes":"info"} data-userId={e.check?e.userId:''} onClick={(userId,i)=>this.choose(e.userId,e.index)}>
                                       <img className="img left clearfix" src={e.portrait?e.portrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':"/static/circle/headportrait64x64@3x.png"} onClick={(userId)=>this.toUserInfo(e.userId)}/>
                                        <p>
                                            <span className="name">{e.userName?e.userName:'-'}</span>
                                            <em className="flag" style={{display:'none'}}>已关注</em>
                                        </p>
                                        <p className="location">
                                            <span>{e.location?e.location:'暂无位置信息'}</span>
                                        </p>
                                    </li>
                                )
                            })
                        }
                        
                    </ul>
                    <Confirm type={2} confirm={this.state} isOk={()=>{this.state.not?this.canOk():this.canNot()}}/>
                    <footer style={{display:this.props.url.query.lendType == 'lendin'?'block':'none'}}>
                        <div className="no" ref="payBtn" onClick={(e)=>this.toPay(e)}>支付意向金</div>
                    </footer>
                    <style jsx>{`
                        .info {
                            position: relative;
                            width: 100%;
                            padding: .1rem;
                            border-bottom: 1px solid #e7e7e8;
                            position: relative;
                        }
                        .info p:first-child{
                            padding-top:.01rem;
                        }
                        .info .location{
                            font-size: .12rem;
                            color: #b3b3b3;
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
                            color: #cd4a47;
                            margin: -.1rem .05rem 0 0 ;
                        }
                        .checked_yes{
                            background: url(/static/circle/checkbox_click@3x.png) no-repeat 96% center;
                            background-size: 5%;
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
                    `}</style>
                </div>
            )
        }else{
            return(
                <div>
                    <Header_title text={this.props.url.query.type=='ni'?'想帮助你的人':'想帮助TA的人'}/>
                    <Header text={this.props.url.query.type=='ni'?'想帮助你的人':'想帮助'+sex[this.props.url.query.sex]+'的人'}/>
                    <Text_none text=""/>
                </div>
            )
        }
        
    }
}

export default WantList;
