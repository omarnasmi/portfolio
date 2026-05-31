import { useState, useEffect, lazy, Suspense, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Code, Github, ExternalLink, Mail, Globe, Box, Layers, Cpu, Container, Palette, Sparkles, CheckSquare, Layout, Rocket, Lock, Share2, Feather, Linkedin, Database, X, ChevronLeft, ChevronRight, Music, BookOpen, Activity, Quote, Zap, Server, BarChart3, TestTube, Target, Lightbulb, TrendingUp } from 'lucide-react';
import profileImage from '../assets/others/image.png';
import cvFile from '../assets/cv/ITII - NASMI OMAR - CV Ingénieur Informatique.pdf';

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
    "React & Next.js": { type: 'img', src: "https://cdn.simpleicons.org/react" },
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
    "Tailwind CSS": { type: 'img', src: "https://cdn.simpleicons.org/tailwindcss" },
    "Framer Motion": { type: 'img', src: "https://cdn.simpleicons.org/framer" },
    "Vite": { type: 'img', src: "https://cdn.simpleicons.org/vite" },
    "MySQL": { type: 'img', src: "https://cdn.simpleicons.org/mysql" },
    "CodeIgniter": { type: 'img', src: "https://cdn.simpleicons.org/codeigniter" },
    "Bootstrap": { type: 'img', src: "https://cdn.simpleicons.org/bootstrap" },
    "Gemini API": { type: 'img', src: "https://cdn.simpleicons.org/googlegemini" },
    "Gemini AI": { type: 'img', src: "https://cdn.simpleicons.org/googlegemini" },
    "Gemini 2.5 Pro": { type: 'img', src: "https://cdn.simpleicons.org/googlegemini" },
    "PostgreSQL": { type: 'img', src: "https://cdn.simpleicons.org/postgresql" },
    "MongoDB": { type: 'img', src: "https://cdn.simpleicons.org/mongodb" },
    "Figma": { type: 'img', src: "https://cdn.simpleicons.org/figma" },
    "n8n": { type: 'img', src: "https://cdn.simpleicons.org/n8n" },
    "Firecrawl": { type: 'img', src: "https://www.firecrawl.dev/favicon.png" },
    "Tavily": { type: 'img', src: "https://tavily.com/favicon.ico" },
    "Telegram API": { type: 'img', src: "https://cdn.simpleicons.org/telegram" },
    "LaTeX": { type: 'img', src: "https://cdn.simpleicons.org/latex" },
    "NestJS": { type: 'img', src: "https://cdn.simpleicons.org/nestjs" },
    "Express": { type: 'img', src: "https://cdn.simpleicons.org/express/white" },
    "Node.js (Express/Nest)": { type: 'img', src: "https://cdn.simpleicons.org/nodedotjs" },
    "Node.js (Express / Nest)": { type: 'img', src: "https://cdn.simpleicons.org/nodedotjs" },
    "Grafana": { type: 'img', src: "https://cdn.simpleicons.org/grafana" },
    "Jest": { type: 'img', src: "https://cdn.simpleicons.org/jest" },
    "Linux": { type: 'img', src: "https://cdn.simpleicons.org/linux/white" },
    "SQL (PostgreSQL, MySQL, SQL Server)": { type: 'img', src: "https://cdn.simpleicons.org/postgresql" },
    "Metabase": { type: 'img', src: "https://cdn.simpleicons.org/metabase" },
    "Metabase & Dashboards de KPIs": { type: 'img', src: "https://cdn.simpleicons.org/metabase" },
    "Metabase & KPI Dashboards": { type: 'img', src: "https://cdn.simpleicons.org/metabase" },
    "Modélisation de Données & BI": { type: 'img', src: "https://cdn.simpleicons.org/powerbi" },
    "Data Modeling & BI": { type: 'img', src: "https://cdn.simpleicons.org/powerbi" },
    "Python (Scripting & Data)": { type: 'img', src: "https://cdn.simpleicons.org/python" },
    "Conception de Workflows (n8n)": { type: 'img', src: "https://cdn.simpleicons.org/n8n" },
    "Workflow Design (n8n)": { type: 'img', src: "https://cdn.simpleicons.org/n8n" },
    "Java & PHP": { type: 'img', src: "https://cdn.simpleicons.org/java" },
    "Tests unitaires (Jest, TDD)": { type: 'img', src: "https://cdn.simpleicons.org/jest" },
    "Unit Testing (Jest, TDD)": { type: 'img', src: "https://cdn.simpleicons.org/jest" },
    "Environnement Linux (Serveurs Debian)": { type: 'img', src: "https://cdn.simpleicons.org/debian" },
    "Linux Environment (Debian Servers)": { type: 'img', src: "https://cdn.simpleicons.org/debian" },
    "Traefik & Reverse Proxy": { type: 'img', src: "https://cdn.simpleicons.org/traefikproxy" },
    "Prototypage UI/UX (Figma)": { type: 'img', src: "https://cdn.simpleicons.org/figma" },
    "UI/UX Prototyping (Figma)": { type: 'img', src: "https://cdn.simpleicons.org/figma" },

    // Fallbacks
    "Architecture Logicielle": { type: 'lucide', icon: Layout },
    "Software Architecture": { type: 'lucide', icon: Layout },
    "Sécurité": { type: 'lucide', icon: Lock },
    "Security Patterns": { type: 'lucide', icon: Lock },
    "Identity Management": { type: 'lucide', icon: Shield },
    "Distributed Systems": { type: 'lucide', icon: Layers },
    "LLM Integration": { type: 'lucide', icon: Cpu },
    "Intégration API LLM & Prompt Engineering": { type: 'lucide', icon: Cpu },
    "LLM API Integration & Prompt Engineering": { type: 'lucide', icon: Cpu },
    "RAG Systems": { type: 'lucide', icon: Database },
    "Architectures RAG": { type: 'lucide', icon: Database },
    "RAG Architectures": { type: 'lucide', icon: Database },
    "Architectures RAG & Bases Vectorielles": { type: 'lucide', icon: Database },
    "RAG Architectures & Vector Databases": { type: 'lucide', icon: Database },
    "Automatisation n8n": { type: 'lucide', icon: Zap },
    "n8n Automation": { type: 'lucide', icon: Zap },
    "Prompt Engineering & Copilot": { type: 'lucide', icon: Feather },
    "UI/UX (Figma)": { type: 'lucide', icon: Palette },
    "UI/UX Design (Figma)": { type: 'lucide', icon: Palette },
    "Power BI": { type: 'lucide', icon: BarChart3 },
    "Monitoring (Grafana / Power BI)": { type: 'lucide', icon: BarChart3 },
    "Tests (Jest / TDD)": { type: 'lucide', icon: TestTube },
    "Traefik (Reverse Proxy)": { type: 'lucide', icon: Shield },
    "Docker & Conteneurisation": { type: 'img', src: "https://cdn.simpleicons.org/docker" },
    "Docker & Containerization": { type: 'img', src: "https://cdn.simpleicons.org/docker" },
    "Environnement Linux": { type: 'lucide', icon: Terminal },
    "Linux Environment": { type: 'lucide', icon: Terminal },
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
    "Architecture Logicielle (MVC, Micro-services)": { type: 'lucide', icon: Layout },
    "Software Architecture (MVC, Microservices)": { type: 'lucide', icon: Layout },
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
    return <img src={def.src} alt={tag} width="14" height="14" loading="lazy" decoding="async" className="w-3.5 h-3.5 object-contain" />;
  }

  const IconCmp = def.icon;
  return <IconCmp size={14} className="text-[#8E9299]" />;
};

