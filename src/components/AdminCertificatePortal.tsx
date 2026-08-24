import React, { useState, useEffect, useCallback } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { 
  X, Upload, FileSpreadsheet, PlusCircle, CheckCircle2, 
  Trash2, Search, ShieldAlert, KeyRound, Download, 
  FileCheck, Sparkles, User, Award, Eye, Copy, Check,
  Phone, Mail, MessageSquare, ExternalLink, Filter, 
  ArrowUpDown, RefreshCw, Layers, Cpu, Code2, Briefcase,
  Calendar, CheckCircle, Clock, AlertCircle, Lock, LogOut
} from 'lucide-react';
import { createWhatsAppDirectQueryLink } from '../services/whatsappService';
import { ADMIN_CONFIG } from '../config/adminConfig';

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

export const AdminCertificatePortal: React.FC<AdminCertificatePortalProps> = ({ isOpen, onClose }) => {
  const [authToken, setAuthToken] = useState<string>(() => sessionStorage.getItem('ttx_admin_token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!sessionStorage.getItem('ttx_admin_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'leads' | 'certificates' | 'bulk_cert' | 'manual_cert'>('leads');

  // Certificates State
  const [certificatesList, setCertificatesList] = useState<CertRecord[]>([]);
  const [certSearchQuery, setCertSearchQuery] = useState('');

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

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Excel / CSV Upload State for Certificates
  const [parsedRows, setParsedRows] = useState<CertRecord[]>([]);
  const [uploadFileName, setUploadFileName] = useState('');

  // Manual Certificate Form State
  const [manualForm, setManualForm] = useState({
    certificateId: `TTXIN${26270000 + Math.floor(1000 + Math.random() * 9000)}`,
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
  }, []);

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
    }
  }, [isOpen, isAuthenticated, fetchCertificates, fetchLeads]);

  if (!isOpen) return null;

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
      } else {
        setAuthError(data.message || 'Invalid administrator passcode.');
      }
    } catch (err) {
      setLoading(false);
      setAuthError('Failed to connect to authentication server. Please try again.');
    }
  };


  // ---------------------------------------------------------------------------
  // EXPORT LEADS TO EXCEL (.XLSX)
  // ---------------------------------------------------------------------------
  const handleExportLeadsToExcel = () => {
    const dataToExport = getFilteredLeads();

    if (dataToExport.length === 0) {
      alert('No leads available in the current filter to export.');
      return;
    }

    // Format rows with clean, professional column headers
    const formattedRows = dataToExport.map((lead, idx) => ({
      'S.No': idx + 1,
      'Date': lead.date,
      'Lead Category': lead.category,
      'Candidate / Client Name': lead.candidateName,
      'Phone Number': lead.phone,
      'Email Address': lead.email,
      'College / University / Org': lead.collegeOrOrg,
      'Course / Hardware Project / Subject': lead.interestOrSubject,
      'Mode & Timing Preference': lead.modeOrTiming,
      'Additional Details / Customization': lead.additionalDetails.replace(/\n/g, ' | '),
      'Lead Status': lead.status || 'New',
      'System Lead ID': lead.id
    }));

    // Create Worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedRows);

    // Auto-fit column widths
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

    // Create Multi-Sheet Workbook with filtered views
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Master_Leads');

    // Also append individual category sheets if exporting all
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
    const fileName = `TechTrainX_Leads_Admissions_${todayStr}.xlsx`;
    XLSX.writeFile(workbook, fileName);

    setStatusMessage(`Successfully exported ${formattedRows.length} leads to Excel (${fileName})!`);
  };

  // ---------------------------------------------------------------------------
  // EXPORT LEADS TO CSV (.CSV)
  // ---------------------------------------------------------------------------
  const handleExportLeadsToCSV = () => {
    const dataToExport = getFilteredLeads();

    if (dataToExport.length === 0) {
      alert('No leads available in the current filter to export.');
      return;
    }

    const formattedRows = dataToExport.map((lead, idx) => ({
      'S.No': idx + 1,
      'Date': lead.date,
      'Category': lead.category,
      'Candidate Name': lead.candidateName,
      'Phone': lead.phone,
      'Email': lead.email,
      'College / Org': lead.collegeOrOrg,
      'Interest / Course / Project': lead.interestOrSubject,
      'Mode & Timing': lead.modeOrTiming,
      'Details': lead.additionalDetails.replace(/\n/g, ' | '),
      'Status': lead.status || 'New',
      'Lead ID': lead.id
    }));

    const csvContent = Papa.unparse(formattedRows);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const todayStr = new Date().toISOString().split('T')[0];
    const fileName = `TechTrainX_Leads_Admissions_${todayStr}.csv`;
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
    if (certificatesList.length === 0) {
      alert('No certificates in registry to export.');
      return;
    }

    const formattedCerts = certificatesList.map((c, idx) => ({
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
    XLSX.writeFile(workbook, `TechTrainX_Issued_Certificates_${todayStr}.xlsx`);
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
        setStatusMessage(`Lead ${lead.candidateName} updated to "${newStatus}"`);
      }
    } catch (e) {
      console.error('Error updating status:', e);
    }
  };

  // ---------------------------------------------------------------------------
  // DELETE LEAD
  // ---------------------------------------------------------------------------
  const handleDeleteLead = async (lead: LeadRecord) => {
    if (!window.confirm(`Are you sure you want to delete lead from ${lead.candidateName}?`)) return;
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
        setStatusMessage(`Lead ${lead.id} removed.`);
      }
    } catch (e) {
      console.error('Error deleting lead:', e);
    }
  };

  // ---------------------------------------------------------------------------
  // WHATSAPP DIRECT MESSAGE GENERATOR FOR LEADS
  // ---------------------------------------------------------------------------
  const generateWhatsAppLeadLink = (lead: LeadRecord) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    const text = `Hello ${lead.candidateName},\n\nThis is the Admissions Team from *TechTrainX Technologies*.\n\nWe received your inquiry regarding *${lead.interestOrSubject}* (${lead.modeOrTiming}). We'd love to share the syllabus, batch schedule, and fee grant details with you.\n\nCould you please let us know a convenient time for a quick 2-minute counseling call?`;
    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(text)}`;
  };

  // Filter Leads by Search and Category
  const getFilteredLeads = () => {
    return leadsList.filter(lead => {
      const matchesSearch = 
        lead.candidateName.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        lead.phone.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        lead.collegeOrOrg.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        lead.interestOrSubject.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        lead.additionalDetails.toLowerCase().includes(leadSearchQuery.toLowerCase());

      const matchesCategory = 
        categoryFilter === 'all' ||
        (categoryFilter === 'enrollment' && lead.typeKey === 'enrollment') ||
        (categoryFilter === 'hardware' && lead.category.includes('Hardware')) ||
        (categoryFilter === 'inquiry' && lead.typeKey === 'inquiry' && !lead.category.includes('Hardware')) ||
        (categoryFilter === 'quote' && lead.typeKey === 'quote');

      const matchesStatus = 
        statusFilter === 'all' || lead.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  // Filter Certificates by Search
  const filteredCerts = certificatesList.filter(c => 
    c.studentName.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
    c.certificateId.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
    c.courseName.toLowerCase().includes(certSearchQuery.toLowerCase())
  );

  // Sample Certificate Template Download
  const handleDownloadSampleTemplate = () => {
    const sampleData = [
      {
        CertificateNo: 'TTXIN26271105',
        StudentName: 'Rohan Sharma',
        CourseName: 'Applied Artificial Intelligence & Machine Learning',
        ProgramType: 'Certificate of Internship',
        Grade: 'A+ (Outstanding)',
        IssueDate: 'August 10, 2026',
        Skills: 'Python, PyTorch, Fast API, Docker',
        Email: 'rohan.sharma@example.com'
      },
      {
        CertificateNo: 'TTXIN26271106',
        StudentName: 'Priya Verma',
        CourseName: 'Full Stack MERN Stack Engineering',
        ProgramType: 'Summer Training Program',
        Grade: 'O (Excellent)',
        IssueDate: 'August 10, 2026',
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
    setStatusMessage(`Successfully parsed ${mapped.length} records from ${uploadFileName || 'file'}. Click Confirm & Issue below.`);
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
        setStatusMessage(`Successfully issued and registered ${data.count} certificates!`);
        setCertificatesList(data.certificates);
        setParsedRows([]);
        setUploadFileName('');
        setActiveTab('certificates');
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
        setStatusMessage(`Certificate ${payload.certificateId} created successfully for ${manualForm.studentName}!`);
        setCertificatesList(data.certificates);
        setManualForm({
          certificateId: `TTXIN${Math.floor(10000000 + Math.random() * 90000000)}`,
          studentName: '',
          courseName: 'Applied Artificial Intelligence & Machine Learning',
          programType: 'Certificate of Internship',
          issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          grade: 'A+ (Outstanding)',
          skills: 'Python, Machine Learning, REST APIs, Git',
          email: ''
        });
        setActiveTab('certificates');
      }
    } catch (e) {
      setLoading(false);
      setStatusMessage('Error issuing manual certificate.');
    }
  };

  // Delete Certificate Record
  const handleDeleteCert = async (certId: string) => {
    if (!window.confirm(`Are you sure you want to delete certificate ${certId}?`)) return;
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
      }
    } catch (e) {
      console.error('Failed to delete cert:', e);
    }
  };

  const filteredLeads = getFilteredLeads();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b1021] max-w-6xl w-full max-h-[94vh] overflow-y-auto p-4 sm:p-7 rounded-3xl border border-slate-700 shadow-2xl relative space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer border border-slate-700 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Login Password Screen */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-12 space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 shadow-lg shadow-cyan-500/20">
              <KeyRound className="w-8 h-8" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-2xl font-black text-white">Admin & Lead Gateway</h3>
              <p className="text-xs text-slate-400">
                TechTrainX Technologies — Secured Operations & Verification Registry
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter Administrator Passcode"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-center font-mono tracking-wider"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-500/30 text-xs text-red-300 font-semibold flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Verifying Credentials...' : 'Authenticate & Unlock Operations'}
              </button>
            </form>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Protected by HMAC-SHA256 Server Session Cryptography</span>
            </div>
          </div>
        ) : (
          /* Authenticated Portal Interface */
          <div className="space-y-5">
            
            {/* Header & Tabs Navigation */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold mb-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Center Staff & Registrar Gateway
                </div>
                <h3 className="text-2xl font-black text-white flex items-center gap-2">
                  Admin <span className="gradient-text-cyan">Lead Management & Data Hub</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time admissions leads, hardware orders, quotes & verified certificates
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start lg:self-auto">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'leads' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-200" />
                  <span>Leads & Export ({leadsList.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'certificates' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-indigo-200" />
                  <span>Certificates ({certificatesList.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('bulk_cert')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'bulk_cert' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Excel Batch Upload</span>
                </button>

                <button
                  onClick={() => setActiveTab('manual_cert')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'manual_cert' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5 text-amber-200" />
                  <span>Issue Single</span>
                </button>

                <button
                  onClick={handleLogout}
                  title="Lock Portal Session"
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 text-red-400 hover:text-white hover:bg-red-900/40 border border-transparent hover:border-red-500/30 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lock</span>
                </button>
              </div>
            </div>

            {/* Status Alert Banner */}
            {statusMessage && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold flex items-center justify-between gap-2 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{statusMessage}</span>
                </div>
                <button onClick={() => setStatusMessage('')} className="text-emerald-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* TAB 1: LEADS CRM & EXCEL / CSV EXPORT HUB */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                
                {/* Metrics Summary Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div 
                    onClick={() => { setCategoryFilter('all'); }}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-colors"
                  >
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Total Leads</span>
                    <div className="text-2xl font-black text-white mt-0.5">{leadsList.length}</div>
                    <span className="text-[10px] text-cyan-400 font-semibold">Across all verticals</span>
                  </div>

                  <div 
                    onClick={() => { setCategoryFilter('enrollment'); }}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-colors"
                  >
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Course Admissions</span>
                    <div className="text-2xl font-black text-cyan-400 mt-0.5">{leadSummary.totalEnrollments || leadsList.filter(l => l.typeKey === 'enrollment').length}</div>
                    <span className="text-[10px] text-slate-400 font-semibold">Summer & Industrial</span>
                  </div>

                  <div 
                    onClick={() => { setCategoryFilter('hardware'); }}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-colors"
                  >
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Hardware Kit Orders</span>
                    <div className="text-2xl font-black text-emerald-400 mt-0.5">{leadSummary.hardwareOrders || leadsList.filter(l => l.category.includes('Hardware')).length}</div>
                    <span className="text-[10px] text-slate-400 font-semibold">Arduino & IoT Kits</span>
                  </div>

                  <div 
                    onClick={() => { setCategoryFilter('quote'); }}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-colors"
                  >
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Software Quotes</span>
                    <div className="text-2xl font-black text-indigo-400 mt-0.5">{leadSummary.totalQuotes || leadsList.filter(l => l.typeKey === 'quote').length}</div>
                    <span className="text-[10px] text-slate-400 font-semibold">B2B Software Projects</span>
                  </div>
                </div>

                {/* Primary Export & Controls Toolbar */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 flex-wrap">
                    
                    {/* Search Field */}
                    <div className="relative flex-1 min-w-[240px]">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={leadSearchQuery}
                        onChange={(e) => setLeadSearchQuery(e.target.value)}
                        placeholder="Search candidate name, phone, email, college, or course..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    {/* Prominent Excel & CSV Export Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={handleExportLeadsToExcel}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                        title="Download formatted Excel (.xlsx) file with multi-sheets"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-white" />
                        <span>Export to Excel (.xlsx)</span>
                      </button>

                      <button
                        onClick={handleExportLeadsToCSV}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs shadow-lg shadow-cyan-950 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                        title="Download CSV (.csv) file"
                      >
                        <Download className="w-4 h-4 text-white" />
                        <span>Export to CSV (.csv)</span>
                      </button>

                      <button
                        onClick={() => fetchLeads()}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
                        title="Refresh Leads Data"
                      >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills & Status Dropdown */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-900 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 font-semibold mr-1 flex items-center gap-1">
                        <Filter className="w-3 h-3" /> Category:
                      </span>
                      {[
                        { key: 'all', label: `All (${leadsList.length})` },
                        { key: 'enrollment', label: 'Course Admissions' },
                        { key: 'hardware', label: 'Hardware Kits' },
                        { key: 'inquiry', label: 'General Queries' },
                        { key: 'quote', label: 'Software Quotes' }
                      ].map(f => (
                        <button
                          key={f.key}
                          onClick={() => setCategoryFilter(f.key)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                            categoryFilter === f.key
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-semibold">Status:</span>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500"
                      >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="follow up">Follow Up</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Leads Master Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-800 max-h-[50vh] bg-slate-950">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/90 text-cyan-400 font-bold uppercase text-[10px] border-b border-slate-800 sticky top-0 z-10">
                      <tr>
                        <th className="p-3">Date</th>
                        <th className="p-3">Candidate / Client</th>
                        <th className="p-3">Contact (WhatsApp / Call)</th>
                        <th className="p-3">Vertical & Requirement</th>
                        <th className="p-3">College / Organization</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {filteredLeads.length > 0 ? (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-900/70 transition-colors">
                            {/* Date */}
                            <td className="p-3 whitespace-nowrap text-[11px] text-slate-400 font-mono">
                              {lead.date}
                            </td>

                            {/* Candidate Name & Category */}
                            <td className="p-3">
                              <div className="font-bold text-white text-xs">{lead.candidateName}</div>
                              <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold mt-0.5 border ${
                                lead.category.includes('Admissions')
                                  ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/30'
                                  : lead.category.includes('Hardware')
                                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30'
                                  : 'bg-indigo-950/70 text-indigo-300 border-indigo-500/30'
                              }`}>
                                {lead.category}
                              </span>
                            </td>

                            {/* Phone & Direct WhatsApp Action */}
                            <td className="p-3 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-slate-200 text-xs font-semibold">{lead.phone}</span>
                                <a
                                  href={generateWhatsAppLeadLink(lead)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors inline-flex"
                                  title="Send Pre-filled WhatsApp Counseling Message"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                                  className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors inline-flex"
                                  title="Direct Phone Call"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                              </div>
                              <a href={`mailto:${lead.email}`} className="text-[11px] text-slate-400 hover:text-cyan-400 block truncate max-w-[180px]">
                                {lead.email}
                              </a>
                            </td>

                            {/* Subject / Course / Requirements */}
                            <td className="p-3 max-w-xs">
                              <div className="font-semibold text-slate-200 line-clamp-1">{lead.interestOrSubject}</div>
                              <div className="text-[10px] text-slate-400 line-clamp-1">{lead.modeOrTiming}</div>
                              {lead.additionalDetails && (
                                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 italic">
                                  {lead.additionalDetails}
                                </p>
                              )}
                            </td>

                            {/* College / Organization */}
                            <td className="p-3 text-slate-300 max-w-[200px] truncate text-xs">
                              {lead.collegeOrOrg}
                            </td>

                            {/* Status Changer Dropdown */}
                            <td className="p-3 whitespace-nowrap">
                              <select
                                value={lead.status || 'New'}
                                onChange={(e) => handleUpdateLeadStatus(lead, e.target.value)}
                                className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                                  lead.status === 'Converted'
                                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                                    : lead.status === 'Contacted'
                                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                                    : lead.status === 'Follow Up'
                                    ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                                    : 'bg-slate-900 text-slate-300 border-slate-700'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Follow Up">Follow Up</option>
                                <option value="Converted">Converted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>

                            {/* Delete Action */}
                            <td className="p-3 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleDeleteLead(lead)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                                title="Remove Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400 text-xs font-sans">
                            No lead records found matching the current search or filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Footer hint */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 px-1">
                  <span>Showing {filteredLeads.length} of {leadsList.length} lead entries</span>
                  <span>Click "Export to Excel" or "Export to CSV" anytime to download lead reports for admissions follow-up.</span>
                </div>

              </div>
            )}

            {/* TAB 2: CERTIFICATES REGISTRY & EXCEL EXPORT */}
            {activeTab === 'certificates' && (
              <div className="space-y-4">
                
                {/* Search & Export Toolbar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={certSearchQuery}
                      onChange={(e) => setCertSearchQuery(e.target.value)}
                      placeholder="Search issued certificates by student name, cert ID, or course..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCertificatesToExcel}
                      className="px-3.5 py-2 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-900/80 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Certificates (.xlsx)</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('manual_cert')}
                      className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Issue New</span>
                    </button>
                  </div>
                </div>

                {/* Certificates Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-800 max-h-[52vh] bg-slate-950">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-cyan-400 font-bold uppercase text-[10px] border-b border-slate-800 sticky top-0">
                      <tr>
                        <th className="p-3">Cert ID</th>
                        <th className="p-3">Candidate</th>
                        <th className="p-3">Course / Program</th>
                        <th className="p-3">Grade</th>
                        <th className="p-3">Issue Date</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono">
                      {filteredCerts.length > 0 ? (
                        filteredCerts.map((c) => (
                          <tr key={c.certificateId} className="hover:bg-slate-900">
                            <td className="p-3 font-bold text-cyan-400">{c.certificateId}</td>
                            <td className="p-3 font-semibold text-white font-sans">{c.studentName}</td>
                            <td className="p-3 text-slate-300 font-sans">{c.courseName} ({c.programType})</td>
                            <td className="p-3 text-emerald-400 font-bold">{c.grade}</td>
                            <td className="p-3 text-slate-400 font-sans">{c.issueDate}</td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => handleDeleteCert(c.certificateId)}
                                className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                                title="Delete Certificate"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-6 text-center text-slate-400 text-xs font-sans">
                            No certificate records match search query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* TAB 3: EXCEL / CSV BATCH UPLOAD FOR CERTIFICATES */}
            {activeTab === 'bulk_cert' && (
              <div className="space-y-5">
                
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span>Upload Student Certificate Spreadsheet (.xlsx, .xls, .csv)</span>
                  </h4>

                  <button
                    onClick={handleDownloadSampleTemplate}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-900/80 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Excel Template (.xlsx)</span>
                  </button>
                </div>

                {/* Drag and Drop Zone */}
                <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center space-y-3 bg-slate-950 hover:border-cyan-500/50 transition-colors relative">
                  <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      {uploadFileName ? `Loaded: ${uploadFileName}` : 'Click or Drag & Drop Excel/CSV File Here'}
                    </p>
                    <p className="text-xs text-slate-400">
                      Supports columns: CertificateNo, StudentName, CourseName, ProgramType, Grade, IssueDate, Skills
                    </p>
                  </div>
                </div>

                {/* Parsed Preview Table */}
                {parsedRows.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        Parsed {parsedRows.length} Student Record(s) Ready for Issue:
                      </span>

                      <button
                        onClick={handleConfirmBulkUpload}
                        disabled={loading}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FileCheck className="w-4 h-4" />
                        <span>{loading ? 'Importing...' : `Confirm & Issue All ${parsedRows.length} Certificates`}</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-800 max-h-60 bg-slate-950">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-900 text-cyan-400 font-bold uppercase text-[10px] border-b border-slate-800">
                          <tr>
                            <th className="p-3">Cert ID</th>
                            <th className="p-3">Candidate Name</th>
                            <th className="p-3">Course / Program</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Grade</th>
                            <th className="p-3">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 font-mono">
                          {parsedRows.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-900">
                              <td className="p-3 font-bold text-cyan-400">{r.certificateId}</td>
                              <td className="p-3 font-semibold text-white font-sans">{r.studentName}</td>
                              <td className="p-3 text-slate-300 font-sans">{r.courseName}</td>
                              <td className="p-3 text-slate-400 font-sans">{r.programType}</td>
                              <td className="p-3 text-emerald-400 font-bold">{r.grade}</td>
                              <td className="p-3 text-slate-400 font-sans">{r.issueDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 4: MANUAL CERTIFICATE ENTRY */}
            {activeTab === 'manual_cert' && (
              <form onSubmit={handleManualSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Certificate Number (No spaces or symbols) *</label>
                    <input
                      type="text"
                      required
                      value={manualForm.certificateId}
                      onChange={(e) => setManualForm({ ...manualForm, certificateId: e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() })}
                      placeholder="e.g. TTXIN26271102"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono tracking-wider uppercase font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Student / Candidate Name *</label>
                    <input
                      type="text"
                      required
                      value={manualForm.studentName}
                      onChange={(e) => setManualForm({ ...manualForm, studentName: e.target.value })}
                      placeholder="e.g. Annu Mishra"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Program Type</label>
                    <select
                      value={manualForm.programType}
                      onChange={(e) => setManualForm({ ...manualForm, programType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Certificate of Internship">Certificate of Internship</option>
                      <option value="Summer Training Program (45 Days)">Summer Training Program (45 Days)</option>
                      <option value="6-Month Industrial Apprenticeship">6-Month Industrial Apprenticeship</option>
                      <option value="Vocational Training Certificate">Vocational Training Certificate</option>
                      <option value="Certificate of Completion">Certificate of Completion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Course Name *</label>
                    <input
                      type="text"
                      required
                      value={manualForm.courseName}
                      onChange={(e) => setManualForm({ ...manualForm, courseName: e.target.value })}
                      placeholder="e.g. Applied Artificial Intelligence & Machine Learning"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Grade Awarded</label>
                    <select
                      value={manualForm.grade}
                      onChange={(e) => setManualForm({ ...manualForm, grade: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="A+ (Outstanding)">A+ (Outstanding)</option>
                      <option value="O (Excellent)">O (Excellent)</option>
                      <option value="A (Very Good)">A (Very Good)</option>
                      <option value="B+ (Good)">B+ (Good)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Issue Date</label>
                    <input
                      type="text"
                      value={manualForm.issueDate}
                      onChange={(e) => setManualForm({ ...manualForm, issueDate: e.target.value })}
                      placeholder="e.g. July 26, 2026"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Student Email</label>
                    <input
                      type="email"
                      value={manualForm.email}
                      onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                      placeholder="annu.mishra@example.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Certified Skills (Comma Separated)</label>
                  <input
                    type="text"
                    value={manualForm.skills}
                    onChange={(e) => setManualForm({ ...manualForm, skills: e.target.value })}
                    placeholder="e.g. Python, Machine Learning, TensorFlow, REST APIs, Git"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{loading ? 'Issuing...' : 'Issue Certificate & Publish to Verification API'}</span>
                </button>

              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
