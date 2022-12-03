const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");

const db = mysql.createPool({
    host: 'localhost',
    user: 'rodrigo',
    password: 'fatec',
    database: 'wb_database'
});

app.use(cors());
app.use(express.json());

app.post('/novo-cliente', (req, res) => {
    const cliente = req.body;

    let sql = 'INSERT INTO clientes (nome, nomeSocial, genero, cpfValor, cpfData, dataCadastro) values (?, ?, ?, ?, ?, ?)'

    let data = new Date().toISOString().split('T')[0];
    db.query(
        sql,
        [cliente.nome, cliente.nomeSocial, cliente.genero, cliente.cpf.valor, cliente.cpf.data, data],
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                const id = result.insertId;
                cliente.rgList.forEach(rg => {
                    let sql = 'INSERT INTO rgs (valor, data, cliente) VALUES (?, ?, ?)'
                    db.query(
                        sql,
                        [rg.valor, rg.data, id], (err, result) => {
                            if(err) console.log(err)
                        }
                    )
                })
                cliente.telefoneList.forEach(telefone => {
                    let sql = 'INSERT INTO telefones (telefone, cliente) VALUES (?, ?)'
                    db.query(
                        sql,
                        [telefone, id],
                        (err, result) => {
                            if(err) console.log(err)
                        }
                    )
                })
            }
            res.send(result)
        }
    )
});

app.get('/clientes', (req, res) => {
    let sql = 'select id, nome, dataCadastro, genero from clientes';
    db.query(sql, (err, result) => {
        if(err) console.log(err);
        else res.send(result)
    });
});

app.get('/cliente', (req, res) => {
    const { id } = req.query;

    let sql = 'select nome, nomeSocial, genero, cpfValor, cpfData from clientes where id = ?'
    db.query(sql, [id], (err, cliente) => {
        if(err) console.log(err);
        else {
            const { nome, nomeSocial, genero, cpfValor, cpfData } = cliente[0];

            let sql = 'select data, valor from rgs where cliente = ?'
            db.query(sql, [id], (err, rgs) => {
                let sql = 'select telefone from telefones where cliente = ?';
                db.query(sql, [id], (err, telefones) => {
                    res.send({
                        nome,
                        nomeSocial,
                        genero,
                        cpf: {
                            valor: cpfValor,
                            data: cpfData
                        },
                        rgs,
                        telefones: telefones
                    })
                })
            })
        }
    })
});

app.put('/editar-cliente', (req, res) => {
    const {id, nome, nomeSocial, genero, cpf} = req.body
    
    let sql = 'UPDATE clientes SET nome = ?, nomeSocial = ?, genero = ?, cpfValor = ?, cpfData = ? where id = ?'
    db.query(sql, [nome, nomeSocial, genero, cpf.valor, cpf.data, id], (err, result) => {
        if(err) console.log(err)
        else {
            let sqlRG = 'DELETE FROM rgs WHERE cliente = ?'
            db.query(sqlRG, [id], (err) => console.log(err))

                const {rgs} = req.body;
                let sqlRGNEW = 'INSERT INTO rgs (valor, data, cliente) VALUES (?, ?, ?)'
                rgs.forEach(rg => {
                    db.query(sqlRGNEW, [rg.valor, rg.data, id], (err) => {if(err) console.log(err)})
                });
            
            let sqlTEL = 'DELETE FROM telefones WHERE cliente = ?'
            db.query(sqlTEL, [id], (err) => console.log(err))
                const {telefones} = req.body;
                let sqlTELNEW = 'INSERT INTO telefones (telefone, cliente) VALUES (?, ?)'
                telefones.forEach(telefone => {
                    db.query(sqlTELNEW, [telefone, id], (err) => {if(err) console.log(err)});
                });
                res.send(JSON.stringify({result: 'ok'}))
        }
    })
});

app.delete('/deletar-cliente', (req, res) => {
    const { id } = req.query;

    let sql = 'DELETE FROM clientes WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if(err) console.log(err)
        else res.send(result)
        console.log('deletando...')
    });
});

app.post('/novo-produto', (req, res) => {
    const {cod, nome, valor} = req.body;

    let sql = 'INSERT INTO produto (cod, nome, valor) VALUES (?, ?, ?)';
    db.query(sql, [cod, nome, valor], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
});

app.get('/produtos', (req, res) => {
    let sql = 'SELECT * FROM produto'
    db.query(sql, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
});

app.delete('/deletar-produto', (req, res) => {
    const { cod } = req.query;
    let sql = 'DELETE FROM produto WHERE cod = ?'
    db.query(sql, [cod], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})

app.get('/produto', (req, res) => {
    const { cod } = req.query;

    let sql = 'SELECT * FROM produto WHERE cod = ?';
    db.query(sql, [cod], (err, result) => {
        if(err) console.log(err);
        else res.send(result[0]);
    })
});

app.put('/editar-produto', (req, res) => {
    const { cod } = req.query;

    const {nome, valor} = req.body;

    let sql = 'UPDATE produto SET nome =  ?, valor = ? WHERE cod = ?'
    db.query(sql, [nome, valor, cod], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
})

app.post('/novo-servico', (req, res) => {
    const {cod, nome, valor} = req.body;

    let sql = 'INSERT INTO servico (cod, nome, valor) VALUES (?, ?, ?)';
    db.query(sql, [cod, nome, valor], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
});

app.get('/servicos', (req, res) => {
    let sql = 'SELECT * FROM servico'
    db.query(sql, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
});

app.delete('/deletar-servico', (req, res) => {
    const { cod } = req.query;
    let sql = 'DELETE FROM servico WHERE cod = ?'
    db.query(sql, [cod], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})

app.get('/servico', (req, res) => {
    const { cod } = req.query;

    let sql = 'SELECT * FROM servico WHERE cod = ?';
    db.query(sql, [cod], (err, result) => {
        if(err) console.log(err);
        else res.send(result[0]);
    })
});

app.put('/editar-servico', (req, res) => {
    const { cod } = req.query;

    const {nome, valor} = req.body;

    let sql = 'UPDATE servico SET nome =  ?, valor = ? WHERE cod = ?'
    db.query(sql, [nome, valor, cod], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
})

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(4001, () => {
    console.log('Rodando servidor');
});