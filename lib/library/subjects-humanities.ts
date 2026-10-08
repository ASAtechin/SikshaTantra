import type { SubjectContent } from "@/lib/library/types";

/**
 * Curated, original humanities and commerce content for the demonstration
 * library. Written for this product; not reproduced from any board textbook.
 */

const social: SubjectContent = {
  id: "social",
  name: "Social Science",
  theme: "social",
  tagline: "People, place, power and the past — together.",
  chapters: [
    {
      number: 1,
      title: "How we know the past",
      bigIdea: "History is built from evidence, not just stories.",
      overview:
        "The past does not speak for itself. Historians read sources carefully, weigh bias and reconstruct what likely happened — a habit of mind, not a list of dates.",
      minutes: 18,
      topics: [
        { id: "hist-source", title: "Reading sources", summary: "Who made this, and why?", keyPoints: ["Every source has a maker", "Bias shapes what is recorded", "Many sources are stronger than one"], kind: "skill" },
        { id: "hist-time", title: "Time and change", summary: "Some things change fast, some slowly.", keyPoints: ["Timelines order events", "Causes build over time", "Continuity matters as much as change"], kind: "concept" },
        { id: "hist-story", title: "Whose story?", summary: "History includes many voices.", keyPoints: ["Power shapes what survives", "Silenced voices still mattered", "New evidence rewrites the past"], kind: "story" },
      ],
    },
    {
      number: 2,
      title: "Maps and places",
      bigIdea: "Where something is shapes what it becomes.",
      overview:
        "Geography links location to life: climate, rivers and resources influence where people settle and how they live. Maps make those links visible.",
      minutes: 17,
      topics: [
        { id: "geo-read", title: "Reading maps", summary: "A map is a chosen view of space.", keyPoints: ["Symbols stand for real features", "Scale compresses distance", "Direction and grids locate places"], kind: "skill" },
        { id: "geo-land", title: "Landforms and water", summary: "The surface shapes settlement.", keyPoints: ["Rivers attract people", "Mountains divide and protect", "Coasts enable trade"], kind: "concept" },
        { id: "geo-climate", title: "Climate and life", summary: "Climate shapes how people live.", keyPoints: ["Climate differs by region", "People adapt to conditions", "Change alters where life thrives"], kind: "model" },
      ],
    },
    {
      number: 3,
      title: "Living together",
      bigIdea: "Rules and institutions let strangers cooperate.",
      overview:
        "Civics asks how a community makes decisions fairly. Rights, duties and institutions are the tools societies use to live together peacefully.",
      minutes: 18,
      topics: [
        { id: "civ-rules", title: "Why rules", summary: "Rules make life predictable and fair.", keyPoints: ["Rules protect everyone", "Fair rules apply equally", "Rules can be changed well"], kind: "concept" },
        { id: "civ-rights", title: "Rights and duties", summary: "Freedom comes with responsibility.", keyPoints: ["Rights protect people", "Duties sustain rights", "Rights have limits"], kind: "model" },
        { id: "civ-govern", title: "How decisions are made", summary: "Communities choose their path.", keyPoints: ["Representatives act for many", "Voice and vote give power", "Accountability checks power"], kind: "story" },
      ],
    },
    {
      number: 4,
      title: "Making a living",
      bigIdea: "Economies decide who gets what, and how.",
      overview:
        "Every society faces scarcity and must choose. Markets, work and money are the ways people produce, exchange and share what they need.",
      minutes: 17,
      topics: [
        { id: "econ-need", title: "Needs and choices", summary: "Scarcity forces choices.", keyPoints: ["We cannot have everything", "Every choice has a cost", "Priorities differ by person"], kind: "concept" },
        { id: "econ-market", title: "Markets", summary: "Markets coordinate buyers and sellers.", keyPoints: ["Price balances supply and demand", "Exchange benefits both sides", "Markets need rules to be fair"], kind: "model" },
        { id: "econ-work", title: "Work and value", summary: "Work turns effort into value.", keyPoints: ["Jobs create goods and services", "Skills raise earning power", "Fair work sustains families"], kind: "skill" },
      ],
    },
    {
      number: 5,
      title: "Our country and world",
      bigIdea: "Local lives connect to a wider world.",
      overview:
        "A nation is held together by shared institutions, and connected to others through trade, migration and ideas. Learners place their own community in that larger picture.",
      minutes: 19,
      topics: [
        { id: "world-nation", title: "A nation together", summary: "Diversity within a shared frame.", keyPoints: ["Many cultures, one framework", "Shared rights bind citizens", "Unity respects difference"], kind: "story" },
        { id: "world-connect", title: "A connected world", summary: "Places depend on each other.", keyPoints: ["Trade links distant places", "Ideas travel fast", "Problems cross borders"], kind: "concept" },
        { id: "world-respon", title: "Being a global citizen", summary: "Local action, global awareness.", keyPoints: ["Choices affect far-off people", "Cooperation solves shared problems", "Respect spans cultures"], kind: "practice" },
      ],
    },
    {
      number: 6,
      title: "Change and progress",
      bigIdea: "Societies remake themselves through struggle and ideas.",
      overview:
        "From movements for rights to new technologies, change is driven by people. Studying how it happened helps us shape what comes next.",
      minutes: 18,
      topics: [
        { id: "chg-movement", title: "Movements for change", summary: "People organise to win rights.", keyPoints: ["Change often meets resistance", "Many small acts add up", "Rights were fought for, not given"], kind: "story" },
        { id: "chg-tech", title: "Technology and society", summary: "Tools reshape daily life.", keyPoints: ["Technology changes work", "Benefits are unevenly shared", "Society adapts its rules"], kind: "concept" },
        { id: "chg-future", title: "Shaping the future", summary: "The future is a choice.", keyPoints: ["History informs decisions", "Participation matters", "Progress is not automatic"], kind: "practice" },
      ],
    },
  ],
};

