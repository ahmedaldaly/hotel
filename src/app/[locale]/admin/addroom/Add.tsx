'use client'
import React ,{useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

type RoomFormData = {
  roomNumber: string;
  type: string;
  bedType: string;
  price: number;
  capacity: number;
  description: string;
  isAvailable: boolean;
  amenities: string;
  discount: number;
  files: FileList | null;
};

const AddRoomPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RoomFormData>();
const [loading, setLoading] = useState(false)
  const onSubmit = async (data: RoomFormData) => {
    try {
      setLoading(true)
      const formData = new FormData();

      // Append fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'files') {
          formData.append(key, String(value));
        }
      });

      if (data.files && data.files.length > 0) {
        for (let i = 0; i < data.files.length; i++) {
          formData.append('files', data.files[i]);
        }
      }

      const token = cookie.get('token');

      const response = await axios.post(
        'http://localhost:4000/api/v1/room/add-room',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${token}`
          }
        }
      );
    await  toast.success('تمت إضافة الغرفة بنجاح');
    setLoading(false)
      router.push('/admin/roommangment');
    } catch (error) {
      console.error('Error adding room:', error);
      toast.error('حدث خطأ أثناء إضافة الغرفة');
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center  px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl bg-black/50 backdrop-blur-md text-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-white text-center">إضافة غرفة جديدة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Room Number */}
          <div>
            <label className="block mb-1 font-medium text-white">
              رقم الغرفة <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('roomNumber', { required: 'رقم الغرفة مطلوب' })}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.roomNumber ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.roomNumber && <p className="text-red-500 text-sm mt-1">{errors.roomNumber.message}</p>}
          </div>

          {/* Room Type */}
          <div>
            <label className="block mb-1 font-medium text-white">نوع الغرفة</label>
            <select
              {...register('type')}
              className="w-full px-4 py-2 border bg-black/50 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">اختر النوع</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Standard">Standard</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          {/* Bed Type */}
          <div>
            <label className="block mb-1 font-medium text-white">نوع السرير</label>
            <select
              {...register('bedType')}
              className="w-full px-4 py-2  bg-black/50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">اختر النوع</option>
              <option value="King">King</option>
              <option value="Queen">Queen</option>
              <option value="Twin">Twin</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium text-white">
              السعر <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('price', {
                required: 'السعر مطلوب',
                min: { value: 0, message: 'يجب أن يكون السعر أكبر من أو يساوي الصفر' }
              })}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.price ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          {/* Capacity */}
          <div>
            <label className="block mb-1 font-medium text-white">
              السعة <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('capacity', {
                required: 'السعة مطلوبة',
                min: { value: 1, message: 'يجب أن تكون السعة على الأقل 1' }
              })}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.capacity ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>}
          </div>

          {/* Discount */}
          <div>
            <label className="block mb-1 font-medium ">الخصم (%)</label>
            <input
              type="number"
              {...register('discount', {
                min: { value: 0, message: 'يجب أن يكون الخصم أكبر من أو يساوي 0' },
                max: { value: 100, message: 'يجب أن يكون الخصم أقل من أو يساوي 100' }
              })}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.discount ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>}
          </div>

          {/* Available */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isAvailable"
              {...register('isAvailable')}
              className="h-5 w-5 text-blue-600"
            />
            <label htmlFor="isAvailable" className=" font-medium">متاحة</label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium ">الوصف</label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="block mb-1 font-medium ">المرافق</label>
          <input
            type="text"
            {...register('amenities')}
            placeholder="مفصولة بفاصلة"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Booked Dates */}
      

        {/* File Upload */}
        <div>
          <label className="block mb-1 font-medium ">صور الغرفة</label>
          <input
            type="file"
            {...register('files')}
            multiple
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <p className="text-sm text-gray-500 mt-1">يمكنك اختيار أكثر من صورة</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200"
        >
        {loading?"جاري التحميل":"اضافة الغرفة"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddRoomPage;
