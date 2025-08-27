
# Drupal Security Feed Viewer

A sleek, Apple Music-inspired web application to browse the latest Drupal security advisories. This project provides a clean, fast, and user-friendly interface to stay updated on security notifications from the official Drupal.org RSS feed.

![Drupal Security Feed Screenshot](https://storage.googleapis.com/aistudio-project-files/33719a8f-2834-4a4b-846c-c9c43d3b70e7/5b91258d-7a6e-42b7-a068-07d066373b9e.png)

## ✨ Features

- **Live RSS Feed:** Fetches and displays the latest security news directly from Drupal.org.
- **Elegant UI:** Inspired by Apple Music's clean and modern interface for a premium user experience.
- **Light & Dark Modes:** Seamlessly switch between themes with a dedicated toggle. Your preference is saved in local storage.
- **Real-time Search:** Instantly filter advisories by title or description content as you type.
- **Pagination:** Easily navigate through the list of advisories when it exceeds the page limit.
- **Fully Responsive:** The layout is optimized for a great experience on desktops, tablets, and mobile devices.
- **Modern Tech Stack:** Built with React, TypeScript, and styled with Tailwind CSS for a robust and maintainable codebase.

## 🛠️ Tech Stack

- **Frontend:** [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **RSS Parsing:** Native Browser [DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser) API
- **Icons:** Custom SVG components, inspired by [Feather Icons](https://feathericons.com/).

## 🚀 Getting Started

This project is configured as a static web application and does not require a complex build process. You can run it locally using any simple HTTP server.

### Prerequisites

- A modern web browser.
- A local web server. If you don't have one, you can use the `live-server` VS Code extension or a simple Python server.

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Serve the application:**
    If you have Python 3 installed, you can run a simple server from the project's root directory:
    ```bash
    python3 -m http.server
    ```
    Alternatively, use a tool like `live-server` for automatic reloading:
    ```bash
    npx live-server .
    ```

3.  **Open in browser:**
    Navigate to `http://localhost:8000` (or the port specified by your server) in your web browser.

## 📦 Deployment

This application is ready for deployment on any static hosting platform.

### Deploying to Vercel

1.  **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket).
2.  **Import the project** on your [Vercel dashboard](https://vercel.com/new).
3.  **Configure the project:**
    -   **Framework Preset:** Select **"Other"**.
    -   **Build and Output Settings:** Override the default settings.
        -   **Build Command:** Leave this field **empty**.
        -   **Output Directory:** `.` (or leave the default if it points to the root).
        -   **Install Command:** Leave this field **empty**.
4.  **Click "Deploy"**. Your application will be live in seconds!

## 📂 Project Structure

```
.
├── components/          # Reusable React components
│   ├── AdvisoryCard.tsx
│   ├── ErrorMessage.tsx
│   ├── Icons.tsx
│   ├── LoadingSpinner.tsx
│   ├── Pagination.tsx
│   └── ThemeSwitcher.tsx
├── contexts/            # React Context for state management
│   └── ThemeContext.tsx
├── services/            # Logic for external API calls
│   └── rssService.ts
├── App.tsx              # Main application component
├── index.html           # The main HTML entry point
├── index.tsx            # React application entry point
├── metadata.json        # Application metadata
└── types.ts             # TypeScript type definitions
```

## 🙏 Acknowledgements

- **Data Source:** All security advisories are provided by the official [Drupal Security RSS Feed](https://www.drupal.org/security/rss.xml).
- **UI Inspiration:** The user interface design is heavily inspired by Apple Music.
