"use client";
import { BaseUrl } from "@/components/BaseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdModeEdit, MdDeleteOutline } from "react-icons/md";
import cookie from "js-cookie";

const Fetch = () => {
  const token = cookie.get("token");

  interface room {
    amenities: string[];
    bedType: string;
    description: string;
    _id: string;
    images: {
      url: string;
    }[];
  }

  const [room, setRoom] = useState<room[]>([]);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState<room | null>(null);

  useEffect(() => {
    axios.get(`${BaseUrl}/api/v1/room`).then((data) => {
      setRoom(data.data);
    });
  }, []);

  const delet = async (id: string) => {
    try {
      await axios.delete(`${BaseUrl}/api/v1/room/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setRoom((data) => data.filter((room) => room._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (room: room) => {
    setEditData(room);
    setEditModal(true);
  };

  const handleEditSubmit = async () => {
    if (!editData) return;

    try {
      await axios.put(
        `${BaseUrl}/api/v1/room/${editData._id}`,
        {
          bedType: editData.bedType,
          description: editData.description,
          amenities: editData.amenities,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      // تحديث البيانات بعد التعديل
      const updated = await axios.get(`${BaseUrl}/api/v1/room`);
      setRoom(updated.data);
      setEditModal(false);
      setEditData(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {room.map((item) => (
          <div
            key={item._id}
            className="rounded-xl backdrop-blur-md bg-white/10 shadow-lg ring-1 ring-white/20 p-4 text-white"
          >
            <img
              src={item.images[1]?.url || item.images[0]?.url}
              alt="Room"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{item.bedType}</h2>
            <p className="text-sm mb-2">{item.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {item.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                >
                  {amenity}
                </span>
              ))}
              <span className="text-xl px-3 py-1 bg-white/20 backdrop-blur-sm gap-3 rounded-full border flex justify-center items-center border-white/30">
                <span
                  className="hover:scale-105 hover:text-green-500 cursor-pointer"
                  onClick={() => handleEditClick(item)}
                >
                  <MdModeEdit />
                </span>
                <span
                  className="hover:scale-105 hover:text-red-700 cursor-pointer"
                  onClick={() => delet(item._id)}
                >
                  <MdDeleteOutline />
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Edit */}
      {editModal && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] sm:w-[500px] text-black">
            <h2 className="text-xl font-bold mb-4">تعديل الغرفة</h2>
            <input
              className="w-full mb-3 p-2 border rounded"
              placeholder="نوع السرير"
              value={editData.bedType}
              onChange={(e) =>
                setEditData({ ...editData, bedType: e.target.value })
              }
            />
            <textarea
              className="w-full mb-3 p-2 border rounded"
              placeholder="الوصف"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />
            <input
              className="w-full mb-3 p-2 border rounded"
              placeholder="وسائل الراحة (مفصولة بفاصلة)"
              value={editData.amenities.join(",")}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  amenities: e.target.value.split(","),
                })
              }
            />

            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => {
                  setEditModal(false);
                  setEditData(null);
                }}
              >
                إلغاء
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleEditSubmit}
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fetch;
