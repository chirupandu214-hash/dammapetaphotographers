import AppLayout
from "@/layouts/AppLayout";


import TransactionForm
from "@/components/bank/TransactionForm";



export default function BankTransactionsPage(){

return(

<AppLayout>


<h1>
Bank Transactions
</h1>


<TransactionForm/>


</AppLayout>

);


}
