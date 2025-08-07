import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, Users, DollarSign, AlertTriangle, ShoppingCart, Calendar, Target } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon, color }) => {
  const changeColor = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  }[changeType];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${changeColor}`}>
            {changeType === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
            {change}
          </div>
        </div>
        <div className={`p-4 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState({
    todaysSales: 0,
    totalProducts: 0,
    activeCustomers: 0,
    lowStockItems: 0,
    monthlyTarget: 150000,
    currentMonthSales: 125750
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading real data
    const loadStats = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        todaysSales: 15750,
        totalProducts: 1247,
        activeCustomers: 89,
        lowStockItems: 12,
        monthlyTarget: 150000,
        currentMonthSales: 125750
      });
      
      setIsLoading(false);
    };

    loadStats();
  }, []);

  const targetProgress = (stats.currentMonthSales / stats.monthlyTarget) * 100;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Bugünkü Satışlar"
          value={`${stats.todaysSales.toLocaleString('tr-TR')}₺`}
          change="+12.5% dün'e göre"
          changeType="positive"
          icon={<DollarSign className="h-8 w-8 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Toplam Ürün"
          value={stats.totalProducts.toLocaleString('tr-TR')}
          change="+23 yeni ürün"
          changeType="positive"
          icon={<Package className="h-8 w-8 text-green-600" />}
          color="bg-green-50"
        />
        <StatCard
          title="Aktif Müşteri"
          value={stats.activeCustomers.toString()}
          change="Bu ay aktif"
          changeType="neutral"
          icon={<Users className="h-8 w-8 text-purple-600" />}
          color="bg-purple-50"
        />
        <StatCard
          title="Düşük Stok"
          value={stats.lowStockItems.toString()}
          change="Dikkat gerekli"
          changeType="negative"
          icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
          color="bg-red-50"
        />
      </div>

      {/* Monthly Target Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Aylık Hedef</h3>
              <p className="text-gray-600 text-sm">
                {stats.currentMonthSales.toLocaleString('tr-TR')}₺ / {stats.monthlyTarget.toLocaleString('tr-TR')}₺
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-600">{targetProgress.toFixed(1)}%</p>
            <p className="text-sm text-gray-500">Tamamlandı</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(targetProgress, 100)}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Başlangıç</span>
          <span className="font-medium">
            Kalan: {(stats.monthlyTarget - stats.currentMonthSales).toLocaleString('tr-TR')}₺
          </span>
        </div>
      </div>

      {/* Quick Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Bu Hafta Satış</p>
              <p className="text-3xl font-bold">47,250₺</p>
              <p className="text-blue-100 text-sm">+18.5% geçen haftaya göre</p>
            </div>
            <ShoppingCart className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Ortalama Sepet</p>
              <p className="text-3xl font-bold">148₺</p>
              <p className="text-green-100 text-sm">Son 30 gün ortalaması</p>
            </div>
            <DollarSign className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">İşlem Sayısı</p>
              <p className="text-3xl font-bold">847</p>
              <p className="text-purple-100 text-sm">Bu ay toplam</p>
            </div>
            <Calendar className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
