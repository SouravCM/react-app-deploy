import React, { useState, useEffect } from "react";
import transporterService from "../../services/TransporterService";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useLocation } from "react-router-dom";

function InvoiceView() {
  const location = useLocation();
  const id = location.state;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPDF();
  }, []);

  const getPDF = async () => {
    try {
      console.log("id- ", id);
      const dnData = await transporterService.getInvoiceReportPFD(id);
      const blob = new Blob([dnData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setData(url);
      console.log("PDF URL:", url);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching PDF:", error);
    }
  };

  return (
    <div>
      {data && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={data}
            defaultScale={1.0}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      )}
    </div>
  );
}

export default InvoiceView;
