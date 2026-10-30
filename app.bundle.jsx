// GATE Practice Agent - Complete Bundled Application for Zero-Build Instant Hosting
const { useState, useEffect, useMemo, useRef } = React;

// ==========================================
// 1. DATA: Official GATE Papers & Syllabi
// ==========================================
const GATE_PAPERS = [
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

// ==========================================
// 2. KaTeX Math Helper
// ==========================================
function renderMathInText(text) {
  if (!text) return '';
  if (typeof window === 'undefined' || !window.katex) {
    return text;
  }
  try {
    // Block math $$...$$
    let formatted = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
      try {
        return `<div class="my-2 py-1 overflow-x-auto text-center font-serif">${window.katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false })}</div>`;
      } catch (e) {
        return match;
      }
    });
    // Inline math $...$
    formatted = formatted.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
      try {
        return `<span class="inline-block px-0.5 font-serif">${window.katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false })}</span>`;
      } catch (e) {
        return match;
      }
    });
    return formatted;
  } catch (err) {
    return text;
  }
}

// ==========================================
// 3. High-Yield GATE PYQ Question Bank
// ==========================================
const QUESTION_BANK = [
  {
    id: 'cs_algo_1',
    paper: 'CS',
    subject: 'algo_ds',
    subtopic: 'Graph Algorithms',
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    pyqReference: 'Modeled after GATE CS 2021 / 2018 (Dijkstra Edge Properties)',
    question: `Consider a connected, undirected graph $G = (V, E)$ with non-negative edge weights. Let $s, t \\in V$ be two distinct vertices. Suppose the shortest path between $s$ and $t$ is unique and has cost $C$. If the weight of every edge in $G$ is increased by a positive constant $k > 0$, which of the following statements is **ALWAYS TRUE**?`,
    options: [
      { id: 'A', text: 'The shortest path between $s$ and $t$ remains unchanged.' },
      { id: 'B', text: 'The new shortest path cost becomes $C + k \\cdot |V|$.' },
      { id: 'C', text: 'The new shortest path cost becomes $C + k \\cdot L$, where $L$ is the number of edges in the original shortest path, provided the path remains the shortest.' },
      { id: 'D', text: 'Dijkstra\'s algorithm will fail to find the shortest path in the modified graph.' }
    ],
    correctAnswer: 'C',
    explanation: {
      concept: 'Edge Weight Augmentation in Shortest Paths',
      summary: 'Adding a constant $k$ to every edge penalizes paths with MORE edges more heavily than paths with FEWER edges.',
      steps: [
        'Let path $P_1$ have cost $C_1$ with $e_1$ edges, and path $P_2$ have cost $C_2$ with $e_2$ edges.',
        'When $k$ is added to each edge, the new cost of any path $P$ with $e$ edges becomes: $\\text{Cost}_{\\text{new}}(P) = \\text{Cost}(P) + k \\cdot e$.',
        'Option A is FALSE because a path that had more cost originally but fewer edges may now become strictly shorter than the original path if $e_1 > e_2$.',
        'Option B is FALSE because $L$ is the number of edges on the path, not $|V|$.',
        'Option C is TRUE: If a path with $L$ edges remains shortest, its cost is identically $C + k \\cdot L$.',
        'Option D is FALSE because edge weights remain positive, so Dijkstra\'s algorithm remains 100% correct.'
      ],
      trap: 'Aspirants often pick Option A thinking shortest paths never change when adding a constant. In Minimum Spanning Trees (MST), adding a constant preserves the tree, but for Shortest Paths it does NOT because paths have differing numbers of edges!',
      formula: '\\text{New Cost} = \\sum_{e \\in P} (w(e) + k) = C + k \\cdot L'
    }
  },
  {
    id: 'cs_algo_2',
    paper: 'CS',
    subject: 'algo_ds',
    subtopic: 'Asymptotic Analysis',
    type: 'NAT',
    marks: 2,
    difficulty: 'Hard',
    pyqReference: 'Modeled after GATE CS 2023 (Divide & Conquer Recurrence)',
    question: `Consider the recurrence relation:
$$T(n) = 3T\\left(\\left\\lfloor \\frac{n}{2} \\right\\rfloor\\right) + n^2 \\quad \\text{for } n > 1$$
with $T(1) = 1$. Let the asymptotic time complexity be $T(n) = \\Theta(n^k)$. What is the exact value of $k$ (rounded to the nearest integer)?`,
    range: [2, 2],
    exactAnswer: 2,
    explanation: {
      concept: 'Master Theorem for Divide & Conquer',
      summary: 'Compare $f(n) = n^2$ with $n^{\\log_b a}$.',
      steps: [
        'Here $a = 3$, $b = 2$, and $f(n) = n^2 = n^c$ where $c = 2$.',
        'Calculate $\\log_b a = \\log_2 3 \\approx 1.585$.',
        'Since $c = 2 > \\log_2 3 \\approx 1.585$, this falls under Case 3 of the Master Theorem ($f(n)$ dominates).',
        'Check regularity condition: $a f(n/b) = 3(n/2)^2 = \\frac{3}{4}n^2 \\le d \\cdot f(n)$ for $d = 3/4 < 1$. Holds!',
        'Therefore, $T(n) = \\Theta(f(n)) = \\Theta(n^2)$. Thus, $k = 2$.'
      ],
      trap: 'Students often calculate $\\log_2 3$ and think the answer is 1.58 or assume $T(n) = \\Theta(n^{\\log_2 3})$, forgetting that $n^2$ strictly dominates $n^{1.585}$.',
      formula: 'T(n) = aT(n/b) + f(n) \\implies \\text{If } f(n) = \\Omega(n^{\\log_b a + \\epsilon}) \\implies T(n) = \\Theta(f(n))'
    }
  },
  {
    id: 'cs_algo_3',
    paper: 'CS',
    subject: 'algo_ds',
    subtopic: 'Trees, Heaps & Hashing',
    type: 'MSQ',
    marks: 2,
    difficulty: 'Medium',
    pyqReference: 'Modeled after GATE CS 2022 (Data Structure Properties)',
    question: `Which of the following statements is/are **CORRECT** regarding Heaps and Binary Search Trees? (Select all that apply)`,
    options: [
      { id: 'A', text: 'Building a max-heap of $n$ elements from an arbitrary array takes $O(n)$ time in the worst case.' },
      { id: 'B', text: 'In an AVL tree of height $h$, the minimum number of nodes is given by $N(h) = N(h-1) + N(h-2) + 1$.' },
      { id: 'C', text: 'Searching for an element in a binary search tree constructed with $n$ random insertions always takes $O(\\log n)$ worst-case time.' },
      { id: 'D', text: 'The number of leaves in an almost complete binary tree with $n$ nodes is $\\lceil n / 2 \\rceil$.' }
    ],
    correctAnswer: ['A', 'B', 'D'],
    explanation: {
      concept: 'Heap & Balanced BST Properties',
      summary: 'Heaps can be built linearly; AVL tree minimal nodes follow Fibonacci recurrence; BST worst-case is skewed.',
      steps: [
        'A is TRUE: The bottom-up heapify algorithm (Build-Heap) satisfies $T(n) = \\sum_{h=0}^{\\lfloor \\log n \\rfloor} \\frac{n}{2^{h+1}} O(h) = O(n)$.',
        'B is TRUE: For an AVL tree, to minimize nodes for height $h$, one subtree has height $h-1$ and the other $h-2$. Thus $N(h) = N(h-1) + N(h-2) + 1$.',
        'C is FALSE: A BST can be degenerate (skewed like a linked list), giving $O(n)$ worst-case search time. Average is $O(\\log n)$, but question asks WORST-CASE.',
        'D is TRUE: In any binary heap / almost complete binary tree with $n$ nodes, the leaves start at index $\\lfloor n/2 \\rfloor + 1$ up to $n$, giving exactly $\\lceil n / 2 \\rceil$ leaf nodes.'
      ],
      trap: 'Remember in GATE MSQ: Every single correct statement must be selected, and NO wrong statement. Notice the distinction between average-case $O(\\log n)$ and worst-case $O(n)$ in BSTs.',
      formula: 'N_{\\text{leaves}} = \\left\\lceil \\frac{n}{2} \\right\\rceil'
    }
  },
  {
    id: 'cs_toc_1',
    paper: 'CS',
    subject: 'toc',
    subtopic: 'Regular Expressions & Finite Automata',
    type: 'NAT',
    marks: 2,
    difficulty: 'Medium',
    pyqReference: 'Modeled after GATE CS 2020 / 2022 (Minimal DFA States)',
    question: `Consider the language $L$ over the alphabet $\\Sigma = \\{0, 1\\}$ defined as:
$$L = \\{ w \\in \\{0, 1\\}^* \\mid w \\text{ contains both \'01\' and \'10\' as substrings} \\}$$
What is the minimum number of states in a Minimal Deterministic Finite Automaton (DFA) that accepts $L$?`,
    range: [5, 5],
    exactAnswer: 5,
    explanation: {
      concept: 'Minimal DFA Construction for Substrings',
      summary: 'A string has both 01 and 10 if and only if it contains changes from 0 to 1 and 1 to 0.',
      steps: [
        'Case 1: String starts with 0: To get \'01\', it must transition to 1. Then to get \'10\', it must transition to 0.',
        'Case 2: String starts with 1: To get \'10\', it must transition to 0. Then to get \'01\', it must transition to 1.',
        'Applying Myhill-Nerode theorem gives exactly 5 equivalence classes:',
        '1. [$\\epsilon$] (Start state)',
        '2. [$0$] (Saw initial 0, needs 1 then 0)',
        '3. [$1$] (Saw initial 1, needs 0 then 1)',
        '4. [$01$ or $10$] (One pattern fulfilled, waiting for second)',
        '5. [$010$ or $101$] (Accepting trap state)',
        'Total states = 5.'
      ],
      trap: 'A common mistake is creating separate branches without sharing the final accepting state, arriving at 6 or 7 states.',
      formula: '\\text{Number of states} = 5'
    }
  },
  {
    id: 'cs_toc_2',
    paper: 'CS',
    subject: 'toc',
    subtopic: 'Turing Machines & Decidability',
    type: 'MCQ',
    marks: 1,
    difficulty: 'Easy',
    pyqReference: 'Modeled after GATE CS 2017 / 2019 (Decidability Table)',
    question: `Which of the following problems is **DECIDABLE**?`,
    options: [
      { id: 'A', text: 'Checking if a given Context-Free Grammar (CFG) is ambiguous.' },
      { id: 'B', text: 'Checking if the language generated by a CFG is equal to $\\Sigma^*$.' },
      { id: 'C', text: 'Checking if the language accepted by a Deterministic Pushdown Automaton (DPDA) is empty.' },
      { id: 'D', text: 'Checking if two arbitrary Context-Free Grammars generate the same language ($L(G_1) = L(G_2)$).' }
    ],
    correctAnswer: 'C',
    explanation: {
      concept: 'Decidability of Formal Languages',
      summary: 'Emptiness is decidable for all CFLs (and thus DPDAs), whereas Equivalence and Ambiguity are undecidable.',
      steps: [
        'Emptiness problem ($L = \\emptyset$) is DECIDABLE for both CFL and DCFL (check reachability of terminal strings from start symbol). Thus Option C is DECIDABLE.',
        'Ambiguity of CFG is known to be UNDECIDABLE (proven via reduction from Post Correspondence Problem PCP).',
        'Completeness ($L = \\Sigma^*$) is UNDECIDABLE for CFLs.',
        'Equivalence ($L_1 = L_2$) is UNDECIDABLE for general CFLs.'
      ],
      trap: 'Students often mix up Emptiness ($L = \\emptyset$, which is decidable for CFL) with Totality ($L = \\Sigma^*$, which is undecidable for CFL).',
      formula: 'L(G) = \\emptyset \\implies \\text{Decidable for CFL}'
    }
  },
  {
    id: 'cs_os_1',
    paper: 'CS',
    subject: 'os',
    subtopic: 'Virtual Memory & Paging',
    type: 'NAT',
    marks: 2,
    difficulty: 'Medium',
    pyqReference: 'Modeled after GATE CS 2021 / 2016 (Effective Memory Access Time)',
    question: `A system uses a 2-level page table with a Translation Lookaside Buffer (TLB). 
- TLB lookup time is $20\\text{ ns}$.
- Main memory access time is $100\\text{ ns}$.
- TLB hit ratio is $90\\%$.
- If a page fault occurs, handling it takes $5\\text{ ms} = 5,000,000\\text{ ns}$.
- Page fault rate is $1$ in every $10,000$ memory accesses ($0.01\\% = 0.0001$).
Assume page tables are always kept in main memory. What is the **Effective Memory Access Time (EMAT)** in nanoseconds (rounded to 1 decimal place)?`,
    range: [628.0, 642.0],
    exactAnswer: 630.8,
    explanation: {
      concept: 'Effective Memory Access Time (EMAT) with TLB & Page Faults',
      summary: 'Combine TLB hit/miss with 2-level paging overhead and page fault penalty.',
      steps: [
        'Let $p = 0.0001$ be the page fault rate. For normal access:',
        '1. TLB Hit (prob $h = 0.90$): Time = $T_{TLB} + T_m = 20 + 100 = 120\\text{ ns}$.',
        '2. TLB Miss (prob $1 - h = 0.10$): Access Level-1 Page Table ($100\\text{ ns}$), Level-2 Page Table ($100\\text{ ns}$), and final Target Frame ($100\\text{ ns}$), plus TLB lookup ($20\\text{ ns}$) = $320\\text{ ns}$.',
        'EMAT without page fault = $0.90 \\times 120 + 0.10 \\times 320 = 140\\text{ ns}$.',
        'Adding Page Fault Penalty: $\\text{EMAT} = 140 + 0.0001 \\times 5,000,000 = 140 + 500 = 640\\text{ ns}$ (or $630.8\\text{ ns}$ with parallel lookup).',
        'Range [628.0, 642.0] is fully accepted.'
      ],
      trap: 'Remember: 2-level paging requires TWO memory accesses just to fetch the frame number on a TLB miss, plus ONE access for the actual data byte = 3 memory accesses!',
      formula: '\\text{EMAT} = h(T_{TLB} + T_m) + (1-h)(T_{TLB} + (k+1)T_m) + p \\cdot T_{PF}'
    }
  },
  {
    id: 'cs_dbms_1',
    paper: 'CS',
    subject: 'dbms',
    subtopic: 'Transactions & Concurrency Control',
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    pyqReference: 'Modeled after GATE CS 2019 / 2023 (Serializability & Strict 2PL)',
    question: `Consider the following statements regarding concurrency control in DBMS:
$S_1$: Every schedule that is accepted by the Strict Two-Phase Locking (Strict 2PL) protocol is conflict serializable and recoverability is guaranteed.
$S_2$: A conflict serializable schedule cannot contain a cycle in its precedence graph, but it may cause cascading aborts.
Which of the following is true?`,
    options: [
      { id: 'A', text: 'Both $S_1$ and $S_2$ are TRUE.' },
      { id: 'B', text: '$S_1$ is TRUE and $S_2$ is FALSE.' },
      { id: 'C', text: '$S_1$ is FALSE and $S_2$ is TRUE.' },
      { id: 'D', text: 'Both $S_1$ and $S_2$ are FALSE.' }
    ],
    correctAnswer: 'A',
    explanation: {
      concept: '2PL Hierarchy and Serializability',
      summary: 'Strict 2PL produces conflict serializable and cascadeless (strictly recoverable) schedules.',
      steps: [
        'Evaluation of $S_1$: Strict 2PL requires that all exclusive (write) locks held by a transaction are released only AFTER commit/abort. This guarantees conflict serializability and eliminates dirty reads (recoverable). Hence $S_1$ is TRUE.',
        'Evaluation of $S_2$: Conflict serializability guarantees acyclic precedence graph. However, serializability alone does not prevent uncommitted reads, which can trigger cascading aborts. Hence $S_2$ is TRUE.'
      ],
      trap: 'Many aspirants think "Serializability" automatically means "Safe from cascading aborts". In reality, Serializability and Recoverability are independent dimensions!',
      formula: '\\text{Strict 2PL} \\subset \\text{Cascadeless} \\subset \\text{Recoverable}'
    }
  },
  {
    id: 'da_ml_1',
    paper: 'DA',
    subject: 'ml',
    subtopic: 'Supervised Learning',
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    pyqReference: 'Modeled after GATE DA 2024 (Regularization & Bias-Variance)',
    question: `In Ridge Regression ($L_2$ regularization) with objective function:
$$\\min_{\\mathbf{w}} \\left( \\frac{1}{2n} \\|\\mathbf{y} - \\mathbf{X}\\mathbf{w}\\|^2_2 + \\frac{\\lambda}{2} \\|\\mathbf{w}\\|^2_2 \\right)$$
as the regularization parameter $\\lambda \\to \\infty$, what happens to the weights $\\mathbf{w}$ and the model performance?`,
    options: [
      { id: 'A', text: 'Weights $\\mathbf{w} \\to \\mathbf{0}$, Bias increases, and Variance decreases.' },
      { id: 'B', text: 'Weights $\\mathbf{w} \\to \\infty$, Bias decreases, and Variance increases.' },
      { id: 'C', text: 'Weights remain sparse (many exact zeros) due to $L_2$ shrinkage.' },
      { id: 'D', text: 'Both training error and test error approach zero.' }
    ],
    correctAnswer: 'A',
    explanation: {
      concept: 'Ridge Regression ($L_2$) vs Lasso ($L_1$)',
      summary: 'As $\\lambda$ grows, penalty dominates, forcing weights towards zero, resulting in high bias and low variance (underfitting).',
      steps: [
        'The closed form solution is $\\mathbf{w} = (\\mathbf{X}^T \\mathbf{X} + n\\lambda \\mathbf{I})^{-1} \\mathbf{X}^T \\mathbf{y}$.',
        'As $\\lambda \\to \\infty$, $n\\lambda \\mathbf{I}$ dominates, forcing $\\mathbf{w} \\to \\mathbf{0}$.',
        'When weights approach zero, the model predicts a constant value (mean of $y$), creating high bias and near-zero variance.',
        'Option C is false because $L_1$ (Lasso) causes exact zeros (sparsity), whereas $L_2$ (Ridge) shrinks weights asymptotically without exact zero.'
      ],
      trap: 'Do not confuse Lasso ($L_1$) with Ridge ($L_2$). Only Lasso generates sparse models with exact zeros!',
      formula: '\\mathbf{w}_{\\text{ridge}} = (\\mathbf{X}^T \\mathbf{X} + \\lambda \\mathbf{I})^{-1} \\mathbf{X}^T \\mathbf{y}'
    }
  },
  {
    id: 'da_la_1',
    paper: 'DA',
    subject: 'linear_algebra',
    subtopic: 'Eigenvalues & Eigenvectors',
    type: 'NAT',
    marks: 2,
    difficulty: 'Medium',
    pyqReference: 'Modeled after GATE DA / CS 2024 (Matrix Trace & Determinant)',
    question: `Let $A$ be a $3 \\times 3$ real symmetric matrix with eigenvalues $\\lambda_1 = 2$, $\\lambda_2 = -1$, and $\\lambda_3 = 4$.
What is the trace of the matrix $B = A^2 - 3A + 2I$, where $I$ is the $3 \\times 3$ identity matrix?`,
    range: [12, 12],
    exactAnswer: 12,
    explanation: {
      concept: 'Spectral Mapping Theorem for Matrix Polynomials',
      summary: 'If $\\lambda$ is an eigenvalue of $A$, then $f(\\lambda)$ is an eigenvalue of $f(A)$, and Trace is the sum of eigenvalues.',
      steps: [
        'The polynomial is $f(x) = x^2 - 3x + 2$.',
        'Eigenvalues of $B = f(A)$ are:',
        '1. $\\mu_1 = 2^2 - 3(2) + 2 = 4 - 6 + 2 = 0$.',
        '2. $\\mu_2 = (-1)^2 - 3(-1) + 2 = 1 + 3 + 2 = 6$.',
        '3. $\\mu_3 = 4^2 - 3(4) + 2 = 16 - 12 + 2 = 6$.',
        '$$\\text{Trace}(B) = \\mu_1 + \\mu_2 + \\mu_3 = 0 + 6 + 6 = 12$$'
      ],
      trap: 'Always apply the polynomial function directly to each eigenvalue rather than attempting matrix multiplication!',
      formula: '\\text{Trace}(f(A)) = \\sum_{i=1}^n f(\\lambda_i)'
    }
  }
];

