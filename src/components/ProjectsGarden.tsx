import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, ProjectCategory } from '../types/portfolio';
import { LilyBadge } from './Lilies';
import { PerchedBird } from './PerchedBird';
import { ExternalLink, Github, ArrowRight, X } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

// Sub-component for individual card with hover detection and perched bird
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = React.useRef<HTMLElement>(null);

  // Trigger lily bloom keyframe animation when card enters the viewport
  React.useEffect(() => {
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

  // Determine bird configuration (variety across cards)
  const hasBird = index % 3 !== 2; // ~66% of cards have a perched bird
  const birdPosition = index % 3 === 0 ? 'right' : index % 3 === 1 ? 'left' : 'center';
  const birdFacing = index % 2 === 0 ? 'left' : 'right';

  return (
    <article
      ref={cardRef}
      onClick={() => onOpenModal(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group bg-[#FAF0EA] rounded-3xl p-6 border border-[#E8C5C8]/70 hover:border-[#D49B9E] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-visible ${
        isInView ? 'is-in-view' : ''
      }`}
    >
      {/* Background Floral Illustration (Blooms with keyframes upon entering viewport) */}
      <div className="absolute -bottom-4 -right-4 w-32 h-32 pointer-events-none select-none overflow-hidden rounded-br-3xl lily-bg-bloom opacity-10">
        <LilyBadge styleName={project.lilyStyle} className="w-full h-full text-[#D49B9E]" />
      </div>

      {/* Interactive Perched Bird on top edge */}
      {hasBird && (
        <PerchedBird
          isHovered={isHovered}
          position={birdPosition}
          facing={birdFacing}
        />
      )}

      {/* Lily Illustration & Tags Header */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="p-2 rounded-2xl bg-[#FBF4EF] border border-[#E8C5C8]/50 shadow-2xs lily-bloom-element">
            <LilyBadge styleName={project.lilyStyle} className="w-14 h-14" />
          </div>

          {/* Clean unboxed tags with typographic separator */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#5B2A4A] pt-1">
            {project.tags.map((t) => (
              <span key={t} className="inline-flex items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F5EAE9] border border-[#E8C5C8]/80 text-[#5B2A4A]">
                  {t}
                </span>
              </span>
            ))}
          </div>
        </div>

        <h3 className="font-display font-bold text-xl text-[#5B2A4A] group-hover:text-[#48203a] transition-colors mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-[#2E2230]/85 font-sans leading-relaxed line-clamp-3 mb-4">
          {project.summary}
        </p>
      </div>

      {/* Bottom Card Row: Tech list preview & View Details */}
      <div className="pt-4 border-t border-[#E8C5C8]/40 mt-auto flex items-center justify-between relative z-10">
        <span className="text-xs text-[#2E2230]/65 truncate max-w-[190px] font-sans">
          {project.techStack.slice(0, 3).join(' · ')}
        </span>

        <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#5B2A4A] group-hover:translate-x-0.5 transition-transform">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
};

export const ProjectsGarden: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'AI', 'Data', 'Climate', 'Full-stack'];

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'All') return true;
    return project.tags.includes(selectedCategory);
  });

  return (
    <section
      id="projects"
      aria-label="Projects Garden"
      className="py-16 md:py-24 relative border-b border-[#E8C5C8]/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LilyBadge styleName="blooming" className="w-7 h-7 text-[#D49B9E]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5B2A4A]/80 font-sans">
                The Portfolio Garden
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#5B2A4A] tracking-tight">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-[#2E2230]/80 mt-1 max-w-xl font-sans">
              Each initiative is cultivated as a lily—combining machine learning, climate intelligence, and development data. Hover over any project card to watch perched birds take flight!
            </p>
          </div>

          {/* Interactive Filter Tabs (Segmented controls) */}
          <div
            role="tablist"
            aria-label="Filter Projects by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FAF0EA] rounded-full border border-[#E8C5C8]/70 shadow-2xs self-start"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#5B2A4A] cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#5B2A4A] text-white shadow-xs'
                    : 'text-[#2E2230]/80 hover:text-[#5B2A4A] hover:bg-[#F5EAE9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid of Lily Cards with Perched Birds */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 pt-3">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpenModal={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>

      </div>

      {/* DETAIL MODAL DIALOG */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2E2230]/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="bg-[#FAF0EA] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#D49B9E] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              aria-label="Close project details"
              className="absolute top-5 right-5 p-2 rounded-full bg-[#F5EAE9] hover:bg-white text-[#5B2A4A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B2A4A] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2.5 rounded-2xl bg-[#FBF4EF] border border-[#E8C5C8]">
                <LilyBadge styleName={activeModalProject.lilyStyle} className="w-16 h-16" />
              </div>
              <div>
                <h3
                  id="modal-project-title"
                  className="font-display text-2xl sm:text-3xl font-bold text-[#5B2A4A]"
                >
                  {activeModalProject.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {activeModalProject.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#F5EAE9] text-[#5B2A4A] border border-[#E8C5C8]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Full Description */}
            <div className="prose text-sm sm:text-base text-[#2E2230] leading-relaxed mb-6 font-sans">
              <p>{activeModalProject.description}</p>
            </div>

            {/* Tech Stack Chips */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5B2A4A] mb-2 font-sans">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-lg bg-[#FBF4EF] border border-[#E8C5C8] text-[#2E2230] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Screenshots Gallery / Tasteful Placeholder */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5B2A4A] mb-2 font-sans">
                Interface Preview
              </h4>
              {activeModalProject.screenshots && activeModalProject.screenshots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModalProject.screenshots.map((shot, idx) => (
                    <img
                      key={idx}
                      src={shot}
                      alt={`${activeModalProject.title} preview screenshot ${idx + 1}`}
                      className="rounded-xl border border-[#E8C5C8] w-full h-44 object-cover"
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#D49B9E]/80 bg-[#FBF4EF] p-6 text-center">
                  <LilyBadge styleName={activeModalProject.lilyStyle} className="w-12 h-12 mx-auto mb-2 opacity-80" />
                  <p className="text-sm font-medium text-[#5B2A4A]">
                    Interactive Live Application &amp; Research Prototype
                  </p>
                  <p className="text-xs text-[#2E2230]/70 mt-1 max-w-md mx-auto font-sans">
                    Production deployment hosted online with live data pipelines and full source logic.
                  </p>
                </div>
              )}
            </div>

            {/* Actions: Live and GitHub links (HIDDEN if empty) */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E8C5C8]/60">
              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5B2A4A] hover:bg-[#48203a] text-white text-sm font-semibold transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-[#5B2A4A]"
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5EAE9] hover:bg-white text-[#5B2A4A] border border-[#E8C5C8] text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B2A4A]"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="ml-auto px-4 py-2 text-sm text-[#2E2230]/75 hover:text-[#2E2230] font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
