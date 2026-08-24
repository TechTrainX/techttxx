# 🚀 TechTrainX Engineering Platform (A Unit of Xnava Enterprises)

> **Official Enterprise EdTech Platform & Software Engineering Services Portal**
> **Domain**: [https://techtrainx.online](https://techtrainx.online) | **Parent Hub**: [https://xnava.in](https://xnava.in)
> **Official Email**: `ttx@xnava.in` | **WhatsApp / Direct Support**: `+91 8545092070` / `+91 8545092070`
> **Accreditation**: ISO 9001:2015 Accredited Quality Framework

---

## 📋 Table of Contents
1. [Overview & Architecture](#-overview--architecture)
2. [Key Features](#-key-features)
3. [Local Development Setup (VS Code)](#-local-development-setup-vs-code)
4. [Deploying to Vercel (via GitHub)](#-deploying-to-vercel-via-github)
5. [Deploying to Hostinger Virtual Machine (VPS)](#-deploying-to-hostinger-virtual-machine-vps)
6. [Domain & DNS Setup (GoDaddy -> techtrainx.online)](#-domain--dns-setup-godaddy---techtrainxonline)
7. [Email & Mailbox Integration (Hostinger ttx@xnava.in)](#-email--mailbox-integration-hostinger-ttxxnavain)
8. [Admin Certificate Issuance & Excel Upload Guide](#-admin-certificate-issuance--excel-upload-guide)
9. [Prisma PostgreSQL Database Setup](#-prisma-postgresql-database-setup)
10. [API Reference & Route Map](#-api-reference--route-map)

---

## 🏛️ Overview & Architecture

TechTrainX is a full-stack, enterprise-grade EdTech and IT consulting platform built with modern software architecture standards:
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS (Dual Light & Dark Theme), Motion, Lucide Icons.
- **Backend API**: Express.js server bundled into CommonJS via `esbuild`.
- **Database**: MongoDB database cluster powered by Prisma ORM (`mongodb` provider with native ObjectId relations).
- **Media Engine**: ImageKit CDN integration for fast optimized media delivery.
- **Mail Engine**: Hostinger SMTP via Nodemailer sending real-time candidate notifications to `ttx@xnava.in`.
- **Excel Processor**: `xlsx` (SheetJS) + `PapaParse` for bulk student certificate imports.

---

## ✨ Key Features

1. **Dual Theme Engine (Dark Mode & Light Mode)**:
   - Smooth transition with localStorage memory and clean color contrast.
2. **ISO 9001:2015 Certificate Verification Portal**:
   - Instant search by Certificate ID (e.g. `TTXIN26271102`).
   - Generates authentic digital certificate replica with Co-Founder (**Suraj Chauhan**) & Director (**R. S. Pandey**) signatures.
3. **Admin Certificate Issuance & Excel/CSV Bulk Upload**:
   - Drag and drop Excel (`.xlsx`) or CSV files to auto-issue certificates.
   - Manual form input for single candidate issuance.
4. **Interactive CodeHelper Playground (Gemini AI)**:
   - Live browser code simulator with instant explanation and debugging.
5. **Corporate Software Services Quote Calculator**:
   - Immediate budget and timeline estimation for custom enterprise software development.
6. **Live WhatsApp Assistant**:
   - Floating action button connected directly to `+91 8545092070`.

---

## 💻 Local Development Setup (VS Code)

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: Installed on your operating system
- **VS Code**: Recommended extensions:
  - ESLint
  - Tailwind CSS IntelliSense
  - Prisma extension

### Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/techtrainx-platform.git
cd techtrainx-platform

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# Edit .env with your credentials (SMTP, Gemini API Key, Database URL)
```

```env
GEMINI_API_KEY="your_gemini_api_key_here"
SMTP_USER="ttx@xnava.in"
SMTP_PASS="your_hostinger_mailbox_password"
DATABASE_URL="postgresql://user:pass@localhost:5432/techtrainx_db"
IMAGEKIT_PUBLIC_KEY="your_imagekit_public_key"
```

```bash
# 4. Generate Prisma Client
npx prisma generate

# 5. Launch Development Server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## ☁️ Deploying to Vercel (via GitHub)

1. Push your local codebase to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial TechTrainX Enterprise Build"
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/techtrainx.git
   git branch -M main
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com).
3. Click **"Add New Project"** -> Select your `techtrainx` repository.
4. Set Build Settings:
   - **Framework Preset**: Vite / Node.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Environment Variables:
   - Add `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`, `SMTP_USER`, `SMTP_PASS`, `SMTP_HOST`, `DATABASE_URL`.
6. Click **Deploy**. Vercel will provide an auto-generated URL (e.g. `techtrainx.vercel.app`).

---

## 🖥️ Deploying to Hostinger Virtual Machine (VPS)

### Step 1: Connect to your Hostinger VPS via SSH
```bash
ssh root@YOUR_HOSTINGER_VPS_IP
```

### Step 2: Install Node.js, PM2, and Nginx
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git
sudo npm install -g pm2
```

### Step 3: Clone & Build the Project
```bash
cd /var/www
git clone https://github.com/YOUR_GITHUB_USERNAME/techtrainx.git
cd techtrainx
npm install
npm run build
```

### Step 4: Start the Server with PM2
```bash
pm2 start dist/server.cjs --name "techtrainx"
pm2 save
pm2 startup
```

### Step 5: Configure Nginx Reverse Proxy
Edit `/etc/nginx/sites-available/techtrainx`:
```nginx
server {
    listen 80;
    server_name techtrainx.online www.techtrainx.online;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site & reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/techtrainx /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: SSL Security (Certbot / Let's Encrypt)
```bash
sudo apt-get install certbot python3-certbot-nginx -y
sudo certbot --nginx -d techtrainx.online -d www.techtrainx.online
```

---

## 🌐 Domain & DNS Setup (GoDaddy -> techtrainx.online)

1. Log into your **GoDaddy Domain Control Center**.
2. Select your domain: `techtrainx.online`.
3. Go to **DNS Management** and add the following records:

| Type | Name | Value / Points To | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `YOUR_HOSTINGER_VPS_IP` | `600 seconds` |
| **CNAME** | `www` | `techtrainx.online` | `1 Hour` |
| **MX** | `@` | `mx1.hostinger.com` (Priority 10) | `1 Hour` |
| **MX** | `@` | `mx2.hostinger.com` (Priority 20) | `1 Hour` |
| **TXT** | `@` | `v=spf1 include:hostinger.com ~all` | `1 Hour` |

---

## 📧 Email & Mailbox Integration (Hostinger ttx@xnava.in)

1. Log into **Hostinger hPanel** -> **Emails** -> `xnava.in`.
2. Ensure mailbox `ttx@xnava.in` is active.
3. Use the following SMTP configuration in `.env`:
   - **SMTP Host**: `smtp.hostinger.com`
   - **SMTP Port**: `465` (SSL)
   - **SMTP User**: `ttx@xnava.in`
   - **SMTP Pass**: `[Your Hostinger Mail Password]`

Whenever candidate applications or contact inquiries occur, Nodemailer automatically routes formatted email alerts to `ttx@xnava.in`.

---

## 📑 Admin Certificate Issuance & Excel Upload Guide

### Step 1: Access Admin Portal
1. Click **"Admin Portal"** in top navbar.
2. Enter Passcode: `admin123` or `admin@xnava.in`.

### Step 2: Excel Template Format
Ensure your Excel spreadsheet (`.xlsx` or `.csv`) contains these exact column headers:

| Column Header | Required | Example |
| :--- | :---: | :--- |
| `CertificateNo` | **Yes** | `TTXIN26271105` |
| `StudentName` | **Yes** | `Annu Mishra` |
| `CourseName` | **Yes** | `Agentic AI & Python Development` |
| `ProgramType` | **Yes** | `Certificate of Internship` |
| `Grade` | No | `A+ (Outstanding)` |
| `IssueDate` | No | `July 26, 2026` |
| `Skills` | No | `Agentic AI, Python, Git` |
| `Email` | No | `annu.mishra@example.com` |

### Step 3: Drag & Drop Upload
1. Drag your populated `.xlsx` or `.csv` file into the upload zone.
2. Preview candidate records on screen.
3. Click **"Confirm & Issue All Certificates"**.
4. The certificates are live instantly at `https://techtrainx.online` under Verification portal.

---

## 🗄️ MongoDB Database Setup (Prisma ORM)

1. Check `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "mongodb"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model Certificate {
     id               String   @id @default(auto()) @map("_id") @db.ObjectId
     certificateId    String   @unique
     studentName      String
     courseName       String
     programType      String
     issueDate        DateTime @default(now())
     grade            String   @default("A+")
     skillsCertified  String[]
     createdAt        DateTime @default(now())
   }
   ```
2. Configure MongoDB URL in `.env`:
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/techtrainx_db?retryWrites=true&w=majority"
   ```
3. Push schema & generate Prisma Client for MongoDB:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

---

## 🔌 API Reference & Route Map

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `GET` | `/api/health` | Healthcheck & server diagnostic info |
| `GET` | `/api/courses` | Returns course catalog & weekly syllabi |
| `GET` | `/api/programs` | Returns training verticals |
| `GET` | `/api/batches` | Returns live upcoming batch schedules |
| `POST` | `/api/enroll` | Candidate course enrollment handler |
| `POST` | `/api/contact` | Direct message routing to `ttx@xnava.in` |
| `GET` | `/api/verify-certificate` | Certificate lookup by ID |
| `GET` | `/api/admin/certificates` | Admin fetch all issued certificates |
| `POST` | `/api/admin/certificates` | Admin bulk import or single certificate creation |
| `DELETE` | `/api/admin/certificates/:id` | Remove certificate from registry |
| `POST` | `/api/software-quote` | Corporate software project quote request |

---

## 🏢 Corporate Entity Metadata
- **Company Name**: TechTrainX (A Unit of Xnava Enterprises)
- **Parent Entity**: Xnava Enterprises (`https://xnava.in`)
- **Co-Founder**: Suraj Chauhan
- **Director**: R. S. Pandey
- **Official Mail**: `ttx@xnava.in`
- **Official Domain**: `techtrainx.online`
- **Phone / WhatsApp**: `+91 8545092070` / `+91 8545092070`
