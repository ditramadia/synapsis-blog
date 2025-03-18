## About
A simple blog web app with an admin dashboard, created to fulfill a challenge test for Synapsis.

## Requirements

✅ Use Node.js v16.20.2 or higher  
✅ Use npm v8.19.4 or higher  
✅ Use Next.js v13 (Page Router) and TypeScript  
✅ Implement Axios and TanStack Query  
✅ Implement Tailwind CSS and Ant Design  
✅ Consume public data API from GoRest  

## Tech stack

- **Node.js** v22.14.0  
- **npm** v10.9.2  
- **Next.js** v13 (Page Router)  
- **Deployment:** Vercel  

## Libraries  

- **Axios** - Used for making API requests to fetch and update data from the backend.  
- **TanStack (React Query)** - Manages server-state data, handles caching, and ensures efficient data fetching and synchronization.  
- **js-cookie** - Stores and retrieves authentication tokens and user preferences in cookies.  
- **Redux** - Manages global state for handling user authentication, UI state, and other shared data.  
- **Redux Persist** - Ensures the Redux state remains persistent across page reloads by saving it in local storage.  
- **React Hook Form** - Handles form state and validation efficiently with minimal re-renders.  
- **Zod** - Provides schema-based validation for form inputs and API responses.  
- **Font Source** - Loads custom fonts to maintain consistent typography across the app.  
- **Ant Design** - Provides pre-built UI components to maintain a clean and consistent design.  
- **React Toastify** - Displays user-friendly toast notifications for feedback and alerts.  

## Features

- **Authentication & Authorization**  
- **Blog Management**  
  - View blogs  
  - Comment on blogs  
- **Admin Dashboard (CRUD Operations)**  
  - Create blog posts  
  - Edit blog posts  
  - Delete blog posts  

## How to Use

### Admin access

1. Navigate to the `/sign-in` page.  
2. Sign in using the following credentials:  
   - **Email:** franz_kafka@gmail.com  
   - **Password:** metamorphosis123  
3. Access the admin dashboard at `/dashboard` to manage blog posts. 