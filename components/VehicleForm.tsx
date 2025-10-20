'use client';

import { useState } from 'react';

interface VehicleFormProps {
  initialData?: {
    vin?: string;
    stockNumber?: string;
    year?: number;
    make?: string;
    model?: string;
    trim?: string;
    bodyStyle?: string;
    drivetrain?: string;
    transmission?: string;
    engine?: string;
    fuelType?: string;
    exteriorColor?: string;
    interiorColor?: string;
    price?: number;
    msrp?: number;
    mileage?: number;
    features?: string[];
    vdpUrl?: string;
  };
  onSave: (vehicleData: any) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function VehicleForm({ initialData, onSave, onCancel, isLoading = false }: VehicleFormProps) {
  const [formData, setFormData] = useState({
    vin: initialData?.vin || '',
    stockNumber: initialData?.stockNumber || '',
    year: initialData?.year || new Date().getFullYear(),
    make: initialData?.make || '',
    model: initialData?.model || '',
    trim: initialData?.trim || '',
    bodyStyle: initialData?.bodyStyle || '',
    drivetrain: initialData?.drivetrain || '',
    transmission: initialData?.transmission || '',
    engine: initialData?.engine || '',
    fuelType: initialData?.fuelType || '',
    exteriorColor: initialData?.exteriorColor || '',
    interiorColor: initialData?.interiorColor || '',
    price: initialData?.price || '',
    msrp: initialData?.msrp || '',
    mileage: initialData?.mileage || '',
    features: initialData?.features || [],
    vdpUrl: initialData?.vdpUrl || '',
  });

  const [newFeature, setNewFeature] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up the data
    const cleanData = {
      ...formData,
      year: formData.year ? parseInt(formData.year.toString()) : null,
      price: formData.price ? parseFloat(formData.price.toString()) : null,
      msrp: formData.msrp ? parseFloat(formData.msrp.toString()) : null,
      mileage: formData.mileage ? parseInt(formData.mileage.toString()) : null,
    };

    await onSave(cleanData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            VIN
          </label>
          <input
            type="text"
            value={formData.vin}
            onChange={(e) => handleInputChange('vin', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
            placeholder="Enter VIN"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Stock Number
          </label>
          <input
            type="text"
            value={formData.stockNumber}
            onChange={(e) => handleInputChange('stockNumber', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
            placeholder="Enter stock number"
          />
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Year
          </label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
            min="1900"
            max={new Date().getFullYear() + 1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Make
          </label>
          <input
            type="text"
            value={formData.make}
            onChange={(e) => handleInputChange('make', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
            placeholder="e.g., Toyota"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Model
          </label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
            placeholder="e.g., Camry"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Trim
          </label>
          <input
            type="text"
            value={formData.trim}
            onChange={(e) => handleInputChange('trim', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
            placeholder="e.g., LE, XLE"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Body Style
          </label>
          <select
            value={formData.bodyStyle}
            onChange={(e) => handleInputChange('bodyStyle', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
          >
            <option value="">Select body style</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
            <option value="Coupe">Coupe</option>
            <option value="Convertible">Convertible</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Wagon">Wagon</option>
            <option value="Van">Van</option>
          </select>
        </div>
      </div>

      {/* Mechanical Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Drivetrain
          </label>
          <select
            value={formData.drivetrain}
            onChange={(e) => handleInputChange('drivetrain', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
          >
            <option value="">Select drivetrain</option>
            <option value="FWD">Front Wheel Drive</option>
            <option value="RWD">Rear Wheel Drive</option>
            <option value="AWD">All Wheel Drive</option>
            <option value="4WD">Four Wheel Drive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Transmission
          </label>
          <select
            value={formData.transmission}
            onChange={(e) => handleInputChange('transmission', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
          >
            <option value="">Select transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="CVT">CVT</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Engine
          </label>
          <input
            type="text"
            value={formData.engine}
            onChange={(e) => handleInputChange('engine', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
            placeholder="e.g., 2.5L 4-Cylinder"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Fuel Type
          </label>
          <select
            value={formData.fuelType}
            onChange={(e) => handleInputChange('fuelType', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
          >
            <option value="">Select fuel type</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
            <option value="Plug-in Hybrid">Plug-in Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Mileage
          </label>
          <input
            type="number"
            value={formData.mileage}
            onChange={(e) => handleInputChange('mileage', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
            placeholder="Enter mileage"
            min="0"
          />
        </div>
      </div>

      {/* Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Exterior Color
          </label>
          <input
            type="text"
            value={formData.exteriorColor}
            onChange={(e) => handleInputChange('exteriorColor', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
            placeholder="e.g., Silver, Black, White"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Interior Color
          </label>
          <input
            type="text"
            value={formData.interiorColor}
            onChange={(e) => handleInputChange('interiorColor', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
            placeholder="e.g., Black, Tan, Gray"
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Price
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            MSRP
          </label>
          <input
            type="number"
            value={formData.msrp}
            onChange={(e) => handleInputChange('msrp', e.target.value)}
            className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
            placeholder="Enter MSRP"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Key Features
        </label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
              placeholder="Add a feature (e.g., Heated Seats, Navigation)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] transition-colors"
            >
              Add
            </button>
          </div>
          {formData.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#1F1F1F] border border-gray-600 rounded-full text-sm text-gray-300"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-gray-500 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* VDP URL */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Vehicle Detail Page URL
        </label>
        <input
          type="url"
          value={formData.vdpUrl}
          onChange={(e) => handleInputChange('vdpUrl', e.target.value)}
          className="w-full px-3 py-2 bg-[#1F1F1F] border border-gray-600 rounded-lg text-white focus:border-[#DC2626] focus:outline-none"
          placeholder="https://yourdealer.com/vehicle/..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Vehicle Details'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-[#1F1F1F] text-gray-300 rounded-lg hover:bg-[#2F2F2F] transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
