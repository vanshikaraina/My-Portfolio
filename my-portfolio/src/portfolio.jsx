import { useState, useEffect, useRef } from "react";
import "./portfolio.css";

const NAV_LINKS = ["About", "Skills", "Projects", "Education", "Resume", "Contact"];

const SKILLS = [
  { title: "Languages", emoji: "💻", color: "#ff3cac", tags: ["Java", "Python", "C++", "C", "JavaScript"] },
  { title: "Frontend", emoji: "🌐", color: "#3b82f6", tags: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "TypeScript"] },
  { title: "Backend", emoji: "⚙️", color: "#10b981", tags: ["Node.js", "Express.js", "REST APIs"] },
  { title: "Databases", emoji: "🗄️", color: "#ef4444", tags: ["MySQL", "MongoDB", "Supabase"] },
  { title: "DSA & CS", emoji: "🧠", color: "#f59e0b", tags: ["Data Structures", "Algorithms", "OOP", "DBMS", "OS"] },
  { title: "Tools", emoji: "🛠️", color: "#8b5cf6", tags: ["Git & GitHub", "VS Code", "Postman", "Figma", "Linux"] },
];

const PROJECTS = [
  {
    emoji: "🛒", title: "E-Commerce Platform", color: "#ff3cac",
    desc: "Full-stack shopping app with product listings, cart, user auth, and payment integration using MERN stack.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    emoji: "💬", title: "Real-time Chat App", color: "#3b82f6",
    desc: "WebSocket-based chat supporting multiple rooms, private messaging, and live user presence tracking.",
    tech: ["Socket.io", "React", "Node.js", "Express"],
  },
  {
    emoji: "📊", title: "DSA Visualizer", color: "#10b981",
    desc: "Interactive tool to visualize sorting algorithms, graph traversals, and data structures for learning.",
    tech: ["JavaScript", "HTML Canvas", "CSS"],
  },
  {
    emoji: "🧠", title: "Study Planner App", color: "#f59e0b",
    desc: "Productivity app to schedule sessions, set goals, track progress, and manage academic workload.",
    tech: ["React", "Tailwind", "Firebase"],
  },
];

const ACHIEVEMENTS = [
  { icon: "💡", title: "LeetCode 300+ Problems", desc: "Consistent problem solver, rated 1507 on LeetCode" },
  { icon: "🎖️", title: "Add Your Achievement", desc: "Description of the achievement goes here" },
];