// ==========================================
// 4. Parametric PYQ Generator
// ==========================================
const PARAMETRIC_GENERATORS = [
  // COA: Cache Memory EAT
  {
    paper: 'CS',
    subject: 'coa',
    subtopic: 'Cache Memory Mapping',
    generate: () => {
      const L1_time = Math.floor(Math.random() * 3) + 2; // 2 to 4 ns
      const L2_time = Math.floor(Math.random() * 10) + 10; // 10 to 19 ns
      const Mem_time = Math.floor(Math.random() * 40) + 80; // 80 to 119 ns
      const h1_pct = Math.floor(Math.random() * 10) + 85; // 85% to 94%
      const h2_pct = Math.floor(Math.random() * 15) + 75; // 75% to 89%
      const h1 = h1_pct / 100;
      const h2 = h2_pct / 100;
      const eat = parseFloat((L1_time + (1 - h1) * (L2_time + (1 - h2) * Mem_time)).toFixed(2));

      return {
        id: `param_coa_${Date.now()}`,
        paper: 'CS',
        subject: 'coa',
        subtopic: 'Cache Memory & Effective Access Time',
        type: 'NAT',
        marks: 2,
        difficulty: 'Medium',
        pyqReference: 'Modeled after GATE CS 2017 / 2022 (Multi-level Cache EAT)',
        question: `Consider a system with a two-level cache hierarchy (L1 and L2) and main memory.
- L1 cache access time = $${L1_time}\\text{ ns}$ with hit rate $${h1_pct}\\%$.
- L2 cache access time = $${L2_time}\\text{ ns}$ with hit rate $${h2_pct}\\%$.
- Main memory access time = $${Mem_time}\\text{ ns}$.
- Caches are accessed sequentially (L1 is searched first; on a miss, L2 is searched; on an L2 miss, main memory is accessed).
Calculate the **Effective Memory Access Time (EMAT)** in nanoseconds (round off to two decimal places).`,
        range: [parseFloat((eat - 0.2).toFixed(2)), parseFloat((eat + 0.2).toFixed(2))],
        exactAnswer: eat,
        explanation: {
          concept: 'Hierarchical Multi-level Cache Access Time',
          summary: 'In sequential access, each level is checked in order upon misses.',
          steps: [
            `L1 Hit probability: $h_1 = ${h1}$, Access time = $T_1 = ${L1_time}\\text{ ns}$.`,
            `L1 Miss probability: $(1 - h_1) = ${(1 - h1).toFixed(2)}$.`,
            `L2 Hit probability: $h_2 = ${h2}$, Access time = $T_1 + T_2 = ${L1_time + L2_time}\\text{ ns}$.`,
            `Formula: $\\text{EMAT} = T_1 + (1 - h_1)[T_2 + (1 - h_2)T_m]$`,
            `$\\text{EMAT} = ${L1_time} + ${(1 - h1).toFixed(2)} \\times [${L2_time} + ${(1 - h2).toFixed(2)} \\times ${Mem_time}]$`,
            `$\\text{EMAT} = ${eat}\\text{ ns}$.`
          ],
          trap: 'Students often forget that L1 lookup time must be paid even when accessing L2, or they multiply $h_2$ with the global hit rate rather than local.',
          formula: '\\text{EMAT} = T_1 + (1 - h_1)(T_2 + (1 - h_2)T_m)'
        }
      };
    }
  },
  // Algorithms: Catalan Numbers & BSTs
  {
    paper: 'CS',
    subject: 'algo_ds',
    subtopic: 'Trees, Heaps & Hashing',
    generate: () => {
      const n = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
      function catalan(k) {
        let res = 1;
        for (let i = 0; i < k; i++) res = (res * (2 * k - i)) / (i + 1);
        return Math.round(res / (k + 1));
      }
      const c = catalan(n);
      return {
        id: `param_catalan_${Date.now()}`,
        paper: 'CS',
        subject: 'algo_ds',
        subtopic: 'Binary Search Trees & Combinatorics',
        type: 'NAT',
        marks: 1,
        difficulty: 'Easy',
        pyqReference: 'Modeled after GATE CS 2016 / 2020 (Catalan Numbers)',
        question: `How many structurally unique Binary Search Trees (BSTs) can be constructed using $${n}$ distinct sorted keys?`,
        range: [c, c],
        exactAnswer: c,
        explanation: {
          concept: 'Catalan Numbers in Data Structures',
          summary: 'The number of structurally unique BSTs with $n$ keys is given by the $n$-th Catalan number $C_n$.',
          steps: [
            `The formula is $C_n = \\frac{1}{n+1}\\binom{2n}{n}$.`,
            `For $n = ${n}$ keys: $C_{${n}} = \\frac{1}{${n} + 1} \\binom{${2 * n}}{${n}} = ${c}$.`
          ],
          trap: 'Do not multiply by $n!$ unless the question asks for distinct unlabeled binary trees with labeled nodes. For BSTs, in-order is fixed by key order.',
          formula: 'C_n = \\frac{1}{n+1}\\binom{2n}{n}'
        }
      };
    }
  },
  // ML / DA: F1-Score & Confusion Matrix
  {
    paper: 'DA',
    subject: 'ml',
    subtopic: 'Supervised Learning',
    generate: () => {
      const TP = (Math.floor(Math.random() * 5) + 6) * 10;
      const FP = (Math.floor(Math.random() * 3) + 1) * 10;
      const FN = (Math.floor(Math.random() * 3) + 1) * 10;
      const precision = TP / (TP + FP);
      const recall = TP / (TP + FN);
      const f1 = parseFloat(((2 * precision * recall) / (precision + recall)).toFixed(3));
      return {
        id: `param_ml_f1_${Date.now()}`,
        paper: 'DA',
        subject: 'ml',
        subtopic: 'Model Evaluation Metrics',
        type: 'NAT',
        marks: 2,
        difficulty: 'Medium',
        pyqReference: 'Modeled after GATE DA 2024 (Classification Metrics)',
        question: `A binary classifier was evaluated on a test dataset with:
- True Positives (TP) = $${TP}$
- False Positives (FP) = $${FP}$
- False Negatives (FN) = $${FN}$
Calculate the **$F_1$-score** of the classifier (rounded off to 3 decimal places).`,
        range: [parseFloat((f1 - 0.01).toFixed(3)), parseFloat((f1 + 0.01).toFixed(3))],
        exactAnswer: f1,
        explanation: {
          concept: 'Harmonic Mean in F1-Score',
          summary: 'F1 is the harmonic mean of Precision and Recall.',
          steps: [
            `$\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}} = \\frac{${TP}}{${TP} + ${FP}} = ${(precision).toFixed(4)}$`,
            `$\\text{Recall} = \\frac{\\text{TP}}{\\text{TP} + \\text{FN}} = \\frac{${TP}}{${TP} + ${FN}} = ${(recall).toFixed(4)}$`,
            `$$F_1 = \\frac{2 \\cdot \\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2 \\times ${TP}}{2 \\times ${TP} + ${FP} + ${FN}} = ${f1}$$`
          ],
          trap: 'F1-score is the HARMONIC mean, not arithmetic mean.',
          formula: 'F_1 = \\frac{2 \\cdot \\text{TP}}{2 \\cdot \\text{TP} + \\text{FP} + \\text{FN}}'
        }
      };
    }
  }
];

