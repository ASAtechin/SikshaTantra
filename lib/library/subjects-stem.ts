import type { SubjectContent } from "@/lib/library/types";

/**
 * Curated, original STEM subject content for the demonstration library.
 * Summaries and key points are written for this product — they are not
 * reproduced from any board textbook.
 */

const mathematics: SubjectContent = {
  id: "math",
  name: "Mathematics",
  theme: "math",
  tagline: "Patterns, structure and reasoning you can see.",
  chapters: [
    {
      number: 1,
      title: "Number sense",
      bigIdea: "Numbers are a language for quantity, order and change.",
      overview:
        "Before rules and formulas, numbers are a way to describe how much, how many and how far apart. This chapter builds the intuition that every later idea rests on.",
      minutes: 18,
      topics: [
        { id: "count-place", title: "Place value", summary: "The position of a digit decides its worth.", keyPoints: ["Each place is ten times the one to its right", "Zero holds a place open", "Large numbers are grouped to stay readable"], kind: "concept" },
        { id: "count-ops", title: "Operations as stories", summary: "Every calculation answers a real question.", keyPoints: ["Addition joins, subtraction compares", "Multiplication is repeated grouping", "Division shares or measures out"], kind: "concept" },
        { id: "count-estimate", title: "Estimation", summary: "A good guess checks an exact answer.", keyPoints: ["Round to judge size quickly", "Estimates catch mistakes", "Precision is chosen, not assumed"], kind: "skill" },
      ],
    },
    {
      number: 2,
      title: "Patterns and rules",
      bigIdea: "A pattern is a rule you can predict with.",
      overview:
        "When numbers or shapes repeat with structure, a rule hides inside. Finding that rule turns observation into prediction — the first step toward algebra.",
      minutes: 20,
      topics: [
        { id: "pat-sequence", title: "Sequences", summary: "A step repeated builds a sequence.", keyPoints: ["Describe the step, not just the list", "The same rule extends forwards and backwards", "Different rules can share early terms"], kind: "model" },
        { id: "pat-variable", title: "A letter for the unknown", summary: "A symbol can stand for any number.", keyPoints: ["A variable names what we do not yet know", "Rules written with symbols work for every case", "Solving means isolating the symbol"], kind: "concept" },
        { id: "pat-next", title: "Predict the next step", summary: "Use the rule to leap ahead.", keyPoints: ["Prediction tests your rule", "A wrong prediction improves the rule", "Generalising saves counting"], kind: "practice" },
      ],
    },
    {
      number: 3,
      title: "Shapes and space",
      bigIdea: "Geometry is reasoning about position and form.",
      overview:
        "Shapes are not just drawn, they are argued about. Angles, lines and symmetry give us a precise language for the space around us.",
      minutes: 22,
      topics: [
        { id: "geo-angle", title: "Angles and lines", summary: "An angle measures a turn.", keyPoints: ["Angles add around a point and along a line", "Parallel lines keep equal angles", "A right angle anchors measurement"], kind: "concept" },
        { id: "geo-sym", title: "Symmetry", summary: "Balance you can fold or spin.", keyPoints: ["Reflection mirrors across a line", "Rotation repeats around a centre", "Symmetry reveals hidden structure"], kind: "model" },
        { id: "geo-area", title: "Area and perimeter", summary: "Space inside versus distance around.", keyPoints: ["Perimeter is a boundary length", "Area counts the covered surface", "Same perimeter can hold different areas"], kind: "skill" },
      ],
    },
    {
      number: 4,
      title: "Fractions and ratio",
      bigIdea: "Parts, wholes and comparisons share one idea.",
      overview:
        "A fraction, a decimal, a percentage and a ratio are four views of the same relationship. Seeing them as one idea removes most of the confusion.",
      minutes: 21,
      topics: [
        { id: "frac-part", title: "Part of a whole", summary: "A fraction splits one thing fairly.", keyPoints: ["The denominator sets the number of parts", "Equivalent fractions name the same amount", "A whole is a fraction over itself"], kind: "concept" },
        { id: "frac-ratio", title: "Ratio and proportion", summary: "A ratio compares two quantities.", keyPoints: ["Ratio keeps a relationship as sizes change", "Proportion scales recipes and maps", "Unit rate makes ratios comparable"], kind: "model" },
        { id: "frac-percent", title: "Percentages", summary: "A percentage is a ratio out of a hundred.", keyPoints: ["Percent means per hundred", "Increase and decrease share one method", "Comparisons need a common base"], kind: "skill" },
      ],
    },
    {
      number: 5,
      title: "Data and chance",
      bigIdea: "Data turns messy reality into something we can reason about.",
      overview:
        "Collecting, picturing and summarising data lets a class answer questions about the world. Probability adds a careful way to talk about what might happen.",
      minutes: 19,
      topics: [
        { id: "data-picture", title: "Picturing data", summary: "A chart makes a pattern visible.", keyPoints: ["Choose the chart for the question", "Scale changes the story", "A good title says what you see"], kind: "skill" },
        { id: "data-average", title: "Averages", summary: "One number can represent many.", keyPoints: ["Mean balances, median splits", "Outliers pull the mean", "Spread matters as much as centre"], kind: "concept" },
        { id: "data-chance", title: "Likelihood", summary: "Chance measures how often, not whether.", keyPoints: ["Probability runs from zero to one", "Equally likely outcomes simplify counting", "Many trials reveal the true rate"], kind: "model" },
      ],
    },
    {
      number: 6,
      title: "Algebra and functions",
      bigIdea: "A function is a reliable machine from input to output.",
      overview:
        "Algebra generalises arithmetic, and functions capture how one quantity depends on another. Graphs let us see that relationship at a glance.",
      minutes: 24,
      topics: [
        { id: "alg-equation", title: "Equations", summary: "An equation is a balance to keep.", keyPoints: ["Do the same to both sides", "A solution makes both sides equal", "Check by substituting back"], kind: "skill" },
        { id: "alg-function", title: "Functions", summary: "Each input gives exactly one output.", keyPoints: ["A function is a rule, not a guess", "Domain limits the allowed inputs", "Graphs show behaviour over a range"], kind: "model" },
        { id: "alg-graph", title: "Reading a graph", summary: "Shape tells the story of change.", keyPoints: ["Slope is rate of change", "Intercepts anchor the picture", "Flat means steady, steep means fast"], kind: "concept" },
      ],
    },
  ],
};

