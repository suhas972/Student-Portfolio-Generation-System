/**
 * Student Interest Portfolio Report Generator
 * 5th Semester CSE Mini Project - Core Application Logic
 * Featuring: Question-Based & Manual Subject Interest Analysis System
 */

(function () {
  'use strict';

  // --- Core Constants & Configuration ---
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const TIME_SLOTS = [
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM'
  ];

  // Comprehensive Computer Science & Engineering Subjects Catalogue
  const ACTIVITIES = [
    { name: 'C Programming', category: 'Technical', color: '#2563eb', badgeClass: 'chip-technical', icon: '💻' },
    { name: 'Web Development', category: 'Technical', color: '#0284c7', badgeClass: 'chip-technical', icon: '🌐' },
    { name: 'Python', category: 'Technical', color: '#0d9488', badgeClass: 'chip-technical', icon: '🐍' },
    { name: 'AI / Machine Learning', category: 'Technical', color: '#7c3aed', badgeClass: 'chip-technical', icon: '🤖' },
    { name: 'Cybersecurity', category: 'Technical', color: '#dc2626', badgeClass: 'chip-technical', icon: '🛡️' },
    { name: 'Data Structures & Algorithms', category: 'Technical', color: '#4f46e5', badgeClass: 'chip-technical', icon: '⚡' },
    { name: 'Database Systems (DBMS)', category: 'Technical', color: '#0891b2', badgeClass: 'chip-technical', icon: '🗄️' },
    { name: 'Computer Networks', category: 'Technical', color: '#059669', badgeClass: 'chip-technical', icon: '📡' },
    { name: 'Operating Systems', category: 'Technical', color: '#d97706', badgeClass: 'chip-technical', icon: '⚙️' },
    { name: 'UI / UX Design', category: 'Creative', color: '#f43f5e', badgeClass: 'chip-creative', icon: '🎨' },
    { name: 'Cloud Computing & DevOps', category: 'Technical', color: '#2563eb', badgeClass: 'chip-technical', icon: '☁️' },
    { name: 'Mobile App Development', category: 'Technical', color: '#8b5cf6', badgeClass: 'chip-technical', icon: '📱' },
    { name: 'Music', category: 'Creative', color: '#ec4899', badgeClass: 'chip-creative', icon: '🎵' },
    { name: 'Sports & Fitness', category: 'Sports', color: '#16a34a', badgeClass: 'chip-sports', icon: '⚽' }
  ];

  const ACTIVITY_MAP = {};
  ACTIVITIES.forEach(a => { ACTIVITY_MAP[a.name] = a; });

  // Aliases for legacy activity names to ensure backwards compatibility
  ACTIVITY_MAP['Drawing / Design'] = ACTIVITY_MAP['UI / UX Design'];
  ACTIVITY_MAP['Photography'] = ACTIVITY_MAP['UI / UX Design'];
  ACTIVITY_MAP['Cricket'] = ACTIVITY_MAP['Sports & Fitness'];
  ACTIVITY_MAP['Football'] = ACTIVITY_MAP['Sports & Fitness'];
  ACTIVITY_MAP['Gaming'] = ACTIVITY_MAP['Mobile App Development'];
  ACTIVITY_MAP['Reading'] = ACTIVITY_MAP['Data Structures & Algorithms'];
  ACTIVITY_MAP['Public Speaking'] = ACTIVITY_MAP['Web Development'];
  ACTIVITY_MAP['Other'] = ACTIVITY_MAP['C Programming'];

  // Detailed Knowledge Base & Career Pathways for each domain
  const ACTIVITY_ANALYSIS_DATA = {
    'C Programming': {
      icon: '💻',
      academicValue: 'Core low-level systems programming that builds rigorous intuition for memory models, pointers, operating system kernels, and algorithmic execution efficiency.',
      careerPathways: 'Systems Software Engineer, Embedded Systems Developer, Firmware Engineer, OS Kernel Developer, Game Engine Programmer.',
      recommendations: 'Implement custom data structures from scratch (linked lists, trees, hash tables), build a custom memory allocator, and solve medium-to-hard algorithmic challenges to strengthen competitive programming skills.'
    },
    'Web Development': {
      icon: '🌐',
      academicValue: 'Demonstrates modern full-stack application development, RESTful API design, state synchronization, responsive interfaces, and client-server architectures.',
      careerPathways: 'Full Stack Web Developer, Frontend Architect, Backend Software Engineer, UI/UX Technologist, Cloud App Developer.',
      recommendations: 'Build a production-grade full stack web app with relational/NoSQL persistence, implement JWT-based user authentication, deploy to live hosting, and showcase on GitHub.'
    },
    'Python': {
      icon: '🐍',
      academicValue: 'High-leverage versatility in rapid scripting, data manipulation, machine learning integration, asynchronous web servers, and automation pipelines.',
      careerPathways: 'Python Software Engineer, Automation & DevOps Engineer, Data Analyst, Applied AI Developer.',
      recommendations: 'Construct scalable microservices using FastAPI, automate repetitive operating system tasks, and contribute to open-source Python utility libraries.'
    },
    'AI / Machine Learning': {
      icon: '🤖',
      academicValue: 'High-demand frontier combining multivariate calculus, linear algebra, statistical learning theory, neural network architectures, and predictive analytics.',
      careerPathways: 'Machine Learning Engineer, Data Scientist, Deep Learning Specialist, NLP / Computer Vision Engineer, AI Research Associate.',
      recommendations: 'Train supervised and unsupervised models with PyTorch or Scikit-learn, compete in Kaggle competitions, and implement modern transformer pipelines.'
    },
    'Cybersecurity': {
      icon: '🛡️',
      academicValue: 'Crucial discipline mastering network defense, cryptography, vulnerability assessment, secure coding patterns, and resilience against adversarial exploits.',
      careerPathways: 'Cybersecurity Analyst, Penetration Tester, SOC Security Engineer, Incident Responder, Information Security Consultant.',
      recommendations: 'Solve capture-the-flag (CTF) challenges on TryHackMe or HackTheBox, audit source code for OWASP Top 10 vulnerabilities, and configure secure firewall proxies.'
    },
    'Data Structures & Algorithms': {
      icon: '⚡',
      academicValue: 'Foundational bedrock of computer science establishing time-space complexity trade-offs, graph traversals, dynamic programming, and problem decomposition.',
      careerPathways: 'Algorithms Engineer, Core Software Engineer, High-Frequency Trading Engineer, Quantitative Developer.',
      recommendations: 'Solve 150+ medium LeetCode problems across graphs, dynamic programming, and heaps; participate in Codeforces contests; build a visual algorithm simulator.'
    },
    'Database Systems (DBMS)': {
      icon: '🗄️',
      academicValue: 'Essential data persistence architecture mastering relational algebra, SQL optimization, ACID transactions, B-Tree indexing, and distributed storage engines.',
      careerPathways: 'Database Administrator (DBA), Data Engineer, Backend Data Architect, Storage Engine Developer.',
      recommendations: 'Design normalized 3NF relational schemas with complex JOIN queries; inspect EXPLAIN query execution plans; build a miniature key-value store using B-Trees.'
    },
    'Computer Networks': {
      icon: '📡',
      academicValue: 'Critical communication framework covering OSI & TCP/IP stack layers, socket programming, routing protocols, subnetting, and packet transmission security.',
      careerPathways: 'Network Engineer, Network Security Architect, Cloud Infrastructure Engineer, Protocol Developer.',
      recommendations: 'Capture and inspect live TCP handshakes using Wireshark, write a multi-threaded socket chat server in C or Python, and configure virtual subnets with CIDR.'
    },
    'Operating Systems': {
      icon: '⚙️',
      academicValue: 'Comprehensive study of hardware abstraction, process scheduling, virtual memory paging, deadlock prevention, system calls, and file system inodes.',
      careerPathways: 'OS Kernel Engineer, Systems Software Engineer, Linux Infrastructure Specialist, Virtualization Developer.',
      recommendations: 'Write custom Unix shell in C with pipe and redirection support; simulate CPU scheduling algorithms (Round Robin, SJF); implement page replacement policies.'
    },
    'UI / UX Design': {
      icon: '🎨',
      academicValue: 'Combines human-computer interaction (HCI) empathy, typography hierarchy, design systems, interactive Figma prototyping, and accessible interface engineering.',
      careerPathways: 'UI/UX Designer, Product Designer, Design Technologist, Frontend Design Systems Engineer.',
      recommendations: 'Create a full interactive design system in Figma with WCAG 2.1 AA accessibility compliance; conduct usability testing with peers; translate components to clean CSS.'
    },
    'Cloud Computing & DevOps': {
      icon: '☁️',
      academicValue: 'Modern cloud infrastructure paradigm focusing on Docker containerization, Kubernetes orchestration, CI/CD pipeline automation, and serverless computing.',
      careerPathways: 'Cloud Solutions Architect, DevOps Engineer, Site Reliability Engineer (SRE), Platform Engineer.',
      recommendations: 'Containerize multi-tier apps with Docker Compose; automate CI/CD workflows using GitHub Actions; deploy containerized services to AWS or Render.'
    },
    'Mobile App Development': {
      icon: '📱',
      academicValue: 'Application engineering for touch interfaces, mobile lifecycle management, device hardware sensors, offline caching, and cross-platform native execution.',
      careerPathways: 'Mobile Application Developer (Flutter/React Native), Android Engineer, iOS Developer, Mobile Architect.',
      recommendations: 'Build a mobile app with local SQLite/Hive caching, camera/GPS integration, and push notification sync; publish a signed APK on GitHub releases.'
    },
    'Music': {
      icon: '🎵',
      academicValue: 'Strengthens neuroplasticity, auditory pattern recognition, spatial-temporal reasoning, structural discipline, and provides vital stress relief during engineering studies.',
      careerPathways: 'Audio DSP Engineer, Sound Designer, Creative Technologist, Multimedia Audio Producer.',
      recommendations: 'Balance academic coding sprints with deliberate acoustic/instrumental practice, explore digital audio workstations (DAW), and experiment with audio signal processing.'
    },
    'Sports & Fitness': {
      icon: '⚽',
      academicValue: 'Builds cardiovascular endurance, mental resilience, rapid situational decision-making under pressure, and collaborative teamwork discipline.',
      careerPathways: 'Sports Analytics Specialist, Athletic Coordinator, Physical Performance Analyst, Team Leadership Specialist.',
      recommendations: 'Engage in competitive intramural sports play; maintain consistent workout routines to counteract screen fatigue; analyze game statistics using data analytics.'
    }
  };

  // --- Comprehensive 10-Question Diagnostic Assessment Database ---
  // Each subject contains 10 rigorous, domain-specific questions with 5 weighted options (10, 7.5, 5, 2.5, 0 pts)
  const SUBJECT_QUESTIONS = {
    'C Programming': [
      { id: 1, tag: 'Memory & Pointers', text: 'How excited do you feel when designing pointers, memory address arithmetic, and dynamic allocation (malloc/free)?' },
      { id: 2, tag: 'Hardware Intuition', text: 'How much do you enjoy understanding how your code maps to CPU registers, stack frames, and assembly instructions?' },
      { id: 3, tag: 'Low-Level Debugging', text: 'When encountering a "Segmentation Fault (core dumped)" or memory leak, how eager are you to use GDB or Valgrind?' },
      { id: 4, tag: 'Systems Building', text: 'How motivated are you to build low-level systems projects such as a custom memory allocator, command-line shell, or parser in C?' },
      { id: 5, tag: 'Kernel & POSIX', text: 'How interested are you in learning operating system kernels, Linux system calls, POSIX threads, and device drivers?' },
      { id: 6, tag: 'Bitwise Logic', text: 'How comfortable and intrigued are you when working with bitwise operators (&, |, ^, <<), masks, and byte-level protocols?' },
      { id: 7, tag: 'Data Structures', text: 'How interested are you in implementing fundamental data structures (linked lists, binary trees, hash maps) from scratch in pure C?' },
      { id: 8, tag: 'Embedded Systems', text: 'How enthusiastic are you about writing firmware for microcontrollers (Arduino, STM32, ARM) or embedded IoT hardware in C?' },
      { id: 9, tag: 'Compilers & Tooling', text: 'How curious are you about compiler internals, linkers, object files (.o), static/shared libraries (.a, .so), and Makefiles?' },
      { id: 10, tag: 'Career Alignment', text: 'How strongly do you consider pursuing a career in Systems Software, Embedded Firmware, OS Development, or Game Engines?' }
    ],
    'Web Development': [
      { id: 1, tag: 'UI & Layout', text: 'How much do you enjoy designing interactive user interfaces using modern HTML5 semantic elements and CSS Flexbox/Grid?' },
      { id: 2, tag: 'Modern JavaScript', text: 'How enthusiastic are you about writing modern JavaScript (ES6+), handling async events (async/await), and manipulating the DOM?' },
      { id: 3, tag: 'Frontend Frameworks', text: 'How eager are you to build web applications using modern component frameworks like React, Next.js, or Vue.js?' },
      { id: 4, tag: 'Backend REST APIs', text: 'How motivated are you to design and implement backend RESTful APIs, routing, and controller logic using Node.js or Express?' },
      { id: 5, tag: 'Database Integration', text: 'How interested are you in connecting web applications with databases (MongoDB, PostgreSQL, MySQL) to perform full CRUD operations?' },
      { id: 6, tag: 'Authentication & Security', text: 'How excited are you to implement secure user authentication systems using JWT tokens, OAuth providers, and bcrypt hashing?' },
      { id: 7, tag: 'Frontend Debugging', text: 'When debugging broken responsive layouts, CSS alignment quirks, or failed network API calls, how engaged do you feel?' },
      { id: 8, tag: 'Web Optimization', text: 'How enthusiastic are you about optimizing web performance (lazy loading, CDN asset caching, bundle reduction)?' },
      { id: 9, tag: 'Cloud Deployment', text: 'How interested are you in deploying full-stack web applications to live cloud hosting (Vercel, Render, AWS) with CI/CD?' },
      { id: 10, tag: 'Career Alignment', text: 'How strongly do you envision yourself working as a Full-Stack Web Developer, Frontend Architect, or Backend Cloud Engineer?' }
    ],
    'Python': [
      { id: 1, tag: 'Language Ergonomics', text: 'How much do you appreciate Python’s clean, expressive syntax for rapid prototyping and solving programming challenges?' },
      { id: 2, tag: 'Task Automation', text: 'How interested are you in utilizing Python for automating repetitive desktop, file organization, or data extraction workflows?' },
      { id: 3, tag: 'Data Science Stack', text: 'How enthusiastic are you about working with data manipulation and analysis libraries like Pandas, NumPy, and Matplotlib?' },
      { id: 4, tag: 'Microservices & APIs', text: 'How motivated are you to build high-performance web backends or microservices using modern Python frameworks like FastAPI or Flask?' },
      { id: 5, tag: 'Web Scraping', text: 'How interested are you in writing web scrapers or network crawlers using BeautifulSoup, Scrapy, or Playwright to collect datasets?' },
      { id: 6, tag: 'Advanced Idioms', text: 'How intrigued are you by Python’s advanced features such as decorators, generator functions, list comprehensions, and context managers?' },
      { id: 7, tag: 'Applied ML Tools', text: 'How eager are you to train and evaluate machine learning or data science pipelines using Python’s Scikit-learn or PyTorch libraries?' },
      { id: 8, tag: 'Language Preference', text: 'When building a quick utility script or project, how natural does it feel for you to choose Python as your go-to language?' },
      { id: 9, tag: 'Concurrency & Packages', text: 'How curious are you about asynchronous Python programming with asyncio, concurrency, and building Python packages for PyPI?' },
      { id: 10, tag: 'Career Alignment', text: 'How strongly do you see yourself working as a Python Developer, Data Analyst, Automation Engineer, or Applied AI Specialist?' }
    ],
    'AI / Machine Learning': [
      { id: 1, tag: 'Pattern Discovery', text: 'How fascinated are you by teaching algorithms to recognize patterns and make predictions from raw data without explicit rules?' },
      { id: 2, tag: 'Math Foundations', text: 'How interested are you in understanding mathematical concepts behind ML (linear algebra, matrix multiplication, gradient descent)?' },
      { id: 3, tag: 'Supervised Learning', text: 'How much do you enjoy exploring supervised algorithms like linear/logistic regression, decision trees, random forests, and SVMs?' },
      { id: 4, tag: 'Deep Neural Networks', text: 'How motivated are you to design and train artificial neural networks and deep learning models using PyTorch, TensorFlow, or Keras?' },
      { id: 5, tag: 'Feature Engineering', text: 'How eager are you to clean messy datasets, perform exploratory data analysis (EDA), and engineer informative feature sets?' },
      { id: 6, tag: 'Computer Vision', text: 'How interested are you in computer vision applications (object detection, image segmentation, facial recognition) using CNNs and OpenCV?' },
      { id: 7, tag: 'NLP & LLMs', text: 'How curious are you about Natural Language Processing (NLP), sentiment analysis, large language models (LLMs), and transformer attention?' },
      { id: 8, tag: 'Hyperparameter Tuning', text: 'When an ML model overfits or exhibits poor validation accuracy, how excited are you to tune hyperparameters and regularize it?' },
      { id: 9, tag: 'Competitions & Datasets', text: 'How interested are you in solving competitive machine learning challenges on Kaggle or working on real-world predictive datasets?' },
      { id: 10, tag: 'Career Alignment', text: 'How strongly do you envision pursuing a career as a Machine Learning Engineer, Data Scientist, or AI Research Specialist?' }
    ],
    'Cybersecurity': [
      { id: 1, tag: 'Attack & Defense', text: 'How intrigued are you by how computer systems, web applications, and network protocols get breached and how to defend them?' },
      { id: 2, tag: 'Packet Inspection', text: 'How interested are you in capturing and analyzing raw network packet streams using Wireshark to inspect TCP/IP payloads?' },
      { id: 3, tag: 'Cryptography', text: 'How motivated are you to learn about cryptographic encryption algorithms (AES, RSA), hashing functions (SHA-256), and PKI?' },
      { id: 4, tag: 'CTF Challenges', text: 'How excited are you to practice ethical hacking and security puzzle-solving on Capture-The-Flag (CTF) platforms like TryHackMe?' },
      { id: 5, tag: 'Web Exploitation', text: 'How curious are you about hunting for and mitigating common web vulnerabilities like SQL Injection (SQLi), XSS, and CSRF?' },
      { id: 6, tag: 'System Hardening', text: 'How interested are you in understanding operating system access controls, Linux permissions, firewalls, and zero-trust security?' },
      { id: 7, tag: 'Code Auditing', text: 'How engaged do you feel when auditing source code for security flaws, buffer overflows, or authentication bypass loopholes?' },
      { id: 8, tag: 'Malware & Binaries', text: 'How enthusiastic are you about exploring malware analysis, reverse engineering binary executables, and threat tactics?' },
      { id: 9, tag: 'Incident Response', text: 'How interested are you in incident response, digital forensics, threat intelligence, and building automated security monitoring?' },
      { id: 10, tag: 'Career Alignment', text: 'How strongly do you aspire to become a Cybersecurity Analyst, Penetration Tester, SOC Engineer, or Security Consultant?' }
    ],
    'Data Structures & Algorithms': [
      { id: 1, tag: 'Big-O Complexity', text: 'How much do you enjoy analyzing the time complexity and space complexity (Big-O notation) of different algorithms?' },
      { id: 2, tag: 'Optimization Drive', text: 'When solving an algorithmic puzzle, how excited are you to discover an optimal O(N log N) or O(N) solution over brute force?' },
      { id: 3, tag: 'Recursion Strategies', text: 'How confident and interested do you feel when designing recursive functions and divide-and-conquer strategies?' },
      { id: 4, tag: 'Dynamic Programming', text: 'How motivated are you to solve complex dynamic programming problems using memoization and bottom-up tabulation matrices?' },
      { id: 5, tag: 'Trees & Graphs', text: 'How fascinated are you by tree and graph traversal algorithms, including BFS, DFS, and Dijkstra’s shortest path algorithm?' },
      { id: 6, tag: 'Advanced Structures', text: 'How interested are you in implementing self-balancing trees (AVL, Red-Black) and priority queues / binary heaps?' },
      { id: 7, tag: 'Daily Practice', text: 'How much do you enjoy tackling daily coding problems on platforms like LeetCode, Codeforces, HackerRank, or GeeksforGeeks?' },
      { id: 8, tag: 'Hashing & Bit Tricks', text: 'How intrigued are you by hash table collision resolution techniques (chaining, open addressing) and bit-manipulation tricks?' },
      { id: 9, tag: 'Competitive Contests', text: 'How enthusiastic are you about participating in competitive programming contests and college coding hackathons?' },
      { id: 10, tag: 'Career Alignment', text: 'How strongly do you consider mastery of DSA as a core pillar of your technical identity and dream placement preparation?' }
    ],
    'Database Systems (DBMS)': [
      { id: 1, tag: 'SQL Querying', text: 'How much do you enjoy writing complex SQL queries involving multiple table JOINs, subqueries, groupings, and aggregations?' },
      { id: 2, tag: 'Schema Design', text: 'How interested are you in relational database schema design, entity-relationship (ER) modeling, and foreign key constraints?' },
      { id: 3, tag: 'Normalization', text: 'How motivated are you to apply database normalization rules (1NF, 2NF, 3NF, BCNF) to eliminate redundant data and anomalies?' },
      { id: 4, tag: 'Index Optimization', text: 'How curious are you about B-Tree and Hash indexing strategies to dramatically speed up query retrieval times on large tables?' },
      { id: 5, tag: 'ACID Transactions', text: 'How interested are you in understanding ACID properties (Atomicity, Consistency, Isolation, Durability) and transaction logs?' },
      { id: 6, tag: 'Concurrency & Locks', text: 'How intrigued are you by database concurrency control, row/table locking, write-ahead logging (WAL), and deadlock resolution?' },
      { id: 7, tag: 'Stored Logic', text: 'How excited are you to write database triggers, stored procedures, views, and automated database constraint validations?' },
      { id: 8, tag: 'NoSQL & Distributed', text: 'How interested are you in exploring NoSQL document stores (MongoDB), key-value stores (Redis), and distributed architectures?' },
      { id: 9, tag: 'Execution Plans', text: 'When a query runs slowly, how eager are you to inspect the EXPLAIN query execution plan and tune indexes to optimize execution?' },
      { id: 10, tag: 'Career Alignment', text: 'How strongly do you consider career opportunities as a Database Administrator (DBA), Backend Data Architect, or Data Engineer?' }
    ],
    'Computer Networks': [
      { id: 1, tag: 'Internet Mechanics', text: 'How fascinated are you by how data packets travel across the global Internet from browser to server in milliseconds?' },
      { id: 2, tag: 'OSI & TCP/IP', text: 'How interested are you in understanding the 7-layer OSI model and 4-layer TCP/IP protocol suite in concrete technical detail?' },
      { id: 3, tag: 'Subnetting & CIDR', text: 'How confident and interested do you feel calculating IPv4/IPv6 subnets, network masks, broadcast addresses, and CIDR notation?' },
      { id: 4, tag: 'Routing Protocols', text: 'How motivated are you to understand how routing protocols (OSPF, BGP, RIP) determine the shortest and most resilient paths?' },
      { id: 5, tag: 'TCP Congestion', text: 'How curious are you about the mechanics of TCP 3-way handshake, sequence numbers, flow control, and congestion algorithms?' },
      { id: 6, tag: 'Core Protocols', text: 'How interested are you in learning how DNS resolution, DHCP assignment, and HTTP/HTTPS handshakes function behind the scenes?' },
      { id: 7, tag: 'Socket Programming', text: 'How excited are you to write low-level network socket programs (in C, Python, or Java) enabling multi-client communication?' },
      { id: 8, tag: 'Hardware Devices', text: 'How intrigued are you by network hardware devices: routers, Layer 2/3 switches, NAT gateways, VLANs, and firewall filters?' },
      { id: 9, tag: 'Modern Networking', text: 'How interested are you in modern networking paradigms such as Software-Defined Networking (SDN), CDN caching, and 5G/IoT?' },
      { id: 10, tag: 'Career Alignment', text: 'How strongly do you envision pursuing roles such as Network Engineer, Cloud Infrastructure Specialist, or Network Architect?' }
    ],
    'Operating Systems': [
      { id: 1, tag: 'CPU Scheduling', text: 'How intrigued are you by how an operating system shares a single CPU among concurrent processes through context switching?' },
      { id: 2, tag: 'Scheduling Algorithms', text: 'How interested are you in studying CPU scheduling algorithms (Round Robin, Shortest Job First, Multi-Level Feedback Queues)?' },
      { id: 3, tag: 'Concurrency & Locks', text: 'How motivated are you to understand multithreading, race conditions, mutex locks, spinlocks, and Dijkstra’s semaphores?' },
      { id: 4, tag: 'Virtual Memory', text: 'How curious are you about how virtual memory, page tables, Translation Lookaside Buffers (TLB), and LRU paging work?' },
      { id: 5, tag: 'File Systems', text: 'How fascinated are you by how file systems (ext4, NTFS) organize files, directories, inodes, disk blocks, and allocation tables?' },
      { id: 6, tag: 'Kernel vs User Space', text: 'How eager are you to learn about system calls (fork, exec, wait, mmap) and the distinction between user space and kernel mode?' },
      { id: 7, tag: 'Deadlock Handling', text: 'How interested are you in understanding deadlocks: Coffman conditions, Banker’s algorithm for avoidance, and detection mechanisms?' },
      { id: 8, tag: 'Linux & Shell', text: 'How much do you enjoy working in the Linux terminal, writing Bash shell scripts, and utilizing pipes (|), redirection, and grep?' },
      { id: 9, tag: 'Virtualization & Containers', text: 'How curious are you about OS-level virtualization, hypervisors, and container isolation technologies like Docker (cgroups, namespaces)?' },
      { id: 10, tag: 'Career Alignment', text: 'How strongly do you aspire to work on OS Kernel development, Systems Performance Engineering, or Infrastructure Reliability?' }
    ],
    'UI / UX Design': [
      { id: 1, tag: 'Interface Aesthetics', text: 'How much do you enjoy designing visually stunning, intuitive software interfaces with deliberate layout, typography, and color?' },
      { id: 2, tag: 'User Empathy', text: 'How interested are you in conducting user research, empathy mapping, and creating user personas before writing code?' },
      { id: 3, tag: 'Figma Prototyping', text: 'How motivated are you to create wireframes, interactive component prototypes, and design systems using tools like Figma?' },
      { id: 4, tag: 'Visual Hierarchy', text: 'How attentive are you to spacing scales, visual hierarchy, micro-typography, and ensuring interfaces feel polished and balanced?' },
      { id: 5, tag: 'Usability Heuristics', text: 'How curious are you about human-computer interaction (HCI) heuristics, Nielsen’s 10 usability principles, and cognitive load reduction?' },
      { id: 6, tag: 'Micro-Animations', text: 'How passionate are you about designing smooth micro-animations, button hover states, and seamless page transition feedback?' },
      { id: 7, tag: 'Accessibility Standards', text: 'How dedicated are you to accessibility standards (WCAG 2.1 AA/AAA), color contrast checks, and screen reader-friendly designs?' },
      { id: 8, tag: 'Design Mockups', text: 'How much do you enjoy transforming rough hand-drawn whiteboard sketches into pixel-perfect responsive digital mockups?' },
      { id: 9, tag: 'Design-to-Code', text: 'How excited are you to bridge design and engineering by translating Figma design tokens into clean HTML/CSS components?' },
      { id: 10, tag: 'Career Alignment', text: 'How strongly do you consider career opportunities as a UI/UX Designer, Product Designer, or Frontend Design Technologist?' }
    ],
    'Cloud Computing & DevOps': [
      { id: 1, tag: 'Cloud Platforms', text: 'How interested are you in understanding cloud infrastructure services (AWS EC2, S3, RDS, Azure, Google Cloud Platform)?' },
      { id: 2, tag: 'Docker Containers', text: 'How motivated are you to containerize software applications using Docker to ensure consistent execution across environments?' },
      { id: 3, tag: 'CI/CD Automation', text: 'How excited are you to build automated Continuous Integration & Continuous Deployment (CI/CD) pipelines using GitHub Actions?' },
      { id: 4, tag: 'Serverless Tech', text: 'How curious are you about serverless architecture, AWS Lambda functions, and event-driven cloud application backends?' },
      { id: 5, tag: 'Infrastructure as Code', text: 'How intrigued are you by Infrastructure as Code (IaC) tools like Terraform or CloudFormation to provision servers programmatically?' },
      { id: 6, tag: 'Kubernetes Orchestration', text: 'How interested are you in Kubernetes container orchestration, pod auto-scaling, service discovery, and rolling zero-downtime updates?' },
      { id: 7, tag: 'Observability & Metrics', text: 'How eager are you to set up cloud monitoring, centralized logging (Prometheus, Grafana), and automated error alerts?' },
      { id: 8, tag: 'Cloud VPC & Networks', text: 'How motivated are you to understand cloud networking: Virtual Private Clouds (VPC), subnets, load balancers, and CloudFront CDNs?' },
      { id: 9, tag: 'Cloud Security', text: 'How proactive are you regarding cloud security: IAM least-privilege permissions, secret management, and SSL certificates?' },
      { id: 10, tag: 'Career Alignment', text: 'How strongly do you see yourself working as a Cloud Engineer, DevOps Specialist, Site Reliability Engineer (SRE), or Platform Architect?' }
    ],
    'Mobile App Development': [
      { id: 1, tag: 'Mobile Ecosystem', text: 'How excited are you by the idea of creating mobile applications that run smoothly in the palm of millions of users’ hands?' },
      { id: 2, tag: 'Cross-Platform Frameworks', text: 'How interested are you in cross-platform mobile frameworks like Flutter (Dart) or React Native (JavaScript/TypeScript)?' },
      { id: 3, tag: 'Native Development', text: 'How motivated are you to learn native mobile development (Kotlin for Android or Swift for iOS)?' },
      { id: 4, tag: 'Touch Gestures', text: 'How much do you enjoy designing touch-first mobile interfaces with pull-to-refresh, bottom navigation sheets, and swipe gestures?' },
      { id: 5, tag: 'Device Hardware APIs', text: 'How curious are you about integrating native hardware sensors: GPS location, camera, accelerometer, and biometrics?' },
      { id: 6, tag: 'Offline Storage', text: 'How interested are you in managing mobile application state, local SQLite/Room/Hive database caching, and offline data sync?' },
      { id: 7, tag: 'Push Notifications', text: 'How enthusiastic are you about implementing mobile push notifications using Firebase Cloud Messaging (FCM)?' },
      { id: 8, tag: 'Screen Responsiveness', text: 'When testing on various mobile screen sizes and aspect ratios, how committed are you to ensuring seamless responsiveness?' },
      { id: 9, tag: 'Store Publishing', text: 'How curious are you about the mobile release lifecycle: app bundling, Google Play Console / Apple App Store submission?' },
      { id: 10, tag: 'Career Alignment', text: 'How strongly do you envision pursuing a career as a Mobile Application Engineer, Android Developer, or iOS Specialist?' }
    ],
    'Music': [
      { id: 1, tag: 'Instrumental Practice', text: 'How passionate are you about playing musical instruments (guitar, keyboard, drums, flute) or vocal performance?' },
      { id: 2, tag: 'DAW & Production', text: 'How interested are you in exploring digital audio production, synthesizers, MIDI sequencing, and Digital Audio Workstations?' },
      { id: 3, tag: 'Cognitive Balance', text: 'How much does listening to or performing music stimulate your cognitive focus, analytical thinking, and mental clarity?' },
      { id: 4, tag: 'Acoustic Science', text: 'How curious are you about the science of sound: audio frequencies, harmonics, digital signal processing (DSP), and resonance?' },
      { id: 5, tag: 'Music Theory', text: 'How interested are you in understanding music theory: musical scales, interval relationships, chord progressions, and rhythms?' },
      { id: 6, tag: 'Creative Outlet', text: 'How much do you value having a dedicated creative arts outlet alongside your rigorous engineering and computer science studies?' },
      { id: 7, tag: 'Original Composition', text: 'How enthusiastic are you about composing original melodies, mixing audio tracks, or designing custom sound effects?' },
      { id: 8, tag: 'Disciplined Routine', text: 'How often do you dedicate disciplined weekly hours to practice an instrument, sketching, or creative design to hone your craft?' },
      { id: 9, tag: 'Ensemble Collaboration', text: 'How excited are you to collaborate with fellow students in musical ensembles, college cultural fest bands, or multimedia projects?' },
      { id: 10, tag: 'Holistic Identity', text: 'How important is sustaining a vibrant creative expression profile to your personal well-being and engineering journey?' }
    ],
    'Sports & Fitness': [
      { id: 1, tag: 'Athletic Engagement', text: 'How actively do you engage in team sports (cricket, football, basketball) or individual athletic activities each week?' },
      { id: 2, tag: 'Physical Stamina', text: 'How much do you value physical conditioning, cardiovascular endurance, and maintaining high stamina during academic semesters?' },
      { id: 3, tag: 'Tactical Strategy', text: 'How naturally do you take on team leadership, on-field tactical strategy, and motivating teammates under match pressure?' },
      { id: 4, tag: 'Sports Analytics', text: 'How intrigued are you by the intersection of computer science and sports analytics (player metrics, match statistics, heatmaps)?' },
      { id: 5, tag: 'Mental Alertness', text: 'How strongly do you believe that regular physical exertion sharpens your mental alertness, memory, and debugging endurance?' },
      { id: 6, tag: 'Consistent Exercise', text: 'How committed are you to consistent physical exercise habits: gym workouts, jogging, yoga, or intramural sports tournaments?' },
      { id: 7, tag: 'Sportsmanship & Grit', text: 'How well do you handle sportsmanship: maintaining composure during defeat, analyzing tactical mistakes, and bouncing back?' },
      { id: 8, tag: 'Reflex Coordination', text: 'How much do you enjoy fast-paced reflex coordination and split-second tactical spatial decision-making on the field?' },
      { id: 9, tag: 'Screen-Life Balance', text: 'How proactively do you balance physical activity slots against long sedentary hours of programming and screen exposure?' },
      { id: 10, tag: 'Wellness Discipline', text: 'How essential is physical fitness, sports discipline, and athletic camaraderie to your overall college life and engineering journey?' }
    ]
  };

  // 5 Standard Weighted Answer Options for Every Question
  const QUIZ_OPTIONS = [
    { key: 'A', stars: '⭐⭐⭐⭐⭐', label: 'Strongly Passionate / Love this', points: 10.0, desc: 'Extremely interested; frequently write projects and explore beyond the syllabus.' },
    { key: 'B', stars: '⭐⭐⭐⭐', label: 'High Interest / Enjoy it', points: 7.5, desc: 'Very interested; enjoy lab sessions, exercises, and building hands-on projects.' },
    { key: 'C', stars: '⭐⭐⭐', label: 'Moderate Interest / Neutral', points: 5.0, desc: 'Comfortable with this subject when required by the syllabus and exams.' },
    { key: 'D', stars: '⭐⭐', label: 'Mild / Reluctant Interest', points: 2.5, desc: 'Minimal enthusiasm; only do the minimum necessary to clear coursework.' },
    { key: 'E', stars: '⭐', label: 'Low / No Interest', points: 0.0, desc: 'No interest; prefer avoiding this domain in favor of other pursuits.' }
  ];

  // Default Student Profile
  const DEFAULT_PROFILE = {
    name: 'Sahana K.',
    studentId: '1MS22CS095',
    branch: 'Computer Science & Engineering',
    semester: '5th Semester',
    college: 'Department of Computer Science & Engineering',
    academicYear: '2024–2025'
  };

  // Demo Timetable Data for Schedule Compatibility
  const DEMO_TIMETABLE = {
    'Monday': { '9:00 AM - 10:00 AM': 'C Programming', '10:00 AM - 11:00 AM': 'Music', '11:00 AM - 12:00 PM': 'C Programming', '2:00 PM - 3:00 PM': 'Sports & Fitness', '4:00 PM - 5:00 PM': 'Web Development', '5:00 PM - 6:00 PM': 'Web Development' },
    'Tuesday': { '9:00 AM - 10:00 AM': 'C Programming', '10:00 AM - 11:00 AM': 'Music', '11:00 AM - 12:00 PM': 'Web Development', '2:00 PM - 3:00 PM': 'Sports & Fitness', '4:00 PM - 5:00 PM': 'Web Development', '6:00 PM - 7:00 PM': 'C Programming' },
    'Wednesday': { '8:00 AM - 9:00 AM': 'Data Structures & Algorithms', '10:00 AM - 11:00 AM': 'C Programming', '11:00 AM - 12:00 PM': 'C Programming', '3:00 PM - 4:00 PM': 'Music', '5:00 PM - 6:00 PM': 'Web Development' },
    'Thursday': { '9:00 AM - 10:00 AM': 'C Programming', '10:00 AM - 11:00 AM': 'Music', '2:00 PM - 3:00 PM': 'Sports & Fitness', '3:00 PM - 4:00 PM': 'Sports & Fitness', '4:00 PM - 5:00 PM': 'Web Development', '5:00 PM - 6:00 PM': 'Web Development' },
    'Friday': { '9:00 AM - 10:00 AM': 'C Programming', '10:00 AM - 11:00 AM': 'Music', '12:00 PM - 1:00 PM': 'Web Development', '2:00 PM - 3:00 PM': 'Sports & Fitness', '4:00 PM - 5:00 PM': 'Web Development', '6:00 PM - 7:00 PM': 'C Programming' },
    'Saturday': { '9:00 AM - 10:00 AM': 'C Programming', '10:00 AM - 11:00 AM': 'Music', '11:00 AM - 12:00 PM': 'C Programming', '2:00 PM - 3:00 PM': 'Sports & Fitness', '3:00 PM - 4:00 PM': 'Data Structures & Algorithms', '4:00 PM - 5:00 PM': 'Data Structures & Algorithms', '5:00 PM - 6:00 PM': 'Web Development' },
    'Sunday': { '10:00 AM - 11:00 AM': 'Music', '11:00 AM - 12:00 PM': 'Music', '3:00 PM - 4:00 PM': 'Data Structures & Algorithms', '5:00 PM - 6:00 PM': 'C Programming' }
  };

  // Application State
  const state = {
    profile: Object.assign({}, DEFAULT_PROFILE),
    timetable: {}, // For schedule breakdown in report
    activeTab: 'dashboard',
    theme: 'light',
    analysisResult: null,
    selectedSubject: 'C Programming',
    quizMode: 'questions', // 'questions' or 'manual'
    currentQuizAnswers: {}, // { [qIdx]: points }
    subjectAssessments: {}  // { [subjectName]: assessmentRecord }
  };

  // --- Authentication Protection & Session Helpers ---
  function checkAuth() {
    try {
      const params = typeof window !== 'undefined' && window.location && window.location.search ? new URLSearchParams(window.location.search) : null;
      if (params && (params.get('guest') === 'true' || params.get('bypass') === '1')) {
        if (!localStorage.getItem('sip_current_user')) {
          localStorage.setItem('sip_current_user', JSON.stringify(DEFAULT_PROFILE));
        }
        return true;
      }

      const currentUser = localStorage.getItem('sip_current_user');
      if (!currentUser) {
        if (typeof window !== 'undefined' && window.location) {
          window.location.href = 'login.html';
        }
        return false;
      }
      return true;
    } catch (e) {
      console.warn('Auth check error, proceeding in standalone mode', e);
      return true;
    }
  }

  function logout(skipConfirm = false) {
    if (skipConfirm) {
      confirmLogout();
      return;
    }
    const modal = document.getElementById('logoutModal');
    if (modal) {
      const name = state.profile.fullName || state.profile.name || 'Sahana K.';
      const usn = state.profile.studentId || '1MS22CS095';
      const nameParts = name.trim().split(' ').filter(Boolean);
      const initials = nameParts.length > 1 
        ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
        : name.slice(0, 2).toUpperCase();
      
      const av = document.getElementById('modalLogoutAvatar');
      if (av) av.textContent = initials;
      setText('modalLogoutName', name);
      setText('modalLogoutUSN', `USN: ${usn}`);
      modal.style.display = 'flex';
    } else {
      if (confirm('Are you sure you want to sign out and return to the login page?')) {
        confirmLogout();
      }
    }
  }

  function closeLogoutModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) modal.style.display = 'none';
  }

  function confirmLogout() {
    try {
      saveToStorage();
      localStorage.removeItem('sip_current_user');
    } catch (e) {
      console.warn('Logout error', e);
    }
    showToast('Signed out successfully. Returning to login portal...', 'info');
    setTimeout(() => {
      window.location.href = 'login.html?logout=success';
    }, 400);
  }

  // --- Storage Helpers (Individual Student Data Isolation) ---
  function loadFromStorage() {
    try {
      // 1. Prioritize active student session user
      const currentUserStr = localStorage.getItem('sip_current_user');
      if (currentUserStr) {
        state.profile = Object.assign({}, DEFAULT_PROFILE, JSON.parse(currentUserStr));
      } else {
        const savedProfile = localStorage.getItem('sip_profile');
        if (savedProfile) {
          state.profile = Object.assign({}, DEFAULT_PROFILE, JSON.parse(savedProfile));
        }
      }

      const usn = (state.profile.studentId || '1MS22CS095').toUpperCase();

      // Load theme
      const savedTheme = localStorage.getItem('sip_theme');
      if (savedTheme) state.theme = savedTheme;

      // Load timetable for this student
      const studentTimetableKey = `sip_timetable_${usn}`;
      const savedTimetable = localStorage.getItem(studentTimetableKey);
      if (savedTimetable) {
        state.timetable = JSON.parse(savedTimetable);
      } else {
        state.timetable = JSON.parse(JSON.stringify(DEMO_TIMETABLE));
        localStorage.setItem(studentTimetableKey, JSON.stringify(state.timetable));
      }

      // Load question-based subject assessments
      loadSubjectAssessments();

    } catch (e) {
      console.error('Error reading localStorage', e);
      initEmptyTimetable();
      seedDefaultSubjectAssessments();
    }
  }

  function initEmptyTimetable() {
    state.timetable = {};
    DAYS.forEach(day => {
      state.timetable[day] = {};
      TIME_SLOTS.forEach(slot => {
        state.timetable[day][slot] = '';
      });
    });
  }

  function saveToStorage() {
    try {
      const usn = (state.profile.studentId || '1MS22CS095').toUpperCase();
      localStorage.setItem(`sip_timetable_${usn}`, JSON.stringify(state.timetable));
      localStorage.setItem(`sip_profile_${usn}`, JSON.stringify(state.profile));
      localStorage.setItem('sip_current_user', JSON.stringify(state.profile));
      localStorage.setItem('sip_theme', state.theme);
      saveSubjectAssessments();

      // Async sync with Django REST API if connected
      if (window.SIP_API && window.SIP_API.isOnline) {
        window.SIP_API.saveTimetable(usn, state.timetable).catch(() => {});
        window.SIP_API.updateStudent(usn, state.profile).catch(() => {});
      }
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // --- Subject Assessments Storage & Seeding ---
  function loadSubjectAssessments() {
    const usn = (state.profile.studentId || '1MS22CS095').toUpperCase();
    const assessKey = `sip_subject_assessments_${usn}`;
    try {
      const saved = localStorage.getItem(assessKey);
      if (saved) {
        state.subjectAssessments = JSON.parse(saved);
      } else {
        seedDefaultSubjectAssessments();
      }
    } catch (e) {
      console.warn('Error reading subject assessments', e);
      seedDefaultSubjectAssessments();
    }
  }

  function saveSubjectAssessments() {
    try {
      const usn = (state.profile.studentId || '1MS22CS095').toUpperCase();
      const assessKey = `sip_subject_assessments_${usn}`;
      localStorage.setItem(assessKey, JSON.stringify(state.subjectAssessments));

      // Async sync with Django REST API if connected
      if (window.SIP_API && window.SIP_API.isOnline && state.selectedSubject && state.subjectAssessments[state.selectedSubject]) {
        window.SIP_API.saveAssessment(usn, state.subjectAssessments[state.selectedSubject]).catch(() => {});
      }
    } catch (e) {
      console.error('Error saving subject assessments', e);
    }
  }

  function seedDefaultSubjectAssessments() {
    const usn = (state.profile.studentId || '1MS22CS095').toUpperCase();
    state.subjectAssessments = {};

    if (usn === '1MS22CS080') {
      // Rahul Sharma (AI / Data Science focus)
      state.subjectAssessments['AI / Machine Learning'] = createAssessmentRecord('AI / Machine Learning', 92.5, [10, 10, 10, 10, 7.5, 10, 10, 7.5, 7.5, 10]);
      state.subjectAssessments['Python'] = createAssessmentRecord('Python', 87.5, [10, 10, 10, 7.5, 10, 7.5, 7.5, 7.5, 7.5, 10]);
      state.subjectAssessments['Data Structures & Algorithms'] = createAssessmentRecord('Data Structures & Algorithms', 80.0, [10, 7.5, 7.5, 10, 7.5, 7.5, 10, 7.5, 7.5, 5]);
      state.subjectAssessments['Database Systems (DBMS)'] = createAssessmentRecord('Database Systems (DBMS)', 75.0, [7.5, 7.5, 7.5, 7.5, 10, 7.5, 7.5, 7.5, 5, 7.5]);
      state.subjectAssessments['Web Development'] = createAssessmentRecord('Web Development', 65.0, [7.5, 7.5, 5, 7.5, 7.5, 5, 7.5, 7.5, 5, 5]);
      state.subjectAssessments['Cloud Computing & DevOps'] = createAssessmentRecord('Cloud Computing & DevOps', 62.5, [7.5, 5, 7.5, 7.5, 5, 7.5, 5, 7.5, 5, 5]);
      state.selectedSubject = 'AI / Machine Learning';
    } else if (usn === '1MS22CS102') {
      // Priya Patel (Cybersecurity focus)
      state.subjectAssessments['Cybersecurity'] = createAssessmentRecord('Cybersecurity', 95.0, [10, 10, 10, 10, 10, 7.5, 10, 10, 7.5, 10]);
      state.subjectAssessments['Computer Networks'] = createAssessmentRecord('Computer Networks', 87.5, [10, 10, 10, 7.5, 7.5, 10, 7.5, 7.5, 7.5, 10]);
      state.subjectAssessments['Python'] = createAssessmentRecord('Python', 82.5, [10, 10, 7.5, 7.5, 10, 7.5, 7.5, 7.5, 7.5, 7.5]);
      state.subjectAssessments['C Programming'] = createAssessmentRecord('C Programming', 77.5, [10, 7.5, 10, 7.5, 7.5, 7.5, 7.5, 7.5, 5, 7.5]);
      state.subjectAssessments['Operating Systems'] = createAssessmentRecord('Operating Systems', 72.5, [7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 5, 7.5]);
      state.selectedSubject = 'Cybersecurity';
    } else {
      // Sahana K. / Default CSE Student (Focus: C Programming & Full Stack Web)
      state.subjectAssessments['C Programming'] = createAssessmentRecord('C Programming', 90.0, [10, 10, 10, 7.5, 10, 7.5, 10, 7.5, 7.5, 10]);
      state.subjectAssessments['Web Development'] = createAssessmentRecord('Web Development', 82.5, [10, 10, 7.5, 7.5, 10, 7.5, 7.5, 7.5, 7.5, 7.5]);
      state.subjectAssessments['Data Structures & Algorithms'] = createAssessmentRecord('Data Structures & Algorithms', 77.5, [10, 7.5, 7.5, 10, 7.5, 7.5, 7.5, 7.5, 5, 7.5]);
      state.subjectAssessments['Database Systems (DBMS)'] = createAssessmentRecord('Database Systems (DBMS)', 72.5, [7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 5, 7.5]);
      state.subjectAssessments['Music'] = createAssessmentRecord('Music', 65.0, [10, 7.5, 7.5, 5, 5, 10, 5, 5, 5, 5]);
      state.subjectAssessments['Operating Systems'] = createAssessmentRecord('Operating Systems', 60.0, [7.5, 7.5, 5, 5, 7.5, 7.5, 5, 5, 5, 5]);
      state.subjectAssessments['Sports & Fitness'] = createAssessmentRecord('Sports & Fitness', 55.0, [7.5, 5, 5, 5, 7.5, 5, 5, 5, 5, 5]);
      state.selectedSubject = 'C Programming';
    }

    saveSubjectAssessments();
  }

  function createAssessmentRecord(subjectName, percentage, scoresArray) {
    let level = 'Low';
    let levelClass = 'level-low';
    if (percentage >= 75) {
      level = 'High';
      levelClass = 'level-high';
    } else if (percentage >= 50) {
      level = 'Medium';
      levelClass = 'level-med';
    }

    const answers = {};
    if (Array.isArray(scoresArray)) {
      scoresArray.forEach((sc, i) => { answers[i] = sc; });
    }

    const q1 = answers[0] || 7.5, q2 = answers[1] || 7.5, q3 = answers[2] || 7.5;
    const q4 = answers[3] || 7.5, q5 = answers[4] || 7.5, q6 = answers[5] || 7.5;
    const q7 = answers[6] || 7.5, q8 = answers[7] || 7.5;
    const q9 = answers[8] || 7.5, q10 = answers[9] || 7.5;

    const dimTheory = Math.round(((q1 + q2 + q3) / 30) * 100);
    const dimCoding = Math.round(((q4 + q5 + q6) / 30) * 100);
    const dimDebug = Math.round(((q7 + q8) / 20) * 100);
    const dimCareer = Math.round(((q9 + q10) / 20) * 100);

    return {
      subject: subjectName,
      percentage: Math.round(percentage * 10) / 10,
      percentageFormatted: (Math.round(percentage * 10) / 10).toFixed(1),
      interestLevel: level,
      levelClass: levelClass,
      answers: answers,
      dimensions: {
        theory: dimTheory,
        coding: dimCoding,
        debug: dimDebug,
        career: dimCareer
      },
      mode: 'questions',
      updatedAt: new Date().toISOString()
    };
  }

  // --- Core Interest Calculation Engine (Timetable Routine Analytics) ---
  function calculateInterests() {
    const list = [];
    const metaMap = {};
    ACTIVITIES.forEach(a => { metaMap[a.name] = a; });

    // Calculate hours per subject from state.timetable
    const subjectHours = {};
    let totalTrackedHours = 0;
    let activeDaysCount = 0;
    let maxDayHours = -1;
    let mostActiveDay = 'Monday';

    if (state.timetable) {
      DAYS.forEach(day => {
        let dayHrs = 0;
        if (state.timetable[day]) {
          Object.values(state.timetable[day]).forEach(slotSubj => {
            if (slotSubj && slotSubj.trim()) {
              const s = slotSubj.trim();
              subjectHours[s] = (subjectHours[s] || 0) + 1;
              dayHrs++;
              totalTrackedHours++;
            }
          });
        }
        if (dayHrs > 0) activeDaysCount++;
        if (dayHrs > maxDayHours) {
          maxDayHours = dayHrs;
          mostActiveDay = day;
        }
      });
    }

    if (totalTrackedHours === 0) {
      totalTrackedHours = 40;
      activeDaysCount = 7;
      mostActiveDay = 'Wednesday';
    }

    // Build evaluated subjects list combining diagnostic questions scores and timetable hours
    const assessedSubjectNames = Object.keys(state.subjectAssessments || {});
    const allSubjectNames = new Set([...Object.keys(subjectHours), ...assessedSubjectNames]);

    allSubjectNames.forEach(name => {
      const rec = state.subjectAssessments[name];
      const hours = subjectHours[name] || 0;
      const meta = metaMap[name] || ACTIVITY_MAP[name] || { category: 'Technical', color: '#3b82f6', icon: '📚' };

      let percentage = 0;
      let level = 'Moderate';
      let levelClass = 'level-med';

      if (rec && typeof rec.percentage === 'number') {
        percentage = rec.percentage;
        level = rec.interestLevel || (percentage >= 75 ? 'High' : percentage >= 50 ? 'Medium' : 'Low');
        levelClass = rec.levelClass || (percentage >= 75 ? 'level-high' : percentage >= 50 ? 'level-med' : 'level-low');
      } else {
        percentage = totalTrackedHours > 0 ? Math.round((hours / totalTrackedHours) * 1000) / 10 : 0;
        if (percentage >= 20.0) {
          level = 'High';
          levelClass = 'level-high';
        } else if (percentage >= 10.0) {
          level = 'Medium';
          levelClass = 'level-med';
        } else {
          level = 'Low';
          levelClass = 'level-low';
        }
      }

      list.push({
        name: name,
        category: meta.category,
        color: meta.color,
        icon: meta.icon || '📚',
        hours: hours,
        percentage: percentage,
        percentageFormatted: percentage.toFixed(1),
        interestLevel: level,
        levelClass: levelClass,
        answers: (rec && rec.answers) || {}
      });
    });

    // Sort descending by percentage score
    list.sort((a, b) => b.percentage - a.percentage);

    const top1 = list[0] || null;
    const top2 = list[1] || null;
    const top3 = list[2] || null;
    const distinctActivitiesCount = list.length;

    // Category aggregation
    let techHours = 0;
    let extraHours = 0;
    list.forEach(item => {
      if (item.category === 'Technical') {
        techHours += item.hours;
      } else {
        extraHours += item.hours;
      }
    });

    const topTechnical = list.find(a => a.category === 'Technical') || null;
    const topCreative = list.find(a => a.category === 'Creative') || null;
    const topSports = list.find(a => a.category === 'Sports') || null;

    let primaryDomain = 'Computer Science Core';
    if (top1) {
      if (top1.category === 'Technical') primaryDomain = `${top1.name} & Systems`;
      else if (top1.category === 'Creative') primaryDomain = 'Creative Arts';
      else primaryDomain = 'Sports & Athletics';
    }

    const narrative = generateInsightsText({
      list,
      top1,
      top2,
      top3,
      topTechnical,
      topCreative,
      topSports,
      distinctActivitiesCount,
      totalTrackedHours,
      activeDaysCount,
      mostActiveDay,
      primaryDomain
    });

    state.analysisResult = {
      activities: list,
      top1,
      top2,
      top3,
      distinctActivitiesCount,
      primaryDomain,
      topTechnical,
      topCreative,
      topSports,
      narrative,
      totalTrackedHours,
      activeDaysCount,
      mostActiveDay,
      techHours,
      extraHours,
      techShare: totalTrackedHours > 0 ? ((techHours / totalTrackedHours) * 100).toFixed(1) : '0.0',
      extraShare: totalTrackedHours > 0 ? ((extraHours / totalTrackedHours) * 100).toFixed(1) : '0.0'
    };

    return state.analysisResult;
  }

  /**
   * Generates natural language summary based on Weekly Timetable Routine
   */
  function generateInsightsText(data) {
    if (!data.list || data.list.length === 0 || !data.top1) {
      return {
        summary: "No scheduled timetable activities recorded yet. Populate your weekly timetable to generate comprehensive analytical insights.",
        bullets: []
      };
    }

    let summaryText = `Based on the student's analyzed weekly routine (${data.totalTrackedHours} tracked hours across ${data.activeDaysCount} active days), ${data.top1.name} emerges as the primary focus, representing ${data.top1.percentageFormatted}% of total weekly engagement (${data.top1.hours} hrs/week).`;
    
    if (data.top2) {
      summaryText += ` ${data.top2.name} is the secondary focal pursuit at ${data.top2.percentageFormatted}% (${data.top2.hours} hrs/week)`;
      if (data.top3) {
        summaryText += `, followed by ${data.top3.name} at ${data.top3.percentageFormatted}% (${data.top3.hours} hrs/week).`;
      } else {
        summaryText += `.`;
      }
    } else {
      summaryText += ` The student demonstrates strong focused dedication.`;
    }

    const bullets = [
      {
        icon: '💻',
        title: 'Primary Core Discipline',
        desc: data.topTechnical 
          ? `${data.topTechnical.name} (${data.topTechnical.percentageFormatted}% • ${data.topTechnical.hours} hrs/week)`
          : 'None scheduled'
      },
      {
        icon: '🌐',
        title: 'Secondary Academic Pursuit',
        desc: data.top2 
          ? `${data.top2.name} (${data.top2.percentageFormatted}% • ${data.top2.hours} hrs/week)`
          : 'General studies'
      },
      {
        icon: '🎨',
        title: 'Creative & Holistic Pursuit',
        desc: data.topCreative 
          ? `${data.topCreative.name} (${data.topCreative.percentageFormatted}% • ${data.topCreative.hours} hrs/week)`
          : 'Self-directed exploration'
      },
      {
        icon: '⚽',
        title: 'Sports & Wellness Engagement',
        desc: data.topSports 
          ? `${data.topSports.name} (${data.topSports.percentageFormatted}% • ${data.topSports.hours} hrs/week)`
          : 'Flexible recreation'
      },
      {
        icon: '📊',
        title: 'Routine Consistency',
        desc: `${data.activeDaysCount} of 7 days active with ${data.totalTrackedHours} total scheduled hours`
      },
      {
        icon: '📅',
        title: 'Peak Academic Routine Day',
        desc: `${data.mostActiveDay} has the highest hourly schedule density`
      }
    ];

    return {
      summary: summaryText,
      bullets: bullets
    };
  }

  // --- Safe Stubs for Removed 10-Question Questionnaire & Diagnostic Studio ---
  function selectQuizSubject(subjectName) {}

  function selectSubjectAndTakeQuiz(subjectName) { showTab('timetable'); }
  function renderSubjectAssessmentGrids() {}

  function updateStudioHeader(subjectName) {}

  function renderQuestionnaire(subjectName) {}
  function selectQuestionOption(qIdx, optIdx, points) {}
  function updateQuizProgressBar() {}
  function submitQuizAssessment(subjectName) {}
  function autoFillQuizDemo() {}
  function autoFillAllSubjectsDemo() {
    state.timetable = JSON.parse(JSON.stringify(DEMO_TIMETABLE));
    seedDefaultSubjectAssessments();
    saveToStorage();
    renderTimetable();
    const res = calculateInterests();
    updateDashboardUI(res);
    updateReportUI(res);
    showToast('⚡ Demo schedule & subject questions assessments loaded!', 'success');
  }

  function resetQuizAnswers(targetSubject) {}
  function switchQuizMode(mode) {}
  function onManualSliderChange(val) {}
  function onManualNumberChange(val) {}
  function updateManualLevelBadge(val) {}
  function saveManualPercentage() {}
  function renderQuizAnalysisResult() {}
  function selectAndAnalyzeInterest(actName) { showTab('timetable'); }

  // --- UI Synchronizers: Dashboard & Report ---

  function updateDashboardUI(res) {
    if (!res) res = calculateInterests();

    setText('bannerStudentName', state.profile.fullName || state.profile.name || 'Sahana K.');
    setText('bannerStudentID', state.profile.studentId || '1MS22CS095');
    setText('bannerBranch', state.profile.branch || 'CSE');
    setText('bannerSemester', state.profile.semester || '5th Semester');

    // Sidebar Profile
    setText('sidebarStudentName', state.profile.fullName || state.profile.name || 'Sahana K.');
    setText('sidebarStudentID', `USN: ${state.profile.studentId || '1MS22CS095'}`);
    setText('sidebarStudentMeta', `${state.profile.branch || 'CSE'} • ${state.profile.semester || '5th Semester'}`);

    const nameParts = (state.profile.fullName || state.profile.name || 'Sahana K.').trim().split(' ').filter(Boolean);
    const initials = nameParts.length > 1 
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : (state.profile.name || 'ST').slice(0, 2).toUpperCase();
    const avatar = document.getElementById('sidebarAvatar');
    if (avatar) avatar.textContent = initials;

    // Dashboard KPIs based on Weekly Timetable
    setText('kpiTotalHours', res.totalTrackedHours);
    setText('kpiWeeklyTarget', 'Across 70 available slots');
    setText('kpiActiveDays', res.activeDaysCount);
    setText('kpiActiveDaysHint', 'Days with logged activities');
    setText('kpiTopInterest', res.top1 ? res.top1.name : 'None Yet');
    setText('kpiTopCategory', res.top1 ? `${res.top1.category} (${res.top1.hours} hrs/week)` : 'Highest weekly engagement');
    setText('kpiTopPercentage', res.top1 ? Math.round(res.top1.percentage) : 0);
    setText('kpiTopHoursHint', 'Of total tracked time');

    // Dashboard Top 3 Podium
    const podiumContainer = document.getElementById('dashTop3Container');
    if (podiumContainer) {
      if (res.activities.length === 0) {
        podiumContainer.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">📅</div>
            <p>No timetable activities recorded yet.</p>
            <button class="btn btn-sm btn-primary" onclick="app.loadDemoTimetable()">Load Demo Timetable</button>
          </div>
        `;
      } else {
        const ranks = [
          { item: res.top1, rank: '🥇 Gold (1st)', cls: 'podium-gold' },
          { item: res.top2, rank: '🥈 Silver (2nd)', cls: 'podium-silver' },
          { item: res.top3, rank: '🥉 Bronze (3rd)', cls: 'podium-bronze' }
        ];

        let html = '';
        ranks.forEach(r => {
          if (r.item) {
            html += `
              <div class="podium-card ${r.cls}" onclick="app.openSubjectQuestionsFromTimetable('${r.item.name}')" style="cursor: pointer;" title="Click to answer questions for ${r.item.name}">
                <div class="podium-rank">${r.rank}</div>
                <div class="podium-name">${r.item.name}</div>
                <div class="podium-pct">${r.item.percentageFormatted}%</div>
                <div class="podium-hours"><span class="badge ${r.item.levelClass}">${r.item.hours} hrs/week</span></div>
                <div style="font-size: 0.72rem; color: var(--primary); margin-top: 6px; font-weight: 700;">Click for Questions &rarr;</div>
              </div>
            `;
          }
        });
        podiumContainer.innerHTML = html;
      }
    }

    // Dashboard Insight Box
    setText('dashInsightText', res.narrative.summary);
    setText('dashTechFocus', res.topTechnical ? `${res.topTechnical.name} (${res.topTechnical.hours} hrs)` : '—');
    setText('dashCreativeFocus', res.topCreative ? `${res.topCreative.name} (${res.topCreative.hours} hrs)` : '—');
    setText('dashActiveDay', res.mostActiveDay || 'Monday');

    setText('dashTotalActivitiesBadge', `${res.distinctActivitiesCount} Activities Logged`);
  }

  function updateAnalysisUI(res) {
    if (!res) res = calculateInterests();

    setText('anaAssessedCount', res.distinctActivitiesCount);
    setText('anaAssessedDesc', `${res.distinctActivitiesCount} subjects evaluated`);
    setText('anaMostPreferred', res.top1 ? res.top1.name : '—');
    setText('anaMostPreferredShare', res.top1 ? `${res.top1.percentageFormatted}% interest score` : '0.0%');
    setText('anaAverageScore', `${res.averageScore}%`);
    setText('anaAverageDesc', 'Across evaluated domains');
    setText('anaPrimaryDomain', res.primaryDomain);
    setText('anaDomainDesc', 'Highest focus cluster');

    // Top 3 Ranks Podium Cards in Analysis View
    const topRanksContainer = document.getElementById('anaTopRanksContainer');
    if (topRanksContainer) {
      if (res.activities.length === 0) {
        topRanksContainer.innerHTML = `<div class="empty-state"><p>No diagnostic assessments completed yet.</p></div>`;
      } else {
        const medals = [
          { item: res.top1, rank: 1, badgeClass: 'rank-badge-1', borderClass: 'rank-card-gold', label: '1st Primary Focus' },
          { item: res.top2, rank: 2, badgeClass: 'rank-badge-2', borderClass: 'rank-card-silver', label: '2nd Focus Area' },
          { item: res.top3, rank: 3, badgeClass: 'rank-badge-3', borderClass: 'rank-card-bronze', label: '3rd Focus Area' }
        ];

        let html = '';
        medals.forEach(m => {
          if (m.item) {
            html += `
              <div class="rank-card ${m.borderClass}" onclick="app.selectQuizSubject('${m.item.name}')" style="cursor: pointer;" title="Click to inspect 10-Question Diagnostic of ${m.item.name}">
                <div class="rank-card-header">
                  <span class="rank-badge ${m.badgeClass}">Rank #${m.rank} • ${m.label}</span>
                  <span class="badge ${m.item.levelClass}">Level: ${m.item.interestLevel}</span>
                </div>
                <h4 class="rank-activity-title">${m.item.name}</h4>
                <div class="rank-stats-row">
                  <span class="rank-percentage">${m.item.percentageFormatted}%</span>
                  <span class="rank-hours">${m.item.category}</span>
                </div>
                <p class="rank-statement">
                  ${m.item.name} evaluated at <strong>${m.item.percentageFormatted}%</strong> affinity through diagnostic questions.
                </p>
                <div style="font-size: 0.72rem; color: var(--primary); margin-top: 8px; font-weight: 700;">Click to Re-Take 10 Questions &rarr;</div>
              </div>
            `;
          }
        });
        topRanksContainer.innerHTML = html;
      }
    }

    renderDonutChart(res);
    renderHorizontalBars(res);
    renderPercentageCards(res);
    renderAnalysisTable(res);

    // Narrative Summary
    setText('analysisNarrativeText', res.narrative.summary);
    const bulletGrid = document.getElementById('analysisBulletGrid');
    if (bulletGrid) {
      bulletGrid.innerHTML = res.narrative.bullets.map(b => `
        <div class="narrative-bullet-card">
          <span class="n-bullet-icon">${b.icon}</span>
          <div>
            <div class="n-bullet-title">${b.title}</div>
            <div class="n-bullet-desc">${b.desc}</div>
          </div>
        </div>
      `).join('');
    }

    renderSubjectAssessmentGrids();
  }

  function renderDonutChart(res) {
    const svg = document.getElementById('donutSvg');
    const legend = document.getElementById('donutLegendContainer');
    setText('donutCenterHours', '100%');
    const centerLabel = document.getElementById('donutCenterLabel');
    if (centerLabel) centerLabel.textContent = 'Distribution';

    if (!svg || !legend) return;

    svg.innerHTML = '';
    legend.innerHTML = '';

    if (res.activities.length === 0) {
      svg.innerHTML = `<circle cx="160" cy="160" r="110" fill="none" stroke="#e2e8f0" stroke-width="36" />`;
      legend.innerHTML = `<span style="color:var(--text-muted);font-size:0.8rem;">No evaluated subjects to chart.</span>`;
      return;
    }

    // Compute relative distribution among top assessed subjects
    let totalPct = 0;
    const topActivities = res.activities.slice(0, 6);
    topActivities.forEach(a => { totalPct += a.percentage; });
    if (totalPct === 0) totalPct = 1;

    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    let cumulativeOffset = 0;

    topActivities.forEach(act => {
      const shareRatio = act.percentage / totalPct;
      const sliceStroke = shareRatio * circumference;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '160');
      circle.setAttribute('cy', '160');
      circle.setAttribute('r', radius.toString());
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', act.color || '#3b82f6');
      circle.setAttribute('stroke-width', '34');
      circle.setAttribute('stroke-dasharray', `${sliceStroke} ${circumference - sliceStroke}`);
      circle.setAttribute('stroke-dashoffset', (-cumulativeOffset).toString());
      circle.setAttribute('transform', 'rotate(-90 160 160)');
      circle.style.cursor = 'pointer';
      circle.style.transition = 'stroke-width 0.2s, stroke 0.2s';

      circle.addEventListener('mouseenter', () => {
        circle.setAttribute('stroke-width', '42');
        setText('donutCenterHours', `${act.percentageFormatted}%`);
        if (centerLabel) centerLabel.textContent = act.name;
      });

      circle.addEventListener('mouseleave', () => {
        circle.setAttribute('stroke-width', '34');
        setText('donutCenterHours', '100%');
        if (centerLabel) centerLabel.textContent = 'Distribution';
      });

      circle.addEventListener('click', () => {
        selectQuizSubject(act.name);
      });

      svg.appendChild(circle);
      cumulativeOffset += sliceStroke;

      // Legend
      const legItem = document.createElement('div');
      legItem.className = 'legend-item';
      legItem.style.cursor = 'pointer';
      legItem.title = `Click to load 10-Question Diagnostic of ${act.name}`;
      legItem.innerHTML = `
        <span class="legend-color-dot" style="background:${act.color};"></span>
        <span class="legend-name">${act.name}</span>
        <span class="legend-pct">${act.percentageFormatted}%</span>
      `;
      legItem.addEventListener('click', () => {
        selectQuizSubject(act.name);
      });
      legend.appendChild(legItem);
    });
  }

  function renderHorizontalBars(res) {
    const container = document.getElementById('horizontalBarsContainer');
    if (!container) return;

    if (res.activities.length === 0) {
      container.innerHTML = `<div class="empty-state"><p>No evaluated subjects available.</p></div>`;
      return;
    }

    let html = '';
    res.activities.forEach(act => {
      const pct = Math.min(100, Math.max(0, act.percentage));
      html += `
        <div class="h-bar-item" onclick="app.selectQuizSubject('${act.name}')" style="cursor: pointer;" title="Click to inspect 10-Question Diagnostic of ${act.name}">
          <div class="h-bar-header">
            <span class="h-bar-name">${act.name}</span>
            <span class="h-bar-meta"><strong>${act.percentageFormatted}%</strong> &bull; <span class="badge ${act.levelClass}">${act.interestLevel}</span></span>
          </div>
          <div class="h-bar-track">
            <div class="h-bar-fill" style="width:${pct}%; background:${act.color};"></div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function renderPercentageCards(res) {
    const grid = document.getElementById('pctCardsGrid');
    const badge = document.getElementById('cardsCountBadge');
    if (badge) badge.textContent = `${res.activities.length} Evaluated Subjects`;

    if (!grid) return;

    if (res.activities.length === 0) {
      grid.innerHTML = `<div class="empty-state"><p>No subject cards to display.</p></div>`;
      return;
    }

    let html = '';
    res.activities.forEach(act => {
      html += `
        <div class="pct-card" onclick="app.selectQuizSubject('${act.name}')" style="cursor: pointer; border-left: 4px solid ${act.color};" title="Click to view 10 questions for ${act.name}">
          <div class="pct-card-top">
            <div class="pct-activity-name">${act.name}</div>
            <span class="pct-badge-level ${act.levelClass}">${act.interestLevel}</span>
          </div>
          <div class="pct-metric-group">
            <div class="pct-number">${act.percentageFormatted}%</div>
            <div class="pct-hours"><span class="badge">${act.category}</span></div>
          </div>
          <div style="font-size: 0.72rem; color: var(--primary); margin-top: 8px; font-weight: 700;">Click for 10-Q Quiz &rarr;</div>
        </div>
      `;
    });

    grid.innerHTML = html;
  }

  function renderAnalysisTable(res) {
    const tbody = document.getElementById('analysisTableBody');
    if (!tbody) return;

    if (res.activities.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-muted);">No diagnostic assessments recorded yet.</td></tr>`;
      return;
    }

    let html = '';
    res.activities.forEach((act, idx) => {
      html += `
        <tr onclick="app.selectQuizSubject('${act.name}')" style="cursor: pointer;" title="Click to inspect 10-Question Diagnostic of ${act.name}">
          <td><strong>#${idx + 1}</strong></td>
          <td><strong>${act.name}</strong></td>
          <td><span class="badge">${act.category}</span></td>
          <td><strong>${act.percentageFormatted}%</strong></td>
          <td><span class="badge ${act.levelClass}">${act.interestLevel}</span></td>
          <td class="table-bar-cell">
            <div class="table-mini-bar">
              <div class="table-mini-bar-fill" style="width:${Math.min(100, act.percentage)}%; background:${act.color};"></div>
            </div>
          </td>
          <td>
            <button type="button" class="btn btn-sm btn-outline" onclick="event.stopPropagation(); app.selectQuizSubject('${act.name}');">
              Re-Assess &rarr;
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  // --- Portfolio Report Updates ---
  function updateReportUI(res) {
    if (!res) res = calculateInterests();

    // Student particulars
    setText('repStudentName', state.profile.fullName || state.profile.name || 'Sahana K.');
    setText('repStudentID', state.profile.studentId || '1MS22CS095');
    setText('repBranch', state.profile.branch || 'Computer Science & Engineering');
    setText('repSemester', state.profile.semester || '5th Semester');
    setText('repCollege', state.profile.college || 'Department of Computer Science & Engineering');
    setText('repAcademicYear', state.profile.academicYear || '2024–2025');
    setText('repSigStudentName', state.profile.fullName || state.profile.name || 'Sahana K.');

    // Report Summary ribbon
    setText('repMetricTotalHours', `${res.totalTrackedHours} Slots / Week`);
    setText('repMetricConsistency', `${res.activeDaysCount} / 7 Active Days`);
    setText('repMetricTechShare', res.top1 ? `${res.top1.percentageFormatted}%` : '0.0%');
    setText('repMetricExtraHours', res.top1 ? `Top: ${res.top1.name}` : 'Not Evaluated');

    // Section 3: Day-Wise Routine Breakdown Table
    const dailyBreakdownBody = document.getElementById('reportDailyBreakdownBody');
    if (dailyBreakdownBody) {
      let totalSlots = 0;
      DAYS.forEach(day => {
        if (state.timetable && state.timetable[day]) {
          Object.values(state.timetable[day]).forEach(subj => {
            if (subj && subj.trim()) totalSlots++;
          });
        }
      });
      if (totalSlots === 0) totalSlots = 40;

      let dailyHtml = '';
      DAYS.forEach(day => {
        let daySlots = 0;
        const subjSet = new Set();
        if (state.timetable && state.timetable[day]) {
          Object.values(state.timetable[day]).forEach(subj => {
            if (subj && subj.trim()) {
              daySlots++;
              subjSet.add(subj.trim());
            }
          });
        }

        const sharePct = ((daySlots / totalSlots) * 100).toFixed(1);
        const subjsArr = Array.from(subjSet);
        const subjChips = subjsArr.length > 0
          ? subjsArr.map(s => {
              const meta = ACTIVITY_MAP[s] || { color: '#2563eb' };
              return `<span class="badge" style="background:${meta.color}15; color:${meta.color}; border:1px solid ${meta.color}30; margin-right:4px;">${s}</span>`;
            }).join('')
          : '<span class="text-muted" style="font-size:0.8rem;">No scheduled subjects</span>';

        dailyHtml += `
          <tr>
            <td><strong>${day}</strong></td>
            <td>${subjChips}</td>
            <td><strong>${daySlots} hrs / week</strong></td>
            <td><strong>${sharePct}%</strong></td>
            <td>
              <div class="rep-mini-bar-track">
                <div class="rep-mini-bar-fill" style="width:${Math.min(100, parseFloat(sharePct) * 3.5)}%; background:var(--primary);"></div>
              </div>
            </td>
          </tr>
        `;
      });
      dailyBreakdownBody.innerHTML = dailyHtml;
    }

    // Section 4: Top 3 Priority Interests (Question-Based)
    const top3Grid = document.getElementById('reportTop3Grid');
    if (top3Grid) {
      if (res.activities.length === 0) {
        top3Grid.innerHTML = `<div class="empty-state"><p>No diagnostic assessments completed.</p></div>`;
      } else {
        const medals = [
          { item: res.top1, rank: 1, label: 'Primary Interest Focus', borderCls: 'gold-card' },
          { item: res.top2, rank: 2, label: 'Secondary Interest Focus', borderCls: 'silver-card' },
          { item: res.top3, rank: 3, label: 'Tertiary Interest Focus', borderCls: 'bronze-card' }
        ];

        let html = '';
        medals.forEach(m => {
          if (m.item) {
            html += `
              <div class="report-top3-card ${m.borderCls}">
                <div class="r-top3-head">
                  <span class="r-badge-rank">Rank #${m.rank} &bull; ${m.label}</span>
                  <span class="badge ${m.item.levelClass}">Level: ${m.item.interestLevel}</span>
                </div>
                <h4 class="r-top3-name">${m.item.name}</h4>
                <div class="r-top3-stats">
                  <span class="r-top3-pct">${m.item.percentageFormatted}%</span>
                  <span class="r-top3-hours">${m.item.category} Domain</span>
                </div>
                <div class="r-top3-meter-track">
                  <div class="r-top3-meter-fill" style="width:${Math.min(100, m.item.percentage)}%; background:${m.item.color};"></div>
                </div>
                <p class="r-top3-desc">
                  Demonstrates <strong>${m.item.percentageFormatted}%</strong> engagement evaluated via 10-Question Diagnostic Assessment.
                </p>
              </div>
            `;
          }
        });
        top3Grid.innerHTML = html;
      }
    }

    // Section 5: Comprehensive Weekly/Subject Matrix Table
    const distTableBody = document.getElementById('reportDistTableBody');
    if (distTableBody) {
      if (res.activities.length === 0) {
        distTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:16px;">No diagnostic assessment data available.</td></tr>`;
      } else {
        let html = '';
        res.activities.forEach((act, idx) => {
          html += `
            <tr>
              <td><strong>#${idx + 1}</strong></td>
              <td><strong>${act.name}</strong></td>
              <td><span class="badge">${act.category}</span></td>
              <td>10 Questions</td>
              <td><strong>${act.percentageFormatted}%</strong></td>
              <td>
                <div class="rep-mini-bar-track">
                  <div class="rep-mini-bar-fill" style="width:${Math.min(100, act.percentage)}%; background:${act.color};"></div>
                </div>
              </td>
              <td><span class="badge ${act.levelClass}">${act.interestLevel}</span></td>
            </tr>
          `;
        });
        distTableBody.innerHTML = html;
      }
    }

    // Section 6: Categorical Profile
    const techList = document.getElementById('reportTechList');
    const creativeList = document.getElementById('reportCreativeList');
    const sportsList = document.getElementById('reportSportsList');
    const otherList = document.getElementById('reportOtherList');

    const fillList = (el, cat) => {
      if (!el) return;
      const filtered = res.activities.filter(a => a.category === cat);
      if (filtered.length === 0) {
        el.innerHTML = `<li style="color:#64748b;font-size:0.8rem;">No evaluated activities</li>`;
      } else {
        el.innerHTML = filtered.map(a => `
          <li>
            <strong>${a.name}</strong>
            <span>${a.percentageFormatted}%</span>
          </li>
        `).join('');
      }
    };

    fillList(techList, 'Technical');
    fillList(creativeList, 'Creative');
    fillList(sportsList, 'Sports');
    fillList(otherList, 'Other');

    // Section 7: Narrative Box
    setText('reportNarrativeP', res.narrative.summary);
    const obsGrid = document.getElementById('reportObservationsGrid');
    if (obsGrid) {
      obsGrid.innerHTML = res.narrative.bullets.map(b => `
        <div class="rep-obs-item">
          <strong>${b.icon} ${b.title}:</strong> ${b.desc}
        </div>
      `).join('');
    }
  }

  // ===================================================================
  // INTERACTIVE WEEKLY TIMETABLE & SUBJECT QUESTIONS MODAL ENGINE
  // ===================================================================

  const modalState = {
    subject: 'C Programming',
    answers: {},
    points: 0
  };

  /**
   * Renders the interactive weekly timetable grid (Monday - Sunday x 10 Slots)
   * Each cell displays scheduled subject card that opens questions when clicked.
   */
  function renderTimetable() {
    const tbody = document.getElementById('timetableGridTbody');
    if (!tbody) return;

    const dayTotals = {};
    DAYS.forEach(d => { dayTotals[d] = 0; });
    let totalLoggedSlots = 0;
    const subjectCounts = {};

    let html = '';

    TIME_SLOTS.forEach(slot => {
      html += `<tr>`;
      html += `<td class="time-cell">${slot}</td>`;

      DAYS.forEach(day => {
        const slotSubj = state.timetable && state.timetable[day] && state.timetable[day][slot]
          ? state.timetable[day][slot].trim()
          : '';

        if (slotSubj) {
          dayTotals[day]++;
          totalLoggedSlots++;
          subjectCounts[slotSubj] = (subjectCounts[slotSubj] || 0) + 1;

          const meta = ACTIVITY_MAP[slotSubj] || { name: slotSubj, category: 'Technical', icon: '📚', color: '#2563eb' };
          const assess = state.subjectAssessments[slotSubj];
          const hasScore = assess && typeof assess.percentage === 'number';

          const scoreBadge = hasScore
            ? `<span class="slot-score-chip">⭐ ${assess.percentage}%</span>`
            : `<span class="slot-score-chip unassessed">📝 Take 10-Q</span>`;

          html += `
            <td class="slot-cell" data-filled="true" data-category="${meta.category}">
              <div class="timetable-slot-card" data-category="${meta.category}"
                   onclick="app.openSubjectQuestionsFromTimetable('${slotSubj}')"
                   role="button" tabindex="0"
                   onkeydown="if(event.key===' '||event.key==='Enter'){event.preventDefault(); app.openSubjectQuestionsFromTimetable('${slotSubj}');}"
                   title="Click to answer 10 diagnostic questions for ${slotSubj}">
                <div class="slot-card-top">
                  <span class="slot-card-icon">${meta.icon || '📚'}</span>
                  <span class="slot-card-name" title="${slotSubj}">${slotSubj}</span>
                  <div class="slot-card-actions" onclick="event.stopPropagation()">
                    <button type="button" class="slot-quick-del-btn" title="Remove ${slotSubj} from ${day} ${slot}"
                            onclick="app.clearTimetableSlot('${day}', '${slot}')">✕</button>
                  </div>
                </div>
                <div class="slot-card-badges">
                  <span class="slot-cat-chip cat-${meta.category.toLowerCase()}">${meta.category}</span>
                  ${scoreBadge}
                </div>
                <div class="slot-question-trigger-btn">
                  <span>📝 Click for Questions &rarr;</span>
                </div>
              </div>
            </td>
          `;
        } else {
          // Empty slot with subject assign dropdown
          html += `
            <td class="slot-cell" data-filled="false">
              <div class="slot-empty-wrap">
                <select class="slot-add-select" onchange="app.setTimetableSlot('${day}', '${slot}', this.value)" title="Assign a subject to ${day} ${slot}">
                  <option value="" selected disabled>+ Add Subject</option>
                  ${ACTIVITIES.map(a => `<option value="${a.name}">${a.icon} ${a.name}</option>`).join('')}
                </select>
              </div>
            </td>
          `;
        }
      });

      html += `</tr>`;
    });

    tbody.innerHTML = html;

    // Update Day Headers with Daily Tracked Hours
    DAYS.forEach(day => {
      const el = document.getElementById(`thHours-${day}`);
      if (el) el.textContent = `${dayTotals[day]} hrs`;
    });

    // Update Timetable Stats Strip
    setText('ttTotalSlots', totalLoggedSlots);
    const activeDaysCount = Object.values(dayTotals).filter(h => h > 0).length;
    setText('ttActiveDays', activeDaysCount);

    const assessedCount = Object.keys(state.subjectAssessments).length;
    setText('ttAssessedCount', `${assessedCount} of ${ACTIVITIES.length}`);

    // Find top scheduled subject
    let topSubjName = 'C Programming';
    let topSubjHrs = 0;
    Object.keys(subjectCounts).forEach(s => {
      if (subjectCounts[s] > topSubjHrs) {
        topSubjHrs = subjectCounts[s];
        topSubjName = s;
      }
    });
    setText('ttTopSubject', topSubjHrs > 0 ? `${topSubjName} (${topSubjHrs} hrs)` : 'None');
    setText('ttUniqueSubjCountBadge', `${Object.keys(subjectCounts).length} Active Subjects`);

    // Render Subjects Summary Launcher below timetable
    renderTimetableSubjectsSummary(subjectCounts);

    // Also update dashboard timetable preview
    renderDashboardTimetablePreview(subjectCounts);
  }

  /**
   * Renders the cards for each subject active in the timetable with 1-click question launch
   */
  function renderTimetableSubjectsSummary(subjectCounts) {
    const container = document.getElementById('timetableSubjectsSummary');
    if (!container) return;

    const subjs = Object.keys(subjectCounts);
    if (subjs.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 24px;">
          <div class="empty-icon">📅</div>
          <p>No subjects currently scheduled in your weekly timetable.</p>
          <button class="btn btn-sm btn-primary" onclick="app.loadDemoTimetable()">Load Demo 40-Hr Timetable</button>
        </div>
      `;
      return;
    }

    // Sort by hours descending
    subjs.sort((a, b) => (subjectCounts[b] || 0) - (subjectCounts[a] || 0));

    container.innerHTML = subjs.map(subjName => {
      const meta = ACTIVITY_MAP[subjName] || { name: subjName, category: 'Technical', icon: '📚', color: '#2563eb' };
      const hours = subjectCounts[subjName] || 0;
      const assess = state.subjectAssessments[subjName];
      const hasScore = assess && typeof assess.percentage === 'number';

      return `
        <div class="tt-subj-card" onclick="app.openSubjectQuestionsFromTimetable('${subjName}')" style="cursor: pointer;" title="Click to answer 10 questions for ${subjName}">
          <div class="tt-subj-left">
            <div class="tt-subj-icon" style="color: ${meta.color}; background: ${meta.color}15;">
              ${meta.icon || '📚'}
            </div>
            <div class="tt-subj-info">
              <div class="tt-subj-name">${subjName}</div>
              <div class="tt-subj-meta">
                <span>⏱️ ${hours} hrs/week</span>
                <span>&bull;</span>
                <span style="font-weight:700; color: ${hasScore ? '#10b981' : 'var(--text-muted)'};">
                  ${hasScore ? `⭐ ${assess.percentage}% (${assess.interestLevel})` : '📝 Unassessed'}
                </span>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-sm btn-primary tt-subj-btn"
                  onclick="event.stopPropagation(); app.openSubjectQuestionsFromTimetable('${subjName}')"
                  title="Click to answer 10 questions for ${subjName}">
            <span>📝 Questions &rarr;</span>
          </button>
        </div>
      `;
    }).join('');
  }

  /**
   * Renders the Timetable Snapshot on Dashboard
   */
  function renderDashboardTimetablePreview(subjectCounts) {
    const container = document.getElementById('dashTimetablePreview');
    if (!container) return;

    const subjs = Object.keys(subjectCounts);
    if (subjs.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 18px;">
          <p style="font-size:0.85rem;margin-bottom:8px;">No scheduled timetable activities recorded.</p>
          <button class="btn btn-sm btn-primary" onclick="app.loadDemoTimetable()">Load Demo Schedule</button>
        </div>
      `;
      return;
    }

    subjs.sort((a, b) => (subjectCounts[b] || 0) - (subjectCounts[a] || 0));

    container.innerHTML = subjs.slice(0, 6).map(subjName => {
      const meta = ACTIVITY_MAP[subjName] || { name: subjName, icon: '📚', color: '#2563eb' };
      const hours = subjectCounts[subjName];
      const assess = state.subjectAssessments[subjName];
      const hasScore = assess && typeof assess.percentage === 'number';

      return `
        <div class="dash-tt-item" onclick="app.openSubjectQuestionsFromTimetable('${subjName}')" title="Click to answer 10 questions for ${subjName}">
          <div class="dash-tt-item-left">
            <span class="dash-tt-item-icon">${meta.icon || '📚'}</span>
            <div>
              <div class="dash-tt-item-name">${subjName}</div>
              <div class="dash-tt-item-hours">${hours} hrs/week &bull; ${hasScore ? `<strong style="color:#10b981;">${assess.percentage}%</strong>` : 'Take 10-Q'}</div>
            </div>
          </div>
          <span style="font-size:0.75rem; color:var(--primary); font-weight:700;">📝 10-Q &rarr;</span>
        </div>
      `;
    }).join('');
  }

  /**
   * OPENS THE INTERACTIVE 10-QUESTION MODAL FOR A SUBJECT
   * Called when user clicks any subject in the Timetable or Dashboard
   */
  function openSubjectQuestionsFromTimetable(subjectName) {
    if (!SUBJECT_QUESTIONS[subjectName]) {
      subjectName = 'C Programming';
    }

    modalState.subject = subjectName;
    const meta = ACTIVITY_MAP[subjectName] || { name: subjectName, category: 'Technical', icon: '💻', color: '#2563eb' };
    const assess = state.subjectAssessments[subjectName];

    // Populate answers from saved assessment or baseline
    modalState.answers = {};
    if (assess && assess.answers && Object.keys(assess.answers).length > 0) {
      Object.keys(assess.answers).forEach(k => {
        modalState.answers[k] = assess.answers[k];
      });
    } else {
      // Pre-fill realistic neutral/high baseline so the student immediately sees interactive weights
      for (let i = 0; i < 10; i++) {
        modalState.answers[i] = 7.5;
      }
    }

    // Update modal header elements
    const iconEl = document.getElementById('qModalIcon');
    if (iconEl) {
      iconEl.textContent = meta.icon || '💻';
      iconEl.style.color = meta.color;
      iconEl.style.background = `${meta.color}15`;
    }

    const catEl = document.getElementById('qModalCategoryChip');
    if (catEl) catEl.textContent = `${meta.category} Domain`;

    const titleEl = document.getElementById('qModalSubjectTitle');
    if (titleEl) titleEl.textContent = `${subjectName}: 10-Question Diagnostic Assessment`;

    const badgeEl = document.getElementById('qModalScoreBadge');
    if (badgeEl) {
      if (assess && typeof assess.percentage === 'number') {
        badgeEl.textContent = `Score: ${assess.percentage}% (${assess.interestLevel})`;
        badgeEl.className = `badge ${assess.levelClass || 'badge-purple'}`;
      } else {
        badgeEl.textContent = 'Diagnostic Unassessed';
        badgeEl.className = 'badge';
      }
    }

    // Render the 10 Questions into modal
    renderModalQuestionsList();

    // Update modal score ribbon
    updateModalScoreRibbon();

    // Show Modal
    const modal = document.getElementById('subjectQuestionsModal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent body scroll
    }
  }

  /**
   * Renders all 10 questions inside the Subject Questions Modal
   */
  function renderModalQuestionsList() {
    const container = document.getElementById('modalQuestionsList');
    if (!container) return;

    const questions = SUBJECT_QUESTIONS[modalState.subject] || [];
    let html = '';

    questions.forEach((q, qIdx) => {
      const chosenPts = modalState.answers[qIdx];
      const isAnswered = typeof chosenPts === 'number';
      const chosenOpt = isAnswered ? QUIZ_OPTIONS.find(o => o.points === chosenPts) : null;

      html += `
        <div class="modal-q-item ${isAnswered ? 'answered' : ''}" id="modalQItem-${qIdx}">
          <div class="modal-q-top">
            <div class="modal-q-num-tag">
              <span class="modal-q-num">Q${qIdx + 1}</span>
              <span class="modal-q-tag">${q.tag || 'Domain Focus'}</span>
            </div>
            <span class="modal-q-status ${isAnswered ? 'ticked' : ''}" id="modalQStatus-${qIdx}">
              ${isAnswered ? `✓ Selected: ${chosenOpt ? chosenOpt.key + ' (+' + chosenOpt.points + ' pts)' : chosenPts + ' pts'}` : 'Select an option'}
            </span>
          </div>

          <p class="modal-q-text">${q.text}</p>

          <div class="modal-q-options">
            ${QUIZ_OPTIONS.map((opt, optIdx) => {
              const isTicked = isAnswered && chosenPts === opt.points;
              return `
                <div class="modal-opt-btn ${isTicked ? 'ticked' : ''}"
                     role="button" tabindex="0"
                     onclick="app.selectModalQuestionOption(${qIdx}, ${optIdx}, ${opt.points})"
                     onkeydown="if(event.key===' '||event.key==='Enter'){event.preventDefault(); app.selectModalQuestionOption(${qIdx}, ${optIdx}, ${opt.points});}"
                     title="${opt.label} (+${opt.points} pts)">
                  <span class="modal-opt-stars">${opt.stars}</span>
                  <span class="modal-opt-label">${opt.key}. ${opt.label.split('/')[0].trim()}</span>
                  <span class="modal-opt-pts">+${opt.points} pts</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  /**
   * Handles selecting a rating for question inside the modal
   */
  function selectModalQuestionOption(qIdx, optIdx, points) {
    modalState.answers[qIdx] = points;

    const qItem = document.getElementById(`modalQItem-${qIdx}`);
    if (qItem) {
      qItem.classList.add('answered');
      const optBtns = qItem.querySelectorAll('.modal-opt-btn');
      optBtns.forEach((btn, idx) => {
        if (idx === optIdx) {
          btn.classList.add('ticked');
        } else {
          btn.classList.remove('ticked');
        }
      });

      const statusEl = document.getElementById(`modalQStatus-${qIdx}`);
      if (statusEl) {
        const opt = QUIZ_OPTIONS[optIdx] || { key: 'Selected', points };
        statusEl.className = 'modal-q-status ticked';
        statusEl.textContent = `✓ Selected: ${opt.key} (+${opt.points} pts)`;
      }
    }

    updateModalScoreRibbon();
  }

  /**
   * Recalculates live score and updates score bar inside modal
   */
  function updateModalScoreRibbon() {
    let sum = 0;
    const answeredKeys = Object.keys(modalState.answers);
    answeredKeys.forEach(k => { sum += modalState.answers[k]; });

    const pct = Math.round(sum * 10) / 10;
    modalState.points = pct;

    let level = 'Low Interest';
    if (pct >= 75) level = 'High Interest';
    else if (pct >= 50) level = 'Medium Interest';

    setText('qModalPctText', `${Math.round(pct)}%`);
    setText('qModalLevelText', `${level} Priority`);
    setText('qModalPointsText', `(${pct.toFixed(1)} / 100 pts)`);
    setText('qModalAnsweredCount', `${answeredKeys.length} of 10 questions answered`);

    const pBar = document.getElementById('qModalProgressBar');
    if (pBar) pBar.style.width = `${Math.round((answeredKeys.length / 10) * 100)}%`;

    const saveBtn = document.getElementById('qModalSaveBtn');
    if (saveBtn) {
      saveBtn.innerHTML = `<span>💾 Save Assessment &amp; Update Timetable (${pct.toFixed(1)}%)</span>`;
    }
  }

  /**
   * Saves assessment answers from modal and synchronizes timetable, dashboard, and report
   */
  function saveModalAssessment() {
    const subjectName = modalState.subject;
    const scoresArray = [];
    for (let i = 0; i < 10; i++) {
      scoresArray.push(modalState.answers[i] !== undefined ? modalState.answers[i] : 7.5);
    }

    let sum = 0;
    scoresArray.forEach(s => { sum += s; });
    const pct = Math.round(sum * 10) / 10;

    const record = createAssessmentRecord(subjectName, pct, scoresArray);
    state.subjectAssessments[subjectName] = record;

    saveSubjectAssessments();
    saveToStorage();

    const res = calculateInterests();
    renderTimetable();
    updateDashboardUI(res);
    updateAnalysisUI(res);
    updateReportUI(res);

    closeQuestionsModal();
    showToast(`🎉 Saved ${subjectName} Assessment: ${record.percentageFormatted}% (${record.interestLevel} Priority)!`, 'success');
  }

  /**
   * Auto-fills realistic demo scores for modal questions
   */
  function autoFillModalQuestionsDemo() {
    const sampleProfiles = [
      [10, 10, 10, 7.5, 10, 7.5, 10, 7.5, 7.5, 10], // 90.0%
      [10, 10, 7.5, 7.5, 10, 7.5, 7.5, 7.5, 7.5, 7.5], // 82.5%
      [10, 7.5, 7.5, 10, 7.5, 7.5, 7.5, 7.5, 5, 7.5], // 77.5%
      [7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 5, 7.5]  // 72.5%
    ];
    const picked = sampleProfiles[Math.floor(Math.random() * sampleProfiles.length)];
    picked.forEach((sc, i) => { modalState.answers[i] = sc; });

    renderModalQuestionsList();
    updateModalScoreRibbon();
    showToast(`Pre-filled realistic assessment answers for ${modalState.subject}. Click Save to apply!`, 'info');
  }

  /**
   * Resets choices inside modal
   */
  function resetModalQuestions() {
    for (let i = 0; i < 10; i++) {
      modalState.answers[i] = 0;
    }
    renderModalQuestionsList();
    updateModalScoreRibbon();
    showToast(`Answers reset for ${modalState.subject}.`, 'warning');
  }

  /**
   * Switches from Modal directly to the deep-dive 10-Question Analysis Studio tab
   */
  function openInFullStudioFromModal() {
    const subj = modalState.subject;
    closeQuestionsModal();
    selectSubjectAndTakeQuiz(subj);
  }

  /**
   * Closes the Subject Questions Modal
   */
  function closeQuestionsModal() {
    const modal = document.getElementById('subjectQuestionsModal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  /**
   * Slot manipulation: assign subject to timetable period
   */
  function setTimetableSlot(day, slot, subjectName) {
    if (!state.timetable) initEmptyTimetable();
    if (!state.timetable[day]) state.timetable[day] = {};

    state.timetable[day][slot] = subjectName;
    saveToStorage();
    renderTimetable();

    const res = calculateInterests();
    updateReportUI(res);
    updateDashboardUI(res);
    showToast(`Added ${subjectName} to ${day} (${slot}). Click the cell to open questions!`, 'info');
  }

  /**
   * Slot manipulation: clear subject from timetable period
   */
  function clearTimetableSlot(day, slot) {
    if (state.timetable && state.timetable[day]) {
      state.timetable[day][slot] = '';
      saveToStorage();
      renderTimetable();

      const res = calculateInterests();
      updateReportUI(res);
      updateDashboardUI(res);
      showToast(`Cleared slot on ${day} (${slot}).`, 'info');
    }
  }

  /**
   * Loads the standard 40-hour Monday-Sunday demo schedule
   */
  function loadDemoTimetable() {
    state.timetable = JSON.parse(JSON.stringify(DEMO_TIMETABLE));
    saveToStorage();
    renderTimetable();

    const res = calculateInterests();
    updateDashboardUI(res);
    updateReportUI(res);
    showToast('⚡ Demo 40-hour weekly timetable loaded! Click any subject to open its questions.', 'success');
  }

  /**
   * Clears timetable schedule
   */
  function clearTimetable(confirmFirst) {
    if (confirmFirst && !confirm('Are you sure you want to clear your weekly timetable schedule slots?')) {
      return;
    }
    initEmptyTimetable();
    saveToStorage();
    renderTimetable();

    const res = calculateInterests();
    updateDashboardUI(res);
    updateReportUI(res);
    showToast('Weekly timetable schedule cleared.', 'warning');
  }

  // --- Tab & Navigation Management ---
  function showTab(tabId) {
    if (tabId === 'analysis') tabId = 'timetable';
    state.activeTab = tabId;

    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.querySelectorAll('.tab-view').forEach(view => {
      if (view.id === `view-${tabId}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    closeMobileSidebar();

    const res = calculateInterests();
    renderTimetable();
    updateDashboardUI(res);
    updateAnalysisUI(res);
    updateReportUI(res);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Settings & Student Profile Management ---
  function populateSettingsForm() {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('settingFullName', state.profile.fullName || state.profile.name);
    setVal('settingStudentId', state.profile.studentId);
    setVal('settingBranch', state.profile.branch);
    setVal('settingSemester', state.profile.semester);
    setVal('settingCollege', state.profile.college);
    setVal('settingAcademicYear', state.profile.academicYear);
  }

  function saveStudentProfile(e) {
    if (e && e.preventDefault) e.preventDefault();

    const getVal = id => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };

    state.profile.fullName = getVal('settingFullName') || 'Sahana K.';
    state.profile.name = state.profile.fullName;
    state.profile.studentId = getVal('settingStudentId') || '1MS22CS095';
    state.profile.branch = getVal('settingBranch') || 'Computer Science & Engineering';
    state.profile.semester = getVal('settingSemester') || '5th Semester';
    state.profile.college = getVal('settingCollege') || 'Department of Computer Science & Engineering';
    state.profile.academicYear = getVal('settingAcademicYear') || '2024–2025';

    saveToStorage();
    const res = calculateInterests();
    updateDashboardUI(res);
    updateAnalysisUI(res);
    updateReportUI(res);

    showToast('Student profile particulars saved successfully!', 'success');
  }

  function resetDefaultProfile() {
    if (confirm('Reset student profile to department default particulars?')) {
      state.profile = Object.assign({}, DEFAULT_PROFILE);
      saveToStorage();
      populateSettingsForm();
      const res = calculateInterests();
      updateDashboardUI(res);
      updateAnalysisUI(res);
      updateReportUI(res);
      showToast('Profile reset to default.', 'info');
    }
  }

  function exportJsonData() {
    const payload = {
      profile: state.profile,
      assessments: state.subjectAssessments,
      timetable: state.timetable,
      exportedAt: new Date().toISOString(),
      version: '2.0-quiz-based'
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `SIP_Assessments_${state.profile.studentId || 'STUDENT'}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast('Portfolio & Assessment data exported to JSON!', 'success');
  }

  function importJsonData(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.profile) state.profile = Object.assign({}, DEFAULT_PROFILE, imported.profile);
        if (imported.assessments) state.subjectAssessments = imported.assessments;
        if (imported.timetable) state.timetable = imported.timetable;

        saveToStorage();
        populateSettingsForm();
        const res = calculateInterests();
        updateDashboardUI(res);
        updateAnalysisUI(res);
        updateReportUI(res);

        showToast('JSON Assessment data imported and applied successfully!', 'success');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function printReport() {
    showTab('report');
    setTimeout(() => {
      window.print();
    }, 200);
  }

  function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', nextTheme);
    state.theme = nextTheme;
    saveToStorage();
  }

  function showToast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'danger' ? '✕' : 'ℹ'}</span>
      <span>${msg}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => { toast.remove(); }, 300);
    }, 3200);
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function openMobileSidebar() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('mobileOverlay');
    if (sb) sb.classList.add('mobile-open');
    if (ov) ov.classList.add('active');
  }

  function closeMobileSidebar() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('mobileOverlay');
    if (sb) sb.classList.remove('mobile-open');
    if (ov) ov.classList.remove('active');
  }

  function bindEventListeners() {
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) showTab(tab);
      });
    });

    const hdrDemo = document.getElementById('headerDemoBtn');
    if (hdrDemo) hdrDemo.addEventListener('click', autoFillAllSubjectsDemo);

    const hdrReport = document.getElementById('headerReportBtn');
    if (hdrReport) hdrReport.addEventListener('click', () => showTab('report'));

    const dView = document.getElementById('dashViewAnalysisBtn');
    if (dView) dView.addEventListener('click', () => showTab('analysis'));

    const dRep = document.getElementById('dashGenerateReportBtn');
    if (dRep) dRep.addEventListener('click', () => showTab('report'));

    const dDemo = document.getElementById('dashLoadDemoBtn');
    if (dDemo) dDemo.addEventListener('click', autoFillAllSubjectsDemo);

    const dClear = document.getElementById('dashClearBtn');
    if (dClear) dClear.addEventListener('click', () => {
      if (confirm('Clear all subject assessment scores to 0%?')) {
        state.subjectAssessments = {};
        saveSubjectAssessments();
        selectQuizSubject('C Programming');
        const res = calculateInterests();
        updateDashboardUI(res);
        updateAnalysisUI(res);
        updateReportUI(res);
        showToast('All subject assessments reset.', 'warning');
      }
    });

    const openBtn = document.getElementById('openSidebarBtn');
    if (openBtn) openBtn.addEventListener('click', openMobileSidebar);

    const closeBtn = document.getElementById('closeSidebarBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeMobileSidebar);

    const overlay = document.getElementById('mobileOverlay');
    if (overlay) overlay.addEventListener('click', closeMobileSidebar);

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    const profileForm = document.getElementById('profileForm');
    if (profileForm) profileForm.addEventListener('submit', saveStudentProfile);

    // Global keyboard shortcuts (Escape to close modals)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeQuestionsModal();
        closeLogoutModal();
      }
    });
  }

  async function syncWithDjangoBackend() {
    if (!window.SIP_API) return;
    try {
      const isOnline = await window.SIP_API.checkConnection();
      if (!isOnline) return;

      const usn = (state.profile.studentId || '1MS22CS095').toUpperCase();

      // 1. Sync student profile from backend
      const backendStudent = await window.SIP_API.getStudent(usn);
      if (backendStudent) {
        state.profile = Object.assign({}, state.profile, backendStudent);
        populateSettingsForm();
      }

      // 2. Sync timetable from backend
      const backendTimetable = await window.SIP_API.getTimetable(usn);
      if (backendTimetable && Object.keys(backendTimetable).length > 0) {
        state.timetable = backendTimetable;
        renderTimetable();
      }

      // 3. Sync assessments from backend
      const backendAssessments = await window.SIP_API.getAssessments(usn);
      if (backendAssessments && Object.keys(backendAssessments).length > 0) {
        state.subjectAssessments = Object.assign({}, state.subjectAssessments, backendAssessments);
        const res = calculateInterests();
        updateDashboardUI(res);
        updateAnalysisUI(res);
        updateReportUI(res);
      }
      showToast('✓ Synchronized with SQLite database!', 'success');
    } catch (e) {
      console.warn('Django sync error:', e);
    }
  }

  async function testDatabaseConnection() {
    if (!window.SIP_API) {
      showToast('API communication layer not loaded.', 'danger');
      return;
    }
    showToast('Testing connection to SQLite Database server (http://127.0.0.1:8000)...', 'info');
    const isOnline = await window.SIP_API.checkConnection();
    if (isOnline) {
      showToast('✓ Successfully connected to SQLite Database on Port 8000!', 'success');
      syncWithDjangoBackend();
    } else {
      showToast('⚠ Django backend is currently offline. Run "run_backend.bat" in the project folder to start the database server.', 'warning');
    }
  }

  function initApp() {
    if (!checkAuth()) return;

    loadFromStorage();
    document.body.setAttribute('data-theme', state.theme);
    populateSettingsForm();
    bindEventListeners();

    // Select and load initial active quiz subject
    const initialSubj = state.selectedSubject || 'C Programming';
    selectQuizSubject(initialSubj);

    const res = calculateInterests();
    renderTimetable();
    updateDashboardUI(res);
    updateAnalysisUI(res);
    updateReportUI(res);

    // Asynchronously synchronize with Django REST backend
    syncWithDjangoBackend();
  }

  // Public API exposed on window.app for inline HTML events
  window.app = {
    showTab,
    selectQuizSubject,
    selectSubjectAndTakeQuiz,
    selectQuestionOption,
    submitQuizAssessment,
    autoFillQuizDemo,
    autoFillAllSubjectsDemo,
    resetQuizAnswers,
    switchQuizMode,
    onManualSliderChange,
    onManualNumberChange,
    saveManualPercentage,
    selectAndAnalyzeInterest,
    saveStudentProfile,
    resetDefaultProfile,
    exportJsonData,
    importJsonData,
    printReport,
    logout,
    closeLogoutModal,
    confirmLogout,
    checkAuth,
    toggleTheme,
    // Interactive Timetable & Questions Modal API
    openSubjectQuestionsFromTimetable,
    closeQuestionsModal,
    selectModalQuestionOption,
    saveModalAssessment,
    autoFillModalQuestionsDemo,
    resetModalQuestions,
    openInFullStudioFromModal,
    renderTimetable,
    setTimetableSlot,
    clearTimetableSlot,
    loadDemoTimetable,
    clearTimetable,
    loadDemoData: loadDemoTimetable,
    testDatabaseConnection,
    syncDatabase: syncWithDjangoBackend
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
