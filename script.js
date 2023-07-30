const billForm = document.getElementById('billForm');
const roughBillDiv = document.getElementById('roughBill');

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

  if (isNaN(rent) || isNaN(societyCharge)) {
    alert('Please enter valid numeric values for Rent and Society Charge.');
    return;
  }

  let totalCharges = rent + societyCharge;

  if (refundableCheck) {
    totalCharges += refundableAmount;
  }

  if (maintenanceCheck && !isNaN(maintenanceCharges)) {
    totalCharges += maintenanceCharges;
  }

  roughBillDiv.innerHTML = `
    <h3>Rough Bill</h3>
    <p>${ownerName}</p>
    <p>${ownerContact}</p>
    <p>Society one time Welcome Charge: Rs. ${societyCharge} ${refundableCheck ? `out of which Rs. ${refundableAmount} is refundable.` : ''}</p>
    <p>Rent (1 M): Rs. ${rent}</p>
    ${maintenanceCheck && !isNaN(maintenanceCharges) ? `<p>Maintenance Charges: Rs. ${maintenanceCharges}</p>` : ''}
    <p>Brokerage: Rs. ${rent / 2}</p>
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