const history: SubjectContent = {
  id: "history",
  name: "History",
  theme: "history",
  tagline: "Evidence, memory and the making of the present.",
  chapters: [
    { number: 1, title: "Doing history", bigIdea: "History is an argument from evidence.", overview: "Historians interpret sources critically, aware that records are partial and shaped by power. Method matters as much as content.", minutes: 20, topics: [
      { id: "h1-evidence", title: "Sources and evidence", summary: "Primary and secondary sources differ.", keyPoints: ["Primary sources are from the time", "Context shapes meaning", "Corroboration strengthens claims"], kind: "skill" },
      { id: "h1-bias", title: "Bias and perspective", summary: "Every account has a viewpoint.", keyPoints: ["No source is neutral", "Absence is also evidence", "Multiple views reveal more"], kind: "concept" },
      { id: "h1-cause", title: "Cause and consequence", summary: "Events have layered causes.", keyPoints: ["Short and long causes combine", "Consequences unfold over time", "Causation is not inevitability"], kind: "model" },
    ] },
    { number: 2, title: "Early societies", bigIdea: "Settlement transformed how humans lived.", overview: "The shift from foraging to farming reshaped population, power and culture, laying foundations for cities and states.", minutes: 21, topics: [
      { id: "h2-farm", title: "The farming revolution", summary: "Growing food changed everything.", keyPoints: ["Surplus allowed specialisation", "Settlements grew into towns", "New inequalities appeared"], kind: "story" },
      { id: "h2-city", title: "First cities and states", summary: "Scale required new institutions.", keyPoints: ["Writing managed complexity", "Rulers claimed authority", "Trade linked regions"], kind: "concept" },
      { id: "h2-belief", title: "Belief and culture", summary: "Shared stories bound communities.", keyPoints: ["Religion organised life", "Monuments expressed power", "Culture travelled with trade"], kind: "story" },
    ] },
    { number: 3, title: "Empires and exchange", bigIdea: "Connection spread goods, ideas and conflict.", overview: "Large empires and trade routes moved people and ideas across continents, with consequences that still echo today.", minutes: 22, topics: [
      { id: "h3-empire", title: "Rise and fall of empires", summary: "Empires expand, strain and fracture.", keyPoints: ["Expansion brings new challenges", "Administration holds or fails", "Decline has many causes"], kind: "model" },
      { id: "h3-trade", title: "Trade routes", summary: "Roads of goods and ideas.", keyPoints: ["Trade moved more than goods", "Ideas and disease travelled too", "Wealth concentrated at hubs"], kind: "concept" },
      { id: "h3-meet", title: "Encounters", summary: "Cultures met, borrowed and clashed.", keyPoints: ["Exchange reshaped both sides", "Power imbalances mattered", "Blending created new forms"], kind: "story" },
    ] },
    { number: 4, title: "Colonialism and resistance", bigIdea: "Domination provoked movements for freedom.", overview: "Colonial rule reorganised economies and societies, and the struggle against it forged modern nations and ideals.", minutes: 23, topics: [
      { id: "h4-colony", title: "How colonial rule worked", summary: "Control of land, trade and minds.", keyPoints: ["Economies were reoriented", "Rule relied on hierarchy", "Culture was contested"], kind: "concept" },
      { id: "h4-resist", title: "Resistance and nationalism", summary: "People organised to be free.", keyPoints: ["Resistance took many forms", "Leaders mobilised millions", "Ideas of nation emerged"], kind: "story" },
      { id: "h4-legacy", title: "Lasting legacies", summary: "The aftermath shapes the present.", keyPoints: ["Borders were often imposed", "Economic effects endured", "Memory remains contested"], kind: "model" },
    ] },
    { number: 5, title: "The modern world", bigIdea: "Revolutions remade politics and economy.", overview: "Industrial and political revolutions transformed how people worked, governed and imagined their rights.", minutes: 21, topics: [
      { id: "h5-industry", title: "Industrial change", summary: "Machines reshaped work and cities.", keyPoints: ["Production scaled up", "Cities grew rapidly", "New classes and conflicts arose"], kind: "concept" },
      { id: "h5-rights", title: "Ideas of rights", summary: "Who counts as a citizen?", keyPoints: ["Rights expanded through struggle", "Equality was redefined", "Ideals outran reality"], kind: "story" },
      { id: "h5-war", title: "Conflict and its lessons", summary: "Global wars reordered the world.", keyPoints: ["Technology magnified war", "Civilians bore heavy costs", "Institutions sought to prevent repeats"], kind: "model" },
    ] },
    { number: 6, title: "History and us", bigIdea: "The past is a resource for the present.", overview: "Understanding how we got here helps us judge claims about identity, justice and progress more carefully.", minutes: 18, topics: [
      { id: "h6-memory", title: "Public memory", summary: "How societies remember together.", keyPoints: ["Memorials make choices", "Memory can unite or divide", "Forgetting is also a choice"], kind: "story" },
      { id: "h6-use", title: "Using the past well", summary: "History informs, it does not dictate.", keyPoints: ["Analogy has limits", "Evidence over nostalgia", "Humility about certainty"], kind: "concept" },
      { id: "h6-you", title: "You in history", summary: "You are part of the story.", keyPoints: ["Choices accumulate into history", "Records you leave matter", "Participation shapes the future"], kind: "practice" },
    ] },
  ],
};

