import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import LoginForm from './components/Auth/LoginForm';
import DashboardStats from './components/Dashboard/DashboardStats';
import QuickActions from './components/Dashboard/QuickActions';
import SalesTerminal from './components/Sales/SalesTerminal';
import ProductManagement from './components/Products/ProductManagement';
import InvoiceManagement from './components/Invoices/InvoiceManagement';
import ReportsModule from './components/Reports/ReportsModule';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // For demo purposes, we'll bypass authentication
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'sales':
        return <SalesTerminal />;
      case 'products':
        return <ProductManagement />;
      case 'customers':
        return <div className="p-6"><h2 className="text-2xl font-bold">Müşteri Yönetimi</h2><p className="text-gray-600">Yakında aktif olacak...</p></div>;
      case 'suppliers':
        return <div className="p-6"><h2 className="text-2xl font-bold">Tedarikçi Yönetimi</h2><p className="text-gray-600">Yakında aktif olacak...</p></div>;
      case 'invoices':
        return <InvoiceManagement />;
      case 'reports':
        return <ReportsModule />;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold">Sistem Ayarları</h2><p className="text-gray-600">Yakında aktif olacak...</p></div>;
      default:
        return (
          <div className="p-6 space-y-6">
            <DashboardStats />
            <QuickActions onModuleChange={setActiveModule} />
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-900">ABSOLUT VODKA 50CL satışı</p>
                    <p className="text-xs text-gray-500">2 dakika önce</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">+614.04₺</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-900">Stok güncellendi - ABSOLUT RASBERRY</p>
                    <p className="text-xs text-gray-500">5 dakika önce</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600">+10 adet</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-gray-900">Yeni müşteri kaydı</p>
                    <p className="text-xs text-gray-500">12 dakika önce</p>
                  </div>
                  <span className="text-sm font-medium text-purple-600">Yeni</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}

export default App;
