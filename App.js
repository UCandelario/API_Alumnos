const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let alumnos = [];

app.get('/alumnos', (req, res) => {
    res.json({ alumnos: alumnos });
});

app.get('/alumnos/:numcuenta', (req, res) => {
    const numcuenta = req.params.numcuenta;
    const alumno = alumnos.find(a => a.numcuenta === numcuenta);
    
    if (alumno) {
        res.json({ tipo: 'busqueda', alumno: alumno });
    } else {
        res.status(404).json({ tipo: 'error', mensaje: 'Alumno no encontrado' });
    }
});

app.post('/alumnos', (req, res) => {
    const { numcuenta, nombre, semestre } = req.body;

    if (alumnos.some(a => a.numcuenta === numcuenta)) {
        return res.status(400).json({ tipo: 'error', mensaje: 'Ya existe un alumno con ese número de cuenta' });
    }

    const nuevoAlumno = { numcuenta, nombre, semestre };
    alumnos.push(nuevoAlumno);
    res.json({ tipo: 'agregar', alumno: nuevoAlumno });
});

app.put('/alumnos/:numcuenta', (req, res) => {
    const numcuenta = req.params.numcuenta;
    const { nombre, semestre } = req.body;
    
    const indice = alumnos.findIndex(a => a.numcuenta === numcuenta);

    if (indice !== -1) {
        alumnos[indice] = { numcuenta, nombre, semestre };
        res.json({ tipo: 'actualizar', alumno: alumnos[indice] });
    } else {
        res.status(404).json({ tipo: 'error', mensaje: 'Alumno no encontrado' });
    }
});

app.delete('/alumnos/:numcuenta', (req, res) => {
    const numcuenta = req.params.numcuenta;
    const indice = alumnos.findIndex(a => a.numcuenta === numcuenta);

    if (indice !== -1) {
        alumnos.splice(indice, 1);
        res.json({ tipo: 'delete' });
    } else {
        res.status(404).json({ tipo: 'error', mensaje: 'Alumno no encontrado' });
    }
});

app.listen(3000, () => {
    console.log('Servidor de alumnos escuchando en puerto 3000');
});
