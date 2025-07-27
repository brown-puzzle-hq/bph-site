"use client";
import {
  TOCContext,
  useTOCContextValues,
  TOCSection,
  TableOfContents,
} from "@/components/toc/TableOfContents";

export default function WrapUp() {
  const values = useTOCContextValues();

  return (
    <TOCContext.Provider value={values}>
      <div className="flex px-4">
        <TableOfContents />

        {/* Spacer since TOC is fixed */}
        <div className="md:w-1/3 xl:w-1/5"></div>

        <div className="w-full md:w-2/3 xl:w-3/5">
          <article className="prose prose-wrapup w-full max-w-none bg-black/30 p-6 prose-img:my-0">
            <h1>Wrapup</h1>
            <TOCSection tocTitle="Section 1" sectionId={1} isFirst>
              <h2>Section 1</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </TOCSection>
            <TOCSection tocTitle="Section 2" sectionId={2} isFirst>
              <h2>Section 2</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </TOCSection>
            <TOCSection tocTitle="Section 3" sectionId={3} isFirst>
              <h2>Section 3</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </TOCSection>
            <TOCSection tocTitle="Section 4" sectionId={4} isFirst>
              <h2>Section 4</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </TOCSection>
            <TOCSection tocTitle="Section 5" sectionId={5} isFirst>
              <h2>Section 5</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </TOCSection>
          </article>
        </div>
      </div>
    </TOCContext.Provider>
  );
}
