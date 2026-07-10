import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {

  const [open, setOpen] = useState(false);


  return (

    <div className="min-h-screen bg-gray-100 flex">


      {/* Mobile Header */}

      <div
        className="
        md:hidden
        fixed
        top-0
        left-0
        right-0
        bg-blue-700
        text-white
        p-4
        z-50
        flex
        justify-between
        "
      >

        <h2 className="font-bold">
          DPA Portal
        </h2>


        <button
          onClick={() => setOpen(!open)}
          className="text-2xl"
        >
          ☰
        </button>


      </div>



      {/* Sidebar */}

      <aside

        className={`
        fixed
        md:static
        top-0
        left-0
        h-full
        w-64
        bg-blue-700
        text-white
        p-5
        transform
        transition-transform
        z-40

        ${
          open
          ? "translate-x-0"
          :
          "-translate-x-full md:translate-x-0"
        }

        `}

      >


        <h2
          className="
          text-xl
          font-bold
          mb-8
          "
        >
          Dammapeta
          <br/>
          Photographers
        </h2>



        <nav
          className="space-y-4"
        >

          <Link
            to="/dashboard"
            onClick={()=>setOpen(false)}
            className="block hover:bg-blue-600 p-2 rounded"
          >
            📊 Dashboard
          </Link>


          <Link
            to="/members"
            onClick={()=>setOpen(false)}
            className="block hover:bg-blue-600 p-2 rounded"
          >
            👥 Members
          </Link>


          <Link
            to="/fund"
            onClick={()=>setOpen(false)}
            className="block hover:bg-blue-600 p-2 rounded"
          >
            💰 Fund
          </Link>


          <Link
            to="/bank"
            onClick={()=>setOpen(false)}
            className="block hover:bg-blue-600 p-2 rounded"
          >
            🏦 Bank
          </Link>


          <Link
            to="/reports"
            onClick={()=>setOpen(false)}
            className="block hover:bg-blue-600 p-2 rounded"
          >
            📄 Reports
          </Link>


        </nav>


      </aside>




      {/* Overlay Mobile */}

      {
        open &&

        <div

          onClick={()=>setOpen(false)}

          className="
          md:hidden
          fixed
          inset-0
          bg-black
          bg-opacity-40
          z-30
          "

        />

      }




      {/* Content */}

      <main

        className="
        flex-1
        p-4
        md:p-6
        pt-20
        md:pt-6
        "

      >

        {children}

      </main>


    </div>

  );

}