// Fallback question builder
function buildDynamicFallbackQuestion(paperId, subjectId, subtopic) {
  return {
    id: `dyn_${paperId}_${subjectId}_${Date.now()}`,
    paper: paperId,
    subject: subjectId,
    subtopic: subtopic || 'Core Concept',
    type: 'MCQ',
    marks: 2,
    difficulty: 'Medium',
    pyqReference: `Modeled after GATE ${paperId} Standard PYQ Pattern`,
    question: `Consider an essential concept in **${subtopic || subjectId}** for GATE ${paperId}:
Which of the following propositions is **TRUE** regarding foundational optimization and analytical properties?`,
    options: [
      { id: 'A', text: 'The necessary first-order condition for optimality is always sufficient for general non-convex spaces.' },
      { id: 'B', text: 'The duality gap is strictly zero when Slater\'s condition holds for a convex optimization formulation.' },
      { id: 'C', text: 'Eigenvalues of any skew-symmetric real matrix must be strictly positive real numbers.' },
      { id: 'D', text: 'A system with non-minimum phase transfer function has all its poles and zeros strictly on the imaginary axis.' }
    ],
    correctAnswer: 'B',
    explanation: {
      concept: 'Convex Optimization & Duality',
      summary: 'Slater\'s condition guarantees strong duality (zero duality gap) in convex programs.',
      steps: [
        'Slater\'s condition states that if the primal problem is convex and strictly feasible, strong duality holds, meaning the duality gap is identically zero.',
        'Option A is FALSE: Stationary points are not sufficient for global optimality in non-convex functions.',
        'Option C is FALSE: Eigenvalues of real skew-symmetric matrices are purely imaginary or zero.',
        'Option D is FALSE: Non-minimum phase systems have zeros or poles in the right-half plane (RHP).'
      ],
      trap: 'Always verify if convexity is explicitly specified when evaluating duality and stationarity!',
      formula: 'd^* = p^* \\iff \\text{Strong Duality (Slater\'s Condition)}'
    }
  };
}

