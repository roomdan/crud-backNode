const { AccesData, CreateData } = require('./https_services')

const http = require('http');
const PORT = 8000;

const defaultResponse ={
    status:200,
    message:'view documentation API for more informaction'
}


http.createServer(async(request, response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*'); //Permitir las solicitudes desde cualquier origen
    response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    response.setHeader('Allow', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');  

    const TasksGet = await AccesData();

    if(request.method === 'GET') {
        switch (request.url) {
            case '/v1/?tasks/':
                response.end(JSON.stringify(TasksGet));
                CreateData({name:'daniel', method:'estoy creando una task'})
                break;
            default:
                response.end('respuesta de get default')
                break;
        }
    }

    else if (request.method === 'POST') {
        switch (request.url) {
            case '/v1/?tasks/':
                request.on('data', (data)=>{
                  response.end(data.toString()); 
                let alt = data.toString();
                alt = JSON.parse(alt);
                CreateData(alt)
                })
                break;
            default:
                response.end(JSON.stringify(defaultResponse))
                break;
        }
    }

    else if (request.method === 'PUT') {
        switch (request.url) {
            case '/v1/?tasks':
                const url = request.url()
                request.on('data', (data)=>{
                    console.log(data);
                })
                break;
            default:
                response.end(JSON.stringify(defaultResponse))
                break;
        }
    }

}).listen(PORT)

