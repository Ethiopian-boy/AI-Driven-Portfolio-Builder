// src/pages/ResultsPage.jsx
import { jsPDF } from "jspdf";
import { marked } from "marked";
import { useState, useEffect } from 'react';
import { 
  getUserDocuments, 
  generateDocumentUpdates, 
  modifyDocumentField, 
 // downloadModifiedDocument 
} from '../services/api';

const ResultsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedType, setSelectedType] = useState('CV');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await getUserDocuments(token);
        console.log("Fetched documents:", res.data);
        setDocuments(res.data);
        if (res.data && res.data.length > 0) {
          setSelectedDocument(res.data[0]);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    if (token) {
      fetchDocuments();
    }
  }, [token]);

  const handleGenerateRecommendations = async () => {
    console.log("Generate Recommendations button clicked");
    if (!selectedDocument) return;
    setLoading(true);
    try {
      const res = await generateDocumentUpdates(selectedDocument._id, token);
      console.log("Recommendations generated:", res.data);
      const iterations = res.data.iterations;
      let finalOutput = "";
      if (iterations && iterations.length > 0) {
        finalOutput = iterations[iterations.length - 1].content;
      }
      setSelectedDocument(prev => ({ ...prev, generatedCV: finalOutput }));
      alert('Recommendations generated successfully!');
    } catch (error) {
      console.error('Error generating recommendations:', error);
      alert('Error generating recommendations. Check console.');
    }
    setLoading(false);
  };

  const handleModifyDocument = async () => {
    console.log("Modify Document button clicked");
    if (!selectedDocument) return;
    setLoading(true);
    try {
      const res = await modifyDocumentField(selectedDocument._id, selectedType, token);
      console.log("Modify response:", res.data);
      let fieldName;
      if (selectedType === "CV") fieldName = "modifiedCV";
      else if (selectedType === "CoverLetter") fieldName = "modifiedCoverLetter";
      else if (selectedType === "Portfolio") fieldName = "modifiedPortfolio";
      else fieldName = `modified${selectedType}`;
      
      const iterations = res.data.iterations;
      let finalOutput = "";
      if (iterations && iterations.length > 0) {
        finalOutput = iterations[iterations.length - 1].content;
      }
      // Update state with the final output; user can now edit it in the textarea
      setSelectedDocument(prev => ({
        ...prev,
        [fieldName]: finalOutput
      }));
      alert(`${selectedType} modified successfully!`);
    } catch (error) {
      console.error('Error modifying document:', error);
      alert(`Error modifying ${selectedType}. Check console for details.`);
    }
    setLoading(false);
  };

  {/*
  const handleDownloadDocument = async () => {
    console.log("Download Document button clicked");
    if (!selectedDocument) return;
    try {
      const fieldName =
        selectedType === "CV"
          ? "modifiedCV"
          : selectedType === "CoverLetter"
          ? "modifiedCoverLetter"
          : selectedType === "Portfolio"
          ? "modifiedPortfolio"
          : `modified${selectedType}`;
      const modifiedText = selectedDocument[fieldName] || "";
      // Use the latest modifiedText from state to create the PDF.
      // (Alternatively, you could call an API to generate a PDF from this text.)
      const blob = new Blob([modifiedText], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `modified_${selectedType}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading modified document:', error);
      alert(`Error downloading modified ${selectedType}.`);
    }
  };

  // Determine dynamic field name for modified document
  const modifiedField = selectedType === "CV"
    ? "modifiedCV"
    : selectedType === "CoverLetter"
    ? "modifiedCoverLetter"
    : selectedType === "Portfolio"
    ? "modifiedPortfolio"
    : `modified${selectedType}`;
    
*/}
const handleDownloadDocument = async () => {
  if (!selectedDocument) return;
  try {
    // Determine dynamic field name based on selectedType
    const fieldName =
      selectedType === "CV"
        ? "modifiedCV"
        : selectedType === "CoverLetter"
        ? "modifiedCoverLetter"
        : selectedType === "Portfolio"
        ? "modifiedPortfolio"
        : `modified${selectedType}`;
        
    const modifiedText = selectedDocument[fieldName] || "";
    
    if (!modifiedText.trim()) {
      alert("No modified content available to download.");
      return;
    }
    
    // Create a new PDF document
    const doc = new jsPDF();
    doc.setFontSize(12);
    
    // Get page dimensions and set margins
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const maxWidth = pageWidth - margin * 2;
    
    // Split the text into lines that fit within the page width
    const lines = doc.splitTextToSize(modifiedText, maxWidth);
    
    // Define line height (you can adjust this based on your font size)
    const lineHeight = 7;
    let cursorY = margin;
    
    // Loop through the lines and add pages as necessary
    lines.forEach((line) => {
      if (cursorY + lineHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });
    
    // Trigger the download
    doc.save(`modified_${selectedType}.pdf`);
  } catch (error) {
    console.error('Error downloading modified document:', error);
    alert(`Error downloading modified ${selectedType}.`);
  }
};



 // Determine dynamic field name for modified document
  const modifiedField = selectedType === "CV"
    ? "modifiedCV"
    : selectedType === "CoverLetter"
    ? "modifiedCoverLetter"
    : selectedType === "Portfolio"
    ? "modifiedPortfolio"
    : `modified${selectedType}`;


  return (
    <div style={{ padding: '20px', backgroundColor: '#e0e0e0', minHeight: '100vh' }}>
      <h2>Results Page</h2>
      
      {documents.length > 0 && (
        <div>
          <h3>Select a Document:</h3>
          <select
            value={selectedDocument ? selectedDocument._id : ''}
            onChange={(e) => {
              const doc = documents.find(d => d._id === e.target.value);
              setSelectedDocument(doc);
            }}
          >
            {documents.map(doc => (
              <option key={doc._id} value={doc._id}>
                Document {doc._id}
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>Select Document Type to Modify:</h3>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="CV">CV</option>
          <option value="CoverLetter">Cover Letter</option>
          <option value="Portfolio">Portfolio</option>
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button type="button" onClick={handleGenerateRecommendations} disabled={loading || !selectedDocument}>
          {loading ? 'Generating Recommendations...' : 'Generate Recommendations'}
        </button>
      </div>

      {selectedDocument && (
        <div style={{ marginTop: '20px' }}>
          <h3>Recommendations (Generated CV):</h3>
          <textarea
            style={{
              width: '100%',
              minHeight: '150px',
              maxHeight: '150px',
              padding: '10px',
              fontSize: '14px',
              overflowY: 'scroll'
            }}
            value={selectedDocument.generatedCV || ""}
            onChange={(e) =>
              setSelectedDocument(prev => ({ ...prev, generatedCV: e.target.value }))
            }
          />
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button type="button" onClick={handleModifyDocument} disabled={loading || !selectedDocument}>
          {loading ? `Modifying ${selectedType}...` : `Modify ${selectedType}`}
        </button>
      </div>

      {selectedDocument && selectedDocument[modifiedField] !== undefined && (
        <div style={{ marginTop: '20px' }}>
          <h3>Modified {selectedType} (Editable):</h3>
          <textarea
            style={{
              width: '100%',
              minHeight: '150px',
              maxHeight: '150px',
              padding: '10px',
              fontSize: '14px',
              overflowY: 'scroll'
            }}
            value={selectedDocument[modifiedField] || ""}
            onChange={(e) =>
              setSelectedDocument(prev => ({
                ...prev,
                [modifiedField]: e.target.value
              }))
            }
          />
          <div style={{ marginTop: '20px' }}>
            <button type="button" onClick={handleDownloadDocument} style={{ marginTop: '10px' }}>
              Download Modified {selectedType} as PDF
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <a href="/add-portfolio">Add/Update Portfolio Details</a>
      </div>
    </div>
  );
};

export default ResultsPage;
