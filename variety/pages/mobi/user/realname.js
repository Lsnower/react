import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import Style from './mine_style.js';
import $ from 'jquery';
import Alert from '../common/confirm.js';
class Edite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: props._usmes,
            confirm:{
                show:false,
                content:'',
                fun:null
            }
        }
        this.sublic= this.sublic.bind(this);
    }
    componentDidMount(){
        $(this.refs.county).val(this.state.date)
    }
    sublic (event) {
        let _name = this.refs.county.value,that = this;
        if(_name.length > 8){
            that.setState({
                confirm:{
                    show:true,
                    content:'昵称最多8个字符，请重新输入',
                }
            })
        }else{
            $.ajax({
                url:'/user/user/updateUserName.do',
                data:{userName:_name},
                success:function(d){
                    if(d.code == 200){
                        $(that.refs.success_mask).show();
                        $(that.refs.success_mask).animate({'opacity':1},500,function(){	
                            $(that.refs.success_mask).animate({'opacity':0},500,function(){
                                $(that.refs.success_mask).hide();
                                Router.push({
                                    pathname:'/mobi/user/profile'
                                });
                            })					
                        }) 
                        
                    }else{
                        if(d.code == 503){
                            that.setState({
                                confirm:{
                                    show:true,
                                    content:d.msg,
                                },
                                fun:t.isnoLogin
                            })
                        }else{
                            that.setState({
                                confirm:{
                                    show:true,
                                    content:d.msg,
                                }
                            })
                        }
                    }
                }
            })
        }
        
        
    }
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    render() {
        return (
            <section className="page-main">
                <div className="real">
                    <input className="real-name" type="text" placeholder="请输入用户名" maxLength="8" ref="county"/>
                </div>
                <div className="sbtn" onClick={this.sublic}>提交</div>
                <Alert type='2' confirm={this.state.confirm} isOk={this.state.fun}/>
                <div ref="success_mask" className="success_mask">
					<img src="/static/circle/popovers_icon_succeed@3x.png" />
					<p>提交成功</p>
                </div>
            </section>
        )
    }
}

export default  class Username extends React.Component {
    
    render() {
        return <div>
        <Header_title text="修改用户名"/>
        <div><Header text="修改用户名" /></div>
        <Style/>
        <Edite _usmes={this.props.url.query._name}/>
    </div>
    }
}
