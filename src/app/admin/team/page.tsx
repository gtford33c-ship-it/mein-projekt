"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type TeamMember = {
  id:number;
  name:string;
  position:string;
  image:string;
  description:string;
};

export default function TeamPage(){

  const router = useRouter();

  const [team,setTeam] = useState<TeamMember[]>([]);

  const [showAdd,setShowAdd] = useState(false);

  const [editMember,setEditMember] = useState<TeamMember | null>(null);

  const [name,setName] = useState("");
  const [position,setPosition] = useState("");
  const [description,setDescription] = useState("");
  const [image,setImage] = useState("");

  const [message,setMessage] = useState("");



  async function loadTeam(){

    const res = await fetch("/api/team");

    const data = await res.json();

    if(Array.isArray(data)){
      setTeam(data);
    }

  }

  useEffect(()=>{
    loadTeam();
  },[]);



  async function uploadImage(e:any){

    const file = e.target.files[0];

    if(!file) return;

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    const res = await fetch(
      "/api/upload",
      {
        method:"POST",
        body:formData
      }
    );

    const data = await res.json();

    if(data.url){

      if(editMember){

        setEditMember({
          ...editMember,
          image:data.url
        });

      }else{

        setImage(data.url);

      }

    }

  }



  async function createMember(e:React.FormEvent){

    e.preventDefault();

    await fetch("/api/team",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        name,
        position,
        description,
        image

      })

    });

    setMessage("Teammitglied erstellt ✅");

    setName("");
    setPosition("");
    setDescription("");
    setImage("");

    setShowAdd(false);

    loadTeam();

  }



  async function deleteMember(id:number){

    await fetch("/api/team",{

      method:"DELETE",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        id
      })

    });

    setMessage("Gelöscht ✅");

    loadTeam();

  }



  async function updateMember(e:React.FormEvent){

    e.preventDefault();

    if(!editMember) return;

    await fetch("/api/team",{

      method:"PUT",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(editMember)

    });

    setMessage("Geändert ✅");

    setEditMember(null);

    loadTeam();

  }



  return (

    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">

      <button
        onClick={()=>router.push("/admin")}
        className="bg-slate-800 px-5 py-3 rounded-xl"
      >
        ← Dashboard
      </button>

      <h1 className="text-4xl font-bold mt-8">
        👥 Teamverwaltung
      </h1>

      <p className="text-slate-400 mt-2">
        Teammitglieder und Bilder verwalten
      </p>

      {message && (
        <div className="mt-6 bg-green-600 px-4 py-3 rounded-xl">
          {message}
        </div>
      )}

      <button
        onClick={()=>setShowAdd(!showAdd)}
        className="mt-8 bg-blue-600 px-6 py-3 rounded-xl"
      >
        + Teammitglied hinzufügen
      </button>





      {showAdd && (

        <form
          onSubmit={createMember}
          className="mt-8 bg-slate-900 rounded-3xl p-8 space-y-4"
        >

          <h2 className="text-2xl font-bold">
            Neues Mitglied
          </h2>

          <input
            placeholder="Name"
            value={name}
            onChange={e=>setName(e.target.value)}
            className="w-full bg-slate-800 p-3 rounded-xl"
          />

          <input
            placeholder="Position"
            value={position}
            onChange={e=>setPosition(e.target.value)}
            className="w-full bg-slate-800 p-3 rounded-xl"
          />

          <textarea
            placeholder="Beschreibung"
            value={description}
            onChange={e=>setDescription(e.target.value)}
            className="w-full bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="file"
            onChange={uploadImage}
          />

          {image && (
            <img
              src={image}
              className="w-40 rounded-xl"
            />
          )}

          <button
            className="bg-green-600 px-6 py-3 rounded-xl"
          >
            Speichern
          </button>

        </form>

      )}







      {editMember && (

        <form
          onSubmit={updateMember}
          className="mt-8 bg-slate-900 border border-blue-500 rounded-3xl p-8 space-y-4"
        >

          <h2 className="text-2xl font-bold">
            Teammitglied bearbeiten
          </h2>

          <input
            value={editMember.name}
            onChange={(e)=>
              setEditMember({
                ...editMember,
                name:e.target.value
              })
            }
            className="w-full bg-slate-800 p-3 rounded-xl"
          />

          <input
            value={editMember.position}
            onChange={(e)=>
              setEditMember({
                ...editMember,
                position:e.target.value
              })
            }
            className="w-full bg-slate-800 p-3 rounded-xl"
          />

          <textarea
            value={editMember.description}
            onChange={(e)=>
              setEditMember({
                ...editMember,
                description:e.target.value
              })
            }
            className="w-full bg-slate-800 p-3 rounded-xl"
          />

          <input
            type="file"
            onChange={uploadImage}
          />

          {editMember.image && (
            <img
              src={editMember.image}
              className="w-40 rounded-xl"
            />
          )}

          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-green-600 px-6 py-3 rounded-xl"
            >
              Änderungen speichern
            </button>

            <button
              type="button"
              onClick={()=>setEditMember(null)}
              className="bg-slate-700 px-6 py-3 rounded-xl"
            >
              Abbrechen
            </button>

          </div>

        </form>

      )}







      <div className="grid md:grid-cols-3 gap-6 mt-10">

        {team.map(member=>(

          <motion.div

            key={member.id}

            whileHover={{scale:1.03}}

            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"

          >

            {member.image && (

              <img
                src={member.image}
                className="w-full h-56 object-cover rounded-2xl"
              />

            )}

            <h2 className="text-2xl font-bold mt-5">
              {member.name}
            </h2>

            <p className="text-blue-400">
              {member.position}
            </p>

            <p className="text-slate-400 mt-3">
              {member.description}
            </p>

            <div className="flex gap-3 mt-5">

              <button
                onClick={()=>setEditMember(member)}
                className="bg-slate-700 px-4 py-2 rounded-xl"
              >
                ✏️
              </button>

              <button
                onClick={()=>deleteMember(member.id)}
                className="bg-red-600 px-4 py-2 rounded-xl"
              >
                🗑️
              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </main>

  );

}