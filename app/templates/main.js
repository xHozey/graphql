export const test = `<div class="dashboard-container">
    <!-- Header -->
    <div class="dashboard-header">
      <h1>User Dashboard</h1>
      <p>Welcome back, <span id="username">User123</span>!</p>
    </div>

    <!-- User Information Sections -->
    <div class="dashboard-content">
      <!-- Basic Identification -->
      <div class="info-card">
        <h2>Basic Identification</h2>
        <p><strong>Name:</strong> <span id="user-name">John Doe</span></p>
        <p><strong>Email:</strong> <span id="user-email">john.doe@example.com</span></p>
        <p><strong>Role:</strong> <span id="user-role">Student</span></p>
      </div>

      <!-- XP Amount -->
      <div class="info-card">
        <h2>XP Amount</h2>
        <p><strong>Total XP:</strong> <span id="user-xp">1,250</span></p>
        <p><strong>Level:</strong> <span id="user-level">5</span></p>
      </div>

      <!-- Grades -->
      <div class="info-card">
        <h2>Grades</h2>
        <p><strong>Math:</strong> <span id="grade-math">A</span></p>
        <p><strong>Science:</strong> <span id="grade-science">B+</span></p>
        <p><strong>History:</strong> <span id="grade-history">A-</span></p>
      </div>

      <!-- Audits -->
      <div class="info-card">
        <h2>Audits</h2>
        <p><strong>Completed:</strong> <span id="audits-completed">12</span></p>
        <p><strong>Pending:</strong> <span id="audits-pending">3</span></p>
      </div>

      <!-- Skills -->
      <div class="info-card">
        <h2>Skills</h2>
        <p><strong>Programming:</strong> <span id="skill-programming">Advanced</span></p>
        <p><strong>Design:</strong> <span id="skill-design">Intermediate</span></p>
        <p><strong>Communication:</strong> <span id="skill-communication">Expert</span></p>
      </div>
    </div>
  </div>`