const sortProjectMedia = (mediaModules: Record<string, string>) =>
  Object.entries(mediaModules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, src]) => src);

const projectMedia = {
  crousti51: sortProjectMedia(
    import.meta.glob('../assets/crousti51/*.{png,jpg,jpeg,webp,gif,avif}', {
      eager: true,
      import: 'default',
    }) as Record<string, string>
  ),
  aiJobScout: sortProjectMedia(
    import.meta.glob('../assets/ai-job-scout/*.{png,jpg,jpeg,webp,gif,avif}', {
      eager: true,
      import: 'default',
    }) as Record<string, string>
  ),
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
      role: "Futur Ingénieur Informatique · Alternant",
      headline: "Je comprends les systèmes de bout en bout — du code au déploiement.",
      subheadline: "2 ans de freelance, 2 stages, un mastère en cours et un diplôme d'ingénieur à venir. Je cherche une alternance de 3 ans dès Sept. 2026 dans une équipe qui construit des choses sérieuses."
    },
    about: {
      title: "Un peu plus sur moi",
      description: "J'ai commencé par le terrain : 2 ans à livrer des projets en freelance, à cadrer des besoins clients, à automatiser des process. Puis 2 stages pour structurer tout ça. Aujourd'hui en mastère à l'ESGI, j'intègre le CNAM en septembre pour un diplôme d'ingénieur informatique. Ce qui me plaît, c'est voir un projet de bout en bout — comprendre le besoin, choisir l'architecture, construire, déployer, et livrer dans les temps.",
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
            "Analyse des besoins clients, cadrage fonctionnel et livraison de solutions sur mesure (desktop & automatisation).",
            "Gestion autonome de projets de bout en bout : de la capture du besoin à la livraison, noté 4.7/5 sur Fiverr.",
            "Développement de scripts d'automatisation (Python, Java) réduisant les tâches manuelles répétitives."
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
          domain: "Secteur public",
          period: "2023 (1 month)",
          link: "https://chambreagriculturesm.com/",
          desc: [
            "Automatisation de la gestion d'une flotte de 50+ véhicules via une application Python/Tkinter sur mesure.",
            "Suppression des saisies manuelles : gain de 40% sur les temps de traitement, traçabilité complète via SQLite.",
            "Déploiement et sécurisation de nouveaux équipements informatiques pour le service."
          ],
          logo: "https://images.seeklogo.com/logo-png/39/2/chambre-dagriculture-de-la-region-sous-massa-logo-png_seeklogo-394654.png"
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
      levels: { 3: "Avancé", 2: "Intermédiaire", 1: "Notions" } as Record<number, string>,
      categories: [
        {
          name: "Data & Observabilité",
          icon: Server,
          skills: [
            { name: "SQL (PostgreSQL, MySQL, SQL Server)", level: 3 },
            { name: "Metabase & Dashboards de KPIs", level: 3 },
            { name: "Modélisation de Données & BI", level: 2 },
            { name: "Python (Scripting & Data)", level: 2 }
          ]
        },
        {
          name: "IA & Automatisation",
          icon: Zap,
          skills: [
            { name: "Conception de Workflows (n8n)", level: 3 },
            { name: "Intégration API LLM & Prompt Engineering", level: 3 },
            { name: "Architectures RAG & Bases Vectorielles", level: 2 }
          ]
        },
        {
          name: "Architecture & Backend",
          icon: Layers,
          skills: [
            { name: "Node.js (Express / Nest)", level: 3 },
            { name: "Architecture Logicielle (MVC, Micro-services)", level: 2 },
            { name: "Java & PHP", level: 2 },
            { name: "Tests unitaires (Jest, TDD)", level: 1 }
          ]
        },
        {
          name: "DevOps & Infrastructure",
          icon: Layers,
          skills: [
            { name: "Environnement Linux (Serveurs Debian)", level: 3 },
            { name: "Docker & Conteneurisation", level: 2 },
            { name: "Traefik & Reverse Proxy", level: 2 }
          ]
        },
        {
          name: "Développement Frontend",
          icon: Code,
          skills: [
            { name: "React & Next.js", level: 3 },
            { name: "TailwindCSS", level: 2 },
            { name: "Prototypage UI/UX (Figma)", level: 2 }
          ]
        }
      ]
    },
    projects: {
      title: "Projets Personnels",
      items: [
        {
          title: "Alternance Hunter",
          desc: "Pipeline d'automatisation intelligent de recherche d'emploi : scraping, évaluation IA des offres, génération automatisée de CV/Lettre en LaTeX et dashboard BI.",
          tags: ["n8n", "PostgreSQL", "Metabase", "Gemini 2.5 Pro", "Docker", "Firecrawl", "Tavily", "Telegram API", "LaTeX"],
          media: projectMedia.aiJobScout, // À adapter
          details: [
            "Orchestration de workflows n8n complexes pour le sourcing quotidien et la génération de candidatures sur-mesure.",
            "Évaluation sémantique et scoring des offres d'alternance via l'API Gemini pour éliminer instantanément les annonces non pertinentes.",
            "Cockpit de pilotage analytique sous Metabase pour visualiser l'entonnoir de prospection en temps réel."
          ],
          sections: [
            {
              icon: "Target",
              title: "Problématique",
              items: [
                "Automatiser la recherche fastidieuse d'offres d'alternance et filtrer le bruit (annonces d'écoles, formats de contrats incompatibles, pages de recherche).",
                "Générer des candidatures (CV et lettres de motivation) hautement personnalisées pour chaque entreprise ciblée sans y consacrer des heures.",
                "Suivre efficacement les métriques de conversion des candidatures."
              ]
            },
            {
              icon: "Layers",
              title: "Architecture & Solution",
              items: [
                "Workflow 'Scout' : Recherche web automatisée via Tavily, scraping ciblé avec Firecrawl, analyse et scoring strict par l'IA Gemini, puis stockage dans une base PostgreSQL.",
                "Workflow 'Generator' : Déclenché via des Webhooks Telegram, l'IA génère le contenu en LaTeX, le compile en PDF via un microservice Docker dédié et prépare le brouillon dans Gmail.",
                "Dashboard BI : Interface Metabase connectée à PostgreSQL pour le suivi des KPIs (entonnoir de conversion, volume quotidien, score de pertinence IA)."
              ]
            },
            {
              icon: "TrendingUp",
              title: "Résultats clés",
              items: [
                "Filtrage automatique de plus de 80% du bruit (déchets, fausses annonces, pages de résultats) avant même l'intervention humaine.",
                "Temps de candidature drastiquement réduit : génération d'un dossier PDF complet et du mail d'accompagnement en quelques secondes via un clic sur Telegram.",
                "Visibilité totale sur les performances de recherche grâce à l'entonnoir analytique (Scouted → Generated → Applied)."
              ]
            },
            {
              icon: "Rocket",
              title: "Futures fonctionnalités",
              items: [
                "Recherche automatisée des recruteurs (scraping LinkedIn/Apollo) pour récupérer le contact direct du Hiring Manager.",
                "Automatisation de l'envoi des e-mails et implémentation d'un système de relance automatique (Follow-up) intégré au workflow.",
                "Mise en place d'un modèle d'IA local (via Ollama) pour réduire la dépendance aux API externes et optimiser les coûts."
              ]
            }
          ]
        },{
  title: "Crousti 51 - Web App & Vitrine",
  desc: "Application web mobile-first pour un restaurant rapide local : UI/UX premium 'app-like', animations fluides et optimisation de la conversion vers les plateformes de livraison.",
  tags: ["React", "Tailwind CSS", "Framer Motion", "Mobile-First", "UI/UX", "Vite"],
  link: "https://crousti51.vercel.app",
  linkLabel: "Voir le site",
  linkIcon: "external",
  media: projectMedia.crousti51, // À adapter selon ta structure de variables
  details: [
    "Conception et développement d'une interface frontend réactive avec un design sombre immersif et des accents visuels dynamiques.",
    "Architecture orientée 'App-like' pour mobile avec barre de navigation fixée et carrousels horizontaux pour une ergonomie optimale.",
    "Mise en conformité juridique complète (mentions légales strictes, SIRET) pour un déploiement et un hébergement sereins en France."
  ],
  sections: [
    {
      icon: "Target",
      title: "Problématique",
      items: [
        "Moderniser l'image numérique du restaurant pour attirer et fidéliser une clientèle locale exigeante.",
        "Remplacer les sites vitrines classiques par une expérience utilisateur fluide sur mobile, similaire à une application native, pour réduire le taux de rebond.",
        "Canaliser efficacement le trafic web directement vers la plateforme de commande (Deliveroo) pour augmenter le volume de ventes."
      ]
    },
    {
      icon: "Layers",
      title: "Architecture & Solution",
      items: [
        "Frontend Mobile-First : Utilisation de React et Tailwind CSS pour une conception 100% responsive, avec un focus drastique sur les zones de cibles tactiles (Touch Targets).",
        "Composants UI/UX Avancés : Implémentation d'une BottomNav collante et de carrousels 'swipeables' pour naviguer dans le menu sans fatigue de défilement vertical.",
        "Animations Stratégiques : Intégration de Framer Motion pour des micro-interactions et des transitions douces (fade-in, slide-up) sans impacter les performances sur smartphone."
      ]
    },
    {
      icon: "TrendingUp",
      title: "Résultats clés",
      items: [
        "Expérience de navigation mobile hautement optimisée, offrant un rendu professionnel qui démarque le restaurant de la concurrence locale.",
        "Mise en valeur premium du catalogue (menus familiaux, accompagnements) avec une hiérarchie visuelle claire et incitative.",
        "Parcours utilisateur sans friction depuis la découverte de la carte jusqu'au clic sur le Call-to-Action de commande."
      ]
    },
    {
      icon: "Rocket",
      title: "Futures fonctionnalités",
      items: [
        "Intégration d'un module de Click & Collect natif pour réduire la dépendance aux plateformes tierces et leurs commissions.",
        "Connexion à un CMS Headless (ex: Strapi) pour permettre au gérant de mettre à jour les prix et les nouveaux plats en toute autonomie.",
        "Déploiement d'un tracker d'événements et d'un dashboard analytique pour monitorer le taux de conversion de la landing page vers Deliveroo."
      ]
    }
  ]
},
        {
          title: "Traefik Vanguard",
          desc: "Infrastructure distribuée haute disponibilité : reverse proxy sécurisé, automatisation TLS, Zero Trust SSO et monitoring complet via ELK Stack.",
          tags: ["Traefik", "WordPress", "MySQL", "phpMyAdmin", "Keycloak", "Filebeat", "Elasticsearch", "Logstash", "Kibana", "Uptime Kuma"],
          link: "https://github.com/omarnasmi/traefik-vanguard",
          media: projectMedia.traefikVanguard,
          details: [
            "Infrastructure distribuée à haute disponibilité déployée sur de multiples machines virtuelles (Debian).",
            "Orchestration via Docker et sécurisation des flux par Traefik en reverse proxy (renouvellement automatique TLS).",
            "Implémentation d'une architecture Zero Trust avec gestion centralisée des accès et des identités (SSO) via Keycloak."
          ],
          sections: [
            {
              icon: "Target",
              title: "Problématique",
              items: [
                "Déployer et maintenir une infrastructure multi-services sur des serveurs distribués sans point de défaillance unique.",
                "Assurer la sécurité des communications inter-services et centraliser la gestion des identités dans un contexte Zero Trust."
              ]
            },
            {
              icon: "Layers",
              title: "Architecture & Solution",
              items: [
                "Infrastructure distribuée à haute disponibilité déployée sur de multiples machines virtuelles (Debian).",
                "Orchestration via Docker et sécurisation des flux par Traefik en reverse proxy avec renouvellement automatique TLS.",
                "Implémentation d'une architecture Zero Trust avec gestion centralisée des accès et des identités (SSO) via Keycloak.",
                "Pipeline d'observabilité complète : Filebeat → Logstash → Elasticsearch → Kibana pour le monitoring en temps réel."
              ]
            },
            {
              icon: "TrendingUp",
              title: "Résultats clés",
              items: [
                "Infrastructure opérationnelle avec zero downtime grâce à la haute disponibilité et au monitoring proactif (Uptime Kuma).",
                "Certificats TLS renouvelés automatiquement — zéro intervention manuelle sur la sécurité des flux.",
                "Authentification centralisée SSO couvrant l'ensemble des services déployés."
              ]
            },
            {
              icon: "Rocket",
              title: "Futures fonctionnalités",
              items: [
                "Mise en place d'un cluster Kubernetes pour remplacer Docker Compose et scaler horizontalement.",
                "Ajout de Prometheus + Grafana pour des dashboards de métriques avancés.",
                "Automatisation CI/CD complète avec GitLab Runner ou GitHub Actions."
              ]
            }
          ]
        },
        {
          title: "Roadly AI",
          desc: "SaaS éducatif exploitant l'IA pour générer des parcours d'apprentissage adaptatifs. Pipeline sémantique (RAG) avec Gemini API et bases vectorielles.",
          tags: ["Next.js", "React", "Gemini API", "PostgreSQL", "Vector DB"],
          link: "https://github.com/omarnasmi/roadly-ai",
          media: projectMedia.roadlyAi,
          details: [
            "Plateforme SaaS éducative innovante exploitant l'IA générative (API Gemini) couplée à une base de données vectorielle (Pinecone).",
            "Mise en place d'une architecture RAG (Retrieval-Augmented Generation) pour analyser sémantiquement les requêtes.",
            "Génération de parcours d'apprentissage 100% adaptatifs basés sur les données utilisateurs en temps réel."
          ],
          sections: [
            {
              icon: "Target",
              title: "Problématique",
              items: [
                "Les parcours d'apprentissage existants sont statiques et non personnalisés — chaque apprenant suit le même chemin indépendamment de son niveau ou de ses objectifs.",
                "L'accès à un tuteur intelligent et adaptatif reste coûteux et peu scalable."
              ]
            },
            {
              icon: "Cpu",
              title: "Pipeline IA & Architecture",
              items: [
                "Plateforme SaaS éducative exploitant l'IA générative (API Gemini) couplée à une base de données vectorielle (Pinecone).",
                "Architecture RAG (Retrieval-Augmented Generation) pour analyser sémantiquement les requêtes et enrichir les réponses avec du contexte pertinent.",
                "Génération de parcours d'apprentissage 100% adaptatifs basés sur les données utilisateurs en temps réel."
              ]
            },
            {
              icon: "TrendingUp",
              title: "Résultats clés",
              items: [
                "Parcours générés dynamiquement et adaptés au profil de chaque apprenant.",
                "Pipeline sémantique fonctionnel avec recherche vectorielle et augmentation contextuelle.",
                "Interface intuitive permettant de visualiser et suivre sa progression en temps réel."
              ]
            },
            {
              icon: "Rocket",
              title: "Futures fonctionnalités",
              items: [
                "Système de quiz adaptatifs générés par IA pour valider chaque étape du parcours.",
                "Intégration de sources éducatives externes (YouTube, documentation officielle) dans le pipeline RAG.",
                "Mode collaboratif permettant aux apprenants de partager et comparer leurs parcours."
              ]
            }
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
          ],
          sections: [
            {
              icon: "Target",
              title: "Contexte",
              items: [
                "Projet de fin d'études (DUT) — concevoir une plateforme web complète répondant à un besoin réel dans le domaine du fitness et de la nutrition.",
                "Objectif : centraliser e-commerce, contenu éducatif et outils interactifs dans une seule plateforme."
              ]
            },
            {
              icon: "Layout",
              title: "Fonctionnalités principales",
              items: [
                "Boutique e-commerce complète pour produits sportifs avec gestion du catalogue, panier et commandes.",
                "Tutoriels d'exercices vidéo et articles spécialisés en sport et nutrition.",
                "Outils interactifs de calculs de performances et métriques de santé (IMC, calories, etc.).",
                "Backoffice complet : gestion du contenu, catalogue, utilisateurs et newsletter.",
                "Système d'authentification sécurisé avec gestion différenciée des rôles (Utilisateurs / Admins)."
              ]
            },
            {
              icon: "TrendingUp",
              title: "Résultats clés",
              items: [
                "Plateforme livrée et fonctionnelle — validée comme projet de fin d'études avec mention.",
                "Architecture MVC propre et maintenable avec séparation claire des responsabilités.",
                "Interface responsive et intuitive testée sur mobile et desktop."
              ]
            },
            {
              icon: "Rocket",
              title: "Futures fonctionnalités",
              items: [
                "Système de recommandation personnalisé basé sur les habitudes d'achat et d'entraînement.",
                "Intégration de paiement en ligne (Stripe) et gestion des abonnements premium.",
                "Programme de fidélité avec système de points et récompenses."
              ]
            }
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
          ],
          sections: [
            {
              icon: "Target",
              title: "Problématique",
              items: [
                "La prise de rendez-vous médicaux reste souvent manuelle et désorganisée — appels téléphoniques, carnets papier, et double-réservations fréquentes.",
                "Manque de communication fluide entre patients et praticiens en dehors des consultations."
              ]
            },
            {
              icon: "Lightbulb",
              title: "Solution",
              items: [
                "Application web intuitive centralisant la planification de consultations et la gestion des profils (patients, praticiens, administrateurs).",
                "Système de messagerie interne pour maintenir le lien patient-praticien entre les rendez-vous.",
                "Outils de personnalisation et de suivi médical intégrés pour optimiser l'expérience utilisateur."
              ]
            },
            {
              icon: "TrendingUp",
              title: "Résultats clés",
              items: [
                "Interface complète et fonctionnelle couvrant l'ensemble du parcours patient (inscription → rendez-vous → suivi).",
                "Gestion avancée des profils avec trois niveaux d'accès distincts.",
                "Architecture MVC robuste et facilement extensible grâce à CodeIgniter."
              ]
            },
            {
              icon: "Rocket",
              title: "Futures fonctionnalités",
              items: [
                "Notifications par email et SMS pour les rappels de rendez-vous.",
                "Intégration d'un système de téléconsultation vidéo.",
                "Tableau de bord analytique pour les praticiens (statistiques de consultation, taux de fréquentation)."
              ]
            }
          ]
        }
      ]
    },
    testimonials: {
      title: "Ce qu'ils disent de mon travail",
      subtitle: "Sélection d'avis issus de mes collaborations en freelance",
      items: [
        {
          text: "Il communique de manière proactive et comprend exactement ce que le client recherche. Un véritable effort pour satisfaire les exigences complexes du projet.",
          author: "Client régulier",
          country: "DE",
          repeat: true
        },
        {
          text: "C'est le deuxième projet qu'Omar réalise pour moi. Comme toujours, il livre un résultat de grande qualité qui dépasse mes attentes initiales.",
          author: "Client régulier",
          country: "US",
          repeat: true
        },
        {
          text: "Excellente collaboration. Il a parfaitement compris le besoin technique et a livré la solution rapidement avec un grand professionnalisme.",
          author: "Client",
          country: "TH",
          repeat: false
        }
      ]
    },
    certifications: { title: "Cisco Networking Academy", desc: "Badges et certifications officielles vérifiables" },
    status: "Alternance 3 ans · Ingénieur Informatique · Sept. 2026"
  },
  en: {
    nav: { experience: "Experience", projects: "Projects", skills: "Expertise", certifications: "Certifications", contact: "Contact" },
    cta: { contact: "Get in touch", downloadCV: "Download Resume", viewProjects: "View Projects" },
    hero: {
      role: "Computer Engineering Student · Apprentice",
      headline: "I understand systems end-to-end — from code to deployment.",
      subheadline: "2 years of freelance, 2 internships, a Master's in progress and an engineering degree ahead. Looking for a 3-year apprenticeship from Sept. 2026 with a team that builds serious things."
    },
    about: {
      title: "A bit more about me",
      description: "I started with the real thing: 2 years delivering projects as a freelancer, scoping client needs, automating processes. Then 2 internships to structure it all. Now pursuing a Master's at ESGI, I'm joining CNAM in September for a computer engineering degree. What I enjoy most is seeing a project end-to-end — understanding the need, choosing the architecture, building, deploying, and delivering on time.",
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
            "Client needs scoping, functional architecture, and delivery of custom automation software solutions.",
            "Managed full project lifecycle autonomously: from requirement capture to delivery, rated 4.7/5 on Fiverr.",
            "Built automation scripts (Python, Java, Bash) to eliminate repetitive manual processes for clients."
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
            "Automated management of a 50+ vehicle fleet via a custom Python/Tkinter desktop application.",
            "Eliminated manual data entry: 40% efficiency gain, full data traceability enforced via SQLite.",
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
      levels: { 3: "Advanced", 2: "Intermediate", 1: "Foundations" } as Record<number, string>,
      categories: [
        {
          name: "Data & Observability",
          icon: Server,
          skills: [
            { name: "SQL (PostgreSQL, MySQL, SQL Server)", level: 3 },
            { name: "Metabase & KPI Dashboards", level: 3 },
            { name: "Data Modeling & BI", level: 2 },
            { name: "Python (Scripting & Data)", level: 2 }
          ]
        },
        {
          name: "AI & Automation",
          icon: Zap,
          skills: [
            { name: "Workflow Design (n8n)", level: 3 },
            { name: "LLM API Integration & Prompt Engineering", level: 3 },
            { name: "RAG Architectures & Vector Databases", level: 2 }
          ]
        },
        {
          name: "Architecture & Backend",
          icon: Layers,
          skills: [
            { name: "Node.js (Express / Nest)", level: 3 },
            { name: "Software Architecture (MVC, Microservices)", level: 2 },
            { name: "Java & PHP", level: 2 },
            { name: "Unit Testing (Jest, TDD)", level: 1 }
          ]
        },
        {
          name: "DevOps & Infrastructure",
          icon: Layers,
          skills: [
            { name: "Linux Environment (Debian Servers)", level: 3 },
            { name: "Docker & Containerization", level: 2 },
            { name: "Traefik & Reverse Proxy", level: 2 }
          ]
        },
        {
          name: "Frontend Development",
          icon: Code,
          skills: [
            { name: "React & Next.js", level: 3 },
            { name: "TailwindCSS", level: 2 },
            { name: "UI/UX Prototyping (Figma)", level: 2 }
          ]
        }
      ]
    },
    projects: {
      title: "Personal Projects",
      items: [
        {
          title: "Traefik Vanguard",
          desc: "High-availability distributed infrastructure: secure reverse proxy, automated TLS, Zero Trust SSO, and full-stack monitoring via ELK Stack.",
          tags: ["Traefik", "WordPress", "MySQL", "phpMyAdmin", "Keycloak", "Filebeat", "Elasticsearch", "Logstash", "Kibana", "Uptime Kuma"],
          link: "https://github.com/omarnasmi/traefik-vanguard",
          media: projectMedia.traefikVanguard,
          details: [
            "High-availability distributed infrastructure deployed across multiple virtual machines (Debian).",
            "Orchestration via Docker and traffic security through Traefik as a reverse proxy (automatic TLS renewal).",
            "Implementation of a Zero Trust architecture with centralized access and identity management (SSO) via Keycloak."
          ],
          sections: [
            {
              icon: "Target",
              title: "The Problem",
              items: [
                "Deploying and maintaining a multi-service infrastructure across distributed servers without a single point of failure.",
                "Ensuring secure inter-service communication and centralizing identity management in a Zero Trust context."
              ]
            },
            {
              icon: "Layers",
              title: "Architecture & Solution",
              items: [
                "High-availability distributed infrastructure deployed across multiple virtual machines (Debian).",
                "Orchestration via Docker and traffic security through Traefik as a reverse proxy with automatic TLS renewal.",
                "Implementation of a Zero Trust architecture with centralized access and identity management (SSO) via Keycloak.",
                "Complete observability pipeline: Filebeat → Logstash → Elasticsearch → Kibana for real-time monitoring."
              ]
            },
            {
              icon: "TrendingUp",
              title: "Key Results",
              items: [
                "Operational infrastructure with zero downtime thanks to high availability and proactive monitoring (Uptime Kuma).",
                "TLS certificates automatically renewed — zero manual intervention on traffic security.",
                "Centralized SSO authentication covering all deployed services."
              ]
            },
            {
              icon: "Rocket",
              title: "Future Features",
              items: [
                "Setting up a Kubernetes cluster to replace Docker Compose and scale horizontally.",
                "Adding Prometheus + Grafana for advanced metrics dashboards.",
                "Complete CI/CD automation with GitLab Runner or GitHub Actions."
              ]
            }
          ]
        },
        {
          title: "Roadly AI",
          desc: "AI-powered educational SaaS for adaptive learning paths. Semantic pipeline (RAG) using Gemini API and vector databases.",
          tags: ["Next.js", "React", "Gemini API", "PostgreSQL", "Vector DB"],
          link: "https://github.com/omarnasmi/roadly-ai",
          media: projectMedia.roadlyAi,
          details: [
            "Innovative educational SaaS platform leveraging generative AI (Gemini API) coupled with a vector database (Pinecone).",
            "Implementation of a RAG (Retrieval-Augmented Generation) architecture to semantically analyze requests.",
            "Generation of 100% adaptive learning paths based on real-time user data."
          ],
          sections: [
            {
              icon: "Target",
              title: "The Problem",
              items: [
                "Existing learning paths are static and non-personalized — every learner follows the same path regardless of their level or goals.",
                "Access to an intelligent, adaptive tutor remains expensive and hard to scale."
              ]
            },
            {
              icon: "Cpu",
              title: "AI Pipeline & Architecture",
              items: [
                "Innovative educational SaaS platform leveraging generative AI (Gemini API) coupled with a vector database (Pinecone).",
                "RAG (Retrieval-Augmented Generation) architecture to semantically analyze requests and enrich responses with relevant context.",
                "Generation of 100% adaptive learning paths based on real-time user data."
              ]
            },
            {
              icon: "TrendingUp",
              title: "Key Results",
              items: [
                "Dynamically generated learning paths adapted to each learner's profile.",
                "Functional semantic pipeline with vector search and contextual augmentation.",
                "Intuitive interface for visualizing and tracking progress in real time."
              ]
            },
            {
              icon: "Rocket",
              title: "Future Features",
              items: [
                "AI-generated adaptive quizzes to validate each step of the learning path.",
                "Integration of external educational sources (YouTube, official documentation) into the RAG pipeline.",
                "Collaborative mode allowing learners to share and compare their learning paths."
              ]
            }
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
          ],
          sections: [
            {
              icon: "Target",
              title: "Context",
              items: [
                "End-of-studies project (Associate Degree) — designing a complete web platform addressing a real need in the fitness and nutrition space.",
                "Goal: centralize e-commerce, educational content, and interactive tools into a single platform."
              ]
            },
            {
              icon: "Layout",
              title: "Core Features",
              items: [
                "Full e-commerce store for sports products with catalog management, cart, and orders.",
                "Video exercise tutorials and specialized articles on sports and nutrition.",
                "Interactive performance calculators and health metrics tools (BMI, calories, etc.).",
                "Complete backoffice: content, catalog, user, and newsletter management.",
                "Secure authentication system with role-based access management (Users / Admins)."
              ]
            },
            {
              icon: "TrendingUp",
              title: "Key Results",
              items: [
                "Platform delivered and fully functional — validated as end-of-studies project with honors.",
                "Clean and maintainable MVC architecture with clear separation of concerns.",
                "Responsive and intuitive interface tested on both mobile and desktop."
              ]
            },
            {
              icon: "Rocket",
              title: "Future Features",
              items: [
                "Personalized recommendation system based on purchase and training habits.",
                "Online payment integration (Stripe) and premium subscription management.",
                "Loyalty program with points and rewards system."
              ]
            }
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
          ],
          sections: [
            {
              icon: "Target",
              title: "The Problem",
              items: [
                "Medical appointment scheduling often remains manual and disorganized — phone calls, paper notebooks, and frequent double-bookings.",
                "Lack of seamless communication between patients and practitioners outside of consultations."
              ]
            },
            {
              icon: "Lightbulb",
              title: "Solution",
              items: [
                "Intuitive web application centralizing consultation scheduling and profile management (patients, practitioners, administrators).",
                "Internal messaging system to maintain the patient-practitioner connection between appointments.",
                "Integrated personalization and medical tracking tools to optimize the user experience."
              ]
            },
            {
              icon: "TrendingUp",
              title: "Key Results",
              items: [
                "Complete and functional interface covering the entire patient journey (registration → appointment → follow-up).",
                "Advanced profile management with three distinct access levels.",
                "Robust and easily extensible MVC architecture powered by CodeIgniter."
              ]
            },
            {
              icon: "Rocket",
              title: "Future Features",
              items: [
                "Email and SMS notifications for appointment reminders.",
                "Integration of a video teleconsultation system.",
                "Analytics dashboard for practitioners (consultation statistics, attendance rates)."
              ]
            }
          ]
        }
      ]
    },
    testimonials: {
      title: "What they say about my work",
      subtitle: "Selected reviews from my freelance collaborations",
      items: [
        {
          text: "He communicates proactively and understands exactly what the client is looking for. A real effort to satisfy complex project requirements.",
          author: "Repeat client",
          country: "DE",
          repeat: true
        },
        {
          text: "This is the second project Omar has completed for me. As always, he delivers a high-quality result that exceeds my initial expectations.",
          author: "Repeat client",
          country: "US",
          repeat: true
        },
        {
          text: "Excellent collaboration. He perfectly understood the technical need and delivered the solution quickly with great professionalism.",
          author: "Client",
          country: "TH",
          repeat: false
        }
      ]
    },
    certifications: { title: "Cisco Networking Academy", desc: "Official verifiable badges and certifications" },
    status: "Open to a 3-year apprenticeship · Computer Engineering · Sept. 2026"
  }
};

