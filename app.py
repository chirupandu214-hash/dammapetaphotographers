import { useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function App() {

  useEffect(() => {

    async function testConnection() {

      const { data, error } = await supabase
        .from("members")
        .select("*");

      console.log(data);

      console.log(error);

    }

    testConnection();

  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
      Dhammapeta Photographers Association Portal
    </div>
  );
}
