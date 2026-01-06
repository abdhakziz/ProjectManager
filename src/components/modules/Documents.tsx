import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  MoreVertical,
  Search,
  FolderOpen,
  File,
  Image,
  FileSpreadsheet,
  FileCode,
  Clock
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface DocumentsProps {
  currentUser: any;
}

export default function Documents({ currentUser }: DocumentsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Design System.pdf',
      type: 'pdf',
      size: '2.4 MB',
      project: 'Website Redesign',
      uploadedBy: 'John Doe',
      uploadedAt: '2026-01-05 14:30',
      version: 'v2.0',
      category: 'design'
    },
    {
      id: 2,
      name: 'API Documentation.docx',
      type: 'docx',
      size: '1.2 MB',
      project: 'Mobile App Development',
      uploadedBy: 'Alice Brown',
      uploadedAt: '2026-01-04 10:15',
      version: 'v1.5',
      category: 'document'
    },
    {
      id: 3,
      name: 'Mockup Homepage.png',
      type: 'png',
      size: '3.8 MB',
      project: 'Website Redesign',
      uploadedBy: 'John Doe',
      uploadedAt: '2026-01-06 09:20',
      version: 'v3.0',
      category: 'image'
    },
    {
      id: 4,
      name: 'Budget Q1 2026.xlsx',
      type: 'xlsx',
      size: '850 KB',
      project: 'Marketing Campaign Q1',
      uploadedBy: 'Eve Wilson',
      uploadedAt: '2026-01-03 16:45',
      version: 'v1.0',
      category: 'spreadsheet'
    },
    {
      id: 5,
      name: 'Database Schema.sql',
      type: 'sql',
      size: '45 KB',
      project: 'Database Migration',
      uploadedBy: 'Grace Lee',
      uploadedAt: '2026-01-02 11:30',
      version: 'v2.1',
      category: 'code'
    },
    {
      id: 6,
      name: 'User Flow Diagram.pdf',
      type: 'pdf',
      size: '1.5 MB',
      project: 'Mobile App Development',
      uploadedBy: 'Charlie Davis',
      uploadedAt: '2026-01-01 13:20',
      version: 'v1.0',
      category: 'design'
    },
    {
      id: 7,
      name: 'Brand Guidelines.pdf',
      type: 'pdf',
      size: '5.2 MB',
      project: 'Marketing Campaign Q1',
      uploadedBy: 'Frank Miller',
      uploadedAt: '2025-12-28 15:00',
      version: 'v1.0',
      category: 'document'
    },
    {
      id: 8,
      name: 'Component Library.zip',
      type: 'zip',
      size: '12.3 MB',
      project: 'Website Redesign',
      uploadedBy: 'Bob Johnson',
      uploadedAt: '2025-12-30 10:00',
      version: 'v1.2',
      category: 'code'
    }
  ]);

  const getFileIcon = (type: string) => {
    if (type === 'png' || type === 'jpg' || type === 'jpeg') return Image;
    if (type === 'xlsx' || type === 'csv') return FileSpreadsheet;
    if (type === 'sql' || type === 'js' || type === 'py' || type === 'zip') return FileCode;
    return FileText;
  };

  const getFileColor = (type: string) => {
    if (type === 'png' || type === 'jpg' || type === 'jpeg') return 'text-purple-600 bg-purple-100';
    if (type === 'xlsx' || type === 'csv') return 'text-green-600 bg-green-100';
    if (type === 'pdf') return 'text-red-600 bg-red-100';
    if (type === 'sql' || type === 'js' || type === 'py' || type === 'zip') return 'text-blue-600 bg-blue-100';
    return 'text-gray-600 bg-gray-100';
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
      setDocuments(documents.filter(d => d.id !== id));
    }
  };

  const filterByCategory = (category: string) => {
    if (category === 'all') return documents;
    return documents.filter(d => d.category === category);
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: documents.length,
    design: documents.filter(d => d.category === 'design').length,
    document: documents.filter(d => d.category === 'document').length,
    code: documents.filter(d => d.category === 'code').length,
    image: documents.filter(d => d.category === 'image').length,
    spreadsheet: documents.filter(d => d.category === 'spreadsheet').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Manajemen Dokumen</h2>
          <p className="text-gray-500 mt-1">Kelola semua file dan dokumen proyek</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload File
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Cari dokumen atau proyek..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-gray-600 mt-1">Total File</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.document}</p>
              <p className="text-xs text-gray-600 mt-1">Dokumen</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.design}</p>
              <p className="text-xs text-gray-600 mt-1">Design</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.image}</p>
              <p className="text-xs text-gray-600 mt-1">Gambar</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.spreadsheet}</p>
              <p className="text-xs text-gray-600 mt-1">Spreadsheet</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.code}</p>
              <p className="text-xs text-gray-600 mt-1">Kode</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Semua ({stats.total})</TabsTrigger>
          <TabsTrigger value="document">Dokumen ({stats.document})</TabsTrigger>
          <TabsTrigger value="design">Design ({stats.design})</TabsTrigger>
          <TabsTrigger value="image">Gambar ({stats.image})</TabsTrigger>
          <TabsTrigger value="spreadsheet">Spreadsheet ({stats.spreadsheet})</TabsTrigger>
          <TabsTrigger value="code">Kode ({stats.code})</TabsTrigger>
        </TabsList>

        {['all', 'document', 'design', 'image', 'spreadsheet', 'code'].map(category => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {filterByCategory(category)
                    .filter(doc =>
                      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      doc.project.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((doc) => {
                      const FileIcon = getFileIcon(doc.type);
                      return (
                        <div
                          key={doc.id}
                          className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className={`p-3 rounded-lg ${getFileColor(doc.type)}`}>
                            <FileIcon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{doc.name}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-sm text-gray-600">{doc.project}</p>
                              <span className="text-gray-400">•</span>
                              <p className="text-sm text-gray-600">{doc.size}</p>
                              {doc.version && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <Badge variant="outline" className="text-xs">
                                    {doc.version}
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">{doc.uploadedBy}</p>
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {doc.uploadedAt}
                              </p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FolderOpen className="h-4 w-4 mr-2" />
                                  Lihat Versi
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(doc.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Hapus
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      );
                    })}
                </div>
                {filterByCategory(category).filter(doc =>
                  doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  doc.project.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    Tidak ada dokumen dalam kategori ini
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.slice(0, 5).map((doc) => {
              const FileIcon = getFileIcon(doc.type);
              return (
                <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded ${getFileColor(doc.type)}`}>
                    <FileIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{doc.uploadedBy}</span> mengupload{' '}
                      <span className="font-medium">{doc.name}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{doc.uploadedAt}</p>
                  </div>
                  <Badge variant="outline">{doc.project}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
