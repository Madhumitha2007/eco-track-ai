# 🌱 EcoTrack AI — Smart Environmental Waste Management

[![ForgeHacks 2026](https://img.shields.io/badge/ForgeHacks-2026-059669?style=for-the-badge)](https://forgehacks.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)

> **EcoTrack AI** is a complete, modern, responsive web application engineered for the **ForgeHacks** hackathon to help individuals identify common waste streams, master proper municipal disposal methods, track daily household waste reduction, and monitor estimated environmental impact in real-time.

---

## 🚀 Quick Start & How to Run

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Launch Steps

1. **Clone or Navigate to Project Directory**:
   ```bash
   cd c:\Users\pc\ECOAI
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   > The application will start at `http://localhost:3000` (or `http://localhost:5173`). Open your browser to test and evaluate the live application.

4. **Build Production Bundle** *(Optional)*:
   ```bash
   npm run build
   ```

---

## ✨ Key Features & Highlights

### 1. 📊 Environmental Dashboard
- **Green & Ambient Aesthetic**: Built with custom emerald, teal, and slate glassmorphic surface design tokens.
- **Real-Time Key Metrics**: Instant counters for Total Items Logged, Recyclable %, Organic %, and Special Handling count.
- **Interactive SVG Charts**: Responsive Donut & Bar charts rendering category breakdown with active hover tooltips.
- **Daily Eco-Tip Engine**: Rotating curated tip database with actionable steps and one-click refresh.

### 2. 🔍 Smart Waste Classifier
- **Dual Classification Modes**:
  - **Option A (Image Upload & Analysis)**: Drag-and-drop or select an image for client-side visual spectrum analysis, complete with confidence scores and explicit **Demo AI Recognition** badges.
  - **Option B (Manual Category Override)**: Full interactive selector covering all 7 standard municipal waste categories.
- **Comprehensive Streams**: Organic Waste, Paper & Cardboard, Rigid Plastics, Glass Packaging, Metals & Cans, Electronic Waste (E-Waste), and Hazardous Household Waste (HHW).
- **Step-by-Step Instructions**: Precise cleaning, flattening, and stream sorting steps.
- **One-Click Tracker Logging**: Pre-populates item metadata and logs directly to browser LocalStorage.

### 3. 📖 Municipal Disposal Guide
- **Searchable Directory**: Instantly search items like *"battery"*, *"pizza box"*, *"fluorescent tube"*, or *"lightbulb"*.
- **Critical Safety Warning Banner**: High-visibility hazard alerts preventing lithium batteries, e-waste, and chemicals from entering standard curbside bins.
- **Recycling & Composting Guidelines**: Explains carbon-to-nitrogen ratios, bottle depot rules, and material pulp separation.

### 4. 📝 Personal Waste Tracker Log
- **Form to Log Waste**: Add title/description, select category stream, quantity (kg or items), log date, and custom notes.
- **Interactive Table**: Searchable, filterable by category, and sortable by date, title, or weight.
- **LocalStorage Sync**: Data persists locally across browser refreshes with zero backend latency or server requirements.
- **Demo Data Controls**: Includes realistic pre-loaded demo records for instant hackathon showcase, with 1-click **Reset Demo Data** and **Clear All** capabilities.

### 5. 🌍 Eco Impact Analytics
- **Standard Environmental Metrics**: Estimates CO₂ avoided (kg), Landfill diverted (kg), Water saved (Liters), Energy saved (kWh), and Mature Tree absorption equivalents.
- **Transparent Methodology**: Includes a toggleable reference table detailing exact conversion factors derived from standard EPA Waste Reduction Model (WARM) reference data.
- **Clear Estimation Disclaimer**: Explicitly states that metrics are educational approximations for demo purposes rather than certified laboratory audits.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 (TypeScript) |
| **Build Tool & Server** | Vite 6 |
| **Styling & Design** | Tailwind CSS 3.4 + Custom Glassmorphism System |
| **Icons** | Lucide React |
| **Data Persistence** | HTML5 Browser `localStorage` |
| **Visualization** | Custom SVG Responsive Charts (Zero third-party chart bloat) |

---

## ⚠️ Known Limitations & Design Decisions

1. **Client-Side Demo Image Classification**:
   - Image analysis is performed in the browser using canvas pixel heuristics (color spectrum, brightness, texture, filename hints).
   - In accordance with hackathon guidelines, the feature is explicitly badged as **Demo AI Recognition** with confidence scores and full manual category selection so users are never misled.
2. **Environmental Metric Scope**:
   - Impact metrics are calculated using average standard EPA conversion factors. A prominent disclaimer is included across the application.
3. **Storage Scope**:
   - Waste records are saved locally in the browser's `localStorage` (100% private, zero external API keys or server costs required).

---

## 🧪 Testing Main Features

1. **Test Waste Tracker**:
   - Go to **Waste Tracker** in the sidebar.
   - Click **"Add Waste Record"**, fill in *"10 Plastic Bottles"*, quantity `0.5 kg`, date today, and click Save.
   - Verify the record appears in the table and updates the KPI counters on the Dashboard.
   - Refresh the page and confirm the data remains intact.
2. **Test Waste Classifier**:
   - Navigate to **Waste Classifier**.
   - Upload an image or drag-and-drop a file.
   - Observe the confidence score, detected features, and step-by-step disposal instructions.
   - Click **"Save to Tracker"** to log the classified item directly.
3. **Test Search & Disposal Guide**:
   - Go to **Disposal Guide**.
   - Type *"battery"* in the search box to highlight hazard disposal rules for electronic waste.
4. **Test Demo Data Reset**:
   - Click **"Reset Demo Data"** in the top yellow notification bar to reload the default sample dataset at any time.

---

*Built with ❤️ for ForgeHacks 2026.*
