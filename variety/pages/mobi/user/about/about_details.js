import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Head from '../../common/header/header_left.js';
export default class Edite extends Component {
    constructor(props) {
        super(props)
        this.state={
            nohead:false
        }
    }
	componentDidMount(){
        if(this.props.url.query.nohead){
            this.setState({
                nohead:true
            })
        }    
	}
    render() {
        return (<div>
            <Header_title text="功能介绍"/>
                {
                    this.state.nohead?'':<Head text="功能介绍"/>
                }
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
            </div>
        )
    }
}