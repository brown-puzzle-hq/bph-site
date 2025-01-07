"use client";
import {
  createContext,
  HTMLProps,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useScroll } from "framer-motion";

// TOCContext
export type Section = {
  id: number;
  title: string;
};

type TOCContextType = {
  sections: Section[];
  registerSection: (_: Section) => void;
  activeSection: number;
  setActiveSection: (_: number) => void;
};

export const TOCContext = createContext<TOCContextType>({
  sections: [],
  registerSection: () => {},
  activeSection: -1,
  setActiveSection: () => {},
});

export const useTOCContextValues = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState(-1);

  const registerSection = (section: Section) => {
    setSections((prev) => [...prev, section]);
  };

  // Remove duplicates (on strict mode) and sort by id
  const processedSections = sections
    .sort((a, b) => a.id - b.id)
    .filter(function (item, pos, ary) {
      return !pos || item.id != ary[pos - 1]?.id;
    });

  return {
    sections: processedSections,
    registerSection,
    activeSection,
    setActiveSection,
  };
};

// TOCSection
export const TOCSection = ({
  sectionId,
  tocTitle,
  isFirst = false,
  isLast = false,
  ...props
}: {
  sectionId: number;
  tocTitle: string;
  isFirst?: boolean;
  isLast?: boolean;
} & HTMLProps<HTMLElement>) => {
  // Add the section to the TOCContext
  const { registerSection, setActiveSection } = useContext(TOCContext);
  useEffect(() => {
    registerSection({ id: sectionId, title: tocTitle });
  }, []);

  // Track the scroll position to set the active section
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end center"],
  });
  scrollYProgress.on("change", (value: number) => {
    if (value > 0 && value < 1) {
      setActiveSection(sectionId);
    }
    if ((value <= 0 && isFirst) || (value >= 1 && isLast)) {
      setActiveSection(-1);
    }
  });

  return (
    <section
      ref={container}
      id={`section-${sectionId}`}
      style={{ scrollMargin: "20vh" }}
      {...props}
    />
  );
};

// TableOfContents
export function TableOfContents() {
  const { sections, activeSection } = useContext(TOCContext);

  return (
    <div className="h-full max-w-[20ch] p-8">
      <motion.div className="sticky top-20 flex h-[80vh]">
        <div className="hidden flex-col gap-4 text-sm lg:flex">
          {sections.map(({ id, title }) => (
            <span
              key={id}
              className={`cursor-pointer transition-colors duration-200 hover:text-gray-800 ${activeSection === id ? "text-neutral-800" : "text-neutral-400"}`}
              onClick={() =>
                document
                  .getElementById(`section-${id}`)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {title}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
