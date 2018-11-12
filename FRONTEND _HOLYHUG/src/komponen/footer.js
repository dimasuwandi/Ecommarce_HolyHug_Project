import React, {Component} from 'react';
import './style.css';




class Footer extends Component {
render(){

return(

<footer id="footer" class="page-footer font-small">
<div class="container1">
    <br/>
    <center>
        <a id="icon" target="_blank" href="https://www.facebook.com/muhammad.dimas.1884" class="fa fa-facebook-official"></a>&nbsp; &nbsp; &nbsp; &nbsp;
        <a id="icon" target="_blank" href="mailto:muhamaddimas.andi95@gmail.com" class="fa fa-google"></a>&nbsp; &nbsp; &nbsp; &nbsp;
        <a id="icon" target="_blank" href="#" class="fa fa-twitter" ></a>&nbsp; &nbsp; &nbsp; &nbsp;
        <a id="icon" target="_blank" href="https://api.whatsapp.com/send?phone=6285717393810&text=Hallo%20Admin%20I%20Have%20Some%20Question%20About%20HollyHug" class="fa fa-whatsapp" ></a>&nbsp; &nbsp; &nbsp; &nbsp;
        <a id="icon" target="_blank" href="https://www.instagram.com/dimasuwandi/?hl=id" class="fa fa-instagram" ></a>&nbsp; &nbsp; &nbsp; &nbsp;
    </center>

</div>
<div class="footer-copyright text-center py-3">
    <p id="copyright">© 2018 HolyHug . All Rights Reserved | Design by Dimas & Co</p>
</div>
<br/>
</footer>
    )
  }
}
export default Footer;