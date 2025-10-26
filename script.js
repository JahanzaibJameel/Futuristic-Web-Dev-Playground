// Initialize the Quantum Nexus OS
document.addEventListener("DOMContentLoaded", function () {
  // Initialize CodeMirror editors
  const htmlEditor = CodeMirror.fromTextArea(
    document.getElementById("html-editor"),
    {
      mode: "xml",
      lineNumbers: true,
      theme: "material-darker",
    }
  );

  const cssEditor = CodeMirror.fromTextArea(
    document.getElementById("css-editor"),
    {
      mode: "css",
      lineNumbers: true,
      theme: "material-darker",
    }
  );

  const jsEditor = CodeMirror.fromTextArea(
    document.getElementById("js-editor"),
    {
      mode: "javascript",
      lineNumbers: true,
      theme: "material-darker",
    }
  );

  // Update preview when code changes
  function updatePreview() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const previewFrame = document.getElementById("preview-frame");
    const previewDocument =
      previewFrame.contentDocument || previewFrame.contentWindow.document;

    previewDocument.open();
    previewDocument.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>${css}</style>
                    </head>
                    <body>${html}
                        <script>${js}<\/script>
                    </body>
                    </html>
                `);
    previewDocument.close();
  }

  // Initial preview update
  updatePreview();

  // Update preview on editor changes
  htmlEditor.on("change", updatePreview);
  cssEditor.on("change", updatePreview);
  jsEditor.on("change", updatePreview);

  // Initialize 3D scene
  initThreeJS();

  // Initialize analytics dashboard
  initDashboard();

  // AI Assistant functionality
  initAIAssistant();

  // Theme switching
  document
    .getElementById("theme-toggle")
    .addEventListener("click", function () {
      const themes = [
        "theme-neo-holo",
        "theme-dark-quantum",
        "theme-retro-grid",
        "theme-minimal-light",
      ];
      const currentTheme = document.body.className;
      const currentIndex = themes.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      document.body.className = themes[nextIndex];

      // Update AI message about theme change
      showAIMessage(
        `Switched to ${themes[nextIndex]
          .replace("theme-", "")
          .replace("-", " ")} theme.`
      );
    });

  // Export functionality
  document.getElementById("export-btn").addEventListener("click", function () {
    showAIMessage(
      "Exporting workspace... This would generate a downloadable file in a full implementation."
    );

    // Simulate export process
    setTimeout(() => {
      showAIMessage(
        "Workspace exported successfully! You can now share your quantum creation."
      );
    }, 1500);
  });

  // Console cursor animation
  setInterval(() => {
    const cursor = document.getElementById("console-cursor");
    cursor.style.visibility =
      cursor.style.visibility === "hidden" ? "visible" : "hidden";
  }, 500);

  // Simulate system metrics updates
  setInterval(updateSystemMetrics, 1000);

  // Window dragging functionality
  initWindowDragging();
});

// Initialize Three.js 3D scene
function initThreeJS() {
  const canvas = document.getElementById("quantum-canvas");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 5000;

  const posArray = new Float32Array(particlesCount * 3);
  const colorArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
    colorArray[i] = Math.random();
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );
  particlesGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colorArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Create a central glowing orb
  const orbGeometry = new THREE.SphereGeometry(1, 32, 32);
  const orbMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.3,
  });
  const orb = new THREE.Mesh(orbGeometry, orbMaterial);
  scene.add(orb);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0x00f0ff, 0.5);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.001;

    orb.rotation.x += 0.005;
    orb.rotation.y += 0.005;

    // Pulsing effect for the orb
    orb.scale.x = 1 + Math.sin(Date.now() * 0.002) * 0.2;
    orb.scale.y = 1 + Math.sin(Date.now() * 0.002) * 0.2;
    orb.scale.z = 1 + Math.sin(Date.now() * 0.002) * 0.2;

    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Initialize analytics dashboard
function initDashboard() {
  // FPS Chart
  const fpsCtx = document.getElementById("fps-chart").getContext("2d");
  const fpsChart = new Chart(fpsCtx, {
    type: "line",
    data: {
      labels: Array(20).fill(""),
      datasets: [
        {
          label: "FPS",
          data: Array(20).fill(60),
          borderColor: "#00f0ff",
          backgroundColor: "rgba(0, 240, 255, 0.1)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: {
          display: false,
          min: 0,
          max: 120,
        },
      },
    },
  });

  // Memory Chart
  const memoryCtx = document.getElementById("memory-chart").getContext("2d");
  const memoryChart = new Chart(memoryCtx, {
    type: "line",
    data: {
      labels: Array(20).fill(""),
      datasets: [
        {
          label: "Memory",
          data: Array(20).fill(40),
          borderColor: "#28ca42",
          backgroundColor: "rgba(40, 202, 66, 0.1)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: {
          display: false,
          min: 0,
          max: 100,
        },
      },
    },
  });

  // CPU Chart
  const cpuCtx = document.getElementById("cpu-chart").getContext("2d");
  const cpuChart = new Chart(cpuCtx, {
    type: "line",
    data: {
      labels: Array(20).fill(""),
      datasets: [
        {
          label: "CPU",
          data: Array(20).fill(20),
          borderColor: "#7d00ff",
          backgroundColor: "rgba(125, 0, 255, 0.1)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: {
          display: false,
          min: 0,
          max: 100,
        },
      },
    },
  });

  // Store charts for updates
  window.dashboardCharts = {
    fps: fpsChart,
    memory: memoryChart,
    cpu: cpuChart,
  };
}

// Update system metrics
function updateSystemMetrics() {
  // Simulate realistic metric fluctuations
  const fps = 50 + Math.random() * 20;
  const memory = 30 + Math.random() * 40;
  const cpu = 10 + Math.random() * 30;

  // Update display values
  document.getElementById("fps-counter").textContent = Math.round(fps);
  document.getElementById("memory-usage").textContent =
    Math.round(memory) + "%";
  document.getElementById("cpu-usage").textContent = Math.round(cpu) + "%";

  // Update charts
  if (window.dashboardCharts) {
    // Remove first data point and add new one
    window.dashboardCharts.fps.data.datasets[0].data.shift();
    window.dashboardCharts.fps.data.datasets[0].data.push(fps);
    window.dashboardCharts.fps.update("none");

    window.dashboardCharts.memory.data.datasets[0].data.shift();
    window.dashboardCharts.memory.data.datasets[0].data.push(memory);
    window.dashboardCharts.memory.update("none");

    window.dashboardCharts.cpu.data.datasets[0].data.shift();
    window.dashboardCharts.cpu.data.datasets[0].data.push(cpu);
    window.dashboardCharts.cpu.update("none");
  }
}

// Initialize AI Assistant
function initAIAssistant() {
  const aiOrb = document.getElementById("ai-orb");
  const aiMessage = document.getElementById("ai-message");
  const aiText = document.getElementById("ai-text");
  const aiClose = document.getElementById("ai-close");

  // AI messages database
  const aiMessages = [
    "I've detected some optimization opportunities in your CSS. Would you like me to suggest improvements?",
    "Your code structure looks great! Consider adding more comments for future reference.",
    "I notice you're using a lot of animations. Would you like me to help optimize them for performance?",
    "The color scheme you're using has good contrast and accessibility. Well done!",
    "I can help you implement a dark/light mode toggle if you're interested.",
    "Your JavaScript functions are well-organized. Consider breaking down the larger ones into smaller, reusable functions.",
    "I've generated a particle effect function that you might find useful for your project.",
    "Would you like me to analyze your code for potential security issues?",
    "I can help you set up a responsive design if you need assistance.",
    "Your HTML structure follows good semantic practices. That's excellent for SEO!",
  ];

  // Show AI message
  function showAIMessage(message) {
    aiText.textContent = message;
    aiMessage.classList.remove("hidden");

    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (!aiMessage.matches(":hover")) {
        aiMessage.classList.add("hidden");
      }
    }, 10000);
  }

  // Toggle AI message visibility
  aiOrb.addEventListener("click", function () {
    if (aiMessage.classList.contains("hidden")) {
      const randomMessage =
        aiMessages[Math.floor(Math.random() * aiMessages.length)];
      showAIMessage(randomMessage);
    } else {
      aiMessage.classList.add("hidden");
    }
  });

  // Close AI message
  aiClose.addEventListener("click", function () {
    aiMessage.classList.add("hidden");
  });

  // Show welcome message after a delay
  setTimeout(() => {
    showAIMessage(
      "Welcome to Quantum Nexus! I'm your AI assistant. Click on me anytime for help with your project."
    );
  }, 3000);

  // Random AI suggestions
  setInterval(() => {
    if (Math.random() < 0.3 && aiMessage.classList.contains("hidden")) {
      const randomMessage =
        aiMessages[Math.floor(Math.random() * aiMessages.length)];
      showAIMessage(randomMessage);
    }
  }, 30000);
}

// Initialize window dragging
function initWindowDragging() {
  const windows = document.querySelectorAll(".quantum-window");

  windows.forEach((window) => {
    const header = window.querySelector(".window-header");
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    header.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);

    function dragStart(e) {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;

      if (e.target === header) {
        isDragging = true;

        // Bring window to front
        windows.forEach((w) => {
          w.style.zIndex = 1;
        });
        window.style.zIndex = 10;
      }
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, window);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    function dragEnd() {
      initialX = currentX;
      initialY = currentY;
      isDragging = false;
    }
  });
}