const science: SubjectContent = {
  id: "science",
  name: "Science",
  theme: "science",
  tagline: "Ask, test, revise — how we come to know.",
  chapters: [
    {
      number: 1,
      title: "The scientific way",
      bigIdea: "Science is a method for being less wrong over time.",
      overview:
        "Science is not a list of facts but a disciplined way of asking questions and testing answers against evidence. This chapter frames every one that follows.",
      minutes: 16,
      topics: [
        { id: "sci-question", title: "Asking testable questions", summary: "A good question can be answered with evidence.", keyPoints: ["Observation sparks a question", "A hypothesis is a testable guess", "Fair tests change one thing at a time"], kind: "concept" },
        { id: "sci-measure", title: "Measuring carefully", summary: "Numbers make observations comparable.", keyPoints: ["Units give numbers meaning", "Repeat to reduce error", "Record what you actually see"], kind: "skill" },
        { id: "sci-revise", title: "Revising ideas", summary: "Evidence can overturn a belief.", keyPoints: ["Being wrong is part of progress", "Explanations must fit the evidence", "New data can reopen settled questions"], kind: "concept" },
      ],
    },
    {
      number: 2,
      title: "Matter and materials",
      bigIdea: "Everything is made of particles in motion.",
      overview:
        "The particle idea explains why matter changes state, mixes and reacts. It is one of the most powerful models in all of science.",
      minutes: 20,
      topics: [
        { id: "mat-states", title: "States of matter", summary: "Arrangement and energy decide the state.", keyPoints: ["Particles are closer in solids", "Heating adds energy and spacing", "State change is physical, not new matter"], kind: "model" },
        { id: "mat-mix", title: "Mixtures and separation", summary: "Many materials are blends we can sort.", keyPoints: ["Mixtures keep their parts' properties", "Separation uses a difference", "Solutions are evenly mixed"], kind: "skill" },
        { id: "mat-change", title: "Physical and chemical change", summary: "Some changes make new substances.", keyPoints: ["Physical change is reversible in principle", "Chemical change forms something new", "Signs include heat, gas or colour"], kind: "concept" },
      ],
    },
    {
      number: 3,
      title: "Forces and energy",
      bigIdea: "A force is a push or pull that changes motion.",
      overview:
        "Forces explain why things speed up, slow down or stay put, and energy accounts for what it costs to make change happen.",
      minutes: 22,
      topics: [
        { id: "force-feel", title: "Forces around us", summary: "Every change in motion has a cause.", keyPoints: ["Balanced forces keep steady motion", "Friction opposes sliding", "Gravity pulls everything down"], kind: "concept" },
        { id: "force-energy", title: "Energy transfers", summary: "Energy moves but is not lost.", keyPoints: ["Energy changes form, not amount", "Useful energy often spreads as heat", "Stored energy can be released"], kind: "model" },
        { id: "force-machine", title: "Simple machines", summary: "Tools trade force for distance.", keyPoints: ["A lever multiplies force", "Machines do not create energy", "Design balances effort and load"], kind: "skill" },
      ],
    },
    {
      number: 4,
      title: "Living systems",
      bigIdea: "Life is organised, from a single cell to an ecosystem.",
      overview:
        "Living things share features: they take in energy, respond, grow and reproduce. Studying systems at each scale reveals the same logic repeating.",
      minutes: 21,
      topics: [
        { id: "life-cell", title: "Cells", summary: "The cell is the unit of life.", keyPoints: ["Cells carry out life's processes", "Structure fits function", "Many cells build a body"], kind: "concept" },
        { id: "life-body", title: "Body systems", summary: "Organs cooperate to keep us alive.", keyPoints: ["Systems specialise and connect", "Balance is actively maintained", "A failure in one affects others"], kind: "model" },
        { id: "life-eco", title: "Ecosystems", summary: "Living things depend on each other.", keyPoints: ["Energy flows from the sun upward", "Matter cycles and is reused", "Change ripples through a web"], kind: "story" },
      ],
    },
    {
      number: 5,
      title: "Earth and beyond",
      bigIdea: "Our planet is a system inside a larger one.",
      overview:
        "Weather, water and rock shape the surface we live on, while the Earth's place in space sets the rhythm of day, season and tide.",
      minutes: 18,
      topics: [
        { id: "earth-water", title: "The water cycle", summary: "Water moves in an endless loop.", keyPoints: ["The sun drives evaporation", "Clouds carry and release water", "The same water is reused forever"], kind: "model" },
        { id: "earth-rock", title: "Rocks and soil", summary: "The ground records slow change.", keyPoints: ["Rocks form in distinct ways", "Weathering breaks rock to soil", "Soil supports nearly all land life"], kind: "concept" },
        { id: "earth-space", title: "Day, night and seasons", summary: "Motion in space makes our calendar.", keyPoints: ["Spin makes day and night", "Tilt makes the seasons", "Orbit sets the year"], kind: "story" },
      ],
    },
    {
      number: 6,
      title: "Light, sound and waves",
      bigIdea: "Waves carry energy and information without carrying matter.",
      overview:
        "Light lets us see and sound lets us hear, and both are waves. Understanding waves explains echoes, rainbows, lenses and music.",
      minutes: 20,
      topics: [
        { id: "wave-light", title: "Light and sight", summary: "We see light that reaches the eye.", keyPoints: ["Light travels in straight lines", "Surfaces reflect or absorb", "Colour is light our eyes sort"], kind: "concept" },
        { id: "wave-sound", title: "Sound and hearing", summary: "Sound is a vibration we can hear.", keyPoints: ["Sound needs a material to travel", "Pitch depends on frequency", "Loudness depends on energy"], kind: "model" },
        { id: "wave-use", title: "Using waves", summary: "Waves power communication and tools.", keyPoints: ["Lenses bend light to focus", "Echoes measure distance", "Signals carry information far"], kind: "skill" },
      ],
    },
  ],
};

