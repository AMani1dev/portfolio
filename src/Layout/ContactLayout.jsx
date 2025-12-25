import { Outlet } from "react-router-dom";

const ContactLayout = () => {
    return ( 
        <>
        <div>
            <Outlet/>
        </div>
        </>
     );
}
 
export default ContactLayout;