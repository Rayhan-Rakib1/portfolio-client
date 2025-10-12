# Portfolio Frontend

![NextJS](https://img.shields.io/badge/NextJS-15.5.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-teal)
![License](https://img.shields.io/badge/License-MIT-red)

🚀 **Frontend for a personal portfolio website** showcasing projects, blogs, and personal information, integrated with a secure owner-only dashboard for managing content.

---

## 🌐 About This Website

**B5A7 Portfolio Website** is a **personal portfolio platform** designed to highlight the portfolio owner's skills, projects, and blogs in a modern, responsive, and professional layout. This website serves both **public visitors** and the **owner/admin** with role-specific features.

### Public Features
- **Explore Blogs:** Visitors can view all blogs and read individual posts with rich formatting.
- **Project Showcase:** Displays personal projects with images, live demo links, descriptions, and tech stack.
- **About Me Section:** Presents personal details, work experience, skills, and contact information.
- **SEO-Friendly URLs:** Slug-based URLs for blogs and projects.
- **Responsive Design:** Works seamlessly on mobile, tablet, and desktop.
- **Social Links:** Provides links to GitHub, LinkedIn, Twitter, and other platforms.

### Owner/Admin Features
- **Secure Login:** JWT-based authentication with social login (Google, GitHub) or email/password.
- **Dashboard:** Private dashboard for managing blogs, projects, and user comments.
- **CRUD Operations:** Ability to create, edit, update, and delete blogs and projects.
- **Comments Management:** Manage user comments on blog posts.
- **Rich Text Editor:** Format content with bold, italic, links, images, and more.
- **Real-Time Notifications:** Provides feedback on actions using toast notifications.

### Design Philosophy
- Clean and modern UI/UX with interactive components such as cards, modals, and smooth transitions.
- Optimized for performance with **NextJS ISR/SSG** for public pages.
- Accessibility-friendly with semantic HTML and responsive design.
- Strict error handling and form validation for a secure and smooth user experience.

**Purpose:**  
This website demonstrates the portfolio owner's **technical skills, projects, and thought leadership through blogs**, while providing a **secure admin interface** to manage content efficiently. It is perfect for personal branding, client showcases, and professional presentations.


---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | NextJS (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS + Radix UI + clsx |
| State Management | React Hook Form + Context API |
| Authentication | NextAuth.js (Credentials + OAuth) |
| Notifications | react-hot-toast / Sonner |
| HTTP Requests | Axios |
| Form Validation | Zod + React Hook Form |
| Deployment | Vercel (recommended) |

---

## 🌐 Pages & Routes

### Public Routes
| Route | Description |
|-------|------------|
| `/` | Home page with hero section and key information |
| `/about` | About Me section with biography, skills, and experience |
| `/projects` | Project showcase page with live demos |
| `/projects/:slug` | Individual project details page |
| `/blogs` | All blogs listing page |
| `/blogs/:slug` | Individual blog page |
| `/login` | Login page (owner/admin) |
| `/register` | Register page (owner/admin) |

### Private Routes (Owner/Admin Only)
| Route | Description |
|-------|------------|
| `/dashboard` | Owner’s dashboard overview |
| `/dashboard/blogs` | Manage all blogs (CRUD) |
| `/dashboard/projects` | Manage all projects (CRUD) |
| `/dashboard/comments` | Moderate blog comments |
| `/dashboard/profile` | Update owner profile and change password |

---

## 🔌 API Integration

The frontend communicates with the **B5A7 Portfolio Backend API**:

### Authentication
- **POST** `/api/user/login` - Login user
- **POST** `/api/user/register` - Register new owner/admin
- **GET** `/api/user/me` - Get logged-in user info
- **PATCH** `/api/user/update-user` - Update profile
- **PATCH** `/api/user/change-password` - Change password

### Blogs
- **GET** `/api/blog/` - Fetch all blogs
- **GET** `/api/blog/:slug` - Fetch individual blog
- **POST** `/api/blog/` - Create blog (Owner only)
- **PATCH** `/api/blog/:id` - Update blog (Owner only)
- **DELETE** `/api/blog/:id` - Delete blog (Owner only)

### Projects
- **GET** `/api/project/` - Fetch all projects
- **GET** `/api/project/:slug` - Fetch individual project
- **POST** `/api/project/` - Create project (Owner only)
- **PATCH** `/api/project/:id` - Update project (Owner only)
- **DELETE** `/api/project/:id` - Delete project (Owner only)

### Comments
- **GET** `/api/comment/blog/:blogId` - Get comments for a blog
- **POST** `/api/comment/blog/:blogId` - Create comment
- **PATCH** `/api/comment/:id` - Update comment (Owner/Admin only)
- **DELETE** `/api/comment/:id` - Delete comment (Owner/Admin only)

---


