import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { usePortfolioMode } from '../context/ModeContext';
import { Project, ProjectCategory } from '../types/portfolio';
import { LilyBadge } from './Lilies';
import { PerchedBird } from './PerchedBird';
import {
  ExternalLink,
  Github,
  ArrowRight,
  X,
  Code2,
  Globe,
  Database,
  Cpu,
  BarChart3,
  Layers,
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
  isGarden: boolean;
  prefersReduced: boolean | null;
}

// Tasteful Category Domain Placeholder for projects without a screenshot
const ProjectPlaceholderThumbnail: React.FC<{
  project: Project;
  isGarden: boolean;
}> = ({ project, isGarden }) => {
  const isClimate = project.tags.includes('Climate');
  const isAI = project.tags.includes('AI');
  const isData = project.tags.includes('Data');

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-surface-subtle via-surface to-surface-inner relative overflow-hidden select-none">
      {/* Background Subtle Tech/Geometric Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`grid-${project.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-accent" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
      </svg>

      {/* Top Indicator */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-wider uppercase text-muted font-semibold">
          {project.tags[0] || 'Engineering'}
        </span>
        <div className="p-1.5 rounded-md bg-surface border border-border/80 text-accent">
          {isClimate ? (
            <Globe className="w-4 h-4" />
          ) : isAI ? (
            <Cpu className="w-4 h-4" />
          ) : isData ? (
            <BarChart3 className="w-4 h-4" />
          ) : (
            <Code2 className="w-4 h-4" />
          )}
        </div>
      </div>

      {/* Center Visual Motif */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center py-2">
        {isGarden ? (
          <LilyBadge styleName={project.lilyStyle} className="w-12 h-12 opacity-85 text-rose drop-shadow-2xs" />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-accent shadow-2xs">
            <Layers className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Bottom Kicker */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-muted border-t border-border/40 pt-2 font-mono">
        <span>{project.techStack.slice(0, 2).join(' · ')}</span>
        <span className="text-accent font-semibold">Interactive Prototype</span>
      </div>
    </div>
  );
};

// Sub-component for individual card with hover detection, 3D tilt, and perched bird
const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onOpenModal,
  isGarden,
  prefersReduced,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLElement>(null);

  // Trigger lily bloom keyframe animation when card enters viewport in garden mode
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 3D Tilt Calculation on mouse move (Garden mode only, disabled for reduced motion or Pro mode)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current || prefersReduced || !isGarden) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Bounded tilt: max ~5 degrees
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Determine bird configuration (Garden mode only)
  const hasBird = isGarden && index % 3 !== 2;
  const birdPosition = index % 3 === 0 ? 'right' : index % 3 === 1 ? 'left' : 'center';
  const birdFacing = index % 2 === 0 ? 'left' : 'right';

  // Card reveal animation variants
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: isGarden && !prefersReduced ? 24 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isGarden && !prefersReduced ? 0.5 : 0.2,
      },
    },
  };

  const tiltTransform =
    isGarden && !prefersReduced && isHovered
      ? `perspective(900px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateZ(6px)`
      : isGarden && !prefersReduced
      ? 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
      : 'none';

  return (
    <motion.article
      layoutId={`project-card-${project.id}`}
      variants={cardVariants}
      ref={cardRef}
      onClick={() => onOpenModal(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={!isGarden ? { y: -4 } : {}}
      style={{
        transform: tiltTransform,
        transition: 'transform 0.18s ease-out, box-shadow 0.2s ease, border-color 0.2s ease',
      }}
      className={`group bg-surface p-5 sm:p-6 border border-border hover:border-accent shadow-2xs hover:shadow-md flex flex-col justify-between cursor-pointer relative will-change-transform ${
        isGarden ? 'rounded-3xl overflow-visible' : 'rounded-xl overflow-hidden'
      } ${isInView ? 'is-in-view' : ''}`}
    >
      {/* Garden Mode: Background Floral Watermark (Blooms upon viewport entry) */}
      {isGarden && (
        <div className="absolute -bottom-4 -right-4 w-32 h-32 pointer-events-none select-none overflow-hidden rounded-br-3xl lily-bg-bloom opacity-10">
          <LilyBadge styleName={project.lilyStyle} className="w-full h-full text-rose" />
        </div>
      )}

      {/* Garden Mode: Interactive Perched Bird on top edge */}
      {hasBird && (
        <PerchedBird
          isHovered={isHovered}
          position={birdPosition}
          facing={birdFacing}
        />
      )}

      {/* Card Header Content */}
      <div className="relative z-10 flex flex-col">
        
        {/* Screenshot Thumbnail Area (Uses screenshot[0] or domain placeholder) */}
        <div
          className={`w-full h-40 sm:h-44 overflow-hidden border border-border/80 bg-surface-subtle mb-4 relative ${
            isGarden ? 'rounded-2xl' : 'rounded-lg'
          }`}
        >
          {project.screenshots && project.screenshots.length > 0 ? (
            <img
              src={project.screenshots[0]}
              alt={`${project.title} screenshot`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            />
          ) : (
            <ProjectPlaceholderThumbnail project={project} isGarden={isGarden} />
          )}
        </div>

        {/* Tags / Domain Line */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-accent mb-3">
          {project.tags.map((t) => (
            <span
              key={t}
              className={`px-2.5 py-0.5 bg-surface-subtle border border-border text-accent ${
                isGarden ? 'rounded-full' : 'rounded'
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="font-display font-bold text-xl text-accent group-hover:text-accent-hover transition-colors mb-2 leading-tight">
          {project.title}
        </h3>

        <p className="text-sm text-text/85 font-sans leading-relaxed line-clamp-3 mb-4">
          {project.summary}
        </p>
      </div>

      {/* Bottom Card Row: Tech list preview & View Details */}
      <div className="pt-3.5 border-t border-border/60 mt-auto flex items-center justify-between relative z-10 font-sans">
        <span className="text-xs text-muted truncate max-w-[190px]">
          {project.techStack.slice(0, 3).join(' · ')}
        </span>

        <div className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:translate-x-0.5 transition-transform">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.article>
  );
};

export const ProjectsGarden: React.FC = () => {
  const { projects } = usePortfolio();
  const { isGarden, setIsDetailModalOpen } = usePortfolioMode();
  const prefersReduced = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'AI', 'Data', 'Climate', 'Full-stack'];

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'All') return true;
    return project.tags.includes(selectedCategory);
  });

  // ESC key closes the detail modal & syncs modal open state with ModeContext
  useEffect(() => {
    setIsDetailModalOpen(Boolean(activeModalProject));
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };
    if (activeModalProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      setIsDetailModalOpen(false);
    };
  }, [activeModalProject, setIsDetailModalOpen]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isGarden ? 0.08 : 0.04,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <section
      id="projects"
      aria-label="Projects Section"
      className="py-16 md:py-24 relative border-b border-border/40"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isGarden && <LilyBadge styleName="blooming" className="w-7 h-7 text-rose" />}
              <span className="text-xs font-semibold uppercase tracking-widest text-accent/80 font-sans">
                {isGarden ? 'The Portfolio Garden' : 'Selected Works'}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent tracking-tight">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-text/80 mt-1 max-w-xl font-sans">
              {isGarden
                ? 'Each initiative is cultivated as a lily—combining machine learning, climate intelligence, and development data. Hover over any project card to watch perched birds take flight!'
                : 'Full-stack engineering, machine learning pipelines, climate intelligence monitors, and policy analytics platforms.'}
            </p>
          </div>

          {/* Interactive Filter Tabs (Segmented controls) */}
          <div
            role="tablist"
            aria-label="Filter Projects by category"
            className={`flex flex-wrap items-center gap-1.5 p-1.5 bg-surface border border-border shadow-2xs self-start ${
              isGarden ? 'rounded-full' : 'rounded-lg'
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs sm:text-[13px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer ${
                  isGarden ? 'rounded-full' : 'rounded-md'
                } ${
                  selectedCategory === cat
                    ? 'bg-accent text-white shadow-xs'
                    : 'text-text/80 hover:text-accent hover:bg-surface-subtle'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Staggered Scroll Reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 pt-3"
        >
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpenModal={(p) => setActiveModalProject(p)}
              isGarden={isGarden}
              prefersReduced={prefersReduced}
            />
          ))}
        </motion.div>

      </div>

      {/* DETAIL MODAL DIALOG WITH SHARED-ELEMENT LAYOUT EXPAND */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-text/60 backdrop-blur-xs"
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              layoutId={`project-card-${activeModalProject.id}`}
              className={`bg-surface max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-border shadow-2xl relative ${
                isGarden ? 'rounded-3xl' : 'rounded-xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                aria-label="Close project details"
                className="absolute top-5 right-5 p-2 rounded-full bg-surface-subtle hover:bg-surface text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer border border-border/50"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-4">
                {isGarden ? (
                  <div className="p-2.5 rounded-2xl bg-surface-subtle border border-border">
                    <LilyBadge styleName={activeModalProject.lilyStyle} className="w-16 h-16" />
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-surface-subtle border border-border text-accent">
                    <Layers className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h3
                    id="modal-project-title"
                    className="font-display text-2xl sm:text-3xl font-bold text-accent"
                  >
                    {activeModalProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {activeModalProject.tags.map((t) => (
                      <span
                        key={t}
                        className={`px-2.5 py-0.5 text-xs font-medium bg-surface-subtle text-accent border border-border ${
                          isGarden ? 'rounded-full' : 'rounded'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Full Description */}
              <div className="prose text-sm sm:text-base text-text leading-relaxed mb-6 font-sans">
                <p>{activeModalProject.description}</p>
              </div>

              {/* Tech Stack Chips */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2 font-sans">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2.5 py-1 text-xs bg-surface-subtle border border-border text-text font-mono ${
                        isGarden ? 'rounded-lg' : 'rounded'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Screenshots Gallery / Preview */}
              <div className="mb-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2 font-sans">
                  Interface Preview
                </h4>
                {activeModalProject.screenshots && activeModalProject.screenshots.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalProject.screenshots.map((shot, idx) => (
                      <img
                        key={idx}
                        src={shot}
                        alt={`${activeModalProject.title} preview screenshot ${idx + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="rounded-xl border border-border w-full h-44 object-cover"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-border bg-surface-subtle p-6 text-center">
                    {isGarden && (
                      <LilyBadge styleName={activeModalProject.lilyStyle} className="w-12 h-12 mx-auto mb-2 opacity-80" />
                    )}
                    <p className="text-sm font-semibold text-accent">
                      Interactive Production Application &amp; Research Prototype
                    </p>
                    <p className="text-xs text-muted mt-1 max-w-md mx-auto font-sans">
                      Production deployment hosted online with live data pipelines and full source logic.
                    </p>
                  </div>
                )}
              </div>

              {/* Actions: Live and GitHub links */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-accent ${
                      isGarden ? 'rounded-full' : 'rounded-lg'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Project</span>
                  </a>
                )}

                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 bg-surface-subtle hover:bg-surface text-accent border border-border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
                      isGarden ? 'rounded-full' : 'rounded-lg'
                    }`}
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="ml-auto px-4 py-2 text-sm text-muted hover:text-text font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
