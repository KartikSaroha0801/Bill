const billForm = document.getElementById('billForm');
const roughBillDiv = document.getElementById('roughBill');

// ... (previous code)

billForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const ownerName = "Super Home Associates";
  const ownerContact = "Mr. Nikhil Mehta\n+91 8587808686";
  const vivekContact = "Mr. Vivek\n+91 8449881720";
  const rent = parseFloat(document.getElementById('rent').value);
  const societyCharge = parseFloat(document.getElementById('societyCharge').value);
  const refundableCheck = document.getElementById('refundableCheck').checked;
  const refundableAmount = parseFloat(document.getElementById('refundableAmount').value);
  const maintenanceCheck = document.getElementById('maintenanceCheck').checked;
  const maintenanceCharges = parseFloat(document.getElementById('maintenanceCharges').value);
  const rentalAgreementCost = parseFloat(document.getElementById('rentalAgreementCost').value); // Get Rental Agreement Cost

  if (isNaN(rent) || isNaN(societyCharge) || isNaN(rentalAgreementCost)) { // Check for NaN values
    alert('Please enter valid numeric values for Rent, Society Charge, and Rental Agreement Cost.');
    return;
  }

  const securityCharges = rent;
  const societyWelcomeCharge = societyCharge;
  const BrokerageCharge = rent / 2;
  const totalCharges = rent + rentalAgreementCost + securityCharges + societyWelcomeCharge + (maintenanceCheck && !isNaN(maintenanceCharges) ? maintenanceCharges : 0);

  roughBillDiv.innerHTML = `
    <h3>Rough Bill</h3>
    <p>${ownerName}</p>
    <p>${ownerContact}</p>
    <p>Security Charges (1 M): Rs. ${securityCharges} (refundable after a minimum of 6 months stay in the flat)</p>
    <p>Society one time Welcome Charge: Rs. ${societyCharge} ${refundableCheck ? `out of which Rs. ${refundableAmount} is refundable.` : ''}</p>
    <p>Rent (1 M): Rs. ${rent}</p>
    ${maintenanceCheck && !isNaN(maintenanceCharges) ? `<p>Maintenance Charges: Rs. ${maintenanceCharges}</p>` : ''}
    <p>Rental Agreement Cost: Rs. ${rentalAgreementCost}</p>
    <p>Brokerage: Rs. ${BrokerageCharge}</p>
    <p><strong>Total Rough Bill: Rs. ${totalCharges}</strong></p>
    <p>${vivekContact}</p>
  `;

  const downloadLink = document.createElement('a');
  downloadLink.innerText = "Download Bill (Image)";
  downloadLink.setAttribute('href', '#');
  downloadLink.addEventListener('click', () => {
    downloadBillAsImage();
  });

  roughBillDiv.appendChild(downloadLink);
});

// ... (remaining code)



document.getElementById('refundableCheck').addEventListener('change', function () {
  const refundableAmountInput = document.getElementById('refundableAmount');
  refundableAmountInput.disabled = !this.checked;
});

document.getElementById('maintenanceCheck').addEventListener('change', function () {
  const maintenanceChargesInput = document.getElementById('maintenanceCharges');
  maintenanceChargesInput.disabled = !this.checked;
});

function downloadBillAsImage() {
  const billContainer = document.getElementById('roughBill');

  html2canvas(billContainer).then((canvas) => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'rough_bill.png';
    link.click();
  });
}
