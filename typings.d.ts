declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;       // URL de conexão com o banco de dados
        SECRET_KEY: string;         // Chave de criptografia para o jwt
        CUSTOMER_ORIGIN: string;    // URL do serviço de consumidor
    }
}
