const form = document.getElementById('tax-form');
const tamount = document.getElementById('tax-amount');

const resultModal = document.getElementById('result-modal');
const errorIcons = document.querySelectorAll(".error-icon");
// Function to validate input and display error messages with tooltips
function validateInput(idx,input, message) {

  if (!input.value || isNaN(input.value)) {
    input.classList.add('error');
    errorIcons[idx].style.display = "block";
    errorIcons[idx].setAttribute('data-tooltip', message);
  } else {
    input.classList.remove('error');
    errorIcons[idx].style.display = 'none';
  }
}

// Function to calculate and display tax information on a new page
function calculateTax(event) {
  event.preventDefault(); // Prevent default form submission
  const grossIncome = parseFloat(document.getElementById('gross-income').value);
  const extraIncome = parseFloat(document.getElementById('extra-income').value) || 0;
  const deductions = parseFloat(document.getElementById('deductions').value) || 0;
  const age = document.getElementById('age').value;
  validateInput(0,document.getElementById('gross-income'), 'Please enter a valid number for Gross Income.');
  validateInput(1,document.getElementById('extra-income'), 'Please enter a valid number for Extra Income .');
  validateInput(2,document.getElementById('deductions'), 'Please enter a valid number for Deductions .');
 
  if (document.querySelectorAll('.error').length > 0) {
    return;
  }
  resultModal.style.display = 'block';
  form.style.display='none';
  const overallincome = grossIncome + extraIncome - deductions;

  let taxableIncome;
  let taxRate;
  let taxAmount;
  if (overallincome <= 8) {
    taxableIncome = 0;
    taxRate = 0;
  } else {
    taxableIncome = overallincome - 8;
    if (age==1) {
      taxRate = 30;
    } 
    else if (age ==2) {
      taxRate = 40;
    } else{
      taxRate = 10;
    }
    taxAmount = taxableIncome * (taxRate / 100)*100000;
  }
    tamount.innerText=taxAmount;
}
// Event listener for form submission
form.addEventListener('submit', calculateTax);

document.getElementById('close-modal').addEventListener('click', function() {
  resultModal.style.display = 'none';
  form.style.display='block';
});


errorIcons.forEach(icon => {
  icon.addEventListener('mouseover', () => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = icon.dataset.tooltip;
    document.body.appendChild(tooltip);
    const tooltipX = icon.getBoundingClientRect().left + window.pageXOffset;
    const tooltipY = icon.getBoundingClientRect().top + window.pageYOffset + icon.offsetHeight;
    tooltip.style.left = tooltipX + 'px';
    tooltip.style.top = tooltipY + 'px';
  });
  icon.addEventListener('mouseout', () => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
  });
});
