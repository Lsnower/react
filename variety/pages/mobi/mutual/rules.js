import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Style from './toborrowcss.js'
class Detail extends React.Component{
	constructor(props){
        super(props)
        this.state = {
            content:null
		}
    }
    componentDidMount(){
        let that = this;
        $.ajax({
            url:"/user/article/articleDetail.do",
			data:{id:2},
			type:'post',
			dataType:'json',
			success:function(i){
				if(i.code == 200){
                    $(that.refs.main).html(i.data.content)
				}
            }
        })
    }
    render(){
        
    	return(
			<section>
                <div ref="main" className="maindetail"></div>
            </section>
    	)
    }
}

export default  class  Future extends React.Component {
	constructor(props){
        super(props);
    }
    componentDidMount(){
        var reg = new RegExp("(^|&)nohead=([^&]*)(&|$)");
        var r = this.props.url.query.nohead;
    }
	render(){
			return <div>
			<Header_title text='借款规则与用户须知'/>
            {
                this.props.url.query.nohead == '1' ? '' : <Head text="借款规则与用户须知" ref="head" />   
            }
            <Style />
            <Detail/>
		</div>
		
	}
}
