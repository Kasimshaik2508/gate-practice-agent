// GATE Practice Agent - Complete Bundled Application with User Sign-In & History Tracking
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
        subtopics: ['Op-Amp Applications', 'BJT & MOSFET Small Signal Amplifiers', 'Feedback Amplifiers & Oscillators'],
        weightage: '9-11 Marks'
      },
      {
        id: 'digital_circuits',
        name: 'Digital Circuits',
        subtopics: ['Boolean Algebra & Karnaugh Maps', 'Combinational Circuits', 'Sequential Circuits', 'ADC and DAC'],
        weightage: '8-10 Marks'
      },
      {
        id: 'control_systems',
        name: 'Control Systems',
        subtopics: ['Transfer Functions', 'Routh-Hurwitz & Root Locus', 'Bode Plot & Nyquist Stability'],
        weightage: '8-10 Marks'
      },
      {
        id: 'communications',
        name: 'Communications',
        subtopics: ['Analog & Digital Modulation', 'Channel Capacity', 'Noise Performance'],
        weightage: '10-12 Marks'
      },
      {
        id: 'engg_math',
        name: 'Engineering Mathematics',
        subtopics: ['Linear Algebra', 'Calculus', 'Differential Equations', 'Probability'],
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
        subtopics: ['Network Theorems', 'Transient & Steady State Response', 'Two-Port Networks'],
        weightage: '9-11 Marks'
      },
      {
        id: 'electrical_machines',
        name: 'Electrical Machines',
        subtopics: ['Transformers', 'DC Machines', 'Induction & Synchronous Machines'],
        weightage: '10-12 Marks'
      },
      {
        id: 'power_systems',
        name: 'Power Systems',
        subtopics: ['Transmission Lines', 'Load Flow', 'Fault Analysis & Protection'],
        weightage: '10-12 Marks'
      },
      {
        id: 'power_electronics',
        name: 'Power Electronics',
        subtopics: ['Thyristors & MOSFETs', 'Rectifiers & DC-DC Converters', 'Inverters'],
        weightage: '9-11 Marks'
      },
      {
        id: 'engg_math',
        name: 'Engineering Mathematics',
        subtopics: ['Linear Algebra', 'Calculus', 'Differential Equations', 'Probability'],
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
        subtopics: ['Laws of Thermodynamics', 'Power Cycles', 'Heat Transfer'],
        weightage: '10-12 Marks'
      },
      {
        id: 'fluid_mech',
        name: 'Fluid Mechanics & Turbomachinery',
        subtopics: ['Fluid Statics', 'Bernoulli Equation', 'Pipe Flow & Boundary Layer'],
        weightage: '8-10 Marks'
      },
      {
        id: 'som',
        name: 'Strength of Materials',
        subtopics: ['Stress, Strain & Mohr Circle', 'Bending & Torsion in Shafts'],
        weightage: '8-10 Marks'
      },
      {
        id: 'manufacturing',
        name: 'Manufacturing & Industrial Engg',
        subtopics: ['Casting, Welding & Machining', 'Inventory Control & Operations Research'],
        weightage: '14-16 Marks'
      },
      {
        id: 'engg_math',
        name: 'Engineering Mathematics',
        subtopics: ['Linear Algebra', 'Calculus', 'Differential Equations'],
        weightage: '13-15 Marks'
      },
      {
        id: 'aptitude',
        name: 'General Aptitude',
        subtopics: ['Quantitative Aptitude', 'Analytical Reasoning'],
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
        subtopics: ['SFD & BMD', 'RCC Design', 'Steel Structures'],
        weightage: '14-16 Marks'
      },
      {
        id: 'geotech',
        name: 'Geotechnical Engineering (Soil Mechanics)',
        subtopics: ['Index Properties', 'Permeability & Seepage', 'Foundations'],
        weightage: '13-15 Marks'
      },
      {
        id: 'water_resources',
        name: 'Water Resources & Fluid Mechanics',
        subtopics: ['Pipe Flow', 'Open Channel Flow', 'Hydrology'],
        weightage: '9-11 Marks'
      },
      {
        id: 'engg_math',
        name: 'Engineering Mathematics',
        subtopics: ['Linear Algebra', 'Calculus', 'Differential Equations'],
        weightage: '13-15 Marks'
      },
      {
        id: 'aptitude',
        name: 'General Aptitude',
        subtopics: ['Quantitative Aptitude', 'Analytical Reasoning'],
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
  if (typeof window === 'undefined' || !window.katex) return text;
  try {
    let formatted = text.replace(/\$\$([\s\S]*?)\$\$/g, (m, f) => {
      try {
        return `<div class="my-2 py-1 overflow-x-auto text-center font-serif">${window.katex.renderToString(f.trim(), { displayMode: true, throwOnError: false })}</div>`;
      } catch (e) { return m; }
    });
    formatted = formatted.replace(/\$([^\$\n]+?)\$/g, (m, f) => {
      try {
        return `<span class="inline-block px-0.5 font-serif">${window.katex.renderToString(f.trim(), { displayMode: false, throwOnError: false })}</span>`;
      } catch (e) { return m; }
    });
    return formatted;
  } catch (err) {
    return text;
  }
}

