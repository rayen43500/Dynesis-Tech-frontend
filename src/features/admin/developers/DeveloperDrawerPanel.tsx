import React, { useEffect, useMemo, useState } from 'react';
import { Camera, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  useAdminDeveloper,
  useCreateDeveloper,
  useUpdateDeveloper
} from './adminDevelopersHooks';
import { endpoints } from '../../../shared/api/endpoints';
import { resolveDeveloperPhoto, resolveMediaUrl } from '../../../shared/utils/resolveMediaUrl';

type ExperienceEntry = {
  company: string;
  role: string;
  startYear: string;
  endYear: string;
  bullets: string[];
  technologies: string;
};

type EducationEntry = { school: string; degree: string; year: string };
type SkillEntry = { name: string; years: string };
type PortfolioEntry = {
  _id?: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  brief: string;
  challenges: string;
  solutions: string;
  outcomes: string;
  technologies: string;
  images: string[];
  imageFiles: (File | undefined)[];
};

const PORTFOLIO_IMAGE_SLOTS = 6;

function normalizePortfolioSlots(images: string[] = []) {
  return Array.from({ length: PORTFOLIO_IMAGE_SLOTS }, (_, i) => images[i] || '');
}

const emptyPortfolio = (): PortfolioEntry => ({
  title: '',
  category: '',
  description: '',
  overview: '',
  brief: '',
  challenges: '',
  solutions: '',
  outcomes: '',
  technologies: '',
  images: normalizePortfolioSlots(),
  imageFiles: []
});

const PORTFOLIO_CATEGORIES: { value: string; labelKey: string }[] = [
  { value: 'Enterprise SaaS', labelKey: 'admin.developers.drawer.cat.enterprise' },
  { value: 'Marketplace', labelKey: 'admin.developers.drawer.cat.marketplace' },
  { value: 'Fintech', labelKey: 'admin.developers.drawer.cat.fintech' },
  { value: 'Mobile', labelKey: 'admin.developers.drawer.cat.mobile' },
  { value: 'Operations', labelKey: 'admin.developers.drawer.cat.operations' }
];

type Props = {
  developerId?: string | null;
  onClose: () => void;
  onSaved: () => void;
};

