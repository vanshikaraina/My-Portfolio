import { useState, useEffect, useRef } from "react";

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
//   { icon: "🥇", title: "Hackathon Winner", desc: "1st place at [Hackathon Name] — built X in 24 hours" },
  { icon: "💡", title: "LeetCode 300+ Problems", desc: "Consistent problem solver, rated 1507 on LeetCode" },
//   { icon: "📌", title: "Open Source Contributor", desc: "Contributed to [Project Name] — [brief detail]" },
  { icon: "🎖️", title: "Add Your Achievement", desc: "Description of the achievement goes here" },
];

const CONTACT_LINKS = [
  { icon: "✉️", label: "vanshika8727@gmail.com", href: "mailto:vanshika8727@gmail.com" },
  { icon: "📞", label: "+91 87278 99915", href: "tel:+918727899915" },
  { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/vanshika-raina-845a58295/" },
  { icon: "🐙", label: "GitHub", href: "https://github.com/vanshikaraina" },
  { icon: "🔢", label: "LeetCode", href: "https://leetcode.com/u/vanshika1515/" },
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.12, ...options });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
      ...style
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { font-family: 'DM Sans', sans-serif; background: #fdfcfb; color: #1a1a1a; }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #f1f1f1; }
      ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 99px; }
      a { text-decoration: none; color: inherit; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fdfcfb", color: "#1a1a1a", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(253,252,251,0.88)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1rem 3rem",
      }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.03em" }}>
          VR<span style={{ color: "#ff3cac" }}>.</span>
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.88rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                color: activeNav === l ? "#ff3cac" : "#666",
                borderBottom: activeNav === l ? "2px solid #ff3cac" : "2px solid transparent",
                paddingBottom: "2px", transition: "color 0.2s",
              }}>
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "8rem 3rem 4rem",
        position: "relative", overflow: "hidden",
        background: "linear-gradient(145deg, #fff9f9 0%, #f0f7ff 50%, #f5fff9 100%)",
      }}>
        {/* Decorative circles */}
        {[
          { top: "-120px", right: "5%", size: 420, color: "rgba(255,60,172,0.07)" },
          { top: "30%", left: "-80px", size: 300, color: "rgba(59,130,246,0.07)" },
          { bottom: "-60px", right: "20%", size: 260, color: "rgba(16,185,129,0.07)" },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%",
            width: b.size, height: b.size,
            background: b.color,
            top: b.top, bottom: b.bottom, left: b.left, right: b.right,
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ maxWidth: 780, position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block", background: "rgba(255,60,172,0.1)",
            color: "#ff3cac", borderRadius: "999px", padding: "0.35rem 1rem",
            fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", marginBottom: "1.5rem",
            animation: "fadeUp 0.5s ease both",
          }}>
            ✦ Open to Internships
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em",
            animation: "fadeUp 0.6s 0.1s ease both",
            color: "#5f5c5c",
            }}>
            Hi, I'm{" "}
            <span style={{
              background: "linear-gradient(135deg, #ff3cac, #f59e0b, #10b981, #3b82f6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", backgroundSize: "300%",
              animation: "shimmer 5s linear infinite",
            }}>
              Vanshika Raina
            </span>
          </h1>

          <p style={{
            marginTop: "1.2rem", fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#555", fontWeight: 300, lineHeight: 1.7,
            animation: "fadeUp 0.6s 0.2s ease both",
          }}>
            CSE 3rd Year · <strong style={{ color: "#1a1a1a", fontWeight: 500 }}>DSA</strong> · Full Stack Developer · Building things that matter
          </p>

          <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap", animation: "fadeUp 0.6s 0.35s ease both" }}>
            <button onClick={() => scrollTo("Projects")} style={{
              background: "linear-gradient(135deg, #ff3cac, #8b5cf6)",
              color: "#fff", border: "none", borderRadius: "999px",
              padding: "0.8rem 2rem", fontSize: "0.95rem", fontWeight: 500,
              cursor: "pointer", boxShadow: "0 4px 20px rgba(255,60,172,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 28px rgba(255,60,172,0.45)"; }}
              onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 20px rgba(255,60,172,0.3)"; }}
            >
              🚀 View My Work
            </button>
            <button onClick={() => scrollTo("Contact")} style={{
              background: "#fff", color: "#1a1a1a", border: "1.5px solid #e5e5e5",
              borderRadius: "999px", padding: "0.8rem 2rem", fontSize: "0.95rem", fontWeight: 500,
              cursor: "pointer", transition: "border-color 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#ccc"; e.target.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#e5e5e5"; e.target.style.boxShadow = "none"; }}
            >
              ✉️ Get in Touch
            </button>
          </div>
        </div>

        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
          @keyframes shimmer { 0%{background-position:0%} 100%{background-position:300%} }
        `}</style>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "6rem 3rem", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {/* <FadeIn><Label color="#10b981">// 01 — about</Label></FadeIn> */}
        <FadeIn delay={0.05}><SectionTitle>Who I Am</SectionTitle></FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start", marginTop: "0.5rem" }}>
          <FadeIn delay={0.1}>
            <p style={{ color: "#555", lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "1rem" }}>
              Hey! I'm <strong style={{ color: "#1a1a1a" }}>Vanshika</strong>, a 3rd year CSE student who loves building real, working products.
              I'm passionate about <strong style={{ color: "#1a1a1a" }}>Data Structures & Algorithms</strong> and full-stack web development.
            </p>
            <p style={{ color: "#555", lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "1rem" }}>
              Whether it's competitive programming or shipping a full-stack project, I bring the same curiosity and energy. I'm actively seeking <strong style={{ color: "#1a1a1a" }}>internship opportunities</strong> where I can contribute and grow.
            </p>
            <p style={{ color: "#555", lineHeight: 1.9, fontSize: "1.05rem" }}>
              Off-screen, you'll find me exploring new tech, contributing to open source, or grinding LeetCode.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { n: "3rd", label: "Year CSE Student", color: "#ff3cac" },
              { n: "10+", label: "Projects Built", color: "#3b82f6" },
              { n: "300+", label: "DSA Problems Solved", color: "#10b981" },
              { n: "∞", label: "Curiosity Level", color: "#f59e0b" },
            ].map((s, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.07}>
                <div style={{
                  background: "#fff", border: "1.5px solid #f0f0f0", borderRadius: 20,
                  padding: "1.5rem", transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", fontWeight: 800, color: s.color }}>{s.n}</div>
                  <div style={{ color: "#888", fontSize: "0.82rem", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "6rem 3rem", background: "#f8f8f6", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {/* <FadeIn><Label color="#ff3cac">// 02 — skills</Label></FadeIn> */}
        <FadeIn delay={0.05}><SectionTitle>Tech Stack</SectionTitle></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.2rem", marginTop: "0.5rem" }}>
          {SKILLS.map((cat, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div style={{
                background: "#fff", border: "1.5px solid #efefef", borderRadius: 20,
                padding: "1.8rem", position: "relative", overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${cat.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: cat.color, borderRadius: "20px 20px 0 0" }} />
                <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>{cat.emoji}</span> {cat.title}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {cat.tags.map(t => (
                    <span key={t} style={{
                      background: `${cat.color}12`, color: cat.color,
                      border: `1px solid ${cat.color}30`,
                      borderRadius: "999px", padding: "0.28rem 0.75rem",
                      fontSize: "0.8rem", fontWeight: 500,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "6rem 3rem", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {/* <FadeIn><Label color="#f59e0b">// 03 — projects</Label></FadeIn> */}
        <FadeIn delay={0.05}><SectionTitle>Things I've Built</SectionTitle></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.4rem", marginTop: "0.5rem" }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                background: "#fff", border: "1.5px solid #efefef", borderRadius: 20,
                padding: "2rem", height: "100%", display: "flex", flexDirection: "column",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 50px ${p.color}20`; e.currentTarget.style.borderColor = `${p.color}40`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "#efefef"; }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{p.emoji}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.6rem" }}>{p.title}</div>
                <p style={{ color: "#777", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.2rem", flex: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.4rem" }}>
                  {p.tech.map(t => (
                    <span key={t} style={{
                      background: "#f5f5f5", color: "#666",
                      borderRadius: "999px", padding: "0.2rem 0.65rem", fontSize: "0.75rem",
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {["⬡ GitHub", "↗ Live Demo"].map(lbl => (
                    <a key={lbl} href="#" style={{
                      fontSize: "0.82rem", color: p.color, fontWeight: 500,
                      display: "flex", alignItems: "center", gap: "0.3rem",
                      transition: "opacity 0.2s",
                    }}
                      onMouseEnter={e => e.target.style.opacity = "0.7"}
                      onMouseLeave={e => e.target.style.opacity = "1"}
                    >{lbl}</a>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" style={{ padding: "6rem 3rem", background: "#f8f8f6", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {/* <FadeIn><Label color="#3b82f6">// 04 — education & achievements</Label></FadeIn> */}
        <FadeIn delay={0.05}><SectionTitle>Background</SectionTitle></FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "0.5rem" }}>
          {[
            {
              icon: "🎓", degree: "B.E — Computer Science & Engineering",
              school: "Chitkara University, Punjab", detail: "CGPA: 9.14 / 10 · DSA, DBMS, OS, CN, Software Engineering",
              year: "2023 – 2027",
            },
            {
              icon: "🏫", degree: "Class XII — Non - Medical",
              school: "Sacred Heart Sr. Sec. School, BRS Nagar, Ludhiana, Punjab", detail: "Score: 79.8% · Board: CBSE",
              year: "2023",
            },
          ].map((e, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                background: "#fff", border: "1.5px solid #efefef", borderRadius: 20,
                padding: "1.8rem", display: "flex", gap: "1.5rem", alignItems: "flex-start",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={el => { el.currentTarget.style.transform = "translateX(5px)"; el.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.1)"; }}
                onMouseLeave={el => { el.currentTarget.style.transform = ""; el.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem",
                }}>{e.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem" }}>{e.degree}</div>
                  <div style={{ color: "#888", fontSize: "0.88rem", marginBottom: "0.3rem" }}>{e.school}</div>
                  <div style={{ color: "#aaa", fontSize: "0.8rem" }}>{e.detail}</div>
                </div>
                <div style={{ color: "#aaa", fontSize: "0.82rem", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>{e.year}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Achievements */}
        <FadeIn delay={0.1}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, marginTop: "3.5rem", marginBottom: "1.2rem" }}>
            🏆 Achievements
          </h3>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
          {ACHIEVEMENTS.map((a, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div style={{
                background: "#fff", border: "1.5px solid #efefef", borderRadius: 16,
                padding: "1.2rem 1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ fontSize: "1.5rem", flexShrink: 0 }}>{a.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.93rem", marginBottom: "0.2rem" }}>{a.title}</div>
                  <div style={{ color: "#999", fontSize: "0.8rem" }}>{a.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── RESUME ── */}
      <section id="resume" style={{ padding: "6rem 3rem", borderTop: "1px solid rgba(0,0,0,0.06)", textAlign: "center" }}>
        {/* <FadeIn><Label color="#f59e0b">// 05 — resume</Label></FadeIn> */}
        <FadeIn delay={0.05}><SectionTitle color="#5d4141">Download My Resume</SectionTitle></FadeIn>
        <FadeIn delay={0.1}>
          <div style={{
            maxWidth: 440, margin: "0.5rem auto 0",
            background: "#fff", border: "1.5px solid #efefef", borderRadius: 24,
            padding: "3rem 2rem", boxShadow: "0 8px 40px rgba(0,0,0,0.05)",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📄</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.75rem" }}>Vanshika Raina — Resume</h3>
            <p style={{ color: "#888", fontSize: "0.93rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Get a PDF overview of my skills, projects, education, and experience. Updated for the 2026-27 internship season.
            </p>
            {/* Replace href with your actual resume PDF link */}
            <a href="YOUR_RESUME_LINK_HERE" download style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "linear-gradient(135deg, #ff3cac, #8b5cf6)",
              color: "#fff", borderRadius: "999px", padding: "0.85rem 2rem",
              fontSize: "0.95rem", fontWeight: 500,
              boxShadow: "0 4px 20px rgba(255,60,172,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(255,60,172,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,60,172,0.3)"; }}
            >
              ⬇️ Download Resume (PDF)
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── CERTIFICATIONS (hidden — remove display:none to show) ── */}
      {/* 
      To show certifications: delete the comment tags around this section and fill in your certs.
      <section id="certifications" style={{ padding:"6rem 3rem", background:"#f8f8f6", borderTop:"1px solid rgba(0,0,0,0.06)" }}>
        <Label color="#10b981">// certs</Label>
        <SectionTitle>Certifications</SectionTitle>
        Add cert cards here using the same achievement-item pattern above
      </section>
      */}

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "6rem 3rem", background: "linear-gradient(145deg, #fff9f9, #f0f7ff)", borderTop: "1px solid rgba(0,0,0,0.06)", textAlign: "center" }}>
        {/* <FadeIn><Label color="#ff3cac">  </Label></FadeIn> */}
        <FadeIn delay={0.05}>
        <SectionTitle color="#5d4141">Let's Connect ✨</SectionTitle>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ color: "#2f2d2d", maxWidth: 480, margin: "0 auto 2.5rem", fontSize: "1rem", lineHeight: 1.8 }}>
            I'm actively looking for internship opportunities. Whether you have a role, a project idea, or just want to say hi — my inbox is always open!
          </p>
        </FadeIn>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
          {CONTACT_LINKS.map((c, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <a href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} style={{
                background: "#fff", border: "1.5px solid #efefef", borderRadius: 16,
                padding: "1rem 1.8rem", display: "flex", alignItems: "center", gap: "0.6rem",
                fontWeight: 500, fontSize: "0.93rem", color: "#1a1a1a",
                transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = "#ddd"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#efefef"; }}
              >
                <span style={{ fontSize: "1.1rem" }}>{c.icon}</span> {c.label}
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid rgba(0,0,0,0.06)", padding: "2rem 3rem",
        textAlign: "center", color: "#aaa", fontSize: "0.82rem",
      }}>
        Designed & built by{" "}
        <span style={{
          background: "linear-gradient(90deg, #ff3cac, #3b82f6)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          fontWeight: 600,
        }}>Vanshika Raina</span>
        {" "}· 2026 · Made with ♥ and lots of ☕
      </footer>

    </div>
  );
}

function Label({ children, color }) {
  return (
    <p style={{
      fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase",
      fontWeight: 600, color, marginBottom: "0.5rem",
    }}>{children}</p>
  );
}

function SectionTitle({ children, color = "#1a1a1a" }) {
  return (
    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800,
      letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "2.5rem",
      color,
    }}>{children}</h2>
  );
}