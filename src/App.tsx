import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Code, Github, ExternalLink, Mail, Globe, Box, Layers, Cpu, Container, Palette, Sparkles, CheckSquare, Layout, Rocket, Lock, Share2, Feather, Linkedin, Database, X, ChevronLeft, ChevronRight, Music, BookOpen, Activity } from 'lucide-react';
import profileImage from '../assets/image.png';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const FranceFlag = () => (
  <svg width="16" height="12" viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
    <rect width="1" height="2" fill="#002395" />
    <rect x="1" width="1" height="2" fill="#FFF" />
    <rect x="2" width="1" height="2" fill="#ED2939" />
  </svg>
);

const UKFlag = () => (
  <svg width="16" height="12" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" strokeWidth="4" clipPath="url(#clip)" />
    <rect y="12" width="60" height="6" fill="#fff" />
    <rect y="13" width="60" height="4" fill="#c8102e" />
    <rect x="24" width="12" height="30" fill="#fff" />
    <rect x="26" width="8" height="30" fill="#c8102e" />
  </svg>
);

const badges = [
  { title: "Introduction to Cybersecurity", url: "https://www.credly.com/badges/5445de2e-c511-4a64-a180-cea415ac483f", img: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png" },
  { title: "Introduction to Ai", url: "https://www.credly.com/badges/3f692317-db25-42aa-8d92-023640c22eff", img: "https://images.credly.com/images/e2d12302-10f9-40d4-8ff1-066a7008b61d/blob" },
  { title: "Digital Safety and Security Awareness", url: "https://www.credly.com/badges/9b64def7-d226-46c5-ad09-0b30af632da6", img: "https://images.credly.com/images/92d90000-9c96-4dbd-a37d-8c47bf338bca/blob" },
  { title: "Network Technician Career Path", url: "https://www.credly.com/badges/df44b497-ce77-44cd-8b5d-eb287ae08e83", img: "https://images.credly.com/images/978f88dc-c247-4093-9d39-6efac3651297/image.png" },
  { title: "Introduction to IoT", url: "https://www.credly.com/badges/43d821ce-1ebf-40a7-b1b7-452c3b242635", img: "https://images.credly.com/images/fce226c2-0f13-4e17-b60c-24fa6ffd88cb/Intro2IoT.png" },
  { title: "Cisco Hackaton 2026", url: "https://www.credly.com/badges/3b181449-a46f-478f-a3c6-62d227e6acf1", img: "https://images.credly.com/images/7bf55491-f0df-488f-84bf-4d51ada45316/blob" }
];

const TechIcon = ({ tag }: { tag: string }) => {
  const iconMap: Record<string, { type: 'img' | 'lucide', src?: string, icon?: any }> = {
    "Java": { type: 'img', src: "https://cdn.simpleicons.org/java" },
    "Python": { type: 'img', src: "https://cdn.simpleicons.org/python" },
    "C": { type: 'img', src: "https://cdn.simpleicons.org/c" },
    "JavaScript": { type: 'img', src: "https://cdn.simpleicons.org/javascript" },
    "TypeScript": { type: 'img', src: "https://cdn.simpleicons.org/typescript" },
    "React / Next.js": { type: 'img', src: "https://cdn.simpleicons.org/react" },
    "React": { type: 'img', src: "https://cdn.simpleicons.org/react" },
    "Next.js": { type: 'img', src: "https://cdn.simpleicons.org/nextdotjs/white" },
    "Vue.js": { type: 'img', src: "https://cdn.simpleicons.org/vuedotjs" },
    "Node.js": { type: 'img', src: "https://cdn.simpleicons.org/nodedotjs" },
    "PHP / Laravel": { type: 'img', src: "https://cdn.simpleicons.org/laravel" },
    "PHP": { type: 'img', src: "https://cdn.simpleicons.org/php" },
    "Docker": { type: 'img', src: "https://cdn.simpleicons.org/docker" },
    "Traefik": { type: 'img', src: "https://cdn.simpleicons.org/traefikproxy" },
    "WordPress": { type: 'img', src: "https://cdn.simpleicons.org/wordpress" },
    "phpMyAdmin": { type: 'img', src: "https://cdn.simpleicons.org/phpmyadmin" },
    "Keycloak": { type: 'img', src: "https://cdn.simpleicons.org/keycloak" },
    "Filebeat": { type: 'img', src: "https://cdn.simpleicons.org/beats" },
    "Elasticsearch": { type: 'img', src: "https://cdn.simpleicons.org/elasticsearch" },
    "Logstash": { type: 'img', src: "https://cdn.simpleicons.org/logstash" },
    "Kibana": { type: 'img', src: "https://cdn.simpleicons.org/kibana" },
    "Uptime Kuma": { type: 'img', src: "https://cdn.simpleicons.org/uptimekuma" },
    "Linux (Debian)": { type: 'img', src: "https://cdn.simpleicons.org/debian" },
    "Laravel": { type: 'img', src: "https://cdn.simpleicons.org/laravel" },
    "TailwindCSS": { type: 'img', src: "https://cdn.simpleicons.org/tailwindcss" },
    "MySQL": { type: 'img', src: "https://cdn.simpleicons.org/mysql" },
    "CodeIgniter": { type: 'img', src: "https://cdn.simpleicons.org/codeigniter" },
    "Bootstrap": { type: 'img', src: "https://cdn.simpleicons.org/bootstrap" },
    "Gemini API": { type: 'img', src: "https://cdn.simpleicons.org/googlegemini" },
    "Gemini AI": { type: 'img', src: "https://cdn.simpleicons.org/googlegemini" },
    "PostgreSQL": { type: 'img', src: "https://cdn.simpleicons.org/postgresql" },

    // Fallbacks
    "Architecture Logicielle": { type: 'lucide', icon: Layout },
    "Software Architecture": { type: 'lucide', icon: Layout },
    "Sécurité": { type: 'lucide', icon: Lock },
    "Security Patterns": { type: 'lucide', icon: Lock },
    "Identity Management": { type: 'lucide', icon: Shield },
    "Distributed Systems": { type: 'lucide', icon: Layers },
    "LLM Integration": { type: 'lucide', icon: Cpu },
    "RAG Systems": { type: 'lucide', icon: Database },
    "Prompt Engineering": { type: 'lucide', icon: Feather },
    "IA Générative": { type: 'lucide', icon: Sparkles },
    "Generative AI": { type: 'lucide', icon: Sparkles },
    "Algorithmique": { type: 'lucide', icon: Code },
    "Algorithms": { type: 'lucide', icon: Code },
    "Structures de Données": { type: 'lucide', icon: Container },
    "Data Structures": { type: 'lucide', icon: Container },
    "Optimisation SQL": { type: 'lucide', icon: Database },
    "SQL Optimization": { type: 'lucide', icon: Database },
    "Analyse Métier": { type: 'lucide', icon: CheckSquare },
    "Business Analysis": { type: 'lucide', icon: CheckSquare },
    "UML": { type: 'lucide', icon: Share2 },
    "API REST": { type: 'lucide', icon: Globe },
    "REST APIs": { type: 'lucide', icon: Globe },
    "IP Networks": { type: 'lucide', icon: Share2 },
    "Réseaux IP": { type: 'lucide', icon: Share2 },
    "App Security": { type: 'lucide', icon: Lock },
    "Sécurité applicative": { type: 'lucide', icon: Lock },
    "Security": { type: 'lucide', icon: Lock },
    "SysAdmin": { type: 'lucide', icon: Terminal },
    "Microservices": { type: 'lucide', icon: Box },
    "Micro-services": { type: 'lucide', icon: Box },
    "Design Patterns": { type: 'lucide', icon: Palette },
    "Clean Code": { type: 'lucide', icon: Sparkles },
    "TDD (JUnit/Jest)": { type: 'lucide', icon: CheckSquare },
    "Agile (Scrum)": { type: 'lucide', icon: Rocket },
    "Architecture MVC": { type: 'lucide', icon: Layout },
    "MVC Architecture": { type: 'lucide', icon: Layout },
    "Vector DB": { type: 'lucide', icon: Database },
  };

  const def = iconMap[tag] || { type: 'lucide', icon: Code };

  if (def.type === 'img') {
    return <img src={def.src} alt={tag} className="w-3.5 h-3.5 object-contain" />;
  }

  const IconCmp = def.icon;
  return <IconCmp size={14} className="text-[#8E9299]" />;
};

const sortProjectMedia = (mediaModules: Record<string, string>) =>
  Object.entries(mediaModules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, src]) => src);

