import { useHistory } from 'react-router-dom';

import './Footer.css';
import '../auth/auth_css/Auth.css';

export default function Footer() {
    const history = useHistory();

    const clickHandler = (e) => {
        const val = e.target.innerText;
        if (val === 'About') history.push('/about');
        else if (val === 'Contact') history.push('/contact');
    }

    return (
        <div id='auth-footer'>
            <ul id='auth-footer-list'>
                <li className="about-link" onClick={clickHandler}>About</li>
                <li className="contact-link" onClick={clickHandler}>Contact</li>
            </ul>
        </div>
    )
}
