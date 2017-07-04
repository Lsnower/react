/*
* @Author: Maolin
* @Date:   2017-05-08 16:21:43
* @Last Modified by:   Maolin

* @Last Modified time: 2017-05-24 18:25:55
*/
import Router from 'next/router';
import Confirm from '../common/confirm.js';
class LendUserInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state={time:null,confirm:{show:false,content:''},info:props.user,self:false};
        this.handler = this.handler.bind(this);
        this.detail = this.detail.bind(this);
    }
    componentDidMount(){
        var t = this;
        var d = localStorage.getItem('userid');;
        var m = t.props.user.userId;
        // 判断是否是自己d
        if(d == m){
            t.setState({
                self:true
            });
        }
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
        if(this.props.query !== 'detail'){
            var t = this,
            id = isNaN(t.props.user.id)?t.props.user.dataId:t.props.user.id,
            userId = t.props.user.userId,
            lendType = t.props.lendType,
            way = t.props.way;
            Router.push({
              pathname: '/mobi/lend/lend_detail',
              query: {id:id,userId:userId,type:'detail',lendType:lendType,way:way}
            })
        }
    }
    handler(e){
		e.stopPropagation();
        if(this.props.isLogin){
            Router.push({
              pathname: '/mobi/user/circle_user/userInfo',
              query: { id: this.state.info.userId }
            })
        }else{
            this.setState({
                confirm:{
                    show:true,
                    content:'您未登录，请重新登录'
                }
            })
        }
        event.stopPropagation(); 
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
		var Img_src = this.props.user.portrait ? this.state.info.portrait : this.state.info.userPortrait;
        var c = this.props.user.isAttention == '2' ? '已关注' : '';
        var d,f,p,q,m,n,o,z,j,k,g;
        d = this.props.user.status;
        f = this.state.self;
         //1未审核(等待互助)、 2审核未通过(等待互助)、 3审核成功 4借款失败（41、无人帮助42、没有选择43、撤销）。 5确认接受帮助 6 支付意向金 7借款成功（用户在前台点击完成借款） 8 还款成功 9还款逾期
        //1 等待互助
        //2 等待互助
        
        //3 等待互助    发布人显示     已提交   好心人显示
        //5 等待互助    发布人显示     已提交   好心人显示
        //6 等待互助    发布人显示     已提交   好心人显示
        
        //7 发布人显示  已借入 20天    好心人   已借出XX
        //9 发布人显示  已借入 逾期    好心人   已借出 逾期
        
        //4  41 42 43 已结束
        //8 已结束
        m = this.props.user.confirmTime;
        n = this.props.user.createDate;
        o = this.props.user.confirmDays=='0'||this.props.user.confirmDays!=''?this.props.user.confirmDays:'';
        j = this.props.user.selectedUserId ? this.props.user.selectedUserId : '';
        k = this.props.userid;
        g = this.props.user.isIntention;
        if(d){
            if(f){
                
                if(d == '3' || d == '5' || d == '6' || d == '1' || d == '2'){
                    p = '等待互助'
                }else if(d == '4' || d == '41' || d == '42' || d == '43' || d == '8'){
                    p = '已结束';
                    z = 'hasno';
                }else if(d == '7'){
                    
                    p = '已借入 '+ o +'天'
                }else if(d == '9'){
                    p = '已借入 逾期'
                }
                
            }else{
                if(g == '1' || g == '0'){
                    if(d == '3' || d == '5' || d == '6'){
                        p = ''
                    }
                    else if(d == '1' || d == '2'){
                        p = '等待互助'
                        z = 'hasno';
                    }else if(d == '4' || d == '41' || d == '42' || d == '43' || d == '8'){
                        p = '已结束';
                        z = 'hasno';
                    }
                }else if(g == '2'){
                    if(d == '3' || d == '5' || d == '6' || d == '1' || d == '2'){
                        if(this.props.urltype){
                            p = ''
                        }else{
                            p = '已提交'
                        }
                    }else if(d == '7'){
                        if(k!=j){
                            p = '';
                            z = 'hasno';
                        }else{
                            p = '已借出 '+ o +'天'
                        }
                    }else if(d == '9'){
                        if(k!=j){
                            p = '';
                            z = 'hasno';
                        }else{
                            p = '已借出 逾期'
                        }

                    }else if(d == '4' || d == '41' || d == '42' || d == '8'){
                        p = '已结束';
                        z = 'hasno';
                    }else if(d == '43'){
                        p = '';
                        z = 'hasno';
                    }
                }
            }
        }else{
             p = ''
        }
        return(
            <div>
                <div className="lend_usermsg" onClick={this.detail}>
                    <img onClick={this.handler} src={Img_src?(Img_src)+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png'}/>
                    <span onClick={this.handler}>{this.state.info.userName}</span>
                    <b onClick={this.handler} style={{'fontSize':'0.12rem','color':'#b6b6b6'}}>{c}</b>
                    <strong className={z}>{p}</strong>
                </div>
                
                <Confirm type={1} confirm={this.state.confirm} isOk={ ()=>Router.push({pathname: '/login'}) } isNot={()=>this.isNotcick()}  />
                <style jsx>{`
                    .lend_usermsg{
                        height:0.32rem;
                        width:100%;
                    }
                    .hasno{
                        color:#999 !important;
                    }
                    .lend_usermsg img{
                        width:0.32rem;
                        height:0.32rem;
                        border-radius:50%;
                        display: block;
                        float: left;
                    }
                    .lend_usermsg span{
                        display: inline-block;
                        height:100%;
                        line-height:0.32rem;
                        font-size:0.16rem;
                        margin:0 0.05rem 0 0.1rem;
                    }
                    .lend_usermsg strong{
                        float: right;
                        height:100%;
                        line-height:0.32rem;
                        font-size:0.12rem;
                        color:#cd4a47;;
                    }
                `}</style>
            </div>
        )
    }
}

export default LendUserInfo;
