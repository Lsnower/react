import React from 'react'
import Link from 'next/link'
import Router from 'next/router';
import $ from 'jquery'
import Indexstyle from './mobi/index/style.js';
import Header_title from './mobi/common/header/header_title.js';
import Header from './mobi/common/header/header_noleft.js';
import Footer from './mobi/common/footer.js';
import Confirm from './mobi/common/confirm.js';

class Indextop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endInow: 1,
            showId : 0,
            startX: 0,
            endX: 0
        };
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.goPlay = this.goPlay.bind(this);
    }
    componentDidMount(){
        this.goPlay();
    }
    componentWillUnmount(){
        this.pausePlay()
    }
    goPlay(move_iNow) {
        
        var l = 0;
        var iNow = move_iNow || this.state.endInow;
        
        this.autoPlayFlag = setInterval(() => {
            l = this.leftMove(iNow)
            iNow < l ? iNow++ : iNow = 1;
        }, 5000);
        
        this.setState({showId : move_iNow});
        
    }
    pausePlay() {
        clearInterval(this.autoPlayFlag);
    }
    leftMove(iNow){
        
        var allLi = this.refs;
        
        var l = this.props.data.length;
        var toMove_iNow = 0
        
        if(l>1){
            
            $(allLi[iNow]).stop().animate({left: "-100%"});
            if( (iNow+1) > l ){
                $(allLi[1]).css({left: "100%"});
                $(allLi[1]).stop().animate({left: "0%"});
                toMove_iNow = 1
            }
            else{
                $(allLi[iNow+1]).css({left: "100%"});
                $(allLi[iNow+1]).stop().animate({left: "0%"});
                toMove_iNow = iNow+1
            }

            var spot = $(this.refs.spot).find('span');
            spot.removeClass('curr')
            spot.eq(toMove_iNow-1).addClass('curr')
            return toMove_iNow
            
        }
    }
    rightMove(typeNow){
        
        var allLi = this.refs;
        var l = this.props.data.length;
        var move_iNow = 0;
        
        if(l>1){
            $(allLi[typeNow]).stop().animate({left: "100%"});
            if( (typeNow - 1) < 1 ){
                $(allLi[l]).css({left: "-100%"});
                $(allLi[l]).stop().animate({left: "0%"});
                move_iNow = l
            }
            else{
                $(allLi[typeNow-1]).css({left: "-100%"});
                $(allLi[typeNow-1]).stop().animate({left: "0%"});
                move_iNow = typeNow - 1
            }
            
            var spot = $(this.refs.spot).find('span');
            spot.removeClass('curr')
            spot.eq(move_iNow-1).addClass('curr');
            
            return move_iNow
        }
        
    }
    handleTouchStart(e){
        
        this.pausePlay()
        
        this.setState({
            startX: e.changedTouches[0].pageX
        });
        
    }
    handleTouchMove(e){
        this.setState({
            endX: e.changedTouches[0].pageX
        })
    }
    handleTouchEnd(e){
        this.setState({
            endX: e.changedTouches[0].pageX
        });
        
        var typeNow = parseFloat(e.target.getAttribute('type'));
        var pageStart = this.state.startX;
        var pageEnd = this.state.endX;
        var move_iNow = 0;
        
        if( (pageStart - pageEnd) > 50){
            move_iNow = this.leftMove(typeNow)
        }
        else if( (pageEnd - pageStart) > 50){
            move_iNow = this.rightMove(typeNow)
        }
        this.goPlay(move_iNow)
        
    }
    render() {
		
        return <div className='index_top mod-carousel'>
       
                <ul className="clearfix">
                
                    {
                        this.props.data.map((e,i) => {
                            
                            var iNow = i+1;
                            e.style=='html' ? e.url ='/mobi/common/article?id='+e.id+'&myUrl=1' : e.url =e.content;
                            
                            return(
                                <li onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} ref={iNow} key={i}>
                                    <Link href={e.url}>
                                        <a><img type={iNow} src={e.cover} /></a>
                                    </Link>

                                </li>
                            )

                        })
                    }
            
                </ul>
                
                <div className="clearfix carousel-div" ref="spot">
                    {
                        this.props.data.length>1 ? this.props.data.map((e,i) => {
                            if(i == 0){
                                return (<span key={i} className="dot curr"></span>)
                            }
                            else{
                                return (<span key={i} className="dot"></span>)
                            }
                        }) : ''
                    }
                </div> 
                
              </div>;
    }
}


