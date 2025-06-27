import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const DownloadPDFCancellationsButton = ({ cancellations }) => {
    const exportPDF = () => {
        const doc = new jsPDF();

        // Columnas de la tabla
        const tableColumn = [
            "N. Reserva",
            "Cliente",
            "Email",
            "Fecha cancelación",
            "Usuario que canceló",
            "Rol",
            "Tipo habitación",
            "Precio total"
        ];

        // Filas de la tabla
        const tableRows = cancellations.map(item => [
            item.boooking?.bookingNumber ?? '',
            item.boooking?.client?.name ?? item.boooking?.name ?? '',
            item.boooking?.client?.email ?? '',
            item.dateOfCancellation ?? '',
            `${item.user?.name ?? ''} ${item.user?.lastName ?? ''}`.trim(),
            item.user?.role?.roleEnum?.toLowerCase() ?? '',
            item.boooking?.RoomType?.name ?? '',
            `$${item.boooking?.totalPrice ?? 0}`
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [70, 129, 255] }
        });

        doc.save('cancelaciones.pdf');
    };

    return (
        <Button onClick={exportPDF} className="bg-green-600 text-white">
            <Download className="mr-2" size={18} />
            Descargar PDF
        </Button>
    );
};
