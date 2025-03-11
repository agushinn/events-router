# Full-Stack Project Description: Node.js API & React Application

This project consists of two integrated parts working together to provide a complete solution. Below is an overview of the architecture and key features of each component, along with details on how they integrate.


### https://events-router-frontend.vercel.app/

### https://events-router-backend.vercel.app/api/v1/events

---

## 1. Node.js API Backend

### Architecture & Organization
- **MVC Pattern with Layered Responsibilities:**
  - **Routes:** Define endpoints for authentication, events, newsletters, and email configuration.
  - **Controllers:** Handle HTTP requests and delegate business logic to the services.
  - **Services:** Implement business logic, validations, and orchestrate data operations.
  - **Repositories:** Manage data access and persistence, using a JSON file (`events.json`) as a simulated database.
- **Utilities & Factories:**
  - Utility functions for data validation, file read/write operations, and custom error handling.
  - Factories for creating users (both regular and admin) with predefined roles and permissions.
- **Key Features:**
  - **User Management & Authentication:**
    - Registration for regular and admin users, login functionality, and JWT token generation.
  - **Event Management:**
    - Full CRUD operations (create, read, update, delete) for events with field validations (e.g., title, image URL, description, date).
  - **Newsletter Management:**
    - Email subscription/unsubscription and bulk newsletter sending using a third-party email service (Resend).
  - **Centralized Error & Response Handling:**
    - A base controller that provides unified success/error responses and global error middleware.

### General Flow
1. **Initialization & Configuration:**  
   The `app.js` file sets up middlewares, CORS settings, and routes.
2. **Request Processing:**  
   Incoming requests are routed to the appropriate controllers, which call the services to process the business logic and interact with repositories.
3. **Error Handling:**  
   Centralized error management ensures consistent error responses and validation feedback.

---

## 2. React Frontend Application with React Router

### Architecture & Organization
- **Modular Structure within `src`:**
  - **Core:**  
    Contains global configurations, constants, context providers, main route definitions, and core services (like authentication).
  - **Features:**  
    Independent modules for each functionality:
    - **Auth:** Manages authentication forms, pages, routes, and services.
    - **Events:** Handles event listing, creation, editing, and deletion with dedicated components, pages, hooks, routes, and services.
    - **Control:** An admin panel for managing email configurations and creating new administrators, accessible only to authorized users.
    - **Home & Newsletter:** Includes home pages and newsletter subscription forms.
  - **Shared:**  
    Reusable components and layouts (e.g., main navigation, modals).

### Advanced Use of React Router
- **Loaders:**  
  - Preload necessary data for rendering routes (e.g., `tokenRootLoader` for token data, `eventsLoader` for event listings, etc.).
- **Actions:**  
  - Handle form submissions and other state mutations (e.g., `logoutAction` for logging out, authentication actions, or updates within the control panel).
- **Route Protection:**  
  - Functions like `checkAuthLoader` and `createProtectedLoader` verify authentication and user permissions before granting access to sensitive routes.
  - Validation of tokens, user roles, and user types ensures unauthorized users are redirected appropriately.
- **Dynamic Layouts:**  
  - The `RootLayout` integrates the main navigation and manages token expiration, automatically logging out users when needed.

### Key Features
- **Authentication & Session Management:**
  - Provides login and registration forms along with dedicated error pages for authentication issues.
  - Stores tokens in local storage with mechanisms for token validation, expiration, and automatic logout.
- **API Integration:**
  - Consumes the Node.js API endpoints to manage users, events, and newsletters.
  - Synchronizes application state with backend data using loaders and actions.
- **Event Management:**
  - Enables users to view, create, edit, and delete events, with nested routes for event details and editing.
- **Admin Control Panel:**
  - Offers functionality for users with the "CONTROL_PANEL" permission to manage email configurations and create admin users.

---

## 3. Integration & Conclusion

### Frontend-Backend Communication
- **Data Exchange:**  
  The React application makes HTTP requests to the Node.js API for:
  - User authentication and token management.
  - Fetching and manipulating events and newsletter data.
- **Security & Controlled Access:**  
  The backend handles data validation and processing, while the frontend uses React Router loaders and actions to manage navigation, state, and route protection based on the token and user roles.
- **Consistent User Experience:**  
  Advanced React Router features (loaders, actions, and route protection) ensure smooth navigation and dynamic content updates, with secure access to sensitive areas.


