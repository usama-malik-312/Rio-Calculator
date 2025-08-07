import React, { useState, useCallback } from 'react';
import { ShoppingCart, DollarSign, Percent, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const ROICalculator = () => {
  const [customersPerMonth, setCustomersPerMonth] = useState(5000);
  const [averageOrderValue, setAverageOrderValue] = useState(50);
  const [profitMargin, setProfitMargin] = useState(10);
  const [subscriptionValue, setSubscriptionValue] = useState(60);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  const formatNumber = useCallback((value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  }, []);

  // Calculate projections
  const monthlyRevenue = customersPerMonth * averageOrderValue * (profitMargin / 100);
  const yearlyRevenue = monthlyRevenue * 12;
  
  // With Apptics projections (assuming growth)
  const withAppticsYear1 = Math.round(yearlyRevenue * 0.7); // Conservative start
  const withAppticsYear2 = Math.round(yearlyRevenue * 1.6);
  const withAppticsYear3 = Math.round(yearlyRevenue * 1.9);
  const withAppticsYear4 = Math.round(yearlyRevenue * 2.5);
  
  // Passive income from subscriptions
  const passiveYear1 = Math.round(subscriptionValue * 12 * customersPerMonth * 0.02);
  const passiveIncomePerCustomer = Math.round(passiveYear1 / customersPerMonth);
  
  // Without Apptics (static)
  const withoutApptics = Math.round(yearlyRevenue * 0.1); // Much lower
  const withoutPassive = 0;
  const withoutIncomePerCustomer = 5;

  return (
    <div className="w-full max-w-6xl mx-auto bg-calculator-bg rounded-2xl p-8 font-sans">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
          </div>
        </div>
        <h1 className="text-xl font-semibold text-calculator-text-primary">RIO Calculator</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Inputs */}
        <div className="space-y-6">
          {/* Customer Per Month */}
          <div>
            <label className="block text-sm text-calculator-text-secondary mb-2">
              Customer Per Month
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-icon-blue rounded flex items-center justify-center">
                <ShoppingCart className="w-3 h-3 text-white" />
              </div>
              <Input
                type="number"
                value={formatNumber(customersPerMonth)}
                onChange={(e) => setCustomersPerMonth(parseInt(e.target.value.replace(/,/g, '')) || 0)}
                className="pl-11 h-12 bg-calculator-input border-border text-calculator-text-primary font-medium"
              />
            </div>
          </div>

          {/* Average Order Value */}
          <div>
            <label className="block text-sm text-calculator-text-secondary mb-2">
              Average Order Value
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-success rounded flex items-center justify-center">
                <DollarSign className="w-3 h-3 text-white" />
              </div>
              <Input
                type="text"
                value={formatCurrency(averageOrderValue)}
                onChange={(e) => {
                  const value = e.target.value.replace(/[$,]/g, '');
                  setAverageOrderValue(parseInt(value) || 0);
                }}
                className="pl-11 h-12 bg-calculator-input border-border text-calculator-text-primary font-medium"
              />
            </div>
          </div>

          {/* Profit Margin */}
          <div>
            <label className="block text-sm text-calculator-text-secondary mb-2">
              Profit Margin (%)
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-warning rounded flex items-center justify-center">
                <Percent className="w-3 h-3 text-white" />
              </div>
              <Input
                type="text"
                value={`${profitMargin}%`}
                onChange={(e) => {
                  const value = e.target.value.replace('%', '');
                  setProfitMargin(parseInt(value) || 0);
                }}
                className="pl-11 h-12 bg-calculator-input border-border text-calculator-text-primary font-medium"
              />
            </div>
          </div>

          {/* Monthly Subscription Value */}
          <div>
            <label className="block text-sm text-calculator-text-secondary mb-2">
              Monthly Subscription Value
            </label>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-primary rounded flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <Input
                  type="text"
                  value={formatCurrency(subscriptionValue)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[$,]/g, '');
                    setSubscriptionValue(parseInt(value) || 0);
                  }}
                  className="pl-11 h-12 bg-calculator-input border-border text-calculator-text-primary font-medium"
                />
              </div>
              <div className="px-3">
                <Slider
                  value={[subscriptionValue]}
                  onValueChange={(value) => setSubscriptionValue(value[0])}
                  max={200}
                  min={10}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Results */}
        <div className="space-y-6">
          {/* Your Business with Apptics */}
          <Card className="p-6 bg-calculator-input border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-calculator-text-secondary">Your Business with</span>
              <div className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                📊 Apptics
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span className="text-xs text-calculator-text-secondary">Year 01</span>
                </div>
                <div className="text-lg font-semibold text-calculator-text-primary">
                  {formatCurrency(withAppticsYear1)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span className="text-xs text-calculator-text-secondary">Year 02</span>
                </div>
                <div className="text-lg font-semibold text-calculator-text-primary">
                  {formatCurrency(withAppticsYear2)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-3 h-3 bg-muted rounded"></div>
                  <span className="text-xs text-calculator-text-secondary">Passive Subscriber Income</span>
                </div>
                <div className="text-lg font-semibold text-calculator-text-primary">
                  {formatCurrency(passiveYear1)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span className="text-xs text-calculator-text-secondary">Year 03</span>
                </div>
                <div className="text-lg font-semibold text-calculator-text-primary">
                  {formatCurrency(withAppticsYear3)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span className="text-xs text-calculator-text-secondary">Year 04</span>
                </div>
                <div className="text-lg font-semibold text-calculator-text-primary">
                  {formatCurrency(withAppticsYear4)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-3 h-3 bg-success rounded"></div>
                  <span className="text-xs text-calculator-text-secondary">Income per customer Acquired</span>
                </div>
                <div className="text-lg font-semibold text-calculator-text-primary">
                  {formatCurrency(passiveIncomePerCustomer)}
                </div>
              </div>
            </div>
          </Card>

          {/* Without Apptics */}
          <Card className="p-6 bg-calculator-input border-border">
            <h3 className="text-sm text-calculator-text-secondary mb-4">Without Apptics</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-xs text-calculator-text-secondary mb-1">Year 01</div>
                <div className="text-lg font-semibold text-calculator-text-primary">
                  {formatCurrency(withoutApptics)}
                </div>
              </div>
              <div>
                <div className="text-xs text-calculator-text-secondary mb-1">Year 02</div>
                <div className="text-lg font-semibold text-calculator-text-primary">
                  {formatCurrency(withoutApptics)}
                </div>
              </div>
              <div>
                <div className="text-xs text-calculator-text-secondary mb-1">Passive Subscriber Income</div>
                <div className="text-lg font-semibold text-calculator-text-primary">
                  {formatCurrency(withoutPassive)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-calculator-text-secondary mb-1">Year 03</div>
                <div className="text-lg font-semibold text-calculator-text-primary">
                  {formatCurrency(withoutApptics)}
                </div>
              </div>
              <div>
                <div className="text-xs text-calculator-text-secondary mb-1">Year 04</div>
                <div className="text-lg font-semibold text-calculator-text-primary">
                  {formatCurrency(withoutApptics)}
                </div>
              </div>
              <div>
                <div className="text-xs text-calculator-text-secondary mb-1">Income per customer Acquired</div>
                <div className="text-lg font-semibold text-calculator-text-primary">
                  {formatCurrency(withoutIncomePerCustomer)}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;