import { Sequelize } from "sequelize";

if (
  !process.env.DB_NAME ||
  !process.env.DB_USER ||
  !process.env.DB_PASS ||
  !process.env.DB_HOST
) {
  console.error("Falta una o más variables de entorno de la base de datos");
  process.exit(1);
}

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: "mysql",
  host: DB_HOST,
  logging: false,
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

export async function database() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida con éxito");

    await sequelize.sync({ force: true });
    console.log("Modelos de base de datos sincronizados correctamente");
  } catch (error) {
    console.error("Error al conectar la base de datos:", error);
    process.exit(1);
  }
}
