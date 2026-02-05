/**
 * Materials Service
 * 
 * Handles all materials/files-related API calls including:
 * - File upload/download
 * - File management (copy, move, delete)
 * - Folder operations
 * - Coursework
 */

import apiClient from './api.client';
import { API_ENDPOINTS } from '../config/api.config';

export interface MaterialFile {
  _id: string;
  name: string;
  key: string;
  size: number;
  mimeType: string;
  uploadedBy: string;
  createdAt: string;
}

export interface MaterialFolder {
  name: string;
  path: string;
  files: MaterialFile[];
  subfolders: MaterialFolder[];
}

export interface FileUploadData {
  userId: string;
  course?: string;
  semester?: string;
  subject?: string;
  folderPath?: string;
}

class MaterialsService {
  /**
   * Upload a single file
   */
  async uploadSingle(file: any, data: FileUploadData): Promise<{ message: string }> {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type || 'application/octet-stream',
      name: file.name || 'file',
    } as any);
    
    Object.keys(data).forEach(key => {
      formData.append(key, (data as any)[key]);
    });

    return apiClient.uploadFormData(API_ENDPOINTS.MATERIALS.UPLOAD_SINGLE, formData) as any;
  }

  /**
   * Upload multiple files
   */
  async uploadMultiple(
    files: any[],
    filesData: FileUploadData[]
  ): Promise<{ message: string }> {
    const formData = new FormData();
    
    files.forEach((file, index) => {
      formData.append('files', {
        uri: file.uri,
        type: file.type || 'application/octet-stream',
        name: file.name || `file${index}`,
      } as any);
    });
    
    formData.append('filesData', JSON.stringify(filesData));

    return apiClient.uploadFormData(API_ENDPOINTS.MATERIALS.UPLOAD_MULTIPLE, formData) as any;
  }

  /**
   * Download a file
   */
  async downloadFile(key: string): Promise<string> {
    // Returns download URL
    const response = await apiClient.get(API_ENDPOINTS.MATERIALS.DOWNLOAD, { key });
    return (response as any).url || (response as any).downloadUrl;
  }

  /**
   * Download folder(s) as zip
   */
  async downloadFolder(keys: string[]): Promise<Blob> {
    const response = await apiClient.post(API_ENDPOINTS.MATERIALS.DOWNLOAD_FOLDER, { keys });
    return response as any;
  }

  /**
   * List files and folders
   */
  async listFiles(params?: {
    prefix?: string;
    course?: string;
    semester?: string;
  }): Promise<{
    files: MaterialFile[];
    folders: string[];
  }> {
    return apiClient.get(API_ENDPOINTS.MATERIALS.LIST_FILES, params as any) as any;
  }

  /**
   * Delete files
   */
  async deleteFiles(keys: string[]): Promise<{ message: string }> {
    return apiClient.delete(API_ENDPOINTS.MATERIALS.DELETE_FILES, { keys }) as any;
  }

  /**
   * Delete folders
   */
  async deleteFolders(keys: string[]): Promise<{ message: string }> {
    return apiClient.delete(API_ENDPOINTS.MATERIALS.DELETE_FOLDERS, { keys }) as any;
  }

  /**
   * Copy a file
   */
  async copyFile(
    sourceKey: string,
    destinationKey: string
  ): Promise<{ message: string }> {
    return apiClient.post(API_ENDPOINTS.MATERIALS.COPY_FILE, {
      sourceKey,
      destinationKey,
    }) as any;
  }

  /**
   * Copy a folder
   */
  async copyFolder(
    sourceKey: string,
    destinationKey: string
  ): Promise<{ message: string }> {
    return apiClient.post(API_ENDPOINTS.MATERIALS.COPY_FOLDER, {
      sourceKey,
      destinationKey,
    }) as any;
  }

  /**
   * Move a file
   */
  async moveFile(
    sourceKey: string,
    destinationKey: string
  ): Promise<{ message: string }> {
    return apiClient.post(API_ENDPOINTS.MATERIALS.MOVE_FILE, {
      sourceKey,
      destinationKey,
    }) as any;
  }

  /**
   * Move folders
   */
  async moveFolders(
    sourceKey: string,
    destinationKey: string
  ): Promise<{ message: string }> {
    return apiClient.post(API_ENDPOINTS.MATERIALS.MOVE_FOLDER, {
      sourceKey,
      destinationKey,
    }) as any;
  }

  /**
   * Get student coursework
   */
  async getCoursework(): Promise<{ coursework: any }> {
    return apiClient.get(API_ENDPOINTS.MATERIALS.COURSEWORK) as any;
  }
}

export const materialsService = new MaterialsService();
export default materialsService;