const geography: SubjectContent = {
  id: "geography",
  name: "Geography",
  theme: "geography",
  tagline: "Reading the Earth and our place on it.",
  chapters: [
    { number: 1, title: "The Earth as a system", bigIdea: "Land, water, air and life interact.", overview: "Geography treats the planet as connected systems whose interactions shape landscapes and lives.", minutes: 19, topics: [
      { id: "g1-spheres", title: "Earth's spheres", summary: "Rock, water, air and life connect.", keyPoints: ["Systems exchange matter and energy", "A change in one affects others", "Balance is dynamic"], kind: "concept" },
      { id: "g1-map", title: "Maps and scale", summary: "Representing a round Earth flat.", keyPoints: ["Projections distort something", "Scale sets detail", "Purpose guides choices"], kind: "skill" },
      { id: "g1-place", title: "Location and place", summary: "Where and what a place is like.", keyPoints: ["Location is coordinates", "Place is character", "Both shape human life"], kind: "model" },
    ] },
    { number: 2, title: "Landforms", bigIdea: "The surface is shaped by slow and sudden forces.", overview: "Mountains, plains and valleys result from forces inside and outside the Earth acting over time.", minutes: 20, topics: [
      { id: "g2-internal", title: "Forces within", summary: "Plates build and break land.", keyPoints: ["Plates move slowly", "Collisions raise mountains", "Quakes and volcanoes result"], kind: "concept" },
      { id: "g2-external", title: "Forces outside", summary: "Water, ice and wind reshape land.", keyPoints: ["Erosion wears down", "Deposition builds up", "Rivers sculpt valleys"], kind: "model" },
      { id: "g2-use", title: "Land and people", summary: "Landforms shape settlement.", keyPoints: ["Flat land favours farming", "Rivers attract cities", "Terrain affects transport"], kind: "story" },
    ] },
    { number: 3, title: "Climate and weather", bigIdea: "Atmosphere in motion makes weather and climate.", overview: "Heat, moisture and wind create the patterns we experience daily and the climates that define regions.", minutes: 21, topics: [
      { id: "g3-weather", title: "Weather systems", summary: "Why weather changes.", keyPoints: ["Heat differences drive wind", "Moisture forms clouds and rain", "Pressure shapes conditions"], kind: "model" },
      { id: "g3-climate", title: "Climate zones", summary: "Long-term patterns by region.", keyPoints: ["Latitude sets broad zones", "Oceans moderate climate", "Altitude cools the air"], kind: "concept" },
      { id: "g3-change", title: "A changing climate", summary: "Human activity shifts the system.", keyPoints: ["Greenhouse gases trap heat", "Effects are uneven", "Adaptation and mitigation both matter"], kind: "story" },
    ] },
    { number: 4, title: "Water and resources", bigIdea: "Resources are unevenly spread and precious.", overview: "Water, minerals and energy sustain economies, but their distribution and use raise questions of fairness and sustainability.", minutes: 19, topics: [
      { id: "g4-water", title: "Water resources", summary: "Fresh water is limited.", keyPoints: ["Most water is salty", "Demand is rising", "Sharing rivers causes disputes"], kind: "concept" },
      { id: "g4-energy", title: "Energy resources", summary: "Powering modern life.", keyPoints: ["Fossil fuels are finite", "Renewables are growing", "Energy shapes development"], kind: "model" },
      { id: "g4-sustain", title: "Using resources wisely", summary: "Meeting needs without exhausting.", keyPoints: ["Overuse depletes resources", "Efficiency extends supply", "Future generations count too"], kind: "practice" },
    ] },
    { number: 5, title: "People and settlement", bigIdea: "Population patterns reflect opportunity and constraint.", overview: "Where and how people live is shaped by geography, economy and history — and increasingly by migration and urban growth.", minutes: 18, topics: [
      { id: "g5-pop", title: "Population patterns", summary: "People cluster unevenly.", keyPoints: ["Resources attract people", "Density varies hugely", "Patterns shift over time"], kind: "concept" },
      { id: "g5-urban", title: "Cities and growth", summary: "Urban areas concentrate life.", keyPoints: ["Cities offer opportunity", "Growth strains services", "Planning shapes livability"], kind: "model" },
      { id: "g5-move", title: "Migration", summary: "People move for many reasons.", keyPoints: ["Push and pull factors combine", "Migration reshapes places", "It raises real challenges"], kind: "story" },
    ] },
    { number: 6, title: "Geography in action", bigIdea: "Spatial thinking solves real problems.", overview: "From disaster response to planning a route, geographic tools turn questions about space into decisions.", minutes: 17, topics: [
      { id: "g6-gis", title: "Mapping with data", summary: "Layers of data reveal patterns.", keyPoints: ["Data can be placed on maps", "Layers show relationships", "Patterns guide decisions"], kind: "skill" },
      { id: "g6-risk", title: "Hazards and resilience", summary: "Preparing for natural hazards.", keyPoints: ["Risk mixes hazard and vulnerability", "Preparation saves lives", "Recovery is also planning"], kind: "practice" },
      { id: "g6-local", title: "Your local geography", summary: "Geography starts at your door.", keyPoints: ["Observe your surroundings", "Ask why things are where", "Local choices matter"], kind: "story" },
    ] },
  ],
};

