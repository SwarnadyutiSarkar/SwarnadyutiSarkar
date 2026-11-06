import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  loginWithGoogle,
  logoutUser,
  ADMIN_EMAIL,
} from '../firebase/config';
import {
  Project,
  Experience,
  Education,
  Certification,
  Achievement,
  SkillGroup,
  PortfolioSettings,
} from '../types/portfolio';
import {
  X,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle,
  Database,
  Upload,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { LilyBadge } from './Lilies';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType =
  | 'settings'
  | 'projects'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'achievements'
  | 'skills';

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const {
    settings,
    projects,
    experience,
    education,
    certifications,
    achievements,
    skills,
    currentUser,
    isAdmin,
    updateSettings,
    saveProject,
    deleteProject,
    saveExperience,
    deleteExperience,
    saveEducation,
    deleteEducation,
    saveCertification,
    deleteCertification,
    saveAchievement,
    deleteAchievement,
    saveSkillGroup,
    deleteSkillGroup,
    seedFirestore,
    isSeeding,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form edit states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [editingAch, setEditingAch] = useState<Achievement | null>(null);
  const [editingSkill, setEditingSkill] = useState<SkillGroup | null>(null);
  const [settingsForm, setSettingsForm] = useState<PortfolioSettings>(settings);

  // Confirm delete state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: string;
    id: string;
    title: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      const res = await loginWithGoogle();
      if (res.user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        setAuthError(
          `Unauthorized: Only ${ADMIN_EMAIL} is authorized to edit portfolio contents.`
        );
      }
    } catch (err: any) {
      setAuthError(err.message || 'Google Sign-in failed. Please try again.');
    }
  };

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  // Image / file upload helper (Data URL)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      onComplete(result);
      showToast('File loaded successfully.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2E2230]/70 backdrop-blur-xs animate-in fade-in"
    >
      <div className="bg-[#FAF0EA] rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col border border-[#D49B9E] shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8C5C8] flex items-center justify-between bg-[#F5EAE9]">
          <div className="flex items-center gap-3">
            <LilyBadge styleName="blooming" className="w-8 h-8 text-[#5B2A4A]" />
            <div>
              <h2 id="admin-title" className="font-display font-bold text-xl text-[#5B2A4A]">
                Portfolio Owner Admin
              </h2>
              <p className="text-xs text-[#2E2230]/70 font-sans">
                Authorized for {ADMIN_EMAIL}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                type="button"
                onClick={() => logoutUser()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#5B2A4A] hover:bg-white border border-[#E8C5C8] transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close Admin Modal"
              className="p-2 rounded-full hover:bg-white text-[#5B2A4A] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success toast */}
        {successMessage && (
          <div className="bg-[#EFF3ED] border-b border-[#748A6D]/40 px-6 py-2.5 flex items-center gap-2 text-xs font-semibold text-[#748A6D]">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error message */}
        {authError && (
          <div className="bg-[#FBEAEA] border-b border-[#D49B9E] px-6 py-2.5 flex items-center gap-2 text-xs font-semibold text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* BODY */}
        {!currentUser || !isAdmin ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto flex flex-col items-center">
            <div className="p-4 rounded-3xl bg-[#F5EAE9] border border-[#E8C5C8] mb-4">
              <Lock className="w-10 h-10 text-[#5B2A4A]" />
            </div>

            <h3 className="font-display font-bold text-2xl text-[#5B2A4A] mb-2">
              Sign In with Google
            </h3>
            <p className="text-sm text-[#2E2230]/80 font-sans mb-6">
              Only the verified portfolio owner (<strong>{ADMIN_EMAIL}</strong>) has write access to update entries, settings, and files.
            </p>

            <button
              type="button"
              onClick={handleSignIn}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[#5B2A4A] hover:bg-[#48203a] text-white font-semibold text-sm transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#5B2A4A] cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-52 border-b md:border-b-0 md:border-r border-[#E8C5C8] p-3 bg-[#F5EAE9]/60 flex md:flex-col gap-1 overflow-x-auto shrink-0 font-sans">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('projects');
                  setEditingProject(null);
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'projects' ? 'bg-[#5B2A4A] text-white' : 'text-[#2E2230] hover:bg-white'
                }`}
              >
                Projects ({projects.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('experience');
                  setEditingExperience(null);
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'experience' ? 'bg-[#5B2A4A] text-white' : 'text-[#2E2230] hover:bg-white'
                }`}
              >
                Experience ({experience.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('education');
                  setEditingEducation(null);
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'education' ? 'bg-[#5B2A4A] text-white' : 'text-[#2E2230] hover:bg-white'
                }`}
              >
                Education ({education.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('certifications');
                  setEditingCert(null);
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'certifications' ? 'bg-[#5B2A4A] text-white' : 'text-[#2E2230] hover:bg-white'
                }`}
              >
                Certifications ({certifications.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('achievements');
                  setEditingAch(null);
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'achievements' ? 'bg-[#5B2A4A] text-white' : 'text-[#2E2230] hover:bg-white'
                }`}
              >
                Achievements ({achievements.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('skills');
                  setEditingSkill(null);
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'skills' ? 'bg-[#5B2A4A] text-white' : 'text-[#2E2230] hover:bg-white'
                }`}
              >
                Skills ({skills.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('settings');
                  setSettingsForm(settings);
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'settings' ? 'bg-[#5B2A4A] text-white' : 'text-[#2E2230] hover:bg-white'
                }`}
              >
                Site Settings
              </button>

              {/* Seed / Sync button */}
              <div className="mt-auto pt-4 border-t border-[#E8C5C8]/80 hidden md:block">
                <button
                  type="button"
                  onClick={async () => {
                    await seedFirestore(true);
                    showToast('Database reset to complete initial data.');
                  }}
                  disabled={isSeeding}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-semibold text-[#5B2A4A] bg-[#FBF4EF] hover:bg-white border border-[#E8C5C8] rounded-xl transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isSeeding ? 'animate-spin' : ''}`} />
                  <span>{isSeeding ? 'Seeding...' : 'Reset Initial Data'}</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto font-sans">
              
              {/* TAB 1: PROJECTS */}
              {activeTab === 'projects' && (
                <div>
                  {!editingProject ? (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-bold text-lg text-[#5B2A4A]">
                          Projects ({projects.length})
                        </h3>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingProject({
                              id: `proj-${Date.now()}`,
                              title: '',
                              summary: '',
                              description: '',
                              tags: ['AI'],
                              techStack: ['React', 'TypeScript'],
                              liveUrl: '',
                              githubUrl: '',
                              screenshots: [],
                              lilyStyle: 'blooming',
                              featured: false,
                              order: projects.length + 1,
                            })
                          }
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5B2A4A] text-white text-xs font-semibold hover:bg-[#48203a] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Project</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {projects.map((p) => (
                          <div
                            key={p.id}
                            className="p-4 rounded-2xl bg-white border border-[#E8C5C8] flex items-center justify-between gap-4 shadow-2xs"
                          >
                            <div className="flex items-center gap-3">
                              <LilyBadge styleName={p.lilyStyle} className="w-10 h-10" />
                              <div>
                                <h4 className="font-display font-bold text-sm text-[#5B2A4A]">
                                  {p.title}
                                </h4>
                                <p className="text-xs text-[#2E2230]/75 line-clamp-1">
                                  {p.summary}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingProject(p)}
                                className="p-1.5 rounded-lg text-[#5B2A4A] hover:bg-[#F5EAE9] transition-colors cursor-pointer"
                                aria-label="Edit project"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: 'project',
                                    id: p.id,
                                    title: p.title,
                                  })
                                }
                                className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                                aria-label="Delete project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Edit Project Form */
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await saveProject(editingProject);
                        setEditingProject(null);
                        showToast(`Project "${editingProject.title}" saved!`);
                      }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-[#E8C5C8]">
                        <h4 className="font-display font-bold text-base text-[#5B2A4A]">
                          {editingProject.title ? `Edit "${editingProject.title}"` : 'New Project'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="text-xs text-[#2E2230]/70 hover:text-[#2E2230] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            required
                            value={editingProject.title}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, title: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] focus:ring-1 focus:ring-[#5B2A4A] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            Lily Illustration Style
                          </label>
                          <select
                            value={editingProject.lilyStyle}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                lilyStyle: e.target.value as any,
                              })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] focus:ring-1 focus:ring-[#5B2A4A] outline-none"
                          >
                            <option value="blooming">Blooming Lily</option>
                            <option value="tiger">Tiger Lily</option>
                            <option value="waterlily">Water Lily</option>
                            <option value="stargazer">Stargazer Lily</option>
                            <option value="calla">Calla Lily</option>
                            <option value="classic">Classic Lily</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          One-Line Summary
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProject.summary}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, summary: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] focus:ring-1 focus:ring-[#5B2A4A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Long Description
                        </label>
                        <textarea
                          rows={4}
                          value={editingProject.description}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, description: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] focus:ring-1 focus:ring-[#5B2A4A] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            Tags (comma separated: AI, Data, Climate, Full-stack)
                          </label>
                          <input
                            type="text"
                            value={editingProject.tags.join(', ')}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                              })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] focus:ring-1 focus:ring-[#5B2A4A] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            Tech Stack (comma separated)
                          </label>
                          <input
                            type="text"
                            value={editingProject.techStack.join(', ')}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                              })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] focus:ring-1 focus:ring-[#5B2A4A] outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            Live Project Link (empty to hide button)
                          </label>
                          <input
                            type="url"
                            value={editingProject.liveUrl || ''}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, liveUrl: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] focus:ring-1 focus:ring-[#5B2A4A] outline-none"
                            placeholder="https://..."
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            GitHub Link (empty to hide button)
                          </label>
                          <input
                            type="url"
                            value={editingProject.githubUrl || ''}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, githubUrl: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] focus:ring-1 focus:ring-[#5B2A4A] outline-none"
                            placeholder="https://github.com/..."
                          />
                        </div>
                      </div>

                      {/* Screenshot upload slot */}
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Upload Screenshot
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => {
                              setEditingProject({
                                ...editingProject,
                                screenshots: [...(editingProject.screenshots || []), url],
                              });
                            })
                          }
                          className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F5EAE9] file:text-[#5B2A4A] hover:file:bg-[#E8C5C8] cursor-pointer"
                        />
                        {editingProject.screenshots && editingProject.screenshots.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {editingProject.screenshots.map((s, idx) => (
                              <div key={idx} className="relative w-16 h-12 rounded border border-[#E8C5C8] overflow-hidden">
                                <img src={s} alt="screenshot" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setEditingProject({
                                      ...editingProject,
                                      screenshots: editingProject.screenshots?.filter((_, i) => i !== idx),
                                    })
                                  }
                                  className="absolute top-0 right-0 bg-red-600 text-white text-[9px] px-1"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end gap-2 pt-3">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 text-xs font-medium text-[#2E2230]/75 hover:bg-white rounded-full cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#5B2A4A] hover:bg-[#48203a] text-white text-xs font-semibold cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Project</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 2: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div>
                  {!editingExperience ? (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-bold text-lg text-[#5B2A4A]">
                          Experience ({experience.length})
                        </h3>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingExperience({
                              id: `exp-${Date.now()}`,
                              role: '',
                              organization: '',
                              location: 'New Delhi, India',
                              startDate: '2025',
                              endDate: 'Present',
                              impactHeadline: '',
                              bullets: [''],
                              linkUrl: '',
                              linkText: 'Website I manage',
                              tags: ['Tech', 'Development'],
                              isVolunteer: false,
                              order: experience.length + 1,
                            })
                          }
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5B2A4A] text-white text-xs font-semibold hover:bg-[#48203a] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Role</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {experience.map((e) => (
                          <div
                            key={e.id}
                            className="p-4 rounded-2xl bg-white border border-[#E8C5C8] flex items-center justify-between gap-4 shadow-2xs"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-display font-bold text-sm text-[#5B2A4A]">
                                  {e.role}
                                </h4>
                                {e.isVolunteer && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFF3ED] text-[#748A6D] font-semibold">
                                    Volunteer
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#2E2230]/75">
                                {e.organization} · {e.startDate} – {e.endDate}
                              </p>
                              <p className="text-xs text-[#5B2A4A] font-medium mt-1">
                                {e.impactHeadline}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingExperience(e)}
                                className="p-1.5 rounded-lg text-[#5B2A4A] hover:bg-[#F5EAE9] cursor-pointer"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: 'experience',
                                    id: e.id,
                                    title: `${e.role} at ${e.organization}`,
                                  })
                                }
                                className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Edit Experience Form */
                    <form
                      onSubmit={async (ev) => {
                        ev.preventDefault();
                        await saveExperience(editingExperience);
                        setEditingExperience(null);
                        showToast(`Experience role saved!`);
                      }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-[#E8C5C8]">
                        <h4 className="font-display font-bold text-base text-[#5B2A4A]">
                          {editingExperience.role ? `Edit "${editingExperience.role}"` : 'New Role'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingExperience(null)}
                          className="text-xs text-[#2E2230]/70 hover:text-[#2E2230] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            Role Title
                          </label>
                          <input
                            type="text"
                            required
                            value={editingExperience.role}
                            onChange={(e) =>
                              setEditingExperience({ ...editingExperience, role: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            Organization
                          </label>
                          <input
                            type="text"
                            required
                            value={editingExperience.organization}
                            onChange={(e) =>
                              setEditingExperience({ ...editingExperience, organization: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={editingExperience.location}
                            onChange={(e) =>
                              setEditingExperience({ ...editingExperience, location: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            Start Date
                          </label>
                          <input
                            type="text"
                            value={editingExperience.startDate}
                            onChange={(e) =>
                              setEditingExperience({ ...editingExperience, startDate: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            End Date
                          </label>
                          <input
                            type="text"
                            value={editingExperience.endDate}
                            onChange={(e) =>
                              setEditingExperience({ ...editingExperience, endDate: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          One-Line Impact Headline (visible on card)
                        </label>
                        <input
                          type="text"
                          required
                          value={editingExperience.impactHeadline}
                          onChange={(e) =>
                            setEditingExperience({ ...editingExperience, impactHeadline: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] outline-none"
                        />
                      </div>

                      {/* Volunteer & Tags */}
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 text-xs font-semibold text-[#5B2A4A] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingExperience.isVolunteer}
                            onChange={(e) =>
                              setEditingExperience({ ...editingExperience, isVolunteer: e.target.checked })
                            }
                            className="rounded text-[#5B2A4A]"
                          />
                          <span>Volunteer Assignment</span>
                        </label>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-[#5B2A4A]">Tags:</span>
                          <label className="flex items-center gap-1 text-xs cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingExperience.tags.includes('Tech')}
                              onChange={(e) => {
                                const current: ('Tech' | 'Development')[] = editingExperience.tags.filter(
                                  (t) => t !== 'Tech'
                                );
                                if (e.target.checked) current.push('Tech');
                                setEditingExperience({ ...editingExperience, tags: current });
                              }}
                            />
                            <span>Tech</span>
                          </label>
                          <label className="flex items-center gap-1 text-xs cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingExperience.tags.includes('Development')}
                              onChange={(e) => {
                                const current: ('Tech' | 'Development')[] = editingExperience.tags.filter(
                                  (t) => t !== 'Development'
                                );
                                if (e.target.checked) current.push('Development');
                                setEditingExperience({ ...editingExperience, tags: current });
                              }}
                            />
                            <span>Development</span>
                          </label>
                        </div>
                      </div>

                      {/* Bullets */}
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Bullets (one per line)
                        </label>
                        <textarea
                          rows={6}
                          value={editingExperience.bullets.join('\n')}
                          onChange={(e) =>
                            setEditingExperience({
                              ...editingExperience,
                              bullets: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                            })
                          }
                          className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] outline-none"
                          placeholder="Bullet point 1&#10;Bullet point 2..."
                        />
                      </div>

                      {/* Link URL & text */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            Link URL (optional)
                          </label>
                          <input
                            type="url"
                            value={editingExperience.linkUrl || ''}
                            onChange={(e) =>
                              setEditingExperience({ ...editingExperience, linkUrl: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] outline-none"
                            placeholder="https://..."
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                            Link Button Label
                          </label>
                          <input
                            type="text"
                            value={editingExperience.linkText || ''}
                            onChange={(e) =>
                              setEditingExperience({ ...editingExperience, linkText: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] outline-none"
                            placeholder="Website I manage"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-3">
                        <button
                          type="button"
                          onClick={() => setEditingExperience(null)}
                          className="px-4 py-2 text-xs font-medium text-[#2E2230]/75 hover:bg-white rounded-full cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#5B2A4A] hover:bg-[#48203a] text-white text-xs font-semibold cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Role</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 3: EDUCATION */}
              {activeTab === 'education' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-lg text-[#5B2A4A]">
                      Education ({education.length})
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingEducation({
                          id: `edu-${Date.now()}`,
                          degree: '',
                          institution: '',
                          period: '2024 – 2026',
                          details: '',
                          order: education.length + 1,
                        })
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5B2A4A] text-white text-xs font-semibold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Education</span>
                    </button>
                  </div>

                  {editingEducation ? (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await saveEducation(editingEducation);
                        setEditingEducation(null);
                        showToast('Education saved.');
                      }}
                      className="p-4 bg-white rounded-2xl border border-[#E8C5C8] space-y-3 mb-4"
                    >
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Degree / Program
                        </label>
                        <input
                          type="text"
                          required
                          value={editingEducation.degree}
                          onChange={(e) =>
                            setEditingEducation({ ...editingEducation, degree: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8C5C8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Institution
                        </label>
                        <input
                          type="text"
                          required
                          value={editingEducation.institution}
                          onChange={(e) =>
                            setEditingEducation({ ...editingEducation, institution: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8C5C8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Period
                        </label>
                        <input
                          type="text"
                          value={editingEducation.period}
                          onChange={(e) =>
                            setEditingEducation({ ...editingEducation, period: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8C5C8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Details
                        </label>
                        <input
                          type="text"
                          value={editingEducation.details || ''}
                          onChange={(e) =>
                            setEditingEducation({ ...editingEducation, details: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8C5C8]"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingEducation(null)}
                          className="px-3 py-1.5 text-xs text-[#2E2230]/75"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-full bg-[#5B2A4A] text-white text-xs font-semibold"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  ) : null}

                  <div className="space-y-2">
                    {education.map((edu) => (
                      <div
                        key={edu.id}
                        className="p-3 rounded-xl bg-white border border-[#E8C5C8] flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-xs text-[#5B2A4A]">{edu.degree}</p>
                          <p className="text-[11px] text-[#2E2230]/75">{edu.institution} ({edu.period})</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingEducation(edu)}
                            className="p-1 text-[#5B2A4A]"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteConfirm({ type: 'education', id: edu.id, title: edu.degree })
                            }
                            className="p-1 text-rose-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CERTIFICATIONS */}
              {activeTab === 'certifications' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-lg text-[#5B2A4A]">
                      Certifications ({certifications.length})
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingCert({
                          id: `cert-${Date.now()}`,
                          title: '',
                          issuer: '',
                          year: '2024',
                          order: certifications.length + 1,
                        })
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5B2A4A] text-white text-xs font-semibold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Certificate</span>
                    </button>
                  </div>

                  {editingCert ? (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await saveCertification(editingCert);
                        setEditingCert(null);
                        showToast('Certification saved.');
                      }}
                      className="p-4 bg-white rounded-2xl border border-[#E8C5C8] space-y-3 mb-4"
                    >
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Certificate Title
                        </label>
                        <input
                          type="text"
                          required
                          value={editingCert.title}
                          onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8C5C8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Issuer
                        </label>
                        <input
                          type="text"
                          value={editingCert.issuer || ''}
                          onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8C5C8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">Year</label>
                        <input
                          type="text"
                          value={editingCert.year || ''}
                          onChange={(e) => setEditingCert({ ...editingCert, year: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8C5C8]"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingCert(null)}
                          className="px-3 py-1.5 text-xs text-[#2E2230]/75"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-full bg-[#5B2A4A] text-white text-xs font-semibold"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  ) : null}

                  <div className="space-y-2">
                    {certifications.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 rounded-xl bg-white border border-[#E8C5C8] flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-xs text-[#5B2A4A]">{c.title}</p>
                          <p className="text-[11px] text-[#2E2230]/75">{c.issuer} {c.year ? `· ${c.year}` : ''}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingCert(c)}
                            className="p-1 text-[#5B2A4A]"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteConfirm({ type: 'cert', id: c.id, title: c.title })
                            }
                            className="p-1 text-rose-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: ACHIEVEMENTS */}
              {activeTab === 'achievements' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-lg text-[#5B2A4A]">
                      Achievements ({achievements.length})
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingAch({
                          id: `ach-${Date.now()}`,
                          title: '',
                          organization: '',
                          year: '2024',
                          description: '',
                          order: achievements.length + 1,
                        })
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5B2A4A] text-white text-xs font-semibold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Achievement</span>
                    </button>
                  </div>

                  {editingAch ? (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await saveAchievement(editingAch);
                        setEditingAch(null);
                        showToast('Achievement saved.');
                      }}
                      className="p-4 bg-white rounded-2xl border border-[#E8C5C8] space-y-3 mb-4"
                    >
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Achievement Title
                        </label>
                        <input
                          type="text"
                          required
                          value={editingAch.title}
                          onChange={(e) => setEditingAch({ ...editingAch, title: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8C5C8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Organization
                        </label>
                        <input
                          type="text"
                          value={editingAch.organization || ''}
                          onChange={(e) => setEditingAch({ ...editingAch, organization: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8C5C8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Year / Occasion
                        </label>
                        <input
                          type="text"
                          value={editingAch.year || ''}
                          onChange={(e) => setEditingAch({ ...editingAch, year: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8C5C8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={editingAch.description || ''}
                          onChange={(e) => setEditingAch({ ...editingAch, description: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8C5C8]"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingAch(null)}
                          className="px-3 py-1.5 text-xs text-[#2E2230]/75"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-full bg-[#5B2A4A] text-white text-xs font-semibold"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  ) : null}

                  <div className="space-y-2">
                    {achievements.map((ach) => (
                      <div
                        key={ach.id}
                        className="p-3 rounded-xl bg-white border border-[#E8C5C8] flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-xs text-[#5B2A4A]">{ach.title}</p>
                          <p className="text-[11px] text-[#2E2230]/75">{ach.organization} · {ach.year}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingAch(ach)}
                            className="p-1 text-[#5B2A4A]"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteConfirm({ type: 'ach', id: ach.id, title: ach.title })
                            }
                            className="p-1 text-rose-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SKILLS */}
              {activeTab === 'skills' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-lg text-[#5B2A4A]">
                      Skills Categories ({skills.length})
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {skills.map((grp) => (
                      <div key={grp.id} className="p-4 rounded-xl bg-white border border-[#E8C5C8]">
                        <h4 className="font-semibold text-xs text-[#5B2A4A] mb-1.5">{grp.category}</h4>
                        <input
                          type="text"
                          value={grp.items.join(', ')}
                          onChange={async (e) => {
                            const newItems = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                            await saveSkillGroup({ ...grp, items: newItems });
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-[#FAF0EA] rounded-lg border border-[#E8C5C8]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: SITE SETTINGS */}
              {activeTab === 'settings' && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await updateSettings(settingsForm);
                    showToast('Portfolio settings updated successfully!');
                  }}
                  className="space-y-4"
                >
                  <h3 className="font-display font-bold text-lg text-[#5B2A4A] pb-2 border-b border-[#E8C5C8]">
                    Global Site Settings
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                        Hero Name Title
                      </label>
                      <input
                        type="text"
                        value={settingsForm.heroTitle}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                        Open-to Badge
                      </label>
                      <input
                        type="text"
                        value={settingsForm.openToBadge}
                        onChange={(e) => setSettingsForm({ ...settingsForm, openToBadge: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                      Hero Tagline (Italic Serif)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.heroTagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroTagline: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                      Hero Intro
                    </label>
                    <textarea
                      rows={2}
                      value={settingsForm.heroIntro}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroIntro: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                      About Me Long Text
                    </label>
                    <textarea
                      rows={4}
                      value={settingsForm.aboutText}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutText: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8]"
                    />
                  </div>

                  {/* About Stats Strip Numbers */}
                  <div className="p-3 bg-[#FAF0EA] rounded-xl border border-[#E8C5C8]">
                    <p className="text-xs font-bold text-[#5B2A4A] mb-2">About Section Stats Numbers</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5B2A4A] mb-0.5">
                          Projects Count
                        </label>
                        <input
                          type="text"
                          value={settingsForm.statProjectsCount || '8'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, statProjectsCount: e.target.value })}
                          placeholder="8"
                          className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-[#E8C5C8]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5B2A4A] mb-0.5">
                          Countries Tracked
                        </label>
                        <input
                          type="text"
                          value={settingsForm.statCountriesTracked || '194'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, statCountriesTracked: e.target.value })}
                          placeholder="194"
                          className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-[#E8C5C8]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5B2A4A] mb-0.5">
                          Case Studies
                        </label>
                        <input
                          type="text"
                          value={settingsForm.statCaseStudies || '30'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, statCaseStudies: e.target.value })}
                          placeholder="30"
                          className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-[#E8C5C8]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5B2A4A] mb-0.5">
                          UN Entities
                        </label>
                        <input
                          type="text"
                          value={settingsForm.statUNEntities || '5'}
                          onChange={(e) => setSettingsForm({ ...settingsForm, statUNEntities: e.target.value })}
                          placeholder="5"
                          className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-[#E8C5C8]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                        Script Quote
                      </label>
                      <input
                        type="text"
                        value={settingsForm.quote}
                        onChange={(e) => setSettingsForm({ ...settingsForm, quote: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                        Spoken Languages
                      </label>
                      <input
                        type="text"
                        value={settingsForm.spokenLanguages}
                        onChange={(e) => setSettingsForm({ ...settingsForm, spokenLanguages: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8]"
                      />
                    </div>
                  </div>

                  {/* Arched Photo Frame Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                      Hero Portrait Photo
                    </label>
                    <div className="flex items-center gap-3">
                      {settingsForm.photoUrl && (
                        <img
                          src={settingsForm.photoUrl}
                          alt="preview"
                          className="w-12 h-16 object-cover rounded-t-full rounded-b-md border border-[#E8C5C8]"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(e, (url) => setSettingsForm({ ...settingsForm, photoUrl: url }))
                        }
                        className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F5EAE9] file:text-[#5B2A4A]"
                      />
                    </div>
                  </div>

                  {/* Resumes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                        Tech Resume URL (or upload)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.techResumeUrl || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, techResumeUrl: e.target.value })}
                        placeholder="https://... or data:..."
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] mb-1"
                      />
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                          handleFileUpload(e, (url) =>
                            setSettingsForm({ ...settingsForm, techResumeUrl: url })
                          )
                        }
                        className="text-xs file:py-1 file:px-2 file:rounded file:text-[11px] file:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                        Development Resume URL (or upload)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.devResumeUrl || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, devResumeUrl: e.target.value })}
                        placeholder="https://... or data:..."
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8] mb-1"
                      />
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                          handleFileUpload(e, (url) =>
                            setSettingsForm({ ...settingsForm, devResumeUrl: url })
                          )
                        }
                        className="text-xs file:py-1 file:px-2 file:rounded file:text-[11px] file:bg-gray-100"
                      />
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={settingsForm.email}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={settingsForm.linkedinUrl}
                        onChange={(e) => setSettingsForm({ ...settingsForm, linkedinUrl: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#5B2A4A] mb-1">
                        GitHub URL (hide if empty)
                      </label>
                      <input
                        type="url"
                        value={settingsForm.githubUrl || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, githubUrl: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E8C5C8]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#5B2A4A] hover:bg-[#48203a] text-white text-xs font-semibold cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Settings</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>

      {/* CONFIRM DELETE MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-rose-300 shadow-xl">
            <h4 className="font-display font-bold text-base text-rose-800 mb-2">
              Confirm Delete
            </h4>
            <p className="text-xs text-[#2E2230] mb-4">
              Are you sure you want to delete <strong>"{deleteConfirm.title}"</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-3 py-1.5 text-xs text-[#2E2230]/75 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (deleteConfirm.type === 'project') {
                    await deleteProject(deleteConfirm.id);
                  } else if (deleteConfirm.type === 'experience') {
                    await deleteExperience(deleteConfirm.id);
                  } else if (deleteConfirm.type === 'education') {
                    await deleteEducation(deleteConfirm.id);
                  } else if (deleteConfirm.type === 'cert') {
                    await deleteCertification(deleteConfirm.id);
                  } else if (deleteConfirm.type === 'ach') {
                    await deleteAchievement(deleteConfirm.id);
                  }
                  setDeleteConfirm(null);
                  showToast('Deleted successfully.');
                }}
                className="px-4 py-1.5 rounded-lg bg-rose-700 text-white text-xs font-semibold hover:bg-rose-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