const physics: SubjectContent = {
  id: "physics",
  name: "Physics",
  theme: "physics",
  tagline: "The rules that motion, energy and fields obey.",
  chapters: [
    {
      number: 1,
      title: "Describing motion",
      bigIdea: "Motion is change in position, measured precisely.",
      overview:
        "Before we explain why things move, we learn to describe how they move — with position, velocity and acceleration as exact quantities.",
      minutes: 24,
      topics: [
        { id: "mot-kin", title: "Position, velocity, acceleration", summary: "Three quantities capture any motion.", keyPoints: ["Velocity has size and direction", "Acceleration is change of velocity", "Signs encode direction"], kind: "concept" },
        { id: "mot-graph", title: "Motion graphs", summary: "Graphs make motion readable.", keyPoints: ["Slope of position is velocity", "Slope of velocity is acceleration", "Area under velocity is distance"], kind: "model" },
        { id: "mot-free", title: "Free fall", summary: "Gravity accelerates everything equally.", keyPoints: ["Mass does not change fall rate", "Air resistance complicates reality", "g is roughly constant near Earth"], kind: "skill" },
      ],
    },
    {
      number: 2,
      title: "Forces and laws",
      bigIdea: "Newton's laws connect force, mass and motion.",
      overview:
        "Three laws explain almost all everyday mechanics: inertia, the force equation, and action-reaction. They are deceptively simple and enormously powerful.",
      minutes: 26,
      topics: [
        { id: "law-inertia", title: "Inertia", summary: "Objects keep doing what they were doing.", keyPoints: ["No net force means no change", "Mass measures inertia", "Motion needs no cause, change does"], kind: "concept" },
        { id: "law-fma", title: "F = m a", summary: "Net force sets acceleration.", keyPoints: ["Direction of force sets direction of change", "Heavier means harder to accelerate", "Forces add as vectors"], kind: "model" },
        { id: "law-react", title: "Action and reaction", summary: "Forces always come in pairs.", keyPoints: ["Pairs act on different objects", "Equal size, opposite direction", "Explains walking, rockets, recoil"], kind: "concept" },
      ],
    },
    {
      number: 3,
      title: "Energy and work",
      bigIdea: "Energy is the currency of physical change.",
      overview:
        "Work transfers energy, and energy is conserved. Tracking energy often solves problems that forces alone make difficult.",
      minutes: 23,
      topics: [
        { id: "en-work", title: "Work and power", summary: "Work moves energy; power is its rate.", keyPoints: ["Work needs force along motion", "Power is work per second", "No motion means no work done"], kind: "skill" },
        { id: "en-kpe", title: "Kinetic and potential energy", summary: "Energy of motion and of position.", keyPoints: ["Speed stores kinetic energy", "Height stores potential energy", "They trade back and forth"], kind: "model" },
        { id: "en-cons", title: "Conservation of energy", summary: "Total energy stays constant.", keyPoints: ["Energy only changes form", "Friction exports energy as heat", "Accounting finds the missing energy"], kind: "concept" },
      ],
    },
    {
      number: 4,
      title: "Electricity and magnetism",
      bigIdea: "Charge and current are two sides of one phenomenon.",
      overview:
        "Electric charge, the current it forms and the magnetism it creates are deeply linked. That link powers motors, generators and modern life.",
      minutes: 25,
      topics: [
        { id: "em-charge", title: "Charge and current", summary: "Moving charge is current.", keyPoints: ["Like charges repel", "Current is charge per second", "Voltage drives the flow"], kind: "concept" },
        { id: "em-circuit", title: "Circuits", summary: "A circuit is a complete loop.", keyPoints: ["Resistance opposes current", "Series shares current, parallel shares voltage", "Energy is delivered, not used up"], kind: "model" },
        { id: "em-mag", title: "Electromagnetism", summary: "Current makes magnetism and back.", keyPoints: ["Current creates a magnetic field", "Changing fields induce current", "This runs motors and generators"], kind: "skill" },
      ],
    },
    {
      number: 5,
      title: "Waves and optics",
      bigIdea: "Waves explain light, sound and much of communication.",
      overview:
        "A wave carries energy through a medium or space. The same mathematics describes ripples, music, radio and light.",
      minutes: 22,
      topics: [
        { id: "wv-prop", title: "Wave properties", summary: "Frequency, wavelength and speed relate.", keyPoints: ["Speed equals frequency times wavelength", "Amplitude carries energy", "Waves can add or cancel"], kind: "concept" },
        { id: "wv-light", title: "Reflection and refraction", summary: "Light bends at boundaries.", keyPoints: ["Angle in equals angle out", "Speed change bends the ray", "Lenses focus by refraction"], kind: "model" },
        { id: "wv-sound", title: "Sound waves", summary: "Sound is a pressure wave.", keyPoints: ["Needs a medium to travel", "Pitch is frequency", "Resonance amplifies"], kind: "skill" },
      ],
    },
    {
      number: 6,
      title: "Modern physics",
      bigIdea: "At small and fast scales, the rules change.",
      overview:
        "Near the speed of light and inside the atom, classical intuition fails. Relativity and quantum ideas replace it with stranger, more accurate pictures.",
      minutes: 20,
      topics: [
        { id: "mod-atom", title: "Inside the atom", summary: "Atoms have structure and energy levels.", keyPoints: ["A dense nucleus holds most mass", "Electrons occupy allowed levels", "Light is emitted in fixed amounts"], kind: "concept" },
        { id: "mod-quanta", title: "Quanta", summary: "Energy comes in discrete packets.", keyPoints: ["Light behaves as particles too", "Measurement has limits", "Probability replaces certainty"], kind: "story" },
        { id: "mod-rel", title: "Relativity in brief", summary: "Space and time are not absolute.", keyPoints: ["Light speed is the same for all", "Fast clocks run slow", "Mass and energy are equivalent"], kind: "story" },
      ],
    },
  ],
};

