import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { endpoints } from '../../shared/api/endpoints';
import '../home/andela-home.css';
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

const PROJECT_TYPES: Array<{ value: ProjectType; emoji: string; titleKey: string; descKey: string }> = [
  { value: 'Web Application', emoji: '🌐', titleKey: 'workWithUs.types.web.title', descKey: 'workWithUs.types.web.desc' },
  { value: 'Mobile App', emoji: '📱', titleKey: 'workWithUs.types.mobile.title', descKey: 'workWithUs.types.mobile.desc' },
  { value: 'Design & Branding', emoji: '🎨', titleKey: 'workWithUs.types.design.title', descKey: 'workWithUs.types.design.desc' },
  { value: 'Other / Not sure', emoji: '⚡', titleKey: 'workWithUs.types.other.title', descKey: 'workWithUs.types.other.desc' }
];

const BUDGETS: Array<{ value: Budget; labelKey: string }> = [
  { value: '< €5,000', labelKey: 'workWithUs.budget.under5k' },
  { value: '€5,000 – €15,000', labelKey: 'workWithUs.budget.5k15k' },
  { value: '€15,000 – €50,000', labelKey: 'workWithUs.budget.15k50k' },
  { value: '€50,000+', labelKey: 'workWithUs.budget.over50k' }
];

const TIMELINES: Array<{ value: Timeline; labelKey: string }> = [
  { value: 'ASAP (< 1 month)', labelKey: 'workWithUs.timeline.asap' },
  { value: '1 – 3 months', labelKey: 'workWithUs.timeline.1to3' },
  { value: '3 – 6 months', labelKey: 'workWithUs.timeline.3to6' },
  { value: 'Flexible', labelKey: 'workWithUs.timeline.flexible' }
];

function progressWidth(step: number) {
  return `${(step / TOTAL_STEPS) * 100}%`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function ProjectQuiz() {
  const { t } = useTranslation();
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
        <h3 className="wwu-quiz__success-title">{t('workWithUs.quiz.success.title')}</h3>
        <p className="wwu-quiz__success-sub">{t('workWithUs.quiz.success.sub')}</p>
        {state.wantsCall ? (
          <p className="wwu-quiz__success-call">{t('workWithUs.quiz.success.call')}</p>
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
        {t('workWithUs.quiz.step', { current: state.step, total: TOTAL_STEPS })}
      </p>

      <div key={state.step} className="wwu-quiz__step">
        {state.step === 1 ? (
          <>
            <h3 className="wwu-quiz__question">{t('workWithUs.quiz.q1')}</h3>
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
                    <p className="wwu-quiz__option-title">{t(opt.titleKey)}</p>
                    <p className="wwu-quiz__option-desc">{t(opt.descKey)}</p>
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        {state.step === 2 ? (
          <>
            <h3 className="wwu-quiz__question">{t('workWithUs.quiz.q2')}</h3>
            <div className="wwu-quiz__pills">
              {BUDGETS.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  className={`wwu-quiz__pill${state.budget === b.value ? ' wwu-quiz__pill--selected' : ''}`}
                  onClick={() => update({ budget: b.value })}
                >
                  {t(b.labelKey)}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {state.step === 3 ? (
          <>
            <h3 className="wwu-quiz__question">{t('workWithUs.quiz.q3')}</h3>
            <div className="wwu-quiz__pills">
              {TIMELINES.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={`wwu-quiz__pill${state.timeline === item.value ? ' wwu-quiz__pill--selected' : ''}`}
                  onClick={() => update({ timeline: item.value })}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </div>
          </>
        ) : null}

        {state.step === 4 ? (
          <>
            <h3 className="wwu-quiz__question">{t('workWithUs.quiz.q4')}</h3>
            <textarea
              className="wwu-quiz__textarea"
              placeholder={t('workWithUs.quiz.q4.placeholder')}
              value={state.description}
              onChange={(e) => update({ description: e.target.value })}
            />
          </>
        ) : null}

        {state.step === 5 ? (
          <>
            <h3 className="wwu-quiz__question">{t('workWithUs.quiz.q5')}</h3>
            <div className="wwu-quiz__fields">
              <div>
                <label className="wwu-quiz__field-label" htmlFor="wwu-name">
                  {t('workWithUs.quiz.name')}
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
                  {t('workWithUs.quiz.email')}
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
                  {t('workWithUs.quiz.company')}{' '}
                  <span className="wwu-quiz__field-optional">{t('common.optional')}</span>
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
                <span>{t('workWithUs.quiz.discoveryCall')}</span>
              </label>
            </div>
          </>
        ) : null}
      </div>

      <div className="wwu-quiz__nav">
        <button type="button" className="wwu-quiz__btn-back" disabled={state.step <= 1} onClick={handleBack}>
          {t('common.back')}
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
                {t('common.sending')}
              </>
            ) : state.step === TOTAL_STEPS ? (
              t('workWithUs.quiz.submit')
            ) : (
              t('common.continue')
            )}
          </button>
          {submitError ? <p className="wwu-quiz__error">{t('common.errorGeneric')}</p> : null}
        </div>
      </div>
    </>
  );
}

export function WorkWithUsPage() {
  const { t } = useTranslation();

  const steps = [
    { num: 1, titleKey: 'workWithUs.steps.1.title', descKey: 'workWithUs.steps.1.desc' },
    { num: 2, titleKey: 'workWithUs.steps.2.title', descKey: 'workWithUs.steps.2.desc' },
    { num: 3, titleKey: 'workWithUs.steps.3.title', descKey: 'workWithUs.steps.3.desc' }
  ] as const;

  return (
    <div className="wwu-page">
      <section className="andela-hero-top wwu-hero" aria-label={t('nav.workWithUs')}>
        <div className="andela-hero-headline">
          <h1 className="andela-h1">
            <span className="andela-h1__line1">{t('workWithUs.hero.title1')}</span>
            <span className="andela-h1__line2">{t('workWithUs.hero.title2')}</span>
          </h1>
          <p className="andela-hero-sub">{t('workWithUs.hero.subtitle')}</p>
        </div>
      </section>

      <section className="wwu-steps" aria-label={t('services.process.title')}>
        <div className="wwu-steps__track">
          {steps.map((item, index) => (
            <React.Fragment key={item.num}>
              {index > 0 ? (
                <span className="wwu-steps__arrow" aria-hidden>
                  →
                </span>
              ) : null}
              <article className="wwu-step">
                <div className="wwu-step__num">{item.num}</div>
                <h2 className="wwu-step__title">{t(item.titleKey)}</h2>
                <p className="wwu-step__desc">{t(item.descKey)}</p>
              </article>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="wwu-quiz" aria-label={t('workWithUs.quiz.q1')}>
        <div className="wwu-quiz__card">
          <ProjectQuiz />
        </div>
      </section>

      <section className="wwu-cta" aria-label={t('workWithUs.cta.button')}>
        <h2 className="wwu-cta__title">{t('workWithUs.cta.title')}</h2>
        <p className="wwu-cta__sub">{t('workWithUs.cta.sub')}</p>
        <Link to="/contact" className="wwu-cta__btn">
          {t('workWithUs.cta.button')}
        </Link>
        <p className="wwu-cta__note">{t('workWithUs.cta.note')}</p>
      </section>
    </div>
  );
}