const civics: SubjectContent = {
  id: "civics",
  name: "Political Science",
  theme: "civics",
  tagline: "Power, rights and how we govern ourselves.",
  chapters: [
    { number: 1, title: "Why government", bigIdea: "Shared rules let large groups cooperate.", overview: "Government exists to make and enforce collective decisions. How it does so determines whether power serves people or dominates them.", minutes: 18, topics: [
      { id: "c1-order", title: "Order and freedom", summary: "Balancing safety and liberty.", keyPoints: ["Too little order harms all", "Too much control harms freedom", "Good rule balances both"], kind: "concept" },
      { id: "c1-power", title: "What is power?", summary: "Power is the ability to decide.", keyPoints: ["Power can be given or taken", "Legitimacy makes power accepted", "Unchecked power tends to abuse"], kind: "model" },
      { id: "c1-forms", title: "Forms of government", summary: "Who rules, and how.", keyPoints: ["Rule by one, few or many", "Democracy disperses power", "Forms can blend"], kind: "story" },
    ] },
    { number: 2, title: "Democracy", bigIdea: "In a democracy, power flows from the people.", overview: "Democracy is more than voting: it requires rights, participation and accountable institutions working together.", minutes: 20, topics: [
      { id: "c2-vote", title: "Elections and representation", summary: "Choosing who decides for us.", keyPoints: ["Votes transfer authority", "Representation scales democracy", "Fair process builds trust"], kind: "concept" },
      { id: "c2-partic", title: "Participation", summary: "Democracy needs active citizens.", keyPoints: ["Voting is a start, not the end", "Debate shapes decisions", "Silence cedes power"], kind: "practice" },
      { id: "c2-account", title: "Accountability", summary: "Power must answer to people.", keyPoints: ["Checks limit abuse", "Transparency enables scrutiny", "Free press watches power"], kind: "model" },
    ] },
    { number: 3, title: "Rights and justice", bigIdea: "Rights protect people from power.", overview: "Fundamental rights guard dignity and equality, while justice systems resolve disputes and uphold the law.", minutes: 19, topics: [
      { id: "c3-rights", title: "Fundamental rights", summary: "Protections everyone shares.", keyPoints: ["Rights apply to all", "They limit government", "They carry responsibilities"], kind: "concept" },
      { id: "c3-equal", title: "Equality", summary: "Treating people fairly.", keyPoints: ["Equal before the law", "Equity addresses difference", "Discrimination harms society"], kind: "story" },
      { id: "c3-law", title: "Rule of law", summary: "No one is above the law.", keyPoints: ["Laws apply to all equally", "Courts resolve disputes", "Fair process matters"], kind: "model" },
    ] },
    { number: 4, title: "Institutions", bigIdea: "Separated powers keep each other in check.", overview: "Legislatures make laws, executives carry them out and courts interpret them — a design meant to prevent any one from dominating.", minutes: 20, topics: [
      { id: "c4-branches", title: "Branches of government", summary: "Making, doing and judging.", keyPoints: ["Each branch has a role", "Separation prevents tyranny", "They must also cooperate"], kind: "model" },
      { id: "c4-levels", title: "Levels of government", summary: "From local to national.", keyPoints: ["Power is shared by level", "Local government is closest", "Coordination is essential"], kind: "concept" },
      { id: "c4-consti", title: "The constitution", summary: "The rulebook for governing.", keyPoints: ["It defines powers and limits", "It protects rights", "It can be amended carefully"], kind: "skill" },
    ] },
    { number: 5, title: "Citizens and society", bigIdea: "Democracy lives through everyday civic life.", overview: "Beyond institutions, democracy depends on an engaged public, a free press and a culture of tolerance and debate.", minutes: 18, topics: [
      { id: "c5-civil", title: "Civil society", summary: "Citizens acting together.", keyPoints: ["Groups give people voice", "Volunteering strengthens community", "Civil society checks power"], kind: "story" },
      { id: "c5-media", title: "Media and information", summary: "An informed public decides better.", keyPoints: ["Free media informs", "Misinformation misleads", "Critical reading is a civic skill"], kind: "practice" },
      { id: "c5-tolerance", title: "Living with difference", summary: "Democracy requires tolerance.", keyPoints: ["Disagreement is normal", "Respect enables debate", "Majority must protect minority"], kind: "concept" },
    ] },
    { number: 6, title: "Global politics", bigIdea: "Nations cooperate and compete across borders.", overview: "States interact through diplomacy, trade and international institutions to manage shared problems and conflicts.", minutes: 17, topics: [
      { id: "c6-states", title: "States and sovereignty", summary: "Independent nations in a system.", keyPoints: ["Sovereignty means self-rule", "States recognise each other", "Interests drive relations"], kind: "concept" },
      { id: "c6-coop", title: "International cooperation", summary: "Solving shared problems.", keyPoints: ["Some problems cross borders", "Institutions coordinate action", "Cooperation needs trust"], kind: "model" },
      { id: "c6-peace", title: "Conflict and peace", summary: "Preventing and ending conflict.", keyPoints: ["Diplomacy seeks solutions", "Causes are often economic", "Peace must be built"], kind: "story" },
    ] },
  ],
};

