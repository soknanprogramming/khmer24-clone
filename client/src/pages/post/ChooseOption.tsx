import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useSellRequirements from '../../store/useSellRequirements';
import useComponents from '../../store/useComponents';
import PhotoUpload from './components/PhotoUpload';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import LocationPopup from './components/LocationPopup';
import BrandPopup from './components/BrandPopup';
import LocationMap from './components/LocationMap';
import { useNavigate } from "react-router-dom";


// Add LatLng interface
interface LatLng {
  lat: number;
  lng: number;
}

const ChooseOption: React.FC = () => {
  const navigate = useNavigate();
  const { requirements, loading, error, fetchRequirements } = useSellRequirements();
  const {
    vga, cpu, ram, storage, screen,
    loading: componentsLoading,
    error: componentsError,
    fetchAllComponents
  } = useComponents();

  // State for pop-up selections
  const [brandId, setBrandId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [districtsId, setDistrictsId] = useState<number | null>(null);
  const [communesId, setCommunesId] = useState<number | null>(null);

  // State for location from map
  const [location, setLocation] = useState<LatLng | null>(null);
  
  // State for files and dynamic inputs
  const [photos, setPhotos] = useState<File[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);
  
  // A single state object for all form fields
  const [formData, setFormData] = useState({
    name: '',
    productSubCategoryId: 1, // Defaulting to 1 for 'Laptops' as an example
    conditionId: 1, // Defaulting to 1 for 'Used'
    vga: '',
    cpu: '',
    ram: '',
    storage: '',
    screenSize: '',
    price: '',
    discount: '',
    discountType: 'percent',
    freeDelivery: false,
    description: '',
    address: '',
    contactName: '',
    email: '',
  });

  useEffect(() => {
    // Fetch data for dropdowns when the component loads
    fetchRequirements(1);
    fetchAllComponents();
  }, [fetchRequirements, fetchAllComponents]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const addPhoneNumber = () => {
    if (phoneNumbers.length < 3) {
      setPhoneNumbers([...phoneNumbers, '']);
    }
  };

  const removePhoneNumber = (index: number) => {
    if (phoneNumbers.length > 1) {
      const newPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
      setPhoneNumbers(newPhoneNumbers);
    }
  };

  const handleLocationChange = (latLng: LatLng) => {
    setLocation(latLng);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- VALIDATION ---
    if (photos.length === 0) {
      alert('Please upload at least one photo.');
      return;
    }
    if (!brandId) {
      alert('Please select a brand.');
      return;
    }
    if (!cityId || !districtsId || !communesId) {
      alert('Please select a complete location (City, District, and Commune).');
      return;
    }

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataToSend.append(key, String(value));
      }
    });

    if (location) {
      formDataToSend.append('latitude', String(location.lat));
      formDataToSend.append('longitude', String(location.lng));
    }
    
    formDataToSend.append('productBrandId', String(brandId));
    formDataToSend.append('cityId', String(cityId));
    formDataToSend.append('districtId', String(districtsId));
    formDataToSend.append('communeId', String(communesId));

    phoneNumbers.forEach((phone, index) => {
      if (phone.trim()) {
        formDataToSend.append(`phoneNumber${index + 1}`, phone);
      }
    });

    photos.forEach((photo) => {
      formDataToSend.append('photos', photo);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        alert('Product posted successfully!');
        navigate(`/`);
      }
    } catch (err) {
      console.error('Failed to post product:', err);
      let alertMessage = 'An unexpected error occurred. Please try again.';
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.data.errors) {
          const validationErrors = err.response.data.errors.map((error: any) => error.msg).join('\n');
          alertMessage = `Please fix the following issues:\n${validationErrors}`;
        } else if (err.response.data.message) {
          alertMessage = `Server Error: ${err.response.data.message}`;
        }
      }
      alert(alertMessage);
    }
  };

  const fieldHeightClass = 'h-11';
  const inputBorderClass = 'border border-gray-300 rounded-md';
  const focusRingClass = 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

  if (loading || componentsLoading) return <div className="text-center py-10">Loading form...</div>;
  if (error || componentsError) return <div className="text-center py-10 text-red-500">Error: {error || componentsError}</div>;

  return (
    <div className="bg-gray-50 p-4 font-sans">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
        {/* Photo Section */}
        <div className="bg-white rounded-lg shadow p-5">
          <p className="font-bold text-lg border-b pb-3 mb-4">Upload Photos</p>
          <PhotoUpload onPhotosChange={setPhotos} />
        </div>

        {/* Product Details Section */}
        <div className="bg-white rounded-lg shadow p-5">
          <p className="font-bold text-lg border-b pb-3 mb-4">Product Details</p>
          <div className="space-y-4">
            
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Product Name <b className="text-red-500">*</b></label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-3`} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Brand <b className="text-red-500">*</b></label>
                <BrandPopup subCategoriesId={1} setBrandId={setBrandId} />
              </div>
              
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Condition <b className="text-red-500">*</b></label>
                <select name="conditionId" value={formData.conditionId} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-2`} required>
                    <option value="1">Used</option>
                    <option value="2">New</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">VGA</label>
                <select name="vga" value={formData.vga} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-2`}>
                  <option value="">Select VGA</option>
                  {vga.map((item) => <option key={item.ID} value={item.ID}>{item.Name}</option>)}
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">CPU</label>
                <select name="cpu" value={formData.cpu} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-2`}>
                  <option value="">Select CPU</option>
                  {cpu.map((item) => <option key={item.ID} value={item.ID}>{item.Name}</option>)}
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">RAM</label>
                <select name="ram" value={formData.ram} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-2`}>
                  <option value="">Select RAM</option>
                  {ram.map((item) => <option key={item.ID} value={item.ID}>{item.Name}</option>)}
                </select>
              </div>
              
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Storage</label>
                <select name="storage" value={formData.storage} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-2`}>
                  <option value="">Select Storage</option>
                  {storage.map((item) => <option key={item.ID} value={item.ID}>{item.Name}</option>)}
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Screen Size</label>
                <select name="screenSize" value={formData.screenSize} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-2`}>
                  <option value="">Select Screen Size</option>
                  {screen.map((item) => <option key={item.ID} value={item.ID}>{item.Name}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Price <b className="text-red-500">*</b></label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className={`w-full pl-7 ${fieldHeightClass} ${inputBorderClass} ${focusRingClass}`} required />
              </div>
            </div>

            {/* Discount Section */}
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Discount</label>
              <div className="flex items-center">
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-3 rounded-r-none`}
                  placeholder="e.g., 10"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, discountType: 'percent' }))}
                  className={`px-4 ${fieldHeightClass} border-t border-b ${formData.discountType === 'percent' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 border-gray-300'}`}
                >
                  %
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, discountType: 'dollar' }))}
                  className={`px-4 ${fieldHeightClass} border rounded-r-md ${formData.discountType === 'dollar' ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-200 border-gray-300'}`}
                >
                  $
                </button>
              </div>
            </div>

            {/* Free Delivery Checkbox */}
            <div className="flex items-center pt-2">
              <input
                type="checkbox"
                id="freeDelivery"
                name="freeDelivery"
                checked={formData.freeDelivery}
                onChange={handleChange}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="freeDelivery" className="ml-2 font-semibold text-gray-700">
                Free Delivery
              </label>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Description <b className="text-red-500">*</b></label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={`w-full ${inputBorderClass} ${focusRingClass} px-3 py-2`} required></textarea>
            </div>
          </div>
        </div>
        
        {/* Location Section */}
        <div className="bg-white rounded-lg shadow p-5">
            <p className="font-bold text-lg border-b pb-3 mb-4">Location & Address</p>
            <div className='w-full'>
                <label className="font-semibold text-gray-700 block mb-1">Location <b className="text-red-500">*</b></label>
                <LocationPopup setCityId={setCityId} cityId={cityId} setDistrictsId={setDistrictsId} districtsId={districtsId} setCommunesId={setCommunesId} communesId={communesId}/>
            </div>
             <div className='mt-4'>
                <label className="font-semibold text-gray-700 block mb-1">Address <b className="text-red-500">*</b></label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-3`} required/>
            </div>
            <div id='mapping' className='mt-4'>
              <LocationMap onLocationChange={handleLocationChange} />
            </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-lg shadow p-5">
          <p className="font-bold text-lg border-b pb-3 mb-4">Contact Details</p>
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Your Name <b className="text-red-500">*</b></label>
              <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-3`} required />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Phone Number(s) <b className="text-red-500">*</b></label>
              {phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input type="tel" value={phone} onChange={(e) => handlePhoneNumberChange(index, e.target.value)} placeholder={`Phone Number ${index + 1}`} className={`flex-1 ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-3`} required={index === 0} />
                  {phoneNumbers.length > 1 && (<button type="button" onClick={() => removePhoneNumber(index)}><FaMinusCircle size={20} className='text-red-500'/></button>)}
                  {index === phoneNumbers.length - 1 && phoneNumbers.length < 3 && (<button type="button" onClick={addPhoneNumber}><FaPlusCircle size={24} className='text-blue-500'/></button>)}
                </div>
              ))}
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-3`}/>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
            <button type="submit" className="w-full bg-red-500 text-white font-bold text-lg rounded-lg py-3 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300">
                Post Your Ad
            </button>
        </div>
      </form>
    </div>
  );
};

export default ChooseOption;