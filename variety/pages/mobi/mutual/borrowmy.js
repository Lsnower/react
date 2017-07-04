import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Router from 'next/router'
import Link from 'next/link'
import Text_none from '../common/text_none.js'
import Lend from '../lend/lend.js'
import MyLend from '../lend/myLend.js'
class Borrow extends React.Component{
	constructor(props){
        super(props)
    }
    componentDidMount(){
        let that = this;
        var longmsg={
            money:null,
            interest:null,
            days:null,
            content:null
        }
        localStorage.setItem('landmsg',JSON.stringify(longmsg));
        localStorage.setItem('sdborrowlands','');
    }
    render(){
        return(
            <div>
            	<ul className="borrow_list" ref="borrow_list">
                    <li>
                        <Link href="/mobi/mutual/borrow">
                            <a href="javascript:;;">借款有道</a>
                        </Link>
                    </li>
                    <li className="active"><a href="javascript:;;">我的借款</a></li>
                </ul>
                <section>
                <MyLend/>
                </section>
            </div>
        )
    }
}
export default  class  Future extends React.Component {
	constructor(props){
        super(props)
        this.announce = this.announce.bind(this);
    }
    announce(){
        Router.push({
            pathname:'/mobi/mutual/toborrow',
            query:{
                lendslink:'2'
            }
        })
    }
	render(){
		return <div>
			
			<Header_title text='互助借款'/>
            <Head path="/" text="互助借款" />
			<Borrow/>
            <div className="myannounce" onClick={()=>{this.announce()}}>我要发布</div>
			<style>{`
				body{
					background: #efefef;	
				}
                ul.borrow_list{
                    background:#ffffff;
                    box-shadow:0 0 0 0 #dddddd;
                    width:100%;
                    height:0.44rem;
                }
                .borrow_list li{
                    width:50%;
                    float: left;
                    height:100%;
                    line-height:0.44rem;
                    text-align: center;
                    color:#666666;
                    font-size: 0.15rem;
                }
                .borrow_list li a{
                    display: inline-block;
                    height:100%;
                    width:100%;
                    position:relative;
                }
                li.active{
                    color:#222222;
                }
                li.active a:after {
                    content: "";
                    display: block;
                    position: absolute;
                    left: 50%;
                    width: 0.48rem;
                    height: 2px;
					margin-left: -0.24rem;
                    background: #222222;
                    -webkit-transform: scale(1);
                    -ms-transform: scale(1);
                    transform: scale(1);
                    -moz-transform: scale(1);
                    -o-transform: scale(1);
                    -webkit-transform: scale(1);
                    bottom:0;
                }
                .myannounce{
                    position: fixed;
                    bottom:0;
                    width:100%;
                    height:0.49rem;
                    background:#cd4a47;
                    line-height:0.49rem;
                    text-align: center;
                    color:#fff;
                    font-size:0.15rem;
                }
            `}</style>
		</div>
	}
}
