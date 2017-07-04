import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import $ from 'jquery';
import Alert from '../../common/confirm.js';
import Style from './rechargehtmlcss.js';
export default  class  Future extends React.Component{
	constructor(props){
        super(props)
        this.state = {
            content:null,
            title:null
		}
    }
    componentDidMount(){
        let that = this;
        $.ajax({
            url:"/user/article/articleDetail.do",
			data:{id:6},
			type:'post',
			dataType:'json',
			success:function(i){
				if(i.code == 200){
                    $(that.refs.main).html(i.data.content);
                    that.setState({
                        title:i.data.title
                    })
				}
            }
        })
    }
    render(){
        
    	return(
            <div>
			<Header_title text={this.state.title?this.state.title:''}/>
            {
                this.props.url.query.nohead == '1' ? '' : <Header text={this.state.title?this.state.title:''} ref="head" />    
            }
			<section>
                <div ref="main" className="maindetail"></div>
                <style>{`
				    .maindetail{
                        width:90%;
                        margin:0.1rem auto;
                    }
                `}</style>
            </section>
            </div>
    	)
    }
}

