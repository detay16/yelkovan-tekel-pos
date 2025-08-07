import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Package, DollarSign, Calendar, Download, Filter } from 'lucide-react';
import SalesChart from './SalesChart';
import InventoryChart from './InventoryChart';
import ReportTable from './ReportTable';
import ExportModal from './ExportModal';

const ReportsModule: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [reportData, setReportData] = useState<any>({});
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    loadReportData();
  }, [dateRange]);

  const loadReportData = async () => {
    // Mock data - would load from database based on date range
    setReportData({
      totalSales: 125750,
      totalProfit: 32500,
      totalTransactions: 847,
      averageBasket: 148.52,
      dailySales: [
        { date: '2024-01-01', sales: 2500, profit: 650 },
        { date: '2024-01-02', sales: 3200, profit: 830 },
        // More data...
      ],
      topProducts: [
        { product: { name: 'ABSOLUT VODKA 50CL', barcode: '731204012072' }, quantity_sold: 45, revenue: 27630 },
        { product: { name: 'ABSOLUT RASBERRY', barcode: '731204235056' }, quantity_sold: 32, revenue: 8960 },
        // More data...
      ],
      lowStock: [
        { name: 'WYBOROWA 70ML', stock: 2, critical_stock: 5 },
        // More data...
      ]
    });
  };

  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: BarChart3 },
    { id: 'sales', label: 'Satış Analizi', icon: TrendingUp },
    { id: 'inventory', label: 'Stok Analizi', icon: Package },
    { id: 'profit', label: 'Kâr Analizi', icon: DollarSign }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Raporlar ve Analizler</h2>
          <p className="text-gray-600">İş performansınızı detaylı olarak analiz edin</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="border-none focus:ring-0 text-sm"
            />
            <span className="text-gray-500">-</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="border-none focus:ring-0 text-sm"
            />
          </div>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Dışa Aktar</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Toplam Satış</p>
              <p className="text-3xl font-bold text-gray-900">
                {reportData.totalSales?.toLocaleString('tr-TR')}₺
              </p>
              <p className="text-green-600 text-sm">+12.5% geçen aya göre</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Net Kâr</p>
              <p className="text-3xl font-bold text-gray-900">
                {reportData.totalProfit?.toLocaleString('tr-TR')}₺
              </p>
              <p className="text-green-600 text-sm">+8.2% geçen aya göre</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">İşlem Sayısı</p>
              <p className="text-3xl font-bold text-gray-900">
                {reportData.totalTransactions?.toLocaleString('tr-TR')}
              </p>
              <p className="text-blue-600 text-sm">+15.3% geçen aya göre</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Ortalama Sepet</p>
              <p className="text-3xl font-bold text-gray-900">
                {reportData.averageBasket?.toFixed(2)}₺
              </p>
              <p className="text-orange-600 text-sm">-2.1% geçen aya göre</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesChart data={reportData.dailySales} />
                <InventoryChart />
              </div>
              <ReportTable
                title="En Çok Satan Ürünler"
                data={reportData.topProducts}
                columns={[
                  { key: 'product.name', label: 'Ürün' },
                  { key: 'quantity_sold', label: 'Satılan' },
                  { key: 'revenue', label: 'Gelir', format: (value) => `${value.toLocaleString()}₺` }
                ]}
              />
            </div>
          )}

          {activeTab === 'sales' && (
            <div className="space-y-6">
              <SalesChart data={reportData.dailySales} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Ödeme Yöntemi Dağılımı</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Nakit</span>
                      <span className="font-medium">%45 (56,587₺)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Kart</span>
                      <span className="font-medium">%55 (69,163₺)</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Satış Trendleri</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bu Hafta</span>
                      <span className="font-medium text-green-600">+18.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bu Ay</span>
                      <span className="font-medium text-green-600">+12.3%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <InventoryChart />
              <ReportTable
                title="Düşük Stok Uyarıları"
                data={reportData.lowStock}
                columns={[
                  { key: 'name', label: 'Ürün' },
                  { key: 'stock', label: 'Mevcut Stok' },
                  { key: 'critical_stock', label: 'Kritik Seviye' }
                ]}
              />
            </div>
          )}

          {activeTab === 'profit' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Kâr Marjları</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">%26.5</p>
                    <p className="text-gray-600">Ortalama Kâr Marjı</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">%31.2</p>
                    <p className="text-gray-600">En Yüksek Marj</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">%18.7</p>
                    <p className="text-gray-600">En Düşük Marj</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          reportData={reportData}
          dateRange={dateRange}
        />
      )}
    </div>
  );
};

export default ReportsModule;
