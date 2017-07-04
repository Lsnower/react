import React from 'react'
import $ from 'jquery'
export default class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.text ? true : false
        }
    }
    componentWillReceiveProps(nextProps) {
        var that = this;
        that.setState({
            show: nextProps.text ? true : false
        })
        setTimeout(function() {
            that.setState({
                show: false
            })
        }, 3000)
    }
    componentDidMount() {

    }
    render() {
        if (this.props.text) {
            return (<div className={this.state.show?'toastBox':'toastHide'}  ref='toast'>
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
        } else {
            return <div></div>
        }

    }
}