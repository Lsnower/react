/*
* @Author: Maolin
* @Date:   2017-04-24 17:41:39
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-18 09:17:39
*/

class Bigger extends React.Component{
    constructor(props){
        super(props)
        this.cancle = this.cancle.bind(this);
    }
    cancle(){
       this.props.hand();
    }
    render(){
        return(
            <div>
                <section className={this.props.show?"show":"none"}>
                    <div className="overlay msgbox"></div>
                    <div className="overlay msgbox" onClick={()=>{this.cancle()}}>
                        <div className="content" style={{width:this.props.type=='lend'?'100%':'',padding:this.props.type=='lend'?'0':''}}>
                            <img src={this.props.pic}/>
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
                    .overlay{
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        z-index: 99;
                        background-color: rgba(0,0,0,.4);
                        -webkit-transform: translateZ(0);
                        transform: translateZ(0);
                    }
                    .content{
                        width: 90%;
                        padding: .1rem;
                        z-index: 100;
                    }
                    .content img{
                        width: 100%;
                        background: #eee;
                        display: inherit;
                    }
                    
                `}</style>
            </div>
        )
    }
}

export default Bigger;
