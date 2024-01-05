<?php
require_once __DIR__ . '/vendor/autoload.php';

//$response = echo base64_decode($str);
//$response = json_decode();

$pdf = new \Mpdf\Mpdf();

$name = strtoupper('ARSHDEEP SINGH');
$invoiceNo = 'R430162';
$issueDate = '01-May-2023';
$paidDate = '01-May-2023';
$invoiceTotal = '750';

//$pdf = new FPDF();
$pdf->AddPage('P', 'A4');
$pdf->SetAutoPageBreak(true, 10);
$pdf->SetFont('Arial', '', 12);
$pdf->SetTopMargin(10);
$pdf->SetLeftMargin(10);
$pdf->SetRightMargin(20);

# Set Logo
$pdf->Image('invoice-logo.png', 156, 10, 40, 40);

# Application Number
$pdf->SetFont('', 'B', 10);
$pdf->SetXY(20, 56);
//$pdf->Text(20, 60, 'Application number: VV00466890');
$pdf->Cell(0,4, 'Application number: VV00466890', 0, 1, 'L');

# Company Details
$pdf->SetXY(10, 56);
$pdf->SetFont('', '', 10);
$pdf->Cell(0,4, 'Ministry of Business, Innovation & Employment', 0, 1, 'R');
$pdf->Cell(0,5, 'Wellington 6140', 0, 1, 'R');
$pdf->Cell(0,5, 'PO Box 3705', 0, 1, 'R');
$pdf->SetFont('', 'B', 10);
$pdf->Cell(0,5, 'GST Number: 109-304-085', 0, 1, 'R');

# Customer Details
$pdf->SetXY(20, 95);
$pdf->SetFont('', '', 10);
$pdf->Cell(0,4, 'Kia ora, '.$name, 0, 1, 'L');

# Invoice Heading & Number
$pdf->Ln(14);
$pdf->SetX(20);
$pdf->SetFont('', 'B', 24);
$pdf->Cell(0,4, 'Tax Invoice', 0, 1, 'L');
$pdf->SetFont('', 'B', 14);
$pdf->Ln(6);
$pdf->SetX(20);
$pdf->Cell(0,4, 'Invoice number: '.$invoiceNo, 0, 2, 'L');

# Invoice Details
$pdf->Ln(10);
$pdf->SetX(20);
$pdf->SetFont('', '', 10);
$pdf->Cell(0,4, 'Invoice issue date: '.$issueDate, 0, 2, 'L');
$pdf->Cell(0,5, 'Invoice paid date: '.$paidDate, 0, 2, 'L');
$pdf->Cell(0,5, 'Currency : New Zealand Dollars', 0, 2, 'L');
$pdf->Cell(0,5, 'Payment method: Credit or debit card', 0, 2, 'L');
$pdf->Cell(0,5, 'Total: NZD $'.$invoiceTotal.'.00', 0, 1, 'L');

# Invoice Iterms
$tblhtml = '<table style="border-collapse: collapse; width: 100%; margin-top: 25px; margin-left: 30px; font-family: Arial; font-size: 13px;">
        <thead>
            <tr>
                <th style="border: 1px solid black; padding: 8px; text-align: left;">Item</th>
                <th style="border: 1px solid black; padding: 8px; text-align: left;">Base</th>
                <th style="border: 1px solid black; padding: 8px; text-align: left;">GST amount</th>
                <th style="border: 1px solid black; padding: 8px; text-align: left;">Waived amount</th>
                <th style="border: 1px solid black; padding: 8px; text-align: left;">Total cost</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">'.$name.' - Visitor - General - Application fee - VV00466386</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">$50.00</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">$7.50</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">$0.00</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">$57.50</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">'.$name.' - Visitor - General - Application fee - VV00466386</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">$30.00</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">$4.50</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">$2.00</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">$32.50</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">'.$name.' - Visitor - General - Application fee - VV00466386</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">$70.00</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">$10.50</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">$5.00</td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;">$75.50</td>
            </tr>
            <!-- New row with colspan 4, bold content, and align right -->
            <tr>
                <td colspan="4" style="border: 1px solid black; padding: 8px; text-align: right;"><strong>Total Amount Paid</strong></td>
                <td style="border: 1px solid black; padding: 8px; text-align: left;"><strong>$750.00</strong></td>
            </tr>
        </tbody>
    </table>';
    
$pdf->Ln(2);
$pdf->SetX(18);
$pdf->SetFont('', '', 10);
$pdf->writeHTML($tblhtml);

# Footer Logo
$pdf->Image('Slice2.png', 20, 275,50);
$pdf->Image('Slice1.png', 150, 278,35);


$pdf->Output();
//var_dump($response);
?>