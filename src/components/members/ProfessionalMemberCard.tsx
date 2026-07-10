import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


interface Props {
  member:any;
}


export default function ProfessionalMemberCard({
  member,
}:Props){


const verifyUrl =
`${window.location.origin}/verify/${member.member_id}`;



async function downloadPDF(){

const element =
document.getElementById(
"member-card"
);


if(!element) return;



const canvas =
await html2canvas(element);



const imgData =
canvas.toDataURL(
"image/png"
);



const pdf =
new jsPDF(
"p",
"mm",
"a4"
);



pdf.addImage(
imgData,
"PNG",
20,
20,
80,
120
);



pdf.save(
`${member.member_id}.pdf`
);


}



function printCard(){

window.print();

}



return(

<div>


<div

id="member-card"

style={{

width:"350px",

background:"#fff",

borderRadius:"15px",

overflow:"hidden",

boxShadow:
"0 5px 20px rgba(0,0,0,.2)"

}}

>


<div

style={{

background:"#1565c0",

color:"#fff",

padding:"15px",

textAlign:"center"

}}

>

<h2>
Dammapeta Photographers
</h2>


<p>
Association ID Card
</p>


</div>



<div

style={{

padding:"20px",

textAlign:"center"

}}

>


{
member.photo &&

<img

src={member.photo}

style={{

width:"100px",

height:"100px",

borderRadius:"50%",

objectFit:"cover"

}}

 />

}



<h2>
{member.full_name}
</h2>


<p>
ID :
{member.member_id}
</p>


<p>
Mobile :
{member.mobile}
</p>


<p>
Studio :
{member.studio_name}
</p>


<p>
Status :
{member.status}
</p>



<QRCodeCanvas

value={verifyUrl}

size={100}

/>


</div>



<div

style={{

background:"#eee",

padding:"10px",

textAlign:"center"

}}

>

Dammapeta
Photographers Association


</div>



</div>



<br/>


<button
onClick={downloadPDF}
>
Download PDF
</button>


<button
onClick={printCard}
style={{
marginLeft:"10px"
}}
>
Print
</button>


</div>


);


}
