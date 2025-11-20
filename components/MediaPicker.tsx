import React, { useEffect, useState } from 'react';
import { X, Loader2, Image as ImageIcon, Film, File } from 'lucide-react';
import { fetchDriveFiles } from '../services/mockService';
import { DriveFile } from '../types';

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (file: DriveFile) => void;
}

const MediaPicker: React.FC<MediaPickerProps> = ({ isOpen, onClose, onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<DriveFile[]>([]);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchDriveFiles()
        .then(setFiles)
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Select Media from Google Drive
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mt-2 h-96 overflow-y-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                  <p className="text-sm text-gray-500">Connecting to Google Drive...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {files.map((file) => (
                    <div 
                      key={file.id}
                      onClick={() => onSelect(file)}
                      className="group relative border rounded-lg p-2 hover:border-primary hover:shadow-md cursor-pointer transition-all"
                    >
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 h-32 flex items-center justify-center">
                        {file.thumbnailLink ? (
                          <img 
                            src={file.thumbnailLink} 
                            alt={file.name}
                            className="object-cover h-full w-full group-hover:opacity-75"
                          />
                        ) : (
                          <div className="text-gray-400">
                            {file.mimeType.includes('video') ? <Film /> : <ImageIcon />}
                          </div>
                        )}
                      </div>
                      <p className="mt-2 block text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="block text-xs font-medium text-gray-500">
                        {file.mimeType.split('/')[1].toUpperCase()}
                      </p>
                    </div>
                  ))}
                  
                  {/* Upload New Option */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary cursor-pointer h-auto min-h-[160px]">
                    <File className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">Upload New</span>
                    <input type="file" className="hidden" />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPicker;