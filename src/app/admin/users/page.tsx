"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id:number;
  name:string;
  email:string;
  role:string;
};

export default function UsersPage(){

  const router = useRouter();

  const [users,setUsers] = useState<User[]>([]);

  const [showAdd,setShowAdd] = useState(false);

  const [editUser,setEditUser] = useState<User | null>(null);

  const [isSuperAdmin,setIsSuperAdmin] = useState(false);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("ADMIN");

  const [message,setMessage] = useState("");



  async function loadUsers(){

    const res = await fetch("/api/users");

    const data = await res.json();

    if(Array.isArray(data)){
      setUsers(data);
    }

  }



  useEffect(()=>{

    const adminUser = localStorage.getItem(
      "adminUser"
    );

    if(adminUser){

      const user = JSON.parse(adminUser);

      if(user.role === "SUPERADMIN"){
        setIsSuperAdmin(true);
      }

    }

    loadUsers();

  },[]);






  async function createUser(e:React.FormEvent){

    e.preventDefault();

    const res = await fetch("/api/users",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify({

        name,
        email,
        password,
        role,

      }),

    });



    if(res.ok){

      setMessage("Benutzer erstellt ✅");

      setName("");
      setEmail("");
      setPassword("");
      setRole("ADMIN");

      setShowAdd(false);

      loadUsers();

    }else{

      const data = await res.json();

      setMessage(
        data.error || "Fehler"
      );

    }

  }






  async function deleteUser(id:number){

    if(!confirm("Benutzer wirklich löschen?")){
      return;
    }

    const res = await fetch("/api/users",{

      method:"DELETE",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify({
        id,
      }),

    });

    const data = await res.json();

    if(res.ok){

      setMessage("Benutzer gelöscht ✅");

      loadUsers();

    }else{

      setMessage(
        data.error || "Fehler"
      );

    }

  }






  async function updateUser(e:React.FormEvent){

    e.preventDefault();

    if(!editUser){
      return;
    }

    const res = await fetch("/api/users",{

      method:"PUT",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify(editUser),

    });

    const data = await res.json();

    if(res.ok){

      setMessage("Benutzer geändert ✅");

      setEditUser(null);

      loadUsers();

    }else{

      setMessage(
        data.error || "Fehler"
      );

    }

  }






  return (

    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">

      <button
        onClick={()=>router.push("/admin")}
        className="mb-8 bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl"
      >
        ← Zurück
      </button>

      <motion.h1
        initial={{opacity:0,y:-20}}
        animate={{opacity:1,y:0}}
        className="text-4xl font-bold"
      >
        Benutzerverwaltung
      </motion.h1>

      <p className="text-slate-400 mt-2">
        Benutzer erstellen und verwalten
      </p>





      {isSuperAdmin && (

        <button
          onClick={()=>setShowAdd(!showAdd)}
          className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
        >
          + Benutzer hinzufügen
        </button>

      )}






      {message && (

        <p className="mt-5 text-green-400">
          {message}
        </p>

      )}






      {showAdd && isSuperAdmin && (

        <form
          onSubmit={createUser}
          className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4"
        >

          <h2 className="text-2xl font-bold">
            Neuer Benutzer
          </h2>

          <input
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full bg-slate-800 rounded-xl px-4 py-3"
            required
          />

          <input
            placeholder="E-Mail"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full bg-slate-800 rounded-xl px-4 py-3"
            required
          />

          <input
            placeholder="Passwort"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full bg-slate-800 rounded-xl px-4 py-3"
            required
          />

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
            className="w-full bg-slate-800 rounded-xl px-4 py-3"
          >
            <option value="ADMIN">
              ADMIN
            </option>

            <option value="SUPERADMIN">
              SUPERADMIN
            </option>
          </select>

          <button
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
          >
            Speichern
          </button>

        </form>

      )}






      {editUser && isSuperAdmin && (

        <form
          onSubmit={updateUser}
          className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4"
        >

          <h2 className="text-2xl font-bold">
            Bearbeiten
          </h2>

          <input
            value={editUser.name}
            onChange={(e)=>setEditUser({
              ...editUser,
              name:e.target.value
            })}
            className="w-full bg-slate-800 rounded-xl px-4 py-3"
          />

          <input
            value={editUser.email}
            onChange={(e)=>setEditUser({
              ...editUser,
              email:e.target.value
            })}
            className="w-full bg-slate-800 rounded-xl px-4 py-3"
          />

          <select
            value={editUser.role}
            onChange={(e)=>setEditUser({
              ...editUser,
              role:e.target.value
            })}
            className="w-full bg-slate-800 rounded-xl px-4 py-3"
          >
            <option value="ADMIN">
              ADMIN
            </option>

            <option value="SUPERADMIN">
              SUPERADMIN
            </option>
          </select>

          <button
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
          >
            Änderungen speichern
          </button>

        </form>

      )}






      <div className="mt-10 space-y-4">

        {users.map((user)=>(

          <motion.div
            key={user.id}
            initial={{opacity:0}}
            animate={{opacity:1}}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex justify-between items-center"
          >

            <div>

              <h2 className="text-xl font-bold">
                {user.name}
              </h2>

              <p className="text-slate-400">
                {user.email}
              </p>

            </div>

            <div className="flex gap-3 items-center">

              <span className="bg-blue-600 px-4 py-2 rounded-xl">
                {user.role}
              </span>

              {isSuperAdmin && (
                <>
                  <button
                    onClick={()=>setEditUser(user)}
                    className="bg-slate-700 px-4 py-2 rounded-xl"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={()=>deleteUser(user.id)}
                    className="bg-red-600 px-4 py-2 rounded-xl"
                  >
                    🗑️
                  </button>
                </>
              )}

            </div>

          </motion.div>

        ))}

      </div>

    </main>

  );

}