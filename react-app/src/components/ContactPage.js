import { NavLink } from 'react-router-dom';
import './ContactPage.css'

function ContactPage() {
    return (
        <>
            <NavLink to='/login'><p className="back-to-home">Back to home</p></NavLink>
            <div className="profiles-container">
                <h1 className="contact-text">Contact the engineers behind Finstagram!</h1>
                <div className="cards-container">
                    <div className="contact-profile-container">
                        <img src={'images/Jason_Cahela_linkedin_profile_pic.jpeg'} alt="Jason Cahela profile-pic" className="profile-pic"/>
                        <h1 className="contact-text">Jason Cahela</h1>
                        <a href="https://www.linkedin.com/in/jason-cahela/" target="_blank" rel="noreferrer"><img src="images/LI-Logo.png" alt="linkedin logo" className="linkedin-logo"/></a>
                        <a href="https://github.com/jcahela" target="_blank" rel="noreferrer"><img src="images/GitHub_Logo.png" alt="github logo" className="github-logo"/></a>
                    </div>
                    <div className="contact-profile-container">
                        <img src="images/Alejandro_Grant_linkedin_profile_pic.jpeg" alt="Alejandro Grant profile-pic" className="profile-pic"/>
                        <h1 className="contact-text">Alejandro Grant</h1>
                        <a href="https://www.linkedin.com/in/alejandro-c-grant/" target="_blank" rel="noreferrer"><img src="images/LI-Logo.png" alt="linkedin logo" className="linkedin-logo"/></a>
                        <a href="https://github.com/MasterGrant137" target="_blank" rel="noreferrer"><img src="images/GitHub_Logo.png" alt="github logo" className="github-logo"/></a>
                    </div>
                    <div className="contact-profile-container">
                        <img src="images/Josue_Lugaro_linkedin_profile_pic.jpeg" alt="Josue Lugaro profile-pic" className="profile-pic"/>
                        <h1 className="contact-text">Josue Lugaro</h1>
                        <a href="https://www.linkedin.com/in/josue-e-j-lugaro-3462131b8/" target="_blank" rel="noreferrer"><img src="images/LI-Logo.png" alt="linkedin logo" className="linkedin-logo"/></a>
                        <a href="https://github.com/JosueLugaro" target="_blank" rel="noreferrer"><img src="images/GitHub_Logo.png" alt="github logo" className="github-logo"/></a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactPage;
