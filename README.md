### Project Name

Job Scheduler & Automation Dashboard

---

### About This Project

This project is a full-stack Job Scheduler and Automation System built as part of the **Dotix Technologies – Full Stack Developer Skill Test**.

The goal was to design a small but realistic internal automation tool that can create background jobs, run them asynchronously, track their status, and trigger a webhook once a job is completed.

While the problem is simple on the surface, the focus of this project is on **clean architecture, logical backend flow, usable UI, and production-ready practices**, rather than adding unnecessary complexity.

---
### Demo Video Link

Below is a short demo showing job creation, execution, and webhook trigger.

[Click here to watch the demo video](https://drive.google.com/file/d/1aao63GAJH1zMQjjtLN7B4Vaedl1MEiGO/view?usp=sharing)
---

### What This Application Does

- Allows users to create jobs with a task name, JSON payload, and priority
- Stores jobs in a database with an initial `pending` status
- Lets users manually start jobs from the dashboard
- Simulates background execution using an async delay
- Updates job status from `pending` → `running` → `completed`
- Triggers an outbound webhook when a job completes
- Displays jobs in a clean dashboard with filters
- Shows detailed job information including formatted JSON payload
- Supports both light and dark mode UI

---

### Tech Stack Used

Frontend

- React (Vite)
- Tailwind CSS v3
- React Router
- Axios

Backend

- Node.js
- Express.js
- mysql2 (promise-based)
- Axios (for webhook calls)

Database

- MySQL (XAMPP local setup)

---

### High Level Architecture

- React frontend communicates with backend through REST APIs
- Express backend handles job creation, execution, and status transitions
- MySQL stores all job data
- Job execution is simulated asynchronously
- Webhook is triggered after job completion without blocking the API response

---

### Project Structure

- frontend

  - src

    - api
    - components
    - pages
    - routes
    - App.jsx

- backend

  - src

    - config

      - db.js
      - initDb.js (auto database table creation)

    - controllers
    - models
    - routes
    - services

      - webhook.service.js

    - server.js

  - .env

---

### Database Design

- Single table named `jobs`
- Columns include

  - id
  - taskName
  - payload (JSON)
  - priority
  - status
  - createdAt
  - updatedAt

The backend automatically creates the table on server startup using SQL, so no manual database setup is required.

---

### API Endpoints

- POST /jobs

  - Creates a new job

- GET /jobs

  - Returns all jobs
  - Supports filtering by status and priority

- GET /jobs/:id

  - Returns job details

- POST /run-job/:id

  - Starts job execution
  - Updates job status
  - Triggers webhook after completion

---

### Webhook Implementation

- Webhook is triggered when a job reaches `completed` status
- Webhook request is sent asynchronously
- The job flow does not break if the webhook fails
- Webhook URL is configurable using environment variables

Webhook payload contains

- jobId
- taskName
- priority
- payload
- completedAt

Webhook testing was done using webhook.site.

---

### Setup Instructions

Backend

- Go to the backend folder
- Run `npm install`
- Create a `.env` file with database and webhook configuration
- Start the server using `npm run dev`

Frontend

- Go to the frontend folder
- Run `npm install`
- Start the frontend using `npm run dev`

---

### UI and UX Notes

- Clean, modern dashboard layout
- Logical flow from job creation to execution
- Clear loading, empty, and disabled states
- Readable job detail view with formatted JSON
- Light and dark mode support
- UI focused on clarity rather than flashiness

---

### AI Usage Disclosure

AI tools were used during development as allowed by the assignment.
AI was used mainly to **improve frontend UI** and **help with documentation clarity**.

---

### AI Tools Used

- ChatGPT
- Claude

---

### Model Information

- ChatGPT – GPT-5.2
- Claude – Claude 4.5 (Sonnet family)

Exact sub-versions depend on platform defaults at usage time.

---

### Exact Prompts Used (Representative)

Frontend UI

- Improve the dashboard UI using Tailwind CSS while keeping all logic unchanged.
- Improve Tailwind table UI for dark mode with proper contrast.
- Add light and dark mode support using Tailwind without adding new dependencies.
- Polish table, form, and empty state UI for better usability.
- Improve StatusBadge and PriorityBadge components with dark mode support.

Documentation

- Create a clear README structure for a full-stack job scheduler project.
- Rewrite README content in simple headings and bullet points.
- Align README with evaluation criteria.

---

### What AI Helped With

- Frontend UI styling and layout improvements
- Tailwind CSS usage and dark mode support
- Documentation structure and clarity

---

### What AI Did Not Do

- AI did not design the overall architecture
- AI did not make backend business logic decisions
- AI did not auto-generate the full project
- All code was reviewed, understood, and manually implemented

AI was used as a **supporting assistant**, not a replacement for problem-solving.

---

### Testing Notes

- Jobs can be created successfully
- Status transitions work correctly
- Webhook triggers on job completion
- Application works without manual database setup

---

### GitHub Practices

- Clear frontend and backend separation
- No secrets committed to repository

---

### Final Thoughts

This project reflects my understanding of full-stack fundamentals, async backend flows, database handling, UI usability, and responsible AI usage.
