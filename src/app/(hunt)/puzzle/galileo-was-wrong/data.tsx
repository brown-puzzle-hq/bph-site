/**
 * The puzzle ID is used to uniquely identify the puzzle in the database.
 * It should be equal to the name of the folder this file is currently under.
 * Feel free to make this creative, because the route to the puzzle will be
 * example.com/puzzle/puzzleId.
 */
export const puzzleId = "galileo-was-wrong";

/**
 * The body renders above the guess submission form. Put flavor text, images,
 * and interactive puzzle components here.
 */
export const inPersonBody = (
  <div className="max-w-3xl space-y-4 font-mono">
    <div>
      <h1>Star</h1>
      <hr className="my-1" />
    </div>
    <i>The brightest stars aren’t on the Hollywood Walk of Fame…</i>
    <p>
      A star is a luminous spheroid of plasma held together by self-gravity. The
      nearest star to Earth is the Sun. Many other stars are visible to the
      naked eye at night; their immense distances from Earth make them appear as
      fixed points of light. The most prominent stars have been categorised into
      constellations and asterisms, and many of the brightest stars have proper
      names. Astronomers have assembled star catalogues that identify the known
      stars and provide standardized stellar designations. The observable
      universe contains an estimated 1022 to 1024 stars. Only about 4,000 of
      these stars are visible to the naked eye—all within the Milky Way galaxy.
    </p>
    <p>
      A star's life begins with the gra<span className="text-blue-500">★</span>
      itational collapse of a gaseous nebula of material largely comprising
      hydrogen, helium, and trace heavier elements. Its{" "}
      <span className="text-blue-500">★</span>otal mass mainly determines its
      evolution and eventual fate. A star shine
      <span className="text-blue-500">★</span> for most of its active life due
      to the thermonuclear
      <span className="text-blue-500">★</span>usion of hydrogen into helium in
      its core. This process releases energy that traverses the star's interior
      and radiates into outer space. At t
      <span className="text-blue-500">★</span>e end of a star's l
      <span className="text-blue-500">★</span>fetime as a fusor, its core
      becomes a stellar remnant: a white dwarf, a{" "}
      <span className="text-blue-500">★</span>eutron star, or—if it is
      sufficiently massive—a black hole.
    </p>
    <p>
      Stellar nucleosynthesis in stars or their remnants creates almost all
      naturally occurring chemical elements heavier than lithium. Stellar mass
      loss or supernova explosions re<span className="text-blue-500">★</span>urn
      chemically enriched material to the interstellar medium. These elements
      are then recycled into new stars. Astronomers can determine stellar
      properties—including mass, age, metallicity (chemical composition),
      variability, distance, and motion through space—by carrying out
      observations of a star's apparent brightness, spectrum, and changes in its
      position in the sky over time.
    </p>
    <p>
      Stars can form orbital systems with other astronomical objects, as in
      planetary systems and star systems with two or more stars. When two such
      stars orbit closely, their gravitational interaction can significantly
      impact their evolution. Stars can form part of a much larger
      gravitationally bound structure, such as a star cluster or a galaxy.
    </p>
  </div>
);

export const remoteBoxBody = inPersonBody;

export const remoteBody = inPersonBody;

/**
 * The `solutionBody` renders in the solution page.
 * If there are no solutions available, set it null.
 */
export const solutionBody = null;

/**
 * The `copyText` should provide a convenient text representation of the puzzle
 * that can be copied to the clipboard. Set this to `null` to remove the copy button.
 */
export const copyText = null;

/**
 * The `partialSolutions` object is used to prompt solutions with significant progress.
 * Each key is a partial solution, and the value is the prompt to be displayed. Keys must
 * be in all caps, no spaces.
 */
export const partialSolutions: Record<string, string> = {};

/**
 * The `tasks` object is used for multi-part puzzles. When a certain answer is submitted,
 * more content will be added to the puzzle body. Keys must be in all caps, no spaces.
 */
export const tasks: Record<string, JSX.Element> = {};
