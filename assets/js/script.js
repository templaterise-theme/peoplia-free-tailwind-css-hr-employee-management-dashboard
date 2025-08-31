/* 
Name                 : CuraPanel - Free Tailwind CSS Healthcare Admin Dashboard Template
Author               : TemplateRise
Url                  : https://www.templaterise.com/template/curapanel-free-tailwind-css-healthcare-admin-dashboard-template 
*/

// Initialize Lucide icons
lucide.createIcons();

// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Load saved theme or default to light
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  html.classList.add("dark");
} else {
  html.classList.remove("dark");
}

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  const theme = html.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

// Sidebar toggle functionality
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebarClose = document.getElementById("sidebar-close");

function toggleSidebar() {
  sidebar.classList.toggle("active");
  sidebarOverlay.classList.toggle("active");
}

if (sidebarToggle && sidebarClose && sidebarOverlay) {
  sidebarToggle.addEventListener("click", toggleSidebar);
  sidebarClose.addEventListener("click", toggleSidebar);
  sidebarOverlay.addEventListener("click", toggleSidebar);
}

// Notification dropdown functionality
const notificationBtn = document.getElementById("notification-btn");
const notificationDropdown = document.getElementById("notification-dropdown");

if (notificationBtn) {
  notificationBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    notificationDropdown.classList.toggle("hidden");
    settingsDropdown.classList.add("hidden");
  });
}

// Settings dropdown functionality
const settingsBtn = document.getElementById("settings-btn");
const settingsDropdown = document.getElementById("settings-dropdown");
if (settingsBtn) {
  settingsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    settingsDropdown.classList.toggle("hidden");
    notificationDropdown.classList.add("hidden");
  });
}

// Close dropdowns when clicking outside
document.addEventListener("click", (e) => {
  if (
    !notificationBtn.contains(e.target) &&
    !notificationDropdown.contains(e.target)
  ) {
    notificationDropdown.classList.add("hidden");
  }
  if (!settingsBtn.contains(e.target) && !settingsDropdown.contains(e.target)) {
    settingsDropdown.classList.add("hidden");
  }
});

// Mobile search functionality
const mobileSearchBtn = document.getElementById("mobile-search-btn");
const mobileSearchContainer = document.getElementById("mobile-search-container");

if (mobileSearchBtn && mobileSearchContainer) {
  // Toggle on button click
  mobileSearchBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent immediate outside click
    mobileSearchContainer.classList.toggle("hidden");
  });

  // Hide when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !mobileSearchContainer.contains(e.target) &&
      !mobileSearchBtn.contains(e.target)
    ) {
      mobileSearchContainer.classList.add("hidden");
    }
  });
}


document.querySelectorAll(".dropdown-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const submenu = button.nextElementSibling;
    submenu.classList.toggle("hidden");
    const icon = button.querySelector("i[data-lucide='chevron-down']");
    icon.classList.toggle("rotate-180");
  });
});

// Chart initialization and configuration
let attendanceChartLine, attendanceChartBar;

