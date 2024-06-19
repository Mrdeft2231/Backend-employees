fetch(`jssmena.json`)
    .then(response => response.json())
    .then(jssmena => {
        const tableHtml = `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Месяц</th>
                        <th scope="col">График</th>
                        <th scope="col">Форма</th>
                        <th scope="col">Часы</th>
                    </tr>
                </thead>
                <tbody>
                    ${jssmena.map(item => `
                        <tr>
                            <th scope="row">${item.month}</th>
                            <td>${item.graph}</td>
                            <td>${item.form}</td>
                            <td>${item.time}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        document.getElementById(`smena`).innerHTML = tableHtml;
    });
