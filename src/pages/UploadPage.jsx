import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

const UploadPage = () => {
  const [csvData, setCsvData] = useState(null);
  const { toast } = useToast();

  const parseCSV = (text) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim() || '';
        return obj;
      }, {});
    });
    return rows;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const data = parseCSV(text);
          setCsvData(data);
          toast({
            title: "Success",
            description: "CSV file uploaded and parsed successfully.",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to parse CSV file. Please check the file format.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload CSV File</h1>
      <div className="mb-4">
        <label htmlFor="csv-upload" className="cursor-pointer">
          <Button as="span">Upload CSV</Button>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      {csvData && csvData.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">CSV Content</h2>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(csvData[0]).map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {csvData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;