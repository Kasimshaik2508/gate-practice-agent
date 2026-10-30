// Dynamic Question Generator Engine: Parametric Synthesizer + Gemini Live Generator
import { QUESTION_BANK } from '../data/questionBank.js';

// Parametric generators produce fresh questions on the fly with random parameters
const PARAMETRIC_GENERATORS = [
  // 1. Cache Memory & Hit Ratio (COA / CS)
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

      // EAT = h1 * L1 + (1 - h1) * (h2 * (L1 + L2) + (1 - h2) * (L1 + L2 + Mem)) (hierarchical)
      // Or simultaneous: EAT = L1 + (1 - h1) * (L2 + (1 - h2) * Mem)
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
            `L2 Hit probability: $h_2 = ${h2}$, Access time = $T_1 + T_2 = ${L1_time} + ${L2_time} = ${L1_time + L2_time}\\text{ ns}$.`,
            `L2 Miss penalty: $(1 - h_2) = ${(1 - h2).toFixed(2)}$, requiring memory access time = $T_1 + T_2 + T_m = ${L1_time + L2_time + Mem_time}\\text{ ns}$.`,
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

  // 2. Catalan Number / Distinct Binary Trees (Algorithms / DS)
  {
    paper: 'CS',
    subject: 'algo_ds',
    subtopic: 'Trees, Heaps & Hashing',
    generate: () => {
      const n = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
      // Catalan formula C_n = (2n)! / ((n+1)! * n!)
      function catalan(k) {
        let res = 1;
        for (let i = 0; i < k; i++) {
          res = (res * (2 * k - i)) / (i + 1);
        }
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
            `The number of structurally unique binary search trees with $n$ distinct keys is $C_n = \\frac{1}{n+1}\\binom{2n}{n}$.`,
            `For $n = ${n}$ keys:`,
            `$$C_{${n}} = \\frac{1}{${n} + 1} \\binom{${2 * n}}{${n}} = \\frac{1}{${n + 1}} \\times \\frac{${2 * n}!}{${n}! \\cdot ${n}!}$$`,
            `Evaluating the combination gives exactly: $C_{${n}} = ${c}$.`
          ],
          trap: 'Do not multiply by $n!$ unless the question asks for distinct unlabeled binary trees with labeled nodes. For BSTs with given distinct keys, the keys must follow in-order traversal, so each structure corresponds to exactly ONE valid BST assignment.',
          formula: 'C_n = \\frac{1}{n+1}\\binom{2n}{n} = \\frac{(2n)!}{(n+1)! \\cdot n!}'
        }
      };
    }
  },

  // 3. Pipelining Speedup & Hazards (COA)
  {
    paper: 'CS',
    subject: 'coa',
    subtopic: 'Instruction Pipelining & Hazards',
    generate: () => {
      const stages = [4, 5, 6][Math.floor(Math.random() * 3)];
      const numInstructions = (Math.floor(Math.random() * 5) + 5) * 100; // 500 to 900
      const stallCycles = Math.floor(Math.random() * 30) + 20; // 20 to 50
      const cycleTime = 2; // 2 ns
      const nonPipelinedCycles = stages;

      const pipelinedCycles = (stages - 1) + numInstructions + stallCycles;
      const nonPipelinedTime = numInstructions * nonPipelinedCycles * cycleTime;
      const pipelinedTime = pipelinedCycles * cycleTime;
      const speedup = parseFloat((nonPipelinedTime / pipelinedTime).toFixed(2));

      return {
        id: `param_pipe_${Date.now()}`,
        paper: 'CS',
        subject: 'coa',
        subtopic: 'Pipelining & Speedup',
        type: 'NAT',
        marks: 2,
        difficulty: 'Medium',
        pyqReference: 'Modeled after GATE CS 2018 / 2021 (Pipeline Speedup & Stalls)',
        question: `A $${stages}$-stage pipeline has a cycle time of $${cycleTime}\\text{ ns}$. An execution of $${numInstructions}$ independent instructions produces a total of $${stallCycles}$ branch and data stall cycles. 
In the non-pipelined equivalent processor, each instruction takes exactly $${stages}$ cycles. 
Calculate the **Speedup factor** achieved by the pipeline (rounded to 2 decimal places).`,
        range: [parseFloat((speedup - 0.1).toFixed(2)), parseFloat((speedup + 0.1).toFixed(2))],
        exactAnswer: speedup,
        explanation: {
          concept: 'Pipelining Speedup with Pipeline Stalls',
          summary: 'Speedup is the ratio of non-pipelined execution time to pipelined execution time.',
          steps: [
            `Total instructions $N = ${numInstructions}$, Pipeline stages $k = ${stages}$, Stalls $S = ${stallCycles}$.`,
            `Pipelined cycles required: $C_{\\text{pipe}} = (k - 1) + N + S = (${stages} - 1) + ${numInstructions} + ${stallCycles} = ${pipelinedCycles}$ cycles.`,
            `Pipelined time: $T_{\\text{pipe}} = ${pipelinedCycles} \\times ${cycleTime}\\text{ ns} = ${pipelinedTime}\\text{ ns}$.`,
            `Non-pipelined execution: $T_{\\text{non}} = N \\times k \\times ${cycleTime}\\text{ ns} = ${numInstructions} \\times ${stages} \\times ${cycleTime} = ${nonPipelinedTime}\\text{ ns}$.`,
            `$$\\text{Speedup} = \\frac{T_{\\text{non}}}{T_{\\text{pipe}}} = \\frac{${nonPipelinedTime}}{${pipelinedTime}} = ${speedup}$$`
          ],
          trap: 'Remember that the first instruction requires $k$ cycles to fill the pipe; the remaining $(N - 1)$ instructions exit 1 per cycle unless stalls occur.',
          formula: '\\text{Speedup} = \\frac{N \\cdot k}{(k - 1) + N + \\text{Stalls}}'
        }
      };
    }
  },

  // 4. DA / ML: Precision, Recall, and F1-Score
  {
    paper: 'DA',
    subject: 'ml',
    subtopic: 'Supervised Learning',
    generate: () => {
      const TP = (Math.floor(Math.random() * 5) + 6) * 10; // 60 to 100
      const FP = (Math.floor(Math.random() * 3) + 1) * 10; // 10 to 30
      const FN = (Math.floor(Math.random() * 3) + 1) * 10; // 10 to 30
      const TN = 200;

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
        question: `A binary classifier was evaluated on a test dataset, yielding the following confusion matrix:
- True Positives (TP) = $${TP}$
- False Positives (FP) = $${FP}$
- False Negatives (FN) = $${FN}$
- True Negatives (TN) = $${TN}$
Calculate the **$F_1$-score** of the classifier (rounded off to 3 decimal places).`,
        range: [parseFloat((f1 - 0.01).toFixed(3)), parseFloat((f1 + 0.01).toFixed(3))],
        exactAnswer: f1,
        explanation: {
          concept: 'Harmonic Mean in F1-Score',
          summary: 'F1 is the harmonic mean of Precision and Recall.',
          steps: [
            `$\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}} = \\frac{${TP}}{${TP} + ${FP}} = ${(precision).toFixed(4)}$`,
            `$\\text{Recall} = \\frac{\\text{TP}}{\\text{TP} + \\text{FN}} = \\frac{${TP}}{${TP} + ${FN}} = ${(recall).toFixed(4)}$`,
            `$$F_1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2 \\cdot \\text{TP}}{2 \\cdot \\text{TP} + \\text{FP} + \\text{FN}}$$`,
            `$$F_1 = \\frac{2 \\times ${TP}}{2 \\times ${TP} + ${FP} + ${FN}} = \\frac{${2 * TP}}{${2 * TP + FP + FN}} = ${f1}$$`
          ],
          trap: 'F1-score is the HARMONIC mean, not the arithmetic mean. Arithmetic mean overestimates performance when precision or recall is low.',
          formula: 'F_1 = \\frac{2 \\cdot \\text{TP}}{2 \\cdot \\text{TP} + \\text{FP} + \\text{FN}}'
        }
      };
    }
  }
];

