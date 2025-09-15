import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Crown, CheckCircle, Upload, CreditCard, AlertCircle } from 'lucide-react';

export const UpgradePage: React.FC = () => {
  const { user, updateUserRole } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro'>('basic');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({
    transactionId: '',
    screenshot: null as File | null,
  });

  const plans = {
    basic: {
      name: 'Basic',
      price: '$5',
      pkrPrice: 'PKR 1,400',
      features: [
        'All written tutorials',
        'Premium video content',
        'Downloadable resources',
        'Mobile access',
      ],
    },
    pro: {
      name: 'Pro',
      price: '$15',
      pkrPrice: 'PKR 4,200',
      features: [
        'Everything in Basic',
        'Direct chat with instructor',
        'Priority support',
        'Exclusive live sessions',
        'Certificate of completion',
      ],
    },
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentData({ ...paymentData, screenshot: file });
    }
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock payment verification
    alert('Payment proof submitted! Our team will verify and activate your subscription within 24 hours.');
    updateUserRole('premium');
    setShowPaymentForm(false);
  };

  if (!user || user.role === 'guest') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <Crown className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Learnify First</h2>
          <p className="text-gray-600 mb-6">Create a free account to upgrade to premium.</p>
          <a
            href="/register"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
          >
            Join Free Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Crown className="h-16 w-16 text-amber-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upgrade to Premium</h1>
          <p className="text-xl text-gray-600">
            Unlock exclusive content and personalized mentorship
          </p>
        </div>

        {!showPaymentForm ? (
          <>
            {/* Plan Selection */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {Object.entries(plans).map(([planKey, plan]) => (
                <div
                  key={planKey}
                  className={`bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all duration-300 ${
                    selectedPlan === planKey
                      ? 'ring-4 ring-amber-500 ring-opacity-50 transform scale-105'
                      : 'hover:shadow-xl'
                  } ${planKey === 'pro' ? 'border-2 border-amber-300' : ''}`}
                  onClick={() => setSelectedPlan(planKey as 'basic' | 'pro')}
                >
                  {planKey === 'pro' && (
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center py-2 -mx-8 -mt-8 mb-6 font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-gray-900 mb-1">{plan.price}</div>
                    <div className="text-lg text-amber-600 font-medium">{plan.pkrPrice}</div>
                    <p className="text-gray-600">per month</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`w-6 h-6 rounded-full border-2 mx-auto ${
                      selectedPlan === planKey
                        ? 'bg-amber-500 border-amber-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedPlan === planKey && (
                      <CheckCircle className="h-4 w-4 text-white m-0.5" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowPaymentForm(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Continue to Payment
              </button>
            </div>
          </>
        ) : (
          /* Payment Form */
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <CreditCard className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Payment for {plans[selectedPlan].name} Plan
              </h2>
              <p className="text-gray-600">
                Amount: {plans[selectedPlan].price} ({plans[selectedPlan].pkrPrice}) per month
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Payment Instructions:</p>
                  <ul className="space-y-1 text-xs">
                    <li>1. Transfer the exact amount to the bank account above</li>
                    <li>2. Take a screenshot of the transaction</li>
                    <li>3. Upload the screenshot and enter transaction ID below</li>
                    <li>4. We'll verify and activate your subscription within 24 hours</li>
                  </ul>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitPayment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter transaction/reference ID"
                  value={paymentData.transactionId}
                  onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Screenshot
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <label
                    htmlFor="screenshot-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Click to upload screenshot
                  </label>
                  {paymentData.screenshot && (
                    <p className="text-sm text-green-600 mt-2">
                      File uploaded: {paymentData.screenshot.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 font-medium"
                >
                  Submit Payment Proof
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};