import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function ApiDocs(url, app) {
  const config = new DocumentBuilder()
    .setTitle('VaroCRM API')
    .setDescription('VaroCRM API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'Bearer', // This is the name of the security scheme
    )
    .setBasePath('/api/v1')
    .addServer('/api/v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  return SwaggerModule.setup(url, app, document);
}
