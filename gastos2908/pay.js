let payments = [];   
let balance = 0;
let chart;



function updateBalance() {
    balance = payments.reduce((sum, payment) => sum + payment.amount, 0);
    document.getElementById('balance').textContent = balance.toFixed(2);
}

function displayTransactions() {
    const transactionsList = document.getElementById('transactions');
    transactionsList.innerHTML = '';
    payments.forEach(payment => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>${payment.description}</span>
            <span class="badge bg-primary rounded-pill">${payment.amount.toFixed(2)}</span>
            <span class="badge bg-secondary rounded-pill">${payment.category}</span>
            <small>${payment.date.toLocaleString()}</small>
        `;
        transactionsList.appendChild(li);
    });
}

function sortTransactions() {
    const criteria = document.getElementById('sortCriteria').value;
    switch(criteria) {
        case 'dateDesc':
            payments.sort((a, b) => b.date - a.date);
            break;
        case 'dateAsc':
            payments.sort((a, b) => a.date - b.date);
            break;
        case 'amountDesc':
            payments.sort((a, b) => b.amount - a.amount);
            break;
        case 'amountAsc':
            payments.sort((a, b) => a.amount - b.amount);
            break;
    }
    displayTransactions();
    updateChart();
}

function updateChart() {
    const ctx = document.getElementById('expensesChart').getContext('2d');
    const lastPayments = payments.slice(-5).reverse(); // Get last 5 payments

    const labels = lastPayments.map(p => p.description);
    const data = lastPayments.map(p => Math.abs(p.amount)); // Use absolute value for display

    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Gastos',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

function updateAggregateTable() {
    const criteria = document.getElementById('aggregateCriteria').value;
    const aggregateTable = document.getElementById('aggregateTable');
    aggregateTable.innerHTML = '';

    let aggregatedData = {};

    payments.forEach(payment => {
        let key;
        if (criteria === 'category') {
            key = payment.category;
        } else if (criteria === 'month') {
            key = payment.date.toLocaleString('default', { month: 'long', year: 'numeric' });
        }

        if (!aggregatedData[key]) {
            aggregatedData[key] = { total: 0, count: 0 };
        }
        aggregatedData[key].total += payment.amount;
        aggregatedData[key].count++;
    });

    const headerRow = aggregateTable.insertRow();
    headerRow.innerHTML = `<th>${criteria === 'category' ? 'Categoría' : 'Mes'}</th><th>Total</th><th>Cantidad</th><th>Promedio</th>`;

    
    for (const [key, data]  of Object.entries(aggregatedData)) {

        const row = aggregateTable.insertRow();
        const average = data.total / data.count;
        row.innerHTML = `<td>${key}</td><td>${data.total.toFixed(2)}</td><td>${data.count}</td><td>${average.toFixed(2)}</td>`;

    }  

}


    document.getElementById('paymentForm').addEventListener('submit',  function(e) {

        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;


        if (description && !isNaN(amount)  && category  ) {

             payments.push({ description, amount, category, date: new Date()});
             updateBalance();
             sortTransactions();
             updateChart();
             updateAggregateTable();
             this.reset();
             
             

        }

        });

        updateChart();
        updateAggregateTable();
