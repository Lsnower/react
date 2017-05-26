/*
* @Author: Maolin
* @Date:   2017-04-18 10:29:35
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-24 19:17:48
*/
import Router from 'next/router';
import Confirm from '../../common/confirm.js';
class Userinfo extends React.Component{
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
    
    handler(e,page){
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
                <div className="info">
                   <img className="img left clearfix" src={this.props.user.userPortrait?this.props.user.userPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':"/static/circle/headportrait64x64@3x.png"} onClick={()=>{this.handler(this.props.user.userId,this.props.user.viewPage)}}/>
                    <p>
                        <span className="name">{this.props.user.userName}</span>
                        <em className="flag">{this.props.user.isAttention == 2?'已关注':''}</em>
                        <em className="flag time">{this.formattime(this.props.user.createTime)}</em>
                    </p>
                    <Confirm type={1} confirm={this.state.confirm} isOk={ ()=>Router.push({pathname: '/login'}) } isNot={()=>this.isNotcick()} />
                </div>
                <style jsx>{`
                    .info {
                        position: relative;
                        height: .33rem;
                        line-height: .33rem;
                    }
                    .info p {
                        display: inline-block;
                    }
                    .img {
                        display: inline-block;
                        width: .33rem;
                        height: .33rem;
                        border-radius: 50%;
                        margin-right: .09rem;
                    }
                    .name {
                        font-size: .16rem;
                        color: #cd4a47;
                        margin-right: .05rem;
                    }
                    .flag {
                        font-size: .12rem;
                        color: #b6b6b6;
                    }
                    .time {
                        position: absolute;
                        right: 0;
                    }
                `}</style>
            </div>
        )
    }
}

export default Userinfo;
