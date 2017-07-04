/*
* @Author: Maolin
* @Date:   2017-04-18 15:14:34
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-12 16:28:53
*/
import Router from 'next/router';
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Confirm from '../../common/confirm.js';
import Bigger from './bigger_pic.js';
import $ from 'jquery';



class Userinfo extends React.Component{
    constructor(props) {
        super(props);
        this.state={show:false,bigger:false,type:'',not:true,self:false,land:null}
        this.handler = this.handler.bind(this);
        this.issuer = this.issuer.bind(this);
        this.bigger = this.bigger.bind(this);

    }
    componentDidMount() {
        let userId = this.props.url.query.id;
        let t = this;

        // 用户基本信息
        $.ajax({
          url: '/coterie/userInterest/queryClickUserDetail.do',
          type: 'post',
          data: {userId: userId},
          success:function(d){
            if(d.code == 200){
                t.setState({
                    userName: d.data.userName,
                    userSex: d.data.userSex,
                    certificationStatus: d.data.certificationStatus,
                    userPortrait: d.data.userPortrait,
                    land: d.data.land

                });
            }
          }
        })
        // 关注数，粉丝数
        $.ajax({
          url: '/coterie/userInterest/getStatistics.do',
          type: 'get',
          data: {userId: userId},
          success:function(d){
            if(d.code == 200){
                t.setState({
                    attention: d.data.attention,
                    follower: d.data.follower  
                });
            }
          }
        })

        // 是否屏蔽关注
        $.ajax({
          url: '/coterie/userInterest/findShieldOrFollow.do',
          type: 'get',
          data: {objId: userId},
          success:function(d){
            if(d.code == 200){
                t.setState({
                    follow:d.data.follow?1:0,
                    shield:d.data.shield?1:0,
                    followItem: d.data.follow?'已关注':'+关注',
                    shieldItem: d.data.shield?'已屏蔽':'屏蔽TA',
                    followColor: d.data.follow?'colorR':'colorR'
                });
            }
          }
        })

        // 判断是否是自己
       $.ajax({
          url: '/coterie/userInterest/checkMyself.do',
          type: 'get',
          data: {userId: userId},
          success:function(d){
            if(d.code == 200 &&d.data){
                t.setState({
                    self:true
                });
            }
          }
        })
   }
    // 放大头像
    bigger(){
        this.setState({bigger:!this.state.bigger})
    }
    // 关注/屏蔽
    handler(f,t){
       var that = this; 
       var show =(t == 'follow' && !this.state.follow)?false:!this.state.show;
       this.setState({show:show,type:t});

       var txt = t=='follow'?(this.state.follow?'是否不再关注“'+this.state.userName+'”?':''):(this.state.shield?'是否对“'+this.state.userName+'”解除屏蔽？':'是否对“'+this.state.userName+'”屏蔽?');
       var sub = t=='follow'?'':(this.state.shield?'解除屏蔽之后“'+this.state.userName+'”发表的观点将再次出现在你的经济圈。':'屏蔽之后“'+this.state.userName+'”所有观点都将不再展示在你的经济圈。');

       this.setState({title:txt,content:sub});

       if(!this.state.follow && t == 'follow'){
        var data = {
            status: this.state.follow?1:0,
            followId: this.props.url.query.id
        }
        $.ajax({
            url: '/coterie/userInterest/follow.do',
            type: 'post',
            data: data,
            success:function(d){
                if(d.code == 200){
                    that.setState({
                        follow:that.state.follow?0:1,
                        followItem:'已关注',
                        follower:that.state.follower+1,
                        followColor:that.state.follow?'colorR':'colorR',
                        show:false
                    })
                }else{
                    that.setState({
                        show:true,
                        content: d.msg,
                        not:false
                    })
                }
            }
        })
       }
    }
    canOk(f){
        var that = this;
        var text = {
                'followItem':{0:'已关注',1:'+关注'},
                'shieldItem':{0:'已屏蔽',1:'屏蔽TA'}
        }
        var id = f.type == 'follow' ?'followId':'shieldId',
        url = f.type == 'follow'?'/coterie/userInterest/follow.do':'/coterie/userInterest/shield.do';
        var d = {
            status: f.type == 'follow'?(that.state.follow?1:0):(that.state.shield?1:0),
        }
        d[id] = this.props.url.query.id;
        $.ajax({
            url: url,
            type: 'post',
            data: d,
            success:function(data){
                if(data.code == 200){
                    if(f.type == 'follow'){
                        that.setState({
                                follow:d.status?0:1,
                                followItem:text['followItem'][that.state.follow],
                                follower:d.status?that.state.follower-1:that.state.follower+1,
                                followColor:d.status?'colorR':'colorR'
                            });
                    }else{
                        that.setState({
                                shield:d.status?0:1,
                                shieldItem:text['shieldItem'][that.state.shield]
                        });
                    }
                    that.setState({
                        show:false,
                        content:''
                    });
                }else{
                    that.setState({
                            show:true,
                            title:'提示',
                            content: data.msg,
                            not: false
                    });
                }
            }
        })
    }
    canNot(){
        this.setState({
            not: !this.state.not
        })
    }
    // Ta的发表
    issuer(e){
        Router.push({
          pathname: '/mobi/circle/components/issure',
          query: {userId: this.props.url.query.id,type:this.state.self?'':'TA'}
        })
    }
    render(){
        return (
            <div>
                <Header_title text="用户资料"/>
                <Header text="用户资料"/>
                <section className="wrap">
                    
                    <div className="user-info">
                        <div className="user-left">
                            <img className="user-img" src={this.state.userPortrait?this.state.userPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':"/static/circle/headportrait160x160@3x.png"} onClick={()=>{this.bigger()}}/>
                        </div>
                        <div className="user-right">
                            <p className="user-name">{this.state.userName}<img src={this.state.userSex?(this.state.userSex==1?"/static/circle/user_girl@3x.png":"/static/circle/user_boy@3x.png"):'/static/circle/user_boy@3x.png'}/></p>
                            <p className="user-land">
                            	<span className="user-name-span">{this.state.land?this.state.land:'暂无位置信息'}</span>
                            	<img src={this.state.certificationStatus?'/static/mine/userinformation_certified@2x.png':'/static/mine/userinformation_unauthorized@2x.png'} />
                            </p>
                        </div>
					</div>
					
					<div className="user-fine">
						<div>
							<span className="fine_span1">{this.state.attention}</span>
							<span>关注</span>
						</div>
						<div>
							<span className="fine_span1">{this.state.follower}</span>
							<span>粉丝</span>
						</div>
						<span className="line_top"></span>
						<span className="line_left"></span>
					</div>
			
                </section>
                <ul className="list">
                    <li className="issure" onClick={()=>{this.issuer()}}>{this.state.self?'我的发表':'TA的发表'}</li>
                </ul>
                <footer style={{display:this.state.self?'none':'block'}}>
                    <ul className="footer">
                        <li className={this.state.followColor} onClick={(d,t)=>{this.handler(this,'follow')}} >{this.state.followItem}</li>
                        <li className="shield"  onClick={(d,t)=>{this.handler(this,"shield")}}>{this.state.shieldItem}</li>
                    </ul>
                </footer>
                <Confirm type={2} isNot={(f)=>{this.handler(this.state)}} isOk={(f)=>{this.state.not?this.canOk(this.state):this.canNot()}} confirm={this.state} />
                <Bigger show={this.state.bigger} hand={this.bigger} pic={this.state.userPortrait?this.state.userPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':"/static/circle/headportrait160x160@3x.png"}/>
                <style jsx global>{`
                    html,body{
                        background: #f5f5f5;
                    }
                `}</style>
                <style jsx >{`
                    .wrap{
                        background: #FFF;
                        background-size: cover;
                        padding-top: .12rem;
                    }
                    #header{
                        width: 100%;
                        text-align: center;
                        color: #FFF;
                        position: relative;
                    }
                    #header h3{
                        height:.5rem;
                        line-height: .5rem;
                        margin: 0;
                        font-size:.16rem;
                        font-weight: 400;
                        overflow: hidden;
                    }
                    #header .head_content .left{
                        position: absolute;
                        top: 0;
                        left: 0.2rem;
                    }
                    .user-info{
                        display: flex;
                        display: -webkit-flex;
                        width: 100%;
                        height: 100%;
                        padding: .12rem;
                    }
                    .user-left,.user-right{
                        height: .75rem;
                    }
                    .user-left{
                        flex: 1.2;
                        -webkit-flex: 1.2;
                        margin-right: .15rem;
                    }
                    .user-right{
                        flex: 3.5;
                        color:#fff;
                    }
                    .user-name{
                        position: relative;
                        font-size: .17rem;
                        font-weight: 500;
                        letter-spacing: .01rem;
                        background-size: 8%;
						color: #222;
                    }
                    .user-land{
                        color: #82848A;
                        font-size: .12rem;
                        margin-top: .06rem;
                    }
					.user-land img{
						width: 0.57rem;
						display: block;
						margin-top: 0.05rem;
                    }
                    .user-name img{
						width: 0.18rem;
                        position: absolute;
                        top: .04rem;
                        display: inline-block;
						margin-left: 0.05rem;
						
                    }
                    .user-img{
                        display:inline-block;
                        width: .75rem;
                        height: .75rem;
                        border-radius: 50%;
                        background: #fff;
                    }
                    .user-fine{
						display: flex;
                        margin-top:.12rem;
						text-align: center;
						height: 0.5rem;
						position: relative;
                    }
					.user-fine div{
						flex: 1;
					}
                    .user-fine span{
                        display: block;
						color: #999;
					}
					.user-fine .fine_span1{
						color: #222;
						margin-top: 0.05rem;
					}
					.user-fine .line_top{
						width: 90%;
						height: 1px;
						background: #ddd;
						margin: 0;
						position: absolute;
						left: 5%;
						top: -0.05rem;
					}
					.user-fine .line_left{
						width: 1px;
						height: 0.36rem;
						background: #ddd;
						position: absolute;
						left: 50%;
						top: 0.06rem;
					}
                    .action-flag{
                        margin-left: 0;
                    }
					.list{
						margin-top: 0.15rem;
					}
                    .list li{
                        position:relative;
                        height:.5rem;
                        line-height: .5rem;
                        font-size: .14rem;
                        margin-bottom: .1rem;
                        padding-left: .46rem;
                    }
                    .list li:nth-child(1):after{
                        content: " ";
                        display: inline-block;
                        -webkit-transform: rotate(225deg);
                        transform: rotate(225deg);
                        height: 12px;
                        width: 12px;
                        border-width: 0 0 1px 1px;
                        border-color: #d9d9da;
                        border-style: solid;
                        position: absolute;
                        top: .17rem;
                        right: .2rem;
                    }
                    li.issure{
                        background: url(/static/circle/mine_list_icon_opinion@3x.png) no-repeat .1rem .15rem #fff;
                        background-size: 6%;
                    }
                    li.auth{
                        background: url(/static/circle/userinformation_list_name@3x.png) no-repeat .1rem .24rem #fff;
                        background-size: 6%;
                    }
                    .auth-flag{
                        color: #cbcbcb;
                        position: absolute;
                        right: .1rem;
                        padding-left: .22rem;
                    }
					.sm_img{
						width: 0.16rem;
						position: absolute;
						right: 0.57rem;
						top: 0.27rem;
					}
                    .yes{
                        background: url(/static/circle/popovers_icon_succeed@3x.png) no-repeat left .25rem #fff;
                        background-size: 26%;
                    }
                    .footer{
                        display: flex;
                        display: -webkit-flex;
                        width: 100%;
                        height: .48rem;
                        line-height: .4rem;
                        background: #fff;
                        position: fixed;
                        bottom: 0;
                    }
                    .footer li{
                        flex: 1;
                        -webkit-flex: 1;
                        text-align: center;
                        margin: .05rem 0;
                        letter-spacing: .01rem;
                    }
                    .footer li:nth-child(1){
                        border-right: 1px solid #e7e7e7;
                    }
                    .follow{
                       color: #30d37d;
                    }
                    .unfollow{
                        color: #cf4945;
                    }
					.user-name-span{
						max-width: 2rem;
						display: block;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
                `}</style>
            </div>
        )
    }
}
export default Userinfo;
