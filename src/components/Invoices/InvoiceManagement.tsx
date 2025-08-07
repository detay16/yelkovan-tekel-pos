import React, { useState, useEffect } from 'react';
import { Upload, FileText, Eye, Check, X, Download, Plus } from 'lucide-react';
import { Invoice } from '../../types';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import PDFProcessor from './PDFProcessor';

const InvoiceManagement: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [showPDFProcessor, setShowPDFProcessor] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'processed'>('all');

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    // Mock invoices data
    setInvoices([
      {
        id: '1',
        invoice_number: 'FAT2024001234',
        supplier_id: '1',
        supplier: {
          id: '1',
          name: 'ABC Tedarik Ltd. Şti.',
          is_active: true,
          created_at: ''
        },
        total_amount: 1250.75,
        tax_amount: 225.14,
        status: 'pending',
        items: [],
        created_at: new Date().toISOString()
      }
    ]);
  };

  const handleApproveInvoice = async (invoice: Invoice) => {
    if (window.confirm('Bu faturayı onaylıyor ve stok güncellemelerini uyguluyorsunuz. Emin misiniz?')) {
      try {
        // Mock approval process
        console.log('Approving invoice:', invoice.id);

        await loadInvoices();
        alert('Fatura onaylandı ve stok güncellemeleri uygulandı!');
      } catch (error) {
        console.error('Invoice approval error:', error);
        alert('Fatura onaylanırken hata oluştu!');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'processed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Beklemede';
      case 'approved':
        return 'Onaylandı';
      case 'processed':
        return 'İşlendi';
      default:
        return status;
    }
  };

  const filteredInvoices = invoices.filter(invoice => 
    filterStatus === 'all' || invoice.status === filterStatus
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Alış Fatura Yönetimi</h2>
          <p className="text-gray-600">Tedarikçi faturalarını kaydedin ve stok güncellemelerini yönetin</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowPDFProcessor(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>PDF İşle</span>
          </button>
          <button
            onClick={() => setShowInvoiceForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Manuel Fatura</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Bekleyen</p>
              <p className="text-2xl font-bold text-yellow-600">
                {invoices.filter(i => i.status === 'pending').length}
              </p>
            </div>
            <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Onaylandı</p>
              <p className="text-2xl font-bold text-blue-600">
                {invoices.filter(i => i.status === 'approved').length}
              </p>
            </div>
            <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">İşlendi</p>
              <p className="text-2xl font-bold text-green-600">
                {invoices.filter(i => i.status === 'processed').length}
              </p>
            </div>
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Toplam Tutar</p>
              <p className="text-2xl font-bold text-gray-900">
                {invoices.reduce((sum, inv) => sum + inv.total_amount, 0).toFixed(2)}₺
              </p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Duruma göre filtrele:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Tümü</option>
            <option value="pending">Bekleyen</option>
            <option value="approved">Onaylandı</option>
            <option value="processed">İşlendi</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fatura No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tedarikçi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.invoice_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.supplier.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {invoice.total_amount.toFixed(2)}₺
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(invoice.status)}`}>
                      {getStatusText(invoice.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.created_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowPreview(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {invoice.status === 'pending' && (
                        <button
                          onClick={() => handleApproveInvoice(invoice)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      {invoice.pdf_url && (
                        <button
                          onClick={() => window.open(invoice.pdf_url)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Fatura bulunamadı</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => setShowInvoiceForm(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                Manuel fatura ekle
              </button>
              <span className="text-gray-300">veya</span>
              <button
                onClick={() => setShowPDFProcessor(true)}
                className="text-purple-600 hover:text-purple-800"
              >
                PDF fatura yükle
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showInvoiceForm && (
        <InvoiceForm
          onSave={() => {
            setShowInvoiceForm(false);
            loadInvoices();
          }}
          onClose={() => setShowInvoiceForm(false)}
        />
      )}

      {showPDFProcessor && (
        <PDFProcessor
          onProcessed={() => {
            setShowPDFProcessor(false);
            loadInvoices();
          }}
          onClose={() => setShowPDFProcessor(false)}
        />
      )}

      {showPreview && selectedInvoice && (
        <InvoicePreview
          invoice={selectedInvoice}
          onClose={() => {
            setShowPreview(false);
            setSelectedInvoice(null);
          }}
        />
      )}
    </div>
  );
};

export default InvoiceManagement;
