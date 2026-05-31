import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { endpoints } from '../../shared/api/endpoints';
import './work-with-us.css';

type ProjectType = 'Web Application' | 'Mobile App' | 'Design & Branding' | 'Other / Not sure';
type Budget = '< €5,000' | '€5,000 – €15,000' | '€15,000 – €50,000' | '€50,000+';
type Timeline = 'ASAP (< 1 month)' | '1 – 3 months' | '3 – 6 months' | 'Flexible';

type QuizState = {
  step: number;
  projectType: ProjectType | null;
  budget: Budget | null;
  timeline: Timeline | null;
  description: string;
  name: string;
  email: string;
  company: string;
  wantsCall: boolean;
};

const INITIAL: QuizState = {
  step: 1,
  projectType: null,
  budget: null,
  timeline: null,
  description: '',
  name: '',
  email: '',
  company: '',
  wantsCall: false
};

const TOTAL_STEPS = 5;

const HOW_IT_WORKS = [
  {
    num: 1,
    title: 'Brief Your Project',
    desc: 'Answer a few simple questions about what you want to build.'
  },
  {
    num: 2,
    title: 'Get Your Estimate',
    desc: 'Receive an instant price range based on your project scope.'
  },
  {
    num: 3,
    title: 'We Get to Work',
    desc: "Book a discovery call and let's align on the details."
  }
] as const;

const PROJECT_TYPES: Array<{ value: ProjectType; emoji: string; title: string; desc: string }> = [
  { value: 'Web Application', emoji: '🌐', title: 'Web Application', desc: 'Platform, SaaS, dashboard' },
  { value: 'Mobile App', emoji: '📱', title: 'Mobile App', desc: 'iOS, Android or both' },
  { value: 'Design & Branding', emoji: '🎨', title: 'Design & Branding', desc: 'UI/UX, design system' },
  { value: 'Other / Not sure', emoji: '⚡', title: 'Other / Not sure', desc: 'Tell us more below' }
];

const BUDGETS: Budget[] = ['< €5,000', '€5,000 – €15,000', '€15,000 – €50,000', '€50,000+'];

const TIMELINES: Timeline[] = ['ASAP (< 1 month)', '1 – 3 months', '3 – 6 months', 'Flexible'];

