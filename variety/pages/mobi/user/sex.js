
import React, {
  Component
} from 'react'
import Router from 'next/router';
import Alert from '../common/confirm.js';
//点击性别
class Clicksex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            off:props.text,
            id:null,
            sfds:null,
            confirm:{
                show:false,
                content:''
            },
            fun:null,
            nockick:null
        }
        this.sexclick= this.sexclick.bind(this);
        this.sexclose= this.sexclose.bind(this);
        this.sexyes= this.sexyes.bind(this);
        this.isnot= this.isnot.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            off:nextProps.text,
            id:nextProps.cellsex
        })
    }
    componentDidMount() {
        this.refs.bodyBox2.addEventListener('scroll', this.orderScroll.bind(this));
    }
    orderScroll(e) {
        let b = Math.ceil(e.target.scrollTop / 40)+1;
        this.setState({
            id: b
        })  
    }
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    
    //选择性别
    sexclick(id){
        var that = this;
        that.setState({
            id : id
        })
    }
    
    //点击取消
    sexclose(){
        var that = this;
        that.props.model()
    }
    isnot(){
        var that = this;
        that.setState({
            confirm:{
                show:false,
                content:'',
            }
        })
    }
    sexyes(id){
        let that = this;
        this.props.inputsex(id);
        if(id == '0'){
            that.setState({
                confirm:{
                    show:true,
                    content:'请选择性别',
                    },
                fun:that.isnot,
                nockick:that.isnot
            })
        }else{
            $.ajax({
                url:'/user/user/updateUser.do',
                data:{userSex:id},
                type:'post',
                success:function(d){
                    if(d.code == 200){
                        that.props.model()
                    }else{
                        if(d.code == 503){
                            that.setState({
                                confirm:{
                                    show:true,
                                    content:d.msg,
                                },
                                fun:that.isnoLogin,
                                nockick:that.isnot
                            })
                        }else{
                            that.setState({
                                confirm:{
                                    show:true,
                                    content:d.msg,
                                },
                                fun:that.isnot,
                                nockick:that.isnot
                            })
                        }
                    }
                }
            })
        }
        
        
    }
    render() {
        let d = [{id:'1',name:'女',c:'1'},{id:'2',name:'男',c:'2'}],temp;
        let a;
        
        let that = this;
        let c = that.state.off ? 'showsex':'showsex sexhide'
        if(d){
            temp = d.map(function(v,r){
                var s;
                if(that.state.id ==null && v.c == '2'){
                    s = 'checkli';
                }
                else if(that.state.id == v.id){
                    s = 'checkli';
                }else{
                    s = ''
                }
                return(
                    <li className={s} key={r} onClick={that.sexclick.bind(that,v.id)}>{v.name}</li>
                )
            })
        }else{
            temp = '';
        }
        return (
            <div>
                <div className={c} ref="show">
                    <div className="show_confirm">
                        <span onClick={that.sexclose.bind(that)}>取消</span>
                        <span onClick={that.sexyes.bind(that,that.state.id)}>确认</span>
                    </div>
                        <ul className="show_main" ref="bodyBox2">
                            {temp}
                        </ul>
                    <Alert type='2' confirm={this.state.confirm} isNot={this.state.nockick} isOk={this.state.fun}/>
                </div>
                <style jsx global>{`
                    .showsex{
                        position:fixed;
                        bottom:0px;
                        height:180px;
                        width:100%;
                        background:#fff;
                        z-index:1000;
                    }
                    .sexhide{
                        display:none;
                    }
                    .showsex .show_confirm{
                        height:45px;
                        background:#cd4a47;
                        line-height:50px;
                        width:100%;
                        padding:0 0.2rem;
                    }
                    .showsex .show_confirm span{
                        color:#fff;
                    }
                    .showsex .show_confirm span:nth-child(1){
                        float: left;
                    }
                    .showsex .show_confirm span:nth-child(2){
                        float: right
                    }
                    .showsex .show_main{
                        height: 0.7rem;
                        overflow: scroll;
                        margin-top: 0.25rem;
                        margin-bottom: 0.25rem;
                    }
                    .showsex .show_main li{
                        height: 0.4rem;
                        width:100%;
                        text-align: center;
                        line-height:0.4rem;
                        border-bottom:1px solid #cdcdcd;
                        color:#bebebe;
                        font-size:0.14rem;
                    }
                    .showsex .show_main li.checkli{
                        color:#000000;
                    }
                `}</style>
                </div>
        )
    }
}
export default Clicksex;