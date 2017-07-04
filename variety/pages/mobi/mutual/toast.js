import React from 'react'

export default  class Toast extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            asytt:false,
		}
        this.handclick = this.handclick.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.text){
            this.setState({
                asytt:true
            })
        }
    }
    componentDidMount(){
        
    }
    handclick(){
        this.setState({
                asytt:false
            })
    }
    render(){
        if(this.state.asytt){
            return(<div className='toastBox'  ref='toast' onClick={this.handclick}>
                <div className='toast'>{this.props.text}</div>
                <style>{`
                    .toastHide{
                        display:none;
                    }
                    .toastBox{
                        position:absolute;
                        justify-content: center;
                        align-items:center;
                        z-index:10001;              
                        width:100%;
                        top:0;
                        bottom:0;
                        height:100%;
                        display: flex;

                    }
                    .toast{
                        height:.45rem;
                        background:rgba(0,0,0,0.75);
                        padding:0 .2rem;
                        color:#fff;
                        font-size:.14rem;
                        border-radius:.04rem;  
                        text-align:center;
                        line-height:.45rem;
                `}</style>
            </div>)
        }else{
            return <div></div>
        }
        
     }
}