// ==========================================
// 3. Question Bank & Parametric Synthesizer
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
        'When $k$ is added to each edge, the new cost becomes $\\text{Cost}_{\\text{new}}(P) = \\text{Cost}(P) + k \\cdot e$.',
        'Option A is FALSE because a path that had more cost originally but fewer edges may become strictly shorter.',
        'Option B is FALSE because $L$ is the number of edges on the path, not $|V|$.',
        'Option C is TRUE: If a path with $L$ edges remains shortest, its cost is $C + k \\cdot L$.',
        'Option D is FALSE because edge weights remain positive.'
      ],
      trap: 'In MST, adding a constant preserves the tree, but for Shortest Paths it does NOT because paths have differing numbers of edges!',
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
        'Since $c = 2 > 1.585$, Master Theorem Case 3 applies ($f(n)$ dominates).',
        'Check regularity: $3(n/2)^2 = \\frac{3}{4}n^2 \\le d \\cdot n^2$ for $d = 3/4 < 1$. Holds!',
        'Therefore, $T(n) = \\Theta(n^2)$, meaning $k = 2$.'
      ],
      trap: 'Students often calculate $\\log_2 3 \\approx 1.58$ and think that dominates $n^2$.',
      formula: 'T(n) = \\Theta(f(n)) = \\Theta(n^2)'
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
        'A is TRUE: Bottom-up Build-Heap takes $O(n)$ time.',
        'B is TRUE: Minimal nodes in AVL of height $h$ is $N(h-1) + N(h-2) + 1$.',
        'C is FALSE: BST worst-case is $O(n)$ if degenerate.',
        'D is TRUE: Leaves in almost complete binary tree is $\\lceil n / 2 \\rceil$.'
      ],
      trap: 'MSQ requires all correct options and none wrong. Worst-case search in BST is $O(n)$, not $O(\\log n)$.',
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
      summary: 'A string has both 01 and 10 if and only if it toggles between 0 and 1.',
      steps: [
        'States:',
        '1. [$\\epsilon$] Start state',
        '2. [0] Saw initial 0',
        '3. [1] Saw initial 1',
        '4. [01 or 10] Fulfilled one, awaiting counterpart',
        '5. [010 or 101] Final accepting trap state',
        'Total states = 5.'
      ],
      trap: 'Avoid creating two separate unmerged accept states.',
      formula: '\\text{Number of states} = 5'
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
      summary: 'As $\\lambda \\to \\infty$, weights shrink to zero, leading to underfitting (high bias, near zero variance).',
      steps: [
        'Closed form: $\\mathbf{w} = (\\mathbf{X}^T \\mathbf{X} + n\\lambda \\mathbf{I})^{-1} \\mathbf{X}^T \\mathbf{y}$.',
        'As $\\lambda \\to \\infty$, $\\mathbf{w} \\to \\mathbf{0}$.',
        'Underfitting means bias increases and variance decreases.',
        'Exact sparsity is caused by $L_1$ Lasso, not $L_2$ Ridge.'
      ],
      trap: 'Only Lasso produces exact zeros. Ridge shrinks asymptotically.',
      formula: '\\mathbf{w}_{\\text{ridge}} = (\\mathbf{X}^T \\mathbf{X} + \\lambda \\mathbf{I})^{-1} \\mathbf{X}^T \\mathbf{y}'
    }
  }
];