const economics: SubjectContent = {
  id: "economics",
  name: "Economics",
  theme: "economics",
  tagline: "How societies produce, exchange and share.",
  chapters: [
    { number: 1, title: "Scarcity and choice", bigIdea: "Limited means force trade-offs.", overview: "Economics begins with scarcity: wants exceed resources, so every choice has a cost. This single idea organises the whole subject.", minutes: 18, topics: [
      { id: "e1-scarcity", title: "Scarcity", summary: "We cannot have everything.", keyPoints: ["Resources are limited", "Wants are unlimited", "Choice is unavoidable"], kind: "concept" },
      { id: "e1-cost", title: "Opportunity cost", summary: "The next best thing given up.", keyPoints: ["Every choice has a cost", "Costs are not only money", "Good choices weigh alternatives"], kind: "model" },
      { id: "e1-incent", title: "Incentives", summary: "People respond to rewards.", keyPoints: ["Incentives shape behaviour", "They can backfire", "Design matters"], kind: "story" },
    ] },
    { number: 2, title: "Markets", bigIdea: "Prices coordinate countless decisions.", overview: "Markets bring buyers and sellers together, and prices signal scarcity and value — guiding resources without central control.", minutes: 20, topics: [
      { id: "e2-demand", title: "Demand and supply", summary: "Two forces set the price.", keyPoints: ["Demand falls as price rises", "Supply rises as price rises", "Price settles where they meet"], kind: "model" },
      { id: "e2-price", title: "Prices as signals", summary: "Prices carry information.", keyPoints: ["Scarcity raises price", "Price guides production", "Shortages and surpluses self-correct"], kind: "concept" },
      { id: "e2-fail", title: "When markets fail", summary: "Markets are powerful but imperfect.", keyPoints: ["Some costs fall on others", "Public goods are underprovided", "Rules can improve outcomes"], kind: "skill" },
    ] },
    { number: 3, title: "Money and banking", bigIdea: "Money makes exchange and saving efficient.", overview: "Money solves the problems of barter, and banks channel savings into investment — the plumbing of a modern economy.", minutes: 19, topics: [
      { id: "e3-money", title: "What money does", summary: "A tool for exchange and value.", keyPoints: ["It avoids barter's problems", "It stores value over time", "Trust underpins it"], kind: "concept" },
      { id: "e3-bank", title: "Banks and credit", summary: "Linking savers and borrowers.", keyPoints: ["Banks pool savings", "Credit funds investment", "Risk must be managed"], kind: "model" },
      { id: "e3-inflation", title: "Inflation", summary: "When money loses value.", keyPoints: ["Prices rise, money buys less", "Moderate is normal", "High inflation harms planning"], kind: "story" },
    ] },
    { number: 4, title: "The whole economy", bigIdea: "National choices shape growth and jobs.", overview: "Macroeconomics looks at the economy as a whole — output, employment and the role of government in steadying it.", minutes: 20, topics: [
      { id: "e4-gdp", title: "Measuring the economy", summary: "What counts as output.", keyPoints: ["GDP sums production", "Growth is change over time", "Numbers miss some value"], kind: "concept" },
      { id: "e4-jobs", title: "Employment", summary: "Work for those who seek it.", keyPoints: ["Unemployment wastes potential", "Types have different causes", "Policy can influence it"], kind: "model" },
      { id: "e4-policy", title: "Government and the economy", summary: "Steadying ups and downs.", keyPoints: ["Spending and taxes are tools", "Interest rates influence demand", "Trade-offs are unavoidable"], kind: "skill" },
    ] },
    { number: 5, title: "Development", bigIdea: "Growth is a means; wellbeing is the goal.", overview: "Development asks not just how much an economy produces, but whether people's lives — health, education, dignity — actually improve.", minutes: 18, topics: [
      { id: "e5-measure", title: "Beyond income", summary: "Wellbeing is more than money.", keyPoints: ["Health and education matter", "Averages hide inequality", "Dignity is part of development"], kind: "concept" },
      { id: "e5-inequal", title: "Inequality", summary: "Who shares in growth.", keyPoints: ["Growth can be uneven", "Opportunity should be fair", "Policy shapes distribution"], kind: "story" },
      { id: "e5-sustain", title: "Sustainable development", summary: "Meeting needs without harm.", keyPoints: ["Future generations count", "Environment is an asset", "Growth must be durable"], kind: "practice" },
    ] },
    { number: 6, title: "Economics in life", bigIdea: "Economic thinking improves everyday decisions.", overview: "From budgeting to voting on policy, economic reasoning helps people and societies make better, clearer choices.", minutes: 16, topics: [
      { id: "e6-budget", title: "Personal finance", summary: "Managing your own resources.", keyPoints: ["Budget to match income", "Saving creates options", "Borrowing has costs"], kind: "practice" },
      { id: "e6-global", title: "The global economy", summary: "Economies are connected.", keyPoints: ["Trade links nations", "Shocks spread", "Cooperation stabilises"], kind: "model" },
      { id: "e6-think", title: "Thinking like an economist", summary: "A toolkit for decisions.", keyPoints: ["Weigh costs and benefits", "Consider incentives", "Expect unintended effects"], kind: "skill" },
    ] },
  ],
};

const accountancy: SubjectContent = {
  id: "accountancy",
  name: "Accountancy",
  theme: "accountancy",
  tagline: "The language a business uses to tell its story.",
  chapters: [
    { number: 1, title: "Why accounting", bigIdea: "Accounts turn activity into a readable story.", overview: "Accounting records, classifies and summarises transactions so owners, lenders and regulators can understand what a business did and owns.", minutes: 18, topics: [
      { id: "a1-purpose", title: "Purpose of accounts", summary: "Information for decisions.", keyPoints: ["Records what happened", "Serves many users", "Supports decisions"], kind: "concept" },
      { id: "a1-transaction", title: "The transaction", summary: "Every entry starts with an event.", keyPoints: ["A transaction has two sides", "Evidence supports it", "Timing matters"], kind: "model" },
      { id: "a1-equation", title: "The accounting equation", summary: "Assets equal claims on them.", keyPoints: ["Assets = liabilities + equity", "It always balances", "It frames every entry"], kind: "skill" },
    ] },
    { number: 2, title: "Recording", bigIdea: "Double entry keeps the books honest.", overview: "Every transaction affects two accounts, keeping the books in balance and making errors visible.", minutes: 20, topics: [
      { id: "a2-double", title: "Double entry", summary: "Two sides to every entry.", keyPoints: ["Debits equal credits", "Each side has meaning", "Balance is a check"], kind: "concept" },
      { id: "a2-journal", title: "Journals and ledgers", summary: "First record, then organise.", keyPoints: ["Journal records in order", "Ledger groups by account", "Together they form the trail"], kind: "skill" },
      { id: "a2-trial", title: "The trial balance", summary: "A first test of accuracy.", keyPoints: ["Totals should agree", "Agreement is not proof", "It precedes statements"], kind: "model" },
    ] },
    { number: 3, title: "Financial statements", bigIdea: "Statements summarise performance and position.", overview: "The income statement shows how a business performed; the balance sheet shows what it owns and owes at a moment in time.", minutes: 21, topics: [
      { id: "a3-income", title: "Income statement", summary: "Did the business make a profit?", keyPoints: ["Revenue minus expenses", "Covers a period", "Profit is not cash"], kind: "concept" },
      { id: "a3-balance", title: "Balance sheet", summary: "What it owns and owes.", keyPoints: ["A snapshot in time", "Balances by design", "Shows financial position"], kind: "model" },
      { id: "a3-cash", title: "Cash flow", summary: "Where cash came and went.", keyPoints: ["Cash differs from profit", "Timing is everything", "Liquidity keeps firms alive"], kind: "skill" },
    ] },
    { number: 4, title: "Reading the numbers", bigIdea: "Ratios turn statements into insight.", overview: "Ratios compare figures to judge profitability, efficiency and risk, letting outsiders assess a business quickly.", minutes: 19, topics: [
      { id: "a4-profit", title: "Profitability", summary: "How well it earns.", keyPoints: ["Margins show efficiency", "Return relates profit to capital", "Compare over time"], kind: "concept" },
      { id: "a4-liquid", title: "Liquidity", summary: "Can it pay its bills?", keyPoints: ["Short-term solvency matters", "Too little cash is dangerous", "Too much is idle"], kind: "model" },
      { id: "a4-compare", title: "Comparing fairly", summary: "Context makes ratios meaningful.", keyPoints: ["Compare like with like", "Trends beat single figures", "Numbers need a story"], kind: "skill" },
    ] },
    { number: 5, title: "Accounting and honesty", bigIdea: "Trust is accounting's real product.", overview: "Because others rely on accounts, accuracy, consistency and ethics are not optional — they are the foundation of the whole system.", minutes: 17, topics: [
      { id: "a5-principle", title: "Principles", summary: "Rules that keep accounts comparable.", keyPoints: ["Consistency aids comparison", "Prudence avoids overstating", "Disclosure builds trust"], kind: "concept" },
      { id: "a5-audit", title: "Audit and assurance", summary: "An independent check.", keyPoints: ["Auditors verify accounts", "Independence matters", "It protects users"], kind: "model" },
      { id: "a5-ethics", title: "Ethics", summary: "Numbers can be misused.", keyPoints: ["Manipulation harms many", "Honesty is foundational", "Standards guard the public"], kind: "practice" },
    ] },
    { number: 6, title: "Accounting in practice", bigIdea: "Modern accounting is increasingly digital.", overview: "Software automates recording and reporting, freeing accountants to analyse and advise — but the principles remain the same.", minutes: 16, topics: [
      { id: "a6-tech", title: "Technology in accounts", summary: "Automation changes the work.", keyPoints: ["Software records automatically", "Analysis grows in value", "Principles still apply"], kind: "skill" },
      { id: "a6-decide", title: "Accounting for decisions", summary: "Numbers guide management.", keyPoints: ["Budgets plan ahead", "Costs inform pricing", "Data supports choices"], kind: "model" },
      { id: "a6-you", title: "Everyday accounting", summary: "You keep accounts too.", keyPoints: ["Budgets apply to life", "Records build discipline", "Clarity aids decisions"], kind: "practice" },
    ] },
  ],
};

