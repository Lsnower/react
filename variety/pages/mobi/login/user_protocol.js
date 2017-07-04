import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Router from 'next/router'

class Protocol extends React.Component{
	constructor(props) {
        super(props)
        this.state={
            nohead:false
        }
    }
	componentDidMount(){
		var that = this;
        if(this.props.url.query.nohead){
            this.setState({
                nohead:true
            })
        }  
        $.ajax({
        	type:'post',
        	url:' /user/article/articleDetail.do',
        	data:{id:3},
        	dataType:'JSON',
        	success:function(d){
        		if (d.code==200) {
        			that.refs.textC.innerHTML = d.data.content
        		}
        	}
        })  
	}
	render(){
		return(
			<div>
				<Header_title text='用户协议'/>
            	{
                    this.state.nohead?'':<Head text="用户协议"/>
                }
				<div className='text' ref='textC'></div>
				<style jsx global>{`
                    .text{
                    	width:100%;
                    	height:100%;
                    	background:#fff;
                    }
                    .text>p{
                    	padding:0 .15rem;
                    	line-height:.21rem;
                    	color:#222222;
                    }
                    .text>p:first-child{
                    	line-height:.3rem;
                    }
                    .text>p:nth-child(3){
                    	text-indent:2em;
                    }
                `}</style>

			</div>
			)
	}
}
export default Protocol;
