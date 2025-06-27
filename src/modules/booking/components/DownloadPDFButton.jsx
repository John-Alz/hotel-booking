import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const DownloadPDFButton = ({ bookings }) => {
  const exportPDF = () => {
    const doc = new jsPDF();

    // Columnas de la tabla
    const tableColumn = [
      "No. Reserva",
      "Cliente",
      "Email",
      "Habitación",
      "Check-in",
      "Check-out",
      "Precio total",
      "Estado"
    ];

    // Filas de la tabla
    const tableRows = bookings.map(b => [
      b.bookingNumber ?? '',
      b.client?.name ?? b.name ?? '',
      b.client?.email ?? b.email ?? '',
      b.RoomType?.name ?? '',
      b.checkInDate ?? '',
      b.checkOutDate ?? '',
      `$${b.totalPrice ?? 0}`,
      b.status ?? '',
    ]);

    // Llamada correcta a autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [70, 129, 255] }
    });

    doc.save('reservas.pdf');
  };

  return (
    <Button onClick={exportPDF} className="bg-green-600 text-white">
      <Download className="mr-2" size={18} />
      Descargar PDF
    </Button>
  );
};
