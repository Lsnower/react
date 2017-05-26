import React, {
    Component
} from 'react'
import Router from 'next/router'
import $ from 'jquery'
//点击年龄
export default class Clickage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            off: props.text,
            id: null,
            year: new Date().getFullYear(),
            num:null
        }
        this.ageclick = this.ageclick.bind(this);
        this.ageclose = this.ageclose.bind(this);
        this.ageyes = this.ageyes.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            off: nextProps.text,
            num:nextProps.showsage
        })
        let _num = nextProps.showsage;
        let a = (100-_num)*40;
        $(this.refs.bodyBox).scrollTop(a);
    }
    componentDidMount() {
        this.refs.bodyBox.addEventListener('scroll', this.orderScroll.bind(this));
    }
    orderScroll(e) {
            let b = Math.ceil(e.target.scrollTop / 40);
            let c = b + this.state.year-100;
            if (b == 0) {
                this.setState({
                    id: this.state.year-100
                })
            }else if(c == (this.state.year)){
                 this.setState({
                    id: this.state.year
                })    
            } 
            else {
                this.setState({
                    id: c
                })
            }
        }
    //选择年份
    ageclick(id) {
        let that = this;
        that.setState({
            id: id
        })
    }

    //点击取消
    ageclose(e) {
            let that = this;
            that.props.model()
        }
        //点击确定
    ageyes(id, e) {
        let that = this,userage;
        this.props.inputage(id);
        that.props.model();
        userage = new Date().getFullYear() - id;
        $.ajax({
            url:'/user/user/updateUserAge.do',
            data:{userAge:userage},
            success:function(d){
                if(d.code == 200){
                    
                }
            }
        })
    }
    render() {
        let data = new Date().getFullYear();
        let _li = "",
            that = this;
        let d = [];
        for (let i = data-100; i <= data; i++) {
            d.push(i);
        }
        let a;
        let c = that.state.off ? 'showage' : 'showage agehide';
        let temp = d.map(function(v, r) {
            let s;
            if (that.state.id == v) {
                s = 'checkli';
            } else {
                s = ''
            }
            return (
                <li className={s} key={r} onClick={that.ageclick.bind(that,v)}>{v}</li>
            )
        })
        return (
            <div>
                <div className={c} ref="show">
                    <div className="showage_confirm">
                        <span onClick={that.ageclose.bind(that)}>取消</span>
                        <span onClick={that.ageyes.bind(that,that.state.id)}>确认</span>
                    </div>
                    <ul className="showage_main" ref="bodyBox">
                            {temp}
                    </ul>
                </div>
                <style jsx global>{`
                    .showage{
                        position:fixed;
                        bottom:0px;
                        width:100%;
                        background:#fff;
                        z-index:1000;
                        overflow:auto;
                        height:180px;
                    }
                    .agehide{
                        visibility: hidden;
                    }
                    .showage .showage_confirm{
                        height:45px;
                        background:#cd4a47;
                        line-height:50px;
                        width:100%;
                        padding:0 0.2rem;
                        position:fixed;
                    }
                    .showage .showage_confirm span{
                        color:#fff;
                    }
                    .showage .showage_confirm span:nth-child(1){
                        float: left;
                    }
                    .showage .showage_confirm span:nth-child(2){
                        float: right
                    }
                    .showage .showage_main{
                        margin-top:0.5rem;
                        overflow:scroll;
                        height:1.5rem;
                        width:100%;
                        padding-bottom: 90px;
                    }
                    .showage .showage_main li{
                        height: 0.4rem;
                        width:100%;
                        text-align: center;
                        line-height:0.4rem;
                        border-bottom:1px solid #cdcdcd;
                        color:#bebebe;
                        font-size:0.14rem;
                    }
                    .showage .showage_main li.checkli{
                        color:#000000;
                    }
                `}</style>
                </div>
        )
    }
}
//export default Clickage;