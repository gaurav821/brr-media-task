:- setup instructions
   
   1) clone the repository
   2) install dependencies by:-  npm install
   3) start the server by:- npm start
   4) open browser to:- http://localhost:300

:- Features Completed

   1) Dashboard Page:
       -Welcome banner with user greeting
       -Summary cards showing open tickets, pending tasks, and active staff
       -Recent tickets
       -yours to-dos

    2) Staff Directory:
        - Responsive card-based employee listing
        - Basic employee information (name, role, email, status, last login, device-storage,device)

    3) IT Request System:
        - Form with issue type dropdown
        - Description textarea with character count
        - File upload simulation
        - Form validation and submission feedback

    4) Tickets Management:
        - List view of submitted tickets
        - Status indicators (Open/In Progress/Resolved)
    
    5) To-Do List:
        - Add/edit/delete tasks
        - Mark tasks as complete

:- Bonus Features Implemented

    - Responsive layout using Material-UI
    - Loading states for all async operations
    - Empty state placeholders
    - Reusable components (Card, FormField, AlertToast)
    - Basic accessibility improvements for form (ARIA labels, keyboard navigation)

:- Assumptions Made
    - Device Status: Used mock data for device information
    - React Router is used for client-side routing, and basic navigation is implemented for the required pages.
    - Basic form validation
    - For ticket viewing, only the current user’s submissions are shown. Admin-level visibility is not implemented unless stated.
    - File uploads are simulated (file info shown but not uploaded anywhere).

:- Future Improvements

    1) Backend Integration
        - Connect to real authentication service
        - Implement proper API endpoints

    2) Admin Features:
        - User management interface
        - Ticket assignment system
        - Analytics dashboard

    3) Enhanced UI/UX:
        - Animated transitions
        - Dark mode support
        - multiple language support

    4) Access control:
       - According to role apply authorizations

