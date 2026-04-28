import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!localStorage.getItem('cookie_consent')) {
      const t = setTimeout(() => setVisible(true), 1800)
      return () => clearTimeout(t)
    }
  }, [])

  function dismiss(choice: 'accepted' | 'rejected') {
    localStorage.setItem('cookie_consent', choice)
    setVisible(false)
  }

  if (!mounted) return null

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99998,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          pointerEvents: visible ? 'all' : 'none',
          opacity: visible ? 1 : 0,
          visibility: visible ? 'visible' : 'hidden',
          transition: visible
            ? 'opacity 0.35s ease, visibility 0s'
            : 'opacity 0.35s ease, visibility 0s linear 0.35s',
        }}
      />

      {/* Banner */}
      <div
        role="dialog"
        aria-label="Aviso de cookies"
        aria-modal="true"
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 99999,
          width: 300,
          maxWidth: 'calc(100vw - 48px)',
          background: 'rgba(26,22,18,0.97)',
          border: '1px solid rgba(196,163,110,0.22)',
          borderRadius: 20,
          padding: '22px 20px 18px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
          fontFamily: 'var(--font-body), sans-serif',
          transform: visible ? 'translateY(0)' : 'translateY(calc(100% + 48px))',
          opacity: visible ? 1 : 0,
          visibility: visible ? 'visible' : 'hidden',
          transition: visible
            ? 'transform 0.5s cubic-bezier(0.34,1.4,0.64,1), opacity 0.3s ease, visibility 0s'
            : 'transform 0.4s ease, opacity 0.3s ease, visibility 0s linear 0.4s',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: '1.1rem', lineHeight: 1, flexShrink: 0 }}>🔒</span>
          <span style={{
            fontSize: '0.88rem',
            fontWeight: 700,
            color: 'var(--lp-gold, #C4A36E)',
            letterSpacing: '-0.2px',
          }}>
            Controle sua privacidade
          </span>
        </div>

        {/* Texto */}
        <p style={{
          fontSize: '0.72rem',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.6,
          margin: '0 0 12px',
        }}>
          Usamos cookies para personalizar anúncios e melhorar sua experiência de navegação.
        </p>

        {/* Link */}
        <div style={{ marginBottom: 16 }}>
          <a
            href="https://privacidade.growdoc.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.68rem',
              color: 'rgba(196,163,110,0.65)',
              textDecoration: 'underline',
            }}
          >
            Política de Privacidade
          </a>
        </div>

        {/* Botões */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => dismiss('rejected')}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 50,
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'transparent',
              color: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(255,255,255,0.12)',
              fontFamily: 'inherit',
              letterSpacing: '0.3px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'
              ;(e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)'
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.35)'
              ;(e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'
            }}
          >
            Recusar
          </button>

          <button
            type="button"
            onClick={() => dismiss('accepted')}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 50,
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'var(--lp-gold, #C4A36E)',
              color: 'var(--lp-dark, #1A1612)',
              border: 'none',
              fontFamily: 'inherit',
              letterSpacing: '0.3px',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.opacity = '0.88' }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.opacity = '1' }}
          >
            Aceitar
          </button>
        </div>
      </div>
    </>
  )
}
