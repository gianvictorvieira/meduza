const Discord = require('discord.js');
const ytdl = require('ytdl-core')
const client = new Discord.Client();

const token = 'ODg3ODU2Nzk1MDMxMzI2Nzcx.YUKPEw.U6_c3nkaYVaUJrWJetf2PSX02lo'

const prefixo = '!';

const servidores = {
    'server': {
        connection: null,
        dispatacher: null
    }
}

client.on('ready', () =>  {
    console.log('Estou online')
})

client.on('message', async(msg) => {
    //filtro
    if(!msg.guild) return;

    if(!msg.content.startsWith(prefixo)) return;

    if(!msg.member.voice.channel){
        msg.channel.send('Voce precisa estar num canal de voz');
        return;
    }

    //comandos
    if(msg.content === prefixo + 'join'){ //!join
        servidores.server.connection = await msg.member.voice.channel.join();
    }

    if(msg.content === prefixo + 'leave'){ //!join
        await msg.member.voice.channel.leave();
    }

    if (msg.content.startsWith(prefixo + 'play')) { //!play <link>
        let oQueTocar = msg.content.slice(6);
        if(ytdl.validateURL(oQueTocar)){
       servidores.server.dispatacher = servidores.server.connection.play(ytdl(oQueTocar));
        }
        else{
            msg.channel.send('Link Invalido');
        }
    }
    if(msg.content === prefixo + 'pause'){ //!pause
        servidores.server.dispatacher.pause(); 
    }
    if(msg.content === prefixo + 'resume'){ //!resume
        servidores.server.dispatacher.resume(); 
    }
    
});

client.login(token);

client

