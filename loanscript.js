document.getElementById('calculate-btn').addEventListener('click', function () {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const loanTerm = parseInt(document.getElementById('loan-term').value);
    const annualInterestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
  
    if (isNaN(loanAmount) || isNaN(loanTerm) || isNaN(annualInterestRate)) {
      alert('נא למלא את כל השדות בצורה נכונה.');
      return;
    }
  
    const monthlyInterestRate = annualInterestRate / 12;
    const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) / (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
  
    const tableBody = document.querySelector('#amortization-schedule tbody');
    tableBody.innerHTML = ''; // ניקוי הטבלה
  
    let remainingBalance = loanAmount;
  
    for (let i = 1; i <= loanTerm; i++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
  
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${i}</td>
        <td>${monthlyPayment.toFixed(2)})</td>
        <td>${principalPayment.toFixed(2)}</td>
        <td>${interestPayment.toFixed(2)}</td>
        <td>${remainingBalance.toFixed(2)}</td>
      `;
      tableBody.appendChild(row);

    }
    const table = document.getElementById("amortization-schedule");
        for (let i = 1; i < table.rows.length; i++) {
            let cell = table.rows[i].cells[1]; // העמודה השנייה היא index 1
            let cell2 = table.rows[i].cells[2];
            let cell3 = table.rows[i].cells[3];
            let cell4 = table.rows[i].cells[4];
            let value = parseInt(cell.textContent); // המרת הטקסט למספר
            if (!isNaN(value)) {
                cell.textContent = value.toLocaleString(); // המרת המספר לפורמט מקומי
            }
            value = parseInt(cell2.textContent);
            if (!isNaN(value)) {
              cell2.textContent = value.toLocaleString(); // המרת המספר לפורמט מקומי
          }
          value = parseInt(cell3.textContent);
          if (!isNaN(value)) {
            cell3.textContent = value.toLocaleString(); // המרת המספר לפורמט מקומי
        }
        value = parseInt(cell4.textContent);
        if (!isNaN(value)) {
          cell4.textContent = value.toLocaleString(); // המרת המספר לפורמט מקומי
      }
        }
  });