// Fallback question builder when a specific subject has no bank items
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
      { id: 'A', text: 'The necessary condition for optimality is always sufficient for general non-convex spaces.' },
      { id: 'B', text: 'The duality gap is strictly zero when Slater\'s condition holds for a convex optimization formulation.' },
      { id: 'C', text: 'Eigenvalues of any skew-symmetric real matrix must be strictly positive real numbers.' },
      { id: 'D', text: 'A system with non-minimum phase transfer function has all its poles and zeros strictly on the imaginary axis.' }
    ],
    correctAnswer: 'B',
    explanation: {
      concept: 'Convex Optimization & Duality',
      summary: 'Slater\'s condition guarantees strong duality (zero duality gap) in convex programs.',
      steps: [
        'Slater\'s condition states that if the primal problem is convex and strictly feasible, strong duality holds, meaning the primal and dual optimal objectives coincide (duality gap = 0).',
        'Option A is FALSE: Necessary first-order stationary conditions (like gradient = 0) are not sufficient without convexity.',
        'Option C is FALSE: Eigenvalues of real skew-symmetric matrices are purely imaginary or zero.',
        'Option D is FALSE: Non-minimum phase systems have zeros or poles in the right-half plane (RHP).'
      ],
      trap: 'Always verify if convexity is explicitly specified when evaluating duality and stationarity!',
      formula: 'd^* = p^* \\iff \\text{Strong Duality (Slater\'s Condition)}'
    }
  };
}