const projectMedia = {
  traefikVanguard: sortProjectMedia(
    import.meta.glob('../assets/traefik-vanguard/*.{png,jpg,jpeg,webp,gif,avif}', {
      eager: true,
      import: 'default',
    }) as Record<string, string>
  ),
  roadlyAi: sortProjectMedia(
    import.meta.glob('../assets/roadly/*.{png,jpg,jpeg,webp,gif,avif}', {
      eager: true,
      import: 'default',
    }) as Record<string, string>
  ),
  sportEmpire: sortProjectMedia(
    import.meta.glob('../assets/sport-empire/*.{png,jpg,jpeg,webp,gif,avif}', {
      eager: true,
      import: 'default',
    }) as Record<string, string>
  ),
  healthBridge: sortProjectMedia(
    import.meta.glob('../assets/health-bridge/*.{png,jpg,jpeg,webp,gif,avif}', {
      eager: true,
      import: 'default',
    }) as Record<string, string>
  ),
};

const translations = {
  fr: {
    nav: { experience: "Expérience", projects: "Projets", skills: "Expertise", certifications: "Certifications", contact: "Contact" },
    cta: { contact: "Me contacter", downloadCV: "Télécharger mon CV", viewProjects: "Voir mes projets" },
    hero: {
      role: "Développeur Full Stack · Alternant",
      headline: "Je construis des choses rapides, solides, et qui fonctionnent vraiment.",
      subheadline: "4 ans de freelance, 2 stages, un master en cours — et un diplôme d'ingénieur en vue. Disponible en alternance de 3 ans dès Sept. 2026."
    },
    about: {
      title: "Un peu plus sur moi",
      description: "Je n'ai pas commencé par une formation. J'ai commencé par un client qui avait besoin de quelque chose, et je l'ai construit. Après 4 ans à livrer de vrais projets à de vrais clients sur Fiverr, j'ai réalisé que je voulais aller plus loin — pas juste livrer des features, mais comprendre les systèmes. C'est pour ça que je suis aujourd'hui en Mastère à l'ESGI et que je rejoindrai le CNAM pour mon diplôme d'ingénieur. Je cherche une équipe où les problèmes difficiles sont la norme, pas l'exception.",
      hobbiesTitle: "Ce qui me définit en dehors du code",
      hobbies: [
        { label: "Histoire (1870s-1920s)", desc: "L'époque où le monde a basculé. Ingénieurs, révolutions, premiers systèmes industriels — ça ressemble beaucoup à ce qui se passe avec l'IA aujourd'hui.", icon: "BookOpen" },
        { label: "Piano", desc: "Apprendre le piano, c'est apprendre à décomposer un problème complexe en petits gestes précis. Le même mental qu'en dev.", icon: "Music" },
        { label: "Échanges Interculturels", desc: "J'ai grandi entre cultures différentes. Ça m'apprend à m'adapter, à écouter, et à voir les problèmes autrement.", icon: "Globe" },
        { label: "Sport", desc: "Indispensable pour rester sharp. Et un bon rappel que la régularité bat toujours le talent seul.", icon: "Activity" }
      ]
    },
    experience: {
      title: "Expérience & Formation",
      jobs: [
        {
          role: "Développeur Logiciel (Freelance)",
          company: "Fiverr",
          domain: "Freelance",
          period: "2023 - 2025",
          link: "https://www.fiverr.com/omarnasmi",
          desc: [
            "Développement d'applications desktop sur mesure adaptées aux besoins clients.",
            "Livraison de solutions robustes et maintenables avec une qualité de service notée 4.7/5 sur Fiverr.",
            "Collaboration proactive avec les clients pour cadrer les besoins et garantir la fiabilité des livrables."
          ],
          logo: "https://cdn.simpleicons.org/fiverr"
        },
        {
          role: "Stagiaire Développeur Full Stack",
          company: "Vala Bleu",
          domain: "Hébergement de sites web",
          period: "2024 (2 mois)",
          link: "https://www.vala.ma/",
          desc: [
            "Conception et développement de l'architecture d'une plateforme SaaS de Fitness de A à Z (React/Laravel).",
            "Optimisation des bases de données relationnelles (MySQL) réduisant les temps de réponse de l'API de 25%.",
            "Gestion des livrables en méthode Agile (Scrum) avec respect strict des jalons métiers."
          ],
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQQYhvkWCBwCYVtlq8wX1PGQfs_dm0ei0-Qw&s"
        },
        {
          role: "Stagiaire Développeur Logiciel",
          company: "Chambre d'Agriculture",
          domain: "Administration publique",
          period: "2023 (1 month)",
          link: "https://chambreagriculturesm.com/",
          desc: [
            "Développement d'une application desktop sur mesure (Python, Tkinter) pour l'automatisation de la gestion d'une flotte de 50 véhicules.",
            "Digitalisation complète des processus de saisie manuelle, garantissant la traçabilité et l'intégrité des données via SQLite.",
            "Déploiement et sécurisation de nouveaux équipements informatiques pour le service."
          ],
          logo: "https://www.soussmassa.ma/sites/default/files/partner_visual/logos%20partenaires-13.jpg"
        }
      ],
      education: [
        { degree: "Diplôme d’Ingénieur Informatique", school: "CNAM / ITII Picardie", detail: "Admis pour la rentrée 2026", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36dHmmjf0euqrWzAnuA4Bse7JKiuxDRMrrA&s", link: "https://www.itii-picardie.fr/filieres/informatique-numerique-cybersecurite/" },
        { degree: "Mastère 1 Ingénierie Web", school: "ESGI Reims", detail: "2025 - 2026 (En cours)", logo: "https://d18qa1zi1lagoc.cloudfront.net/profile_pictures/2021/ViN7dniG2IFWOk1KHriewjZjWL3HTx1JkDvghx6O.jpg", link: "https://www.esgi.fr/programmes/ingenierie-web.html" },
        { degree: "Licence Ingénierie Logicielle", school: "Centre d'Excellence - Université Ibnou Zohr", detail: "2024-2025", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgis3cvDz0a8Gd1sGSCxoj8WCJCgIchBh2WA&s", link: "https://ma.linkedin.com/company/tamyouz-fsa" },
        { degree: "DUT en Génie Informatique", school: "Ecole Supérieure de Technologie Agadir", detail: "2022-2024", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuzcHSdQHhNyz_wIXqlZxYnn_UvMLfav960Q&s", link: "https://www.esta.ac.ma/?page_id=117" }
      ]
    },
    skills: {
      title: "Compétences Techniques",
      categories: [
        { name: "Je construis avec", tags: ["React / Next.js", "Vue.js", "Node.js", "PHP / Laravel", "API REST", "Docker"], icon: Globe },
        { name: "J'architecture avec", tags: ["Architecture MVC", "Micro-services", "Design Patterns", "Clean Code", "TDD (JUnit/Jest)", "Agile (Scrum)"], icon: Layout },
        { name: "Je réfléchis en", tags: ["LLM Integration", "RAG Systems", "Prompt Engineering", "IA Générative", "Algorithmique", "Optimisation SQL"], icon: Sparkles }
      ]
    },
    projects: {
      title: "Projets Personnels",
      items: [
        {
          title: "Traefik Vanguard",
          desc: "Conception architecturale d'une passerelle sécurisée distribuée. Implémentation de patterns Zero Trust et gestion centralisée des identités via Keycloak.",
          tags: ["Traefik", "WordPress", "MySQL", "phpMyAdmin", "Keycloak", "Filebeat", "Elasticsearch", "Logstash", "Kibana", "Uptime Kuma"],
          link: "https://github.com/omarnasmi/traefik-vanguard",
          media: projectMedia.traefikVanguard,
          details: [
            "Infrastructure distribuée à haute disponibilité déployée sur de multiples machines virtuelles (Debian).",
            "Orchestration via Docker et sécurisation des flux par Traefik en reverse proxy (renouvellement automatique TLS).",
            "Implémentation d'une architecture Zero Trust avec gestion centralisée des accès et des identités (SSO) via Keycloak."
          ]
        },
        {
          title: "Roadly AI",
          desc: "SaaS e-learning propulsé par Gemini API (RAG). Parcours adaptatifs basés sur l'analyse sémantique des données utilisateurs en temps réel.",
          tags: ["Next.js", "React", "Gemini API", "PostgreSQL", "Vector DB"],
          link: "https://github.com/omarnasmi/roadly-ai",
          media: projectMedia.roadlyAi,
          details: [
            "Plateforme SaaS éducative innovante exploitant l'IA générative (API Gemini) couplée à une base de données vectorielle (Pinecone).",
            "Mise en place d'une architecture RAG (Retrieval-Augmented Generation) pour analyser sémantiquement les requêtes.",
            "Génération de parcours d'apprentissage 100% adaptatifs basés sur les données utilisateurs en temps réel."
          ]
        },
        {
          title: "Sport Empire",
          desc: "Projet de fin d'études (DUT). Plateforme e-commerce et e-learning de fitness avec backoffice complet pour la gestion des ventes de suppléments et tutoriels vidéo.",
          tags: ["Laravel", "React", "TailwindCSS", "MySQL"],
          link: "https://github.com/omarnasmi/sport-empire",
          media: projectMedia.sportEmpire,
          details: [
            "Plateforme web globale intégrant une boutique e-commerce de produits sportifs, des tutoriels d'exercices et des articles spécialisés (sport/nutrition).",
            "Développement d'outils interactifs de calculs de performances et métriques de santé.",
            "Création d'un backoffice complet permettant aux administrateurs de gérer le contenu, le catalogue, les utilisateurs et la newsletter.",
            "Système d'authentification sécurisé et gestion différenciée des rôles (Utilisateurs / Admins)."
          ]
        },
        {
          title: "Health Bridge",
          desc: "Application web de gestion de rendez-vous en ligne pour cabinets médicaux. Interface patient et tableau de bord praticien.",
          tags: ["PHP", "CodeIgniter", "Bootstrap", "MySQL"],
          link: "https://github.com/omarnasmi/health-bridge",
          media: projectMedia.healthBridge,
          details: [
            "Application web intuitive de gestion de rendez-vous médicaux centralisant les opérations de planification de consultations.",
            "Interface de gestion avancée des profils utilisateurs : patients, praticiens et administrateurs cliniques.",
            "Intégration d'un système de messagerie interne et d'outils de personnalisation pour optimiser l'interaction et le suivi médical."
          ]
        }
      ]
    },
    certifications: { title: "Cisco Networking Academy", desc: "Badges et certifications officielles vérifiables" },
    status: "Alternance 3 ans · Disponible Sept. 2026"
  },
  en: {
    nav: { experience: "Experience", projects: "Projects", skills: "Expertise", certifications: "Certifications", contact: "Contact" },
    cta: { contact: "Get in touch", downloadCV: "Download Resume", viewProjects: "View Projects" },
    hero: {
      role: "Full Stack Developer · Apprentice",
      headline: "I build things that are fast, secure, and actually work.",
      subheadline: "4 years of freelance, 2 internships, a Master's in progress — and an engineering degree ahead. Looking for a 3-year apprenticeship from Sept. 2026."
    },
    about: {
      title: "A bit more about me",
      description: "I didn't start with a bootcamp. I started with a client who needed something built, and I figured it out. After 4 years of building real things for real clients on Fiverr, I realized I wanted to go deeper — not just ship features, but understand systems. That's why I'm at ESGI now and heading to CNAM for an engineering degree. I want to be in a team where hard problems are the norm, not the exception.",
      hobbiesTitle: "What defines me outside of code",
      hobbies: [
        { label: "History (1870s-1920s)", desc: "The era when everything shifted. Engineers, revolutions, early industrial systems — sounds a lot like what's happening with AI today.", icon: "BookOpen" },
        { label: "Piano", desc: "Learning piano taught me how to break a complex problem into precise small moves. Same mindset as in dev.", icon: "Music" },
        { label: "Intercultural Exchanges", desc: "I grew up between different cultures. It taught me to adapt, listen, and see problems from unexpected angles.", icon: "Globe" },
        { label: "Sports", desc: "Non-negotiable for staying sharp. And a great reminder that consistency always beats raw talent.", icon: "Activity" }
      ]
    },
    experience: {
      title: "Experience & Education",
      jobs: [
        {
          role: "Software Developer (Freelance)",
          company: "Fiverr",
          domain: "Freelance",
          period: "2023 - 2025",
          link: "https://www.fiverr.com/omarnasmi",
          desc: [
            "Developed custom desktop applications tailored to client requirements.",
            "Delivered robust and maintainable solutions with a 4.7/5 Fiverr service rating.",
            "Collaborated proactively with clients to scope requirements and ensure reliable deliverables."
          ],
          logo: "https://cdn.simpleicons.org/fiverr"
        },
        {
          role: "Full Stack Developer (Intern)",
          company: "Vala Bleu",
          domain: "Web hosting",
          period: "2024 (2 months)",
          link: "https://www.vala.ma/",
          desc: [
            "Designed and developed the architecture of a Fitness SaaS platform from scratch (React/Laravel).",
            "Optimized relational databases (MySQL), reducing API response times by 25%.",
            "Managed deliverables using Agile (Scrum) methodologies, strictly meeting business milestones."
          ],
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQQYhvkWCBwCYVtlq8wX1PGQfs_dm0ei0-Qw&s"
        },
        {
          role: "Software Developer (Intern)",
          company: "Chambre d'Agriculture",
          domain: "Public administration",
          period: "2023 (1 month)",
          link: "https://chambreagriculturesm.com/",
          desc: [
            "Developed a custom desktop application (Python, Tkinter) to automate the management of a 50-vehicle fleet.",
            "Fully digitized manual entry processes, ensuring data traceability and integrity via SQLite.",
            "Deployed and secured new IT equipment for the department."
          ],
          logo: "https://www.soussmassa.ma/sites/default/files/partner_visual/logos%20partenaires-13.jpg"
        }
      ],
      education: [
        { degree: "Computer Engineering Degree", school: "CNAM / ITII Picardie", detail: "Admitted for Fall 2026", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36dHmmjf0euqrWzAnuA4Bse7JKiuxDRMrrA&s", link: "https://www.itii-picardie.fr/filieres/informatique-numerique-cybersecurite/" },
        { degree: "Master 1 in Web Engineering", school: "ESGI Reims", detail: "2025 - 2026 (In progress)", logo: "https://d18qa1zi1lagoc.cloudfront.net/profile_pictures/2021/ViN7dniG2IFWOk1KHriewjZjWL3HTx1JkDvghx6O.jpg", link: "https://www.esgi.fr/programmes/ingenierie-web.html" },
        { degree: "Bachelor in Software Engineering", school: "Excellence Center - Ibnou Zohr University", detail: "2024-2025", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgis3cvDz0a8Gd1sGSCxoj8WCJCgIchBh2WA&s", link: "https://ma.linkedin.com/company/tamyouz-fsa" },
        { degree: "Associate Degree in Computer Science", school: "Higher School of Technology of Agadir", detail: "2022-2024", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuzcHSdQHhNyz_wIXqlZxYnn_UvMLfav960Q&s", link: "https://www.esta.ac.ma/?page_id=117" }
      ]
    },
    skills: {
      title: "Technical Skills",
      categories: [
        { name: "I build with", tags: ["React / Next.js", "Vue.js", "Node.js", "PHP / Laravel", "REST APIs", "Docker"], icon: Globe },
        { name: "I architect with", tags: ["MVC Architecture", "Microservices", "Design Patterns", "Clean Code", "TDD (JUnit/Jest)", "Agile (Scrum)"], icon: Layout },
        { name: "I think in", tags: ["LLM Integration", "RAG Systems", "Prompt Engineering", "Generative AI", "Algorithms", "SQL Optimization"], icon: Sparkles }
      ]
    },
    projects: {
      title: "Personal Projects",
      items: [
        {
          title: "Traefik Vanguard",
          desc: "Architectural design of a secure distributed gateway. Implementation of Zero Trust patterns and centralized identity management via Keycloak.",
          tags: ["Traefik", "WordPress", "MySQL", "phpMyAdmin", "Keycloak", "Filebeat", "Elasticsearch", "Logstash", "Kibana", "Uptime Kuma"],
          link: "https://github.com/omarnasmi/traefik-vanguard",
          media: projectMedia.traefikVanguard,
          details: [
            "High-availability distributed infrastructure deployed across multiple virtual machines (Debian).",
            "Orchestration via Docker and traffic security through Traefik as a reverse proxy (automatic TLS renewal).",
            "Implementation of a Zero Trust architecture with centralized access and identity management (SSO) via Keycloak."
          ]
        },
        {
          title: "Roadly AI",
          desc: "E-learning SaaS powered by Gemini API (RAG). Adaptive learning paths based on real-time user data semantic analysis.",
          tags: ["Next.js", "React", "Gemini API", "PostgreSQL", "Vector DB"],
          link: "https://github.com/omarnasmi/roadly-ai",
          media: projectMedia.roadlyAi,
          details: [
            "Innovative educational SaaS platform leveraging generative AI (Gemini API) coupled with a vector database (Pinecone).",
            "Implementation of a RAG (Retrieval-Augmented Generation) architecture to semantically analyze requests.",
            "Generation of 100% adaptive learning paths based on real-time user data."
          ]
        },
        {
          title: "Sport Empire",
          desc: "End-of-studies project (Associate Degree). Fitness e-commerce and e-learning platform featuring a full backoffice for supplement sales and video tutorials.",
          tags: ["Laravel", "React", "TailwindCSS", "MySQL"],
          link: "https://github.com/omarnasmi/sport-empire",
          media: projectMedia.sportEmpire,
          details: [
            "Comprehensive web platform integrating an e-commerce store for sports products, exercise tutorials, and specialized articles (sport/nutrition).",
            "Development of interactive tools for performance calculations and health metrics.",
            "Creation of a complete backoffice enabling administrators to manage content, catalog, users, and the newsletter.",
            "Secure authentication system and role-based access management (Users / Admins)."
          ]
        },
        {
          title: "Health Bridge",
          desc: "Online appointment management web application for medical clinics. Features a patient interface and a practitioner dashboard.",
          tags: ["PHP", "CodeIgniter", "Bootstrap", "MySQL"],
          link: "https://github.com/omarnasmi/health-bridge",
          media: projectMedia.healthBridge,
          details: [
            "Intuitive medical appointment management web application centralizing consultation scheduling operations.",
            "Advanced profile management interface for users: patients, practitioners, and clinic administrators.",
            "Integration of an internal messaging system and personalization tools to optimize interaction and medical follow-up."
          ]
        }
      ]
    },
    certifications: { title: "Cisco Networking Academy", desc: "Official verifiable badges and certifications" },
    status: "Open to a 3-year apprenticeship · Sept. 2026"
  }
};

const hobbyIconMap = {
  BookOpen,
  Music,
  Globe,
  Activity,
} as const;

type Lang = 'fr' | 'en';

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-[#05050A] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#6366F1]/30 animate-ping" style={{ animationDuration: '2s' }}></div>
          <div className="w-16 h-16 rounded-full border border-[#6366F1] flex items-center justify-center bg-[#6366F1]/10 backdrop-blur-md">
            <Cpu className="text-[#6366F1] w-6 h-6" />
          </div>
        </div>
        <div className="font-mono text-white tracking-[0.2em] uppercase text-sm">
          O. Nasmi <span className="text-[#6366F1] opacity-70">//</span> Engine
        </div>
        <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden mt-2">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#6366F1] to-transparent"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Announcement = ({ message, isVisible, onClose }: { message: string, isVisible: boolean, onClose: () => void }) => {
  const characters = message.split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] h-[36px] px-4 flex items-center justify-center overflow-hidden border-b border-[#6366F1]/20 bg-[#05050A] shadow-2xl"
        >
          {/* Cosmic Galaxy Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Nebula Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-32 h-16 bg-[#6366F1]/10 blur-[30px] rounded-full" />
            <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-40 h-20 bg-[#8B5CF6]/5 blur-[40px] rounded-full" />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6366F1]/5 to-transparent animate-pulse" />

            {[...Array(40)].map((_, i) => {
              const size = Math.random() > 0.8 ? 2 : 1;
              const colors = ['#FFFFFF', '#FFFFFF', '#A5B4FC', '#C4B5FD'];
              const color = colors[Math.floor(Math.random() * colors.length)];

              return (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.1, Math.random() * 0.7 + 0.3, 0.1],
                    scale: [1, size === 2 ? 1.2 : 1.5, 1]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 10
                  }}
                  className="absolute rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    boxShadow: size === 2 ? `0 0 4px ${color}` : 'none',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
                boxShadow: ["0 0 5px #6366F1", "0 0 15px #6366F1", "0 0 5px #6366F1"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#6366F1]"
            />
            <div className="flex">
              {characters.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0.7, color: "rgba(255,255,255,0.7)" }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    color: ["rgba(255,255,255,0.7)", "#ffffff", "rgba(255,255,255,0.7)"],
                    textShadow: [
                      "0 0 0px transparent",
                      "0 0 8px rgba(99,102,241,0.8), 0 0 12px rgba(99,102,241,0.4)",
                      "0 0 0px transparent"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 5,
                    delay: i * 0.04
                  }}
                  className="text-[0.62rem] md:text-[0.7rem] font-mono uppercase tracking-[0.25em] font-medium whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute right-3 p-1 hover:text-white transition-colors text-white/30 z-20"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

type ProjectItem = {
  title: string;
  desc: string;
  tags: string[];
  link: string;
  media: string[];
  details: string[];
};

const ProjectCard = ({ project }: { project: ProjectItem }) => {
  const previewImage = project.media[0];

  return (
    <article className="premium-card p-8 flex flex-col gap-6 group h-full">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20 aspect-video">
        {previewImage ? (
          <img
            src={previewImage}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted text-sm font-mono">
            No preview
          </div>
        )}
      </div>

      <div className="flex justify-between items-start">
        <h3 className="text-[1.4rem] font-serif font-medium text-white group-hover:text-[#6366F1] transition-colors">{project.title}</h3>
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title} repository`}
          onClick={(event) => event.stopPropagation()}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-[#6366F1]/10 group-hover:border-[#6366F1]/30 transition-all"
        >
          <ExternalLink className="w-3 h-3 text-text-muted group-hover:text-white" />
        </a>
      </div>

      <p className="text-[0.9rem] text-text-muted leading-relaxed">{project.desc}</p>

      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
        {project.tags.map((tag, idx) => (
          <span key={idx} className="px-2 py-1 rounded text-[0.65rem] font-mono text-text-muted flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
            <TechIcon tag={tag} />
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

const ProjectModal = ({
  project,
  onClose,
  sourceLabel,
}: {
  project: ProjectItem;
  onClose: () => void;
  sourceLabel: string;
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const hasMultipleMedia = project.media.length > 1;

  const goToPrevImage = () => {
    setActiveImageIndex((current) => (current === 0 ? project.media.length - 1 : current - 1));
  };

  const goToNextImage = () => {
    setActiveImageIndex((current) => (current + 1) % project.media.length);
  };

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm px-4 py-8 md:px-8 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        className="bg-[#0a0a0f] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 flex flex-col gap-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl md:text-3xl font-serif text-white">{project.title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="w-9 h-9 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20 aspect-video">
          {project.media[activeImageIndex] ? (
            <img
              src={project.media[activeImageIndex]}
              alt={`${project.title} preview ${activeImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted text-sm font-mono">
              No preview
            </div>
          )}

          {hasMultipleMedia && (
            <>
              <button
                type="button"
                onClick={goToPrevImage}
                aria-label={`Previous ${project.title} image`}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goToNextImage}
                aria-label={`Next ${project.title} image`}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {project.media.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                    className={`w-2 h-2 rounded-full transition-all ${activeImageIndex === idx ? 'bg-[#6366F1] scale-110' : 'bg-white/50'
                      }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded text-[0.7rem] font-mono text-text-muted bg-white/5 border border-white/10 flex items-center gap-1.5">
              <TechIcon tag={tag} />
              {tag}
            </span>
          ))}
        </div>

        <ul className="flex flex-col gap-3 text-text-muted text-[0.95rem] leading-relaxed">
          {project.details.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6366F1] shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#6366F1]/20 border border-[#6366F1]/40 text-white hover:bg-[#6366F1]/30 transition-colors"
        >
          <Github className="w-4 h-4" />
          {sourceLabel}
        </a>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Lang>('fr');
  const [loading, setLoading] = useState(true);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const projectsCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('omar_lang') as Lang;
    if (saved === 'fr' || saved === 'en') setLang(saved);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onEsc);
    };
  }, [selectedProject]);

  const toggleLang = () => {
    const next = lang === 'fr' ? 'en' : 'fr';
    setLang(next);
    localStorage.setItem('omar_lang', next);
    setSelectedProject(null);
  };

  const t = translations[lang];
  const projectCount = t.projects.items.length;
  const hasMultipleProjects = projectCount > 1;

  const scrollProjects = (direction: 'prev' | 'next') => {
    const container = projectsCarouselRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>('[data-project-slide]');
    if (!firstCard) return;

    const styles = getComputedStyle(container);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0');
    const amount = firstCard.getBoundingClientRect().width + gap;

    container.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="atmosphere-bg"></div>

      <Announcement
        message={t.status}
        isVisible={announcementVisible}
        onClose={() => setAnnouncementVisible(false)}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="min-h-screen flex flex-col items-center relative z-10"
      >
        {/* Navbar */}
        <nav
          className="fixed inset-x-0 z-50 glass-nav transition-all duration-500 ease-in-out"
          style={{ top: announcementVisible ? '36px' : '0' }}
        >
          <div className="max-w-[1000px] w-full mx-auto px-6 h-[72px] flex items-center justify-between">
            <div className="font-serif italic font-semibold text-[1.1rem] tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse"></span>
              Omar Nasmi
            </div>
            <div className="hidden md:flex gap-10 text-[0.75rem] uppercase tracking-widest font-medium text-text-muted">
              <a href="#experience" className="hover:text-white transition-colors duration-300">{t.nav.experience}</a>
              <a href="#skills" className="hover:text-white transition-colors duration-300">{t.nav.skills}</a>
              <a href="#projects" className="hover:text-white transition-colors duration-300">{t.nav.projects}</a>
              <a href="#certifications" className="hover:text-white transition-colors duration-300">{t.nav.certifications}</a>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={toggleLang}
                className="text-[0.7rem] text-text-muted hover:text-white transition-colors flex items-center gap-2 font-mono uppercase bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:border-[#6366F1]/50"
              >
                {lang === 'fr' ? (
                  <>
                    <img src="https://flagcdn.com/w20/gb.png" className="w-4 h-auto rounded-sm" alt="EN" />
                    <span>EN</span>
                  </>
                ) : (
                  <>
                    <img src="https://flagcdn.com/w20/fr.png" className="w-4 h-auto rounded-sm" alt="FR" />
                    <span>FR</span>
                  </>
                )}
              </button>
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 text-[0.62rem] font-mono uppercase tracking-[0.2em] text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lang === 'fr' ? 'Alternance' : 'Hire Me'}</span>
              </div>
              <a
                href="#contact"
                className="hidden md:inline-flex px-5 py-2 rounded bg-white/5 border border-white/10 text-[0.75rem] uppercase tracking-widest font-medium hover:bg-white hover:text-black transition-all duration-300"
              >
                {t.nav.contact}
              </a>
            </div>
          </div>
        </nav>

        <AnimatePresence mode="wait">
          <motion.main
            key={lang}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full max-w-[900px] px-6 pt-[140px] pb-32 flex flex-col gap-32"
          >

            {/* Hero Section */}
            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col items-center text-center gap-6 py-12"
            >
              <motion.div variants={fadeIn} className="relative w-28 h-28 mb-4 rounded-full overflow-hidden border border-white/10 p-1 bg-gradient-to-br from-[#6366F1]/30 to-transparent backdrop-blur-sm">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src={profileImage} alt="Omar Nasmi" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="flex flex-col gap-3">
                <h1 className="text-[3rem] md:text-[4rem] leading-none font-serif font-bold tracking-tight text-white">
                  Omar Nasmi
                </h1>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#6366F1]"></div>
                  <p className="font-mono text-[0.8rem] uppercase tracking-[0.3em] text-[#6366F1] font-semibold">
                    {t.hero.role}
                  </p>
                  <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#6366F1]"></div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-4 flex flex-col gap-3 max-w-[620px]">
                <p className="text-[1.2rem] md:text-[1.35rem] font-serif font-semibold text-white leading-snug">
                  {t.hero.headline}
                </p>
                <p className="text-[0.95rem] text-text-muted leading-relaxed">
                  {t.hero.subheadline}
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-6 flex gap-6 text-text-muted">
                <a href="https://github.com/omarnasmi" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-white hover:border-[#6366F1]/50 transition-all">
                  <Github size={18} />
                </a>
                <a href="https://linkedin.com/in/omar-nasmi" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-white hover:border-[#6366F1]/50 transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="mailto:omarnasmiprofessional@gmail.com" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:text-white hover:border-[#6366F1]/50 transition-all">
                  <Mail size={18} />
                </a>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-4 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/Omar_Nasmi_CV.pdf"
                  download
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-black text-[0.72rem] uppercase tracking-[0.18em] font-bold hover:bg-white/90 transition-colors"
                >
                  {t.cta.downloadCV}
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-white text-[0.72rem] uppercase tracking-[0.18em] font-bold hover:border-[#6366F1]/60 hover:bg-white/5 transition-colors"
                >
                  {t.cta.viewProjects}
                </a>
              </motion.div>
            </motion.section>

            {/* Projects - Proof first, claims later */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              id="projects"
              className="scroll-mt-[100px] flex flex-col gap-12"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4">
                <h2 className="text-[0.75rem] font-mono uppercase tracking-[0.4em] text-[#6366F1] font-semibold">{t.projects.title}</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
              </motion.div>
              <motion.div variants={fadeIn} className="relative left-1/2 w-screen -translate-x-1/2 px-6 md:px-10 lg:px-12">
                {hasMultipleProjects && (
                  <>
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#05050A] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#05050A] to-transparent" />
                    <button
                      type="button"
                      onClick={() => scrollProjects('prev')}
                      aria-label="Previous project"
                      className="absolute left-3 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollProjects('next')}
                      aria-label="Next project"
                      className="absolute right-3 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div
                  ref={projectsCarouselRef}
                  className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  {t.projects.items.map((proj, i) => (
                    <motion.div
                      key={`${proj.title}-${i}`}
                      data-project-slide
                      variants={fadeIn}
                      onClick={() => setSelectedProject(proj)}
                      className="h-full shrink-0 basis-[88%] sm:basis-[72%] md:basis-[52%] lg:basis-[40%] xl:basis-[34%] snap-start cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <ProjectCard project={proj} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.section>

            {/* Experience & Education */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              id="experience"
              className="scroll-mt-[100px] flex flex-col gap-12"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4">
                <h2 className="text-[0.75rem] font-mono uppercase tracking-[0.4em] text-[#6366F1] font-semibold">{t.experience.title}</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-16">
                <div className="flex flex-col gap-12">
                  {t.experience.jobs.map((job, idx) => (
                    <motion.div key={idx} variants={fadeIn} className="flex flex-col gap-3 relative pl-6 border-l border-white/10 hover:border-[#6366F1]/50 transition-colors">
                      <div className="absolute top-2 -left-[4.5px] w-2 h-2 rounded-full bg-[#6366F1]"></div>
                      <div className="flex justify-between items-baseline gap-4">
                        <div className="flex items-center gap-3">
                          {job.logo && <img src={job.logo} alt="" className="w-8 h-8 object-contain rounded-md" />}
                          <h4 className="text-[1.1rem] font-serif font-medium text-white">{job.role}</h4>
                          {job.link && (
                            <a
                              href={job.link}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Visit ${job.company}`}
                              className="w-6 h-6 rounded-full border border-white/10 text-text-muted hover:text-white hover:border-[#6366F1]/50 transition-colors flex items-center justify-center"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <span className="font-mono text-[0.65rem] text-text-muted whitespace-nowrap">{job.period}</span>
                      </div>
                      <div className="text-[0.8rem] text-white/60 uppercase tracking-widest font-semibold">
                        {job.company}{job.domain ? ` • ${job.domain}` : ""}
                      </div>
                      <ul className="mt-2 flex flex-col gap-2">
                        {job.desc.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-[0.85rem] text-text-muted leading-relaxed flex items-start gap-2">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6366F1]/80 shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-col gap-12">
                  {t.experience.education.map((edu, idx) => (
                    <motion.div key={idx} variants={fadeIn} className="flex flex-col gap-3 relative pl-6 border-l border-white/10 hover:border-[#6366F1]/50 transition-colors">
                      <div className="absolute top-2 -left-[4.5px] w-2 h-2 rounded-full bg-white/20"></div>
                      <div className="flex items-center gap-3">
                        {edu.logo && <img src={edu.logo} alt="" className="w-8 h-8 object-contain rounded-md" />}
                        <h4 className="text-[1.1rem] font-serif font-medium text-white">{edu.degree}</h4>
                        {edu.link && (
                          <a
                            href={edu.link}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Visit ${edu.school}`}
                            className="w-6 h-6 rounded-full border border-white/10 text-text-muted hover:text-white hover:border-[#6366F1]/50 transition-colors flex items-center justify-center"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <div className="text-[0.8rem] text-white/60 uppercase tracking-widest font-semibold">{edu.school}</div>
                      <p className="text-[0.75rem] font-mono text-text-muted">{edu.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              id="skills"
              className="scroll-mt-[100px] flex flex-col gap-12"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4">
                <h2 className="text-[0.75rem] font-mono uppercase tracking-[0.4em] text-[#6366F1] font-semibold">{t.skills.title}</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.skills.categories.map((cat, i) => (
                  <motion.div key={i} variants={fadeIn} className="premium-card p-8 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#6366F1]/10 flex items-center justify-center border border-[#6366F1]/20">
                        <cat.icon className="w-4 h-4 text-[#6366F1]" />
                      </div>
                      <h4 className="text-[0.85rem] font-bold uppercase tracking-widest text-white">{cat.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {cat.tags.map((tag, idx) => (
                        <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-[0.75rem] font-mono text-white/80 flex items-center gap-2 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all shadow-sm shadow-black/20">
                          <TechIcon tag={tag} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* About - Human reveal after proof */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              id="about"
              className="scroll-mt-[100px] flex flex-col gap-6"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4">
                <h2 className="text-[0.75rem] font-mono uppercase tracking-[0.4em] text-amber-400/80 font-semibold">{t.about.title}</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-amber-500/20 to-transparent"></div>
              </motion.div>
              <motion.p variants={fadeIn} className="text-[1rem] md:text-[1.05rem] text-text-muted leading-relaxed">
                {t.about.description}
              </motion.p>
              <motion.div variants={fadeIn} className="mt-2 flex flex-col gap-4">
                <h3 className="text-[0.65rem] font-mono uppercase tracking-[0.3em] text-white/60">{t.about.hobbiesTitle}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {t.about.hobbies.map((hobby, idx) => {
                    const HobbyIcon = hobbyIconMap[hobby.icon];
                    return (
                      <article key={idx} className="rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-4 flex items-start gap-3 hover:border-amber-500/25 transition-colors">
                        <div className="w-9 h-9 rounded-lg border border-amber-500/20 bg-amber-500/10 flex items-center justify-center shrink-0">
                          <HobbyIcon className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h4 className="text-[0.85rem] font-semibold text-white">{hobby.label}</h4>
                          <p className="text-[0.8rem] text-text-muted leading-relaxed">{hobby.desc}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </motion.div>
            </motion.section>

            {/* Certifications - Professional Grid */}
            <motion.section
              id="certifications"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="scroll-mt-[100px] flex flex-col gap-12 py-16 border-y border-white/5 transition-all duration-700"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4">
                <h2 className="text-[0.75rem] font-mono uppercase tracking-[0.4em] text-[#6366F1] font-semibold">Badges & Certifications</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
              </motion.div>
              <div className="flex flex-wrap justify-center gap-12">
                {badges.map((badge, i) => (
                  <a key={i} href={badge.url} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 group transform hover:scale-105 transition-all">
                    <div className="w-16 h-16 flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 group-hover:border-[#6366F1]/30 transition-colors shadow-lg shadow-black/40">
                      <img src={badge.img} alt={badge.title} className="w-full h-full object-contain filter drop-shadow-md" />
                    </div>
                    <span className="max-w-[140px] text-center text-[0.6rem] text-white/50 group-hover:text-white transition-colors font-mono uppercase tracking-widest leading-tight">
                      {badge.title}
                    </span>
                  </a>
                ))}
              </div>
            </motion.section>

            {/* Contact */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              id="contact"
              className="scroll-mt-[100px] py-16 flex flex-col items-center text-center gap-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#6366F1]/5 blur-[100px] rounded-full pointer-events-none"></div>
              <div className="flex flex-col gap-3 relative z-10">
                <h2 className="text-[2.5rem] md:text-[3.5rem] font-serif font-medium text-white">
                  {lang === 'fr' ? 'Travaillons ensemble.' : "Let's build something."}
                </h2>
                <p className="text-text-muted text-[1.05rem]">
                  {lang === 'fr'
                    ? 'Je revois quelques opportunités pour Sept. 2026 — si votre équipe est sérieuse, discutons.'
                    : "I'm reviewing a few opportunities for Sept. 2026 — if your team is serious, let's talk."}
                </p>
                <p className="text-[0.72rem] font-mono text-white/30 uppercase tracking-widest mt-1">
                  {lang === 'fr' ? '↳ Réponse sous 24h garantie' : '↳ Response within 24h guaranteed'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
                <a
                  href="mailto:omarnasmiprofessional@gmail.com"
                  className="relative overflow-hidden group px-10 py-4 bg-white text-black text-[0.85rem] uppercase tracking-[0.2em] font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                >
                  <span className="relative z-10">{lang === 'fr' ? 'Écrire un email' : 'Send an email'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </a>
                <a
                  href="https://linkedin.com/in/omar-nasmi"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/15 text-white text-[0.85rem] uppercase tracking-[0.2em] font-bold hover:border-[#6366F1]/50 hover:bg-white/5 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </motion.section>

            <footer className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.65rem] font-mono uppercase tracking-[0.2em] text-text-muted">
              <p>© {new Date().getFullYear()} Omar Nasmi <span className="text-[#6366F1]">//</span> Engineering</p>
              <p>Built from scratch · Every line is intentional.</p>
            </footer>

          </motion.main>
        </AnimatePresence>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              sourceLabel={lang === 'fr' ? 'Voir le code source' : 'View Source Code'}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
