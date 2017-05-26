/*
* @Author: Maolin
* @Date:   2017-05-08 16:21:43
* @Last Modified by:   Maolin

* @Last Modified time: 2017-05-24 18:25:55
*/
import Router from 'next/router';
import Confirm from '../common/confirm.js';

class GetTime extends React.Component{
    constructor(props) {
        super(props);
        this.formattime = this.formattime.bind(this);
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
    render(){
        if(this.props.time.query == 'detail'){
            //借出： 借出时间和借出详情为发起意向时间
            if(this.props.time.lendType == 'lendout'){
                return(
                    <div>
                        <em className="flag time">{this.props.time.query == 'detail'?(this.props.time.user.intentionTime?this.formattime(this.props.time.user.intentionTime):'-'):'-'}</em>
                    <style jsx>{`
                        .flag {
                            font-size: .12rem;
                            color: #b6b6b6;
                        }
                        .time {
                            position: absolute;
                            right: 0;
                            top: .05rem;
                        }
                    `}</style>
                    </div>
                )
            }else{
                if(this.props.time.lendType == 'lendin'){
                    //借入： 我的借入和借入详情都是发布时间
                    return(
                        <div>
                            <em className="flag time">{this.props.time.query == 'detail'?(this.props.time.user.createDate?this.formattime(this.props.time.user.createDate):'-'):(this.props.time.user.createTime?this.formattime(this.props.time.user.createTime):'-')}</em>
                        <style jsx>{`
                            .flag {
                                font-size: .12rem;
                                color: #b6b6b6;
                            }
                            .time {
                                position: absolute;
                                right: 0;
                                top: .05rem;
                            }
                        `}</style>
                        </div>
                    )
                }else{
                    //借款有道： 借款有道用户信息
                    return (
                        <div>
                            <em className="flag time">{this.props.time.user.auditTime?this.formattime(this.props.time.user.auditTime):'-'}</em>
                        <style jsx>{`
                            .flag {
                                font-size: .12rem;
                                color: #b6b6b6;
                            }
                            .time {
                                position: absolute;
                                right: 0;
                                top: .05rem;
                            }
                        `}</style>
                        </div>
                    )
                }
            }

            
        }else{
            return(
                <div>
                    <em className="flag time">{this.props.time.user.auditTime?this.formattime(this.props.time.user.auditTime):'-'}</em>
                <style jsx>{`
                    .flag {
                        font-size: .12rem;
                        color: #b6b6b6;
                    }
                    .time {
                        position: absolute;
                        right: 0;
                        top: .05rem;
                    }
                `}</style>
                </div>
            )
        }
        
    }
}

class LendUserInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state={time:null,confirm:{show:false,content:''}};
        this.handler = this.handler.bind(this);
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
    
    handler(e){
        if(this.props.isLogin){
            Router.push({
              pathname: '/mobi/user/circle_user/userInfo',
              query: { id: e }
            })
        }else{
            this.setState({
                confirm:{
                    show:true,
                    content:'您未登录，请重新登录'
                }
            })
        }
            
    }
   isNotcick(){
		this.setState({
			confirm:{
				show:false,
				content:'您未登录，请重新登录'
			}
		})
	}
    render(){
        return(
            <div>
                <div className="info" >
                   <img className="img left clearfix" src={this.props.query == 'detail'?(this.props.user.portrait?this.props.user.portrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':"/static/circle/headportrait64x64@3x.png"):(this.props.user.userPortrait?this.props.user.userPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':"/static/circle/headportrait64x64@3x.png")} onClick={()=>{this.handler(this.props.user.userId)}}/>
                    <p>
                        <span className="name">{this.props.user.userName?this.props.user.userName:'-'}</span>
                        <em className="flag">{this.props.user.isAttention == 2?'已关注':''}</em>
                        <GetTime time={this.props} />
                    </p>
                    <p className="location"><span>{(this.props.user.land || this.props.user.location)?(this.props.user.land || this.props.user.location):'暂无位置信息'}</span></p>
                    <Confirm type={1} confirm={this.state.confirm} isOk={ ()=>Router.push({pathname: '/login'}) } isNot={()=>this.isNotcick()}  />
                </div>
                <style jsx>{`
                    .info {
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
                    .flag {
                        font-size: .12rem;
                        color: #b6b6b6;
                    }
                    .time {
                        position: absolute;
                        right: 0;
                        top: .05rem;
                    }
                `}</style>
            </div>
        )
    }
}

export default LendUserInfo;
