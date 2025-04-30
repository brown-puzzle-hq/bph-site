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

export type Section = {
  id: number;
  title: string;
  parentId?: number;
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

  const processedSections = sections
    .sort((a, b) => a.id - b.id)
    .filter((item, pos, ary) => !pos || item.id !== ary[pos - 1]?.id);

  return {
    sections: processedSections,
    registerSection,
    activeSection,
    setActiveSection,
  };
};

export const TOCSection = ({
  sectionId,
  tocTitle,
  parentId,
  isFirst = false,
  isLast = false,
  ...props
}: {
  sectionId: number;
  tocTitle: string;
  parentId?: number;
  isFirst?: boolean;
  isLast?: boolean;
} & HTMLProps<HTMLElement>) => {
  const { registerSection, setActiveSection } = useContext(TOCContext);
  const container = useRef(null);

  useEffect(() => {
    registerSection({ id: sectionId, title: tocTitle, parentId });
  }, []);

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

export function TableOfContents() {
  const { sections, activeSection } = useContext(TOCContext);
  const [delayedActiveSection, setDelayedActiveSection] = useState<
    number | null
  >(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Trigger your logic AFTER scroll ends
        setDelayedActiveSection(activeSection);
      }, 100); // wait 100ms after last scroll event
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [activeSection]);

  // Organize sections into hierarchy
  const topLevelSections = sections.filter((s) => !s.parentId);
  const subsectionsMap: Record<number, Section[]> = {};
  sections.forEach((s) => {
    if (s.parentId != null) {
      if (!subsectionsMap[s.parentId]) {
        subsectionsMap[s.parentId] = [];
      }
      subsectionsMap[s.parentId]!.push(s);
    }
  });

  return (
    <motion.div className="no-scrollbar fixed bottom-0 top-[80px] hidden flex-col gap-2 overflow-y-auto pr-2 md:flex md:w-1/3 xl:w-1/5">
      {topLevelSections.map(({ id, title }) => (
        <div key={id} className="flex flex-col">
          <span
            className={`mr-8 cursor-pointer transition-colors duration-200 hover:text-main-text ${activeSection === id ? "text-main-text" : "text-main-text/50"}`}
            onClick={() => {
              setDelayedActiveSection(id);
              setTimeout(
                () =>
                  document
                    .getElementById(`section-${id}`)
                    ?.scrollIntoView({ behavior: "smooth" }),
                100,
              );
            }}
          >
            {title}
          </span>

          {/* Render subsections if any */}
          {activeSection === id &&
            subsectionsMap[id]?.map((sub) => (
              <span
                key={sub.id}
                className={`ml-4 mr-8 cursor-pointer text-sm transition-colors duration-200 hover:text-main-text ${activeSection === sub.id ? "text-main-text" : "text-main-text/50"}`}
                onClick={() =>
                  document
                    .getElementById(`section-${sub.id}`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {sub.title}
              </span>
            ))}
        </div>
      ))}
    </motion.div>
  );
}