// Parametric dynamic generator
const PARAMETRIC_GENERATORS = [
  {
    paper: 'CS',
    subject: 'coa',
    subtopic: 'Cache Memory Mapping',
    generate: () => {
      const L1_time = Math.floor(Math.random() * 3) + 2;
      const L2_time = Math.floor(Math.random() * 10) + 10;
      const Mem_time = Math.floor(Math.random() * 40) + 80;
      const h1_pct = Math.floor(Math.random() * 10) + 85;
      const h2_pct = Math.floor(Math.random() * 15) + 75;
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
Caches are accessed sequentially. Calculate the **Effective Memory Access Time (EMAT)** in nanoseconds (round off to two decimal places).`,
        range: [parseFloat((eat - 0.2).toFixed(2)), parseFloat((eat + 0.2).toFixed(2))],
        exactAnswer: eat,
        explanation: {
          concept: 'Hierarchical Multi-level Cache Access Time',
          summary: 'In sequential access, each level is checked in order upon misses.',
          steps: [
            `L1 Hit: $h_1 = ${h1}$, Time = $${L1_time}\\text{ ns}$.`,
            `L1 Miss: $(1 - h_1) = ${(1 - h1).toFixed(2)}$.`,
            `$\\text{EMAT} = T_1 + (1 - h_1)[T_2 + (1 - h_2)T_m]$`,
            `$\\text{EMAT} = ${eat}\\text{ ns}$.`
          ],
          trap: 'L1 lookup time must be paid even on miss.',
          formula: '\\text{EMAT} = T_1 + (1 - h_1)(T_2 + (1 - h_2)T_m)'
        }
      };
    }
  },
  {
    paper: 'CS',
    subject: 'algo_ds',
    subtopic: 'Trees, Heaps & Hashing',
    generate: () => {
      const n = Math.floor(Math.random() * 3) + 3;
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
          summary: 'The number of structurally unique BSTs with $n$ keys is given by $C_n = \\frac{1}{n+1}\\binom{2n}{n}$.',
          steps: [
            `For $n = ${n}$ keys: $C_{${n}} = \\frac{1}{${n} + 1} \\binom{${2 * n}}{${n}} = ${c}$.`
          ],
          trap: 'Do not multiply by $n!$ for BSTs because in-order traversal is fixed by sorting.',
          formula: 'C_n = \\frac{1}{n+1}\\binom{2n}{n}'
        }
      };
    }
  }
];

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
        'Slater\'s condition guarantees strong duality in convex optimization problems.',
        'Option A is FALSE: Stationary points are not sufficient for global optimality in non-convex functions.',
        'Option C is FALSE: Real skew-symmetric matrices have purely imaginary or zero eigenvalues.',
        'Option D is FALSE: Non-minimum phase systems have zeros or poles in the right-half plane.'
      ],
      trap: 'Verify convexity before assuming zero duality gap!',
      formula: 'd^* = p^* \\iff \\text{Slater\'s Condition Holds}'
    }
  };
}

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
          generationConfig: { temperature: 0.7, responseMimeType: "application/json" }
        })
      });
      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return JSON.parse(text);
      }
    } catch (e) {
      console.warn('Gemini API call error, using local engine:', e);
    }
  }

  const matchingParametric = PARAMETRIC_GENERATORS.filter(p => (!paperId || p.paper === paperId) && (!subjectId || p.subject === subjectId));
  if (matchingParametric.length > 0 && Math.random() > 0.3) {
    return matchingParametric[Math.floor(Math.random() * matchingParametric.length)].generate();
  }

  const matchingBank = QUESTION_BANK.filter(q => (!paperId || q.paper === paperId) && (!subjectId || q.subject === subjectId) && (!questionType || questionType === 'ALL' || q.type === questionType));
  if (matchingBank.length > 0) {
    const selected = matchingBank[Math.floor(Math.random() * matchingBank.length)];
    return { ...selected, id: `${selected.id}_${Date.now()}` };
  }

  if (PARAMETRIC_GENERATORS.length > 0) {
    return PARAMETRIC_GENERATORS[Math.floor(Math.random() * PARAMETRIC_GENERATORS.length)].generate();
  }

  return buildDynamicFallbackQuestion(paperId, subjectId, subtopic);
}

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
    if (isCorrect) marksAwarded = question.marks;
  } else if (question.type === 'NAT') {
    const num = parseFloat(userAnswer);
    if (!isNaN(num)) {
      if (question.range && question.range.length === 2) {
        isCorrect = num >= question.range[0] && num <= question.range[1];
      } else {
        isCorrect = Math.abs(num - question.exactAnswer) < 0.05;
      }
    }
    if (isCorrect) marksAwarded = question.marks;
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
// 4. TCS iON Scientific Calculator
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
// 5. SIGN-IN & PROFILE MODAL
// ==========================================
function SignInModal({ isOpen, onClose, onSignIn, existingUser }) {
  if (!isOpen) return null;
  const [name, setName] = useState(existingUser?.name || '');
  const [email, setEmail] = useState(existingUser?.email || '');
  const [targetPaper, setTargetPaper] = useState(existingUser?.paperId || 'CS');
  const [targetYear, setTargetYear] = useState(existingUser?.targetYear || 'GATE 2025');
  const [dailyGoal, setDailyGoal] = useState(existingUser?.dailyGoal || 10);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    const userData = {
      name: name.trim(),
      email: email.trim(),
      paperId: targetPaper,
      targetYear,
      dailyGoal: Number(dailyGoal),
      createdAt: existingUser?.createdAt || new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    onSignIn(userData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-base shadow-md shadow-blue-500/20">
                🎓
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Aspirant Profile
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              {existingUser ? 'Edit Aspirant Profile' : 'Sign In to GATE Practice Agent'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Your test history, mistakes, scorecards, and progress will be securely saved.
            </p>
          </div>
          {existingUser && (
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition">✕</button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              placeholder="e.g. Kasim Shaik"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. kasim@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Target GATE Paper *</label>
            <div className="grid grid-cols-3 gap-2">
              {GATE_PAPERS.map(paper => {
                const isSelected = targetPaper === paper.id;
                return (
                  <button
                    type="button"
                    key={paper.id}
                    onClick={() => setTargetPaper(paper.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected ? 'border-blue-500 bg-blue-950/40 text-blue-200 font-bold shadow-md shadow-blue-500/10' : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-mono text-sm">{paper.code}</div>
                    <div className="text-[10px] text-slate-400 truncate">{paper.shortName.split(' ')[1] || paper.code}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Target Year</label>
              <select
                value={targetYear}
                onChange={e => setTargetYear(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
              >
                <option value="GATE 2025">GATE 2025</option>
                <option value="GATE 2026">GATE 2026</option>
                <option value="GATE 2027">GATE 2027</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Daily Goal</label>
              <select
                value={dailyGoal}
                onChange={e => setDailyGoal(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
              >
                <option value={5}>5 Questions / day</option>
                <option value={10}>10 Questions / day</option>
                <option value={15}>15 Questions / day</option>
                <option value={20}>20 Questions / day</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
            {existingUser && (
              <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer">
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition cursor-pointer"
            >
              {existingUser ? 'Update Profile' : 'Sign In & Start Practicing →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 6. HISTORY & ERROR NOTEBOOK MODAL
// ==========================================
function HistoryModal({ isOpen, onClose, history, onClearHistory }) {
  if (!isOpen) return null;
  const [filter, setFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState(null);

  const filteredHistory = history.filter(item => {
    if (filter === 'MISTAKES') return !item.isCorrect;
    if (filter === 'CORRECT') return item.isCorrect;
    return true;
  });

  const totalScore = history.reduce((acc, curr) => acc + (curr.marksAwarded || 0), 0);
  const correctCount = history.filter(h => h.isCorrect).length;
  const accuracy = history.length > 0 ? Math.round((correctCount / history.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-base">
                📖
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Aspirant Attempt History & Error Notebook
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Review your previous solved questions, examine mistake traps, and revisit mathematical derivations.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition self-end sm:self-auto cursor-pointer">
            ✕
          </button>
        </div>

        {/* Summary Bar */}
        <div className="grid grid-cols-3 gap-3 my-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total Solved</span>
            <div className="text-xl font-bold font-mono text-white mt-0.5">{history.length}</div>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Lifetime Marks</span>
            <div className={`text-xl font-bold font-mono mt-0.5 ${totalScore >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {totalScore.toFixed(2)}
            </div>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Overall Accuracy</span>
            <div className="text-xl font-bold font-mono text-sky-400 mt-0.5">{accuracy}%</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${filter === 'ALL' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              All Attempts ({history.length})
            </button>
            <button
              onClick={() => setFilter('MISTAKES')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${filter === 'MISTAKES' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-rose-300'}`}
            >
              Mistakes Only ({history.filter(h => !h.isCorrect).length})
            </button>
            <button
              onClick={() => setFilter('CORRECT')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${filter === 'CORRECT' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-emerald-300'}`}
            >
              Correct ({correctCount})
            </button>
          </div>
          {history.length > 0 && (
            <button onClick={onClearHistory} className="text-xs text-rose-400 hover:text-rose-300 transition cursor-pointer">
              Clear Log
            </button>
          )}
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
            <span className="text-3xl">📝</span>
            <h4 className="text-base font-bold text-slate-300 mt-2">No history items match this filter</h4>
            <p className="text-xs text-slate-400 mt-1">Start practicing and answering questions to build your error notebook.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((item, idx) => {
              const isExpanded = expandedId === item.id;
              const formattedDate = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div
                  key={item.id || idx}
                  className={`rounded-xl border transition-all overflow-hidden ${item.isCorrect ? 'border-emerald-900/40 bg-emerald-950/10' : 'border-rose-900/40 bg-rose-950/10'}`}
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        item.isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {item.isCorrect ? '✓' : '✕'}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-white">{item.paper} &bull; {item.subtopic || item.subject}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{item.type}</span>
                          <span className="text-[10px] text-slate-400">{formattedDate}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-1 font-serif">
                          {item.questionText ? item.questionText.slice(0, 100) + '...' : 'GATE Question'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 self-end sm:self-auto">
                      <div className="text-right">
                        <div className={`text-sm font-mono font-bold ${item.marksAwarded > 0 ? 'text-emerald-400' : item.marksAwarded < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                          {item.marksAwarded > 0 ? `+${item.marksAwarded.toFixed(2)}` : item.marksAwarded.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Your: <span className="font-bold text-white">{Array.isArray(item.userAnswer) ? item.userAnswer.join(',') : item.userAnswer}</span> | Ans: <span className="text-emerald-400 font-bold">{Array.isArray(item.correctAnswer) ? item.correctAnswer.join(',') : item.correctAnswer}</span>
                        </div>
                      </div>
                      <span className="text-slate-400 text-xs">{isExpanded ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-5 border-t border-slate-800 bg-slate-950/70 space-y-4 text-xs animate-fadeIn">
                      <div>
                        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Complete Question:</span>
                        <div className="text-slate-200 mt-1 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: renderMathInText(item.questionText) }} />
                      </div>

                      {item.explanation && (
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                          {item.explanation.concept && (
                            <div>
                              <span className="text-blue-400 font-bold uppercase text-[10px]">Concept:</span>
                              <div className="font-bold text-white text-sm">{item.explanation.concept}</div>
                            </div>
                          )}
                          {item.explanation.formula && (
                            <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-900/40 text-center font-serif text-blue-200" dangerouslySetInnerHTML={{ __html: renderMathInText(`$$${item.explanation.formula}$$`) }} />
                          )}
                          {item.explanation.steps && (
                            <div>
                              <span className="text-slate-400 font-bold uppercase text-[10px]">Derivation:</span>
                              <ol className="list-decimal list-inside space-y-1 text-slate-300 mt-1">
                                {item.explanation.steps.map((s, i) => (
                                  <li key={i} dangerouslySetInnerHTML={{ __html: renderMathInText(s) }} />
                                ))}
                              </ol>
                            </div>
                          )}
                          {item.explanation.trap && (
                            <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40 text-amber-200">
                              <span className="font-bold text-amber-400">⚠️ GATE Trap: </span>
                              {item.explanation.trap}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition">
            Close Notebook
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. USER PROFILE MODAL
// ==========================================
function UserProfileModal({ isOpen, onClose, user, history, onEditProfile, onSignOut }) {
  if (!isOpen || !user) return null;
  const totalSolved = history.length;
  const correctCount = history.filter(h => h.isCorrect).length;
  const lifetimeScore = history.reduce((sum, h) => sum + (h.marksAwarded || 0), 0);
  const accuracy = totalSolved > 0 ? Math.round((correctCount / totalSolved) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>{user.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {user.paperId}
                </span>
              </h3>
              <p className="text-xs text-slate-400">{user.email || 'Aspirant'} &bull; {user.targetYear}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition">✕</button>
        </div>

        <div className="my-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">Lifetime Preparation Stats</span>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Solved</span>
              <div className="text-lg font-mono font-bold text-white mt-0.5">{totalSolved}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Score</span>
              <div className={`text-lg font-mono font-bold mt-0.5 ${lifetimeScore >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{lifetimeScore.toFixed(2)}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Accuracy</span>
              <div className="text-lg font-mono font-bold text-sky-400 mt-0.5">{accuracy}%</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="flex justify-between"><span className="text-slate-500">Target Paper:</span><span className="font-bold text-white">GATE {user.paperId}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Target Exam:</span><span className="font-bold text-white">{user.targetYear}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Daily Target:</span><span className="font-bold text-white">{user.dailyGoal} questions / day</span></div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button onClick={() => { onClose(); onSignOut(); }} className="text-xs text-rose-400 hover:text-rose-300 transition">
            Sign Out / Switch User
          </button>
          <div className="flex space-x-2">
            <button onClick={() => { onClose(); onEditProfile(); }} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition">
              Edit Profile
            </button>
            <button onClick={onClose} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. MAIN APPLICATION
// ==========================================
function MainApp() {
  // User Profile
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Attempt History Log
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_practice_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  useEffect(() => {
    localStorage.setItem('gate_practice_history', JSON.stringify(history));
  }, [history]);

  // Paper State
  const [currentPaper, setCurrentPaper] = useState(() => {
    const saved = user?.paperId || localStorage.getItem('gate_paper_id');
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

  // Open sign in if no user
  useEffect(() => {
    if (!user) {
      setIsSignInOpen(true);
    }
  }, [user]);

  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem('gate_user_profile', JSON.stringify(userData));
    if (userData.paperId) {
      const p = GATE_PAPERS.find(x => x.id === userData.paperId);
      if (p) handleSelectPaper(p);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('gate_user_profile');
    setIsSignInOpen(true);
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your attempt history?')) {
      setHistory([]);
      localStorage.removeItem('gate_practice_history');
    }
  };

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

    // Update Session Stats
    setStats(prev => ({
      score: prev.score + res.marksAwarded,
      attempted: prev.attempted + 1,
      correct: prev.correct + (res.isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (!res.isCorrect ? 1 : 0),
      totalPenalty: prev.totalPenalty + res.penalty
    }));

    // Record into Persistent History
    const historyEntry = {
      id: `attempt_${Date.now()}`,
      timestamp: Date.now(),
      questionId: currentQuestion.id,
      paper: currentQuestion.paper,
      subject: currentQuestion.subject,
      subtopic: currentQuestion.subtopic,
      questionText: currentQuestion.question,
      type: currentQuestion.type,
      marks: currentQuestion.marks,
      userAnswer: userAnswer,
      correctAnswer: res.correctAnswer,
      isCorrect: res.isCorrect,
      marksAwarded: res.marksAwarded,
      penalty: res.penalty,
      explanation: currentQuestion.explanation
    };

    setHistory(prev => [historyEntry, ...prev]);

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
      
      {/* Header */}
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
                {user ? `Aspirant: ${user.name} • ${user.targetYear}` : 'IIT & IISc standard PYQ practice with instant evaluation'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Paper Switcher */}
            <button
              onClick={() => setIsPaperSelectorOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-bold">{currentPaper.code}</span>
              <span className="text-slate-400 hidden md:inline">({currentPaper.shortName})</span>
              <span className="text-slate-400 text-xs">▼</span>
            </button>

            {/* Error Notebook / History Button */}
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500/40 transition text-xs flex items-center space-x-1.5 cursor-pointer"
              title="View Attempt History & Error Notebook"
            >
              <span className="text-sm">📖</span>
              <span className="hidden sm:inline font-medium">History</span>
              {history.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-600 text-white font-bold font-mono">
                  {history.length}
                </span>
              )}
            </button>

            {/* Virtual Calculator */}
            <button
              onClick={() => setIsCalculatorOpen(prev => !prev)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-900/60 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/50 transition text-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <span className="font-mono font-bold">Calculator</span>
            </button>

            {/* Score */}
            <div className="hidden xl:flex items-center space-x-2 bg-slate-950/70 px-3 py-1 rounded-lg border border-slate-800 font-mono text-xs">
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

            {/* User Profile Pill or Sign In Button */}
            {user ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center space-x-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-gradient-to-r from-blue-950 to-indigo-950 border border-blue-500/40 hover:border-blue-400 transition cursor-pointer"
                title="Aspirant Profile"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-blue-200 hidden md:inline max-w-[90px] truncate">
                  {user.name}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsSignInOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Settings */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-blue-400 border border-slate-700 transition cursor-pointer text-xs"
              title="Settings"
            >
              ⚙
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Welcome Banner for Logged-In User */}
        {user && (
          <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-900/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👋</span>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Welcome back, <span className="text-blue-400">{user.name}</span>!
                </h3>
                <p className="text-xs text-slate-400">
                  Target: <strong className="text-slate-300">{user.paperId}</strong> • Exam: <strong className="text-slate-300">{user.targetYear}</strong> • Daily Goal: <strong className="text-slate-300">{user.dailyGoal} questions</strong> ({history.length} solved so far)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
            >
              <span>View Past Attempts ({history.length})</span>
            </button>
          </div>
        )}

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
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Subject:</label>
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Focus Subtopic:</label>
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
              <span>Questions modeled after IIT/IISc Previous Years Papers & trap analysis</span>
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
            <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 font-mono font-bold text-xs">
                  {currentQuestion.paper} &bull; {currentQuestion.subtopic}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">{currentQuestion.type}</span>
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

            {currentQuestion.pyqReference && (
              <div className="bg-indigo-950/20 px-6 py-1.5 border-b border-indigo-900/30 flex items-center justify-between text-[11px] text-indigo-300">
                <span>{currentQuestion.pyqReference}</span>
                <button onClick={() => setIsCalculatorOpen(true)} className="text-indigo-400 hover:text-indigo-200 underline font-mono cursor-pointer">
                  Virtual Calculator
                </button>
              </div>
            )}

            <div className="p-6 sm:p-8">
              <div className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-6 space-y-3" dangerouslySetInnerHTML={{ __html: renderMathInText(currentQuestion.question) }} />

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

              {currentQuestion.type === 'NAT' && (
                <div className="mt-4 p-5 rounded-xl border border-slate-800 bg-slate-950/60 max-w-lg">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Numerical Answer:</label>
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
                </div>
              )}
            </div>

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
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Net Marks</span>
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
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Solved</span>
              <div className="text-2xl font-black font-mono text-indigo-400 mt-1">{stats.attempted}</div>
              <span className="text-[10px] text-slate-400">{stats.incorrect} incorrect</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Lifetime Saved</span>
              <div className="text-2xl font-black font-mono text-emerald-400 mt-1">{history.length}</div>
              <span className="text-[10px] text-slate-400">In Error Notebook</span>
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
                    {evaluation.isCorrect ? 'Saved into your practice notebook.' : 'Added to your Error Notebook for revision.'}
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

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Official Correct Answer:</span>
              <span className="text-base font-mono font-bold text-emerald-400 px-3 py-1 rounded-md bg-emerald-950/50 border border-emerald-800">
                {Array.isArray(evaluation.correctAnswer) ? evaluation.correctAnswer.join(', ') : String(evaluation.correctAnswer)}
              </span>
            </div>

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

      {/* SIGN IN MODAL */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignIn={handleSignIn}
        existingUser={user}
      />

      {/* USER PROFILE MODAL */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        history={history}
        onEditProfile={() => setIsSignInOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* ATTEMPT HISTORY & ERROR NOTEBOOK MODAL */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
      />

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
