'use client';

export default function LandingPage({ onStart }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <div className="hero-bg" style={{ flex: 1, minHeight: '100vh', position: 'relative' }}>
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />

        {/* Navbar */}
        <nav style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 48px',
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32,
              background: 'linear-gradient(135deg, #2563eb, #60a5fa)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>
              LegalPPC<span style={{ color: '#60a5fa' }}>Pro</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              background: 'rgba(37,99,235,0.2)',
              border: '1px solid rgba(96,165,250,0.3)',
              color: '#93c5fd',
              padding: '6px 14px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Agency Tool
            </span>
          </div>
        </nav>

        {/* Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 24px',
          maxWidth: 860,
          margin: '0 auto'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(37,99,235,0.15)',
            border: '1px solid rgba(96,165,250,0.3)',
            borderRadius: 999,
            padding: '8px 18px',
            marginBottom: 32
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }} />
            <span style={{ color: '#93c5fd', fontSize: 13, fontWeight: 500 }}>
              Prospect Qualification System — Legal Niche
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(42px, 6vw, 72px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-0.02em'
          }}>
            Qualify Law Firms.<br />
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa, #93c5fd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Close More Deals.
            </span>
          </h1>

          <p style={{
            color: '#94a3b8',
            fontSize: 18,
            lineHeight: 1.7,
            maxWidth: 580,
            marginBottom: 48
          }}>
            A structured 3-tier discovery tool to identify high-value law firm prospects,
            assess their PPC readiness, and surface your winning pitch — in under 10 minutes.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 64 }}>
            <button
              className="btn-primary"
              onClick={onStart}
              style={{ padding: '16px 40px', fontSize: 16, borderRadius: 12 }}
            >
              Begin Discovery Session
              <span style={{ marginLeft: 8 }}>→</span>
            </button>
            <button className="btn-secondary" style={{
              background: 'transparent',
              color: '#93c5fd',
              border: '1.5px solid rgba(96,165,250,0.4)',
              borderRadius: 12
            }}>
              View Sample Report
            </button>
          </div>

          {/* Stats Row */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { value: '11', label: 'Discovery Questions', icon: '❓' },
              { value: '3', label: 'Qualification Tiers', icon: '🎯' },
              { value: '~8 min', label: 'Average Session', icon: '⚡' },
              { value: '100%', label: 'Structured Output', icon: '📊' },
            ].map((stat) => (
              <div key={stat.label} className="stat-card" style={{ minWidth: 130 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{stat.icon}</div>
                <div style={{ color: '#ffffff', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 4, fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Cards */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          gap: 16,
          padding: '0 24px 80px',
          flexWrap: 'wrap'
        }}>
          {[
            {
              tier: 'Tier 1',
              title: 'Business Profile',
              desc: 'Firm size, practice area, and market presence',
              color: '#3b82f6',
              icon: '🏛️'
            },
            {
              tier: 'Tier 2',
              title: 'Digital Readiness',
              desc: 'Current online presence and marketing maturity',
              color: '#8b5cf6',
              icon: '💻'
            },
            {
              tier: 'Tier 3',
              title: 'PPC Potential',
              desc: 'Budget, intent, and conversion opportunity',
              color: '#06b6d4',
              icon: '🚀'
            },
          ].map((item) => (
            <div key={item.tier} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              padding: '24px 28px',
              maxWidth: 260,
              borderTop: `3px solid ${item.color}`
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: item.color,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 6
              }}>{item.tier}</div>
              <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{item.title}</div>
              <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}