function initCharts() {
  const isDarkMode = html.classList.contains("dark");
  const attendanceLine = document.getElementById("attendanceChartLine");
  const attendanceBar = document.getElementById("attendanceChartBar");

  if (attendanceLine) {
    const attendanceFlowLine = attendanceLine.getContext("2d");
    attendanceChartLine = new Chart(attendanceFlowLine, {
      type: 'line',
      data: {
        labels: ['01', '02', '03', '04', '05', '06', '07'],
        datasets: [{
          label: 'Attendance %',
          data: [60, 70, 80, 91, 75, 65, 85],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99,102,241,0.2)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });
  }

  if (attendanceBar) {
    const attendanceFlowBar = attendanceBar.getContext("2d");
    attendanceChartBar = new Chart(attendanceFlowBar, {
      type: 'bar',
      data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
              { label: 'Present', data: [42, 45, 43, 41, 35, 12, 8], backgroundColor: '#10b981', borderRadius: 4 },
              { label: 'Absent', data: [5, 2, 4, 6, 12, 35, 39], backgroundColor: '#ef4444', borderRadius: 4 },
              { label: 'Late', data: [3, 1, 2, 4, 5, 2, 1], backgroundColor: '#f59e0b', borderRadius: 4 }
          ]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  labels: {
                      color: isDarkMode ? '#b0b0b0' : '#4b5563'
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  stacked: true,
                  grid: { color: isDarkMode ? '#3b3b4e' : '#e5e7eb' },
                  ticks: { color: isDarkMode ? '#b0b0b0' : '#4b5563' }
              },
              x: {
                  stacked: true,
                  grid: { color: isDarkMode ? '#3b3b4e' : '#e5e7eb' },
                  ticks: { color: isDarkMode ? '#b0b0b0' : '#4b5563' }
              }
          }
      }
    });

  }

}

function updateChartsForTheme() {
  const isDarkMode = html.classList.contains("dark");
  const textColor = isDarkMode ? "#E5E7EB" : "#374151";
  const gridColor = isDarkMode
    ? "rgba(75, 85, 99, 0.3)"
    : "rgba(209, 213, 219, 0.8)";

  // Update Patient Flow Chart
  patientFlowChart.options.plugins.legend.labels.color = textColor;
  patientFlowChart.options.plugins.tooltip.backgroundColor = isDarkMode
    ? "#1F2937"
    : "#FFFFFF";
  patientFlowChart.options.plugins.tooltip.titleColor = textColor;
  patientFlowChart.options.plugins.tooltip.bodyColor = textColor;
  patientFlowChart.options.plugins.tooltip.borderColor = gridColor;
  patientFlowChart.options.scales.x.grid.color = gridColor;
  patientFlowChart.options.scales.x.ticks.color = textColor;
  patientFlowChart.options.scales.y.grid.color = gridColor;
  patientFlowChart.options.scales.y.ticks.color = textColor;
  patientFlowChart.update();

  // Update Revenue Chart
  revenueChart.options.plugins.legend.labels.color = textColor;
  revenueChart.options.plugins.tooltip.backgroundColor = isDarkMode
    ? "#1F2937"
    : "#FFFFFF";
  revenueChart.options.plugins.tooltip.titleColor = textColor;
  revenueChart.options.plugins.tooltip.bodyColor = textColor;
  revenueChart.options.plugins.tooltip.borderColor = gridColor;
  revenueChart.options.scales.x.grid.color = gridColor;
  revenueChart.options.scales.x.ticks.color = textColor;
  revenueChart.options.scales.y.grid.color = gridColor;
  revenueChart.options.scales.y.ticks.color = textColor;
  revenueChart.update();
}

// Initialize charts when the page loads
document.addEventListener("DOMContentLoaded", function () {
  initCharts();
});

function openCreateInvoiceModal() {
  Modal.show("createInvoiceModal");

  // Set default dates
  const today = new Date().toISOString().split("T")[0];
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);

  document.querySelector('input[name="invoiceDate"]').value = today;
  document.querySelector('input[name="dueDate"]').value = dueDate
    .toISOString()
    .split("T")[0];

  calculateInvoiceTotal();
}

function closeInvoiceDetailsModal() {
  Modal.hide("invoiceDetailsModal");
}

function viewInvoice(invoiceId) {
  Modal.show("invoiceDetailsModal");
  lucide.createIcons();
}