const business: SubjectContent = {
  id: "business",
  name: "Business Studies",
  theme: "business",
  tagline: "How ideas become organisations that last.",
  chapters: [
    { number: 1, title: "The world of business", bigIdea: "A business creates value by meeting needs.", overview: "Businesses organise people and resources to provide goods and services people want, earning a reward for doing it well.", minutes: 17, topics: [
      { id: "b1-value", title: "Creating value", summary: "Solving a real problem.", keyPoints: ["Value meets a need", "Customers decide value", "Profit rewards value created"], kind: "concept" },
      { id: "b1-types", title: "Types of business", summary: "Many forms, many goals.", keyPoints: ["Ownership forms differ", "Scale varies widely", "Goals are not only profit"], kind: "model" },
      { id: "b1-env", title: "Business environment", summary: "Context shapes choices.", keyPoints: ["Economy, law and society matter", "Change creates risk and chance", "Adaptation is survival"], kind: "story" },
    ] },
    { number: 2, title: "Starting up", bigIdea: "Enterprise turns an idea into reality.", overview: "Entrepreneurs spot opportunities and take calculated risks, assembling a plan, resources and a team to launch.", minutes: 19, topics: [
      { id: "b2-idea", title: "From idea to opportunity", summary: "Not every idea is a business.", keyPoints: ["Test the real need", "Check feasibility", "Opportunity beats novelty"], kind: "concept" },
      { id: "b2-plan", title: "The business plan", summary: "A map for the venture.", keyPoints: ["Plans clarify thinking", "They attract support", "They adapt to reality"], kind: "skill" },
      { id: "b2-risk", title: "Risk and reward", summary: "Enterprise means uncertainty.", keyPoints: ["Risk is calculated, not reckless", "Failure teaches", "Reward follows value"], kind: "story" },
    ] },
    { number: 3, title: "Running the business", bigIdea: "Management turns plans into daily action.", overview: "Organising people, operations and finance is the ongoing work of management, aligning effort toward shared goals.", minutes: 20, topics: [
      { id: "b3-manage", title: "Functions of management", summary: "Plan, organise, lead, control.", keyPoints: ["Planning sets direction", "Organising arranges resources", "Control keeps on track"], kind: "model" },
      { id: "b3-people", title: "Managing people", summary: "Organisations run on people.", keyPoints: ["Motivation drives performance", "Communication aligns effort", "Culture shapes behaviour"], kind: "concept" },
      { id: "b3-ops", title: "Operations", summary: "Delivering reliably.", keyPoints: ["Quality builds trust", "Efficiency lowers cost", "Process improvement never ends"], kind: "skill" },
    ] },
    { number: 4, title: "Reaching customers", bigIdea: "Marketing connects value to the people who need it.", overview: "Understanding customers and communicating value turns a good product into a successful one.", minutes: 19, topics: [
      { id: "b4-customer", title: "Knowing the customer", summary: "Build for a real person.", keyPoints: ["Research reveals needs", "Segments differ", "Empathy guides design"], kind: "concept" },
      { id: "b4-mix", title: "The marketing mix", summary: "Product, price, place, promotion.", keyPoints: ["Each element matters", "They must fit together", "Trade-offs are constant"], kind: "model" },
      { id: "b4-brand", title: "Brand and trust", summary: "Reputation is an asset.", keyPoints: ["Brand is a promise", "Trust is earned slowly", "Consistency builds it"], kind: "story" },
    ] },
    { number: 5, title: "Money and growth", bigIdea: "Finance fuels and disciplines a business.", overview: "Businesses need funds to start and grow, and must manage money carefully to stay solvent and seize opportunity.", minutes: 18, topics: [
      { id: "b5-finance", title: "Raising finance", summary: "Where money comes from.", keyPoints: ["Own funds or borrowing", "Each source has a cost", "Match finance to need"], kind: "concept" },
      { id: "b5-grow", title: "Growth", summary: "Getting bigger, carefully.", keyPoints: ["Growth brings new challenges", "Culture can strain", "Pace must be sustainable"], kind: "model" },
      { id: "b5-cash", title: "Cash discipline", summary: "Cash keeps a business alive.", keyPoints: ["Profit is not cash", "Running out is fatal", "Plan for timing"], kind: "skill" },
    ] },
    { number: 6, title: "Responsible business", bigIdea: "Lasting businesses serve more than shareholders.", overview: "Ethics, community and environment shape a business's licence to operate — and increasingly its success.", minutes: 16, topics: [
      { id: "b6-ethics", title: "Business ethics", summary: "Doing right, not just legal.", keyPoints: ["Ethics builds trust", "Short cuts cost later", "Values guide hard choices"], kind: "practice" },
      { id: "b6-society", title: "Business and society", summary: "Businesses affect communities.", keyPoints: ["Jobs and taxes benefit all", "Harm erodes support", "Responsibility is strategic"], kind: "story" },
      { id: "b6-future", title: "The future of work", summary: "Change is the constant.", keyPoints: ["Technology reshapes jobs", "Learning never stops", "Adaptability is key"], kind: "concept" },
    ] },
  ],
};

