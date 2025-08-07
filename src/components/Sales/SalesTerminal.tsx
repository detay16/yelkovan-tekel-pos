import React, { useState, useEffect, useRef } from 'react';
import { Scan, ShoppingCart, CreditCard, Banknote, Trash2, Plus, Minus } from 'lucide-react';
import { Product, SaleItem } from '../../types';
import BarcodeScanner from './BarcodeScanner';
import ProductGrid from './ProductGrid';
import PaymentModal from './PaymentModal';

const SalesTerminal: React.FC = () => {
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    // Auto-focus barcode input
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  }, [saleItems]);

  const loadProducts = async () => {
    // Mock products data
    setProducts([
      {
        id: '1',
        name: 'ABSOLUT VODKA 50CL',
        barcode: '731204012072',
        price: 614.04,
        cost: 250,
        stock: 15,
        critical_stock: 5,
        tax_rate: 18,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: '2',
        name: 'ABSOLUT RASBERRY',
        barcode: '731204235056',
        price: 280,
        cost: 120,
        stock: 8,
        critical_stock: 5,
        tax_rate: 18,
        is_active: true,
        created_at: '',
        updated_at: ''
      }
    ]);
  };

  const handleBarcodeInput = async (barcode: string) => {
    if (!barcode.trim()) return;

    const product = products.find(p => p.barcode === barcode);
    if (product && product.stock > 0) {
      addProductToSale(product);
      setBarcodeInput('');
    } else {
      alert('Ürün bulunamadı veya stokta yok!');
    }
  };

  const addProductToSale = (product: Product, quantity: number = 1) => {
    setSaleItems(prev => {
      const existingItem = prev.find(item => item.product_id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.unit_price }
            : item
        );
      } else {
        const newItem: SaleItem = {
          id: Date.now().toString(),
          product_id: product.id,
          product,
          quantity,
          unit_price: product.price,
          discount: 0,
          tax_amount: (product.price * quantity * product.tax_rate) / 100,
          total: product.price * quantity
        };
        return [...prev, newItem];
      }
    });
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setSaleItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, total: newQuantity * item.unit_price }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setSaleItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearSale = () => {
    setSaleItems([]);
    setCustomerPhone('');
    setBarcodeInput('');
  };

  const calculateTotals = () => {
    const subtotal = saleItems.reduce((sum, item) => sum + item.total, 0);
    const totalTax = saleItems.reduce((sum, item) => sum + item.tax_amount, 0);
    const total = subtotal + totalTax;
    
    return { subtotal, totalTax, total };
  };

  const { subtotal, totalTax, total } = calculateTotals();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBarcodeInput(barcodeInput);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Left Panel - Sale Items */}
      <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-900">Satış Terminali</h2>
          <div className="mt-4 flex space-x-4">
            <div className="flex-1">
              <input
                ref={barcodeInputRef}
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Barkod okutun veya yazın..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => setShowScanner(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Scan className="h-5 w-5" />
              <span>Tara</span>
            </button>
          </div>
        </div>

        {/* Sale Items List */}
        <div className="flex-1 overflow-y-auto p-4">
          {saleItems.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-xl">Sepet boş</p>
                <p>Ürün eklemek için barkod okutun</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {saleItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">{item.product.barcode}</p>
                    <p className="text-lg font-semibold text-blue-600">{item.unit_price.toFixed(2)}₺</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <div className="text-right min-w-[80px]">
                      <p className="font-semibold">{item.total.toFixed(2)}₺</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Customer Info */}
        <div className="border-t border-gray-200 p-4">
          <input
            type="text"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="Müşteri telefonu (opsiyonel)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Totals and Actions */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Ara Toplam:</span>
              <span>{subtotal.toFixed(2)}₺</span>
            </div>
            <div className="flex justify-between">
              <span>KDV:</span>
              <span>{totalTax.toFixed(2)}₺</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-2">
              <span>TOPLAM:</span>
              <span className="text-blue-600">{total.toFixed(2)}₺</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={clearSale}
              className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center space-x-2"
            >
              <Trash2 className="h-5 w-5" />
              <span>Temizle</span>
            </button>
            <button
              onClick={() => setShowPayment(true)}
              disabled={saleItems.length === 0}
              className="flex-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <CreditCard className="h-5 w-5" />
              <span>Ödeme Al</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Product Grid */}
      <div className="w-96 bg-white">
        <ProductGrid products={products} onProductSelect={addProductToSale} />
      </div>

      {/* Modals */}
      {showScanner && (
        <BarcodeScanner
          onScan={handleBarcodeInput}
          onClose={() => setShowScanner(false)}
        />
      )}

      {showPayment && (
        <PaymentModal
          total={total}
          saleItems={saleItems}
          customerPhone={customerPhone}
          onComplete={() => {
            setShowPayment(false);
            clearSale();
          }}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  );
};

export default SalesTerminal;