const chemistry: SubjectContent = {
  id: "chemistry",
  name: "Chemistry",
  theme: "chemistry",
  tagline: "How matter is built, bonded and transformed.",
  chapters: [
    {
      number: 1,
      title: "Atoms and elements",
      bigIdea: "A handful of particles builds everything.",
      overview:
        "All matter is assembled from atoms, and atoms from a few smaller particles. The way those particles are arranged explains every chemical property.",
      minutes: 22,
      topics: [
        { id: "atom-struct", title: "Atomic structure", summary: "Protons, neutrons and electrons.", keyPoints: ["Protons set the element", "Electrons govern chemistry", "Isotopes differ in neutrons"], kind: "concept" },
        { id: "atom-table", title: "The periodic table", summary: "Order reveals repeating properties.", keyPoints: ["Rows fill electron shells", "Columns share behaviour", "Position predicts reactivity"], kind: "model" },
        { id: "atom-bond", title: "Why atoms bond", summary: "Atoms seek stable arrangements.", keyPoints: ["Full shells are stable", "Sharing makes covalent bonds", "Transfer makes ionic bonds"], kind: "concept" },
      ],
    },
    {
      number: 2,
      title: "Bonding and structure",
      bigIdea: "Structure at the small scale sets properties at the large scale.",
      overview:
        "Whether a material is hard, conductive or soluble comes down to how its particles are held together. Bonding is the bridge from atom to material.",
      minutes: 23,
      topics: [
        { id: "bond-types", title: "Types of bonding", summary: "Ionic, covalent and metallic.", keyPoints: ["Ionic forms charged lattices", "Covalent shares electrons", "Metallic shares a sea of electrons"], kind: "model" },
        { id: "bond-shape", title: "Molecular shape", summary: "Geometry follows electron pairs.", keyPoints: ["Pairs repel and spread out", "Shape affects polarity", "Polarity affects behaviour"], kind: "concept" },
        { id: "bond-prop", title: "Structure and properties", summary: "Bonding explains everyday materials.", keyPoints: ["Hardness from strong networks", "Conductivity from free charges", "Solubility from like-dissolves-like"], kind: "skill" },
      ],
    },
    {
      number: 3,
      title: "Reactions and equations",
      bigIdea: "A reaction rearranges atoms, conserving them all.",
      overview:
        "Chemical equations are careful bookkeeping: atoms are never created or destroyed, only regrouped. Balancing is the grammar of chemistry.",
      minutes: 24,
      topics: [
        { id: "rxn-balance", title: "Balancing equations", summary: "Atoms in equal atoms out.", keyPoints: ["Mass is conserved", "Coefficients balance atoms", "Formulas never change to balance"], kind: "skill" },
        { id: "rxn-types", title: "Types of reaction", summary: "Patterns repeat across chemistry.", keyPoints: ["Combination and decomposition", "Displacement swaps partners", "Combustion releases energy"], kind: "model" },
        { id: "rxn-energy", title: "Energy in reactions", summary: "Bonds store and release energy.", keyPoints: ["Breaking bonds costs energy", "Forming bonds releases it", "Net change sets heat flow"], kind: "concept" },
      ],
    },
    {
      number: 4,
      title: "Acids, bases and salts",
      bigIdea: "Proton transfer shapes a huge family of reactions.",
      overview:
        "Acids and bases are defined by how they handle protons, and their reactions produce the salts that fill our kitchens, soils and oceans.",
      minutes: 21,
      topics: [
        { id: "ab-ph", title: "The pH scale", summary: "A scale for acidity.", keyPoints: ["Lower pH is more acidic", "Seven is neutral", "Each step is tenfold"], kind: "concept" },
        { id: "ab-react", title: "Neutralisation", summary: "Acid and base cancel to salt and water.", keyPoints: ["Produces a salt and water", "Useful in medicine and farming", "Indicators reveal the endpoint"], kind: "model" },
        { id: "ab-salt", title: "Salts", summary: "Salts crystallise from reactions.", keyPoints: ["A salt pairs ions", "Solubility varies widely", "Crystals reveal structure"], kind: "skill" },
      ],
    },
    {
      number: 5,
      title: "Carbon chemistry",
      bigIdea: "Carbon's versatility builds the molecules of life.",
      overview:
        "Carbon bonds in chains, rings and branches, creating millions of compounds. Organic chemistry is the study of this remarkable flexibility.",
      minutes: 23,
      topics: [
        { id: "org-chain", title: "Carbon chains", summary: "Carbon links into long frameworks.", keyPoints: ["Four bonds give flexibility", "Chains, rings and branches form", "Small changes alter properties"], kind: "concept" },
        { id: "org-group", title: "Functional groups", summary: "A group gives a family its behaviour.", keyPoints: ["Groups drive reactions", "Same group, similar chemistry", "Naming follows structure"], kind: "model" },
        { id: "org-life", title: "Molecules of life", summary: "Biology runs on carbon compounds.", keyPoints: ["Fuels store carbon energy", "Polymers build structure", "Chemistry underlies metabolism"], kind: "story" },
      ],
    },
    {
      number: 6,
      title: "Chemistry at work",
      bigIdea: "Chemistry turns raw materials into useful things — responsibly.",
      overview:
        "From metals to medicines, chemistry shapes industry. Understanding reactions also means weighing their cost to people and the planet.",
      minutes: 19,
      topics: [
        { id: "work-metal", title: "Extracting metals", summary: "Reactivity decides the method.", keyPoints: ["Reactive metals need electricity", "Less reactive ones need heat", "Ore to metal is a reduction"], kind: "skill" },
        { id: "work-rate", title: "Reaction rates", summary: "Conditions speed or slow reactions.", keyPoints: ["Temperature and surface matter", "Catalysts help without being used up", "Control enables safe industry"], kind: "model" },
        { id: "work-green", title: "Greener chemistry", summary: "Design to reduce waste and harm.", keyPoints: ["Atom economy avoids waste", "Safer solvents matter", "Prevention beats cleanup"], kind: "concept" },
      ],
    },
  ],
};

