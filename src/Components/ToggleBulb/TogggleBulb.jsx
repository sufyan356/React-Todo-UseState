import '../../index.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function Bulb(){
    const [isBulbOn , toggleBulbState] = useState(true);
    // const bulbOn = 'https://icon-library.com/images/light-off-icon/light-off-icon-4.jpg'
    // const bulbOff = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bxIc0U20pohH_0wRP1FNqkcyKMai6dzAHA&usqp=CAU'
    const bulbOn = 'https://cdn.pixabay.com/photo/2016/02/01/09/29/light-bulb-1173249_1280.jpg'
    const bulbOff = 'https://cdn.pixabay.com/photo/2016/02/01/20/26/light-bulb-1174363_1280.png'

    const image = isBulbOn ? bulbOn : bulbOff;

    return(

        <div className="container bulbContainer">
            <div className="row">
                <div className="col-sm-6 imgContainer">
                <img className='img-fluid img'src = {image} alt="BulbImg" />

                </div>
               
                    <Button variant="px-6 mt-5 mb-5" onClick={() => toggleBulbState(!isBulbOn)} className='toggleBtn btn-primary'>
                        On/Off
                    </Button>
            </div>
        </div>
    )

}
export default Bulb;

