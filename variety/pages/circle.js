
import Link from 'next/link'
import Header_title from './mobi/common/header/header_title.js';
import Header from './mobi/common/header/header_noleft.js';
import Footer from './mobi/common/footer.js';
import Finance from './mobi/circle/components/finance.js';

class Circle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:''};
    }
    
    render(){
        return (
            <div>
                <Header_title text="经济圈"/>
                <Header text="经济圈"/>
                <div className="content">
                    <Finance />
                </div>
                <Footer active="circle"/>
                <style jsx global>{`
                    body{
                        -webkit-text-size-adjust:none;
                        background: #e7e7e8;
                    }
                `}</style>
                <style jsx>{`
                    .content{
                        margin-bottom:.5rem;
                    }
                `}</style>
            </div>
        )
    }    
}

export default Circle;
