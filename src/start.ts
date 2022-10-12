import createServer from './server';

const serverConfig = {
  port: 3000 || 3000,
  host: '0.0.0.0',
}

const server = createServer();

const main = async () => {
  try{
    await server.listen(serverConfig);
    console.log(`Server ready at http://${serverConfig.host}:${serverConfig.port}`)
  } catch(err){
    console.error(err);
    process.exit(1);
  }
}

main();