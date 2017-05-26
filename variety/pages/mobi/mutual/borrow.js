import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Router from 'next/router'
import Link from 'next/link'
import Text_none from '../common/text_none.js'

class Borrow extends React.Component{
	constructor(props){
        super(props)
    }
    render(){
        return(
            <div className={'huzhu'}>
            	<div className='myborrow'>
	            	<Link href={'/mobi/lend/myLend'}>
		            	<a>	                    
		                    <div>我的借入<span className="youjt2"></span></div>
		                </a>
	                </Link>
                </div>
                <div className='myborrow'>
	            	<Link href={'/mobi/lend/lendout'}>
		            	<a>	                    
		                    <div>我的借出<span className="youjt2"></span></div>
		                </a>
	                </Link>
                </div>
                <div className='toborrow'>
	            	<Link href={'/mobi/mutual/toborrow'}>
		            	<a>	                    
		                    <div>我要借款</div>
		                </a>
	                </Link>
                </div>
            </div>
        )
    }
}
export default  class  Future extends React.Component {
	constructor(props){
        super(props)
    }
	render(){
		return <div>
			
			<Header_title text='乐米互助'/>
            <Head text="互助" />
			<Borrow/>
			<style>{`
				body{
					background: #efefef;
					
				}
                .myborrow,.mylender{
                	width:100%;
                	height:.5rem;
                	line-height:.5rem;
                	background-color:#fff;
                	border-top:.01rem solid #f0efef;
                	text-indent:.2rem;
                	font-size:.16rem;
                	position:relative;
                }
                .myborrow span,.myLend span{
                	height: .53rem;
				    line-height: .53rem;
				    display: block;
				    font-size: 0.15rem;
				    color: #e43022;
				    position: absolute;
				    right: 2%;
				    top: 0;
				    text-align: right;
				    z-index:2;
                }
                .youjt2:after{
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
                .myLend .youjt2:after{
                	position: absolute;
					    right: 25px;
					    top: 35%;
                }
                div .toborrow{
                	width:90%;
                	margin:.5rem 5% 0 5%;
                	line-height:.5rem;
                	background-color:#cd4a47;
                	border-top:.01rem solid #f0efef;
                	text-align:center;
                	font-size:.16rem;
                	color:#fff;
                	border-radius:.05rem;
                }
            `}</style>
		</div>
	}
}
