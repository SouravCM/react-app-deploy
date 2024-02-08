import React from 'react'
import CompanyLogo from '../ranelogo.png';
import QrCodeImage from '../images/qrcodeprint.jpeg'
 function GatePassPrint() {
const main = 
    {
        border: "1px solid",
        margin: "5px",
        width: "60%",
        padding: "10px",
        align:"center"
      }
const imageStyle= {
width:"100px",
height:"75px"
}

const companyname ={
    margin:"4px",
    
}
const contentDiv={
    border: "1px solid",
    marginTop:"25px",
    width:"100%"

}
const leftDiv={
    float:"left"
}
const rightDiv={
    float:"right",
    width:"250px",
    height:"250px"

}
const qrImageStyle={
    width:"250px",
    height:"250px",
    
}
const titleDiv={
    marginLeft:"50px",
    marginTop:"10px",
    marginRight:"10px",
    marginBottom:"10px"
}
const signatureStyle={
    padding:"100px"
}
const tableStyle={
    width:"100%"
}
const tdStyle={
    align:"right",
    width:"250px",
    textAlign:"center",
     border:"1px solid"
}
  return (
           <div style={main}>
            <div>
            <table >
                <tr>
                    <td>
                    <img src={CompanyLogo} style={imageStyle}  />
                    </td>
                    <td>
                    <h6 style={companyname}>RANE(MADRAS) LTD <br />Varanavasi</h6>
                    </td>
                    <td>
                    <h3 style={titleDiv}><u>Vehicle In Pass</u></h3>
                    </td>
                </tr>
            </table>
            </div>
        <div >
        <div >
        <table>
          <tr>
            <td>Vehicle Pass No:</td>
            <td>12860|TN09CL0887|11503|2023</td>
        </tr>
          <tr >
            <td>Transport Name:</td>
            <td>PR TRANSPORT</td>
{/* <td rowSpan="6" style={tdStyle}>        <Canvas
      text={newGatePass}
      options={{
        level: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    /> 
    </td>*/}

          </tr>
          <tr>
            <td>Vehicle No:</td>
            <td>TN09-CL-0887</td>
          </tr>
          <tr>
            <td>Insurance No:</td>
            <td>3003/268552740/00/000 / Valid Date: 15/11/2023</td>
          </tr>
          <tr>
            <td>Pollution Certification No:</td>
            <td>TN6140018004909 / Valid Date: 15/11/2023</td>
          </tr>
          <tr>
            <td>Driver Name:</td>
            <td>SATHISHKMAR MADAHAVAN / DL No : TN3220220002841</td>
          </tr>
          <tr>
            <td>Vehicle In(Date & Time):</td>
            <td>2/9/2023 12:49:51 PM</td>
          </tr>
          <tr>
            <td>Loding/Unloading Location:</td>
            <td>FG Store</td>
          </tr>
<br></br><br></br>
          
          <tr style={signatureStyle}>
            <td>Stores in Charge Signature</td>
            <td></td>
            <td>Security Signature</td>
          </tr>
          <tr >
            <td>Store In Charge Name</td>
          </tr>
        </table>
      </div>
<div >

</div>
</div>   
  </div>
  )
}
export default GatePassPrint;