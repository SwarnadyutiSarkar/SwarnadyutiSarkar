import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  db,
  auth,
  ADMIN_EMAIL,
  handleFirestoreError,
  OperationType,
} from '../firebase/config';
import {
  Achievement,
  Certification,
  Education,
  Experience,
  PortfolioSettings,
  Project,
  SkillGroup,
} from '../types/portfolio';
import {
  INITIAL_ACHIEVEMENTS,
  INITIAL_CERTIFICATIONS,
  INITIAL_EDUCATION,
  INITIAL_EXPERIENCE,
  INITIAL_PROJECTS,
  INITIAL_SETTINGS,
  INITIAL_SKILLS,
} from '../data/initialData';

interface PortfolioContextType {
  settings: PortfolioSettings;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  skills: SkillGroup[];
  currentUser: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  isSeeding: boolean;
  seedFirestore: (force?: boolean) => Promise<void>;
  updateSettings: (newSettings: Partial<PortfolioSettings>) => Promise<void>;
  saveProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveExperience: (exp: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  saveEducation: (edu: Education) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  saveCertification: (cert: Certification) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
  saveAchievement: (ach: Achievement) => Promise<void>;
  deleteAchievement: (id: string) => Promise<void>;
  saveSkillGroup: (skill: SkillGroup) => Promise<void>;
  deleteSkillGroup: (id: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<PortfolioSettings>(INITIAL_SETTINGS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [experience, setExperience] = useState<Experience[]>(INITIAL_EXPERIENCE);
  const [education, setEducation] = useState<Education[]>(INITIAL_EDUCATION);
  const [certifications, setCertifications] = useState<Certification[]>(INITIAL_CERTIFICATIONS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [skills, setSkills] = useState<SkillGroup[]>(INITIAL_SKILLS);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSeeding, setIsSeeding] = useState<boolean>(false);

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      const isOwner = Boolean(
        user &&
          user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
          user.emailVerified
      );
      setIsAdmin(isOwner);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore sync
  useEffect(() => {
    let unsubs: (() => void)[] = [];

    async function initFirestoreListeners() {
      try {
        // 1. Settings listener
        const settingsRef = doc(db, 'settings', 'profile');
        const unsubSettings = onSnapshot(
          settingsRef,
          (snap) => {
            if (snap.exists()) {
              setSettings({ ...INITIAL_SETTINGS, ...(snap.data() as PortfolioSettings) });
            }
          },
          (error) => {
            console.warn('Settings onSnapshot error:', error.message);
          }
        );
        unsubs.push(unsubSettings);

        // 2. Projects listener
        const projCol = collection(db, 'projects');
        const unsubProjects = onSnapshot(
          projCol,
          (snap) => {
            if (!snap.empty) {
              const loaded = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Project[];
              loaded.sort((a, b) => a.order - b.order);
              setProjects(loaded);
            }
          },
          (error) => {
            console.warn('Projects onSnapshot error:', error.message);
          }
        );
        unsubs.push(unsubProjects);

        // 3. Experience listener
        const expCol = collection(db, 'experience');
        const unsubExp = onSnapshot(
          expCol,
          (snap) => {
            if (!snap.empty) {
              const loaded = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Experience[];
              loaded.sort((a, b) => a.order - b.order);
              setExperience(loaded);
            }
          },
          (error) => {
            console.warn('Experience onSnapshot error:', error.message);
          }
        );
        unsubs.push(unsubExp);

        // 4. Education listener
        const eduCol = collection(db, 'education');
        const unsubEdu = onSnapshot(
          eduCol,
          (snap) => {
            if (!snap.empty) {
              const loaded = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Education[];
              loaded.sort((a, b) => a.order - b.order);
              setEducation(loaded);
            }
          },
          (error) => {
            console.warn('Education onSnapshot error:', error.message);
          }
        );
        unsubs.push(unsubEdu);

        // 5. Certifications listener
        const certCol = collection(db, 'certifications');
        const unsubCert = onSnapshot(
          certCol,
          (snap) => {
            if (!snap.empty) {
              const loaded = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Certification[];
              loaded.sort((a, b) => a.order - b.order);
              setCertifications(loaded);
            }
          },
          (error) => {
            console.warn('Certifications onSnapshot error:', error.message);
          }
        );
        unsubs.push(unsubCert);

        // 6. Achievements listener
        const achCol = collection(db, 'achievements');
        const unsubAch = onSnapshot(
          achCol,
          (snap) => {
            if (!snap.empty) {
              const loaded = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Achievement[];
              loaded.sort((a, b) => a.order - b.order);
              setAchievements(loaded);
            }
          },
          (error) => {
            console.warn('Achievements onSnapshot error:', error.message);
          }
        );
        unsubs.push(unsubAch);

        // 7. Skills listener
        const skillsCol = collection(db, 'skills');
        const unsubSkills = onSnapshot(
          skillsCol,
          (snap) => {
            if (!snap.empty) {
              const loaded = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as SkillGroup[];
              loaded.sort((a, b) => a.order - b.order);
              setSkills(loaded);
            }
          },
          (error) => {
            console.warn('Skills onSnapshot error:', error.message);
          }
        );
        unsubs.push(unsubSkills);
      } catch (err) {
        console.warn('Error setting up listeners:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initFirestoreListeners();

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, []);

  // Seeding function (can be run by verified owner or on first admin setup)
  const seedFirestore = async (force: boolean = false) => {
    setIsSeeding(true);
    try {
      // Check if projects already exist
      if (!force) {
        const projSnap = await getDocs(collection(db, 'projects'));
        if (!projSnap.empty) {
          console.info('Firestore already seeded.');
          setIsSeeding(false);
          return;
        }
      }

      // Seed settings
      await setDoc(doc(db, 'settings', 'profile'), {
        ...INITIAL_SETTINGS,
        updatedAt: new Date().toISOString(),
      });

      // Seed projects
      for (const p of INITIAL_PROJECTS) {
        await setDoc(doc(db, 'projects', p.id), {
          ...p,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      // Seed experience
      for (const e of INITIAL_EXPERIENCE) {
        await setDoc(doc(db, 'experience', e.id), {
          ...e,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      // Seed education
      for (const ed of INITIAL_EDUCATION) {
        await setDoc(doc(db, 'education', ed.id), ed);
      }

      // Seed certifications
      for (const c of INITIAL_CERTIFICATIONS) {
        await setDoc(doc(db, 'certifications', c.id), c);
      }

      // Seed achievements
      for (const a of INITIAL_ACHIEVEMENTS) {
        await setDoc(doc(db, 'achievements', a.id), a);
      }

      // Seed skills
      for (const s of INITIAL_SKILLS) {
        await setDoc(doc(db, 'skills', s.id), s);
      }

      console.info('Successfully seeded Firestore with complete initial portfolio data.');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'portfolio-seed');
    } finally {
      setIsSeeding(false);
    }
  };

  // CRUD Methods
  const updateSettings = async (newSettings: Partial<PortfolioSettings>) => {
    const updated = { ...settings, ...newSettings, updatedAt: new Date().toISOString() };
    setSettings(updated);
    try {
      await setDoc(doc(db, 'settings', 'profile'), updated, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'settings/profile');
    }
  };

  const saveProject = async (project: Project) => {
    try {
      await setDoc(doc(db, 'projects', project.id), {
        ...project,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `projects/${project.id}`);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `projects/${id}`);
    }
  };

  const saveExperience = async (exp: Experience) => {
    try {
      await setDoc(doc(db, 'experience', exp.id), {
        ...exp,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `experience/${exp.id}`);
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'experience', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `experience/${id}`);
    }
  };

  const saveEducation = async (edu: Education) => {
    try {
      await setDoc(doc(db, 'education', edu.id), edu);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `education/${edu.id}`);
    }
  };

  const deleteEducation = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'education', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `education/${id}`);
    }
  };

  const saveCertification = async (cert: Certification) => {
    try {
      await setDoc(doc(db, 'certifications', cert.id), cert);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `certifications/${cert.id}`);
    }
  };

  const deleteCertification = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'certifications', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `certifications/${id}`);
    }
  };

  const saveAchievement = async (ach: Achievement) => {
    try {
      await setDoc(doc(db, 'achievements', ach.id), ach);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `achievements/${ach.id}`);
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'achievements', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `achievements/${id}`);
    }
  };

  const saveSkillGroup = async (skill: SkillGroup) => {
    try {
      await setDoc(doc(db, 'skills', skill.id), skill);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `skills/${skill.id}`);
    }
  };

  const deleteSkillGroup = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'skills', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `skills/${id}`);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        settings,
        projects,
        experience,
        education,
        certifications,
        achievements,
        skills,
        currentUser,
        isAdmin,
        isLoading,
        isSeeding,
        seedFirestore,
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
