import React, {
  Component
} from 'react'
import Router from 'next/router'
import $ from 'jquery'
import Header_title from '../../common/header/header_title.js';
import Head from '../../common/header/header_left.js';
class Edite extends Component {
    constructor(props) {
        super(props)
    }
	componentDidMount(){

	}
    render() {
        return (
            <section className="approve_main">
                <img src="../../../../static/mine/about_one.png"/>
                <img src="../../../../static/mine/about_two.png"/>
                <img src="../../../../static/mine/about_three.png"/>
                <style jsx global>{`
                    img{
                        border:none;
		                vertical-align:top;
                        width:100%;
                        display: block;
                    }
                `}</style>
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
                        <Header_title text="关于我们"/>
                        <div>
                        {
                            this.props.url.query.nohead == '1' ? '' : <Head text="关于我们"/>   
                        }
                    </div>
                <Edite/>
            </div>
		
	}
}
