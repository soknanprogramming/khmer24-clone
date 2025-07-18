import React, { useState } from "react";
import { AiOutlinePlus, AiOutlinePicture } from "react-icons/ai";

type PhotoUploadProps = {
  onPhotosChange: (files: File[]) => void;
};

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotosChange }) => {
  const maxPhotos = 8;
  const [photos, setPhotos] = useState<File[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);

  const handleAddPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files).slice(0, maxPhotos - photos.length);
    const updatedPhotos = [...photos, ...selectedFiles];
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos); // ✅ Pass selected photos to parent
    if (photos.length === 0 && selectedFiles.length > 0) {
      setPreviewIndex(0);
    }
  };

  const handleDeletePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
    onPhotosChange(newPhotos); // ✅ Update parent photos
    if (previewIndex >= newPhotos.length) {
      setPreviewIndex(newPhotos.length - 1);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-gray-700">Photo</h2>
        <span className="text-gray-500">{photos.length}/{maxPhotos}</span>
      </div>

      {/* Main Content */}
      {photos.length === 0 ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-md h-32 flex justify-center items-center text-gray-400 cursor-pointer hover:bg-gray-100"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <AiOutlinePicture className="text-2xl" />
          <span className="ml-2">Add Photo</span>
        </div>
      ) : (
        <>
          {/* Main preview */}
          <div className="border rounded-md h-56 flex justify-center items-center bg-gray-100 overflow-hidden mb-2 relative">
            <img
              src={URL.createObjectURL(photos[previewIndex])}
              alt="Preview"
              className="object-contain h-full w-full"
            />
            <button
              onClick={() => handleDeletePhoto(previewIndex)}
              className="absolute top-2 right-2 bg-white rounded-full shadow px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              Remove
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto">
            {Array.from({ length: maxPhotos }).map((_, idx) => (
              <div
                key={idx}
                className="w-16 h-16 border rounded-md flex justify-center items-center cursor-pointer bg-white hover:bg-gray-100"
                onClick={() => {
                  if (idx < photos.length) setPreviewIndex(idx);
                  else document.getElementById("fileInput")?.click();
                }}
              >
                {idx < photos.length ? (
                  <img
                    src={URL.createObjectURL(photos[idx])}
                    alt={`Thumbnail ${idx}`}
                    className="object-cover w-full h-full rounded"
                  />
                ) : (
                  <AiOutlinePlus className="text-gray-400 text-xl" />
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add Photo Button */}
      <div
        className="mt-3 bg-blue-100 hover:bg-blue-200 text-blue-600 text-center py-2 rounded-md cursor-pointer flex justify-center items-center space-x-2"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <AiOutlinePicture />
        <span>Add Photo</span>
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleAddPhotos}
        />
      </div>
    </div>
  );
};

export default PhotoUpload;
