import React ,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import SimpleAppBar from './navigation';
import Button from '@material-ui/core/Button';
import SimpleBottomNavigation from './bottomNav';
export default class Gallery extends Component{
    render(){
        return(
            <div>
                <SimpleAppBar/>
                <div >
                <img src={require('./wallpaper.jpg')} alt="mainpicture" width="100%" height={550}/>
                </div>
                        

            <h1 style={{paddingLeft:'45%',color:'#3F3F3F'}} >Gallery</h1>
            <hr />
    
            <div style={{display:'inline-flex'}}>
                    
                   
                  
                    <table style={{width:"100%"}}>

                        <tbody>
                            <tr>
                                <td style={{paddingLeft:250 }}>
                                    <div >
                                        <h3 style={{paddingLeft:70}}>Mobile</h3>
                                        <Avatar alt="Mobile" src={require('./mobile.png')} style={{height:150, width:190}} />
                                        <Button variant="outlined" color="primary" style={{marginLeft:40,marginTop:20}}>
                                            View
                                        </Button>
                                    </div>
                                </td>
                                <td style={{paddingLeft:250}}>
                                    <div>
                                        <h3 style={{paddingLeft:50}}>Refregrator</h3>
                                        <Avatar alt="Mobile" src={require('./download.jpg')} style={{height:150, width:190}} />
                                        <Button variant="outlined" color="primary" style={{marginLeft:40,marginTop:20}}>
                                            View
                                        </Button>
                                    </div>
                                </td>
                                <td style={{paddingLeft:250}}>
                                    <div>
                                        <h3 style={{paddingLeft:70}}>LCD's</h3>
                                        <Avatar alt="Mobile" src={require('./lcd.jpg')} style={{height:150, width:190 }} />
                                        <Button variant="outlined" color="primary" style={{marginLeft:40,marginTop:30}}>
                                           View
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <SimpleBottomNavigation />
            </div>
        );
    }
}