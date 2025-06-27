import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const DownloadPDFPaymentsButton = ({ payments }) => {
    const exportPDF = () => {
        const doc = new jsPDF();

        // Columnas del PDF
        const tableColumn = [
            "N. Reserva",
            "Nombre del cliente",
            "Correo del cliente",
            "Fecha del pago",
            "Tipo de habitación",
            "Precio total",
            "Estado"
        ];

        // Filas del PDF
        const tableRows = payments.map(p => [
            p.booking?.reservationNumber ?? '',
            p.booking?.clientId?.username ?? p.booking?.name ?? '',
            p.booking?.clientId?.email ?? p.booking?.email ?? '',
            p.booking?.bookingDate?.slice(0, 10) ?? '',
            p.booking?.roomType?.name ?? '',
            `$${p.booking?.totalPrice ?? 0}`,
            p.status ?? '',
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [70, 129, 255] }
        });

        doc.save('pagos.pdf');
    };

    return (
        <Button onClick={exportPDF} className="bg-green-600 text-white">
            <Download className="mr-2" size={18} />
            Descargar PDF
        </Button>
    );
};
