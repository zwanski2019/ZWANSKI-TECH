
import { ExternalLink, Github, Monitor } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  year: string;
};

const projects: Project[] = [
  {
    id: "zwansave",
    title: "Zwansave Dashboard",
    description: "A Chrome tool developed to optimize memory and CPU usage for improved browser performance.",
    technologies: ["Python", "Chrome Extensions"],
    github: "https://github.com/zwanski2019",
    year: "2024"
  },
  {
    id: "websites",
    title: "Website Development",
    description: "Developed and maintained multiple professional websites for businesses, including elfabspace.net, elspace.co, yabservice.com, and ihstgroup.com.",
    technologies: ["PHP", "WordPress", "HTML", "JavaScript"],
    link: "https://elspace.co",
    year: "2024"
  },
  {
    id: "theme-tracker",
    title: "WordPress Theme Tracker",
    description: "Designed a tool for tracking WordPress themes and updates to efficiently maintain multiple WordPress installations.",
    technologies: ["PHP", "WordPress"],
    github: "https://github.com/zwanski2019",
    year: "2023"
  },
  {
    id: "eurorbit",
    title: "EurOrbit",
    description: "A European weather forecast tool providing accurate and timely weather updates across Europe.",
    technologies: ["HTML", "JavaScript"],
    link: "https://zwanski2019.github.io/eurorbit",
    github: "https://github.com/zwanski2019/eurorbit",
    year: "2022"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <h2 className="section-title">
          My <span className="text-gradient">Projects</span>
        </h2>
        
        <p className="section-subtitle">
          A showcase of my recent work, highlighting my skills in web development, application design, and problem-solving.
        </p>
        
        <div className="responsive-grid responsive-grid-2 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={project.id}
              className="card-safe bg-card rounded-xl overflow-hidden shadow-3d border border-border relative group"
            >
              {/* Project color accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 opacity-50"></div>
              
              {/* 3D effect elements - constrained within card */}
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-primary/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-secondary/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              
              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.year}</p>
                  </div>
                  <div className="flex gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-muted transition-colors touch-optimized"
                        aria-label={`Visit ${project.title} website`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-muted transition-colors touch-optimized"
                        aria-label={`${project.title} GitHub repository`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="mb-6 flex-1">
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Icon display based on project type */}
                <div className="absolute top-4 right-4 opacity-10 text-primary">
                  <Monitor className="h-24 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
