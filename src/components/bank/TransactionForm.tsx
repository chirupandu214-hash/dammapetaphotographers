import {
useEffect,
useState
}
from "react";


import {
addTransaction,
getNextTransactionNo
}
from "@/services/bankService";



export default function TransactionForm(){


const [form,setForm]=useState({

transaction_no:"",

type:"Income",

amount:"",

category:"",

description:"",

transaction_date:""

});



useEffect(()=>{

async function load(){

const no =
await getNextTransactionNo();


setForm(prev=>({

...prev,

transaction_no:no

}));

}

load();


},[]);




function change(e:any){

setForm({

...form,

[e.target.name]:
e.target.value

});

}




async function save(){


await addTransaction(form);


alert(
"Transaction Saved"
);


}



return(

<div>


<h2>
Bank Transaction
</h2>


<input

value={
form.transaction_no
}

readOnly

/>


<br/>


<select

name="type"

value={form.type}

onChange={change}

>

<option>
Income
</option>


<option>
Expense
</option>


</select>


<br/>


<input

name="amount"

placeholder="Amount"

onChange={change}

/>


<br/>


<input

name="category"

placeholder="Category"

onChange={change}

/>


<br/>


<textarea

name="description"

placeholder="Description"

onChange={change}

/>


<br/>


<input

type="date"

name="transaction_date"

onChange={change}

/>


<br/>


<button

onClick={save}

>

Save

</button>



</div>

);


}
