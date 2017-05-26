import React, {
  Component
} from 'react'
import Link from 'next/link';
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Style from './setter_css.js';

class Acclist extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            disabled:true
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        let that = this;
        that.setState({
            disabled:!that.state.disabled
        })
    }
    render() {
        let that = this,b,c;
        that.state.disabled ? b = 'open1': b = 'close1';
        that.state.disabled ? c = 'open2': c = 'close2';
        return (
            <div className="newmes">
                <div className="newmain">
                    <div className="left">接收新消息通知</div>
                    <div id="circle_wai" className={b} onClick={that.handleClick}>
                        <div id="circle_nei" className={c}></div>
                    </div>
                </div>
                <style jsx>{`
                .newmes{
                    width: 100%;
                    margin:0 auto;
                    height:0.6rem;
                    background:#fff;
                    padding
                }

                .newmes .newmain{
                    width:90%;
                    height:100%;
                    margin:0 auto;
                    line-height:0.6rem;
                }

                #circle_wai{
                    width: 60px;
                    height: 34px;
                    border-radius: 50px;
                    position: relative;
                    top:14px;
                    float:right;
					transition: right 0.2s;
                }
                #circle_nei{
                    width: 30px;
                    height: 30px;
                    border-radius: 48px;
                    position: absolute;
                    background: white;
                    box-shadow: 0px 2px 4px rgba(0,0,0,0.4);
					transition: right 0.2s;
                }
                .open1{
                    background: #85e5b2;
                }
                .open2{
                    top: 2px;
                    right: 1px;
                }
                .close1{
                    background: #fff;
                    border:1px solid rgba(0,0,0,0.15);
                    border-left: transparent;
                }
                .close2{
                    top: 0px;
                    right: 30px;
                    border:1px solid rgba(0,0,0,0.1);
                }
            `}</style>
            </div>
        )
    }
}


export default () => (
  <div>
        <Header_title text="新消息通知"/>
        <div><Header text="新消息通知" /></div>
         <section className="page-main main-mine">
            <Style/>
            <div className="content">
                <Acclist/>
            </div>
            <div></div>
        </section>
    </div>
)