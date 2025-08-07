import React, { createContext, useContext, useState } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  tr: {
    // Dashboard
    'dashboard.title': 'Anasayfa',
    'dashboard.sales': 'Satış',
    'dashboard.products': 'Ürünler',
    'dashboard.customers': 'Müşteriler',
    'dashboard.suppliers': 'Firmalar',
    'dashboard.invoices': 'Alış Faturaları',
    'dashboard.reports': 'Raporlar',
    'dashboard.settings': 'Ayarlar',
    
    // Sales
    'sales.title': 'Satış Ekranı',
    'sales.barcode': 'Barkod',
    'sales.product': 'Ürün',
    'sales.quantity': 'Miktar',
    'sales.price': 'Fiyat',
    'sales.total': 'Toplam',
    'sales.payment': 'Ödeme',
    'sales.cash': 'Nakit',
    'sales.card': 'Kart',
    'sales.complete': 'Satışı Tamamla',
    
    // Products
    'products.title': 'Ürün Yönetimi',
    'products.add': 'Ürün Ekle',
    'products.name': 'Ürün Adı',
    'products.barcode': 'Barkod',
    'products.price': 'Fiyat',
    'products.cost': 'Maliyet',
    'products.stock': 'Stok',
    
    // Common
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.edit': 'Düzenle',
    'common.delete': 'Sil',
    'common.search': 'Ara',
    'common.filter': 'Filtrele',
    'common.export': 'Dışa Aktar',
    'common.print': 'Yazdır',
  },
  en: {
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.sales': 'Sales',
    'dashboard.products': 'Products',
    'dashboard.customers': 'Customers',
    'dashboard.suppliers': 'Suppliers',
    'dashboard.invoices': 'Purchase Invoices',
    'dashboard.reports': 'Reports',
    'dashboard.settings': 'Settings',
    
    // Sales
    'sales.title': 'Sales Terminal',
    'sales.barcode': 'Barcode',
    'sales.product': 'Product',
    'sales.quantity': 'Quantity',
    'sales.price': 'Price',
    'sales.total': 'Total',
    'sales.payment': 'Payment',
    'sales.cash': 'Cash',
    'sales.card': 'Card',
    'sales.complete': 'Complete Sale',
    
    // Products
    'products.title': 'Product Management',
    'products.add': 'Add Product',
    'products.name': 'Product Name',
    'products.barcode': 'Barcode',
    'products.price': 'Price',
    'products.cost': 'Cost',
    'products.stock': 'Stock',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.print': 'Print',
  }
};

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
