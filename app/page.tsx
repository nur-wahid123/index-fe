"use client";
import { useEffect, useRef, useState } from "react";
import ExcelJS from "exceljs";
import Table from "./(components)/Table";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Home() {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [file, setFile] = useState<FileList | null>(null);
  const [fileData, setFileData] = useState<any[]>([]);
  useEffect(() => {}, [file]);
  const handleDownloadPdf = () => {
    const input = tableRef.current;
    if (!input) {
      return;
    }

    // Use html2canvas to capture the component's HTML
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Convert canvas to image
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "A4",
        putOnlyUsedFonts: true,
      });
      const imgWidth = pdf.internal.pageSize.getWidth(); // Use the full width of the page
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate image height maintaining aspect ratio
      let heightLeft = imgHeight;

      let position = 0;

      // Add the image to the PDF, handling multi-page if needed
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight); // Start at (0,0)
      heightLeft -= pdf.internal.pageSize.getHeight(); // Adjust height left for page size

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save("download.pdf"); // Save the PDF
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(file[0]); // Read file as ArrayBuffer for ExcelJS

    reader.onload = async (event) => {
      const buffer = event.target?.result as ArrayBuffer;

      // Create a new workbook instance
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer); // Load the buffer

      const worksheet = workbook.getWorksheet(1); // Get the first sheet
      const rows: any[] = [];

      // Iterate over rows in the worksheet and extract data
      if (worksheet !== undefined) {
        worksheet.eachRow((row, rowNumber) => {
          const rowData = row.values;
          rows.push(rowData);
        });
      }

      // Save data to state
      setFileData(rows);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
    const doc = new jsPDF();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} method="post">
        <label className="label" htmlFor="file">
          File
        </label>
        <input
          type="file"
          name="file"
          accept=".xls,.xlsx"
          className="file-input file-input-bordered"
          id="file"
          onChange={(e) => setFile(e.target.files)}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <button onClick={handleDownloadPdf} className="btn btn-primary">
        Download PDF
      </button>
      <div className="m-6" ref={tableRef}>
        <Table data={fileData} />
      </div>
    </div>
  );
}