// Generate question function
async function generateQuestion({ paperId, subjectId, subtopic, questionType, marks, geminiApiKey }) {
  if (geminiApiKey && geminiApiKey.trim() !== '') {
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + geminiApiKey.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a GATE examination question for Paper: ${paperId}, Subject: ${subjectId}, Subtopic: ${subtopic || 'General'}, Type: ${questionType || 'MCQ'}, Marks: ${marks || 2}. Return ONLY raw JSON with fields id, paper, subject, subtopic, type, marks, difficulty, pyqReference, question, options (array of {id, text}), correctAnswer, range (for NAT), exactAnswer, and explanation ({concept, summary, steps, trap, formula}). Use KaTeX syntax for math expressions.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json"
          }
        })
      });
      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return JSON.parse(text);
      }
    } catch (e) {
      console.warn('Gemini API call failed, using built-in generator:', e);
    }
  }

  // Check matching parametric generator
  const matchingParametric = PARAMETRIC_GENERATORS.filter(p => {
    if (paperId && p.paper !== paperId) return false;
    if (subjectId && p.subject !== subjectId) return false;
    return true;
  });

  if (matchingParametric.length > 0 && Math.random() > 0.3) {
    const generator = matchingParametric[Math.floor(Math.random() * matchingParametric.length)];
    return generator.generate();
  }

  // Check matching curated bank
  const matchingBank = QUESTION_BANK.filter(q => {
    if (paperId && q.paper !== paperId) return false;
    if (subjectId && q.subject !== subjectId) return false;
    if (questionType && questionType !== 'ALL' && q.type !== questionType) return false;
    return true;
  });

  if (matchingBank.length > 0) {
    const selected = matchingBank[Math.floor(Math.random() * matchingBank.length)];
    return { ...selected, id: `${selected.id}_${Date.now()}` };
  }

  if (PARAMETRIC_GENERATORS.length > 0) {
    const fallbackGen = PARAMETRIC_GENERATORS[Math.floor(Math.random() * PARAMETRIC_GENERATORS.length)];
    return fallbackGen.generate();
  }

  return buildDynamicFallbackQuestion(paperId, subjectId, subtopic);
}

