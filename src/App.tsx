import { useState, useEffect, useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { Terminal, Shield, Code, Github, ExternalLink, Mail, Globe } from 'lucide-react';

const STIFFNESS = 400;
const DAMPING = 30;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: STIFFNESS, damping: DAMPING } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const MagneticElement = ({ children, className }: { children: ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: STIFFNESS, damping: DAMPING });
  const springY = useSpring(y, { stiffness: STIFFNESS, damping: DAMPING });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: springX, y: springY }} className={className}>
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children, className }: { children: ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-3deg", "3deg"]);
  const springRotateX = useSpring(rotateX, { stiffness: STIFFNESS, damping: DAMPING });
  const springRotateY = useSpring(rotateY, { stiffness: STIFFNESS, damping: DAMPING });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
    
    ref.current.style.setProperty('--mouse-x', `${mouseX}px`);
    ref.current.style.setProperty('--mouse-y', `${mouseY}px`);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
       ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
       style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d", perspective: 1500 }}
       className={className}
    >
       <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d", height: "100%" }}>
         {children}
       </div>
    </motion.div>
  );
};

const badges = [
  { url: "https://www.credly.com/badges/5445de2e-c511-4a64-a180-cea415ac483f", img: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png" },
  { url: "https://www.credly.com/badges/3f692317-db25-42aa-8d92-023640c22eff", img: "https://images.credly.com/images/e2d12302-10f9-40d4-8ff1-066a7008b61d/blob" },
  { url: "https://www.credly.com/badges/9b64def7-d226-46c5-ad09-0b30af632da6", img: "https://images.credly.com/images/92d90000-9c96-4dbd-a37d-8c47bf338bca/blob" },
  { url: "https://www.credly.com/badges/df44b497-ce77-44cd-8b5d-eb287ae08e83", img: "https://images.credly.com/images/978f88dc-c247-4093-9d39-6efac3651297/image.png" },
  { url: "https://www.credly.com/badges/43d821ce-1ebf-40a7-b1b7-452c3b242635", img: "https://images.credly.com/images/fce226c2-0f13-4e17-b60c-24fa6ffd88cb/Intro2IoT.png" }
];

const translations = {
  fr: {
    nav: { experience: "Expérience", projects: "Projets", skills: "Expertise", contact: "Contact" },
    hero: {
      role: "Apprenti Ingénieur Logiciel",
      headline: "Concevoir des systèmes robustes, sécurisés et scalables.",
      subheadline: "Expertise Fullstack avec une forte culture de l'ingénierie et des infrastructures.",
      cta: "Me contacter"
    },
    metrics: [
      { text: "100%", label: "Orienté Qualité & Clean Code" },
      { text: "3", label: "Projets d'envergure déployés" },
      { text: "40%", label: "Gain d'efficacité automatisé" }
    ],
    experience: {
      title: "Expérience & Formation",
      jobs: [
        {
          role: "Stagiaire Développeur Full Stack",
          company: "Vala Bleu",
          period: "2024 (2 mois)",
          desc: "Développement d'une plateforme SaaS de Fitness (React/Laravel). Réduction des temps de réponse API de 25% via optimisation SQL. Conception de modules métiers en environnement Agile (Scrum)."
        },
        {
          role: "Stagiaire Développeur Logiciel",
          company: "Chambre d'Agriculture",
          period: "2023 (1 mois)",
          desc: "Digitalisation complète de la gestion de flotte automobile (+50 véhicules). Automatisation des rapports via Python/SQLite, gain de temps de 40% pour le service."
        }
      ],
      education: [
        { degree: "Diplôme d’Ingénieur Informatique", school: "CNAM / ITII", detail: "2026-2029 (en cours)" },
        { degree: "Licence Ingénierie Logicielle", school: "Université Ibnou Zohr", detail: "2024-2025" },
        { degree: "DUT en Génie Informatique", school: "EST Agadir", detail: "2022-2024" }
      ]
    },
    skills: {
      title: "Compétences Techniques",
      categories: [
        { name: "Ingénierie & Architecture", tags: ["Architecture MVC", "Micro-services", "Design Patterns", "Clean Code", "TDD (JUnit/Jest)", "Agile (Scrum)"], icon: Terminal },
        { name: "Langages de Programmation", tags: ["Java", "Python", "C", "JavaScript", "TypeScript"], icon: Code },
        { name: "Développement Web", tags: ["React / Next.js", "Vue.js", "Node.js", "PHP / Laravel", "API REST"], icon: Globe },
        { name: "Infra & Cybersécurité", tags: ["Docker", "Traefik", "Linux (Debian)", "Réseaux IP", "Sécurité applicative"], icon: Shield }
      ]
    },
    projects: {
      title: "Génie Logiciel",
      items: [
        { title: "Traefik Vanguard", desc: "Infrastructure distribuée multi-VM. Orchestration Docker, TLS auto-géré, IAM via Keycloak. Sécurité \"Zero Trust\".", tags: ["Docker", "Traefik", "SysAdmin", "Security"] },
        { title: "Roadly AI", desc: "SaaS e-learning propulsé par Gemini AI (RAG). Parcours adaptatifs basés sur les données utilisateurs en temps réel.", tags: ["Next.js", "React", "Gemini AI", "PostgreSQL", "Vector DB"] }
      ]
    },
    certifications: { title: "Cisco Networking Academy", desc: "Badges et certifications officielles vérifiables" }
  },
  en: {
    nav: { experience: "Experience", projects: "Projects", skills: "Expertise", contact: "Contact" },
    hero: {
      role: "Software Engineering Apprentice",
      headline: "Designing robust, secure, and scalable systems.",
      subheadline: "Fullstack expertise with a strong engineering and infrastructure culture.",
      cta: "Get in touch"
    },
    metrics: [
      { text: "100%", label: "Quality & Clean Code Oriented" },
      { text: "3", label: "Major deployed projects" },
      { text: "40%", label: "Automated efficiency gain" }
    ],
    experience: {
      title: "Experience & Education",
      jobs: [
        {
          role: "Full Stack Developer (Intern)",
          company: "Vala Bleu",
          period: "2024 (2 months)",
          desc: "Developed a Fitness SaaS platform (React/Laravel). Reduced API response times by 25% via SQL optimization. Designed business modules in an Agile (Scrum) environment."
        },
        {
          role: "Software Developer (Intern)",
          company: "Chambre d'Agriculture",
          period: "2023 (1 month)",
          desc: "Fully digitized the fleet management system (50+ vehicles). Automated reporting via Python/SQLite, saving the department 40% in processing time."
        }
      ],
      education: [
        { degree: "Computer Engineering Degree", school: "CNAM / ITII", detail: "2026-2029" },
        { degree: "Bachelor in Software Engineering", school: "Université Ibnou Zohr", detail: "2024-2025" },
        { degree: "Associate Degree in Computer Science", school: "EST Agadir", detail: "2022-2024" }
      ]
    },
    skills: {
      title: "Technical Competencies",
      categories: [
        { name: "Software Engineering", tags: ["MVC Architecture", "Microservices", "Design Patterns", "Clean Code", "TDD (JUnit/Jest)", "Agile (Scrum)"], icon: Terminal },
        { name: "Programming Languages", tags: ["Java", "Python", "C", "JavaScript", "TypeScript"], icon: Code },
        { name: "Web Development", tags: ["React / Next.js", "Vue.js", "Node.js", "PHP / Laravel", "REST APIs"], icon: Globe },
        { name: "Infra & Cybersecurity", tags: ["Docker", "Traefik", "Linux (Debian)", "IP Networks", "App Security"], icon: Shield }
      ]
    },
    projects: {
      title: "Selected Engineering",
      items: [
        { title: "Traefik Vanguard", desc: "Multi-VM distributed infrastructure. Docker orchestration, self-managed TLS, IAM via Keycloak. Zero Trust Security.", tags: ["Docker", "Traefik", "SysAdmin", "Security"] },
        { title: "Roadly AI", desc: "E-learning SaaS powered by Gemini AI (RAG). Adaptive learning paths based on real-time user data.", tags: ["Next.js", "React", "Gemini AI", "PostgreSQL", "Vector DB"] }
      ]
    },
    certifications: { title: "Cisco Networking Academy", desc: "Official verifiable badges and certifications" }
  }
};

type Lang = 'fr' | 'en';

export default function App() {
  const [lang, setLang] = useState<Lang>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('omar_lang') as Lang;
    if (saved === 'fr' || saved === 'en') setLang(saved);
  }, []);

  const toggleLang = () => {
    const next = lang === 'fr' ? 'en' : 'fr';
    setLang(next);
    localStorage.setItem('omar_lang', next);
  };

  const t = translations[lang];

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 2000], [0, 200]);

  return (
    <>
      <motion.div className="atmosphere-bg bg-[#0A0A0A] fixed inset-0 z-[-1]" style={{ y: backgroundY }} />
      <div className="min-h-screen text-[#FFFFFF] flex flex-col items-center relative z-10 font-sans">
        
        {/* Navbar */}
        <nav className="fixed top-0 inset-x-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-[1280px] w-full mx-auto px-6 h-[82px] flex items-center justify-between">
            <div className="font-bold tracking-[-1px] text-[1.2rem] text-white">
              O. NASMI // ENGINE
            </div>
            <div className="hidden md:flex gap-8 text-[0.85rem] font-medium text-[#8E9299]">
              <a href="#experience" className="hover:text-white transition-colors">{t.nav.experience}</a>
              <a href="#skills" className="hover:text-white transition-colors">{t.nav.skills}</a>
              <a href="#projects" className="hover:text-white transition-colors">{t.nav.projects}</a>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleLang} 
                className="font-mono text-[0.75rem] text-[#8E9299] border border-white/10 px-2.5 py-1 rounded hover:border-[#7C3AED] hover:text-white transition-all uppercase"
              >
                {lang === 'fr' ? 'FR / EN' : 'EN / FR'}
              </button>
              <a 
                href="#contact" 
                className="hidden md:inline-flex px-4 py-2 bg-white/10 border border-white/10 text-white text-[0.85rem] font-medium rounded hover:border-[#7C3AED] transition-colors"
              >
                {t.nav.contact}
              </a>
            </div>
          </div>
        </nav>

        <main className="w-full max-w-[1280px] px-6 pt-[124px] pb-24 grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-16">
          
          {/* Identity Column */}
          <motion.section 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:sticky lg:top-[124px] h-fit"
          >
            <motion.div variants={fadeUpVariants}>
              <div className="relative w-28 h-28 mb-6 rounded-2xl overflow-hidden border border-white/10 group bg-white/[0.02]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/10 to-transparent z-10 mix-blend-overlay"></div>
                <img src="https://picsum.photos/seed/omar/200/200?grayscale" alt="Omar Nasmi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <span className="font-mono text-[#7C3AED] text-[0.85rem] tracking-[1px] uppercase block mb-4">
                {t.hero.role}
              </span>
              <h1 className="text-[2.5rem] leading-[1.1] tracking-[-1.5px] font-bold text-white mb-2">
                Omar Nasmi
              </h1>
              <p className="text-[#8E9299] leading-[1.5] text-[0.95rem]">
                {t.hero.headline} <br/> {t.hero.subheadline}
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="grid grid-cols-2 gap-4 mt-3">
              {t.metrics.map((m, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 p-4 rounded-xl">
                  <span className="text-[1.5rem] font-bold block text-[#7C3AED]">{m.text}</span>
                  <span className="text-[0.7rem] uppercase text-[#8E9299] mt-1 tracking-wide">{m.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUpVariants} className="flex items-center gap-2 text-[0.8rem] text-[#8E9299] mt-4">
              <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full shadow-[0_0_8px_#10B981]"></div>
              Reims, France — {lang === 'fr' ? 'Disponible pour opportunités' : 'Available for opportunities'}
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mt-6 flex gap-3 text-[#8E9299]">
              <MagneticElement>
                <a href="https://github.com/omarnasmi" target="_blank" rel="noreferrer" className="block hover:text-white transition-colors border border-white/10 p-2 rounded-lg bg-white/[0.02]">
                  <Github size={20} />
                </a>
              </MagneticElement>
              <MagneticElement>
                <a href="https://linkedin.com/in/omar-nasmi" target="_blank" rel="noreferrer" className="block hover:text-white transition-colors border border-white/10 p-2 rounded-lg bg-white/[0.02]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
              </MagneticElement>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mt-8 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-[0.75rem] uppercase tracking-[2px] text-[#8E9299] whitespace-nowrap">{t.certifications.title}</h3>
                <span className="h-[1px] flex-grow bg-white/10"></span>
              </div>
              <div className="flex flex-wrap gap-4">
                {badges.map((badge, i) => (
                  <a key={i} href={badge.url} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-lg flex items-center justify-center p-1 hover:border-[#7C3AED] transition-colors">
                    <img src={badge.img} alt="Credly Badge" className="max-w-full max-h-full object-contain" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.section>

          {/* Content Column */}
          <section className="flex flex-col gap-16">
            
            {/* Projects */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariants} id="projects" className="scroll-mt-[124px]">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-[0.75rem] uppercase tracking-[2px] text-[#8E9299] whitespace-nowrap">{t.projects.title}</h3>
                <span className="h-[1px] flex-grow bg-white/10"></span>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {t.projects.items.map((proj, i) => (
                  <TiltCard key={i} className="bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 p-6 rounded-2xl relative transition-colors hover:border-[#7C3AED] group">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-[1.1rem] font-medium text-white">{proj.title}</h4>
                      <ExternalLink className="w-4 h-4 text-[#8E9299] group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-[0.85rem] text-[#8E9299] leading-[1.5] mb-6">
                      {proj.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map((tag, idx) => (
                        <span key={idx} className="bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-md text-[0.75rem] font-mono text-white flex items-center gap-2">
                          <span className="text-[8px] text-[#7C3AED]">●</span>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariants} id="skills" className="scroll-mt-[124px]">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-[0.75rem] uppercase tracking-[2px] text-[#8E9299] whitespace-nowrap">{t.skills.title}</h3>
                <span className="h-[1px] flex-grow bg-white/10"></span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {t.skills.categories.map((cat, i) => (
                  <TiltCard key={i} className="bg-white/[0.02] border border-white/10 p-6 rounded-xl hover:border-[#7C3AED]/50 transition-all group flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-[#7C3AED]/20 transition-all"></div>
                    <div className="flex items-center gap-3 mb-5 relative z-10">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#8E9299] group-hover:text-[#7C3AED] group-hover:border-[#7C3AED]/30 transition-colors">
                        <cat.icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-[0.95rem] font-medium text-white">{cat.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {cat.tags.map((tag, idx) => (
                        <span key={idx} className="bg-white/5 border border-white/10 px-2.5 py-1.5 rounded text-[0.75rem] font-mono text-[#D1D5DB] group-hover:border-white/20 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariants} id="experience" className="scroll-mt-[124px]">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-[0.75rem] uppercase tracking-[2px] text-[#8E9299] whitespace-nowrap">{t.experience.title}</h3>
                <span className="h-[1px] flex-grow bg-white/10"></span>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h4 className="font-mono text-[#7C3AED] text-[0.75rem] tracking-[1px] uppercase mb-4 text-opacity-80">
                    {lang === 'fr' ? 'Expérience' : 'Experience'}
                  </h4>
                  {t.experience.jobs.map((job, idx) => (
                    <div key={idx} className="relative pl-5 border-l border-white/10 hover:border-[#7C3AED] transition-colors">
                      <div className="absolute -left-[3.5px] top-1.5 w-[6px] h-[6px] rounded-full bg-[#8E9299]"></div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1 gap-2">
                        <h5 className="text-[0.95rem] font-medium text-white">{job.role}</h5>
                        <span className="text-[0.75rem] font-mono text-[#8E9299] whitespace-nowrap">{job.period}</span>
                      </div>
                      <div className="text-[0.8rem] text-[#7C3AED] mb-2">{job.company}</div>
                      <p className="text-[0.85rem] text-[#8E9299] leading-[1.5]">
                        {job.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <h4 className="font-mono text-[#7C3AED] text-[0.75rem] tracking-[1px] uppercase mb-4 text-opacity-80">
                    {lang === 'fr' ? 'Formation' : 'Education'}
                  </h4>
                  {t.experience.education.map((edu, idx) => (
                    <div key={idx} className="relative pl-5 border-l border-white/10 hover:border-[#7C3AED] transition-colors">
                      <div className="absolute -left-[3.5px] top-1.5 w-[6px] h-[6px] rounded-full bg-[#8E9299]"></div>
                      <h5 className="text-[0.95rem] font-medium text-white mb-1">{edu.degree}</h5>
                      <div className="text-[0.8rem] text-[#7C3AED] mb-2">{edu.school}</div>
                      {edu.detail && <p className="text-[0.8rem] font-mono text-[#8E9299]">{edu.detail}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariants} id="contact" className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-[0.75rem] uppercase tracking-[2px] text-[#8E9299] whitespace-nowrap">
                  {lang === 'fr' ? 'Contact' : 'Contact'}
                </h3>
                <span className="h-[1px] flex-grow bg-white/10"></span>
              </div>
              <div className="bg-gradient-to-br from-[#7C3AED]/10 to-transparent border border-[#7C3AED]/30 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-xl font-medium text-white mb-2">
                    {lang === 'fr' ? 'Prêt à collaborer ?' : 'Ready to collaborate?'}
                  </h4>
                  <p className="text-[#8E9299] text-sm">
                    {lang === 'fr' ? "Ouvert aux opportunités et aux architectures ambitieuses." : "Open to new opportunities and ambitious architectures."}
                  </p>

                </div>
                <MagneticElement>
                  <a 
                    href="mailto:omarnasmiprofessional@gmail.com" 
                    className="flex items-center gap-2 bg-[#7C3AED] text-white px-6 py-3 rounded text-[0.85rem] font-medium hover:bg-[#6D28D9] transition-colors whitespace-nowrap"
                  >
                    <Mail size={16} />
                    {lang === 'fr' ? 'Démarrer une conversation' : 'Start a conversation'}
                  </a>
                </MagneticElement>
              </div>
            </motion.div>

            <footer className="w-full text-center text-[#8E9299] text-xs font-mono flex flex-col gap-2 mt-8">
              <p>O. NASMI // ENGINE © {new Date().getFullYear()}</p>
              <p>Designed with Intent. Built for Scale.</p>
            </footer>

          </section>
        </main>
      </div>
    </>
  );
}
