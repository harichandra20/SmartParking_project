import React, { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import axios from "../common/axios";
import { toast } from "react-toastify";

const SecurityGuard = () => {
  const codeReaderRef = useRef(null);
  const videoRef = useRef(null);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);

  const startScanning = () => {
    if (isScanning) return;

    setIsScanning(true);
    setScanResult(null);
    setError(null);

    // Wait for DOM to update
    const checkVideoElement = setInterval(() => {
      const videoElement = videoRef.current;
      if (videoElement) {
        clearInterval(checkVideoElement);
        initiateScan(videoElement);
      }
    }, 100); // Check every 100ms until video element is available
  };

  const initiateScan = async (videoElement) => {
    try {
      const codeReader = new BrowserQRCodeReader();
      codeReaderRef.current = codeReader;

      if (!videoElement) {
        throw new Error("Video element not found after DOM update");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      videoElement.srcObject = stream;

      await codeReader.decodeFromVideoDevice(
        undefined,
        videoElement,
        (result, error) => {
          if (result) {
            console.log("QR Code detected:", result.getText());
            setScanResult(result.getText());
            stopScanning();
          }
          if (error && !error.name.includes("NotFoundException")) {
            console.error("Scan error:", error);
            setError("Error scanning QR code: " + error.message);
          }
        }
      );
    } catch (err) {
      console.error("Error starting QR scan:", {
        message: err.message,
        stack: err.stack,
        code: err.code,
      });
      setError(err.message || "Failed to start scanner");
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    const codeReader = codeReaderRef.current;
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (codeReader && typeof codeReader.reset === "function") {
      codeReader.reset();
    }
    codeReaderRef.current = null;
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const handleVerify = async () => {
    if (!scanResult) {
      setError("No QR code scanned yet!");
      return;
    }

    try {
      const response = await axios.post("/security-guard/verify-reservation", { qrData: scanResult });
      if (response.data.success) {
        toast.success(response.data.message);
        setScanResult(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Verification error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        stack: err.stack,
      });
      toast.error(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
      {!isScanning && !scanResult && (
        <button
          onClick={startScanning}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Start Scanning
        </button>
      )}
      {isScanning && (
        <div>
          <video
            ref={videoRef}
            style={{ width: "100%", maxWidth: "500px", border: "2px solid black" }}
            autoPlay
            playsInline
          />
          <button
            onClick={stopScanning}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Stop Scanning
          </button>
        </div>
      )}
      {scanResult && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md"> 
          <p className="font-semibold">Scanned Data:</p>
          <pre className="text-sm break-all">{scanResult}</pre>
          <button
            onClick={handleVerify}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Verify Reservation
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default SecurityGuard;