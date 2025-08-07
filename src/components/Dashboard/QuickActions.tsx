import React from 'react';
import { ShoppingCart, Package, FileText, BarChart3, Plus } from 'lucide-react';

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ title, description, icon, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-${color}-500 hover:bg-${color}-50 transition-all duration-200 text-left group`}
    >
      <div className={`p-3 bg-${color}-100 rounded-lg inline-flex mb-4 group-hover:bg-${color}-200 transition-colors`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </button>
  );
};

interface QuickActionsProps {
  onModuleChange: (module: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onModuleChange }) => {
  const actions = [
    {
      title: 'Yeni Satış',
      description: 'Hızlı satış işlemi başlat',
      icon: <ShoppingCart className="h-6 w-6 text-blue-600" />,
      onClick: () => onModuleChange('sales'),
      color: 'blue'
    },
    {
      title: 'Ürün Ekle',
      description: 'Stok listesine yeni ürün ekle',
      icon: <Plus className="h-6 w-6 text-green-600" />,
      onClick: () => onModuleChange('products'),
      color: 'green'
    },
    {
      title: 'Fatura İşle',
      description: 'Alış faturası kaydet ve işle',
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      onClick: () => onModuleChange('invoices'),
      color: 'purple'
    },
    {
      title: 'Raporları Görüntüle',
      description: 'Satış ve stok raporlarını incele',
      icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
      onClick: () => onModuleChange('reports'),
      color: 'orange'
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <QuickAction key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
