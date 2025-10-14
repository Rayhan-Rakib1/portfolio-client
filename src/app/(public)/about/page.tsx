// src/app/(public)/about/page.tsx
import Image from "next/image";

export const metadata = {
  title: "About Me | Rayhan Rakib",
  description:
    "Learn more about Rayhan Rakib — Web Developer, Designer, and Tech Enthusiast.",
};

export default async function AboutPage() {
  // Static Data (can later fetch from CMS or database if needed)
  const aboutData = {
    name: "Rayhan Rakib",
    title: "Full Stack Web Developer",
    bio: `I’m a passionate Web Developer with expertise in building modern, 
          responsive, and scalable web applications using React, Next.js, and Node.js. 
          I love solving problems and learning new technologies every day.`,
    contact: {
      email: "rayhanrakib114@gmail.com",
      phone: "+8801892814965",
      location: "Dhaka, Bangladesh",
    },
    skills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js / Next.js",
      "Node.js / Express.js",
      "MongoDB / Prisma / PostgreSQL",
      "Tailwind CSS",
      "Git / GitHub",
    ],
    experience: [
      {
        company: "Freelance / Self-Employed",
        role: "Full Stack Developer",
        period: "2022 - Present",
        description:
          "Developing modern full-stack web applications, REST APIs, and client dashboards using Next.js, Express, and Prisma.",
      },
      {
        company: "Personal Projects",
        role: "Frontend Developer",
        period: "2020 - 2022",
        description:
          "Built multiple personal projects to strengthen my skills in React, Tailwind CSS, and backend integration.",
      },
    ],
  };

  return (
    <section className="min-h-screen  bg-white dark:bg-gray-900 text-foreground py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 pt-5">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <Image
            src="/images/profile.jpg"
            alt={aboutData.name}
            width={250}
            height={250}
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* About Info */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {aboutData.name}
          </h1>
          <h2 className="text-xl text-primary mb-4">{aboutData.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {aboutData.bio}
          </p>

          {/* Contact Info */}
          <div className="space-y-2 mb-6">
            <p>
              <strong>Email:</strong> {aboutData.contact.email}
            </p>
            <p>
              <strong>Phone:</strong> {aboutData.contact.phone}
            </p>
            <p>
              <strong>Location:</strong> {aboutData.contact.location}
            </p>
          </div>

          {/* Skills */}
          <h3 className="text-2xl font-semibold mb-3">Skills</h3>
          <ul className="flex flex-wrap gap-3 mb-8">
            {aboutData.skills.map((skill) => (
              <li
                key={skill}
                className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
              >
                {skill}
              </li>
            ))}
          </ul>

          {/* Experience */}
          <h3 className="text-2xl font-semibold mb-3">Experience</h3>
          <div className="space-y-5">
            {aboutData.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-primary pl-4">
                <h4 className="text-lg font-bold">{exp.role}</h4>
                <p className="text-sm text-muted-foreground">
                  {exp.company} • {exp.period}
                </p>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
