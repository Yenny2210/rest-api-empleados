const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Configuración de MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL: ' + err.message);
    } else {
        console.log('Conexión exitosa a MySQL');
    }
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas

// CONSULTAR TODOS LOS EMPLEADOS
app.get('/empleados', (req, res) => {
    db.query('SELECT * FROM Empleados', (err, result) => {
        if (err) {
            res.status(500).send('Error al obtener empleados');
        } else {
            res.json(result);
        }
    });
});

// CONSULTAR UN SOLO EMPLEADO
app.get('/empleados/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM empleados WHERE id=?', [id], (err, result) => {
        if (err) {
            res.status(500).send('Error al obtener empleados');
        } else {
            res.json(result);
        }
    });
});

// REGISTRAR EMPLEADO
app.post('/empleados', (req, res) => {
    const { nombre, puesto, salario } = req.body;

    db.query('INSERT INTO empleados (nombre, puesto, salario) VALUES (?, ?, ?)', [nombre, puesto, salario], (err, result) => {
        if (err) {
            res.status(500).send('Error al agregar empleado');
        } else {
            res.send('Empleado agregado correctamente');
        }
    });
});

// MODIFICAR EMPLEADO
app.put('/empleados/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, puesto, salario } = req.body;

    db.query('UPDATE empleados SET nombre=?, puesto=?, salario=? WHERE id=?', [nombre, puesto, salario, id], (err, result) => {
        if (err) {
            res.status(500).send('Error al actualizar empleado');
        } else {
            res.send('Empleado actualizado correctamente');
        }
    });
});

// ELIMINAR EMPLEADO
app.delete('/empleados/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM empleados WHERE id=?', [id], (err, result) => {
        if (err) {
            res.status(500).send('Error al eliminar empleado');
        } else {
            res.send('Empleado eliminado correctamente');
        }
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