function addInvoiceItem() {
  const itemsList = document.getElementById("invoiceItemsList");
  const newItem = document.createElement("div");
  newItem.className =
    "invoice-item grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800";
  newItem.innerHTML = `
                <div class="md:col-span-5">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-body">Service/Item Description</label>
                    <input type="text" name="itemDescription[]" placeholder="e.g., Blood Test" 
                        class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                            bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                            focus:ring-2 focus:ring-purple-500 focus:border-transparent font-body focus:outline-none">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-body">Quantity</label>
                    <input type="number" name="itemQuantity[]" value="1" min="1" 
                        class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                            bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                            focus:ring-2 focus:ring-purple-500 focus:border-transparent font-body focus:outline-none">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-body">Unit Price</label>
                    <input type="number" name="itemPrice[]" step="0.01" placeholder="0.00" 
                        class="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg 
                            bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                            focus:ring-2 focus:ring-purple-500 focus:border-transparent font-body focus:outline-none">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-body">Total</label>
                    <input type="text" readonly 
                        class="item-total w-full px-3 py-2 border border-gray-200 dark:border-gray-700 
                            rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-body focus:outline-none" 
                        value="$0.00">
                </div>
                <div class="md:col-span-1 flex items-end">
                    <button type="button" onclick="removeInvoiceItem(this)" 
                        class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            `;
  itemsList.appendChild(newItem);
  lucide.createIcons();

  // Add event listeners for calculation
  const quantityInput = newItem.querySelector('input[name="itemQuantity[]"]');
  const priceInput = newItem.querySelector('input[name="itemPrice[]"]');

  quantityInput.addEventListener("input", calculateInvoiceTotal);
  priceInput.addEventListener("input", calculateInvoiceTotal);

  // Trigger calculation immediately after adding
  calculateInvoiceTotal();
}

function removeInvoiceItem(button) {
  button.closest(".invoice-item").remove();
  calculateInvoiceTotal();
}

