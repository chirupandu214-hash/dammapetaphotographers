import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";


export default function DashboardPage() {

  const navigate = useNavigate();

  const { profile } = useAuth();


  async function logout() {

    await supabase.auth.signOut();

    navigate("/");

  }


  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "#f5f5f5"
      }}
    >


      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          maxWidth: "900px",
          margin: "auto"
        }}
      >


        <h1>
          Dammapeta Photographers Portal
        </h1>


        <hr />


        <h2>
          Dashboard
        </h2>


        <p>
          Welcome:
          {" "}
          <b>
          {profile?.name || "User"}
          </b>
        </p>


        <p>
          Role:
          {" "}
          <b>
          {profile?.role || "Member"}
          </b>
        </p>



        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
            gap:"20px",
            marginTop:"30px"
          }}
        >


          <div className="card">

            <h3>
              Members
            </h3>

            <p>
              Manage Photographer Members
            </p>

            <button
            onClick={()=>navigate("/members/profile")}
            >
              Open
            </button>

          </div>



          <div className="card">

            <h3>
              QR Verification
            </h3>

            <p>
              Verify Member QR Code
            </p>


            <button
            onClick={()=>navigate("/qr-verification")}
            >
              Open
            </button>

          </div>




          <div className="card">

            <h3>
              Bank Transactions
            </h3>


            <p>
              Manage Payments
            </p>


            <button
            onClick={()=>navigate("/bank/transactions")}
            >
              Open
            </button>


          </div>


        </div>



        <br />


        <button
          onClick={logout}
          style={{
            background:"red",
            color:"white",
            padding:"10px 20px",
            border:"none",
            borderRadius:"5px",
            cursor:"pointer"
          }}
        >
          Logout
        </button>



      </div>


    </div>

  );

}
