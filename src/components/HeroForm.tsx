import { useRef, useEffect } from 'react'
import { CLIENT } from '@/config/client'

function applyPhoneMask(value: string): string {
  const numbers = value.replace(/\D/g, '')
  if (!numbers) return ''
  if (numbers.length <= 10) {
    return numbers
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 14)
  }
  return numbers
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .substring(0, 15)
}

function validatePhone(value: string): boolean {
  const numbers = value.replace(/\D/g, '')
  return numbers.length === 10 || numbers.length === 11
}

function getUTMFromURL() {
  const urlParams = new URLSearchParams(window.location.search)
  return {
    utm_source: urlParams.get('utm_source') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_content: urlParams.get('utm_content') || '',
    utm_term: urlParams.get('utm_term') || '',
    utm_id: urlParams.get('utm_id') || '',
    fbclid: urlParams.get('fbclid') || '',
    gclid: urlParams.get('gclid') || '',
    wbraid: urlParams.get('wbraid') || '',
  }
}

function getUTMFromStorage() {
  return {
    utm_source: localStorage.getItem('utm_utm_source') || '',
    utm_campaign: localStorage.getItem('utm_utm_campaign') || '',
    utm_medium: localStorage.getItem('utm_utm_medium') || '',
    utm_content: localStorage.getItem('utm_utm_content') || '',
    utm_term: localStorage.getItem('utm_utm_term') || '',
    utm_id: localStorage.getItem('utm_utm_id') || '',
    fbclid: localStorage.getItem('utm_fbclid') || '',
    gclid: localStorage.getItem('utm_gclid') || '',
    wbraid: localStorage.getItem('utm_wbraid') || '',
  }
}

function initUTMCapture() {
  const current = getUTMFromURL()
  const hasUTM = Object.values(current).some(v => v !== '')
  if (hasUTM) {
    try {
      Object.entries(current).forEach(([k, v]) => { if (v) localStorage.setItem('utm_' + k, v) })
      localStorage.setItem('utm_timestamp', String(Date.now()))
    } catch {}
    return current
  }
  return getUTMFromStorage()
}

export default function HeroForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => { initUTMCapture() }, [])

  function showError(fieldName: string) {
    const field = formRef.current?.querySelector<HTMLElement>(`[name="${fieldName}"]`)
    const group = field?.closest('.utm-form-group')
    if (group && field) {
      group.classList.add('has-error')
      field.classList.add('error')
    }
  }

  function clearError(fieldName: string) {
    const field = formRef.current?.querySelector<HTMLElement>(`[name="${fieldName}"]`)
    const group = field?.closest('.utm-form-group')
    if (group && field) {
      group.classList.remove('has-error')
      field.classList.remove('error')
    }
  }

  function handlePhoneInput(e: React.ChangeEvent<HTMLInputElement>) {
    clearError('phone')
    e.target.value = applyPhoneMask(e.target.value)
  }

  function handlePrivacyChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (submitRef.current) submitRef.current.disabled = !e.target.checked
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!
    const phoneInput = form.querySelector<HTMLInputElement>('input[name="phone"]')!
    const name = nameInput.value.trim()
    const phone = phoneInput.value.trim()

    clearError('name')
    clearError('phone')

    let hasError = false
    if (!name) { showError('name'); hasError = true }
    if (!validatePhone(phone)) { showError('phone'); hasError = true }
    if (hasError) return

    const utmParams = initUTMCapture()
    const params = new URLSearchParams({
      name,
      email: '',
      phone: phone.replace(/\D/g, ''),
      page_url: window.location.href,
      ...utmParams,
    })

    try { fetch(CLIENT.captureUrl + '?' + params.toString(), { keepalive: true }) } catch {}

    if (submitRef.current) submitRef.current.disabled = true
    if (loadingRef.current) loadingRef.current.classList.add('active')

    window.location.href = CLIENT.webhookUrl + '?' + params.toString()
  }

  return (
    <div className="lp-form-card">
      <div className="utm-form-wrapper">
        <form id="utmCaptureForm" ref={formRef} noValidate onSubmit={handleSubmit}>
          <div className="utm-form-grid">
            <div className="utm-form-group">
              <label className="utm-form-label">
                Nome e Sobrenome<span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="utm-form-input"
                placeholder='Ex: "Julia Nascimento"'
                required
                autoComplete="name"
                onChange={() => clearError('name')}
              />
              <div className="utm-form-error-message">Campo obrigatório</div>
            </div>

            <div className="utm-form-group">
              <label className="utm-form-label">
                DDD + Whatsapp<span className="required">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                className="utm-form-input"
                placeholder='Ex: "31999996666"'
                required
                autoComplete="tel"
                onChange={handlePhoneInput}
              />
              <div className="utm-form-error-message">Telefone inválido</div>
            </div>
          </div>

          <input type="hidden" name="utm_source" defaultValue="" />
          <input type="hidden" name="utm_campaign" defaultValue="" />
          <input type="hidden" name="utm_medium" defaultValue="" />
          <input type="hidden" name="utm_content" defaultValue="" />
          <input type="hidden" name="utm_term" defaultValue="" />
          <input type="hidden" name="utm_id" defaultValue="" />
          <input type="hidden" name="fbclid" defaultValue="" />
          <input type="hidden" name="gclid" defaultValue="" />
          <input type="hidden" name="wbraid" defaultValue="" />

          <div className="utm-form-privacy">
            <label className="utm-form-privacy-label">
              <input
                type="checkbox"
                id="privacyCheckbox"
                className="utm-form-privacy-checkbox"
                onChange={handlePrivacyChange}
              />
              <span className="utm-form-privacy-text">
                Li e concordo com a{' '}
                <a
                  href="https://privacidade.growdoc.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="utm-form-privacy-link"
                >
                  Política de Privacidade
                </a>
              </span>
            </label>
          </div>

          <button
            ref={submitRef}
            type="submit"
            className="utm-form-submit"
            disabled
          >
            {CLIENT.hero.ctaText}
          </button>

          <div ref={loadingRef} className="utm-form-loading">
            Redirecionando…
          </div>
        </form>
      </div>
    </div>
  )
}
