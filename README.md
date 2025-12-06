# Admin Panel with Populate (MERN Stack)

A complete Admin Panel to manage Categories, SubCategories, and Products. This project demonstrates complex database relationships using MongoDB `populate` (joining 3 tables).

## Features
- **Category Management**: Create and list categories.
- **SubCategory Management**: Create subcategories linked to categories (One-level populate).
- **Product Management**: Create products linked to subcategories.
- **Deep Populate**: Product list shows data joined from 3 tables (`Product` -> `SubCategory` -> `Category`).
- **Design**: Minimalist Black & White theme.

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)

## How to Run

1. **Install Dependencies**
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```

2. **Start Project (Frontend + Backend)**
   ```bash
   npm start
   ```
   - **Frontend**: http://localhost:5173
   - **Backend**: http://localhost:5000