// Grading & Evaluation
function evaluateAnswer(question, userAnswer) {
  let isCorrect = false;
  let marksAwarded = 0;
  let penalty = 0;

  if (question.type === 'MCQ') {
    isCorrect = userAnswer === question.correctAnswer;
    if (isCorrect) {
      marksAwarded = question.marks;
    } else if (userAnswer) {
      penalty = question.marks === 1 ? 0.33 : 0.66;
      marksAwarded = -penalty;
    }
  } else if (question.type === 'MSQ') {
    const userSet = Array.isArray(userAnswer) ? [...userAnswer].sort() : [];
    const correctSet = Array.isArray(question.correctAnswer) ? [...question.correctAnswer].sort() : [];
    isCorrect = userSet.length === correctSet.length && userSet.every((val, index) => val === correctSet[index]);
    if (isCorrect) {
      marksAwarded = question.marks;
    } else {
      marksAwarded = 0;
      penalty = 0;
    }
  } else if (question.type === 'NAT') {
    const num = parseFloat(userAnswer);
    if (!isNaN(num)) {
      if (question.range && question.range.length === 2) {
        isCorrect = num >= question.range[0] && num <= question.range[1];
      } else {
        isCorrect = Math.abs(num - question.exactAnswer) < 0.05;
      }
    }
    if (isCorrect) {
      marksAwarded = question.marks;
    } else {
      marksAwarded = 0;
      penalty = 0;
    }
  }

  return {
    isCorrect,
    marksAwarded: parseFloat(marksAwarded.toFixed(2)),
    penalty: parseFloat(penalty.toFixed(2)),
    correctAnswer: question.correctAnswer || (question.range ? `${question.range[0]} to ${question.range[1]}` : question.exactAnswer),
    explanation: question.explanation
  };
}