const biology: SubjectContent = {
  id: "biology",
  name: "Biology",
  theme: "biology",
  tagline: "The logic of living systems, from cell to biosphere.",
  chapters: [
    {
      number: 1,
      title: "The cell",
      bigIdea: "Every living thing is built from cells.",
      overview:
        "The cell is biology's fundamental unit. Its structures, membranes and machinery carry out the processes that keep an organism alive.",
      minutes: 22,
      topics: [
        { id: "cell-struct", title: "Cell structure", summary: "Parts with specialised jobs.", keyPoints: ["The membrane controls entry", "The nucleus stores instructions", "Structure matches function"], kind: "concept" },
        { id: "cell-transport", title: "Across the membrane", summary: "Cells manage what moves in and out.", keyPoints: ["Diffusion moves down gradients", "Osmosis moves water", "Active transport costs energy"], kind: "model" },
        { id: "cell-divide", title: "Cell division", summary: "Cells copy and split.", keyPoints: ["Growth needs new cells", "DNA is copied faithfully", "Errors have consequences"], kind: "skill" },
      ],
    },
    {
      number: 2,
      title: "Energy for life",
      bigIdea: "Life runs on captured and released energy.",
      overview:
        "Photosynthesis captures sunlight into chemical energy, and respiration releases it. Together they power nearly every ecosystem on Earth.",
      minutes: 21,
      topics: [
        { id: "en-photo", title: "Photosynthesis", summary: "Plants build food from light.", keyPoints: ["Light energy becomes chemical energy", "Carbon dioxide and water are inputs", "Oxygen is released"], kind: "model" },
        { id: "en-resp", title: "Respiration", summary: "Cells release stored energy.", keyPoints: ["Glucose is broken down", "Energy powers cell work", "Oxygen improves the yield"], kind: "concept" },
        { id: "en-flow", title: "Energy through ecosystems", summary: "Energy flows one way.", keyPoints: ["Producers capture the sun", "Energy is lost at each level", "Few top predators result"], kind: "story" },
      ],
    },
    {
      number: 3,
      title: "The human body",
      bigIdea: "Organ systems cooperate to keep conditions stable.",
      overview:
        "From circulation to digestion, the body's systems maintain a steady internal environment. Health is the active balance between them.",
      minutes: 24,
      topics: [
        { id: "body-circ", title: "Circulation", summary: "Blood carries what cells need.", keyPoints: ["The heart pumps in a loop", "Vessels specialise by job", "Exchange happens in capillaries"], kind: "model" },
        { id: "body-digest", title: "Digestion", summary: "Food is broken down to absorb.", keyPoints: ["Enzymes break large molecules", "Absorption happens in the gut", "Waste is removed"], kind: "concept" },
        { id: "body-balance", title: "Staying in balance", summary: "The body regulates itself.", keyPoints: ["Homeostasis keeps conditions steady", "Feedback corrects drift", "Breakdown causes disease"], kind: "skill" },
      ],
    },
    {
      number: 4,
      title: "Inheritance",
      bigIdea: "Traits pass from parents through a genetic code.",
      overview:
        "DNA carries instructions from one generation to the next. Genetics explains why offspring resemble parents yet vary from them.",
      minutes: 22,
      topics: [
        { id: "gen-dna", title: "DNA and genes", summary: "A code written in four letters.", keyPoints: ["Genes are instructions", "DNA is copied and read", "Sequence determines protein"], kind: "concept" },
        { id: "gen-inherit", title: "Patterns of inheritance", summary: "Traits follow predictable odds.", keyPoints: ["Two copies of each gene", "Dominant can mask recessive", "Chance sets each outcome"], kind: "model" },
        { id: "gen-variation", title: "Variation", summary: "Differences fuel adaptation.", keyPoints: ["Mutation introduces change", "Mixing shuffles traits", "Variation enables survival"], kind: "story" },
      ],
    },
    {
      number: 5,
      title: "Evolution and diversity",
      bigIdea: "Life's variety is the result of descent with change.",
      overview:
        "Over vast time, populations change as some variants survive and reproduce better than others. This single idea organises all of biology.",
      minutes: 20,
      topics: [
        { id: "evo-select", title: "Natural selection", summary: "Advantageous traits spread.", keyPoints: ["More are born than survive", "Helpful variation is favoured", "Populations shift over generations"], kind: "concept" },
        { id: "evo-evidence", title: "Evidence of change", summary: "The past leaves traces.", keyPoints: ["Fossils record ancient life", "Shared features suggest ancestry", "DNA confirms relationships"], kind: "skill" },
        { id: "evo-classify", title: "Classifying life", summary: "Order makes diversity navigable.", keyPoints: ["Groups reflect relatedness", "Names are shared worldwide", "New data reshapes the tree"], kind: "model" },
      ],
    },
    {
      number: 6,
      title: "Ecology and environment",
      bigIdea: "Organisms and environment shape each other.",
      overview:
        "Ecology studies the web of relationships among living things and their surroundings — and what happens when humans disturb that web.",
      minutes: 19,
      topics: [
        { id: "eco-web", title: "Food webs", summary: "Who eats whom, and the fallout.", keyPoints: ["Links connect many species", "Removing one shifts many", "Balance is dynamic"], kind: "model" },
        { id: "eco-cycle", title: "Cycles of matter", summary: "Elements are reused endlessly.", keyPoints: ["Carbon and nitrogen cycle", "Decomposers recycle matter", "Disruption has wide effects"], kind: "concept" },
        { id: "eco-human", title: "Human impact", summary: "Our choices change ecosystems.", keyPoints: ["Habitat loss drives decline", "Conservation can recover systems", "Small actions scale up"], kind: "story" },
      ],
    },
  ],
};

