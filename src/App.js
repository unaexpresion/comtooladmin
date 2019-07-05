import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
const socketClient = require('socket.io-client');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textMessage : ''
        };
        this.socket = socketClient('https://comtool.herokuapp.com');
        //this.socket = socketClient('http://localhost:5000');
    }

    componentDidMount = () => {
        this.socket.on('new.message.for.stores', data => {
            console.log('LLEGO : ', data);
        });
    }

    textMessageHandler = (e) => {
        this.setState({
            textMessage : e.target.value
        });
    }

    sendMessageHandler = () => {
        this.socket.emit('new.message.from.manager', this.state.textMessage);
    }

    render() {
        return (
            <div>
                <section style={{ width: '70%', padding: 0, margin: '0 auto' }}>
                    <div style={{ margin: 8 }}>
                    <Typography variant="h4" gutterBottom>
                        COMTOOL ADMIN
                    </Typography>
                    </div>
                    <div>
                        <TextField
                            id="outlined-full-width"
                            label="Contenido del mensaje"
                            style={{ margin: 8 }}
                            placeholder="Escribe el mensaje que deseas emitir"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            multiline
                            rowsMax={4}
                            onChange={this.textMessageHandler}
                        />
                    </div>
                    <div>
                        <Button
                            style={{ marginLeft: 7, width: 250, height: 50 }}
                            variant="contained"
                            color="primary"
                            onClick={this.sendMessageHandler}
                        >
                            ENVIAR
                            <DeleteIcon style={{ marginLeft: 15 }} />
                        </Button>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
