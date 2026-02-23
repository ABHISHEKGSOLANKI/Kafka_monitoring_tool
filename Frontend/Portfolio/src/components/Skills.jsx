import { Code, Server, Database } from "lucide-react";

export default function Skills() {
  const skills = [
    {
      icon: <Code size={40} />,
      title: "Frontend Development",
      desc: "Experienced in HTML, CSS, JavaScript and React. I build responsive, high-performance UI with modern Tailwind-based design."
    },
    {
      icon: <Server size={40} />,
      title: "Backend Development",
      desc: "Strong in Java, Spring Boot, REST APIs and microservices architecture with secure and scalable backend systems."
    },
    {
      icon: <Database size={40} />,
      title: "Database Management",
      desc: "Hands-on with MySQL, PostgreSQL and Kafka-driven data pipelines, focusing on performance and reliability."
    }
  ];

  return (
    <section className="bg-black text-white py-12 h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
          Technical Skills
        </h1>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-2xl transition-all duration-300 
                         hover:scale-105 hover:bg-gray-700 hover:shadow-xl"
            >
              <div className="mb-4 text-green-500">{skill.icon}</div>

              <h3 className="text-xl font-semibold mb-3">
                {skill.title}
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}