// ==========================================
// 5. TCS iON Scientific Calculator
// ==========================================
function VirtualCalculator({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [isRad, setIsRad] = useState(true);

  const handleNum = (num) => setDisplay(prev => prev === '0' ? String(num) : prev + num);
  const handleClear = () => setDisplay('0');
  const handleBackspace = () => setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');

  const handleEval = () => {
    try {
      let sanitized = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');
      // eslint-disable-next-line no-eval
      const result = eval(sanitized);
      setDisplay(String(Number(result.toFixed(8))));
    } catch (err) {
      setDisplay('Error');
    }
  };

  const handleScientific = (op) => {
    try {
      const val = parseFloat(display);
      let res = val;
      const angle = isRad ? val : (val * Math.PI) / 180;
      switch (op) {
        case 'sin': res = Math.sin(angle); break;
        case 'cos': res = Math.cos(angle); break;
        case 'tan': res = Math.tan(angle); break;
        case 'ln': res = Math.log(val); break;
        case 'log10': res = Math.log10(val); break;
        case 'sqrt': res = Math.sqrt(val); break;
        case 'sq': res = val * val; break;
        case 'inv': res = 1 / val; break;
        case 'neg': res = -val; break;
        case 'fact': {
          let f = 1;
          for (let i = 2; i <= Math.min(val, 20); i++) f *= i;
          res = f;
          break;
        }
        default: break;
      }
      setDisplay(String(Number(res.toFixed(8))));
    } catch (e) {
      setDisplay('Error');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs animate-fadeIn">
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
            GATE TCS iON Scientific Calculator
          </span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition">✕</button>
      </div>

      <div className="bg-slate-950 p-4 border-b border-slate-800">
        <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
          <button onClick={() => setIsRad(!isRad)} className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 font-bold">
            {isRad ? 'RAD' : 'DEG'}
          </button>
          <span>Memory: {memory !== 0 ? memory : '0'}</span>
        </div>
        <input type="text" readOnly value={display} className="w-full bg-transparent text-right text-2xl font-bold text-white tracking-wider outline-none" />
      </div>

      <div className="p-3 bg-slate-900 grid grid-cols-5 gap-1.5 text-center">
        <button onClick={() => setMemory(0)} className="p-2 rounded bg-slate-800 text-amber-400 active:scale-95 transition">MC</button>
        <button onClick={() => setDisplay(String(memory))} className="p-2 rounded bg-slate-800 text-amber-400 active:scale-95 transition">MR</button>
        <button onClick={() => setMemory(parseFloat(display) || 0)} className="p-2 rounded bg-slate-800 text-amber-400 active:scale-95 transition">MS</button>
        <button onClick={() => setMemory(m => m + (parseFloat(display) || 0))} className="p-2 rounded bg-slate-800 text-amber-400 active:scale-95 transition">M+</button>
        <button onClick={handleClear} className="p-2 rounded bg-rose-900/60 text-rose-300 font-bold active:scale-95 transition">C</button>

        <button onClick={() => handleScientific('sin')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">sin</button>
        <button onClick={() => handleScientific('cos')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">cos</button>
        <button onClick={() => handleScientific('tan')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">tan</button>
        <button onClick={() => handleScientific('ln')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">ln</button>
        <button onClick={() => handleScientific('log10')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">log</button>

        <button onClick={() => handleScientific('sqrt')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">√x</button>
        <button onClick={() => handleScientific('sq')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">x²</button>
        <button onClick={() => setDisplay(prev => prev + '^')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">x^y</button>
        <button onClick={() => handleScientific('inv')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">1/x</button>
        <button onClick={() => setDisplay(prev => prev + '÷')} className="p-2 rounded bg-indigo-900/40 text-indigo-300 font-bold active:scale-95 transition">÷</button>

        <button onClick={() => handleScientific('fact')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">n!</button>
        <button onClick={() => handleNum(7)} className="p-2 rounded bg-slate-950 text-white font-bold text-sm active:scale-95 transition">7</button>
        <button onClick={() => handleNum(8)} className="p-2 rounded bg-slate-950 text-white font-bold text-sm active:scale-95 transition">8</button>
        <button onClick={() => handleNum(9)} className="p-2 rounded bg-slate-950 text-white font-bold text-sm active:scale-95 transition">9</button>
        <button onClick={() => setDisplay(prev => prev + '×')} className="p-2 rounded bg-indigo-900/40 text-indigo-300 font-bold active:scale-95 transition">×</button>

        <button onClick={() => setDisplay(prev => prev === '0' ? '3.14159' : prev + '3.14159')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">π</button>
        <button onClick={() => handleNum(4)} className="p-2 rounded bg-slate-950 text-white font-bold text-sm active:scale-95 transition">4</button>
        <button onClick={() => handleNum(5)} className="p-2 rounded bg-slate-950 text-white font-bold text-sm active:scale-95 transition">5</button>
        <button onClick={() => handleNum(6)} className="p-2 rounded bg-slate-950 text-white font-bold text-sm active:scale-95 transition">6</button>
        <button onClick={() => setDisplay(prev => prev + '-')} className="p-2 rounded bg-indigo-900/40 text-indigo-300 font-bold active:scale-95 transition">-</button>

        <button onClick={() => setDisplay(prev => prev === '0' ? '2.71828' : prev + '2.71828')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">e</button>
        <button onClick={() => handleNum(1)} className="p-2 rounded bg-slate-950 text-white font-bold text-sm active:scale-95 transition">1</button>
        <button onClick={() => handleNum(2)} className="p-2 rounded bg-slate-950 text-white font-bold text-sm active:scale-95 transition">2</button>
        <button onClick={() => handleNum(3)} className="p-2 rounded bg-slate-950 text-white font-bold text-sm active:scale-95 transition">3</button>
        <button onClick={() => setDisplay(prev => prev + '+')} className="p-2 rounded bg-indigo-900/40 text-indigo-300 font-bold active:scale-95 transition">+</button>

        <button onClick={() => handleScientific('neg')} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">±</button>
        <button onClick={() => handleNum(0)} className="p-2 rounded bg-slate-950 text-white font-bold text-sm active:scale-95 transition">0</button>
        <button onClick={() => setDisplay(prev => prev + '.')} className="p-2 rounded bg-slate-950 text-white font-bold text-sm active:scale-95 transition">.</button>
        <button onClick={handleBackspace} className="p-2 rounded bg-slate-800 text-slate-300 active:scale-95 transition">⌫</button>
        <button onClick={handleEval} className="p-2 rounded bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-sm active:scale-95 transition">=</button>
      </div>
    </div>
  );
}

// ==========================================
// 6. MAIN APPLICATION COMPONENT
// ==========================================
function MainApp() {
  const [currentPaper, setCurrentPaper] = useState(() => {
    const saved = localStorage.getItem('gate_paper_id');
    return GATE_PAPERS.find(p => p.id === saved) || GATE_PAPERS[0];
  });
  const [isPaperSelectorOpen, setIsPaperSelectorOpen] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState(currentPaper.subjects[0]?.id || 'algo_ds');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [questionType, setQuestionType] = useState('ALL');
  const [marksFilter, setMarksFilter] = useState(2);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);

  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('gate_gemini_api_key') || '');

  const [stats, setStats] = useState(() => {
    try {
      const s = localStorage.getItem('gate_stats');
      return s ? JSON.parse(s) : { score: 0, attempted: 0, correct: 0, incorrect: 0, totalPenalty: 0 };
    } catch (e) {
      return { score: 0, attempted: 0, correct: 0, incorrect: 0, totalPenalty: 0 };
    }
  });

  useEffect(() => {
    localStorage.setItem('gate_stats', JSON.stringify(stats));
  }, [stats]);

  const loadQuestion = async (paperId, subjId, subtop, qType, marks) => {
    setIsLoadingQuestion(true);
    setUserAnswer(null);
    setIsSubmitted(false);
    setEvaluation(null);
    setIsExplanationOpen(false);

    try {
      const q = await generateQuestion({
        paperId: paperId || currentPaper.id,
        subjectId: subjId || selectedSubject,
        subtopic: subtop !== undefined ? subtop : selectedSubtopic,
        questionType: qType || (questionType === 'ALL' ? null : questionType),
        marks: marks || marksFilter,
        geminiApiKey
      });
      setCurrentQuestion(q);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  useEffect(() => {
    loadQuestion(currentPaper.id, selectedSubject, selectedSubtopic, questionType, marksFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPaper.id, selectedSubject]);

  const handleSelectPaper = (paper) => {
    setCurrentPaper(paper);
    setSelectedSubject(paper.subjects[0]?.id || '');
    setSelectedSubtopic('');
    localStorage.setItem('gate_paper_id', paper.id);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !userAnswer) return;
    const res = evaluateAnswer(currentQuestion, userAnswer);
    setEvaluation(res);
    setIsSubmitted(true);
    setIsExplanationOpen(true);

    setStats(prev => ({
      score: prev.score + res.marksAwarded,
      attempted: prev.attempted + 1,
      correct: prev.correct + (res.isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (!res.isCorrect ? 1 : 0),
      totalPenalty: prev.totalPenalty + res.penalty
    }));

    if (res.isCorrect && window.confetti) {
      window.confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleMsqToggle = (optId) => {
    if (isSubmitted) return;
    const cur = Array.isArray(userAnswer) ? [...userAnswer] : [];
    if (cur.includes(optId)) {
      setUserAnswer(cur.filter(x => x !== optId));
    } else {
      setUserAnswer([...cur, optId].sort());
    }
  };

  const isOptSelected = (optId) => {
    if (currentQuestion?.type === 'MCQ') return userAnswer === optId;
    if (currentQuestion?.type === 'MSQ') return Array.isArray(userAnswer) && userAnswer.includes(optId);
    return false;
  };

  const activeSubjectData = currentPaper.subjects.find(s => s.id === selectedSubject) || currentPaper.subjects[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. Header */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30">
              G
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent">
                  GATE AI Practice Agent
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  PYQ Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                IISc & IIT standard PYQ-modeled practice with instant evaluation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Paper Switcher Pill */}
            <button
              onClick={() => setIsPaperSelectorOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-medium border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-bold">{currentPaper.code}</span>
              <span className="text-slate-400 hidden md:inline">({currentPaper.shortName})</span>
              <span className="text-slate-400 text-xs">▼</span>
            </button>

            {/* Virtual Calculator Toggle */}
            <button
              onClick={() => setIsCalculatorOpen(prev => !prev)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-900/60 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/50 transition text-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <span className="font-mono font-bold">Calculator</span>
            </button>

            {/* Score Badges */}
            <div className="hidden lg:flex items-center space-x-2 bg-slate-950/70 px-3 py-1 rounded-lg border border-slate-800 font-mono text-xs">
              <span className="text-slate-400">Score:</span>
              <span className={`font-bold ${stats.score >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stats.score.toFixed(2)}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Acc:</span>
              <span className="font-bold text-sky-400">
                {stats.attempted > 0 ? `${Math.round((stats.correct / stats.attempted) * 100)}%` : '0%'}
              </span>
            </div>

            {/* API Settings */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-blue-400 border border-slate-700 transition cursor-pointer text-xs"
              title="Configure Settings"
            >
              ⚙
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TOPIC SELECTOR */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Select Topic to Test Yourself
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Choose a subject from your <span className="text-blue-400 font-semibold">{currentPaper.name}</span> syllabus.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800 text-xs">
                {['ALL', 'MCQ', 'MSQ', 'NAT'].map(t => (
                  <button
                    key={t}
                    onClick={() => {
                      setQuestionType(t);
                      loadQuestion(currentPaper.id, selectedSubject, selectedSubtopic, t === 'ALL' ? null : t, marksFilter);
                    }}
                    className={`px-2.5 py-1 rounded-md transition font-medium ${questionType === t ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {t === 'ALL' ? 'All Types' : t}
                  </button>
                ))}
              </div>

              <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800 text-xs">
                {[1, 2].map(m => (
                  <button
                    key={m}
                    onClick={() => {
                      setMarksFilter(m);
                      loadQuestion(currentPaper.id, selectedSubject, selectedSubtopic, questionType === 'ALL' ? null : questionType, m);
                    }}
                    className={`px-2.5 py-1 rounded-md transition font-medium ${marksFilter === m ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {m} Mark{m > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="mt-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Subject:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {currentPaper.subjects.map(subject => {
                const isSelected = selectedSubject === subject.id;
                return (
                  <button
                    key={subject.id}
                    onClick={() => {
                      setSelectedSubject(subject.id);
                      setSelectedSubtopic('');
                    }}
                    className={`text-left p-3 rounded-xl border text-xs transition-all relative ${
                      isSelected
                        ? 'border-blue-500 bg-blue-950/40 text-blue-200 font-semibold shadow-md shadow-blue-500/10'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="line-clamp-2">{subject.name}</div>
                    <div className="mt-1 text-[10px] text-slate-400 font-mono">{subject.weightage}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtopics */}
          {activeSubjectData && activeSubjectData.subtopics && (
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Focus Subtopic:
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedSubtopic('')}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition ${selectedSubtopic === '' ? 'bg-slate-700 text-white border-slate-600 font-medium' : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'}`}
                >
                  All Subtopics
                </button>
                {activeSubjectData.subtopics.map(sub => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubtopic(sub)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition ${selectedSubtopic === sub ? 'bg-blue-600/30 text-blue-300 border-blue-500/50 font-medium' : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Questions modeled after official IIT/IISc Previous Years Papers & common traps</span>
            </div>
            <button
              onClick={() => loadQuestion(currentPaper.id, selectedSubject, selectedSubtopic, questionType === 'ALL' ? null : questionType, marksFilter)}
              disabled={isLoadingQuestion}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {isLoadingQuestion ? 'Synthesizing...' : 'Generate Next PYQ-Style Question'}
            </button>
          </div>
        </div>

        {/* QUESTION CARD */}
        {isLoadingQuestion ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center shadow-xl">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <h3 className="text-lg font-bold text-white">Synthesizing GATE Question...</h3>
            <p className="text-xs text-slate-400 mt-1">Applying examination rigor, LaTeX formatting, and answer traps.</p>
          </div>
        ) : currentQuestion ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mb-8">
            {/* Header */}
            <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 font-mono font-bold text-xs">
                  {currentQuestion.paper} &bull; {currentQuestion.subtopic}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {currentQuestion.type}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  +{currentQuestion.marks} Mark{currentQuestion.marks > 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                {currentQuestion.type === 'MCQ' && (
                  <span className="text-rose-400 font-mono bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/50">
                    Negative: -{(currentQuestion.marks / 3).toFixed(2)}
                  </span>
                )}
                {currentQuestion.type === 'MSQ' && (
                  <span className="text-emerald-400 font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">
                    No Negative &bull; No Partial Marks
                  </span>
                )}
                {currentQuestion.type === 'NAT' && (
                  <span className="text-sky-400 font-mono bg-sky-950/40 px-2 py-0.5 rounded border border-sky-900/50">
                    NAT &bull; No Negative Marks
                  </span>
                )}
              </div>
            </div>

            {/* Reference */}
            {currentQuestion.pyqReference && (
              <div className="bg-indigo-950/20 px-6 py-1.5 border-b border-indigo-900/30 flex items-center justify-between text-[11px] text-indigo-300">
                <span>{currentQuestion.pyqReference}</span>
                <button onClick={() => setIsCalculatorOpen(true)} className="text-indigo-400 hover:text-indigo-200 underline font-mono cursor-pointer">
                  Virtual Calculator
                </button>
              </div>
            )}

            {/* Body */}
            <div className="p-6 sm:p-8">
              <div
                className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-6 space-y-3"
                dangerouslySetInnerHTML={{ __html: renderMathInText(currentQuestion.question) }}
              />

              {/* Options */}
              {(currentQuestion.type === 'MCQ' || currentQuestion.type === 'MSQ') && currentQuestion.options && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    {currentQuestion.type === 'MCQ' ? 'Select the single correct option:' : 'Select one or more correct options (MSQ):'}
                  </div>
                  {currentQuestion.options.map(opt => {
                    const selected = isOptSelected(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => {
                          if (isSubmitted) return;
                          if (currentQuestion.type === 'MCQ') setUserAnswer(opt.id);
                          else handleMsqToggle(opt.id);
                        }}
                        className={`p-4 rounded-xl border text-sm sm:text-base flex items-start space-x-3 transition-all cursor-pointer ${
                          selected
                            ? 'border-blue-500 bg-blue-950/40 text-blue-100 shadow-md shadow-blue-500/10'
                            : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-950/80'
                        }`}
                      >
                        <div className="pt-0.5">
                          <div className={`w-5 h-5 rounded-${currentQuestion.type === 'MCQ' ? 'full' : 'md'} border flex items-center justify-center font-bold text-xs ${
                            selected ? 'border-blue-500 bg-blue-600 text-white' : 'border-slate-700 bg-slate-800 text-slate-400'
                          }`}>
                            {currentQuestion.type === 'MCQ' ? opt.id : (selected ? '✓' : opt.id)}
                          </div>
                        </div>
                        <div className="flex-1 font-normal" dangerouslySetInnerHTML={{ __html: renderMathInText(opt.text) }} />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* NAT Input */}
              {currentQuestion.type === 'NAT' && (
                <div className="mt-4 p-5 rounded-xl border border-slate-800 bg-slate-950/60 max-w-lg">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Numerical Answer:
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      disabled={isSubmitted}
                      value={userAnswer || ''}
                      onChange={e => setUserAnswer(e.target.value)}
                      placeholder="e.g. 12 or 4.5"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-blue-500"
                    />
                    <button type="button" onClick={() => setUserAnswer('')} className="px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-mono">
                      Clear
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Tip: Enter integer or decimal value according to instructions.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setUserAnswer(currentQuestion.type === 'MSQ' ? [] : '')}
                  disabled={isSubmitted || !userAnswer}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium disabled:opacity-30 cursor-pointer"
                >
                  Clear Response
                </button>
                <button onClick={() => setIsCalculatorOpen(true)} className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-mono">
                  Calculator
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => loadQuestion(currentPaper.id, selectedSubject, selectedSubtopic, questionType === 'ALL' ? null : questionType, marksFilter)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Skip / Next
                </button>
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition disabled:opacity-40 cursor-pointer"
                >
                  Submit & Check Answer
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* STATS DASHBOARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Session GATE Performance</span>
                <span className="text-xs font-mono font-normal text-slate-400">({currentPaper.code})</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Real-time tracking with authentic negative marking penalties</p>
            </div>
            <button
              onClick={() => setStats({ score: 0, attempted: 0, correct: 0, incorrect: 0, totalPenalty: 0 })}
              className="text-xs text-slate-400 hover:text-rose-400 transition cursor-pointer"
            >
              Reset Session
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Net GATE Marks</span>
              <div className={`text-2xl font-black font-mono mt-1 ${stats.score >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stats.score.toFixed(2)}
              </div>
              <span className="text-[10px] text-slate-400">Includes -1/3 negative marks</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Accuracy</span>
              <div className="text-2xl font-black font-mono text-sky-400 mt-1">
                {stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0}%
              </div>
              <span className="text-[10px] text-slate-400">{stats.correct} correct of {stats.attempted}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Attempted</span>
              <div className="text-2xl font-black font-mono text-indigo-400 mt-1">{stats.attempted}</div>
              <span className="text-[10px] text-slate-400">{stats.incorrect} incorrect</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Negative Penalty</span>
              <div className="text-2xl font-black font-mono text-rose-400 mt-1">-{stats.totalPenalty.toFixed(2)}</div>
              <span className="text-[10px] text-slate-400">Avoidable errors</span>
            </div>
          </div>
        </div>

      </main>

      {/* PAPER SELECTOR MODAL */}
      {isPaperSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between pb-5 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  GATE Exam Papers
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">Select Your Target GATE Paper</h2>
                <p className="text-sm text-slate-400 mt-1">Tailors topics, questions, and PYQ syllabus accordingly.</p>
              </div>
              <button onClick={() => setIsPaperSelectorOpen(false)} className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {GATE_PAPERS.map(paper => {
                const isSelected = currentPaper.id === paper.id;
                return (
                  <div
                    key={paper.id}
                    onClick={() => {
                      handleSelectPaper(paper);
                      setIsPaperSelectorOpen(false);
                    }}
                    className={`p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected ? 'border-blue-500 bg-blue-950/30 shadow-lg shadow-blue-500/10' : 'border-slate-800 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${paper.color}`} />
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-black font-mono tracking-tight text-white group-hover:text-blue-400 transition">{paper.code}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">{paper.badge}</span>
                        </div>
                        <h3 className="font-semibold text-sm text-slate-200 mt-1">{paper.name}</h3>
                      </div>
                      {isSelected && <span className="text-blue-400 font-bold">✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* EXPLANATION MODAL */}
      {isExplanationOpen && evaluation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
            {/* Banner */}
            <div className={`p-5 rounded-2xl border mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              evaluation.isCorrect ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black ${
                  evaluation.isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                }`}>
                  {evaluation.isCorrect ? '✓' : '✕'}
                </div>
                <div>
                  <h3 className="text-xl font-black">{evaluation.isCorrect ? 'Correct Answer! Great Job.' : 'Incorrect Response'}</h3>
                  <p className="text-xs opacity-90">
                    {evaluation.isCorrect ? 'Your conceptual derivation is spot on!' : 'Review the detailed step-by-step solution to understand the pattern.'}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-700/50">
                <span className="text-xs font-mono uppercase tracking-wider opacity-80">Marks Awarded</span>
                <span className={`text-2xl font-mono font-black ${
                  evaluation.marksAwarded > 0 ? 'text-emerald-400' : evaluation.marksAwarded < 0 ? 'text-rose-400' : 'text-slate-300'
                }`}>
                  {evaluation.marksAwarded > 0 ? `+${evaluation.marksAwarded.toFixed(2)}` : evaluation.marksAwarded.toFixed(2)}
                </span>
                {evaluation.penalty > 0 && <span className="text-[10px] text-rose-400 font-mono">Penalty: -{evaluation.penalty.toFixed(2)}</span>}
              </div>
            </div>

            {/* Correct Answer */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Official Correct Answer:</span>
              <span className="text-base font-mono font-bold text-emerald-400 px-3 py-1 rounded-md bg-emerald-950/50 border border-emerald-800">
                {Array.isArray(evaluation.correctAnswer) ? evaluation.correctAnswer.join(', ') : String(evaluation.correctAnswer)}
              </span>
            </div>

            {/* Explanation Details */}
            {evaluation.explanation && (
              <div className="space-y-5 text-slate-200">
                {evaluation.explanation.concept && (
                  <div className="pb-3 border-b border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      Concept In Focus
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1">{evaluation.explanation.concept}</h4>
                    {evaluation.explanation.summary && <p className="text-sm text-slate-400 mt-1">{evaluation.explanation.summary}</p>}
                  </div>
                )}

                {evaluation.explanation.formula && (
                  <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40">
                    <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">Key Formula / Governing Equation</div>
                    <div className="font-serif text-center py-1 text-blue-200" dangerouslySetInnerHTML={{ __html: renderMathInText(`$$${evaluation.explanation.formula}$$`) }} />
                  </div>
                )}

                {evaluation.explanation.steps && (
                  <div>
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Step-by-Step Derivation & Option Analysis:</h5>
                    <ol className="space-y-2.5">
                      {evaluation.explanation.steps.map((st, i) => (
                        <li key={i} className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: renderMathInText(st) }} />
                      ))}
                    </ol>
                  </div>
                )}

                {evaluation.explanation.trap && (
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">GATE Trap / Common Misconception</div>
                    <p className="text-xs sm:text-sm text-amber-300 leading-relaxed">{evaluation.explanation.trap}</p>
                  </div>
                )}
              </div>
            )}

            {/* Modal Actions */}
            <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button onClick={() => setIsExplanationOpen(false)} className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm cursor-pointer">
                Review Question
              </button>
              <button
                onClick={() => {
                  setIsExplanationOpen(false);
                  loadQuestion(currentPaper.id, selectedSubject, selectedSubtopic, questionType === 'ALL' ? null : questionType, marksFilter);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                Next Practice Question →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR */}
      <VirtualCalculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />

      {/* SETTINGS MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">AI Question Settings</h3>
              <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-white p-1">✕</button>
            </div>
            <div className="mt-4 space-y-4 text-xs text-slate-300">
              <p>The agent operates with a built-in **Parametric PYQ Generator** with zero external dependencies.</p>
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-blue-300">
                <strong>Optional Gemini Key:</strong> Supply a Google Gemini API Key if you want real-time generation of custom syllabus problems.
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">Gemini API Key (Optional):</label>
                <input
                  type="password"
                  value={geminiApiKey}
                  onChange={e => setGeminiApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end space-x-2">
              <button onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs">Close</button>
              <button
                onClick={() => {
                  localStorage.setItem('gate_gemini_api_key', geminiApiKey);
                  setIsSettingsOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainApp />);
