# 🌐 Hirendra's Portfolio

Welcome to my personal portfolio website built using modern frontend technologies. This portfolio highlights my projects, skills, and achievements in web development and beyond.

🔗 **Live Demo**: [https://hirendraportfolio.vercel.app](https://hirendraportfolio.vercel.app)

---


## 🚀 Tech Stack

- **Framework**: React.js (with Vite or CRA)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion / GSAP
- **Routing**: React Router
- **Icons**: Lucide / React Icons
- **Deployment**: GitHub Pages

---

## 🧰 Features

- 🎨 Clean and responsive UI/UX
- 🚀 Smooth transitions and scroll animations
- 🧠 Projects and skills showcase
- 🧑‍💻 About Me & Contact section
- 🌙 Dark mode (optional / add if implemented)

---

## 🛠️ Installation & Setup

To run this project locally:

```bash
# 1. Clone the repo
git clone https://github.com/hirendra007/new_portfolio.git
cd new_portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev   # or npm start (if using CRA)
```

---

## 🪄 Customization Guide

You can personalize your portfolio by editing:

- `src/data/projects.js` → Add/edit your project cards
- `src/data/skills.js` → Add technologies you know
- `src/assets/` → Replace images/logos used in different sections
- `public/resume.pdf` → Add your resume (if linked in the UI)
- `src/components/` → Update or tweak layout and sections
- `src/pages/` → Customize main pages like Home, About, Contact

---

## 📤 Deployment (GitHub Pages)

To deploy your site live using GitHub Pages:

1. Install `gh-pages`:

```bash
npm install gh-pages --save-dev
```

2. In your `package.json`, add:

```json
"homepage": "https://hirendra007.github.io/new_portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

> If you're using CRA, the folder will be `build` instead of `dist`.

3. Deploy it:

```bash
npm run deploy
```

Your site should now be live at your `homepage` URL!

---

## 📧 Connect With Me

- 💼 [LinkedIn](https://www.linkedin.com/in/hirendrabalaji)
- 🐙 [GitHub](https://github.com/hirendra007)
- 📬 Email: hirendrabalaji3@gmail.com

---

## 💖 Acknowledgements

Inspired by creative developers and modern portfolios on the web ✨

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). You're free to use, modify, and distribute it.

---
