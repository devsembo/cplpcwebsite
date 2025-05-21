module.exports = {
    apps: [{
        name: "cplpconnect",           // Nome da aplicação no PM2
        script: "npm",          // Comando a ser executado
        args: "start",          // Argumento (npm start)
    }],
    deploy: {
        production: {
            user: "devsembo",                        
            host: "141.94.244.148",                          
            ref: "origin/main",                       
            repo: "git@github.com:devsembo/cplpcwebsite.git", // Repositório Git
            path: "/var/www/cplpwebsite/",               // Caminho no servidor
            'post-deploy': 'npm install && npm run build && pm2 restart cplpconnect', // Comandos a serem executados após o deploy
        }
    }
};