const computing: SubjectContent = {
  id: "computing",
  name: "Computing",
  theme: "computing",
  tagline: "Thinking in steps, data and systems.",
  chapters: [
    {
      number: 1,
      title: "Computational thinking",
      bigIdea: "Hard problems become easy when broken down well.",
      overview:
        "Before any code, computing is a way of thinking: decompose a problem, spot patterns, ignore detail and design a clear sequence of steps.",
      minutes: 16,
      topics: [
        { id: "ct-decompose", title: "Decomposition", summary: "Split a big problem into small ones.", keyPoints: ["Small problems are solvable", "Parts can be tackled in order", "Combine solutions at the end"], kind: "skill" },
        { id: "ct-pattern", title: "Patterns and abstraction", summary: "Reuse what repeats; hide what distracts.", keyPoints: ["Patterns save re-solving", "Abstraction hides detail", "Focus on what matters now"], kind: "concept" },
        { id: "ct-algorithm", title: "Algorithms", summary: "A precise recipe of steps.", keyPoints: ["Steps must be unambiguous", "Order changes the outcome", "Good algorithms are efficient"], kind: "model" },
      ],
    },
    {
      number: 2,
      title: "Programming basics",
      bigIdea: "A program is instructions a machine follows exactly.",
      overview:
        "Computers do what you say, not what you mean. Programming is learning to express ideas with the precision a machine requires.",
      minutes: 20,
      topics: [
        { id: "prog-var", title: "Variables and data", summary: "Named boxes that hold values.", keyPoints: ["A variable stores a value", "Types restrict operations", "Names should explain intent"], kind: "concept" },
        { id: "prog-flow", title: "Control flow", summary: "Choices and repetition.", keyPoints: ["Conditions pick a path", "Loops repeat work", "Logic must be exact"], kind: "skill" },
        { id: "prog-func", title: "Functions", summary: "Reusable blocks of logic.", keyPoints: ["Functions avoid repetition", "Inputs produce outputs", "Names document behaviour"], kind: "model" },
      ],
    },
    {
      number: 3,
      title: "Data representation",
      bigIdea: "Everything in a computer is numbers underneath.",
      overview:
        "Text, images and sound all become patterns of binary digits. Understanding representation demystifies what a computer actually stores.",
      minutes: 18,
      topics: [
        { id: "data-binary", title: "Binary", summary: "Two symbols encode anything.", keyPoints: ["Bits are on or off", "Place value in base two", "Bytes group eight bits"], kind: "concept" },
        { id: "data-media", title: "Encoding media", summary: "Numbers for text, image and sound.", keyPoints: ["Characters map to codes", "Pixels store colour numbers", "Sampling captures sound"], kind: "model" },
        { id: "data-size", title: "Size and compression", summary: "Smaller data moves faster.", keyPoints: ["More detail means more data", "Compression removes redundancy", "Trade-offs affect quality"], kind: "skill" },
      ],
    },
    {
      number: 4,
      title: "How computers work",
      bigIdea: "A simple machine, repeated billions of times a second.",
      overview:
        "At heart a computer fetches, decodes and executes instructions in a loop. Memory, processor and storage each play a defined role.",
      minutes: 19,
      topics: [
        { id: "hw-cpu", title: "Processor and memory", summary: "Where work and storage happen.", keyPoints: ["The CPU runs instructions", "Memory holds current work", "Storage keeps data long term"], kind: "concept" },
        { id: "hw-cycle", title: "The instruction cycle", summary: "Fetch, decode, execute, repeat.", keyPoints: ["Instructions run one by one, fast", "Clock speed sets the pace", "Simple steps build complex behaviour"], kind: "model" },
        { id: "hw-os", title: "Operating systems", summary: "Software that manages the machine.", keyPoints: ["Shares resources fairly", "Hides hardware detail", "Runs many programs at once"], kind: "skill" },
      ],
    },
    {
      number: 5,
      title: "Networks and the web",
      bigIdea: "Computers cooperate by agreeing on rules.",
      overview:
        "The internet works because machines follow shared protocols. Data is split, addressed, routed and reassembled across the world in moments.",
      minutes: 18,
      topics: [
        { id: "net-packet", title: "Packets and protocols", summary: "Data travels in addressed pieces.", keyPoints: ["Messages split into packets", "Addresses guide routing", "Protocols are shared rules"], kind: "model" },
        { id: "net-web", title: "How the web works", summary: "Requests and responses.", keyPoints: ["Browsers request pages", "Servers respond with data", "Links connect everything"], kind: "concept" },
        { id: "net-safe", title: "Staying safe online", summary: "Security protects people and data.", keyPoints: ["Strong, unique passwords help", "Encryption hides data in transit", "Think before you share"], kind: "practice" },
      ],
    },
    {
      number: 6,
      title: "Data, AI and ethics",
      bigIdea: "Powerful tools demand responsible choices.",
      overview:
        "Modern computing learns from data at scale. That power raises real questions about fairness, privacy and who is accountable.",
      minutes: 17,
      topics: [
        { id: "ai-data", title: "Learning from data", summary: "Systems find patterns in examples.", keyPoints: ["More data can mean better models", "Patterns are not understanding", "Bias in means bias out"], kind: "concept" },
        { id: "ai-privacy", title: "Privacy and data", summary: "Data about people needs care.", keyPoints: ["Collect only what is needed", "Consent matters", "Data can be misused"], kind: "story" },
        { id: "ai-ethics", title: "Responsible computing", summary: "Design with people in mind.", keyPoints: ["Consider who is affected", "Accountability must be clear", "Fairness is a design goal"], kind: "practice" },
      ],
    },
  ],
};

