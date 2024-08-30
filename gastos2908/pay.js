let payments = [ ];
let balance =  0;
let chart;

function updateBalance() {

    balance = payments.reduce((sum, payment) => sum + payment.amount, 0);
    document.getElementById('balance').textContent = balance.toFixed(2);

}


function displayTransactions() {

    const transactionsList = document.getElementById('transactions');
    transactionsList.innerHTML='';
    payments.forEach(payment => {

        const li = document.createElementById('transactions');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
                        <span>${payment.descrption}</span>
                        <span class="badge bg-primary rounded-pill">${payment.amount.toFixed(2)}</span> 
                        <small>${payment.date.toLocaleString()}</small>  
                        
                        `;

                        transactionsList.appendChild(li);


    });

}

function sortTransactions() {

    const criteria = document.getElementById('sortCriteria').value;
    switch(criteria) {
        case 'dateDesc':
            payments.sort((a, b ) => b.date - a.date );
            break;
        case 'dateAsc':
            payments.sort((a, b ) => a.date - b.date);
            break;

        case 'amountDesc':
            payments.sort((a, b ) =>  b.amount - a.amount ); 
            break;
        
        case 'amountAsc':
            payments.sort((a, b ) =>  a.amount - b.amount );
            break;

    }
    
    displayTransactions();
    updateChart();

}    

function updateChart() {

        const ctx = document.getElementById('expensesChart').getContext('2d');

        const lastPayments = payments.slice(-5).reverse();
        
        const labels = lastPayments.map(p => p.descrption );

        const data = lastPayments.map(p => Math.abs(p.amount));



}