function calculateInvoiceTotal() {
  const items = document.querySelectorAll(".invoice-item");
  let subtotal = 0;

  items.forEach((item) => {
    const quantity =
      parseFloat(item.querySelector('input[name="itemQuantity[]"]').value) || 0;
    const price =
      parseFloat(item.querySelector('input[name="itemPrice[]"]').value) || 0;
    const total = quantity * price;

    item.querySelector(".item-total").value = `$${total.toFixed(2)}`;
    subtotal += total;
  });

  const discountAmount =
    parseFloat(document.getElementById("discountAmount").value) || 0;
  const discountType = document.getElementById("discountType").value;

  let discount = 0;
  if (discountType === "percent") {
    discount = subtotal * (discountAmount / 100);
  } else {
    discount = discountAmount;
  }

  const taxRate = 0.085; // 8.5%
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * taxRate;
  const total = taxableAmount + tax;

  document.getElementById("invoiceSubtotal").textContent = `$${subtotal.toFixed(
    2
  )}`;
  document.getElementById("invoiceTax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("invoiceTotal").textContent = `$${total.toFixed(2)}`;
}

const collapseBtn = document.getElementById("sidebar-collapse-btn");
// Check if there's a saved state in localStorage
const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";

// Apply the saved state
if (isCollapsed) {
  sidebar.classList.add("sidebar-collapsed");
}
// Toggle sidebar collapse
collapseBtn.addEventListener("click", function () {
  sidebar.classList.toggle("sidebar-collapsed");
  // Save the state to localStorage
  const isNowCollapsed = sidebar.classList.contains("sidebar-collapsed");
  localStorage.setItem("sidebarCollapsed", isNowCollapsed);
});


  // Calendar Script
const calendarDays = document.getElementById("calendarDays");
const monthLabel = document.getElementById("monthLabel");
const selectedDateLabel = document.getElementById("selectedDate");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

if (calendarDays && monthLabel && selectedDateLabel) {
  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  function renderCalendar(month, year) {
    // Clear previous days
    calendarDays.innerHTML = "";

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Update month label
    monthLabel.textContent = new Date(year, month).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });

    // Create fragment for better performance
    const fragment = document.createDocumentFragment();

    // Blank days before start
    for (let i = 0; i < firstDay; i++) {
      fragment.appendChild(document.createElement("div"));
    }

    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const dayEl = document.createElement("div");
      dayEl.textContent = d;
      dayEl.className =
        "p-2 cursor-pointer rounded-full " +
        (d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
          ? "bg-indigo-500 text-white"
          : "hover:bg-gray-200 dark:hover:bg-gray-700");

      fragment.appendChild(dayEl);
    }

    calendarDays.appendChild(fragment);

    // Update selected date label
    selectedDateLabel.textContent = today.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  // Navigation buttons (only if exist)
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentMonth, currentYear);
    });
  }

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentMonth, currentYear);
    });
  }

  // Initial render
  renderCalendar(currentMonth, currentYear);
}


  const milestones = document.getElementById("milestones");
  const addBtn = document.getElementById("addMilestone");

  if (milestones && addBtn) {
  // Add milestone
  addBtn.addEventListener("click", () => {
    const row = document.createElement("div");
    row.className = "flex items-center space-x-3 milestone-row";

    row.innerHTML = `
      <input type="text" 
             class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
                    rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
             placeholder="Enter milestone or goal">
      <input type="date" 
             class="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
                    rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
      <button type="button" 
              class="remove-btn p-2 text-red-500 dark:text-red-400 
                     hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 
                   1 0 111.414 1.414L11.414 10l4.293 4.293a1 
                   1 0 01-1.414 1.414L10 11.414l-4.293 
                   4.293a1 1 0 01-1.414-1.414L8.586 
                   10 4.293 5.707a1 1 0 010-1.414z" 
                clip-rule="evenodd"/>
        </svg>
      </button>
    `;

    milestones.appendChild(row);
    attachRemoveHandler(row.querySelector(".remove-btn"));
  });

  // Remove milestone
  function attachRemoveHandler(btn) {
    btn.addEventListener("click", () => {
      btn.parentElement.remove();
    });
  }

  // Attach to default row
  document.querySelectorAll(".remove-btn").forEach(attachRemoveHandler);
}



  const dropArea = document.getElementById("drop-area");
  const fileInput = document.getElementById("file-upload");
  const previewContainer = document.getElementById("file-preview");

  // Handle file selection
  if(fileInput){
    fileInput.addEventListener("change", (e) => handleFiles(e.target.files));
  }

  if(dropArea){
        // Drag & drop events
      ["dragenter", "dragover"].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropArea.classList.add("border-indigo-500");
        }, false);
      });

      ["dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropArea.classList.remove("border-indigo-500");
        }, false);
      });

      dropArea.addEventListener("drop", (e) => {
        const files = e.dataTransfer.files;
        handleFiles(files);
      });
  }


  function handleFiles(files) {
    [...files].forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(file.name + " is larger than 10MB!");
        return;
      }
      previewFile(file);
    });
  }

  function previewFile(file) {
    const fileRow = document.createElement("div");
    fileRow.className = "flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg";

    const fileInfo = document.createElement("div");
    fileInfo.className = "flex items-center space-x-3";
    fileInfo.innerHTML = `
      <svg class="w-8 h-8 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 
        2H6a2 2 0 01-2-2V4z"/>
      </svg>
      <div>
        <p class="font-medium text-gray-900 dark:text-white">${file.name}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
    `;

    // Progress + delete button
    const actions = document.createElement("div");
    actions.className = "flex items-center space-x-2";
    actions.innerHTML = `
      <div class="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
        <div class="bg-green-500 h-2 rounded-full progress-bar" style="width: 0%"></div>
      </div>
      <button type="button" class="text-red-500 hover:text-red-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    `;

    fileRow.appendChild(fileInfo);
    fileRow.appendChild(actions);
    previewContainer.appendChild(fileRow);

    // Simulate upload progress
    const progressBar = actions.querySelector(".progress-bar");
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.width = progress + "%";
      if (progress >= 100) clearInterval(interval);
    }, 200);

    // Delete file
    actions.querySelector("button").addEventListener("click", () => {
      fileRow.remove();
    });
  }