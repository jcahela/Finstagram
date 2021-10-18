import { useHistory } from 'react-router-dom';

import './Footer.css';
import '../auth/auth_css/Auth.css';

export default function Footer() {
    const history = useHistory();

    const clickHandler = (e) => {
        const val = e.target.innerText;
        if (val === 'Contact') history.push('/contact');
    }

    return (
        <div id='auth-footer'>
            <ul id='auth-footer-list'>
                <a className="about-link" href="https://github.com/jcahela/Finstagram#about-the-project" target="_blank" rel="noreferrer">About</a>
                <li className="contact-link" onClick={clickHandler}>Contact</li>
            </ul>
        </div>
    )
}
