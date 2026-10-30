// Official GATE Papers, Subjects, and Topic Syllabi
export const GATE_PAPERS = [
  {
    id: 'CS',
    code: 'CS',
    name: 'Computer Science & Information Technology',
    shortName: 'GATE CS/IT',
    badge: 'Popular',
    color: 'from-blue-600 to-indigo-700',
    subjects: [
      {
        id: 'algo_ds',
        name: 'Algorithms & Data Structures',
        subtopics: ['Asymptotic Analysis', 'Divide and Conquer', 'Greedy & Dynamic Programming', 'Graph Algorithms (BFS/DFS, MST, Shortest Paths)', 'Trees, Heaps & Hashing', 'Searching & Sorting'],
        weightage: '12-15 Marks'
      },
      {
        id: 'toc',
        name: 'Theory of Computation',
        subtopics: ['Regular Expressions & Finite Automata (DFA/NFA)', 'Pumping Lemma & Regular Languages', 'Context-Free Grammars & Pushdown Automata', 'Turing Machines & Decidability', 'Chomsky Hierarchy'],
        weightage: '7-9 Marks'
      },
      {
        id: 'os',
        name: 'Operating Systems',
        subtopics: ['CPU Scheduling Algorithms', 'Process Synchronization & Semaphores', 'Deadlocks & Banker\'s Algorithm', 'Virtual Memory & Paging (Page Faults, Inverted Page Tables)', 'File Systems & Disk Scheduling'],
        weightage: '8-10 Marks'
      },
      {
        id: 'dbms',
        name: 'Database Management Systems',
        subtopics: ['Relational Algebra & Tuple Calculus', 'SQL Queries (Aggregations, Correlated Subqueries)', 'Functional Dependencies & Normalization (1NF to BCNF)', 'Transactions & Concurrency Control (2PL, Serializability)', 'B/B+ Trees Indexing'],
        weightage: '7-9 Marks'
      },
      {
        id: 'cn',
        name: 'Computer Networks',
        subtopics: ['OSI & TCP/IP Layering', 'Flow & Error Control (Stop-and-Wait, Go-Back-N, SR)', 'IP Addressing & Subnetting (CIDR)', 'Routing Algorithms (Distance Vector, Link State)', 'TCP Congestion Control & Sockets', 'Application Protocols (DNS, HTTP, SMTP)'],
        weightage: '8-10 Marks'
      },
      {
        id: 'coa',
        name: 'Computer Organization & Architecture',
        subtopics: ['Instruction Pipelining & Hazards', 'Cache Memory Mapping & Misses', 'Virtual Memory & TLB (Effective Access Time)', 'Machine Instructions & Addressing Modes', 'ALU, Data Path & Control Unit'],
        weightage: '8-10 Marks'
      },
      {
        id: 'compiler',
        name: 'Compiler Design',
        subtopics: ['Lexical Analysis & Tokens', 'LL(1), LR(0), SLR(1), LALR(1), CLR(1) Parsing', 'Syntax Directed Translation (SDT)', 'Intermediate Code Generation & 3-Address Code', 'Control Flow Graphs & Basic Blocks'],
        weightage: '4-6 Marks'
      },
      {
        id: 'discrete_math',
        name: 'Discrete Mathematics & Graph Theory',
        subtopics: ['Propositional & First-Order Logic', 'Sets, Relations, Equivalence & POSETs', 'Combinatorics, Permutations & Generating Functions', 'Graph Theory (Coloring, Planarity, Hamiltonian, Eulerian)', 'Group Theory & Algebraic Structures'],
        weightage: '8-10 Marks'
      },
      {
        id: 'engg_math',
        name: 'Engineering Mathematics',
        subtopics: ['Linear Algebra (Eigenvalues, Determinants, Rank, System of Equations)', 'Calculus (Limits, Maxima-Minima, Taylor Series)', 'Probability & Statistics (Bayes Rule, Distributions, Expectation)'],
        weightage: '13-15 Marks'
      },
      {
        id: 'aptitude',
        name: 'General Aptitude',
        subtopics: ['Quantitative Aptitude', 'Analytical Reasoning', 'Verbal Ability', 'Spatial Reasoning'],
        weightage: '15 Marks (Fixed)'
      }
    ]
  },
  {
    id: 'DA',
    code: 'DA',
    name: 'Data Science & Artificial Intelligence',
    shortName: 'GATE DA',
    badge: 'Trending',
    color: 'from-emerald-600 to-teal-700',
    subjects: [
      {
        id: 'prob_stat',
        name: 'Probability & Statistics',
        subtopics: ['Random Variables & Expectation', 'Probability Distributions (Normal, Binomial, Poisson)', 'Hypothesis Testing & Confidence Intervals', 'Covariance, Correlation & Regression'],
        weightage: '14-18 Marks'
      },
      {
        id: 'linear_algebra',
        name: 'Linear Algebra & Calculus',
        subtopics: ['Matrices, Rank & Determinants', 'Eigenvalues & Eigenvectors (PCA, SVD)', 'Vector Spaces & Projections', 'Gradient, Hessian & Optimization'],
        weightage: '12-14 Marks'
      },
      {
        id: 'ml',
        name: 'Machine Learning',
        subtopics: ['Supervised Learning (Regression, Logistic Regression, SVM)', 'Decision Trees, Random Forest & Boosting', 'Neural Networks & Backpropagation', 'Unsupervised Learning (K-Means, Hierarchical, PCA)', 'Cross-Validation & Regularization (L1, L2)'],
        weightage: '16-20 Marks'
      },
      {
        id: 'ai',
        name: 'Artificial Intelligence',
        subtopics: ['Informed & Uninformed Search (BFS, DFS, A*, IDA*)', 'Adversarial Search (Minimax, Alpha-Beta Pruning)', 'Propositional & Predicate Logic', 'Reasoning under Uncertainty'],
        weightage: '10-12 Marks'
      },
      {
        id: 'db_warehousing',
        name: 'DBMS & Data Warehousing',
        subtopics: ['Relational Model & SQL', 'Data Warehousing & OLAP Cubes', 'Normalization & ER Models', 'NoSQL & MapReduce Fundamentals'],
        weightage: '10-12 Marks'
      },
      {
        id: 'prog_ds',
        name: 'Programming & Data Structures',
        subtopics: ['Python Data Structures (Lists, Dictionaries, Sets)', 'Time & Space Complexity', 'Stacks, Queues, Linked Lists', 'Search & Sort Algorithms'],
        weightage: '10-12 Marks'
      },
      {
        id: 'aptitude',
        name: 'General Aptitude',
        subtopics: ['Quantitative Aptitude', 'Analytical Reasoning', 'Verbal Ability', 'Spatial Reasoning'],
        weightage: '15 Marks (Fixed)'
      }
    ]
  },
  {
    id: 'EC',
    code: 'EC',
    name: 'Electronics & Communication Engineering',
    shortName: 'GATE EC',
    badge: 'Core',
    color: 'from-amber-600 to-orange-700',
    subjects: [
      {
        id: 'signals',
        name: 'Signals & Systems',
        subtopics: ['LTI Systems & Convolution', 'Fourier Series & Fourier Transform', 'Laplace & Z-Transform', 'Sampling Theorem & Nyquist Rate'],
        weightage: '8-10 Marks'
      },
      {
        id: 'electronic_devices',
        name: 'Electronic Devices (EDC)',
        subtopics: ['Carrier Transport in Semiconductors', 'PN Junction Diode & Zener', 'BJT, MOSFET & FinFET Characteristics'],
        weightage: '9-11 Marks'
      },
      {
        id: 'analog_circuits',
        name: 'Analog Circuits',
        subtopics: ['Op-Amp Applications (Inverting, Non-inverting, Filters)', 'BJT & MOSFET Small Signal Amplifiers', 'Feedback Amplifiers & Oscillators'],
        weightage: '9-11 Marks'
      },
      {
        id: 'digital_circuits',
        name: 'Digital Circuits',
        subtopics: ['Boolean Algebra & Karnaugh Maps', 'Combinational Circuits (Multiplexers, Decoders)', 'Sequential Circuits (Flip-Flops, Counters, FSMs)', 'ADC and DAC'],
        weightage: '8-10 Marks'
      },
      {
        id: 'control_systems',
        name: 'Control Systems',
        subtopics: ['Transfer Functions & Block Diagrams', 'Routh-Hurwitz & Root Locus', 'Bode Plot & Nyquist Stability Criterion', 'State Space Analysis'],
        weightage: '8-10 Marks'
      },
      {
        id: 'communications',
        name: 'Communications',
        subtopics: ['Analog Modulation (AM, FM, PM)', 'Digital Modulation (ASK, FSK, PSK, QAM)', 'Information Theory & Channel Capacity', 'Noise in Communication Systems'],
        weightage: '10-12 Marks'
      },
      {
        id: 'electromagnetics',
        name: 'Electromagnetics',
        subtopics: ['Maxwell\'s Equations & Uniform Plane Waves', 'Transmission Lines & Smith Chart', 'Waveguides & Antennas'],
        weightage: '8-10 Marks'
      },
      {
        id: 'engg_math',
        name: 'Engineering Mathematics',
        subtopics: ['Linear Algebra', 'Calculus', 'Differential Equations', 'Complex Analysis', 'Probability & Statistics'],
        weightage: '13-15 Marks'
      },
      {
        id: 'aptitude',
        name: 'General Aptitude',
        subtopics: ['Quantitative Aptitude', 'Analytical Reasoning', 'Verbal Ability'],
        weightage: '15 Marks (Fixed)'
      }
    ]
  },
  {
    id: 'EE',
    code: 'EE',
    name: 'Electrical Engineering',
    shortName: 'GATE EE',
    badge: 'Core',
    color: 'from-purple-600 to-indigo-800',
    subjects: [
      {
        id: 'electric_circuits',
        name: 'Electric Circuits (Network Analysis)',
        subtopics: ['Network Theorems (Thevenin, Norton, Superposition)', 'Transient & Steady State Response (RLC)', 'AC Circuit Analysis & Resonance', 'Two-Port Networks'],
        weightage: '9-11 Marks'
      },
      {
        id: 'electrical_machines',
        name: 'Electrical Machines',
        subtopics: ['Transformers (Equivalent Circuit, Efficiency, Regulation)', 'DC Machines & Speed Control', '3-Phase Induction Motors', 'Synchronous Machines'],
        weightage: '10-12 Marks'
      },
      {
        id: 'power_systems',
        name: 'Power Systems',
        subtopics: ['Transmission Line Models & Surge Impedance', 'Load Flow Studies (Gauss-Seidel, Newton-Raphson)', 'Fault Analysis (Symmetrical & Unsymmetrical)', 'Power System Stability & Protection'],
        weightage: '10-12 Marks'
      },
      {
        id: 'power_electronics',
        name: 'Power Electronics',
        subtopics: ['Thyristors, MOSFETs, IGBTs', 'Phase Controlled Rectifiers', 'DC-DC Converters (Buck, Boost, Buck-Boost)', 'Inverters (VSI, CSI, PWM)'],
        weightage: '9-11 Marks'
      },
      {
        id: 'control_systems_ee',
        name: 'Control Systems',
        subtopics: ['Time Domain Analysis', 'Root Locus', 'Frequency Domain Analysis (Bode, Nyquist)', 'State Variable Model'],
        weightage: '8-10 Marks'
      },
      {
        id: 'engg_math',
        name: 'Engineering Mathematics',
        subtopics: ['Linear Algebra', 'Calculus', 'Differential Equations', 'Complex Variables', 'Probability'],
        weightage: '13-15 Marks'
      },
      {
        id: 'aptitude',
        name: 'General Aptitude',
        subtopics: ['Quantitative Aptitude', 'Analytical Reasoning', 'Verbal Ability'],
        weightage: '15 Marks (Fixed)'
      }
    ]
  },
  {
    id: 'ME',
    code: 'ME',
    name: 'Mechanical Engineering',
    shortName: 'GATE ME',
    badge: 'Core',
    color: 'from-red-600 to-rose-700',
    subjects: [
      {
        id: 'thermo',
        name: 'Thermodynamics & Heat Transfer',
        subtopics: ['Laws of Thermodynamics & Entropy', 'Power & Refrigeration Cycles (Rankine, Otto, Diesel, Brayton)', 'Conduction, Convection & Radiation Heat Transfer'],
        weightage: '10-12 Marks'
      },
      {
        id: 'fluid_mech',
        name: 'Fluid Mechanics & Turbomachinery',
        subtopics: ['Fluid Statics & Buoyancy', 'Bernoulli\'s Equation & Conservation Laws', 'Flow through Pipes & Boundary Layer', 'Hydraulic Turbines & Pumps'],
        weightage: '8-10 Marks'
      },
      {
        id: 'som',
        name: 'Strength of Materials & Mechanics',
        subtopics: ['Stress, Strain & Mohr\'s Circle', 'Bending & Shear Stress in Beams', 'Torsion of Circular Shafts', 'Deflection of Beams & Columns'],
        weightage: '8-10 Marks'
      },
      {
        id: 'tom',
        name: 'Theory of Machines & Vibrations',
        subtopics: ['Mechanisms, Degrees of Freedom & Inversions', 'Gears & Gear Trains', 'Governors, Flywheels & Balancing', 'Mechanical Vibrations (1-DOF Free & Forced)'],
        weightage: '8-10 Marks'
      },
      {
        id: 'manufacturing',
        name: 'Manufacturing & Industrial Engineering',
        subtopics: ['Metal Casting, Forming & Joining (Welding)', 'Machining & Machine Tool Operations (Merchant Circle)', 'Inventory Control (EOQ), CPM/PERT & Forecasting', 'Linear Programming (Simplex)'],
        weightage: '14-16 Marks'
      },
      {
        id: 'engg_math',
        name: 'Engineering Mathematics',
        subtopics: ['Linear Algebra', 'Calculus', 'Differential Equations', 'Numerical Methods', 'Probability'],
        weightage: '13-15 Marks'
      },
      {
        id: 'aptitude',
        name: 'General Aptitude',
        subtopics: ['Quantitative Aptitude', 'Analytical Reasoning', 'Verbal Ability'],
        weightage: '15 Marks (Fixed)'
      }
    ]
  },
  {
    id: 'CE',
    code: 'CE',
    name: 'Civil Engineering',
    shortName: 'GATE CE',
    badge: 'Core',
    color: 'from-amber-700 to-stone-800',
    subjects: [
      {
        id: 'structural',
        name: 'Structural Engineering & Mechanics',
        subtopics: ['Bending Moment & Shear Force Diagrams', 'Trusses & Arches', 'RCC Design (LSM & WSM)', 'Steel Structures Design (Connections, Beams, Columns)'],
        weightage: '14-16 Marks'
      },
      {
        id: 'geotech',
        name: 'Geotechnical Engineering (Soil Mechanics)',
        subtopics: ['Phase Relations & Index Properties', 'Permeability & Seepage (Flow Nets)', 'Consolidation & Compaction', 'Shear Strength & Earth Pressure', 'Shallow & Deep Foundations'],
        weightage: '13-15 Marks'
      },
      {
        id: 'water_resources',
        name: 'Fluid Mechanics & Water Resources',
        subtopics: ['Hydrostatics & Pipe Flow', 'Open Channel Flow (Specific Energy, Hydraulic Jump)', 'Hydrology (Hydrographs, Infiltration)', 'Irrigation Engineering'],
        weightage: '9-11 Marks'
      },
      {
        id: 'environmental',
        name: 'Environmental Engineering',
        subtopics: ['Water Quality Parameters & Treatment', 'Wastewater Treatment (BOD, COD, Activated Sludge)', 'Air & Noise Pollution'],
        weightage: '9-11 Marks'
      },
      {
        id: 'engg_math',
        name: 'Engineering Mathematics',
        subtopics: ['Linear Algebra', 'Calculus', 'Differential Equations', 'Numerical Methods', 'Probability'],
        weightage: '13-15 Marks'
      },
      {
        id: 'aptitude',
        name: 'General Aptitude',
        subtopics: ['Quantitative Aptitude', 'Analytical Reasoning', 'Verbal Ability'],
        weightage: '15 Marks (Fixed)'
      }
    ]
  }
];
