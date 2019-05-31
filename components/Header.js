import BasketViget from './BasketVidget';
import styled from 'styled-components';

let BasketContaner = styled.div`
    float:right;
    width:180px;
    line-height:1.2rem;
    margin-left:10px;
`;

let NavButtonContaner = styled.div`
    float:left;
    width:50px;
    padding: 5px 20px;
`;

class Header extends React.Component {

    componentDidMount() {  
        document.addEventListener('DOMContentLoaded', function() {
            let elems = document.querySelectorAll('.sidenav.sidenav-header');
            M.Sidenav.init(elems); 
          });
    }

    render() {
        return <>
            <nav>
                <div className="nav-wrapper">

                    <NavButtonContaner>
                        <a href="#" data-target="slide-out" className="sidenav-trigger hide-on-large-only"><i className="material-icons">menu</i></a>
                    </NavButtonContaner>
                    <a href="#" className="brand-logo">Logo</a>
                    <BasketContaner><BasketViget /></BasketContaner>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                    </ul>

                </div>
            </nav>
            <ul className="sidenav sidenav-header" id="slide-out">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
            </ul>
            
        </>;
    }
}

export default Header;