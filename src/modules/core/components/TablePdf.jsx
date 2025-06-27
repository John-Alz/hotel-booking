import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TablePdf = ({ data }) => {
    const exportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = Object.keys(data[0]); // Titulos de columna
        const tableRows = data.map(row => Object.values(row)); // Filas de datos

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
        });

        doc.save('datos.pdf');
    };

    return (
        <button onClick={exportPDF} className="bg-blue-500 text-white px-4 py-2 rounded">
            Descargar PDF
        </button>
    );
};

export default DownloadPDFButton;
