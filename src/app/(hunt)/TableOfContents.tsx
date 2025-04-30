"use client";
import {
  createContext,
  HTMLProps,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";

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

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [stableParentSection, setStableParentSection] = useState<number | null>(
    null,
  );

  // Get parent of active section
  const getParentOfActiveSection = (): number | null => {
    if (activeSection === -1) return null;
    const activeSubsection = sections.find((s) => s.id === activeSection);
    return activeSubsection?.parentId ?? activeSubsection?.id ?? null;
  };

  const parentOfActiveSection = getParentOfActiveSection();

  useEffect(() => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    if (parentOfActiveSection !== stableParentSection) {
      setStableParentSection(null);
      scrollTimeout.current = setTimeout(
        () => setStableParentSection(parentOfActiveSection),
        200,
      );
    }

    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [parentOfActiveSection]);

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
            className={`mr-8 cursor-pointer transition-colors duration-200 hover:text-main-text ${parentOfActiveSection === id ? "text-main-text" : "text-main-text/50"}`}
            onClick={() =>
              document
                .getElementById(`section-${id}`)
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {title}
          </span>

          {/* Render subsections if any */}
          <AnimatePresence mode="wait">
            {stableParentSection === id && (
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {subsectionsMap[id]?.map((sub, i) => (
                  <motion.span
                    key={sub.id}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className={`ml-4 mr-8 cursor-pointer text-sm transition-colors duration-200 hover:text-main-text ${activeSection === sub.id ? "text-main-text" : "text-main-text/50"}`}
                    onClick={() =>
                      document
                        .getElementById(`section-${sub.id}`)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    {sub.title}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}
