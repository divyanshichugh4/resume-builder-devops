# Dynamic Resume Builder (DevOps Ready)

A full-stack, local web application designed to help users painlessly build, organize, and export stunning resumes. Featuring a fully dynamic data entry engine and natively built to support CI/CD pipelines.

## Features

- **Authentication System**: Secure user login and registration to ensure multiple distinct individuals can maintain private workspaces and dashboards.
- **Dynamic Template Framework**: At its core, the builder doesn't ask you to answer questions irrelevant to the design you chose. The builder form observes your selected template layout and strictly toggles the visibility of the form fields to ensure a frictionless user experience (e.g., hiding Profile Photo options if the template doesn't utilize photography). 
- **Live Miniature Overviews**: Visual live-rendered mini-previews of templates right from your dashboard ensuring you know exactly what design you're embarking on. 
- **Local Application Storage Engine**: Retains persistent collections of resumes utilizing dynamic `JSON` databases mapped cleanly over REST endpoints.
- **Export To PDF**: Effortlessly save or print any completed resume layout tightly configured for standard web print output.

## Included Templates

1. **Simple Layout** - Grid-based standard layout.
2. **Modern Office** - Two-column modern corporate aesthetic.
3. **Professional Dark** - Heavy contrasted left sidebar for deep executive level aesthetic appeal.
4. **Engineering Aesthetic** - Beige left-sidebar emphasizing hard technical skills and references alongside prominent photography.
5. **Creative Format** - Playful typography and pink accents specifically tuned for graphic designers without headshots.
6. **Medical Format** - Dense full-width header format designed for heavily credentialed paths like Nursing where licenses and rigid tabular work constraints are necessary. 

## Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript
- **Backend / API**: Node.js & Express.js
- **Database**: Local JSON storage (`users.json`, `resumes.json`) routed via internal API routes.

## Local Setup & Installation

To run this tool locally on your machine, follow these steps:

1. **Ensure Node.js is Installed**
   Make sure you have Node downloaded and installed on your system.
   
2. **Install Dependencies**
   Navigate into the repository directory and run standard npm install to initialize packages.
   ```bash
   npm install
   ```
   *Note: If no package.json exists yet, run `npm init -y` and `npm install express cors`.*

3. **Start the Application Server**
   Start your backend by spinning up `server.js`.
   ```bash
   node server.js
   ```
   
4. **Launch Application**
   Open your preferred web browser and direct your navigation to **`http://localhost:3000`**!

## Workflow & Usage

1. Create a quick account via the landing page terminal. 
2. Traverse to **Templates** to lock in an aesthetic.
3. Provide targeted information inside the creatively constrained **Builder Form**.
4. Save your resume, returning you to your main generic **Dashboard** where it will exist persistently.
5. Click your rendered resume from the dashboard to invoke the Print dialog and generate your PDF.