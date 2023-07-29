const billForm = document.getElementById('billForm');
const roughBillDiv = document.getElementById('roughBill');

billForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const ownerName = "Super Home Associates";
    const ownerContact = "Mr. Nikhil Mehta\n+91 8587808686";
    const vivekContact = "Mr. Vivek\n+91 8449881720";
  const rent = parseFloat(document.getElementById('rent').value);
  const maintenanceCharges = parseFloat(document.getElementById('maintenanceCharges').value);

  if (isNaN(rent) || isNaN(maintenanceCharges)) {
    alert('Please enter valid numeric values for Rent and Maintenance Charges.');
    return;
  }

  const securityCharges = rent;
  const societyDeposit = 6000;
  const refundableDeposit = 5000;
  const brokerage = rent / 2;

  const totalTaxes = 0; // Assuming there are no taxes for simplicity
  const totalCharges = rent + maintenanceCharges + securityCharges + societyDeposit + brokerage;


  roughBillDiv.innerHTML = `
    <h3>Rough Bill</h3>
    <p>${ownerName}</p>
    <p>${ownerContact}</p>
    <p>Security Charges (1 M): Rs. ${securityCharges} (refundable after a minimum of 6 months stay in the flat) </p>
    <p>Advance Rent (1 M): Rs. ${rent}</p>
    <p>Society Deposit: Rs. ${societyDeposit} out of which Rs. 5000 is refundable</p>
    <p>Maintenance Charges: Rs. ${maintenanceCharges}</p>
    <p>Brokerage: Rs. ${brokerage}</p>
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


// ... (remaining code) ...
function downloadBillAsImage() {
  const billContainer = document.getElementById('roughBill');

  html2canvas(billContainer).then((canvas) => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'rough_bill.png';
    link.click();
  });
}
