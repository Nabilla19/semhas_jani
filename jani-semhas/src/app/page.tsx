"use client";

import { useEffect, useRef, useState } from "react";

const SPARKLE_POSITIONS = [
  { top: "10%", left: "8%", size: "1rem", delay: "0s", duration: "3s" },
  { top: "15%", left: "92%", size: "1.5rem", delay: "0.5s", duration: "2.5s" },
  { top: "25%", left: "3%", size: "0.8rem", delay: "1s", duration: "4s" },
  { top: "35%", left: "95%", size: "1.2rem", delay: "1.5s", duration: "3.5s" },
  { top: "55%", left: "5%", size: "1rem", delay: "0.8s", duration: "2.8s" },
  { top: "70%", left: "90%", size: "0.9rem", delay: "2s", duration: "3.2s" },
  { top: "80%", left: "10%", size: "1.3rem", delay: "0.3s", duration: "4.5s" },
  { top: "90%", left: "85%", size: "0.7rem", delay: "1.2s", duration: "2.2s" },
];

const FLOAT_DECORATIONS = [
  { emoji: "🌟", top: "8%", left: "2%", delay: "0s", duration: "6s" },
  { emoji: "✨", top: "20%", right: "3%", delay: "1s", duration: "7s" },
  { emoji: "🌸", top: "65%", left: "1%", delay: "2s", duration: "8s" },
  { emoji: "💙", top: "75%", right: "2%", delay: "0.5s", duration: "5.5s" },
  { emoji: "🎓", top: "40%", left: "1.5%", delay: "3s", duration: "9s" },
  { emoji: "🌊", top: "45%", right: "1.5%", delay: "1.5s", duration: "6.5s" },
];

