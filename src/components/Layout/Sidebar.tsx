import React from 'react';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  Building2, 
  FileText, 
  BarChart3, 
  Settings,
  LogOut
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
  const { t } = useLanguage();
  const { signOut } = useAuth();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: t('dashboard.title') },
    { id: 'sales', icon: ShoppingCart, label: t('dashboard.sales') },
    { id: 'products', icon: Package, label: t('dashboard.products') },
    { id: 'customers', icon: Users, label: t('dashboard.customers') },
    { id: 'suppliers', icon: Building2, label: t('dashboard.suppliers') },
    { id: 'invoices', icon: FileText, label: t('dashboard.invoices') },
    { id: 'reports', icon: BarChart3, label: t('dashboard.reports') },
    { id: 'settings', icon: Settings, label: t('dashboard.settings') },
  ];

  return (
    <div className="bg-slate-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">Yelkovan Tekel</h1>
        <p className="text-slate-400 text-sm">Pro Inventory Management</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onModuleChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeModule === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={signOut}
          className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