// Live Question Generator Function
export async function generateQuestion({ paperId, subjectId, subtopic, questionType, marks, geminiApiKey }) {
  // If Gemini API Key is provided, call Gemini API
  if (geminiApiKey && geminiApiKey.trim() !== '') {
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + geminiApiKey.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are the chief question setter for the Graduate Aptitude Test in Engineering (GATE) conducted by IISc Bangalore and IITs.
Generate a brand new, highly rigorous GATE examination question modeled directly after Previous Years Questions (PYQs).

SPECIFICATIONS:
- GATE Paper: ${paperId}
- Subject: ${subjectId}
- Subtopic: ${subtopic || 'High yield syllabus topic'}
- Question Type: ${questionType || 'MCQ'} (Must be one of 'MCQ', 'MSQ', or 'NAT')
- Marks: ${marks || 2} Marks

FORMAT REQUIREMENTS:
Return ONLY valid JSON matching this exact structure (no markdown fences, no backticks, just raw JSON):
{
  "id": "gemini_${Date.now()}",
  "paper": "${paperId}",
  "subject": "${subjectId}",
  "subtopic": "${subtopic || 'Key Topic'}",
  "type": "${questionType || 'MCQ'}",
  "marks": ${marks || 2},
  "difficulty": "Medium",
  "pyqReference": "Modeled after recent GATE ${paperId} PYQ patterns",
  "question": "The question body. Use KaTeX math syntax for all mathematical variables and equations, e.g. $O(n \\log n)$, $\\sum_{i=1}^n i$, etc.",
  "options": [
    {"id": "A", "text": "Option A text with KaTeX"},
    {"id": "B", "text": "Option B text with KaTeX"},
    {"id": "C", "text": "Option C text with KaTeX"},
    {"id": "D", "text": "Option D text with KaTeX"}
  ],
  "correctAnswer": "A",
  "range": [0, 0],
  "exactAnswer": 0,
  "explanation": {
    "concept": "Core concept name",
    "summary": "1-2 sentence core insight",
    "steps": [
      "Step 1 with math derivation",
      "Step 2 with math derivation",
      "Detailed justification of correct answer and why wrong options fail"
    ],
    "trap": "Warning about the common trick or blunder 70% of aspirants make in this question",
    "formula": "Primary formula in KaTeX"
  }
}

NOTE:
- If type is 'NAT', "options" can be empty array [], and provide "range": [min, max] and "exactAnswer".
- If type is 'MSQ', "correctAnswer" must be an array of strings like ["A", "C"].
- If type is 'MCQ', "correctAnswer" must be a single string like "B".
- Questions must be academically rigorous and strictly adhere to GATE syllabus depth.`
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
        if (text) {
          const parsed = JSON.parse(text);
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Gemini API error, falling back to local synthesizer:', err);
    }
  }

  // Local synthesizer: Look in parametric generators first
  const matchingParametric = PARAMETRIC_GENERATORS.filter(p => {
    if (paperId && p.paper !== paperId) return false;
    if (subjectId && p.subject !== subjectId) return false;
    return true;
  });

  if (matchingParametric.length > 0 && Math.random() > 0.3) {
    const generator = matchingParametric[Math.floor(Math.random() * matchingParametric.length)];
    return generator.generate();
  }

  // Look in curated bank
  const matchingBank = QUESTION_BANK.filter(q => {
    if (paperId && q.paper !== paperId) return false;
    if (subjectId && q.subject !== subjectId) return false;
    if (questionType && questionType !== 'ALL' && q.type !== questionType) return false;
    return true;
  });

  if (matchingBank.length > 0) {
    const selected = matchingBank[Math.floor(Math.random() * matchingBank.length)];
    // Clone with a unique timestamp id
    return { ...selected, id: `${selected.id}_${Date.now()}` };
  }

  // Fallback parametric generator if available across any subject
  if (PARAMETRIC_GENERATORS.length > 0) {
    const fallbackGen = PARAMETRIC_GENERATORS[Math.floor(Math.random() * PARAMETRIC_GENERATORS.length)];
    return fallbackGen.generate();
  }

  return buildDynamicFallbackQuestion(paperId, subjectId, subtopic);
}

// Grading & Evaluation Helper
export function evaluateAnswer(question, userAnswer) {
  let isCorrect = false;
  let marksAwarded = 0;
  let penalty = 0;

  if (question.type === 'MCQ') {
    isCorrect = userAnswer === question.correctAnswer;
    if (isCorrect) {
      marksAwarded = question.marks;
    } else if (userAnswer) {
      // GATE Negative marking: 1/3 penalty
      penalty = question.marks === 1 ? 0.33 : 0.66;
      marksAwarded = -penalty;
    }
  } else if (question.type === 'MSQ') {
    // Both must match exactly as sets
    const userSet = Array.isArray(userAnswer) ? [...userAnswer].sort() : [];
    const correctSet = Array.isArray(question.correctAnswer) ? [...question.correctAnswer].sort() : [];
    
    isCorrect = userSet.length === correctSet.length && userSet.every((val, index) => val === correctSet[index]);
    if (isCorrect) {
      marksAwarded = question.marks;
    } else {
      // In GATE, MSQs have NO negative marking and NO partial marks
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
      // In GATE, NATs have NO negative marking
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
