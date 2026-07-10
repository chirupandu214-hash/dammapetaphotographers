import {
useEffect,
useState
}
from "react";


import {
addFund,
getNextReceiptNo
}
from "@/services/fundService";



export default function FundForm(){

const [form,setForm]=
useState({

receipt_no:"",

member_id:"",

member_name:"",

year:new Date()
.getFullYear(),

amount:"",

payment_date:"",

notes:""

});



useEffect(()=>{

async function load(){

const no =
await getNextReceiptNo();


setForm(prev=>({

...prev,

receipt_no:no

}));

}


load();


},[]);



function change(
e:any
){

setForm({

...form,

[e.target.name]:
e.target.value

});

}




async function save(){

await addFund(form);


alert(
"Fund Saved"
);


}



return(

<div>


<h2>
Yearly Fund Collection
</h2>


<input

value={form.receipt_no}

readOnly

/>


<br/>


<input

name="member_id"

placeholder="Member ID"

onChange={change}

/>


<br/>


<input

name="member_name"

placeholder="Member Name"

onChange={change}

/>


<br/>


<input

name="amount"

placeholder="Amount"

onChange={change}

/>


<br/>


<input

type="date"

name="payment_date"

onChange={change}

/>


<br/>


<textarea

name="notes"

placeholder="Notes"

onChange={change}

/>


<br/>


<button

onClick={save}

>

Save Fund

</button>



</div>

);


}
