import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { 
  X, Upload, FileSpreadsheet, PlusCircle, CheckCircle2, 
  Trash2, Search, KeyRound, Download, 
  FileCheck, Sparkles, Award, Copy, Check,
  Phone, Mail, MessageSquare, ExternalLink, Filter, 
  RefreshCw, Layers, Cpu, Code2, Briefcase,
  Calendar, CheckCircle, Clock, AlertCircle, Lock, LogOut,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  ShieldCheck, ArrowRight, Eye, User, FileText, Database,
  Activity, CheckCircle as CheckIcon, Info, Users, Send
} from 'lucide-react';
import { TechTrainXLogo } from './TechTrainXLogo.js';

interface AdminCertificatePortalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CertRecord {
  certificateId: string;
  studentName: string;
  courseName: string;
  programType: string;
  issueDate: string;
  grade: string;
  skillsCertified: string[];
  email?: string;
}

interface LeadRecord {
  id: string;
  category: string;
  typeKey: 'enrollment' | 'inquiry' | 'quote';
  candidateName: string;
  email: string;
  phone: string;
  collegeOrOrg: string;
  interestOrSubject: string;
  modeOrTiming: string;
  additionalDetails: string;
  status: string;
  date: string;
  rawDate?: string | Date;
}

interface LeadSummary {
  totalLeads: number;
  totalEnrollments: number;
  totalInquiries: number;
  totalQuotes: number;
  hardwareOrders: number;
}

interface DbStatus {
  status: string;
  activeMode: string;
  isMongoConnected: boolean;
  isPrismaConnected: boolean;
  totalCertificates: number;
  totalEnrollments: number;
  totalInquiries: number;
}