const hobbyIconMap = {
  BookOpen,
  Music,
  Globe,
  Activity,
} as const;

const sectionIconMap: Record<string, any> = {
  Target,
  Lightbulb,
  TrendingUp,
  Rocket,
  Layers,
  Cpu,
  Layout,
  Code,
  Zap,
};

type Lang = 'fr' | 'en';

// Loader removed for performance — was adding 1.8s artificial delay to FCP/LCP

const STAR_POSITIONS = Array.from({ length: 8 }, () => ({
  size: Math.random() > 0.5 ? 2 : 1,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  duration: `${3 + Math.random() * 4}s`,
}));

const Announcement = ({ message, isVisible, onClose }: { message: string, isVisible: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] h-[36px] px-4 flex items-center justify-center overflow-hidden border-b border-[#6366F1]/20 bg-[#05050A] shadow-2xl"
        >
          {/* Cosmic Galaxy Background — reduced to 8 CSS-animated stars */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-32 h-16 bg-[#6366F1]/10 blur-[30px] rounded-full" />
            <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-40 h-20 bg-[#8B5CF6]/5 blur-[40px] rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6366F1]/5 to-transparent animate-pulse" />

            {STAR_POSITIONS.map((star, i) => (
              <div
                key={i}
                className="absolute rounded-full announcement-star"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  backgroundColor: star.size === 2 ? '#A5B4FC' : '#FFFFFF',
                  boxShadow: star.size === 2 ? '0 0 4px #A5B4FC' : 'none',
                  top: star.top,
                  left: star.left,
                  animationDelay: star.delay,
                  animationDuration: star.duration,
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] announcement-dot" />
            <span className="announcement-shimmer text-[0.62rem] md:text-[0.7rem] font-mono uppercase tracking-[0.25em] font-medium whitespace-pre">
              {message}
            </span>
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

type ProjectSection = {
  icon: string;
  title: string;
  items: string[];
};

type ProjectItem = {
  title: string;
  desc: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
  linkIcon?: 'github' | 'external';
  media: string[];
  details: string[];
  sections: ProjectSection[];
};

const ProjectCard = ({ project, featured = false }: { project: ProjectItem; featured?: boolean }) => {
  const previewImage = project.media[0];

  if (featured) {
    return (
      <article className="premium-card group h-full overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0 h-full">
          {/* Image Side */}
          <div className="relative overflow-hidden bg-[#0d0d12] min-h-[280px] md:min-h-[420px]">
            {previewImage ? (
              <img
                src={previewImage}
                alt={`${project.title} preview`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted text-sm font-mono">
                No preview
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0a0a0f]/60" />
          </div>

          {/* Content Side */}
          <div className="p-8 md:p-10 flex flex-col justify-center gap-5">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[0.6rem] font-mono uppercase tracking-[0.2em] text-[#6366F1] bg-[#6366F1]/10 border border-[#6366F1]/20">
                Featured
              </span>
            </div>
            <h3 className="text-[1.8rem] md:text-[2.2rem] font-serif font-bold text-white leading-tight group-hover:text-[#6366F1] transition-colors">
              {project.title}
            </h3>
            <p className="text-[0.95rem] text-text-muted leading-relaxed">{project.desc}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.slice(0, 6).map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-[0.65rem] font-mono text-text-muted bg-white/5 border border-white/5 flex items-center gap-1.5">
                  <TechIcon tag={tag} />
                  {tag}
                </span>
              ))}
              {project.tags.length > 6 && (
                <span className="px-2.5 py-1 rounded-md text-[0.65rem] font-mono text-white/30">
                  +{project.tags.length - 6}
                </span>
              )}
            </div>

            <div className="mt-auto pt-4 flex items-center gap-3">
              <span className="text-[0.7rem] font-mono text-[#6366F1] uppercase tracking-[0.15em] group-hover:tracking-[0.25em] transition-all">
                Explore project →
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="premium-card group h-full flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden bg-[#0d0d12] aspect-[16/10]">
        {previewImage ? (
          <img
            src={previewImage}
            alt={`${project.title} preview`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted text-sm font-mono">
            No preview
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-[1.3rem] font-serif font-semibold text-white drop-shadow-lg">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <p className="text-[0.82rem] text-text-muted leading-relaxed line-clamp-2">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded text-[0.6rem] font-mono text-text-muted flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
              <TechIcon tag={tag} />
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 rounded text-[0.6rem] font-mono text-white/25">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
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
  const linkLabel = project.linkLabel ?? sourceLabel;
  const LinkIcon = project.linkIcon === 'external' ? ExternalLink : Github;
  const hasLink = Boolean(project.link);

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
      className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md px-4 py-4 md:px-6 md:py-6 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="bg-[#0a0a0f] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-8 pt-6 pb-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-4">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-white">{project.title}</h3>
            {hasLink && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-[#6366F1]/50 transition-colors flex items-center justify-center"
              >
                <LinkIcon className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="w-9 h-9 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body — two columns on desktop */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid md:grid-cols-[45%_55%] gap-0 min-h-0">
            {/* Left: Image gallery */}
            <div className="md:sticky md:top-0 md:self-start p-5 md:p-6 flex flex-col gap-4">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0d12] h-[220px] md:h-[350px]">
                {project.media[activeImageIndex] ? (
                  <img
                    src={project.media[activeImageIndex]}
                    alt={`${project.title} preview ${activeImageIndex + 1}`}
                    decoding="async"
                    className="w-full h-full object-contain"
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
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNextImage}
                      aria-label={`Next ${project.title} image`}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    {/* Image counter */}
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-[0.6rem] font-mono text-white/70 border border-white/10">
                      {activeImageIndex + 1} / {project.media.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {hasMultipleMedia && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {project.media.map((src, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`Go to image ${idx + 1}`}
                      className={`shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#6366F1] opacity-100 shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                          : 'border-white/10 opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Tech Stack (below thumbnails on desktop) */}
              <div className="hidden md:block pt-2 border-t border-white/5">
                <h4 className="text-[0.6rem] font-mono uppercase tracking-[0.3em] text-white/30 mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-[0.65rem] font-mono text-text-muted bg-white/5 border border-white/8 flex items-center gap-1.5">
                      <TechIcon tag={tag} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Content sections */}
            <div className="p-5 md:p-6 md:pl-2 md:border-l border-white/5 flex flex-col gap-1">
              {/* Description */}
              <p className="text-[0.9rem] text-text-muted leading-relaxed mb-4 pb-4 border-b border-white/5">
                {project.desc}
              </p>

              {/* Structured sections */}
              {project.sections.map((section, sIdx) => {
                const SectionIcon = sectionIconMap[section.icon] || Code;
                return (
                  <div key={sIdx} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#6366F1]/10 border border-[#6366F1]/15">
                        <SectionIcon className="w-3.5 h-3.5 text-[#6366F1]" />
                      </div>
                      <h4 className="text-[0.8rem] font-bold uppercase tracking-[0.15em] text-white">
                        {section.title}
                      </h4>
                    </div>
                    <ul className="flex flex-col gap-2.5 pl-10">
                      {section.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2.5 text-[0.85rem] text-text-muted leading-relaxed">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#6366F1]/60 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {sIdx < project.sections.length - 1 && (
                      <div className="mt-4 h-[1px] bg-gradient-to-r from-white/5 via-white/8 to-transparent" />
                    )}
                  </div>
                );
              })}

              {/* Mobile tech stack */}
              <div className="md:hidden pt-4 mt-4 border-t border-white/5">
                <h4 className="text-[0.6rem] font-mono uppercase tracking-[0.3em] text-white/30 mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-[0.65rem] font-mono text-text-muted bg-white/5 border border-white/8 flex items-center gap-1.5">
                      <TechIcon tag={tag} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              {hasLink && (
                <div className="mt-6 pt-4 border-t border-white/5">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#6366F1]/15 border border-[#6366F1]/30 text-white hover:bg-[#6366F1]/25 hover:border-[#6366F1]/50 transition-all text-[0.82rem] font-medium"
                  >
                    <LinkIcon className="w-4 h-4" />
                    {linkLabel}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Lang>('fr');
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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

  useEffect(() => {
    document.documentElement.lang = lang;

    const title =
      lang === 'fr'
        ? 'Omar Nasmi | Développeur Full-Stack & Futur Ingénieur'
        : 'Omar Nasmi | Full-Stack Developer & Engineering Apprentice';
    const description =
      lang === 'fr'
        ? "Portfolio d'Omar Nasmi : projets full-stack, architecture logicielle, DevOps, automatisation et IA."
        : 'Portfolio of Omar Nasmi: full-stack projects, software architecture, DevOps, automation, and AI.';

    document.title = title;

    const setMetaContent = (selector: string, content: string) => {
      const meta = document.querySelector<HTMLMetaElement>(selector);
      if (meta) meta.content = content;
    };

    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
    setMetaContent('meta[property="og:locale"]', lang === 'fr' ? 'fr_FR' : 'en_US');
  }, [lang]);

  const toggleLang = () => {
    const next = lang === 'fr' ? 'en' : 'fr';
    setLang(next);
    localStorage.setItem('omar_lang', next);
    setSelectedProject(null);
  };

  const t = translations[lang];

  const handleCvDownload = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    window.open(cvFile, '_blank', 'noopener,noreferrer');

    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'Omar_Nasmi_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="atmosphere-bg"></div>

      <Announcement
        message={t.status}
        isVisible={announcementVisible}
        onClose={() => setAnnouncementVisible(false)}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
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
                    <img src="https://flagcdn.com/w20/gb.png" width="20" height="15" loading="lazy" decoding="async" className="w-4 h-auto rounded-sm" alt="EN" />
                    <span>EN</span>
                  </>
                ) : (
                  <>
                    <img src="https://flagcdn.com/w20/fr.png" width="20" height="15" loading="lazy" decoding="async" className="w-4 h-auto rounded-sm" alt="FR" />
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
              <motion.div variants={fadeIn} className="relative w-36 h-36 mb-4 rounded-full overflow-hidden border border-white/10 p-1 bg-gradient-to-br from-[#6366F1]/30 to-transparent backdrop-blur-sm">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Omar Nasmi"
                    width="144"
                    height="144"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
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
                  href={cvFile}
                  onClick={handleCvDownload}
                  target="_blank"
                  rel="noreferrer"
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
              className="scroll-mt-[100px] flex flex-col gap-10"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-4">
                <h2 className="text-[0.75rem] font-mono uppercase tracking-[0.4em] text-[#6366F1] font-semibold">{t.projects.title}</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
              </motion.div>

              {/* Featured Project (first item) */}
              {t.projects.items.length > 0 && (
                <motion.div
                  variants={fadeIn}
                  onClick={() => setSelectedProject(t.projects.items[0])}
                  className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                >
                  <ProjectCard project={t.projects.items[0]} featured />
                </motion.div>
              )}

              {/* Grid of remaining projects */}
              {t.projects.items.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {t.projects.items.slice(1).map((proj, i) => (
                    <motion.div
                      key={`${proj.title}-${i}`}
                      variants={fadeIn}
                      onClick={() => setSelectedProject(proj)}
                      className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <ProjectCard project={proj} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>

            {/* Testimonials - Social proof through collaboration */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex flex-col gap-8"
            >
              <motion.div variants={fadeIn} className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <h2 className="text-[0.75rem] font-mono uppercase tracking-[0.4em] text-[#6366F1] font-semibold">{t.testimonials.title}</h2>
                  <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
                </div>
                <p className="text-[0.72rem] font-mono text-white/30 uppercase tracking-widest">
                  {t.testimonials.subtitle}{' '}
                  <a href="https://www.fiverr.com/omarnasmi" target="_blank" rel="noreferrer" className="text-[#6366F1]/60 hover:text-[#6366F1] transition-colors underline underline-offset-2">Fiverr</a>
                </p>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-5">
                {t.testimonials.items.map((review, idx) => (
                  <motion.blockquote
                    key={idx}
                    variants={fadeIn}
                    className="relative rounded-xl border border-white/5 bg-white/[0.02] p-6 flex flex-col gap-4 group hover:border-white/10 transition-colors"
                  >
                    <Quote className="w-4 h-4 text-white/10 absolute top-5 right-5" />
                    <p className="text-[0.88rem] text-text-muted leading-relaxed italic font-serif">
                      "{review.text}"
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-3 border-t border-white/5">
                      <img
                        src={`https://flagcdn.com/w20/${review.country.toLowerCase()}.png`}
                        alt={review.country}
                        width="20"
                        height="15"
                        loading="lazy"
                        decoding="async"
                        className="w-4 h-auto rounded-sm opacity-60"
                      />
                      <span className="text-[0.72rem] font-mono text-white/40 uppercase tracking-widest">{review.author}</span>
                      {review.repeat && (
                        <span className="ml-auto text-[0.6rem] font-mono uppercase tracking-widest text-emerald-400/50 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                          {lang === 'fr' ? 'Fidèle' : 'Repeat'}
                        </span>
                      )}
                    </div>
                  </motion.blockquote>
                ))}
              </div>
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
                          {job.logo && (
                            <img
                              src={job.logo}
                              alt=""
                              width="32"
                              height="32"
                              loading="lazy"
                              decoding="async"
                              className="w-8 h-8 object-contain rounded-md"
                            />
                          )}
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
                        {edu.logo && (
                          <img
                            src={edu.logo}
                            alt=""
                            width="32"
                            height="32"
                            loading="lazy"
                            decoding="async"
                            className="w-8 h-8 object-contain rounded-md"
                          />
                        )}
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
                {t.skills.categories.map((cat, i) => {
                  const isAI = i === 2;
                  const sortedSkills = [...cat.skills].sort((a, b) => b.level - a.level);

                  return (
                    <motion.div
                      key={i}
                      variants={fadeIn}
                      className="premium-card p-8 flex flex-col gap-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border bg-[#6366F1]/10 border-[#6366F1]/20">
                          <cat.icon className="w-4 h-4 text-[#6366F1]" />
                        </div>
                        <h4 className="text-[0.85rem] font-bold uppercase tracking-widest text-white">
                          {cat.name}
                          {isAI && <span className="ml-2">⚡</span>}
                        </h4>
                      </div>
                      <div className="flex flex-col gap-4">
                        {sortedSkills.map((skill, idx) => {
                          const levelLabel = t.skills.levels[skill.level];
                          const levelColors = {
                            3: { segment: 'bg-emerald-400', glow: 'shadow-emerald-400/40', text: 'text-emerald-400', border: 'border-emerald-400/20' },
                            2: { segment: 'bg-[#818CF8]', glow: 'shadow-[#818CF8]/30', text: 'text-[#818CF8]', border: 'border-[#818CF8]/20' },
                            1: { segment: 'bg-white/50', glow: '', text: 'text-white/50', border: 'border-white/10' }
                          };
                          const colors = levelColors[skill.level as keyof typeof levelColors];
                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-4 py-3 border-b border-white/[0.04] last:border-0 group"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <TechIcon tag={skill.name} />
                                <span className="text-[0.82rem] text-white/90 font-medium truncate">{skill.name}</span>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3].map((seg) => (
                                    <div
                                      key={seg}
                                      className={`h-[6px] rounded-full transition-all duration-500 ${
                                        seg <= skill.level
                                          ? `${colors.segment} ${seg === skill.level ? colors.glow : ''} ${seg === 3 ? 'w-5' : seg === 2 ? 'w-4' : 'w-3'} shadow-sm`
                                          : 'w-3 bg-white/[0.06]'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className={`text-[0.65rem] font-mono uppercase tracking-wider ${colors.text} w-[5.5rem] text-right`}>
                                  {levelLabel}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
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
                      <img
                        src={badge.img}
                        alt={badge.title}
                        width="64"
                        height="64"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain filter drop-shadow-md"
                      />
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
                  {lang === 'fr' ? 'Une alternance, pas juste un stage.' : "An apprenticeship, not just an internship."}
                </h2>
                <p className="text-text-muted text-[1.05rem]">
                  {lang === 'fr'
                    ? 'Je recherche une alternance de 3 ans dès septembre 2026 — Je cherche une équipe où je pourrai apprendre vite, contribuer concrètement, et évoluer pendant 3 ans sur des projets réels.'
                    : "I'm looking for a 3-year apprenticeship starting September 2026 — I'm looking for a team where I can learn fast, contribute meaningfully, and grow over 3 years on real projects."}
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
