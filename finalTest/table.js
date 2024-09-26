$(document).ready(function() {

    let table = $('#userTable').DataTable();


    fetch('https://jsonplaceholder.typicode.com/users') 

           .then(response =>   response.json())
           .then(data => {

            data.forEach(user => {
                table.row.add(
                    [   user.id,
                        user.name,
                        user.email,
                        user.phone,
                        user.company.name
                    ]).draw(false);

           });
        })
        
        .catch(error => console.error('Error al obtener los Datos', error ));


});
