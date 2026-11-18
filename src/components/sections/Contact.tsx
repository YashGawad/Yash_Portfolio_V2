import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {
  Mail,
  Phone,
  Copy,
  Check,
  ArrowUpRight,
  ExternalLink,
  Send,
  Sparkles,
  AlertCircle,
  MessageSquare,
  User,
  AtSign,
} from 'lucide-react'
import { Container } from '../common/Container'
import { SectionHeading } from '../common/SectionHeading'
import { Button } from '../common/Button'
import { Magnetic } from '../common/Magnetic'
import { GithubIcon, LinkedinIcon } from '../common/Icons'
import { PORTFOLIO_DATA } from '../../data/portfolio'

export function Contact() {
  const { identity } = PORTFOLIO_DATA
  const sectionRef = useRef<HTMLElement>(null)
  const bentoRef = useRef<HTMLDivElement>(null)

  // Clipboard copy states
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copyError, setCopyError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _honey: '',
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null)

  // Entrance animation for contact section
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      if (bentoRef.current) {
        gsap.fromTo(
          bentoRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bentoRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    },
    { scope: sectionRef }
  )

  // Real clipboard copy handling
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email)
      setCopiedEmail(true)
      setCopyError(null)
      setTimeout(() => setCopiedEmail(false), 2500)
    } catch {
      setCopyError('Unable to copy automatically. Please copy manually.')
      setTimeout(() => setCopyError(null), 3000)
    }
  }

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(identity.phone)
      setCopiedPhone(true)
      setCopyError(null)
      setTimeout(() => setCopiedPhone(false), 2500)
    } catch {
      setCopyError('Unable to copy automatically. Please copy manually.')
      setTimeout(() => setCopyError(null), 3000)
    }
  }

  // Handle Form Input Changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formStatus === 'error') {
      setFormStatus('idle')
      setFormErrorMessage(null)
    }
  }

  // Form Submission via FormSubmit AJAX endpoint
  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Basic bot prevention honeypot check
    if (formData._honey) {
      return
    }

    // Required fields validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setFormStatus('error')
      setFormErrorMessage('Please fill in all required fields.')
      return
    }

    setFormStatus('submitting')
    setFormErrorMessage(null)

    try {
      const response = await fetch('https://formsubmit.co/ajax/gawadyash32@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          _template: 'table',
          _subject: `Portfolio Enquiry: ${formData.subject.trim()} - from ${formData.name.trim()}`,
        }),
      })

      const result = await response.json()

      if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
        setFormStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          _honey: '',
        })
      } else {
        throw new Error(result.message || 'Submission was not accepted by the server.')
      }
    } catch (err) {
      setFormStatus('error')
      setFormErrorMessage(
        err instanceof Error
          ? err.message
          : 'Server connection issue. Please send an email directly to gawadyash32@gmail.com.'
      )
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-36 relative scroll-mt-20 border-t border-slate-800/60 overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-t from-cyan-600/10 via-blue-600/5 to-transparent blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <SectionHeading
          number="06"
          tag="Initiate Contact"
          title="Let's Build Something Meaningful"
          subtitle="Whether you have an upcoming project, an engineering role, or a technical problem to discuss, my inbox is always open."
          align="center"
        />

        <div ref={bentoRef} className="max-w-5xl mx-auto space-y-10">
          {/* 4 Interactive Contact Channels Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Email Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400/90 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                    Primary Channel
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 mb-1">Direct Email</div>
                <div className="text-lg sm:text-xl font-bold text-white break-all mb-4">
                  {identity.email}
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-800/70">
                <div className="flex flex-wrap items-center gap-2">
                  <Magnetic strength={0.15}>
                    <div>
                      <Button
                        variant="primary"
                        size="sm"
                        href={identity.emailSendHref}
                        iconLeft={<Mail className="w-3.5 h-3.5" />}
                      >
                        Send Email
                      </Button>
                    </div>
                  </Magnetic>

                  <Magnetic strength={0.15}>
                    <div>
                      <Button
                        variant="secondary"
                        size="sm"
                        href={identity.gmailComposeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        iconRight={<ExternalLink className="w-3 h-3 text-cyan-400" />}
                      >
                        Open Gmail
                      </Button>
                    </div>
                  </Magnetic>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-700/80 bg-slate-950 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Phone Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-sky-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Voice &amp; Direct
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 mb-1">Telephone &amp; Cellular</div>
                <a
                  href={identity.phoneHref}
                  className="inline-block text-xl sm:text-2xl font-bold text-white hover:text-cyan-300 transition-colors mb-4"
                >
                  {identity.phone}
                </a>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-800/70">
                <div className="flex flex-wrap items-center gap-2">
                  <Magnetic strength={0.15}>
                    <div>
                      <Button
                        variant="primary"
                        size="sm"
                        href={identity.phoneHref}
                        iconLeft={<Phone className="w-3.5 h-3.5" />}
                      >
                        Call Now
                      </Button>
                    </div>
                  </Magnetic>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-700/80 bg-slate-950 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Number Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 3. LinkedIn Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-blue-400">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Professional Network</span>
                </div>

                <div className="text-xs font-mono text-slate-400 mb-1">LinkedIn Profile</div>
                <div className="text-base sm:text-lg font-bold text-white mb-4">
                  linkedin.com/in/yash-gawad
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/70">
                <Magnetic strength={0.15}>
                  <div>
                    <Button
                      variant="secondary"
                      size="sm"
                      href={identity.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      iconRight={<ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />}
                    >
                      Connect on LinkedIn
                    </Button>
                  </div>
                </Magnetic>
              </div>
            </div>

            {/* 4. GitHub Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Source Code &amp; Repos</span>
                </div>

                <div className="text-xs font-mono text-slate-400 mb-1">GitHub Repositories</div>
                <div className="text-base sm:text-lg font-bold text-white mb-4">
                  github.com/YashGawad
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/70">
                <Magnetic strength={0.15}>
                  <div>
                    <Button
                      variant="secondary"
                      size="sm"
                      href={identity.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      iconRight={<ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />}
                    >
                      View GitHub Profile
                    </Button>
                  </div>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Copy Error Toast if triggered */}
          {copyError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-xs text-red-300 text-center">
              {copyError}
            </div>
          )}

          {/* FormSubmit Working Contact Form */}
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-2xl p-7 sm:p-10 shadow-2xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Send a Direct Message</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Get in Touch
                </h3>
              </div>
              <div className="text-xs text-slate-400">
                Processed securely via FormSubmit.co
              </div>
            </div>

            {/* Success Notification Box */}
            {formStatus === 'success' && (
              <div className="mb-6 p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-left space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Check className="w-5 h-5 shrink-0" />
                  <span>Message Successfully Accepted by Server!</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you for reaching out. FormSubmit has accepted your enquiry and forwarded it to{' '}
                  <span className="font-mono text-cyan-300">gawadyash32@gmail.com</span>.
                </p>
                <p className="text-[11px] font-mono text-emerald-300/80">
                  Note: If this is the very first live submission, FormSubmit sends an activation link to the inbox owner to verify the recipient.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setFormStatus('idle')}
                    className="text-xs font-mono text-cyan-400 underline hover:text-cyan-300 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            )}

            {/* Error Notification Box */}
            {formStatus === 'error' && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-left flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-rose-300">Submission Notice:</div>
                  <div className="text-slate-300">{formErrorMessage}</div>
                  <div className="pt-1">
                    <a
                      href={identity.emailSendHref}
                      className="text-cyan-300 underline font-mono hover:text-cyan-200"
                    >
                      Click here to email directly via your mail client instead
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* POST Form FormSubmit */}
            <form
              action="https://formsubmit.co/gawadyash32@gmail.com"
              method="POST"
              onSubmit={handleSubmitForm}
              className="space-y-5 text-left"
            >
              {/* FormSubmit Configuration Hidden Fields */}
              <input
                type="text"
                name="_honey"
                value={formData._honey}
                onChange={handleInputChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_subject"
                value={`Portfolio Contact: ${formData.subject || 'New Message'} - Yash Gawad`}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    disabled={formStatus === 'submitting'}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <AtSign className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Your Email *</span>
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                    disabled={formStatus === 'submitting'}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="form-subject" className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Subject *</span>
                </label>
                <input
                  id="form-subject"
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g. Full-Stack Engineering Role / Project Inquiry"
                  disabled={formStatus === 'submitting'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors disabled:opacity-50"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="form-message" className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Message *</span>
                </label>
                <textarea
                  id="form-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your project, role, or inquiry..."
                  disabled={formStatus === 'submitting'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-y disabled:opacity-50"
                />
              </div>

              {/* Submit Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-[11px] font-mono text-slate-400 text-center sm:text-left">
                  Includes FormSubmit CAPTCHA verification to prevent automated spam.
                </p>

                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
