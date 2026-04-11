import { motion } from "motion/react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export default function ProjectCard({ title, description, image, tags }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group flex flex-col border border-outline-variant/20 bg-surface-container-lowest hover:border-primary transition-all duration-500 hover:shadow-[0_20px_50px_rgba(199,120,221,0.1)]"
    >
      <div className="overflow-hidden aspect-video">
        <img
          src={image}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover border-b border-outline-variant/20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
        />
      </div>
      <div className="p-2 border-b border-outline-variant/20 flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] label-font text-tertiary px-2 py-1 bg-surface-container group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            {tag}
          </span>
        ))}
      </div>
      <div className="p-6 flex-grow">
        <h3 className="headline-font text-xl font-bold mb-4 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-tertiary mb-6 line-clamp-2">{description}</p>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-primary text-primary text-xs label-font uppercase hover:bg-primary hover:text-on-primary transition-all duration-300">
            Live {"<~>"}
          </button>
          <button className="px-4 py-2 border border-outline-variant text-tertiary text-xs label-font uppercase hover:bg-surface-container transition-all">
            Cached {">="}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