export const AdminCertificatePortal: React.FC<AdminCertificatePortalProps> = ({ isOpen, onClose }) => {
  const [authToken, setAuthToken] = useState<string>(() => sessionStorage.getItem('ttx_admin_token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!sessionStorage.getItem('ttx_admin_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'leads' | 'certificates' | 'bulk_cert' | 'manual_cert'>('leads');

  // Database Connection Diagnostics
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);

  // Certificates State
  const [certificatesList, setCertificatesList] = useState<CertRecord[]>([]);
  const [certSearchQuery, setCertSearchQuery] = useState('');
  const [certPage, setCertPage] = useState(1);
  const [certPageSize, setCertPageSize] = useState(25);

  // Leads State
  const [leadsList, setLeadsList] = useState<LeadRecord[]>([]);
  const [leadSummary, setLeadSummary] = useState<LeadSummary>({
    totalLeads: 0,
    totalEnrollments: 0,
    totalInquiries: 0,
    totalQuotes: 0,
    hardwareOrders: 0
  });
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [leadPage, setLeadPage] = useState(1);
  const [leadPageSize, setLeadPageSize] = useState(25);

  // Lead Detail Modal
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Excel / CSV Upload State for Certificates
  const [parsedRows, setParsedRows] = useState<CertRecord[]>([]);
  const [uploadFileName, setUploadFileName] = useState('');

  // Manual Certificate Form State
  const [manualForm, setManualForm] = useState({
    certificateId: `TTXIN2627${Math.floor(1000 + Math.random() * 9000)}`,
    studentName: '',
    courseName: 'Applied Artificial Intelligence & Machine Learning',
    programType: 'Certificate of Internship',
    issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    grade: 'A+ (Outstanding)',
    skills: 'Python, Machine Learning, TensorFlow, REST APIs, Git',
    email: ''
  });

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('ttx_admin_token');
    setAuthToken('');
    setIsAuthenticated(false);
    setPasswordInput('');
    setCertificatesList([]);
    setLeadsList([]);
    setDbStatus(null);
  }, []);

  const fetchDbStatus = useCallback(async (tokenToUse?: string) => {
    const token = tokenToUse || authToken || sessionStorage.getItem('ttx_admin_token');
    if (!token) return;
    try {
      const res = await fetch('/api/admin/db-status', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.database) {
          setDbStatus(data.database);
        }
      }
    } catch (e) {
      console.warn('Failed to fetch DB diagnostics:', e);
    }
  }, [authToken]);

  const fetchCertificates = useCallback(async (tokenToUse?: string) => {
    const token = tokenToUse || authToken || sessionStorage.getItem('ttx_admin_token');
    if (!token) return;
    try {
      const res = await fetch('/api/admin/certificates', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.status === 401) {
        handleLogout();
        setAuthError('Your administrative session has expired. Please sign in again.');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setCertificatesList(data.certificates || []);
      }
    } catch (e) {
      console.error('Failed to fetch certificates list:', e);
    }
  }, [authToken, handleLogout]);

  const fetchLeads = useCallback(async (tokenToUse?: string) => {
    const token = tokenToUse || authToken || sessionStorage.getItem('ttx_admin_token');
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch('/api/admin/leads', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLoading(false);
      if (res.status === 401) {
        handleLogout();
        setAuthError('Your administrative session has expired. Please sign in again.');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setLeadsList(data.allLeads || []);
        if (data.summary) {
          setLeadSummary(data.summary);
        }
      }
    } catch (e) {
      setLoading(false);
      console.error('Failed to fetch leads list:', e);
    }
  }, [authToken, handleLogout]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchCertificates();
      fetchLeads();
      fetchDbStatus();
    }
  }, [isOpen, isAuthenticated, fetchCertificates, fetchLeads, fetchDbStatus]);

  // Reset page when filters change
  useEffect(() => {
    setLeadPage(1);
  }, [leadSearchQuery, categoryFilter, statusFilter, leadPageSize]);

  useEffect(() => {
    setCertPage(1);
  }, [certSearchQuery, certPageSize]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const clean = passwordInput.trim();
    if (!clean) {
      setAuthError('Please enter the administrator passcode.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: clean })
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success && data.token) {
        sessionStorage.setItem('ttx_admin_token', data.token);
        setAuthToken(data.token);
        setIsAuthenticated(true);
        setPasswordInput('');
        setAuthError('');
        fetchCertificates(data.token);
        fetchLeads(data.token);
        fetchDbStatus(data.token);
      } else {
        setAuthError(data.message || 'Invalid administrator passcode.');
      }
    } catch (err) {
      setLoading(false);
      setAuthError('Failed to connect to authentication server. Please try again.');
    }
  };

  // ---------------------------------------------------------------------------
  // FILTERED LEADS & PAGINATION
  // ---------------------------------------------------------------------------
  const filteredLeads = useMemo(() => {
    const q = leadSearchQuery.toLowerCase().trim();
    return leadsList.filter(lead => {
      const matchesSearch = !q || 
        (lead.candidateName && lead.candidateName.toLowerCase().includes(q)) ||
        (lead.phone && lead.phone.toLowerCase().includes(q)) ||
        (lead.email && lead.email.toLowerCase().includes(q)) ||
        (lead.collegeOrOrg && lead.collegeOrOrg.toLowerCase().includes(q)) ||
        (lead.interestOrSubject && lead.interestOrSubject.toLowerCase().includes(q)) ||
        (lead.additionalDetails && lead.additionalDetails.toLowerCase().includes(q)) ||
        (lead.id && lead.id.toLowerCase().includes(q));

      const matchesCategory = 
        categoryFilter === 'all' ||
        (categoryFilter === 'enrollment' && lead.typeKey === 'enrollment') ||
        (categoryFilter === 'hardware' && lead.category.includes('Hardware')) ||
        (categoryFilter === 'inquiry' && lead.typeKey === 'inquiry' && !lead.category.includes('Hardware')) ||
        (categoryFilter === 'quote' && lead.typeKey === 'quote');

      const matchesStatus = 
        statusFilter === 'all' || (lead.status && lead.status.toLowerCase() === statusFilter.toLowerCase());

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [leadsList, leadSearchQuery, categoryFilter, statusFilter]);

  const totalLeadPages = Math.ceil(filteredLeads.length / leadPageSize) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (leadPage - 1) * leadPageSize;
    return filteredLeads.slice(start, start + leadPageSize);
  }, [filteredLeads, leadPage, leadPageSize]);

  // ---------------------------------------------------------------------------
  // FILTERED CERTIFICATES & PAGINATION
  // ---------------------------------------------------------------------------
  const filteredCerts = useMemo(() => {
    const q = certSearchQuery.toLowerCase().trim();
    return certificatesList.filter(c => 
      !q ||
      (c.studentName && c.studentName.toLowerCase().includes(q)) ||
      (c.certificateId && c.certificateId.toLowerCase().includes(q)) ||
      (c.courseName && c.courseName.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q))
    );
  }, [certificatesList, certSearchQuery]);

  const totalCertPages = Math.ceil(filteredCerts.length / certPageSize) || 1;
  const paginatedCerts = useMemo(() => {
    const start = (certPage - 1) * certPageSize;
    return filteredCerts.slice(start, start + certPageSize);
  }, [filteredCerts, certPage, certPageSize]);

  // ---------------------------------------------------------------------------
  // EXPORT LEADS TO EXCEL (.XLSX)
  // ---------------------------------------------------------------------------
  const handleExportLeadsToExcel = () => {
    if (filteredLeads.length === 0) {
      alert('No leads available in the current filter to export.');
      return;
    }

    const formattedRows = filteredLeads.map((lead, idx) => ({
      'S.No': idx + 1,
      'Date': lead.date,
      'Lead Category': lead.category,
      'Candidate / Client Name': lead.candidateName,
      'Phone Number': lead.phone,
      'Email Address': lead.email,
      'College / University / Org': lead.collegeOrOrg,
      'Course / Hardware Project / Subject': lead.interestOrSubject,
      'Mode & Timing Preference': lead.modeOrTiming,
      'Additional Details / Customization': (lead.additionalDetails || '').replace(/\n/g, ' | '),
      'Lead Status': lead.status || 'New',
      'System Lead ID': lead.id
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedRows);
    const columnWidths = [
      { wch: 6 },  // S.No
      { wch: 14 }, // Date
      { wch: 28 }, // Lead Category
      { wch: 24 }, // Candidate Name
      { wch: 18 }, // Phone
      { wch: 28 }, // Email
      { wch: 34 }, // College/Org
      { wch: 38 }, // Course/Project
      { wch: 30 }, // Mode & Timing
      { wch: 45 }, // Additional Details
      { wch: 14 }, // Status
      { wch: 18 }  // Lead ID
    ];
    worksheet['!cols'] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Master_Leads');

    if (categoryFilter === 'all') {
      const admissionsRows = formattedRows.filter(r => r['Lead Category'].includes('Admissions'));
      if (admissionsRows.length > 0) {
        const wsAdmissions = XLSX.utils.json_to_sheet(admissionsRows);
        wsAdmissions['!cols'] = columnWidths;
        XLSX.utils.book_append_sheet(workbook, wsAdmissions, 'Course_Admissions');
      }

      const hardwareRows = formattedRows.filter(r => r['Lead Category'].includes('Hardware'));
      if (hardwareRows.length > 0) {
        const wsHardware = XLSX.utils.json_to_sheet(hardwareRows);
        wsHardware['!cols'] = columnWidths;
        XLSX.utils.book_append_sheet(workbook, wsHardware, 'Hardware_Kit_Orders');
      }
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const fileName = `TechTrainX_Master_Leads_${todayStr}.xlsx`;
    XLSX.writeFile(workbook, fileName);

    setStatusMessage(`Successfully exported ${formattedRows.length} leads to Excel (${fileName})!`);
  };

  // ---------------------------------------------------------------------------
  // EXPORT LEADS TO CSV (.CSV)
  // ---------------------------------------------------------------------------
  const handleExportLeadsToCSV = () => {
    if (filteredLeads.length === 0) {
      alert('No leads available in the current filter to export.');
      return;
    }

    const formattedRows = filteredLeads.map((lead, idx) => ({
      'S.No': idx + 1,
      'Date': lead.date,
      'Category': lead.category,
      'Candidate Name': lead.candidateName,
      'Phone': lead.phone,
      'Email': lead.email,
      'College / Org': lead.collegeOrOrg,
      'Interest / Course / Project': lead.interestOrSubject,
      'Mode & Timing': lead.modeOrTiming,
      'Details': (lead.additionalDetails || '').replace(/\n/g, ' | '),
      'Status': lead.status || 'New',
      'Lead ID': lead.id
    }));

    const csvContent = Papa.unparse(formattedRows);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const todayStr = new Date().toISOString().split('T')[0];
    const fileName = `TechTrainX_Leads_${todayStr}.csv`;
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setStatusMessage(`Successfully exported ${formattedRows.length} leads to CSV (${fileName})!`);
  };

  // ---------------------------------------------------------------------------
  // EXPORT CERTIFICATES TO EXCEL (.XLSX)
  // ---------------------------------------------------------------------------
  const handleExportCertificatesToExcel = () => {
    if (filteredCerts.length === 0) {
      alert('No certificates in registry to export.');
      return;
    }

    const formattedCerts = filteredCerts.map((c, idx) => ({
      'S.No': idx + 1,
      'Certificate ID': c.certificateId,
      'Candidate Name': c.studentName,
      'Course Name': c.courseName,
      'Program Type': c.programType,
      'Grade': c.grade,
      'Issue Date': c.issueDate,
      'Certified Skills': Array.isArray(c.skillsCertified) ? c.skillsCertified.join(', ') : c.skillsCertified,
      'Candidate Email': c.email || 'N/A',
      'Verification URL': `https://techtrainx.online/verify?id=${c.certificateId}`
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedCerts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Verified_Certificates');

    const todayStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `TechTrainX_Certificates_${todayStr}.xlsx`);
    setStatusMessage(`Successfully exported ${formattedCerts.length} certificates to Excel!`);
  };

  // ---------------------------------------------------------------------------
  // UPDATE LEAD STATUS
  // ---------------------------------------------------------------------------
  const handleUpdateLeadStatus = async (lead: LeadRecord, newStatus: string) => {
    const token = authToken || sessionStorage.getItem('ttx_admin_token');
    try {
      const res = await fetch(`/api/admin/leads/${lead.typeKey}/${lead.id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.status === 401) {
        handleLogout();
        setAuthError('Session expired. Please sign in.');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setLeadsList(prev => prev.map(item => item.id === lead.id ? { ...item, status: newStatus } : item));
        if (selectedLead && selectedLead.id === lead.id) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
        }
        setStatusMessage(`Lead status updated to "${newStatus}" for ${lead.candidateName}`);
      }
    } catch (e) {
      console.error('Error updating status:', e);
    }
  };

  // ---------------------------------------------------------------------------
  // DELETE LEAD
  // ---------------------------------------------------------------------------
  const handleDeleteLead = async (lead: LeadRecord) => {
    if (!window.confirm(`Are you sure you want to remove the record for ${lead.candidateName}?`)) return;
    const token = authToken || sessionStorage.getItem('ttx_admin_token');

    try {
      const res = await fetch(`/api/admin/leads/${lead.typeKey}/${lead.id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.status === 401) {
        handleLogout();
        setAuthError('Session expired. Please sign in.');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setLeadsList(prev => prev.filter(item => item.id !== lead.id));
        if (selectedLead && selectedLead.id === lead.id) {
          setSelectedLead(null);
        }
        setStatusMessage(`Record ${lead.id} removed.`);
      }
    } catch (e) {
      console.error('Error deleting lead:', e);
    }
  };

  // ---------------------------------------------------------------------------
  // WHATSAPP DIRECT MESSAGE GENERATOR
  // ---------------------------------------------------------------------------
  const generateWhatsAppLeadLink = (lead: LeadRecord) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('91') && cleanPhone.length === 12
      ? cleanPhone
      : cleanPhone.length === 10
      ? `91${cleanPhone}`
      : cleanPhone;

    const text = `Hello ${lead.candidateName},\n\nThis is the Admissions & Counseling Desk from TechTrainX Technologies (techtrainx.online).\n\nWe received your application regarding ${lead.interestOrSubject} (${lead.modeOrTiming}). We are pleased to share the syllabus roadmap, cohort schedule, and scholarship opportunities.\n\nPlease let us know when you would be available for a brief academic counseling session.`;
    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(text)}`;
  };

  // Sample Certificate Template Download
  const handleDownloadSampleTemplate = () => {
    const sampleData = [
      {
        CertificateNo: 'TTXIN26271105',
        StudentName: 'Rohan Sharma',
        CourseName: 'Applied Artificial Intelligence & Machine Learning',
        ProgramType: 'Certificate of Internship',
        Grade: 'A+ (Outstanding)',
        IssueDate: 'August 10, 2026-27',
        Skills: 'Python, PyTorch, FastAPI, Docker',
        Email: 'rohan.sharma@example.com'
      },
      {
        CertificateNo: 'TTXIN26271106',
        StudentName: 'Priya Verma',
        CourseName: 'Full Stack MERN Stack Engineering',
        ProgramType: 'Summer Training Program (45 Days)',
        Grade: 'O (Excellent)',
        IssueDate: 'August 10, 2026-27',
        Skills: 'React, Node.js, Express, MongoDB, Tailwind',
        Email: 'priya.verma@example.com'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'CertificatesTemplate');
    XLSX.writeFile(wb, 'techtrainx_certificates_upload_template.xlsx');
  };

  // Handle Excel / CSV File Parsing for Certificates
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFileName(file.name);
    setStatusMessage('');

    const reader = new FileReader();

    if (file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          processParsedCertData(results.data);
        }
      });
    } else {
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        processParsedCertData(data);
      };
      reader.readAsBinaryString(file);
    }
  };

  const processParsedCertData = (data: any[]) => {
    const mapped: CertRecord[] = data.map((row: any, index: number) => {
      const certId = row.CertificateNo || row['Certificate ID'] || row.CertificateNumber || row.CertNo || row.cert_id || `TTXIN${26271110 + index}`;
      const name = row.StudentName || row['Candidate Name'] || row.Name || row.Student || 'Candidate';
      const course = row.CourseName || row.Course || row.Program || 'Web & AI Development';
      const type = row.ProgramType || row.Type || row.Category || 'Certificate of Internship';
      const grade = row.Grade || 'A+ (Outstanding)';
      const date = row.IssueDate || row.Date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const rawSkills = row.Skills || row['Certified Skills'] || 'Python, Full Stack, Git';
      const skillsArr = typeof rawSkills === 'string' ? rawSkills.split(',').map(s => s.trim()) : ['Python', 'Web Dev'];
      const email = row.Email || row['Email Address'] || '';

      return {
        certificateId: String(certId).replace(/[^a-zA-Z0-9]/g, '').trim().toUpperCase(),
        studentName: String(name).trim(),
        courseName: String(course).trim(),
        programType: String(type).trim(),
        issueDate: String(date).trim(),
        grade: String(grade).trim(),
        skillsCertified: skillsArr,
        email: String(email).trim()
      };
    });

    setParsedRows(mapped);
    setStatusMessage(`Successfully parsed ${mapped.length} records from ${uploadFileName || 'file'}. Click "Confirm & Issue" to persist to database.`);
  };

  // Bulk Upload Execution
  const handleConfirmBulkUpload = async () => {
    if (parsedRows.length === 0) return;
    const token = authToken || sessionStorage.getItem('ttx_admin_token');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/certificates/bulk', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ certificates: parsedRows })
      });
      if (res.status === 401) {
        handleLogout();
        setAuthError('Session expired. Please sign in.');
        return;
      }
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setStatusMessage(`Successfully issued and registered ${data.count} certificates into MongoDB!`);
        setCertificatesList(data.certificates);
        setParsedRows([]);
        setUploadFileName('');
        setActiveTab('certificates');
        fetchDbStatus();
      }
    } catch (e) {
      setLoading(false);
      setStatusMessage('Error publishing certificates. Please try again.');
    }
  };

  // Submit Single Manual Certificate Creation
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = authToken || sessionStorage.getItem('ttx_admin_token');
    setLoading(true);

    const payload = {
      certificateId: manualForm.certificateId.replace(/[^a-zA-Z0-9]/g, '').trim().toUpperCase(),
      studentName: manualForm.studentName,
      courseName: manualForm.courseName,
      programType: manualForm.programType,
      issueDate: manualForm.issueDate,
      grade: manualForm.grade,
      skillsCertified: manualForm.skills.split(',').map(s => s.trim()),
      email: manualForm.email
    };

    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.status === 401) {
        handleLogout();
        setAuthError('Session expired. Please sign in.');
        return;
      }
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setStatusMessage(`Certificate ${payload.certificateId} issued successfully for ${manualForm.studentName}!`);
        setCertificatesList(data.certificates);
        setManualForm({
          certificateId: `TTXIN2627${Math.floor(1000 + Math.random() * 9000)}`,
          studentName: '',
          courseName: 'Applied Artificial Intelligence & Machine Learning',
          programType: 'Certificate of Internship',
          issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          grade: 'A+ (Outstanding)',
          skills: 'Python, Machine Learning, REST APIs, Git',
          email: ''
        });
        setActiveTab('certificates');
        fetchDbStatus();
      }
    } catch (e) {
      setLoading(false);
      setStatusMessage('Error issuing manual certificate.');
    }
  };

  // Delete Certificate Record
  const handleDeleteCert = async (certId: string) => {
    if (!window.confirm(`Are you sure you want to delete certificate ${certId} from the database?`)) return;
    const token = authToken || sessionStorage.getItem('ttx_admin_token');

    try {
      const res = await fetch(`/api/admin/certificates/${certId}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.status === 401) {
        handleLogout();
        setAuthError('Session expired. Please sign in.');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setCertificatesList(data.certificates);
        setStatusMessage(`Certificate ${certId} removed from registry.`);
        fetchDbStatus();
      }
    } catch (e) {
      console.error('Failed to delete cert:', e);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Main Container */}
      <div className="bg-white max-w-7xl w-full max-h-[96vh] flex flex-col rounded-2xl border border-slate-200 shadow-2xl overflow-hidden relative font-sans">
        
        {/* Top Header Bar */}
        <div className="bg-[#111111] text-white px-5 sm:px-7 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <TechTrainXLogo size="sm" showTagline={false} theme="dark" />
            <div className="h-4 w-[1px] bg-slate-700 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.14em] text-[#d1d5db]">
                  Administrative Operations & Registrar Hub
                </span>
                {isAuthenticated && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-300 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {dbStatus?.isMongoConnected ? 'MongoDB Atlas Live' : 'Database Synced'}
                  </span>
                )}
              </div>
              
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-red-950/60 border border-slate-700 hover:border-red-500/40 transition-all cursor-pointer"
                title="Lock Administrative Session"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Lock Session</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#f8fafc]">
          
          {/* LOGIN SCREEN */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-12 px-6 sm:px-8 bg-white rounded-2xl border border-slate-200 shadow-lg text-center space-y-6">
              
              <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-[#1f2937]">
                <KeyRound className="w-6 h-6" />
              </div>
              
              <div className="space-y-1.5">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#f0f8ff] text-[#1f2937] text-[10px] font-bold uppercase tracking-[0.14em] border border-slate-200">
                  Secured Access
                </span>
                <h3 className="text-2xl font-bold text-[#0a0a0f] tracking-tight">
                  Staff & Registrar <span className="text-[#1f2937] italic font-normal">Gateway</span>
                </h3>
                <p className="text-xs text-slate-600 font-sans">
                  Enter your assigned master passcode to access candidate inquiries, admissions, and certificate issuing tools.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3.5 text-left">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Administrator Passcode
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter Passcode"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white text-center font-mono tracking-widest transition-all"
                    autoFocus
                  />
                </div>

                {authError && (
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-[#1f2937] hover:bg-[#000000] text-white font-bold text-xs tracking-wide uppercase transition-all shadow-md shadow-slate-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? 'Verifying Passcode...' : 'Unlock Administrative Console'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1f2937]" />
                <span>HMAC-SHA256 Timing-Safe Session Authentication</span>
              </div>
            </div>
          ) : (
            /* AUTHENTICATED ADMIN DASHBOARD */
            <div className="space-y-5">
              
              {/* Navigation Tabs Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setActiveTab('leads')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'leads'
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <FileSpreadsheet className={`w-3.5 h-3.5 ${activeTab === 'leads' ? 'text-[#d1d5db]' : 'text-slate-500'}`} />
                    <span>Candidate Leads ({leadsList.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('certificates')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'certificates'
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Award className={`w-3.5 h-3.5 ${activeTab === 'certificates' ? 'text-[#d1d5db]' : 'text-slate-500'}`} />
                    <span>Certificates ({certificatesList.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('bulk_cert')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'bulk_cert'
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Upload className={`w-3.5 h-3.5 ${activeTab === 'bulk_cert' ? 'text-[#d1d5db]' : 'text-slate-500'}`} />
                    <span>Excel Batch Upload</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('manual_cert')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'manual_cert'
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <PlusCircle className={`w-3.5 h-3.5 ${activeTab === 'manual_cert' ? 'text-[#d1d5db]' : 'text-slate-500'}`} />
                    <span>Issue Single Certificate</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => { fetchLeads(); fetchCertificates(); fetchDbStatus(); }}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Refresh Data from Server"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#1f2937] ${loading ? 'animate-spin' : ''}`} />
                    <span>Sync Live DB</span>
                  </button>
                </div>
              </div>

              {/* Status Alert Banner */}
              {statusMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center justify-between gap-2 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{statusMessage}</span>
                  </div>
                  <button onClick={() => setStatusMessage('')} className="text-emerald-600 hover:text-emerald-900 cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* TAB 1: LEADS CRM & EXCEL EXPORT */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  
                  {/* Summary Metric KPI Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <div 
                      onClick={() => setCategoryFilter('all')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        categoryFilter === 'all'
                          ? 'bg-white border-[#1f2937] shadow-sm ring-1 ring-[#1f2937]/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Leads</span>
                        <Users className="w-4 h-4 text-[#1f2937]" />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-[#0a0a0f] my-0.5">
                        {leadsList.length.toLocaleString()}
                      </p>
                      <span className="text-[11px] text-[#1f2937] font-medium">All Direct Inquiries</span>
                    </div>

                    <div 
                      onClick={() => setCategoryFilter('enrollment')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        categoryFilter === 'enrollment'
                          ? 'bg-white border-[#1f2937] shadow-sm ring-1 ring-[#1f2937]/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Course Admissions</span>
                        <Award className="w-4 h-4 text-[#1f2937]" />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-[#1f2937] my-0.5">
                        {(leadSummary.totalEnrollments || leadsList.filter(l => l.typeKey === 'enrollment').length).toLocaleString()}
                      </p>
                      <span className="text-[11px] text-slate-500 font-medium">Internships & Batches</span>
                    </div>

                    <div 
                      onClick={() => setCategoryFilter('hardware')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        categoryFilter === 'hardware'
                          ? 'bg-white border-emerald-600 shadow-sm ring-1 ring-emerald-600/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Hardware Kit Orders</span>
                        <Cpu className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-emerald-700 my-0.5">
                        {(leadSummary.hardwareOrders || leadsList.filter(l => l.category.includes('Hardware')).length).toLocaleString()}
                      </p>
                      <span className="text-[11px] text-slate-500 font-medium">IoT & Robotics Projects</span>
                    </div>

                    <div 
                      onClick={() => setCategoryFilter('quote')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        categoryFilter === 'quote'
                          ? 'bg-white border-slate-700 shadow-sm ring-1 ring-slate-700/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Software Quotes</span>
                        <Briefcase className="w-4 h-4 text-slate-700" />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-slate-800 my-0.5">
                        {(leadSummary.totalQuotes || leadsList.filter(l => l.typeKey === 'quote').length).toLocaleString()}
                      </p>
                      <span className="text-[11px] text-slate-500 font-medium">Enterprise & Custom</span>
                    </div>
                  </div>

                  {/* Search, Filter & Action Toolbar */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                    
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                      
                      {/* Live Search */}
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                        <input
                          type="text"
                          value={leadSearchQuery}
                          onChange={(e) => setLeadSearchQuery(e.target.value)}
                          placeholder="Search candidate name, phone, email, college, or requirement..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white transition-colors"
                        />
                        {leadSearchQuery && (
                          <button
                            onClick={() => setLeadSearchQuery('')}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Export Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={handleExportLeadsToExcel}
                          className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                          title="Download formatted Excel (.xlsx) workbook"
                        >
                          <FileSpreadsheet className="w-4 h-4" />
                          <span>Export Excel (.xlsx)</span>
                        </button>

                        <button
                          onClick={handleExportLeadsToCSV}
                          className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-[#111111] text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                          title="Download CSV (.csv) file"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export CSV</span>
                        </button>
                      </div>

                    </div>

                    {/* Filter Pills and Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs">
                      
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mr-1 flex items-center gap-1">
                          <Filter className="w-3 h-3 text-[#1f2937]" /> Category:
                        </span>
                        {[
                          { key: 'all', label: `All (${leadsList.length})` },
                          { key: 'enrollment', label: 'Admissions' },
                          { key: 'hardware', label: 'Hardware Kits' },
                          { key: 'inquiry', label: 'Queries' },
                          { key: 'quote', label: 'RFP Quotes' }
                        ].map(f => (
                          <button
                            key={f.key}
                            onClick={() => setCategoryFilter(f.key)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                              categoryFilter === f.key
                                ? 'bg-slate-50 text-[#1f2937] border border-slate-300 font-bold'
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-500 font-bold">Status:</span>
                          <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-md px-2 py-1 focus:outline-none focus:border-slate-950"
                          >
                            <option value="all">All Statuses</option>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="follow up">Follow Up</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-500 font-bold">Page Size:</span>
                          <select
                            value={leadPageSize}
                            onChange={(e) => setLeadPageSize(Number(e.target.value))}
                            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-md px-2 py-1 focus:outline-none focus:border-slate-950"
                          >
                            <option value={25}>25 / page</option>
                            <option value={50}>50 / page</option>
                            <option value={100}>100 / page</option>
                            <option value={250}>250 / page</option>
                          </select>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Leads Data Table */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto max-h-[50vh]">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 sticky top-0 z-10">
                          <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Candidate / Client</th>
                            <th className="p-3">Direct Contact</th>
                            <th className="p-3">Requirement & Vertical</th>
                            <th className="p-3">College / University</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {paginatedLeads.length > 0 ? (
                            paginatedLeads.map((lead) => (
                              <tr key={lead.id} className="hover:bg-slate-100/60 transition-colors">
                                {/* Date */}
                                <td className="p-3 whitespace-nowrap text-[11px] text-slate-500 font-mono">
                                  {lead.date}
                                </td>

                                {/* Candidate */}
                                <td className="p-3">
                                  <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                                    <span>{lead.candidateName}</span>
                                  </div>
                                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-0.5 border ${
                                    lead.category.includes('Admissions')
                                      ? 'bg-slate-50 text-[#1f2937] border-slate-200'
                                      : lead.category.includes('Hardware')
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : 'bg-slate-50 text-slate-800 border-slate-200'
                                  }`}>
                                    {lead.category}
                                  </span>
                                </td>

                                {/* Direct Contact Actions */}
                                <td className="p-3 whitespace-nowrap">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-slate-900 text-xs font-semibold">{lead.phone}</span>
                                    <a
                                      href={generateWhatsAppLeadLink(lead)}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="p-1 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors inline-flex border border-emerald-200 cursor-pointer"
                                      title="Send WhatsApp Counseling Message"
                                    >
                                      <MessageSquare className="w-3.5 h-3.5" />
                                    </a>
                                    <a
                                      href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                                      className="p-1 rounded bg-slate-100 text-slate-700 hover:bg-[#111111] hover:text-white transition-colors inline-flex border border-slate-200 cursor-pointer"
                                      title="Direct Phone Call"
                                    >
                                      <Phone className="w-3.5 h-3.5" />
                                    </a>
                                  </div>
                                  <a href={`mailto:${lead.email}`} className="text-[11px] text-slate-500 hover:text-[#1f2937] block truncate max-w-[180px]">
                                    {lead.email}
                                  </a>
                                </td>

                                {/* Subject / Requirement */}
                                <td className="p-3 max-w-xs">
                                  <div className="font-semibold text-slate-900 line-clamp-1">{lead.interestOrSubject}</div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1">{lead.modeOrTiming}</div>
                                  {lead.additionalDetails && (
                                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                                      {lead.additionalDetails}
                                    </p>
                                  )}
                                </td>

                                {/* College / Org */}
                                <td className="p-3 text-slate-600 max-w-[180px] truncate text-xs">
                                  {lead.collegeOrOrg || 'N/A'}
                                </td>

                                {/* Status Selector */}
                                <td className="p-3 whitespace-nowrap">
                                  <select
                                    value={lead.status || 'New'}
                                    onChange={(e) => handleUpdateLeadStatus(lead, e.target.value)}
                                    className={`text-[11px] font-bold px-2 py-1 rounded-md border focus:outline-none cursor-pointer ${
                                      lead.status === 'Converted'
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                        : lead.status === 'Contacted'
                                        ? 'bg-slate-50 text-[#1f2937] border-slate-300'
                                        : lead.status === 'Follow Up'
                                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                                        : 'bg-slate-50 text-slate-700 border-slate-200'
                                    }`}
                                  >
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Follow Up">Follow Up</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Closed">Closed</option>
                                  </select>
                                </td>

                                {/* Actions */}
                                <td className="p-3 text-right whitespace-nowrap">
                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      onClick={() => setSelectedLead(lead)}
                                      className="p-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                                      title="View Full Candidate Profile"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteLead(lead)}
                                      className="p-1.5 rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                                      title="Delete Lead"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="p-8 text-center text-slate-500 text-xs font-sans">
                                No candidate lead records found matching your filters.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Bar */}
                    <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
                      <div>
                        Showing <strong className="text-slate-900 font-semibold">{filteredLeads.length > 0 ? (leadPage - 1) * leadPageSize + 1 : 0}</strong> to <strong className="text-slate-900 font-semibold">{Math.min(leadPage * leadPageSize, filteredLeads.length)}</strong> of <strong className="text-slate-900 font-semibold">{filteredLeads.length.toLocaleString()}</strong> candidates
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setLeadPage(1)}
                          disabled={leadPage === 1}
                          className="p-1.5 rounded bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100 text-slate-700 cursor-pointer disabled:cursor-not-allowed"
                          title="First Page"
                        >
                          <ChevronsLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setLeadPage(p => Math.max(1, p - 1))}
                          disabled={leadPage === 1}
                          className="p-1.5 rounded bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100 text-slate-700 cursor-pointer disabled:cursor-not-allowed"
                          title="Previous Page"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>

                        <span className="px-3 py-1 bg-white border border-slate-200 rounded font-semibold text-slate-900 text-xs">
                          Page {leadPage} of {totalLeadPages}
                        </span>

                        <button
                          onClick={() => setLeadPage(p => Math.min(totalLeadPages, p + 1))}
                          disabled={leadPage === totalLeadPages}
                          className="p-1.5 rounded bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100 text-slate-700 cursor-pointer disabled:cursor-not-allowed"
                          title="Next Page"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setLeadPage(totalLeadPages)}
                          disabled={leadPage === totalLeadPages}
                          className="p-1.5 rounded bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100 text-slate-700 cursor-pointer disabled:cursor-not-allowed"
                          title="Last Page"
                        >
                          <ChevronsRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 2: CERTIFICATES REGISTRY */}
              {activeTab === 'certificates' && (
                <div className="space-y-4">
                  
                  {/* Search & Export Toolbar */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                      <input
                        type="text"
                        value={certSearchQuery}
                        onChange={(e) => setCertSearchQuery(e.target.value)}
                        placeholder="Search certificates by candidate name, certificate ID, or course..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={certPageSize}
                        onChange={(e) => setCertPageSize(Number(e.target.value))}
                        className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:border-slate-950"
                      >
                        <option value={25}>25 / page</option>
                        <option value={50}>50 / page</option>
                        <option value={100}>100 / page</option>
                      </select>

                      <button
                        onClick={handleExportCertificatesToExcel}
                        className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export Excel (.xlsx)</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('manual_cert')}
                        className="px-3.5 py-2 rounded-lg bg-[#1f2937] hover:bg-[#000000] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Issue Single</span>
                      </button>
                    </div>
                  </div>

                  {/* Certificates Table */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto max-h-[50vh]">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 sticky top-0 z-10">
                          <tr>
                            <th className="p-3">Certificate ID</th>
                            <th className="p-3">Candidate</th>
                            <th className="p-3">Course / Program Track</th>
                            <th className="p-3">Grade</th>
                            <th className="p-3">Issue Date</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {paginatedCerts.length > 0 ? (
                            paginatedCerts.map((c) => (
                              <tr key={c.certificateId} className="hover:bg-slate-100/60 transition-colors">
                                <td className="p-3 font-mono font-bold text-[#1f2937]">
                                  <div className="flex items-center gap-1.5">
                                    <span>{c.certificateId}</span>
                                    <button
                                      onClick={() => copyToClipboard(c.certificateId, c.certificateId)}
                                      className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
                                      title="Copy ID"
                                    >
                                      {copiedId === c.certificateId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                    </button>
                                  </div>
                                </td>
                                <td className="p-3 font-semibold text-slate-900 font-sans">
                                  {c.studentName}
                                  {c.email && <span className="block text-[11px] text-slate-500 font-normal">{c.email}</span>}
                                </td>
                                <td className="p-3 text-slate-600">
                                  <span className="font-medium text-slate-800">{c.courseName}</span>
                                  <span className="block text-[10px] text-slate-400">{c.programType}</span>
                                </td>
                                <td className="p-3">
                                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                                    {c.grade}
                                  </span>
                                </td>
                                <td className="p-3 text-slate-500 text-[11px] whitespace-nowrap">{c.issueDate}</td>
                                <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                                  <a
                                    href={`/verify?id=${c.certificateId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-[#1f2937] inline-flex transition-colors cursor-pointer"
                                    title="Open Public Verification Link"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                  <button
                                    onClick={() => handleDeleteCert(c.certificateId)}
                                    className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600 inline-flex transition-colors cursor-pointer"
                                    title="Delete Certificate"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="p-8 text-center text-slate-500 text-xs font-sans">
                                No certificate records match the query.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
                      <div>
                        Showing <strong className="text-slate-900 font-semibold">{filteredCerts.length > 0 ? (certPage - 1) * certPageSize + 1 : 0}</strong> to <strong className="text-slate-900 font-semibold">{Math.min(certPage * certPageSize, filteredCerts.length)}</strong> of <strong className="text-slate-900 font-semibold">{filteredCerts.length.toLocaleString()}</strong> certificates
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setCertPage(1)}
                          disabled={certPage === 1}
                          className="p-1.5 rounded bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100 text-slate-700 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <ChevronsLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setCertPage(p => Math.max(1, p - 1))}
                          disabled={certPage === 1}
                          className="p-1.5 rounded bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100 text-slate-700 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>

                        <span className="px-3 py-1 bg-white border border-slate-200 rounded font-semibold text-slate-900 text-xs">
                          Page {certPage} of {totalCertPages}
                        </span>

                        <button
                          onClick={() => setCertPage(p => Math.min(totalCertPages, p + 1))}
                          disabled={certPage === totalCertPages}
                          className="p-1.5 rounded bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100 text-slate-700 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setCertPage(totalCertPages)}
                          disabled={certPage === totalCertPages}
                          className="p-1.5 rounded bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100 text-slate-700 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <ChevronsRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 3: EXCEL BULK UPLOAD */}
              {activeTab === 'bulk_cert' && (
                <div className="bg-white p-5 sm:p-7 rounded-xl border border-slate-200 shadow-xs space-y-5">
                  
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#1f2937]" />
                        <span>Batch Import Student Certificates (.xlsx, .xls, .csv)</span>
                      </h4>
                      <p className="text-xs text-slate-500 font-sans mt-0.5">
                        Issue hundreds or thousands of verifiable student certificates in a single upload directly into MongoDB.
                      </p>
                    </div>

                    <button
                      onClick={handleDownloadSampleTemplate}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#1f2937]" />
                      <span>Download Excel Template (.xlsx)</span>
                    </button>
                  </div>

                  {/* Dropzone */}
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center space-y-3 bg-slate-50 hover:bg-slate-100/60 hover:border-slate-950 transition-colors relative">
                    <input
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-[#1f2937] flex items-center justify-center mx-auto">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {uploadFileName ? `Selected: ${uploadFileName}` : 'Click or Drag & Drop Spreadsheet Here'}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Accepted columns: CertificateNo, StudentName, CourseName, ProgramType, Grade, IssueDate, Skills, Email
                      </p>
                    </div>
                  </div>

                  {/* Parsed Preview */}
                  {parsedRows.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">
                          Parsed {parsedRows.length} Student Record(s) Ready for Issue:
                        </span>

                        <button
                          onClick={handleConfirmBulkUpload}
                          disabled={loading}
                          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
                        >
                          <FileCheck className="w-4 h-4" />
                          <span>{loading ? 'Publishing...' : `Confirm & Issue All ${parsedRows.length} Certificates`}</span>
                        </button>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-slate-200 max-h-60 bg-white">
                        <table className="w-full text-left text-xs text-slate-700">
                          <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                            <tr>
                              <th className="p-3">Cert ID</th>
                              <th className="p-3">Candidate Name</th>
                              <th className="p-3">Course / Track</th>
                              <th className="p-3">Type</th>
                              <th className="p-3">Grade</th>
                              <th className="p-3">Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {parsedRows.map((r, i) => (
                              <tr key={i} className="hover:bg-slate-50">
                                <td className="p-3 font-bold font-mono text-[#1f2937]">{r.certificateId}</td>
                                <td className="p-3 font-semibold text-slate-900 font-sans">{r.studentName}</td>
                                <td className="p-3 text-slate-600 font-sans">{r.courseName}</td>
                                <td className="p-3 text-slate-500 font-sans">{r.programType}</td>
                                <td className="p-3 text-emerald-700 font-bold">{r.grade}</td>
                                <td className="p-3 text-slate-500 font-sans">{r.issueDate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 4: MANUAL SINGLE CERTIFICATE ISSUANCE */}
              {activeTab === 'manual_cert' && (
                <div className="bg-white p-5 sm:p-7 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  
                  <div className="pb-3 border-b border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <PlusCircle className="w-4 h-4 text-[#1f2937]" />
                      <span>Issue Single Verifiable Certificate</span>
                    </h4>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      Publish a new certificate directly into the MongoDB registry with instant QR verification.
                    </p>
                  </div>

                  <form onSubmit={handleManualSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Certificate ID (Unique) *
                        </label>
                        <input
                          type="text"
                          required
                          value={manualForm.certificateId}
                          onChange={(e) => setManualForm({ ...manualForm, certificateId: e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() })}
                          placeholder="e.g. TTXIN26271102"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white font-mono tracking-wider uppercase font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Student Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={manualForm.studentName}
                          onChange={(e) => setManualForm({ ...manualForm, studentName: e.target.value })}
                          placeholder="e.g. Annu Mishra"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Program Track</label>
                        <select
                          value={manualForm.programType}
                          onChange={(e) => setManualForm({ ...manualForm, programType: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-950 focus:bg-white"
                        >
                          <option value="Certificate of Internship">Certificate of Internship</option>
                          <option value="Summer Training Program (45 Days)">Summer Training Program (45 Days)</option>
                          <option value="6-Month Industrial Apprenticeship">6-Month Industrial Apprenticeship</option>
                          <option value="Vocational Training Certificate">Vocational Training Certificate</option>
                          <option value="Certificate of Completion">Certificate of Completion</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Course Name *</label>
                        <input
                          type="text"
                          required
                          value={manualForm.courseName}
                          onChange={(e) => setManualForm({ ...manualForm, courseName: e.target.value })}
                          placeholder="e.g. Applied Artificial Intelligence & Machine Learning"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Grade Awarded</label>
                        <select
                          value={manualForm.grade}
                          onChange={(e) => setManualForm({ ...manualForm, grade: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-950 focus:bg-white"
                        >
                          <option value="A+ (Outstanding)">A+ (Outstanding)</option>
                          <option value="O (Excellent)">O (Excellent)</option>
                          <option value="A (Very Good)">A (Very Good)</option>
                          <option value="B+ (Good)">B+ (Good)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Issue Date</label>
                        <input
                          type="text"
                          value={manualForm.issueDate}
                          onChange={(e) => setManualForm({ ...manualForm, issueDate: e.target.value })}
                          placeholder="e.g. July 26, 2026-27"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student Email</label>
                        <input
                          type="email"
                          value={manualForm.email}
                          onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                          placeholder="annu.mishra@example.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Certified Technical Skills (Comma Separated)</label>
                      <input
                        type="text"
                        value={manualForm.skills}
                        onChange={(e) => setManualForm({ ...manualForm, skills: e.target.value })}
                        placeholder="e.g. Python, Machine Learning, TensorFlow, REST APIs, Git"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-950 focus:bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 rounded-lg bg-[#1f2937] hover:bg-[#000000] text-white font-bold text-xs tracking-wide uppercase transition-all shadow-md shadow-slate-500/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{loading ? 'Publishing...' : 'Issue Certificate & Register to Database'}</span>
                    </button>

                  </form>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* CANDIDATE DETAIL PROFILE MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#1f2937]">Candidate Dossier</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedLead.candidateName}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-sans">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-mono font-bold text-slate-900 hover:text-[#1f2937]">
                    {selectedLead.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-slate-900 hover:text-[#1f2937] truncate block">
                    {selectedLead.email || 'N/A'}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">College / University</span>
                  <span className="font-medium text-slate-900">{selectedLead.collegeOrOrg || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Date Submitted</span>
                  <span className="font-mono text-slate-900">{selectedLead.date}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Requirement / Course Interest</span>
                <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-medium text-slate-900">
                  {selectedLead.interestOrSubject} ({selectedLead.modeOrTiming})
                </p>
              </div>

              {selectedLead.additionalDetails && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Additional Candidate Notes</span>
                  <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-600 whitespace-pre-line leading-relaxed">
                    {selectedLead.additionalDetails}
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                <a
                  href={generateWhatsAppLeadLink(selectedLead)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-lg bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Message</span>
                </a>

                <a
                  href={`tel:${selectedLead.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Candidate</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
