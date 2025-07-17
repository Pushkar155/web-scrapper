# Web Scraper Frontend

This is a React + TypeScript + Vite frontend for a web scraping application. It allows users to enter a search query or URL, select scraping detail level, and view results.

## Features

- Search by query or URL
- Choose scraping detail level (basic/medium)
- View company data and social links
- Responsive UI with Tailwind CSS and Ant Design
- Toast notifications and confetti for results

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
cd my-project
npm install
```

### Running the App

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Configuration

- The frontend expects the backend API to be running at `http://localhost:5000`.

## Project Structure

- `src/` - React source code
- `src/store/` - Redux Toolkit store and slices
- `src/api/` - Axios API client

# Web Scraper Backend

This is an Express.js backend for scraping company data from websites or search queries. It provides a `/scrape` API endpoint for the frontend.

## Features

- Scrape company info from direct URLs or Google search results
- Supports "basic" and "medium" detail levels
- Export results as JSON or CSV
- CORS enabled for frontend integration

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
cd web-scraper-backend
npm install
```

### Running the Server

```sh
npm run dev
```

The server will start at [http://localhost:5000](http://localhost:5000).

### API Endpoint

#### `POST /scrape`

**Request Body:**

```json
{
  "query": "string (search term or URL)",
  "format": "Json" | "csv",
  "level": "basic" | "medium"
}
```

**Response:**

- JSON or CSV with scraped company data

## Project Structure

- `scraper.js` - Main scraping logic
- `utils/csvExport.js` - CSV export utility
- `index.js` - Express server