function progressWidth(step: number) {
  return `${(step / TOTAL_STEPS) * 100}%`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function ProjectQuiz() {
  const [state, setState] = useState<QuizState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const update = (patch: Partial<QuizState>) => setState((s) => ({ ...s, ...patch }));

  const canContinue =
    state.step === 1
      ? !!state.projectType
      : state.step === 2
        ? !!state.budget
        : state.step === 3
          ? !!state.timeline
          : state.step === 4
            ? state.description.trim().length >= 20
            : state.step === 5
              ? state.name.trim().length > 0 && isValidEmail(state.email)
              : false;

  async function handleSubmit() {
    if (!canContinue || submitting) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await endpoints.quotes.create({
        projectType: state.projectType as string,
        budget: state.budget as string,
        timeline: state.timeline as string,
        description: state.description.trim(),
        name: state.name.trim(),
        email: state.email.trim(),
        company: state.company.trim() || undefined,
        wantsDiscoveryCall: state.wantsCall
      });
      const data = res.data as { success?: boolean };
      if (data?.success) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function handleNext() {
    if (!canContinue) return;
    if (state.step < TOTAL_STEPS) {
      update({ step: state.step + 1 });
      return;
    }
    void handleSubmit();
  }

  function handleBack() {
    if (state.step > 1) update({ step: state.step - 1 });
  }

  if (submitted) {
    return (
      <div className="wwu-quiz__success">
        <div className="wwu-quiz__success-icon" aria-hidden>
          ✓
        </div>
        <h3 className="wwu-quiz__success-title">Brief received!</h3>
        <p className="wwu-quiz__success-sub">
          Our team will review your project and get back to you personally with a detailed proposal.
        </p>
        {state.wantsCall ? (
          <p className="wwu-quiz__success-call">We&apos;ll also reach out to schedule your discovery call.</p>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <div className="wwu-quiz__progress" aria-hidden>
        <div className="wwu-quiz__progress-fill" style={{ width: progressWidth(state.step) }} />
      </div>

      <p className="wwu-quiz__step-label">
        Step {state.step} of {TOTAL_STEPS}
      </p>

      <div key={state.step} className="wwu-quiz__step">
        {state.step === 1 ? (
          <>
            <h3 className="wwu-quiz__question">What are you looking to build?</h3>
            <div className="wwu-quiz__options-grid">
              {PROJECT_TYPES.map((opt) => {
                const selected = state.projectType === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`wwu-quiz__option-card${selected ? ' wwu-quiz__option-card--selected' : ''}`}
                    onClick={() => update({ projectType: opt.value })}
                  >
                    <div className="wwu-quiz__option-icon" aria-hidden>
                      {opt.emoji}
                    </div>
                    <p className="wwu-quiz__option-title">{opt.title}</p>
                    <p className="wwu-quiz__option-desc">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        {state.step === 2 ? (
          <>
            <h3 className="wwu-quiz__question">What&apos;s your budget range?</h3>
            <div className="wwu-quiz__pills">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  type="button"
                  className={`wwu-quiz__pill${state.budget === b ? ' wwu-quiz__pill--selected' : ''}`}
                  onClick={() => update({ budget: b })}
                >
                  {b}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {state.step === 3 ? (
          <>
            <h3 className="wwu-quiz__question">When do you need it?</h3>
            <div className="wwu-quiz__pills">
              {TIMELINES.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`wwu-quiz__pill${state.timeline === t ? ' wwu-quiz__pill--selected' : ''}`}
                  onClick={() => update({ timeline: t })}
                >
                  {t}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {state.step === 4 ? (
          <>
            <h3 className="wwu-quiz__question">Tell us about your project</h3>
            <textarea
              className="wwu-quiz__textarea"
              placeholder="Describe what you want to build, your target users, and any specific features you have in mind..."
              value={state.description}
              onChange={(e) => update({ description: e.target.value })}
            />
          </>
        ) : null}

        {state.step === 5 ? (
          <>
            <h3 className="wwu-quiz__question">Where should we send your estimate?</h3>
            <div className="wwu-quiz__fields">
              <div>
                <label className="wwu-quiz__field-label" htmlFor="wwu-name">
                  Full Name
                </label>
                <input
                  id="wwu-name"
                  className="wwu-quiz__input"
                  type="text"
                  value={state.name}
                  onChange={(e) => update({ name: e.target.value })}
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="wwu-quiz__field-label" htmlFor="wwu-email">
                  Email
                </label>
                <input
                  id="wwu-email"
                  className="wwu-quiz__input"
                  type="email"
                  value={state.email}
                  onChange={(e) => update({ email: e.target.value })}
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="wwu-quiz__field-label" htmlFor="wwu-company">
                  Company <span className="wwu-quiz__field-optional">(optional)</span>
                </label>
                <input
                  id="wwu-company"
                  className="wwu-quiz__input"
                  type="text"
                  value={state.company}
                  onChange={(e) => update({ company: e.target.value })}
                  autoComplete="organization"
                />
              </div>
              <label className="wwu-quiz__checkbox">
                <input
                  type="checkbox"
                  checked={state.wantsCall}
                  onChange={(e) => update({ wantsCall: e.target.checked })}
                />
                <span>I&apos;d also like to book a 30-min discovery call</span>
              </label>
            </div>
          </>
        ) : null}
      </div>

      <div className="wwu-quiz__nav">
        <button type="button" className="wwu-quiz__btn-back" disabled={state.step <= 1} onClick={handleBack}>
          Back
        </button>
        <div className="wwu-quiz__nav-submit">
          <button
            type="button"
            className="wwu-quiz__btn-next"
            disabled={!canContinue || submitting}
            onClick={handleNext}
          >
            {submitting ? (
              <>
                <span className="wwu-quiz__spinner" aria-hidden />
                Sending...
              </>
            ) : state.step === TOTAL_STEPS ? (
              'Get My Estimate →'
            ) : (
              'Continue →'
            )}
          </button>
          {submitError ? (
            <p className="wwu-quiz__error">Something went wrong. Please try again.</p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export function WorkWithUsPage() {
  return (
    <div className="wwu-page">
      <section className="wwu-hero" aria-label="Work with us">
        <h1 className="wwu-hero__title">
          <span className="wwu-hero__title-line1">Let&apos;s Build Something</span>
          <span className="wwu-hero__title-line2">Great Together.</span>
        </h1>
        <p className="wwu-hero__sub">
          Tell us about your project — we&apos;ll give you an honest estimate and a clear path forward.
        </p>
      </section>

      <section className="wwu-steps" aria-label="How it works">
        <div className="wwu-steps__track">
          {HOW_IT_WORKS.map((item, index) => (
            <React.Fragment key={item.num}>
              {index > 0 ? (
                <span className="wwu-steps__arrow" aria-hidden>
                  →
                </span>
              ) : null}
              <article className="wwu-step">
                <div className="wwu-step__num">{item.num}</div>
                <h2 className="wwu-step__title">{item.title}</h2>
                <p className="wwu-step__desc">{item.desc}</p>
              </article>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="wwu-quiz" aria-label="Project quiz">
        <div className="wwu-quiz__card">
          <ProjectQuiz />
        </div>
      </section>

      <section className="wwu-cta" aria-label="Discovery call">
        <h2 className="wwu-cta__title">Prefer to talk first?</h2>
        <p className="wwu-cta__sub">
          Book a free 30-min discovery call. No commitment, just a conversation.
        </p>
        <Link to="/contact" className="wwu-cta__btn">
          Book a Discovery Call
        </Link>
        <p className="wwu-cta__note">Free · 30 minutes · No obligation</p>
      </section>
    </div>
  );
}
