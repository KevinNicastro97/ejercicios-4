const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let personas = [
    { nombre: "Juan", apellido: "Perez", edad: 30 },
    { nombre: "María", apellido: "López", edad: 25 },
    { nombre: "Carlos", apellido: "González", edad: 35 }
];

app.get('/personas', (req, res) => {
    res.json(personas);
});

app.post('/personas', (req, res) => {
    const { nombre, apellido, edad } = req.body;
    personas.push({ nombre, apellido, edad });
    res.json({ message: 'Persona agregada correctamente' });
});

app.put('/personas/:nombre', (req, res) => {
    const nombrePersona = req.params.nombre;
    const { apellido, edad } = req.body;
    personas.forEach(persona => {
        if (persona.nombre === nombrePersona) {
            persona.apellido = apellido;
            persona.edad = edad;
        }
    });
    res.json({ message: 'Persona actualizada correctamente' });
});

app.delete('/personas/:nombre', (req, res) => {
    const nombrePersona = req.params.nombre;
    personas = personas.filter(persona => persona.nombre !== nombrePersona);
    res.json({ message: 'Persona eliminada correctamente' });
});

app.listen(3000, () => {
    console.log('Servidor Express iniciado en el puerto 3000');
});