<?php
require_once __DIR__ . '/vendor/autoload.php';

$userId =  $_GET['userId'];
$invoiceID =  $_GET['invoiceId'];

// Function for data

function getInvoice($user, $id) {


    $curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://appfedsfee.com/api/index.php',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
    "type": "get",
    "param": {
        "task": "userSingleInvoice",
        "data": {
            "user": '.$user.',
            "invoiceId": '.$id.'
        }
    }
}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'Authorization: Bearer KfHqKlhUeEc6eBAc',
    'Cookie: PHPSESSID=57uso1cc8j6glgpdr55ss7nrfo'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
$data = json_decode($response, true);
    return $data;
}

$result = getInvoice($userId, $invoiceID);
//var_dump($result);

$pdf = new \Mpdf\Mpdf();

$clientName = strtoupper($result['result']['user']['user_name']);
$applicationId = strtoupper($result['result']['application']['application_id']);
$invoiceNo = strtoupper($result['result']['invoice']['invoice_number']);
$issueDate = date('d-F-Y', strtotime($result['result']['invoice']['issue_date']));
$paidDate = date('d-F-Y', strtotime($result['result']['invoice']['paid_date']));
$invoiceTotal = '00.00';


//date("d-M-Y", $timestamp)

// Create invoice items table as per category
$tblhtml = '<table style="border-collapse: collapse; width: 100%; margin-top: 25px; margin-left: 30px; font-family: Arial; font-size: 13px;">
        <thead>
            <tr>
                <th style="border: 1px solid black; padding: 6px; text-align: left;">Item</th>
                <th style="border: 1px solid black; padding: 6px; text-align: left;">Base</th>
                <th style="border: 1px solid black; padding: 6px; text-align: left;">GST amount</th>
                <th style="border: 1px solid black; padding: 6px; text-align: left;">Waived amount</th>
                <th style="border: 1px solid black; padding: 6px; text-align: left;">Total cost</th>
            </tr>
        </thead>
        <tbody>';
        
$visaCategory = $result['result']['application']['category'];
        
if($visaCategory == 'Visitor Visa - General'){
    $invoiceTotal = '246.00';
    $tblhtml = $tblhtml .'<tr>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">'.$clientName.' -  Visitor - General - Application fee - '.$applicationId.'</td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">$190.00</td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">$0.00</td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">$0.00</td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">$190.00</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">'.$clientName.' - Visitor - General - Immigration levy - '.$applicationId.'</td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">$21.00</td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">$0.00</td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;"></td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">$21.00</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">Visitor - General - International Visitor Levy (IVL)</td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">$35.00</td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">$0.00</td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;"></td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;">$35.00</td>
            </tr>
            <!-- New row with colspan 4, bold content, and align right -->
            <tr>
                <td colspan="4" style="border: 1px solid black; padding: 6px; text-align: right;"><strong>Total Amount Paid</strong></td>
                <td style="border: 1px solid black; padding: 6px; text-align: left;"><strong>$'.$invoiceTotal.'</strong></td>
            </tr>
        </tbody>
    </table>';
    
}
else if($visaCategory == 'Work Visa - Other'){
    $invoiceTotal = '700.00';
    $tblhtml = $tblhtml .'<tr>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">'.$clientName.' - Work Visa - Other - Application fee - '.$applicationId.'</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">$490.00</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">$0.00</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;"></td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">$490.00</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">'.$clientName.' - Work Visa - Other - Immigration levy - '.$applicationId.'</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">$210.00</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">$0.00</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;"></td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">$210.00</td>
                        </tr>
                        <!-- New row with colspan 4, bold content, and align right -->
                        <tr>
                            <td colspan="4" style="border: 1px solid black; padding: 6px; text-align: right;"><strong>Total Amount Paid</strong></td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;"><strong>$'.$invoiceTotal.'</strong></td>
                        </tr>
                    </tbody>
                </table>';
    
}
else if($visaCategory == 'Work Visa - Accredited Employer'){
    $invoiceTotal = '750.00';
    $tblhtml = $tblhtml .'<tr>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">'.$clientName.' - Work Visa – Accredited Employer - Application fee - '.$applicationId.'</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">$540.00</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">$0.00</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;"></td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">$540.00</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">'.$clientName.' - Work Visa – Accredited Employer - Immigration levy - '.$applicationId.'</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">$210.00</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">$0.00</td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;"></td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;">$210.00</td>
                        </tr>
                        <!-- New row with colspan 4, bold content, and align right -->
                        <tr>
                            <td colspan="4" style="border: 1px solid black; padding: 6px; text-align: right;"><strong>Total Amount Paid</strong></td>
                            <td style="border: 1px solid black; padding: 6px; text-align: left;"><strong>$'.$invoiceTotal.'</strong></td>
                        </tr>
                    </tbody>
                </table>';
    
}
else{
    
}


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
$pdf->Cell(0,4, 'Application number: '.$applicationId, 0, 1, 'L');

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
$pdf->Cell(0,4, 'Kia ora, '.$clientName, 0, 1, 'L');

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
$pdf->Cell(0,5, 'Total: NZD $'.$invoiceTotal, 0, 1, 'L');

# Invoice Items
    
$pdf->Ln(2);
$pdf->SetX(18);
$pdf->SetFont('', '', 10);
$pdf->writeHTML($tblhtml);

# Footer Logo
$pdf->Image('Slice2.png', 20, 275,50);
$pdf->Image('Slice1.png', 150, 278,35);


$pdf->Output();

?>