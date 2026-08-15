CREATE TABLE `colaboradores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`emailCorporativo` varchar(100) NOT NULL,
	`setor` varchar(80) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `colaboradores_id` PRIMARY KEY(`id`),
	CONSTRAINT `colaboradores_emailCorporativo_unique` UNIQUE(`emailCorporativo`)
);
--> statement-breakpoint
CREATE TABLE `descartes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`colaboradorId` int NOT NULL,
	`tipoResiduo` varchar(80) NOT NULL,
	`pesoEstimadoG` int NOT NULL,
	`dataRegistro` date NOT NULL,
	`observacoes` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `descartes_id` PRIMARY KEY(`id`),
	CONSTRAINT `descartes_peso_positivo_chk` CHECK(`descartes`.`pesoEstimadoG` > 0)
);
--> statement-breakpoint
CREATE TABLE `informativos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tituloTema` varchar(150) NOT NULL,
	`urlDocumento` varchar(255) NOT NULL,
	`dataPublicacao` date NOT NULL,
	CONSTRAINT `informativos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
ALTER TABLE `descartes` ADD CONSTRAINT `descartes_colaboradorId_colaboradores_id_fk` FOREIGN KEY (`colaboradorId`) REFERENCES `colaboradores`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX `colaboradores_setor_idx` ON `colaboradores` (`setor`);--> statement-breakpoint
CREATE INDEX `descartes_colaborador_idx` ON `descartes` (`colaboradorId`);--> statement-breakpoint
CREATE INDEX `descartes_data_idx` ON `descartes` (`dataRegistro`);--> statement-breakpoint
CREATE INDEX `informativos_publicacao_idx` ON `informativos` (`dataPublicacao`);