const evs: SubjectContent = {
  id: "evs",
  name: "Environmental Studies",
  theme: "evs",
  tagline: "Noticing the world close to home.",
  chapters: [
    {
      number: 1,
      title: "Me and my family",
      bigIdea: "I belong to people and places that care for me.",
      overview:
        "The youngest learners start from what they know best — themselves and their families — and widen outward to community and the living world.",
      minutes: 12,
      topics: [
        { id: "me-body", title: "My body and senses", summary: "Five senses help me explore.", keyPoints: ["Each sense tells me something", "Senses keep me safe", "I care for my body"], kind: "concept" },
        { id: "me-family", title: "Families", summary: "Families come in many shapes.", keyPoints: ["Families care for each other", "Roles can be shared", "Every family is different"], kind: "story" },
        { id: "me-feel", title: "Feelings", summary: "Naming feelings helps.", keyPoints: ["All feelings are okay", "Words help me ask for help", "Kindness matters"], kind: "practice" },
      ],
    },
    {
      number: 2,
      title: "Food and water",
      bigIdea: "We depend on food and clean water every day.",
      overview:
        "Where food and water come from, and how we keep them safe, is one of the first big ideas about how the world sustains us.",
      minutes: 13,
      topics: [
        { id: "food-source", title: "Where food comes from", summary: "Food grows and travels to us.", keyPoints: ["Plants and animals give food", "Farmers grow our food", "Food travels far to reach us"], kind: "concept" },
        { id: "food-water", title: "Clean water", summary: "Water must be safe to drink.", keyPoints: ["We need water to live", "Dirty water makes us ill", "We should not waste water"], kind: "skill" },
        { id: "food-waste", title: "Not wasting", summary: "Taking only what we need.", keyPoints: ["Waste costs the Earth", "Sharing reduces waste", "Small habits add up"], kind: "practice" },
      ],
    },
    {
      number: 3,
      title: "Plants and animals",
      bigIdea: "Living things share our neighbourhood.",
      overview:
        "Observing nearby plants and animals builds a first sense of living diversity, needs and the care we owe to other creatures.",
      minutes: 14,
      topics: [
        { id: "life-plant", title: "Plants around us", summary: "Plants grow, change and help us.", keyPoints: ["Plants need light and water", "Parts do different jobs", "Plants give food and air"], kind: "concept" },
        { id: "life-animal", title: "Animals around us", summary: "Animals live in many homes.", keyPoints: ["Animals need food and shelter", "Homes differ by animal", "We should treat animals kindly"], kind: "story" },
        { id: "life-care", title: "Caring for nature", summary: "We can protect living things.", keyPoints: ["Do not harm living things", "Keep places clean", "Every creature has a role"], kind: "practice" },
      ],
    },
    {
      number: 4,
      title: "My neighbourhood",
      bigIdea: "A community is made of people and places that work together.",
      overview:
        "Shops, helpers, roads and homes make up a neighbourhood. Learners map the familiar and meet the people who keep it running.",
      minutes: 13,
      topics: [
        { id: "nb-helpers", title: "Community helpers", summary: "Many people keep us safe and well.", keyPoints: ["Helpers have important jobs", "We depend on each other", "We thank and respect them"], kind: "story" },
        { id: "nb-places", title: "Places we go", summary: "Shops, parks, clinics and more.", keyPoints: ["Each place has a purpose", "Rules keep places orderly", "Maps help us find the way"], kind: "skill" },
        { id: "nb-travel", title: "Getting around", summary: "We travel in many ways.", keyPoints: ["Transport connects places", "Road safety matters", "Some ways are greener"], kind: "concept" },
      ],
    },
    {
      number: 5,
      title: "Weather and seasons",
      bigIdea: "The sky and seasons shape our days.",
      overview:
        "Noticing weather and seasonal change links everyday experience to larger natural cycles in a gentle, observational way.",
      minutes: 12,
      topics: [
        { id: "wx-weather", title: "Today's weather", summary: "Weather changes day to day.", keyPoints: ["We can observe the sky", "Weather affects what we do", "We dress for the weather"], kind: "concept" },
        { id: "wx-season", title: "Seasons", summary: "The year moves through seasons.", keyPoints: ["Seasons repeat each year", "Nature changes with seasons", "Festivals follow the seasons"], kind: "story" },
        { id: "wx-care", title: "Staying safe", summary: "We prepare for strong weather.", keyPoints: ["Heat and rain need care", "Listen to warnings", "Help those who need it"], kind: "practice" },
      ],
    },
    {
      number: 6,
      title: "Caring for our Earth",
      bigIdea: "Small choices protect the world we share.",
      overview:
        "The chapter gathers earlier ideas into a first sense of responsibility — reducing waste, saving resources and respecting living things.",
      minutes: 13,
      topics: [
        { id: "earth-clean", title: "Keeping clean", summary: "Clean surroundings keep us healthy.", keyPoints: ["Litter harms animals", "Everyone can help", "Clean habits start young"], kind: "practice" },
        { id: "earth-reuse", title: "Reduce and reuse", summary: "Use less, use again.", keyPoints: ["Reusing saves resources", "Sorting waste helps", "Repair before replace"], kind: "skill" },
        { id: "earth-share", title: "Sharing the Earth", summary: "We share the planet with all life.", keyPoints: ["Trees and water are precious", "Animals need space too", "Caring is everyone's job"], kind: "story" },
      ],
    },
  ],
};

export const stemSubjects: Record<string, SubjectContent> = {
  math: mathematics,
  science,
  physics,
  chemistry,
  biology,
  computing,
  evs,
};
