import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Upload } from 'lucide-react';

export default function Index() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleUpload = () => {
    if (file) {
      // Here you would typically send the file to a server
      // For this example, we'll just simulate a successful upload
      setTimeout(() => {
        setUploadStatus('success');
        // Reset after 3 seconds
        setTimeout(() => setUploadStatus(null), 3000);
      }, 1000);
    } else {
      setUploadStatus('error');
      // Reset after 3 seconds
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CSV File Upload</h1>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="csv-upload"
        />
        <label
          htmlFor="csv-upload"
          className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Upload className="mr-2 h-4 w-4" />
          Choose CSV
        </label>
        <span className="text-sm text-gray-600">{fileName || 'No file chosen'}</span>
      </div>
      <Button onClick={handleUpload} disabled={!file}>
        Upload CSV
      </Button>
      {uploadStatus === 'success' && (
        <Alert className="mt-4 bg-green-100 border-green-400 text-green-700">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your CSV file has been uploaded successfully.</AlertDescription>
        </Alert>
      )}
      {uploadStatus === 'error' && (
        <Alert className="mt-4 bg-red-100 border-red-400 text-red-700">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Please select a CSV file before uploading.</AlertDescription>
        </Alert>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click on "Choose CSV" to select your CSV file.</li>
          <li>Once a file is selected, its name will appear next to the button.</li>
          <li>Click "Upload CSV" to upload the selected file.</li>
          <li>You'll see a success message if the upload is successful, or an error message if no file was selected.</li>
        </ol>
      </div>
      <img src="/placeholder.svg" alt="CSV file structure example" className="mx-auto object-cover w-full h-[200px] mt-8" />
    </div>
  );
}