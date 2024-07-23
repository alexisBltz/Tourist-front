// imagenService.ts
/*import AWS from 'aws-sdk';

// Configuración de AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
});

export const subirImagen = async (file: File): Promise<string> => {
    const params = {
        Bucket: 'your-bucket-name',
        Key: file.name,
        Body: file,
        ContentType: file.type,
        ACL: 'public-read', // Asegura que la imagen sea accesible públicamente
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location); // URL pública del archivo subido
            }
        });
    });
};*/
