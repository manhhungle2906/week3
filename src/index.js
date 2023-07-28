<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Municipality Employment Statistics in Finland</title>
  <style>
    /* ... (same CSS as before) ... */
  </style>
</head>
<body>
  <div class="center">
    <h1>Municipality Employment Statistics in Finland</h1>
    <table>
      <thead>
        <tr class="header-row">
          <th>Municipality</th>
          <th>Population</th>
          <th>Employment amount</th>
          <th>Employment-%</th>
        </tr>
      </thead>
      <tbody id="data-body"></tbody>
    </table>
  </div>
  <script>
    // Load data from customer.json and data.json
    let customerFile = "customer.json";
    let dataFile = "data.json";

    fetch(customerFile)
      .then(response => response.json())
      .then(data => {
        const municipalities = data.dataset.dimension.Alue.category.label;
        const populations = data.dataset.value;
        
        fetch(dataFile)
          .then(response => response.json())
          .then(employmentData => {
            const employments = employmentData.dataset.value;
            
            const tableBody = document.getElementById('data-body');
            for (let i = 0; i < municipalities.length; i++) {
              const municipality = municipalities[i];
              const population = populations[i];
              const employmentAmount = employments[i];
              const employmentPercentage = ((employmentAmount / population) * 100).toFixed(2);
              
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${municipality}</td>
                <td>${population}</td>
                <td>${employmentAmount}</td>
                <td>${employmentPercentage}%</td>
              `;
              
              if (employmentPercentage > 45) {
                row.classList.add('employment-over-45');
              } else if (employmentPercentage < 25) {
                row.classList.add('employment-under-25');
              }
              
              tableBody.appendChild(row);
            }
          });
      });
  </script>
</body>
</html>