export function DeveloperDrawerPanel({ developerId, onClose, onSaved }: Props) {
  const { t } = useTranslation();
  const isEdit = Boolean(developerId);
  const query = useAdminDeveloper(developerId || undefined);
  const createMutation = useCreateDeveloper();
  const updateMutation = useUpdateDeveloper();

  const [fullName, setFullName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [availability, setAvailability] = useState(true);
  const [memberSince, setMemberSince] = useState('');
  const [verified, setVerified] = useState(true);
  const [expertiseTags, setExpertiseTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [experience, setExperience] = useState<ExperienceEntry[]>([
    { company: '', role: '', startYear: '', endYear: '', bullets: [''], technologies: '' }
  ]);
  const [education, setEducation] = useState<EducationEntry[]>([{ school: '', degree: '', year: '' }]);
  const [skills, setSkills] = useState<SkillEntry[]>([{ name: '', years: '' }]);
  const [portfolio, setPortfolio] = useState<PortfolioEntry[]>([emptyPortfolio()]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isEdit || !query.data) return;
    const d = query.data;
    setFullName(d.fullName || '');
    setRoleTitle(d.roleTitle || '');
    setLocation(d.location || '');
    setBio(d.biography?.en || '');
    setAvailability(d.availability !== false);
    setMemberSince(d.memberSince ? d.memberSince.slice(0, 10) : '');
    setVerified(d.verifiedBadge !== false);
    setExpertiseTags(d.expertiseTags || []);
    setExperience(
      d.experience?.length
        ? d.experience.map((e) => ({
            company: e.company || '',
            role: e.role || '',
            startYear: e.startYear ? String(e.startYear) : '',
            endYear: e.endYear !== undefined && e.endYear !== null ? String(e.endYear) : '',
            bullets: e.bullets?.length ? e.bullets : [''],
            technologies: (e.technologies || []).join(', ')
          }))
        : [{ company: '', role: '', startYear: '', endYear: '', bullets: [''], technologies: '' }]
    );
    setEducation(
      d.education?.length
        ? d.education.map((e) => ({
            school: e.school || '',
            degree: e.degree || '',
            year: e.year ? String(e.year) : ''
          }))
        : [{ school: '', degree: '', year: '' }]
    );
    setSkills(
      d.skills?.length
        ? d.skills.map((s) => ({ name: s.name || '', years: String(s.years || '') }))
        : [{ name: '', years: '' }]
    );
    setPortfolio(
      d.portfolio?.length
        ? d.portfolio.map((p) => ({
            _id: p._id,
            title: p.title || '',
            category: p.category || '',
            description: p.description || '',
            overview: p.overview || '',
            brief: p.brief || '',
            challenges: p.challenges || '',
            solutions: p.solutions || '',
            outcomes: p.outcomes || '',
            technologies: (p.technologies || []).join(', '),
            images: normalizePortfolioSlots(p.images),
            imageFiles: []
          }))
        : [emptyPortfolio()]
    );
    setPhotoPreview(resolveDeveloperPhoto({ photo: d.photo }));
  }, [isEdit, query.data]);

  const payload = useMemo(
    () => ({
      fullName,
      roleTitle,
      location,
      bio,
      availability,
      memberSince: memberSince || null,
      isVerified: verified,
      expertiseTags,
      experience: experience
        .filter((e) => e.company.trim() || e.role.trim())
        .map((e) => ({
          company: e.company,
          role: e.role,
          startYear: e.startYear ? Number(e.startYear) : null,
          endYear: e.endYear === 'Present' ? 'Present' : e.endYear ? Number(e.endYear) : null,
          bullets: e.bullets.filter(Boolean),
          technologies: e.technologies
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        })),
      education: education
        .filter((e) => e.school.trim())
        .map((e) => ({
          school: e.school,
          degree: e.degree,
          year: e.year ? Number(e.year) : null
        })),
      skills: skills
        .filter((s) => s.name.trim())
        .map((s) => ({ name: s.name, years: Number(s.years) || 0 })),
      portfolio: portfolio
        .filter((p) => p.title.trim())
        .map((p) => ({
          ...(p._id ? { _id: p._id } : {}),
          title: p.title,
          category: p.category,
          description: p.description,
          overview: p.overview,
          brief: p.brief,
          challenges: p.challenges,
          solutions: p.solutions,
          outcomes: p.outcomes,
          technologies: p.technologies
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          images: p.images.filter(Boolean)
        }))
    }),
    [fullName, roleTitle, location, bio, availability, memberSince, verified, expertiseTags, experience, education, skills, portfolio]
  );

  const saving = createMutation.isPending || updateMutation.isPending;

  async function buildPortfolioImageFiles(project: PortfolioEntry) {
    const files: File[] = [];

    for (let slot = 0; slot < PORTFOLIO_IMAGE_SLOTS; slot += 1) {
      const slotFile = project.imageFiles[slot];
      if (slotFile) {
        files.push(slotFile);
        continue;
      }

      const existing = project.images[slot];
      if (!existing) continue;

      try {
        const res = await fetch(resolveMediaUrl(existing));
        if (!res.ok) continue;
        const blob = await res.blob();
        files.push(new File([blob], `portfolio-${slot}.jpg`, { type: blob.type || 'image/jpeg' }));
      } catch {
        // Keep other slots when one existing image fails to load.
      }
    }

    return files;
  }

  async function syncPortfolioImages(
    devId: string,
    projects: PortfolioEntry[],
    savedPortfolio: { _id: string }[] = []
  ) {
    for (let index = 0; index < projects.length; index += 1) {
      const project = projects[index];
      if (!project.title.trim()) continue;
      if (!project.imageFiles.some(Boolean)) continue;

      const projectId = project._id || savedPortfolio[index]?._id;
      if (!projectId) continue;

      const files = await buildPortfolioImageFiles(project);
      if (!files.length) continue;

      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          title: project.title,
          category: project.category,
          description: project.description,
          overview: project.overview,
          brief: project.brief,
          challenges: project.challenges,
          solutions: project.solutions,
          outcomes: project.outcomes,
          technologies: project.technologies
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        })
      );
      files.forEach((file) => formData.append('images', file));

      await endpoints.admin.developers.updatePortfolio(devId, projectId, formData);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));
    if (photoFile) formData.append('photo', photoFile);

    try {
      if (isEdit && developerId) {
        const res = await updateMutation.mutateAsync({ id: developerId, formData });
        const savedPortfolio = (res.data?.data?.portfolio || []) as { _id: string }[];
        await syncPortfolioImages(developerId, portfolio, savedPortfolio);
        setMessage(t('admin.developers.drawer.updated'));
      } else {
        const res = await createMutation.mutateAsync(formData);
        const created = res.data?.data as { _id?: string; id?: string; portfolio?: { _id: string }[] };
        const devId = created?._id || created?.id;
        if (devId) {
          await syncPortfolioImages(devId, portfolio, created.portfolio || []);
        }
        setMessage(t('admin.developers.drawer.created'));
      }
      onSaved();
      onClose();
    } catch {
      setMessage(t('admin.developers.drawer.saveFailed'));
    }
  }

  function addTagFromInput() {
    if (!tagInput.trim()) return;
    setExpertiseTags((tags) => [...tags, tagInput.trim()]);
    setTagInput('');
  }

  return (
    <>
      <div className="admin-drawer-overlay" onClick={onClose} aria-hidden />
      <aside className="admin-drawer" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="admin-drawer__header">
          <h2 className="admin-drawer__title">
            {isEdit ? t('admin.developers.drawer.editTitle') : t('admin.developers.drawer.addTitle')}
          </h2>
          <button type="button" className="admin-drawer__close" onClick={onClose} aria-label={t('common.close')}>
            ×
          </button>
        </div>

        <form id="developer-drawer-form" className="admin-drawer__body" onSubmit={handleSubmit}>
          <section className="admin-section">
            <h3 className="admin-section__title">{t('admin.developers.drawer.basicInfo')}</h3>

            <div className="admin-photo-upload-wrap">
              <label className="admin-photo-upload">
                {photoPreview ? (
                  <img src={photoPreview} alt="" className="admin-photo-upload__preview" />
                ) : (
                  <Camera className="admin-photo-upload__icon" size={28} strokeWidth={1.5} aria-hidden />
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setPhotoFile(file);
                    if (file) setPhotoPreview(URL.createObjectURL(file));
                  }}
                />
              </label>
              <span className="admin-photo-upload__label">{t('admin.developers.drawer.uploadPhoto')}</span>
            </div>

            <div className="admin-grid-2">
              <label className="admin-field">
                <span className="admin-field__label">{t('admin.developers.drawer.name')}</span>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">{t('admin.developers.drawer.role')}</span>
                <input value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">{t('admin.developers.drawer.location')}</span>
                <input value={location} onChange={(e) => setLocation(e.target.value)} />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">{t('admin.developers.drawer.memberSince')}</span>
                <input type="date" value={memberSince} onChange={(e) => setMemberSince(e.target.value)} />
              </label>
            </div>

            <label className="admin-field">
              <span className="admin-field__label">{t('admin.developers.drawer.bio')}</span>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
            </label>

            <div className="admin-toggle-row">
              <button
                type="button"
                className={`admin-switch${availability ? ' admin-switch--on' : ''}`}
                onClick={() => setAvailability((v) => !v)}
                aria-pressed={availability}
              >
                <span className="admin-switch__knob" />
              </button>
              <span>{t('admin.developers.drawer.available')}</span>
            </div>

            <label className="admin-toggle-row">
              <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} />
              <span>{t('admin.developers.drawer.verified')}</span>
            </label>
          </section>

          <section className="admin-section">
            <h3 className="admin-section__title">{t('admin.developers.drawer.expertise')}</h3>
            <div className="admin-tag-input-row">
              <input
                value={tagInput}
                placeholder={t('admin.developers.drawer.skillHint')}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTagFromInput();
                  }
                }}
              />
              <button type="button" className="admin-btn admin-btn--ghost" onClick={addTagFromInput}>
                {t('admin.developers.drawer.add')}
              </button>
            </div>
            <div className="admin-tags">
              {expertiseTags.map((tag) => (
                <button key={tag} type="button" className="admin-tag" onClick={() => setExpertiseTags((tags) => tags.filter((x) => x !== tag))}>
                  {tag} ×
                </button>
              ))}
            </div>
          </section>

          <section className="admin-section">
            <h3 className="admin-section__title">{t('admin.developers.drawer.experience')}</h3>
            {experience.map((entry, idx) => (
              <div key={idx} className="admin-card-block">
                <div className="admin-grid-2">
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.developers.drawer.role')}</span>
                    <input value={entry.role} onChange={(e) => updateExperience(idx, 'role', e.target.value)} />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.developers.drawer.company')}</span>
                    <input value={entry.company} onChange={(e) => updateExperience(idx, 'company', e.target.value)} />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.developers.drawer.startYear')}</span>
                    <input value={entry.startYear} onChange={(e) => updateExperience(idx, 'startYear', e.target.value)} />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.developers.drawer.endYear')}</span>
                    <input value={entry.endYear} onChange={(e) => updateExperience(idx, 'endYear', e.target.value)} />
                  </label>
                </div>
                {entry.bullets.map((bullet, bIdx) => (
                  <label key={bIdx} className="admin-field">
                    <span className="admin-field__label">{t('admin.developers.drawer.bullet', { n: bIdx + 1 })}</span>
                    <textarea
                      value={bullet}
                      rows={2}
                      onChange={(e) => updateExperienceBullet(idx, bIdx, e.target.value)}
                    />
                  </label>
                ))}
                <button type="button" className="admin-link-btn" onClick={() => addExperienceBullet(idx)}>
                  {t('admin.developers.drawer.addBullet')}
                </button>
                <label className="admin-field">
                  <span className="admin-field__label">{t('admin.developers.drawer.technologies')}</span>
                  <input value={entry.technologies} onChange={(e) => updateExperience(idx, 'technologies', e.target.value)} />
                </label>
                <button type="button" className="admin-card-block__remove" onClick={() => setExperience((e) => e.filter((_, i) => i !== idx))}>
                  {t('admin.developers.drawer.removeEntry')}
                </button>
              </div>
            ))}
            <button
              type="button"
              className="admin-link-btn"
              onClick={() =>
                setExperience((e) => [...e, { company: '', role: '', startYear: '', endYear: '', bullets: [''], technologies: '' }])
              }
            >
              {t('admin.developers.drawer.addExperience')}
            </button>
          </section>

          <section className="admin-section">
            <h3 className="admin-section__title">{t('admin.developers.drawer.education')}</h3>
            {education.map((entry, idx) => (
              <div key={idx} className="admin-card-block">
                <div className="admin-grid-2">
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.developers.drawer.school')}</span>
                    <input value={entry.school} onChange={(e) => updateEducation(idx, 'school', e.target.value)} />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.developers.drawer.degree')}</span>
                    <input value={entry.degree} onChange={(e) => updateEducation(idx, 'degree', e.target.value)} />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.developers.drawer.year')}</span>
                    <input value={entry.year} onChange={(e) => updateEducation(idx, 'year', e.target.value)} />
                  </label>
                </div>
              </div>
            ))}
            <button type="button" className="admin-link-btn" onClick={() => setEducation((e) => [...e, { school: '', degree: '', year: '' }])}>
              {t('admin.developers.drawer.addEducation')}
            </button>
          </section>

          <section className="admin-section">
            <h3 className="admin-section__title">{t('admin.developers.drawer.skills')}</h3>
            {skills.map((entry, idx) => (
              <div key={idx} className="admin-card-block admin-grid-2">
                <label className="admin-field">
                  <span className="admin-field__label">{t('admin.developers.drawer.skill')}</span>
                  <input value={entry.name} onChange={(e) => updateSkill(idx, 'name', e.target.value)} />
                </label>
                <label className="admin-field">
                  <span className="admin-field__label">{t('admin.developers.drawer.years')}</span>
                  <input value={entry.years} onChange={(e) => updateSkill(idx, 'years', e.target.value)} />
                </label>
              </div>
            ))}
            <button type="button" className="admin-link-btn" onClick={() => setSkills((s) => [...s, { name: '', years: '' }])}>
              {t('admin.developers.drawer.addSkill')}
            </button>
          </section>

          <section className="admin-section">
            <h3 className="admin-section__title">{t('admin.developers.drawer.portfolio')}</h3>
            {portfolio.map((project, idx) => (
              <div key={idx} className="admin-card-block">
                <div className="admin-grid-2">
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.developers.drawer.title')}</span>
                    <input value={project.title} onChange={(e) => updatePortfolio(idx, 'title', e.target.value)} />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field__label">{t('admin.developers.drawer.category')}</span>
                    <select value={project.category} onChange={(e) => updatePortfolio(idx, 'category', e.target.value)}>
                      <option value="">{t('admin.developers.drawer.selectCategory')}</option>
                      {PORTFOLIO_CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {t(cat.labelKey)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="admin-image-grid">
                  {Array.from({ length: PORTFOLIO_IMAGE_SLOTS }).map((_, slotIdx) => {
                    const file = project.imageFiles[slotIdx];
                    const preview = file
                      ? URL.createObjectURL(file)
                      : project.images[slotIdx]
                        ? resolveMediaUrl(project.images[slotIdx])
                        : '';
                    const hasImage = Boolean(preview);
                    return (
                      <div key={slotIdx} className="admin-image-slot">
                        <label className="admin-image-slot__picker">
                          {hasImage ? (
                            <img src={preview} alt="" className="admin-image-slot__preview" />
                          ) : (
                            <span className="admin-image-slot__placeholder">+</span>
                          )}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            hidden
                            onChange={(e) => {
                              const nextFile = e.target.files?.[0];
                              e.target.value = '';
                              if (!nextFile) return;
                              const next = [...portfolio];
                              const files = [...next[idx].imageFiles];
                              files[slotIdx] = nextFile;
                              next[idx] = { ...next[idx], imageFiles: files };
                              setPortfolio(next);
                            }}
                          />
                        </label>
                        {hasImage ? (
                          <button
                            type="button"
                            className="admin-image-slot__remove"
                            aria-label={t('admin.developers.drawer.removeImage')}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              clearPortfolioImage(idx, slotIdx);
                            }}
                          >
                            <X size={14} strokeWidth={2.5} aria-hidden />
                          </button>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {(['description', 'overview', 'brief', 'challenges', 'solutions', 'outcomes'] as const).map((field) => (
                  <label key={field} className="admin-field">
                    <span className="admin-field__label">
                      {t(`admin.developers.drawer.${field === 'description' ? 'projectDescription' : field}`)}
                    </span>
                    <textarea value={project[field]} rows={2} onChange={(e) => updatePortfolio(idx, field, e.target.value)} />
                  </label>
                ))}

                <label className="admin-field">
                  <span className="admin-field__label">{t('admin.developers.drawer.techComma')}</span>
                  <input value={project.technologies} onChange={(e) => updatePortfolio(idx, 'technologies', e.target.value)} />
                </label>
              </div>
            ))}
            <button type="button" className="admin-link-btn" onClick={() => setPortfolio((p) => [...p, emptyPortfolio()])}>
              {t('admin.developers.drawer.addProject')}
            </button>
          </section>

          {message ? <p className="admin-message">{message}</p> : null}
        </form>

        <div className="admin-drawer__footer">
          <button type="button" className="admin-btn admin-btn--ghost" onClick={onClose}>
            {t('common.cancel')}
          </button>
          <button type="submit" form="developer-drawer-form" className="admin-btn" disabled={saving}>
            {saving ? t('common.saving') : t('admin.developers.drawer.saveDeveloper')}
          </button>
        </div>
      </aside>
    </>
  );

  function updateExperience(index: number, key: keyof ExperienceEntry, value: string) {
    const next = [...experience];
    next[index] = { ...next[index], [key]: value };
    setExperience(next);
  }

  function updateExperienceBullet(expIdx: number, bulletIdx: number, value: string) {
    const next = [...experience];
    const bullets = [...next[expIdx].bullets];
    bullets[bulletIdx] = value;
    next[expIdx] = { ...next[expIdx], bullets };
    setExperience(next);
  }

  function addExperienceBullet(expIdx: number) {
    const next = [...experience];
    next[expIdx] = { ...next[expIdx], bullets: [...next[expIdx].bullets, ''] };
    setExperience(next);
  }

  function updateEducation(index: number, key: keyof EducationEntry, value: string) {
    const next = [...education];
    next[index] = { ...next[index], [key]: value };
    setEducation(next);
  }

  function updateSkill(index: number, key: keyof SkillEntry, value: string) {
    const next = [...skills];
    next[index] = { ...next[index], [key]: value };
    setSkills(next);
  }

  function updatePortfolio(index: number, key: keyof PortfolioEntry, value: string) {
    const next = [...portfolio];
    next[index] = { ...next[index], [key]: value };
    setPortfolio(next);
  }

  function clearPortfolioImage(projectIdx: number, slotIdx: number) {
    setPortfolio((prev) => {
      const next = [...prev];
      const project = next[projectIdx];
      if (!project) return prev;

      const images = normalizePortfolioSlots(project.images);
      images[slotIdx] = '';

      const imageFiles = [...project.imageFiles];
      imageFiles[slotIdx] = undefined;

      next[projectIdx] = { ...project, images, imageFiles };
      return next;
    });
  }
}