export default function Home() {
  const achievementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsPlaying(true);
      return;
    }
    const iframe = iframeRef.current;
    if (!iframe) return;
    const msg = isPlaying
      ? '{"event":"command","func":"pauseVideo","args": ""}'
      : '{"event":"command","func":"playVideo","args": ""}';
    iframe.contentWindow?.postMessage(msg, "*");
    setIsPlaying((p) => !p);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    achievementRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Animated Background */}
      <div className="bg-animated" />
      <div className="bg-bokeh">
        <div className="bokeh-circle" />
        <div className="bokeh-circle" />
        <div className="bokeh-circle" />
        <div className="bokeh-circle" />
        <div className="bokeh-circle" />
      </div>

      {/* ============ FLOATING MUSIC PLAYER ============ */}
      <div className="music-player" role="complementary" aria-label="Music player">
        <button
          id="music-toggle-btn"
          className={`music-btn ${isPlaying ? "playing" : ""}`}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause musik" : "Play Yellow - Coldplay"}
        >
          {/* Sound bars animation */}
          <span className="music-bars" aria-hidden="true">
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </span>
          {/* Play icon when not playing */}
          {!isPlaying && (
            <span className="play-icon" aria-hidden="true">▶</span>
          )}
        </button>
        <div className="music-info">
          <p className="music-title">Yellow</p>
          <p className="music-artist">Coldplay</p>
        </div>
        {/* Hidden YouTube iframe — audio only trick */}
        {hasStarted && (
          <iframe
            ref={iframeRef}
            id="yt-player"
            src="https://www.youtube.com/embed/yKNxeF4KMsY?enablejsapi=1&autoplay=1&controls=0&loop=1&playlist=yKNxeF4KMsY&rel=0"
            allow="autoplay"
            style={{ display: "none" }}
            title="Yellow - Coldplay"
          />
        )}
      </div>

      <div className="page-wrapper">
        {/* ============ HERO SECTION ============ */}
        <section className="hero-section">
          {/* Confetti */}
          <div className="confetti-container" aria-hidden="true">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="confetti-piece" />
            ))}
          </div>

          {/* Sparkles */}
          {SPARKLE_POSITIONS.map((s, i) => (
            <div
              key={i}
              className="sparkle"
              aria-hidden="true"
              style={{
                top: s.top,
                left: s.left,
                fontSize: s.size,
                animationDelay: s.delay,
                animationDuration: s.duration,
              }}
            />
          ))}

          {/* Floating decorations */}
          {FLOAT_DECORATIONS.map((d, i) => (
            <div
              key={i}
              className="float-decoration"
              aria-hidden="true"
              style={{
                top: d.top,
                left: "left" in d ? d.left : undefined,
                right: "right" in d ? (d as { right: string }).right : undefined,
                animationDelay: d.delay,
                animationDuration: d.duration,
              }}
            >
              {d.emoji}
            </div>
          ))}

          {/* Event Badge */}
          <div className="event-badge" role="banner">
            <span>🎓</span>
            <span>Seminar Hasil · 3 Tahun Berjuang</span>
            <span>✦</span>
            <span>2026</span>
          </div>

          {/* Photo Frame */}
          <div className="photo-frame-wrapper" aria-label="Foto Anjani Sekhar Arrum">
            <div className="photo-ring-outer">
              <div className="photo-ring-inner">
                <div className="photo-circle">
                  {/* Replace src below with Anjani's actual photo */}
                  <span className="photo-placeholder-icon" aria-hidden="true">👩‍🎓</span>
                </div>
              </div>
            </div>
            <div className="glow-pulse" aria-hidden="true" />
            <div className="glow-pulse-2" aria-hidden="true" />
          </div>

          {/* Name & Title */}
          <div className="name-wrapper">
            <p className="congrats-script">Selamat &amp; Sukses</p>
            <h1 className="name-title">ANJANI SEKHAR ARRUM</h1>
            <p className="name-credential">A.Md.Gz</p>
          </div>

          {/* Ornament Divider */}
          <div className="ornament-divider" aria-hidden="true">
            <div className="ornament-line" />
            <span className="ornament-star">✦</span>
            <span className="ornament-star" style={{ fontSize: "0.9rem" }}>✦</span>
            <span className="ornament-star">✦</span>
            <div className="ornament-line" />
          </div>

          {/* Message Card */}
          <div className="message-card" role="article" aria-label="Pesan ucapan selamat">
            <span className="message-card-quote" aria-hidden="true">&ldquo;</span>
            <p className="message-text">
              Jani, <strong>selamat atas keberhasilanmu menyelesaikan Seminar Hasil!</strong> 🎉<br /><br />

              Tiga tahun bukan waktu yang sebentar. Tiga tahun itu artinya ratusan malam
              begadang, tumpukan tugas yang nggak ada habisnya, ujian yang bikin deg-degan,
              dan momen-momen berat yang kamu hadapi <strong>sendirian tapi tetap kamu
                lalui</strong>. Itu bukan hal yang mudah, dan kamu nggak boleh meremehkan dirimu
              sendiri untuk itu. 💙<br /><br />

              Kamu sering ngerasa ragu, sering ngerasa capek tapi kamu <em>tetap jalan</em>.
              Itu bukan keberuntungan, itu <strong>kekuatan yang ada dalam dirimu</strong>.
              Dan hari ini, semua kerja kerasmu terbayar lunas. Kamu buktiin ke dirimu sendiri
              bahwa kamu <strong>mampu dan layak</strong> ada di sini. 🌊<br /><br />

              Ke depannya, aku berharap jalanmu selalu diterangi. Semoga ilmu gizi yang
              kamu pelajari jadi ladang kebaikan yang memberi manfaat buat banyak orang.
              Semoga karirmu berkembang, rezekinya lancar, dan setiap langkahmu selalu
              dipermudah. <strong>Dunia butuh orang seperti kamu</strong>  yang gigih,
              yang peduli, dan yang nggak pernah benar-benar menyerah. ✨
            </p>
            <p className="message-signature">
              Selalu bangga sama kamu, sayang 💙
            </p>
          </div>

        </section>

        {/* ============ ACHIEVEMENT SECTION ============ */}
        <section className="achievements-section" aria-label="Pencapaian Anjani">
          <h2 className="section-title">Kebanggaan Kami Untukmu ✨</h2>
          <div className="achievements-grid">
            {[
              {
                icon: "⏳",
                title: "3 Tahun Penuh Perjuangan",
                desc: "Tiga tahun bukan waktu yang singkat. Setiap semester, setiap ujian, setiap tugas kamu habisin dengan sepenuh hati.",
              },
              {
                icon: "📋",
                title: "Seminar Hasil yang Gemilang",
                desc: "Kamu berdiri di depan penguji dan mempresentasikan penelitianmu itu butuh keberanian yang luar biasa.",
              },
              {
                icon: "💪",
                title: "Kamu Lebih Kuat dari Pikiranmu",
                desc: "Di saat-saat tersulit, kamu tetap pilih untuk jalan terus. Itu bukan kebetulan itu karaktermu.",
              },
              {
                icon: "🌊",
                title: "Masa Depan yang Cerah Menantimu",
                desc: "Gelar A.Md.Gz bukan akhir, ini awal. Dunia gizi butuh orang sepertimu yang gigih dan penuh dedikasi.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="achievement-card reveal"
                ref={(el) => { achievementRefs.current[i] = el; }}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <span className="achievement-icon" aria-hidden="true">{item.icon}</span>
                <h3 className="achievement-title">{item.title}</h3>
                <p className="achievement-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ LOVE ADVICE SECTION ============ */}
        <section className="achievements-section love-section" aria-label="Nasihat percintaan">
          <h2 className="section-title">Last But Not Least 💙</h2>
          <p className="love-section-intro">
            Akademikmu udah beres. Sekarang waktunya ngurusin yang satu ini juga dengan kepala dingin, ya!
          </p>
          <div className="achievements-grid">
            {[
              {
                icon: "🚫",
                title: "Jangan Gamon Lagi!",
                desc: "Galau malem-malem sendirian itu nggak worth it, Jani. Kamu udah buktiin kamu kuat jangan habiskan energi buat yang nggak worth your tears.",
              },
              {
                icon: "👑",
                title: "Cintai Dirimu Dulu",
                desc: "Orang yang tepat nggak akan bikin kamu ngerasa kurang atau ragu sama diri sendiri. Sebelum dicintai orang lain, pastiin kamu udah cinta sama dirimu sendiri.",
              },
              {
                icon: "📏",
                title: "Standar Tinggi, Jangan Diturunin",
                desc: "Kamu udah berjuang 3 tahun buat gelarmu. Standar hidupmu tinggi pastiin standar pasanganmu juga setara. Jangan mau sama yang cuma bikin sengsara.",
              },
              {
                icon: "🌅",
                title: "Yang Tepat Pasti Datang",
                desc: "Percayalah, yang bener-bener cocok sama kamu ada waktunya. Nggak perlu dikejar, nggak perlu dipaksa. Fokus jadi versi terbaik dirimu dia akan datang sendiri.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="achievement-card love-card reveal"
                ref={(el) => { achievementRefs.current[4 + i] = el; }}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <span className="achievement-icon" aria-hidden="true">{item.icon}</span>
                <h3 className="achievement-title">{item.title}</h3>
                <p className="achievement-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="footer-section" aria-label="Footer ucapan">
          <div className="footer-hearts" aria-hidden="true">
            <span className="heart">💙</span>
            <span className="heart">💛</span>
            <span className="heart">💙</span>
          </div>
          <p className="footer-text">Selamat Seminar Hasil, Anjani! 🎉</p>
          <p className="footer-sub">
            Created by enggineer cntik 💙 &nbsp;·&nbsp; 2026
          </p>
        </footer>
      </div>
    </>
  );
}
