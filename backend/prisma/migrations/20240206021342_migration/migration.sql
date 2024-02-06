-- CreateTable
CREATE TABLE `transportadoras` (
    `id` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(14) NOT NULL,
    `fantasia` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `transportadoras_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entregas` (
    `id` VARCHAR(191) NOT NULL,
    `id_transportadora` VARCHAR(36) NOT NULL,
    `volumes` INTEGER NOT NULL,
    `nome_remetente` VARCHAR(250) NOT NULL,
    `id_destinatario` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `destinatarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(250) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `endereco` VARCHAR(250) NOT NULL,
    `estado` VARCHAR(100) NOT NULL,
    `cep` VARCHAR(9) NOT NULL,
    `pais` VARCHAR(100) NOT NULL,
    `lat` FLOAT NOT NULL,
    `lng` FLOAT NOT NULL,

    UNIQUE INDEX `destinatarios_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rastreamento` (
    `id` VARCHAR(191) NOT NULL,
    `id_entrega` VARCHAR(36) NOT NULL,
    `message` VARCHAR(250) NOT NULL,
    `date` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `entregas` ADD CONSTRAINT `entregas_id_transportadora_fkey` FOREIGN KEY (`id_transportadora`) REFERENCES `transportadoras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entregas` ADD CONSTRAINT `entregas_id_destinatario_fkey` FOREIGN KEY (`id_destinatario`) REFERENCES `destinatarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rastreamento` ADD CONSTRAINT `rastreamento_id_entrega_fkey` FOREIGN KEY (`id_entrega`) REFERENCES `entregas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