const language: SubjectContent = {
  id: "language",
  name: "Language & Literature",
  theme: "language",
  tagline: "Reading closely, writing clearly, thinking well.",
  chapters: [
    { number: 1, title: "Reading closely", bigIdea: "Careful reading uncovers more than the surface.", overview: "Good readers slow down, notice choices and ask why a writer wrote this way. Reading is active, not passive.", minutes: 16, topics: [
      { id: "l1-notice", title: "Noticing detail", summary: "Small choices carry meaning.", keyPoints: ["Word choice shapes tone", "Detail builds meaning", "Re-reading reveals more"], kind: "skill" },
      { id: "l1-infer", title: "Reading between lines", summary: "Meaning is often implied.", keyPoints: ["Writers suggest, not just state", "Evidence supports inference", "Context guides reading"], kind: "concept" },
      { id: "l1-respond", title: "Responding to texts", summary: "Your reaction is a starting point.", keyPoints: ["Form a view with reasons", "Return to the text", "Stay open to re-reading"], kind: "practice" },
    ] },
    { number: 2, title: "How stories work", bigIdea: "Narrative shapes how we understand experience.", overview: "Plot, character, setting and voice are the tools a storyteller uses to create meaning and feeling.", minutes: 18, topics: [
      { id: "l2-plot", title: "Plot and structure", summary: "How events are arranged.", keyPoints: ["Order creates tension", "Conflict drives story", "Structure shapes meaning"], kind: "model" },
      { id: "l2-character", title: "Character and voice", summary: "Who tells the story matters.", keyPoints: ["Characters reveal through action", "Voice colours everything", "Point of view limits what we see"], kind: "concept" },
      { id: "l2-theme", title: "Theme", summary: "The idea beneath the story.", keyPoints: ["Theme is what it is really about", "Shown, not stated", "Open to interpretation"], kind: "story" },
    ] },
    { number: 3, title: "The power of poetry", bigIdea: "Poetry compresses meaning into sound and image.", overview: "Poetry uses rhythm, imagery and form to say much in little, rewarding close attention and multiple readings.", minutes: 16, topics: [
      { id: "l3-image", title: "Imagery", summary: "Words that make pictures.", keyPoints: ["Images appeal to senses", "Comparison deepens meaning", "Concrete beats abstract"], kind: "concept" },
      { id: "l3-sound", title: "Sound and rhythm", summary: "Poetry is meant to be heard.", keyPoints: ["Rhythm creates feeling", "Repetition emphasises", "Sound reinforces sense"], kind: "skill" },
      { id: "l3-form", title: "Form and meaning", summary: "Shape is part of the message.", keyPoints: ["Form guides reading", "Breaks create emphasis", "Freedom and rule both work"], kind: "model" },
    ] },
    { number: 4, title: "Writing clearly", bigIdea: "Clear writing is clear thinking made visible.", overview: "Strong writing starts with a clear purpose and reader in mind, then builds ideas in a logical, well-shaped order.", minutes: 19, topics: [
      { id: "l4-purpose", title: "Purpose and audience", summary: "Write for a reader and a goal.", keyPoints: ["Purpose sets the shape", "Audience sets the tone", "Clarity serves both"], kind: "concept" },
      { id: "l4-structure", title: "Structuring writing", summary: "Order ideas to guide the reader.", keyPoints: ["Open with intent", "One idea per paragraph", "End with purpose"], kind: "skill" },
      { id: "l4-revise", title: "Drafting and revising", summary: "Good writing is rewriting.", keyPoints: ["First drafts are for ideas", "Cut what does not serve", "Read aloud to hear flaws"], kind: "practice" },
    ] },
    { number: 5, title: "Language in use", bigIdea: "Grammar is a tool for making meaning precise.", overview: "Understanding how language works — its grammar, register and nuance — helps us express exactly what we mean.", minutes: 17, topics: [
      { id: "l5-grammar", title: "Grammar as a tool", summary: "Rules that serve meaning.", keyPoints: ["Grammar aids clarity", "Choices affect emphasis", "Rules can be bent with purpose"], kind: "skill" },
      { id: "l5-register", title: "Register and tone", summary: "Match language to situation.", keyPoints: ["Formal and informal differ", "Audience sets register", "Tone shapes reception"], kind: "concept" },
      { id: "l5-word", title: "Word power", summary: "The right word changes everything.", keyPoints: ["Vocabulary expands thought", "Precision avoids confusion", "Context fixes meaning"], kind: "practice" },
    ] },
    { number: 6, title: "Speaking and listening", bigIdea: "Communication is a two-way skill.", overview: "Speaking persuasively and listening generously are learnable skills, vital in school, work and civic life.", minutes: 15, topics: [
      { id: "l6-speak", title: "Speaking well", summary: "Being heard and understood.", keyPoints: ["Structure helps listeners", "Delivery carries meaning", "Practice builds confidence"], kind: "skill" },
      { id: "l6-listen", title: "Listening", summary: "Understanding before replying.", keyPoints: ["Listening is active", "Questions deepen understanding", "Respect enables dialogue"], kind: "practice" },
      { id: "l6-debate", title: "Discussion and debate", summary: "Reasoning together.", keyPoints: ["Evidence supports claims", "Disagreement can be civil", "Minds can change"], kind: "concept" },
    ] },
  ],
};

