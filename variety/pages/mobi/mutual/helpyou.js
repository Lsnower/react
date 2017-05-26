import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Router from 'next/router'
import Text_none from '../common/text_none.js'

class Borrow extends React.Component{
	constructor(props){
        super(props)
    }

    render(){
        return(
             <div className='userinfo'>
            	<div className='username'>
            		<img src="../../../static/mine/headportrait160x160@3x" />
            		<p>
            			<span>{this.props.helps.userName?this.props.helps.userName:'-'}</span>
            			<span>{this.props.helps.location?this.props.helps.location:'-'}</span>
            		</p>
            	</div>
            	<div className='lenderTime'>
            		<input type="checkbox" />
            	</div>
            </div>
        )
    }
}
class Zhifu extends React.Component{
	constructor(props){
        super(props)        
    }

    render(){
        return(
             <div className='payment'>
            	选择并支付意向金
            </div>
        )
    }
}
export default  class  Future extends React.Component {
	constructor(props){
        super(props)
        this.state={data:[]};
        
    }
    componentDidMount(){
    	var _this = this;
    	$.ajax({
    		type:'post',
            url:'/coterie/help/loan/intentionCount.do',
            data:{id:_this.props.url.query.id},
            dataType:'JSON',
            success:function(d){
				_this.setState({
					data:d.data
				})
            }
    	})
    }
   
	render(){
		return <div>
			
			<Header_title text='乐米互助'/>
            <Head text="想要帮助你的人" />
              	{
		            	this.state.data.map((e,i)=>{
		            		return (
								<div>
									<Borrow helps={e}/>									
								</div>
		            		)
	            	})
	            }
            <Zhifu />
			<style>{`
						body{
							background: #efefef;
							
							
						}

						div .userinfo{
							width:100%;
							height:.7rem;
							padding:0 .1rem 0 .1rem;
							display:inline-flex;
							justify-content:space-between;
							align-items:center;
							background:#fff;

						}
						.userinfo .username{
							height:100%;
							width:60%;
							display:inline-flex;
							justify-content:space-around;
							align-items:center;
							font-size:.18rem;
						}
						.userinfo .username img{
							display:inline-block;

						}
						.userinfo .username p{
							display:inline-flex;
							flex-direction:column;
							justify-content:center;
							align-items:flex-statr;
						}
						.userinfo .lenderTime{
							width:10%;
							height:100%;
							display:inline-flex;
							flex-direction:column;
							justify-content:center;
							align-items:center;
						}
						div .payment{
							width:100%;
							height:.5rem;
							line-height:.5rem;
							color:#fff;
							background:#666;
							text-align:center;
							position:fixed;
							left:0;
							bottom:0;
						}

            `}</style>
		</div>
	}
}
