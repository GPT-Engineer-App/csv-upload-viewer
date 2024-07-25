import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const generateData = () => [...Array(12)].map((_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  revenue: Math.floor(Math.random() * 5000) + 1000
}));

const Index = () => {
  const [data, setData] = useState(generateData());
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleUpload = () => {
    // Simulating an upload process
    setUploadStatus('uploading');
    setTimeout(() => {
      setData(generateData()); // Regenerate data to simulate new data being loaded
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(null), 3000); // Clear status after 3 seconds
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Monthly Revenue</h2>
          <Button onClick={handleUpload} disabled={uploadStatus === 'uploading'}>
            <Upload className="mr-2 h-4 w-4" /> Upload New Data
          </Button>
        </CardHeader>
        <CardContent>
          {uploadStatus === 'uploading' && (
            <Alert className="mb-4">
              <AlertDescription>Uploading new data...</AlertDescription>
            </Alert>
          )}
          {uploadStatus === 'success' && (
            <Alert className="mb-4">
              <AlertDescription>New data uploaded successfully!</AlertDescription>
            </Alert>
          )}
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;