import { useState, useCallback } from 'react';

interface FileUploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
  uploadedFiles: UploadedFile[];
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
}

export const useFileUpload = () => {
  const [state, setState] = useState<FileUploadState>({
    uploading: false,
    progress: 0,
    error: null,
    uploadedFiles: [],
  });

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    setState(prev => ({ ...prev, uploading: true, progress: 0, error: null }));

    try {
      const fileArray = Array.from(files);
      const uploadPromises = fileArray.map(async (file, index) => {
        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 50));
          setState(prev => ({
            ...prev,
            progress: Math.round(((index * 100) + i) / fileArray.length),
          }));
        }

        // Create object URL for preview
        const url = URL.createObjectURL(file);
        
        return {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          url,
          uploadedAt: new Date(),
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      
      setState(prev => ({
        ...prev,
        uploading: false,
        progress: 100,
        uploadedFiles: [...prev.uploadedFiles, ...uploadedFiles],
      }));

      return uploadedFiles;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        uploading: false,
        error: error.message || 'Upload failed',
      }));
      throw error;
    }
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setState(prev => {
      const fileToRemove = prev.uploadedFiles.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      
      return {
        ...prev,
        uploadedFiles: prev.uploadedFiles.filter(f => f.id !== fileId),
      };
    });
  }, []);

  const clearAll = useCallback(() => {
    state.uploadedFiles.forEach(file => {
      URL.revokeObjectURL(file.url);
    });
    
    setState({
      uploading: false,
      progress: 0,
      error: null,
      uploadedFiles: [],
    });
  }, [state.uploadedFiles]);

  return {
    ...state,
    uploadFiles,
    removeFile,
    clearAll,
  };
};