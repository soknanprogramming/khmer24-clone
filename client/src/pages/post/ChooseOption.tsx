import React, { useEffect, useState } from 'react';
import useSellRequirements from '../../store/useSellRequirements';
import useComponents from '../../store/useComponents';
import PhotoUpload from './components/PhotoUpload'; // Assuming this component exists
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'; // Added FaMinusCircle
import LocationPopup from './components/LocationPopup';
import BrandPopup from './components/BrandPopup';
import LocationMap from './components/LocationMap';

const ChooseOption: React.FC = () => {
  const { requirements, loading, error, fetchRequirements } = useSellRequirements();
  const { 
    vga, cpu, ram, storage, screen, 
    loading: componentsLoading, 
    error: componentsError, 
    fetchAllComponents 
  } = useComponents();
  const [brandId, setBrandId] = useState<number | null>(null)
  const [cityId, setCityId] = useState<number | null>(null)
  const [districtsId, setDistrictsId] = useState<number | null>(null)
  const [communesId, setCommunesId] = useState<number | null>(null)
  const [photos, setPhotos] = useState<File[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']); // Array to store multiple phone numbers
  const [formData, setFormData] = useState({
    ad_headline: '',
    category: '50', // Fixed as per your initial state
    brand: brandId || null,
    condition: 'used', // Default to 'used'
    vga: '',
    cpu: '',
    ram: '',
    storage: '',
    screenSize: '',
    price: '',
    discount: '',
    discountType: 'percent', // Default discount type
    freeDelivery: false,
    description: '',
    province: 'Kampong Chhnang', // Default location
    district: 'Tuek Phos',
    commune: 'Tuol Khpos',
    address: '',
    name: '',
    phoneNumber: '', // Keep for backward compatibility
    email: '',
  });

  useEffect(() => {
    // We keep your logic to fetch requirements, though it's not used in this static UI
    // In a real app, you would use 'requirements' to populate dropdowns
    fetchRequirements(1);
    // Fetch all components data
    fetchAllComponents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchRequirements, fetchAllComponents]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    // Handle checkbox input
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle phone number changes
  const handlePhoneNumberChange = (index: number, value: string) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
    
    // Update formData with the first phone number for backward compatibility
    setFormData(prev => ({
      ...prev,
      phoneNumber: newPhoneNumbers[0] || ''
    }));
  };

  // Add new phone number
  const addPhoneNumber = () => {
    if (phoneNumbers.length < 3) {
      setPhoneNumbers([...phoneNumbers, '']);
    }
  };

  // Remove phone number
  const removePhoneNumber = (index: number) => {
    if (phoneNumbers.length > 1) {
      const newPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
      setPhoneNumbers(newPhoneNumbers);
      
      // Update formData with the first phone number for backward compatibility
      setFormData(prev => ({
        ...prev,
        phoneNumber: newPhoneNumbers[0] || ''
      }));
    }
  };

  const setDiscountType = (type: 'percent' | 'amount') => {
    setFormData((prev) => ({ ...prev, discountType: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append all form fields from state
    for (const key in formData) {
      formDataToSend.append(key, (formData as any)[key]);
    }

    // Append phone numbers
    phoneNumbers.forEach((phone, index) => {
      if (phone.trim()) {
        formDataToSend.append(`phoneNumber${index + 1}`, phone);
      }
    });

    // Append photos
    photos.forEach((photo) => {
      formDataToSend.append('photos', photo);
    });

    console.log('Submitting FormData:', Object.fromEntries(formDataToSend.entries()));
    alert('Form submitted! Check the console for the data.');
    // In a real app, you would proceed with the fetch request here
  };

  // Common class names for inputs and selects for consistency
  const fieldHeightClass = 'h-11';
  const inputBorderClass = 'border border-gray-300 rounded-md';
  const focusRingClass = 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

  if (loading || componentsLoading) return <div className="text-center py-10">Loading form requirements...</div>;
  if (error || componentsError) return <div className="text-center py-10 text-red-500">Error: {error || componentsError}</div>;

  return (
    <div className="bg-gray-50 p-4 font-sans">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
        {/* Photo Section */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-center mb-3">
            <p className="font-bold text-lg">Photo</p>
            <p className="text-gray-500 text-lg">{photos.length}/8</p>
          </div>
          {/* Using a simplified photo upload UI */}
          <PhotoUpload onPhotosChange={setPhotos} />
        </div>

        {/* Detail Post Section */}
        <div className="bg-white rounded-lg shadow p-5">
          <p className="font-bold text-lg border-b pb-3 mb-4">Detail Post</p>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Title <b className="text-red-500">*</b>
              </label>
              <input
                type="text"
                name="ad_headline"
                value={formData.ad_headline}
                onChange={handleChange}
                className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-3`}
                required
              />
            </div>

            {/* Category */}
            {/* <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Choose a Category <b className="text-red-500">*</b>
              </label>
              <div className={`flex items-center justify-between bg-gray-100 rounded-md p-2 ${fieldHeightClass}`}>
                <p className="m-0 text-gray-800">Computers & Accessories &gt; Laptops</p>
                <button type="button" className="text-sm bg-blue-600 text-white font-semibold py-1 px-3 rounded-md hover:bg-blue-700">
                  Change
                </button>
              </div>
            </div> */}

            <div className="grid grid-cols-1 gap-4">
              {/* Brand */}
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Brand <b className="text-red-500">*</b></label>
                <BrandPopup subCategoriesId={1} setBrandId={setBrandId} />
              </div>

              {/* Condition */}
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Condition <b className="text-red-500">*</b></label>
                <div className={`flex p-1 space-x-1 bg-gray-100 rounded-md ${inputBorderClass}`}>
                    <button type="button" onClick={() => setFormData(f => ({...f, condition: 'used'}))} className={`w-1/2 rounded-md py-1.5 ${formData.condition === 'used' ? 'bg-white shadow' : 'bg-transparent text-gray-600'}`}>Used</button>
                    <button type="button" onClick={() => setFormData(f => ({...f, condition: 'new'}))} className={`w-1/2 rounded-md py-1.5 ${formData.condition === 'new' ? 'bg-white shadow' : 'bg-transparent text-gray-600'}`}>New</button>
                </div>
              </div>

              {/* VGA */}
              <div>
                <label className="font-semibold text-gray-700 block mb-1">VGA <b className="text-red-500">*</b></label>
                <select name="vga" value={formData.vga} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-2`} required>
                  <option value="">Select VGA</option>
                  {vga.map((item) => (
                    <option key={item.ID} value={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* CPU */}
              <div>
                <label className="font-semibold text-gray-700 block mb-1">CPU <b className="text-red-500">*</b></label>
                <select name="cpu" value={formData.cpu} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-2`} required>
                  <option value="">Select CPU</option>
                  {cpu.map((item) => (
                    <option key={item.ID} value={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* RAM */}
              <div>
                <label className="font-semibold text-gray-700 block mb-1">RAM <b className="text-red-500">*</b></label>
                <select name="ram" value={formData.ram} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-2`} required>
                  <option value="">Select RAM</option>
                  {ram.map((item) => (
                    <option key={item.ID} value={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Storage */}
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Storage <b className="text-red-500">*</b></label>
                <select name="storage" value={formData.storage} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-2`} required>
                  <option value="">Select Storage</option>
                  {storage.map((item) => (
                    <option key={item.ID} value={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Screen Size */}
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Screen Size <b className="text-red-500">*</b></label>
                <select name="screenSize" value={formData.screenSize} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-2`} required>
                  <option value="">Select Screen Size</option>
                  {screen.map((item) => (
                    <option key={item.ID} value={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {/* Price */}
               <div>
                  <label className="font-semibold text-gray-700 block mb-1">Price <b className="text-red-500">*</b></label>
                  <div className="relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                     <input type="number" name="price" value={formData.price} onChange={handleChange} className={`w-full pl-7 ${fieldHeightClass} ${inputBorderClass} ${focusRingClass}`} required/>
                  </div>
               </div>
               {/* Discount */}
               <div>
                  <label className="font-semibold text-gray-700 block mb-1">Discount</label>
                  <div className="flex">
                     <input type="number" name="discount" value={formData.discount} onChange={handleChange} className={`w-full rounded-l-md ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-3`} />
                     <div className="flex p-1 space-x-1 bg-gray-100 rounded-r-md border border-l-0 border-gray-300">
                         <button type="button" onClick={() => setDiscountType('percent')} className={`px-2 rounded ${formData.discountType === 'percent' ? 'bg-white shadow' : 'bg-transparent text-gray-600'}`}>%</button>
                         <button type="button" onClick={() => setDiscountType('amount')} className={`px-2 rounded ${formData.discountType === 'amount' ? 'bg-white shadow' : 'bg-transparent text-gray-600'}`}>$</button>
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Free Delivery */}
            <div>
               <label className="font-semibold text-gray-700 block mb-1">Free Delivery</label>
               <div className={`flex items-center justify-between px-3 ${fieldHeightClass} ${inputBorderClass}`}>
                  <span className="text-gray-800">Yes</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" name="freeDelivery" checked={formData.freeDelivery} onChange={handleChange} className="sr-only peer"/>
                     <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
               </div>
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Description <b className="text-red-500">*</b>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full ${inputBorderClass} ${focusRingClass} px-3 py-2`}
                required
              ></textarea>
            </div>

            {/* Location & Address */}
             <div className='w-full'>
                <label className="font-semibold text-gray-700 block mb-1">Locations <b className="text-red-500">*</b></label>
                <LocationPopup setCityId={setCityId} cityId={cityId} setDistrictsId={setDistrictsId} districtsId={districtsId} setCommunesId={setCommunesId} communesId={communesId}/>
            </div>
             <div>
                <label className="font-semibold text-gray-700 block mb-1">Address <b className="text-red-500">*</b></label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-3`} required/>
            </div>
            
            <div id='mapping'>
              <LocationMap/>
            </div>
          </div>
        </div>
        
        {/* Contact Detail Section */}
        <div className="bg-white rounded-lg shadow p-5">
            <p className="font-bold text-lg border-b pb-3 mb-4">Contact Detail</p>
            <div className="space-y-4">
                <div>
                    <label className="font-semibold text-gray-700 block mb-1">Name <b className="text-red-500">*</b></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-3`} required />
                </div>
                <div>
                    <label className="font-semibold text-gray-700 block mb-1">Phone Number <b className="text-red-500">*</b></label>
                    <div className="space-y-2">
                        {phoneNumbers.map((phone, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="tel"
                                    name={`phoneNumber${index + 1}`}
                                    value={phone}
                                    onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                                    placeholder={`Phone Number ${index + 1}`}
                                    className={`flex-1 ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-3`}
                                    required={index === 0}
                                />
                                {phoneNumbers.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removePhoneNumber(index)}
                                        className="text-red-600 hover:text-red-800 p-1"
                                        title="Remove phone number"
                                    >
                                        <FaMinusCircle size={20} />
                                    </button>
                                )}
                                {index === phoneNumbers.length - 1 && phoneNumbers.length < 3 && (
                                    <button 
                                        type="button" 
                                        onClick={addPhoneNumber} 
                                        className="text-blue-600 hover:text-blue-800 p-1"
                                        title="Add another phone number"
                                    >
                                        <FaPlusCircle size={24} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <label className="font-semibold text-gray-700 block mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={`w-full ${fieldHeightClass} ${inputBorderClass} ${focusRingClass} px-3`}/>
                </div>
            </div>
        </div>

        {/* Submit Section */}
        <div className="text-center">
            <button type="submit" className="w-full bg-red-500 text-white font-bold text-lg rounded-lg py-3 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300">
                Submit
            </button>
        </div>
      </form>
    </div>
  );
};

export default ChooseOption;