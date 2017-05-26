import Router from 'next/router';
class Confirm extends React.Component{
    constructor(props){
        super(props)
        this.cancle = this.cancle.bind(this);
        this.canOk = this.canOk.bind(this);
       
        this.state={
            show:props.confirm.show,
            type:props.confirm.type
        }
    }
    componentWillReceiveProps(nextProps){
         this.setState({
            show:nextProps.confirm.show
        })
    }
    cancle(e,f){
        if(this.props.isNot){
            this.props.isNot(e,this.props.confirm)
        }
        
        this.setState({
            show:false
        })
        return false;
       
    }

    canOk(e,f){
        if(this.props.confirm.code == 503){
            Router.push({
              pathname: '/login',
              query: {}
            })
        }
        if(this.props.confirm.code == 702){
            Router.back();
        }
        if(this.props.isOk){
             this.props.isOk(e,this.props.confirm);
        }
       this.setState({
            show:false
        })
         return false;
    }
    render(){
        var btns = this.props.type==2? <div className="btn btn-left no" onClick={(e)=>{this.cancle()}}>取消</div>:'';
        return (
            <div>
                <section className={this.state.show?"show":"none"}>
                    <div className="confirm msgbox" onClick={(e)=>{this.cancle()}}></div>
                    <div className="confirm msgbox" >
                        <div className="content">
                            <div className="main">
                                <div className="title">{this.props.confirm?this.props.confirm.title||'':''}</div>
                                <div className="sub-title">{this.props.confirm?this.props.confirm.content:''}</div>
                            </div>
                            <div className="action clearfix">
                                {btns}
                                <div className="btn btn-right ok" onClick={(e)=>{this.canOk()}}>确定</div>
                            </div>
                        </div>
                    </div>
                </section>
                <style jsx global>{`
                    html{-webkit-text-size-adjust:none;}
                `}</style>
                <style jsx>{`
                    .show{
                        display:block;
                    }
                    .none{
                        display: none;
                    }
                    .confirm{
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        z-index: 99;
                        background-color: rgba(0,0,0,.4);
                        -webkit-transform: translateZ(0);
                        transform: translateZ(0);
                    }
                    .confirm .main{
                        padding: .15rem .18rem .25rem;
                    }
                    .confirm .main .title{
                        text-align: center;
                        font-size; .14rem;
                        color: #0c0f16;
                        line-height: .24rem;
                    }
                    .confirm .main .sub-title{
                        text-align: left;
                        font-size: .12rem;
                        color: #7a7b7f;
                        padding-top: .16rem;
                        line-height: .18rem;
                        text-align:center;
                    }
                    .btn{margin:0;}
                `}</style>
            </div>
        )
    }
}

export default Confirm;