const CONTACT_LINKS = [
  { icon: "✉️", label: "vanshika8727@gmail.com", href: "mailto:vanshika8727@gmail.com" },
  { icon: "📞", label: "+91 87278 99915", href: "tel:+918727899915" },
  { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/vanshika-raina-845a58295/" },
  { icon: "🐙", label: "GitHub", href: "https://github.com/vanshikaraina" },
  { icon: "🔢", label: "LeetCode", href: "https://leetcode.com/u/vanshika1515/" },
];

/* ── HOOKS ── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.08, ...options }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

/* ── FADE-IN WRAPPER ── */
function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-in ${inView ? "fade-in--visible" : "fade-in--hidden"}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ── SECTION TITLE ── */
function SectionTitle({ children, color }) {
  return (
    <h2 className="section-title" style={color ? { color } : undefined}>
      {children}
    </h2>
  );
}

/* ── MAIN COMPONENT ── */
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const px = isMobile ? "1.25rem" : isTablet ? "2rem" : "3rem";

  return (
    <div>

      {/* ── NAV ── */}
      <nav className={`navbar ${isMobile ? "navbar--mobile" : ""}`}>
        <span className="navbar__logo">
          VR<span className="navbar__logo-dot">.</span>
        </span>

        {/* Desktop nav links */}
        {!isMobile && (
          <div className="navbar__links">
            {NAV_LINKS.map(l => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className={`navbar__link ${activeNav === l ? "navbar__link--active" : ""}`}
              >
                {l}
              </button>
            ))}
          </div>
        )}

        {/* Hamburger (mobile only) */}
        {isMobile && (
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span className="hamburger-line" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="hamburger-line" style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </button>
        )}
      </nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      {isMobile && menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((l, i) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className={`mobile-menu__link ${activeNav === l ? "mobile-menu__link--active" : ""}`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section
        id="hero"
        className={`hero ${isMobile ? "hero--mobile" : ""}`}
        style={{ padding: isMobile ? "7rem 1.25rem 4rem" : `8rem ${px} 4rem` }}
      >
        {/* Decorative blobs */}
        {[
          { top: "-120px", right: "5%",  size: isMobile ? 260 : 420, color: "rgba(255,60,172,0.07)" },
          { top: "30%",    left: "-80px", size: isMobile ? 180 : 300, color: "rgba(59,130,246,0.07)" },
          { bottom: "-60px", right: "20%", size: isMobile ? 160 : 260, color: "rgba(16,185,129,0.07)" },
        ].map((b, i) => (
          <div
            key={i}
            className="hero__blob"
            style={{
              width: b.size, height: b.size,
              background: b.color,
              top: b.top, bottom: b.bottom, left: b.left, right: b.right,
            }}
          />
        ))}

        <div className="hero__content">
          <div className="hero__badge">✦ Open to Internships</div>

          <h1 className={`hero__title ${isMobile ? "hero__title--mobile" : ""}`}>
            Hi, I'm{" "}
            <span className="hero__title-gradient">Vanshika Raina</span>
          </h1>

          <p className={`hero__subtitle ${isMobile ? "hero__subtitle--mobile" : ""}`}>
            CSE 3rd Year · <strong style={{ color: "#1a1a1a", fontWeight: 500 }}>DSA</strong> · Full Stack Developer · Building things that matter
          </p>

          <div className="hero__cta">
            <button
              onClick={() => scrollTo("Projects")}
              className={`btn btn--primary ${isMobile ? "btn--mobile" : ""}`}
            >
              🚀 View My Work
            </button>
            <button
              onClick={() => scrollTo("Contact")}
              className={`btn btn--secondary ${isMobile ? "btn--mobile" : ""}`}
            >
              ✉️ Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        className={`about ${isMobile ? "about--mobile" : ""}`}
        style={{ padding: isMobile ? "4rem 1.25rem" : `6rem ${px}` }}
      >
        <FadeIn delay={0.05}><SectionTitle>Who I Am</SectionTitle></FadeIn>

        <div className={`about__grid ${isMobile ? "about__grid--mobile" : ""}`}>
          <FadeIn delay={0.1}>
            <div className="about__text">
              <p>
                Hey! I'm <strong style={{ color: "#1a1a1a" }}>Vanshika</strong>, a 3rd year CSE student who loves building real, working products.
                I'm passionate about <strong style={{ color: "#1a1a1a" }}>Data Structures & Algorithms</strong> and full-stack web development.
              </p>
              <p>
                Whether it's competitive programming or shipping a full-stack project, I bring the same curiosity and energy. I'm actively seeking{" "}
                <strong style={{ color: "#1a1a1a" }}>internship opportunities</strong> where I can contribute and grow.
              </p>
              <p>
                Off-screen, you'll find me exploring new tech, contributing to open source, or grinding LeetCode.
              </p>
            </div>
          </FadeIn>

          <div className="about__stats">
            {[
              { n: "3rd", label: "Year CSE Student", color: "#ff3cac" },
              { n: "10+", label: "Projects Built",   color: "#3b82f6" },
              { n: "300+", label: "DSA Problems Solved", color: "#10b981" },
              { n: "∞",   label: "Curiosity Level",  color: "#f59e0b" },
            ].map((s, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.07}>
                <div className={`stat-card ${isMobile ? "stat-card--mobile" : ""}`}>
                  <div
                    className={`stat-card__number ${isMobile ? "stat-card__number--mobile" : ""}`}
                    style={{ color: s.color }}
                  >
                    {s.n}
                  </div>
                  <div className="stat-card__label">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section
        id="skills"
        className={`skills ${isMobile ? "skills--mobile" : ""}`}
        style={{ padding: isMobile ? "4rem 1.25rem" : `6rem ${px}` }}
      >
        <FadeIn delay={0.05}><SectionTitle>Tech Stack</SectionTitle></FadeIn>
        <div className={`skills__grid ${isMobile ? "skills__grid--mobile" : ""}`}>
          {SKILLS.map((cat, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div
                className="skill-card"
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 12px 36px ${cat.color}22`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="skill-card__bar" style={{ background: cat.color }} />
                <div className="skill-card__header">
                  <span>{cat.emoji}</span> {cat.title}
                </div>
                <div className="skill-card__tags">
                  {cat.tags.map(t => (
                    <span
                      key={t}
                      className="skill-tag"
                      style={{
                        background: `${cat.color}12`,
                        color: cat.color,
                        border: `1px solid ${cat.color}30`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        className={`projects ${isMobile ? "projects--mobile" : ""}`}
        style={{ padding: isMobile ? "4rem 1.25rem" : `6rem ${px}` }}
      >
        <FadeIn delay={0.05}><SectionTitle>Things I've Built</SectionTitle></FadeIn>
        <div className={`projects__grid ${isMobile ? "projects__grid--mobile" : ""}`}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="project-card"
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = `0 20px 50px ${p.color}20`;
                  e.currentTarget.style.borderColor = `${p.color}40`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "#efefef";
                }}
              >
                <div className="project-card__emoji">{p.emoji}</div>
                <div className="project-card__title">{p.title}</div>
                <p className="project-card__desc">{p.desc}</p>
                <div className="project-card__tech">
                  {p.tech.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
                <div className="project-card__links">
                  {["⬡ GitHub", "↗ Live Demo"].map(lbl => (
                    <a
                      key={lbl}
                      href="#"
                      className="project-card__link"
                      style={{ color: p.color }}
                    >
                      {lbl}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section
        id="education"
        className={`education ${isMobile ? "education--mobile" : ""}`}
        style={{ padding: isMobile ? "4rem 1.25rem" : `6rem ${px}` }}
      >
        <FadeIn delay={0.05}><SectionTitle>Background</SectionTitle></FadeIn>

        <div className="education__list">
          {[
            {
              icon: "🎓", degree: "B.E — Computer Science & Engineering",
              school: "Chitkara University, Punjab",
              detail: "CGPA: 9.14 / 10 · DSA, DBMS, OS, CN, Software Engineering",
              year: "2023 – 2027",
            },
            {
              icon: "🏫", degree: "Class XII — Non-Medical",
              school: "Sacred Heart Sr. Sec. School, BRS Nagar, Ludhiana, Punjab",
              detail: "Score: 79.8% · Board: CBSE",
              year: "2023",
            },
          ].map((e, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className={`edu-card ${isMobile ? "edu-card--mobile" : ""}`}>
                <div className="edu-card__icon">{e.icon}</div>
                <div className="edu-card__body">
                  <div className="edu-card__degree">{e.degree}</div>
                  <div className="edu-card__school">{e.school}</div>
                  <div className="edu-card__detail">{e.detail}</div>
                </div>
                <div
                  className="edu-card__year"
                  style={{ marginLeft: isMobile ? "3.5rem" : 0 }}
                >
                  {e.year}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <h3 className="achievements-title">🏆 Achievements</h3>
        </FadeIn>
        <div className={`achievements__grid ${isMobile ? "achievements__grid--mobile" : ""}`}>
          {ACHIEVEMENTS.map((a, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="achievement-card">
                <div className="achievement-card__icon">{a.icon}</div>
                <div>
                  <div className="achievement-card__title">{a.title}</div>
                  <div className="achievement-card__desc">{a.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── RESUME ── */}
      <section
        id="resume"
        className={`resume ${isMobile ? "resume--mobile" : ""}`}
        style={{ padding: isMobile ? "4rem 1.25rem" : `6rem ${px}` }}
      >
        <FadeIn delay={0.05}>
          <SectionTitle color="#5d4141">Download My Resume</SectionTitle>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className={`resume__card ${isMobile ? "resume__card--mobile" : ""}`}>
            <div className="resume__emoji">📄</div>
            <h3 className="resume__title">Vanshika Raina — Resume</h3>
            <p className="resume__desc">
              Get a PDF overview of my skills, projects, education, and experience. Updated for the 2026-27 internship season.
            </p>
            <a href="YOUR_RESUME_LINK_HERE" download className="resume__btn">
              ⬇️ Download Resume (PDF)
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className={`contact ${isMobile ? "contact--mobile" : ""}`}
        style={{ padding: isMobile ? "4rem 1.25rem" : `6rem ${px}` }}
      >
        <FadeIn delay={0.05}>
          <SectionTitle color="#5d4141">Let's Connect ✨</SectionTitle>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="contact__subtitle">
            I'm actively looking for internship opportunities. Whether you have a role, a project idea, or just want to say hi — my inbox is always open!
          </p>
        </FadeIn>
        <div className={`contact__links ${isMobile ? "contact__links--mobile" : ""}`}>
          {CONTACT_LINKS.map((c, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <a
                href={c.href}
                target={c.href.startsWith("mailto") || c.href.startsWith("tel") ? undefined : "_blank"}
                rel="noreferrer"
                className={`contact-link ${isMobile ? "contact-link--mobile" : ""}`}
              >
                <span className="contact-link__icon">{c.icon}</span>
                {c.label}
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`footer ${isMobile ? "footer--mobile" : ""}`}>
        Designed & built by{" "}
        <span className="footer__name">Vanshika Raina</span>
        {" "}· 2026 · Made with ♥ and lots of ☕
      </footer>

    </div>
  );
}