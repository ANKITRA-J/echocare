import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { 
  Upload, 
  File, 
  Image, 
  Music, 
  Video, 
  X,
  Download,
  Eye
} from 'lucide-react';
import { useFileUpload } from '../hooks/useFileUpload';

interface FileUploadZoneProps {
  accept?: Record<string, string[]>;
  maxSize?: number;
  multiple?: boolean;
  onFilesUploaded?: (files: any[]) => void;
  className?: string;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    'audio/*': ['.mp3', '.wav', '.m4a'],
    'video/*': ['.mp4', '.mov', '.avi'],
    'text/*': ['.txt', '.doc', '.docx', '.pdf'],
  },
  maxSize = 50 * 1024 * 1024, // 50MB
  multiple = true,
  onFilesUploaded,
  className = '',
}) => {
  const {
    uploading,
    progress,
    error,
    uploadedFiles,
    uploadFiles,
    removeFile,
    clearAll,
  } = useFileUpload();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const uploaded = await uploadFiles(acceptedFiles);
      if (onFilesUploaded) {
        onFilesUploaded(uploaded);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }, [uploadFiles, onFilesUploaded]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
  });

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-6 w-6" />;
    if (type.startsWith('audio/')) return <Music className="h-6 w-6" />;
    if (type.startsWith('video/')) return <Video className="h-6 w-6" />;
    return <File className="h-6 w-6" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive && !isDragReject 
            ? 'border-primary-500 bg-primary-50' 
            : isDragReject 
              ? 'border-error-500 bg-error-50'
              : 'border-cream-300 hover:border-primary-300 hover:bg-cream-50'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <Upload className={`h-12 w-12 ${
              isDragActive 
                ? isDragReject 
                  ? 'text-error-500' 
                  : 'text-primary-500'
                : 'text-secondary-400'
            }`} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">
              {isDragActive 
                ? isDragReject 
                  ? 'File type not supported' 
                  : 'Drop files here'
                : 'Drop files here or click to browse'
              }
            </h3>
            <p className="text-secondary-600 text-sm">
              Supports images, audio, video, and documents up to {formatFileSize(maxSize)}
            </p>
          </div>
          
          <button
            type="button"
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200"
          >
            Choose Files
          </button>
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 border border-cream-200"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-secondary-700">Uploading...</span>
            <span className="text-sm text-secondary-600">{progress}%</span>
          </div>
          <div className="w-full bg-cream-200 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-cream-200"
        >
          <div className="p-4 border-b border-cream-200 flex items-center justify-between">
            <h3 className="font-semibold text-secondary-800">
              Uploaded Files ({uploadedFiles.length})
            </h3>
            <button
              onClick={clearAll}
              className="text-error-600 hover:text-error-800 text-sm font-medium"
            >
              Clear All
            </button>
          </div>
          
          <div className="divide-y divide-cream-200">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-secondary-500">
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <p className="font-medium text-secondary-800">{file.name}</p>
                    <p className="text-sm text-secondary-600">
                      {formatFileSize(file.size)} • {file.uploadedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.type.startsWith('image/') && (
                    <button
                      onClick={() => window.open(file.url, '_blank')}
                      className="p-2 text-secondary-600 hover:text-secondary-800 transition-colors duration-200"
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = file.url;
                      a.download = file.name;
                      a.click();
                    }}
                    className="p-2 text-secondary-600 hover:text-secondary-800 transition-colors duration-200"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-2 text-error-600 hover:text-error-800 transition-colors duration-200"
                    title="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FileUploadZone;