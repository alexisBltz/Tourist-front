/*
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Configuración de AWS S3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const subirImagen = async (file: File): Promise<string> => {
    const params = {
        Bucket: 'your-bucket-name',
        Key: file.name,
        Body: file,
        ContentType: file.type,
        ACL: 'public-read', // Asegura que la imagen sea accesible públicamente
    };

    try {
        const command = new PutObjectCommand(params);
        const data = await s3.send(command);
        // URL pública del archivo subido
        return `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error;
    }
};
*/