class Indexnav extends React.Component {
	constructor(props){
        super(props)
        this.state = {
			confirm:{
                show:false,
                content:'',
            }
        }
    }
    isLogin(url){
		
		$.ajax({
            type:'post',
            url:'/user/user/findUserInfo.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    Router.push({
					  pathname: url
					})
                }
				else{
					this.setState({
						confirm:{
							show:true,
							content:d.msg
						}
					});
				}
                
            }.bind(this)
        });
		
        
    }
    render() {
       return <div className="indexnav">
            <div className="indexnav_tab">
            
                <Link href={'/mobi/future/futures'}><a>
                    <div className="icon_div icon_qh"></div>
                    <div>期货</div>
                </a></Link>
                
            </div>
            
            <div className="indexnav_tab">
            
                <Link href={'/mobi/stock/stock'}><a>
                    <div className="icon_div icon_gp"></div>
                    <div>股票</div>
                </a></Link>
                
            </div>
            
            <div className="indexnav_tab">
            
                <a onClick={()=>{this.isLogin('/mobi/mutual/borrow')}}>
                    <div className="icon_div icon_hz"></div>
                    <div>互助</div>
                </a>
                
            </div>
            
            <div className="indexnav_tab">
                
                <a onClick={()=>{this.isLogin('/mobi/index/optional/optional')}}>
                    <div className="icon_div icon_zx"></div>
                    <div>自选</div>
                </a>
                
            </div>
            
            <span className="bottom_line"></span>
            
            <Confirm type='2' confirm={this.state.confirm} isOk={ ()=>Router.push({pathname: '/login'}) }/>
            
        </div>;
    }
}

class Indexbig extends React.Component {
	
    render() {
        return <Link href={'/mobi/index/bigevent/bigevent'}><a className="big_href">
			<div className="indexbig clear">

				<div className="big_left">
					<div className="big_img">大事件</div>
				</div>

				<ul className="big_right">

					<li>{this.props.data}</li>

				</ul>

				<span className="clear_span"></span>
				<span className="bottom_line"></span>
			</div>
        </a></Link>;
    }
}

class Indexloan extends React.Component {
    
    render() {
        return <div className="indexloan clear">
        
            <ul>
                
                <li>
                    <Link href={'/mobi/lend/lend'}><a>
                    
                        <div className="loan_left">
                            <div className="loan_div loan_jkyd"></div>
                        </div>
                        
                        <div className="loan_con">
                            <h2>借款有道</h2>
                            <p>帮助他人，赚些小慧</p>
                        </div>
                        
                        <div className="loan_right arrow">
                            <span className="arrow_top"></span>
                            <span className="arrow_bottom"></span>
                        </div>
                        
                    </a></Link>
                
                    <span className="bottom_line"></span>
                    
                </li>
                
                <li>
                    <Link href={'/mobi/future/view'}><a>
                    
                        <div className="loan_left">
                            <div className="loan_div loan_gdds"></div>
                        </div>
                        
                        <div className="loan_con">
                            <h2>观点大神</h2>
                            <p>眼光准，跟着做准没错</p>
                        </div>
                        
                        <div className="loan_right arrow">
                            <span className="arrow_top"></span>
                            <span className="arrow_bottom"></span>
                        </div>
                        
                    </a></Link>
                
                    <span className="bottom_line"></span>
                    
                </li>
                
            </ul>
            
            <span className="clear_span"></span>
            
        </div>;
    }
}

class Indexbottom extends React.Component {
    
    render() {
        
        return <div className="indexbottom clear">
           
            <div className="indexbottom_text">推荐</div>
            
            <div className="bottom_content clear">
                {
                    this.props.data.map((e,i) => {
                        var myImg = e.backgroundImg ? e.backgroundImg : '/static/index_img/pic.png';
						
                        return(
                            <div key={i} className="bottom_allc">
                                <Link href={'/mobi/index/special/special?a='+e.id}><a className="bottom_allc_a">

                                    <div className="index_mask_all">
                                        <img src={myImg}/>
                                    </div>
									<div className="index_mask_all1">
										<h3>{e.title}</h3>
                                        <p>{e.subTitle}</p>
									</div>
                               
                                </a></Link>

                            </div>
                        )

                    })
                }
                
                <span className="clear_span"></span>
                
            </div>
            
            
            
            <span className="clear_span"></span>
            
        </div>;
    }
}

class Indexcontent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dataTop : [],
            dataBottom : [],
			dataBig : ''
        };
    }
    componentDidMount(){
	
        $.ajax({
            type:'post',
            url:'/user/news/findBannerList.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    this.setState({
						dataTop : d.data
					});
                }
                
            }.bind(this)
        });
		
		$.ajax({
            type:'post',
            url:'/coterie/subject/find.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    this.setState({
						dataBottom : d.data
					});
                }
                
            }.bind(this)
        });
		
		$.ajax({
            type:'get',
            url:'/user/breakingNews/findOneTitle.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    this.setState({
						dataBig : d.data
					});
                }
                
            }.bind(this)
        });
		
    }
    render() {
        return <div className="indexcontent">
           
            <Indextop data={this.state.dataTop} />
            <Indexnav />
            <Indexbig data={this.state.dataBig} />
            <Indexloan />
            <Indexbottom data={this.state.dataBottom} />
            
        </div>;
    }
}

export default  class IndexAll extends React.Component {
    
    render() {
		
        return <div>
           
            <Header_title text="乐米"/>
            <Header  text="乐米"/>
            <Indexstyle />
            <Indexcontent />
            <Footer active="index" />
            <script src="https://s22.cnzz.com/z_stat.php?id=1261979090&web_id=1261979090" language="JavaScript"></script>
            
        </div>
    }
}
