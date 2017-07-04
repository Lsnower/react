import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Head from '../../common/header/header_left.js';
import Style from '../mine_style.js';
export default class Edite extends Component {
    constructor(props) {
        super(props)
        this.state={
            nohead:false
        };
        this.userXy=this.userXy.bind(this);
        this.aboutDetails=this.aboutDetails.bind(this);
    }
	componentDidMount(){
        if(this.props.url.query.nohead){
            this.setState({
                nohead:true
            })
        }    
	}
    userXy(){
        Router.push({
            pathname:'/mobi/login/user_protocol'
        })
    }
    aboutDetails(){
        Router.push({
            pathname:'/mobi/user/about/about_details'
        })
    }
    render() {
        return (<div>
            <Header_title text="关于我们"/>
                {
                    this.state.nohead?'':<Head text="关于乐米"/>
                }
            <section className="approve_main">
                
                <div className='about_logo'>
                   <img src="/static/mine/Icon-Small-60@2x.png"/>
                   <span>乐米金融v1.0</span> 
                </div>
                <div>
            
            <ul className="mod-list mod-list-sample mine-mod-list last">
                <li className="height" id="tradeAccount" onClick={this.aboutDetails}>
                        <a href="javascript:void(0);" id="tuig">
                            
                            <span>功能介绍</span>
                            <span className="rightBg rightBg1 youjt2"></span>
                            
                        </a>
                </li>
                <li className="height" id="history" onClick={this.userXy} >

                        <a className="test" href="javascript:;">
                            
                            <span>用户协议</span>
                            <span className="rightBg youjt2"></span>
                            
                        </a>
                </li>
                               
            </ul>
            </div>
            
				<div className="bq_bottom"><span>浙江松柏信息技术有限公司</span><span>Copyright©2017</span></div>
                <style jsx global>{`
                    .about_logo{
                        width:100%;
                        height:2rem;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:center;
                        font-size:.15rem;
                    }
                    .about_logo img{
                        display: inline-block;
                        width: .68rem;
                        height: .68rem;
                        border-radius: .1rem;
                        margin-bottom: .1rem;
                    }
					.bq_bottom{
						width: 100%;
						height:.4rem;
						position:fixed;
                        bottom:.1rem;
                        left:0;
                        display:flex;
                        display: -webkit-flex;
                        flex-direction:column;
                        justify-content:space-around;
                        align-items:center;
						
						
					}
                    .bq_bottom span{
                        color:#999999;
                        font-size:.12rem;
                    }
                    .mine-mod-list{ width:100%; height:0.53rem; background:#fff;color:#fff; margin:0.1rem 0; line-height:0.53rem; font-size:0.13rem;}
                    .bottom1{ margin-bottom:0;}
                    .bottom1 li:nth-child(1){border-bottom: 1px solid #252021;}
                    .mine-mod-list a{text-indent:.2rem}
                    .mine-mod-list span{ text-indent:0.13rem;font-size:.15rem;color:#222222;}
                    .mine-mod-list .leftBg{ margin-left:0.17rem;}
                    .mine-mod-list .rightBg{
                         height:.53rem;
                         line-height: .53rem;
                         display:block;
                         font-size:0.15rem;
                         color:#e43022;
                         position: absolute;
                         right: 2%;
                         top:0;
                         text-align: right;
                    }
                    .mine-mod-list .leftBg{ width:0.2rem; height:0.2rem; font-size:0.2rem; display:block; margin-top: 0.17rem;}
                    .last{ width:100%; height:1.06rem;margin-bottom:0.5rem;}
                    .last li{ width:100%; height:0.53rem; line-height: .53rem; position:relative;}
                    .last li:nth-of-type(1){ position:relative;}
                    .last li:after{
                        content: "";
                        display: block;
                        position: absolute;
                        left: -50%;
                        width: 200%;
                        height: 1px;
                        background: #e7e7e8;
                        transform:scale(1);
                        -moz-transform:scale(1);
                        -o-transform:scale(1);
                        -webkit-transform:scale(1);
                    }
                    .last .leftBg1{  width:0.2rem; height:0.2rem; font-size:0.3rem; display:block; position:absolute; left:0; top:0; margin-left:0.17rem; line-height:0.53rem; margin-top: 0.15rem;}
                    .last .rightBg1{}

                    .last1{ margin-bottom:0.93rem;}

                    .height{ width:100%; height:100%;}
                    .height > a{ width:100%; height:100%;position:relative; display:block;}
                    .youjt2:after {
                        content: " ";
                        display: inline-block;
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                        height: 15px;
                        width: 15px;
                        border-width: 1px 1px 0 0;
                        border-color: #95979c;
                        border-style: solid;
                        position: relative;
                        top: -2px;
                        position: absolute;
                        right: 15px;
                        top: 35%;
                    }
                `}</style>
            </section>
			
            </div>
        )
    }
}