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
                content:''
            },
            fun:null,
            funno:null,
            showtip:true
        }
        this.sublic= this.sublic.bind(this);
        this.del= this.del.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }
    componentDidMount(){
        $(this.refs.county).val(this.state.date)
        this.setState({
            confirm:{
                show:false,
                content:'',
            }
        })
    }
    sublic (event) {
        let _name = this.refs.county.value,that = this;
        if(_name.length > 8){
            that.setState({
                confirm:{
                    show:true,
                    content:'1-8个字符，可由中英文、数字组成',
                }
            })
        }else{
            $.ajax({
                url:'/user/user/updateUser.do',
                data:{userName:_name},
                type:'post',
                success:function(d){
                    if(d.code == 200){
                        $(that.refs.success_mask).show();
                        $(that.refs.success_mask).animate({'opacity':1},500,function(){	
                            $(that.refs.success_mask).animate({'opacity':0},500,function(){
                                $(that.refs.success_mask).hide();
                                Router.push({
                                    pathname:'/mine'
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
                                },
                                fun:function(){
                                    that.setState({
                                        confirm:{
                                            show:false,
                                            content:''
                                        }
                                    })
                                },
                                funno:function(){
                                    that.setState({
                                        confirm:{
                                            show:false,
                                            content:''
                                        }
                                    })
                                }
                            })
                        }
                    }
                }
            })
        }
        
        
    }
    handleChange(){
        var con = $(this.refs.county).val();
        con.length > 0 ? this.setState({showtip:true}) : this.setState({showtip:false})
    }
    del(){
        $(this.refs.county).val('');
        this.setState({
            showtip:false
        })
    }
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    render() {
        var a = this.state.showtip,b;
        b = a ? '' : 'none';
        return (
            <section className="page-main">
                <div className="real">
                    <input onChange={()=>this.handleChange()} className="real-name" type="text" placeholder="请输入用户名" maxLength="8" ref="county"/>
                    <img className={b} onClick={this.del} src="/static/mine/userinformation_list_norealname@2x.png"/>
                </div>
                <p className="realname_tip">1-8个字符，可由中英文、数字组成</p>
                <div className="sbtn" onClick={this.sublic}>保存</div>
                <Alert type='2' confirm={this.state.confirm} isOk={this.state.fun} isNot={this.state.funno}/>
                <div ref="success_mask" className="success_mask">
					<img src="/static/circle/popovers_icon_succeed@3x.png" />
					<p>保存成功</p>
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
