# Omar Nasmi — Portfolio

A premium, minimalist one-page portfolio built with **React + TypeScript + Vite**.  
The app showcases projects, experience, skills, certifications, and contact details with a polished animated UI.

## Highlights

- **Bilingual UI**: French/English toggle with language preference persisted in `localStorage`.
- **Animated experience**: entry loader, motion-driven sections, and smooth transitions.
- **Projects carousel + modal**: horizontally scrollable project cards with media gallery and source links.
- **CV download flow**: opens resume in a new tab and triggers direct file download.
- **Responsive design**: optimized for desktop and mobile.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4 + custom CSS utilities
- **Animation**: Motion (`motion/react`)
- **Icons**: Lucide React

## Project Structure

```text
.
├─ src/
│  ├─ App.tsx        # Main portfolio page (sections, translations, interactions)
│  ├─ main.tsx       # React entrypoint
│  └─ index.css      # Theme tokens + global styles
├─ assets/           # CV, profile image, and project media
├─ index.html
└─ package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

The dev server runs on: `http://localhost:3000`

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Type check

```bash
npm run lint
```

## Customization

Main content lives in `src/App.tsx`:

- Profile, navigation labels, and section copy
- FR/EN translations (`translations` object)
- Projects list and metadata
- Certifications badges
- Contact links

Media is loaded from the `assets/` folders and project galleries are resolved automatically.

## Contact

- GitHub: [@omarnasmi](https://github.com/omarnasmi)
- LinkedIn: [omar-nasmi](https://linkedin.com/in/omar-nasmi)
- Email: <omarnasmiprofessional@gmail.com>