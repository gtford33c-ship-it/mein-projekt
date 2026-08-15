export default function Team() {
  const members = [
    {
      name: "Michael Zentgraf",
      role: "Betreuer",
      image: "/images/team/michael.jpg",
    },
    {
      name: "Franziska Lumpe",
      role: "Betreuerin",
      image: "/images/team/franziska.jpg",
    },
    {
      name: "Jan Goldammer",
      role: "Teamleitung",
      image: "/images/team/jan.jpg",
    },
    {
      name: "Erik",
      role: "Ehrenamt",
      image: "/images/team/erik.jpg",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Unser Team
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {members.map((member) => (
            <div
              key={member.name}
              className="bg-slate-50 rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-5">
                <h3 className="font-bold text-xl">
                  {member.name}
                </h3>

                <p className="text-slate-600 mt-2">
                  {member.role}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}