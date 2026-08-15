"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Log = {
  id:number;
  action:string;
  user:string;
  createdAt:string;
};

export default function LogsPage(){

  const router = useRouter();

  const [logs,setLogs] = useState<Log[]>([]);
  const [search,setSearch] = useState("");



  async function loadLogs(){

    try{

      const res = await fetch("/api/logs");

      const data = await res.json();

      if(Array.isArray(data)){

        const sorted = [...data].sort(
          (a,b)=>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        setLogs(sorted);

      }

    }catch(error){

      console.error(error);

    }

  }



  useEffect(()=>{

    loadLogs();

    const interval = setInterval(
      loadLogs,
      10000
    );

    return ()=>clearInterval(interval);

  },[]);



  const filteredLogs = logs.filter(log=>

    log.action
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    log.user
      .toLowerCase()
      .includes(search.toLowerCase())

  );



  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <button

        onClick={()=>router.push("/admin")}

        className="bg-slate-800 px-5 py-3 rounded-xl"

      >

        ← Dashboard

      </button>



      <h1 className="text-4xl font-bold mt-8">

        📋 Logs

      </h1>

      <p className="text-slate-400 mt-2">

        Alle Aktionen im Adminbereich

      </p>



      <div className="mt-6 flex flex-col md:flex-row gap-4">

        <input

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          placeholder="Logs durchsuchen..."

          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 w-full"

        />



        <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 whitespace-nowrap">

          {filteredLogs.length} Einträge

        </div>

      </div>



      <div className="mt-10 space-y-4">

        {filteredLogs.length === 0 && (

          <div className="bg-slate-900 rounded-3xl p-6">

            Keine Logs gefunden

          </div>

        )}



        {filteredLogs.map(log=>(

          <div

            key={log.id}

            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"

          >

            <h2 className="text-xl font-bold">

              {log.action}

            </h2>



            <p className="text-slate-400 mt-2">

              von {log.user}

            </p>



            <p className="text-sm text-slate-500 mt-2">

              {new Date(log.createdAt).toLocaleString("de-DE")}

            </p>

          </div>

        ))}

      </div>

    </main>

  );

}