const art: SubjectContent = {
  id: "art",
  name: "Art & Creativity",
  theme: "art",
  tagline: "Making, looking and imagining.",
  chapters: [
    { number: 1, title: "Looking and seeing", bigIdea: "Artists notice what others pass by.", overview: "Before making, there is looking. Learning to really see colour, shape and light is the start of all visual art.", minutes: 12, topics: [
      { id: "ar1-color", title: "Colour", summary: "Colours have feeling and relationship.", keyPoints: ["Colours mix and contrast", "Colour creates mood", "Light changes colour"], kind: "concept" },
      { id: "ar1-shape", title: "Shape and line", summary: "The building blocks of images.", keyPoints: ["Line leads the eye", "Shape organises space", "Simple parts build images"], kind: "skill" },
      { id: "ar1-look", title: "Really looking", summary: "Observation improves making.", keyPoints: ["Slow looking reveals detail", "Draw what you see", "Everyone sees differently"], kind: "practice" },
    ] },
    { number: 2, title: "Making marks", bigIdea: "Every medium has its own voice.", overview: "Pencil, paint, clay and collage each invite different marks and ideas. Exploring materials builds confidence and range.", minutes: 13, topics: [
      { id: "ar2-draw", title: "Drawing", summary: "The most direct way to make.", keyPoints: ["Line records thinking", "Practice builds control", "Mistakes become ideas"], kind: "skill" },
      { id: "ar2-paint", title: "Colour and paint", summary: "Working with pigment.", keyPoints: ["Paint mixes new colours", "Layers build depth", "Water and texture matter"], kind: "concept" },
      { id: "ar2-make", title: "Making in three dimensions", summary: "Form you can walk around.", keyPoints: ["Materials suggest forms", "Structure holds shape", "Making is problem solving"], kind: "practice" },
    ] },
    { number: 3, title: "Ideas and imagination", bigIdea: "Art turns ideas and feelings into form.", overview: "Creativity is not only talent but a way of connecting ideas. Art gives shape to imagination and emotion.", minutes: 12, topics: [
      { id: "ar3-idea", title: "Where ideas come from", summary: "Inspiration is everywhere.", keyPoints: ["Notice everyday things", "Combine unlike ideas", "Keep a sketchbook"], kind: "story" },
      { id: "ar3-express", title: "Expressing feeling", summary: "Art can hold emotion.", keyPoints: ["Colour and line carry feeling", "There is no wrong feeling", "Making can be calming"], kind: "concept" },
      { id: "ar3-story", title: "Telling stories", summary: "Pictures can narrate.", keyPoints: ["Images can tell stories", "Sequence creates meaning", "Detail adds depth"], kind: "practice" },
    ] },
    { number: 4, title: "Art around us", bigIdea: "Art and craft fill daily life.", overview: "From textiles to buildings, human cultures have always made beautiful, useful things. Looking around reveals art everywhere.", minutes: 13, topics: [
      { id: "ar4-craft", title: "Craft traditions", summary: "Skills passed down through time.", keyPoints: ["Craft blends use and beauty", "Traditions carry culture", "Hands learn by doing"], kind: "story" },
      { id: "ar4-design", title: "Design", summary: "Making things work and delight.", keyPoints: ["Design solves problems", "Form follows function", "Good design is thoughtful"], kind: "concept" },
      { id: "ar4-culture", title: "Art and culture", summary: "Art expresses who we are.", keyPoints: ["Cultures have distinct styles", "Art records values", "Exchange enriches art"], kind: "story" },
    ] },
    { number: 5, title: "Working together", bigIdea: "Making is better shared.", overview: "Collaboration, feedback and performance connect making to others, turning private effort into shared experience.", minutes: 12, topics: [
      { id: "ar5-collab", title: "Creating together", summary: "Many hands, new ideas.", keyPoints: ["Collaboration sparks ideas", "Roles can be shared", "The result exceeds parts"], kind: "practice" },
      { id: "ar5-feedback", title: "Giving feedback", summary: "Kind, useful response helps.", keyPoints: ["Describe before judging", "Be specific and kind", "Feedback improves work"], kind: "skill" },
      { id: "ar5-share", title: "Sharing your work", summary: "Showing takes courage.", keyPoints: ["Sharing invites response", "Every work has value", "Pride is earned by making"], kind: "story" },
    ] },
    { number: 6, title: "Becoming a maker", bigIdea: "Creativity is a habit anyone can build.", overview: "Regular making, reflection and curiosity grow creative confidence — a skill useful far beyond the art room.", minutes: 12, topics: [
      { id: "ar6-habit", title: "A making habit", summary: "Make often, make freely.", keyPoints: ["Regular practice grows skill", "Quantity leads to quality", "Play fuels learning"], kind: "practice" },
      { id: "ar6-reflect", title: "Reflecting", summary: "Learning from your own work.", keyPoints: ["Ask what worked", "Keep what you learn", "Growth is visible over time"], kind: "concept" },
      { id: "ar6-everywhere", title: "Creativity everywhere", summary: "Making minds solve problems.", keyPoints: ["Creativity crosses subjects", "Curiosity drives it", "Everyone can create"], kind: "story" },
    ] },
  ],
};

export const humanitiesSubjects: Record<string, SubjectContent> = {
  social,
  history,
  geography,
  civics,
  economics,
  accountancy,
  business,
  language,
  art,
};
