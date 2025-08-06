-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 07, 2025 at 12:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ggvc_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cria`
--

CREATE TABLE `cria` (
  `id_cria` int(11) NOT NULL,
  `id_parto` int(11) DEFAULT NULL,
  `fecha_de_nacimiento` date DEFAULT NULL,
  `sexo` enum('Macho','Hembra') DEFAULT NULL,
  `peso_al_nacer` decimal(10,2) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cria`
--

INSERT INTO `cria` (`id_cria`, `id_parto`, `fecha_de_nacimiento`, `sexo`, `peso_al_nacer`, `color`) VALUES
(2, 17, '2025-06-28', 'Macho', 29.80, 'Negro sólido');

-- --------------------------------------------------------

--
-- Table structure for table `defuncion_ganado`
--

CREATE TABLE `defuncion_ganado` (
  `id_defuncion` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_ganado` int(11) DEFAULT NULL,
  `genero` enum('Macho','Hembra') DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `lugar_de_defuncion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `defuncion_ganado`
--

INSERT INTO `defuncion_ganado` (`id_defuncion`, `nombre`, `id_ganado`, `genero`, `fecha`, `lugar_de_defuncion`) VALUES
(2, 'Vaca Linda', 1, 'Hembra', '2025-07-14', 'Potrero Norte'),
(3, 'Vaca Linda', 1, 'Hembra', '2025-07-14', 'Potrero Norte'),
(5, 'Novillo 22', 1, 'Macho', '2025-05-12', 'Clínica veterinaria rural');

-- --------------------------------------------------------

--
-- Table structure for table `descendencias`
--

CREATE TABLE `descendencias` (
  `id_descendencia` int(11) NOT NULL,
  `id_ganado` int(11) NOT NULL,
  `id_madre` int(11) DEFAULT NULL,
  `id_padre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `descendencias`
--

INSERT INTO `descendencias` (`id_descendencia`, `id_ganado`, `id_madre`, `id_padre`) VALUES
(2, 1, 4, 8),
(3, 4, 4, 6),
(4, 5, 7, NULL),
(5, 10, 1, 8);

-- --------------------------------------------------------

--
-- Table structure for table `empleado`
--

CREATE TABLE `empleado` (
  `id_empleado` int(11) NOT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `dni` int(11) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `empleado`
--

INSERT INTO `empleado` (`id_empleado`, `usuario`, `dni`, `nombre`, `email`, `telefono`) VALUES
(3, 'isa123', 1000, 'isabella', 'isa@g.c', '4040404'),
(5, 'user', 123456, 'UserLogin', 'user@gmail.com', '78549621'),
(6, 'Edwin', 1033187160, 'Edison', '10331@gmail.com', '1033187');

-- --------------------------------------------------------

--
-- Table structure for table `enfermedades`
--

CREATE TABLE `enfermedades` (
  `id_diagnostico` int(11) NOT NULL,
  `id_ganado` int(11) DEFAULT NULL,
  `enfermedad` varchar(100) DEFAULT NULL,
  `fecha_diagnostico` date DEFAULT NULL,
  `sintomas` text DEFAULT NULL,
  `tratamiento` text DEFAULT NULL,
  `estado_actual` enum('Recuperado','En tratamiento','Crónico') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ganado`
--

CREATE TABLE `ganado` (
  `id_ganado` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `raza` varchar(50) DEFAULT NULL,
  `sexo` enum('Macho','Hembra') DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `origen` varchar(100) DEFAULT NULL,
  `proposito` enum('Leche','Carne','Reproducción') DEFAULT NULL,
  `estado` enum('Amamantamiento','Prenez','Enfermo','Sano') NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ganado`
--

INSERT INTO `ganado` (`id_ganado`, `nombre`, `raza`, `sexo`, `fecha_nacimiento`, `origen`, `proposito`, `estado`, `descripcion`) VALUES
(1, 'Lunita', 'Holstein', 'Hembra', '2022-03-15', 'Finca Los Álamos', 'Carne', 'Sano', 'Animal tranquilo, buen rendimiento, tiene una mancha con forma de luna en la parte izquierda del lomo, es blanca y café'),
(4, 'Princesa', 'Braham', 'Hembra', NULL, 'Compra', NULL, 'Amamantamiento', ''),
(5, 'ss', 'ss', 'Macho', NULL, 'sss', NULL, 'Amamantamiento', ''),
(6, 'd', 'd', 'Hembra', NULL, 'd', NULL, 'Amamantamiento', ''),
(7, 'fff', 'fff', 'Macho', '2025-07-03', 'fff', 'Reproducción', 'Sano', ''),
(8, 'Thor', 'Sebu', 'Macho', '2019-06-13', 'Inseminacion', 'Reproducción', 'Enfermo', ''),
(9, 'Gacela', 'Pionera', 'Hembra', '2001-12-01', 'Finca Fernando', 'Leche', 'Prenez', ''),
(10, 'Pinto', 'Braham', 'Macho', '2018-05-22', 'Compra', 'Reproducción', 'Sano', 'Toro en buenas condiciones corporales para reproducción tiene una pinta blanca en la cabeza, el restoo es cafe');

-- --------------------------------------------------------

--
-- Table structure for table `mano_de_obra`
--

CREATE TABLE `mano_de_obra` (
  `id_obra` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `id_empleado` int(11) DEFAULT NULL,
  `tipo` enum('Contratada','Prestación de servicios','Otro') DEFAULT NULL,
  `actividad` varchar(100) DEFAULT NULL,
  `duracion` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nuticion`
--

CREATE TABLE `nuticion` (
  `fecha` date NOT NULL,
  `id_ganado` int(11) DEFAULT NULL,
  `tipo_alimento` enum('Suplemento','Concentrado','Sal mineralizada') DEFAULT NULL,
  `nombre_alimento` varchar(100) DEFAULT NULL,
  `cantidad` decimal(10,2) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `empleado` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `palpaciones`
--

CREATE TABLE `palpaciones` (
  `id_palpacion` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `id_ganado` int(11) DEFAULT NULL,
  `hallazgo` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `condicion_corporal` enum('Mala','Regular','Buena','Muy_buena','Excelente') NOT NULL,
  `palpador` varchar(100) NOT NULL,
  `utero` varchar(200) NOT NULL,
  `ovario_izq` varchar(200) NOT NULL,
  `ovario_der` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `palpaciones`
--

INSERT INTO `palpaciones` (`id_palpacion`, `fecha`, `id_ganado`, `hallazgo`, `observaciones`, `condicion_corporal`, `palpador`, `utero`, `ovario_izq`, `ovario_der`) VALUES
(2, '2025-07-29', 5, 'Preñez positiva', 'Se observó actividad uterina normal. Ganado tranquilo durante la evaluación.', 'Buena', 'Dra. Ana Gómez', 'Normal', 'Folículo presente', 'Cuerpo lúteo presente');

-- --------------------------------------------------------

--
-- Table structure for table `parto`
--

CREATE TABLE `parto` (
  `id_parto` int(11) NOT NULL,
  `id_prenez` int(11) DEFAULT NULL,
  `fecha_de_parto` date DEFAULT NULL,
  `problemas` text DEFAULT NULL,
  `observacion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `peso`
--

CREATE TABLE `peso` (
  `fecha` date NOT NULL,
  `peso` decimal(10,2) DEFAULT NULL,
  `id_ganado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plan_sanitario`
--

CREATE TABLE `plan_sanitario` (
  `id_sanidad` int(11) NOT NULL,
  `fecha_aplicacion` date NOT NULL,
  `tipo_actividad` enum('Vacunación','Vitaminización','Desparacitación') DEFAULT NULL,
  `id_ganado` int(11) DEFAULT NULL,
  `dosis` varchar(20) DEFAULT NULL,
  `supervisor` varchar(100) DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plan_sanitario`
--

INSERT INTO `plan_sanitario` (`id_sanidad`, `fecha_aplicacion`, `tipo_actividad`, `id_ganado`, `dosis`, `supervisor`, `observaciones`) VALUES
(3, '2025-07-29', 'Vacunación', 4, '2 ml', 'Carlos Pérez', 'Aplicación de vacuna contra fiebre aftosa. Ganado tranquilo y sin reacciones.');

-- --------------------------------------------------------

--
-- Table structure for table `potreros`
--

CREATE TABLE `potreros` (
  `id_potrero` int(11) NOT NULL,
  `nombre_potrero` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `potreros`
--

INSERT INTO `potreros` (`id_potrero`, `nombre_potrero`) VALUES
(2, 'Potrero amarillo'),
(3, 'Laguito');

-- --------------------------------------------------------

--
-- Table structure for table `preñez`
--

CREATE TABLE `preñez` (
  `id_prenez` int(11) NOT NULL,
  `id_ganado` int(11) DEFAULT NULL,
  `fecha de_hallazgo` date DEFAULT NULL,
  `posible_fecha_de_parto` date DEFAULT NULL,
  `tiempo_de gestación` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `producciones`
--

CREATE TABLE `producciones` (
  `id_produccion` int(11) NOT NULL,
  `id_empleado` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cantidad` decimal(10,2) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `req_BPG`
--

CREATE TABLE `req_BPG` (
  `id_req` int(11) NOT NULL,
  `Id_empleado` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `req_cumplido` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ubicacion`
--

CREATE TABLE `ubicacion` (
  `id_ubicacion` int(11) NOT NULL,
  `id_potrero` int(100) DEFAULT NULL,
  `id_ganado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ubicacion`
--

INSERT INTO `ubicacion` (`id_ubicacion`, `id_potrero`, `id_ganado`) VALUES
(2, 2, 1),
(5, 2, 4),
(6, 2, 4),
(7, 3, 7),
(8, 3, 7),
(9, 3, 8),
(10, 2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario` varchar(50) NOT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `rol` varchar(20) DEFAULT NULL,
  `dni` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`usuario`, `contraseña`, `rol`, `dni`, `nombre`) VALUES
('Edwin', '$2b$10$orxrhxGV1yH7u3TBD4tM6efjb4FLzz7QU5fi6zRiNyImfrZ8nKrSq', 'admin', 1033187160, 'Edison'),
('isa123', 'newPassword', 'admin', 1000, 'isabella'),
('user', '$2b$10$EcLc4VJM5.BCwrcApw8ryeE6.oQiY6QK.t3Ag9Mtf8owFK3a03yRS', 'empleado', 123456, 'UserLogin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cria`
--
ALTER TABLE `cria`
  ADD PRIMARY KEY (`id_cria`);

--
-- Indexes for table `defuncion_ganado`
--
ALTER TABLE `defuncion_ganado`
  ADD PRIMARY KEY (`id_defuncion`),
  ADD KEY `id_ganado` (`id_ganado`);

--
-- Indexes for table `descendencias`
--
ALTER TABLE `descendencias`
  ADD PRIMARY KEY (`id_descendencia`),
  ADD KEY `id_ganado` (`id_ganado`),
  ADD KEY `id_madre` (`id_madre`),
  ADD KEY `id_padre` (`id_padre`);

--
-- Indexes for table `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id_empleado`),
  ADD KEY `usuario` (`usuario`);

--
-- Indexes for table `enfermedades`
--
ALTER TABLE `enfermedades`
  ADD PRIMARY KEY (`id_diagnostico`) USING BTREE,
  ADD KEY `id_ganado` (`id_ganado`);

--
-- Indexes for table `ganado`
--
ALTER TABLE `ganado`
  ADD PRIMARY KEY (`id_ganado`);

--
-- Indexes for table `mano_de_obra`
--
ALTER TABLE `mano_de_obra`
  ADD PRIMARY KEY (`id_obra`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- Indexes for table `nuticion`
--
ALTER TABLE `nuticion`
  ADD PRIMARY KEY (`fecha`),
  ADD KEY `id_ganado` (`id_ganado`);

--
-- Indexes for table `palpaciones`
--
ALTER TABLE `palpaciones`
  ADD PRIMARY KEY (`id_palpacion`),
  ADD KEY `id_ganado` (`id_ganado`);

--
-- Indexes for table `parto`
--
ALTER TABLE `parto`
  ADD PRIMARY KEY (`id_parto`);

--
-- Indexes for table `peso`
--
ALTER TABLE `peso`
  ADD PRIMARY KEY (`fecha`),
  ADD KEY `id_ganado` (`id_ganado`);

--
-- Indexes for table `plan_sanitario`
--
ALTER TABLE `plan_sanitario`
  ADD PRIMARY KEY (`id_sanidad`),
  ADD KEY `id_ganado` (`id_ganado`);

--
-- Indexes for table `potreros`
--
ALTER TABLE `potreros`
  ADD PRIMARY KEY (`id_potrero`);

--
-- Indexes for table `preñez`
--
ALTER TABLE `preñez`
  ADD PRIMARY KEY (`id_prenez`),
  ADD KEY `id_ganado` (`id_ganado`);

--
-- Indexes for table `producciones`
--
ALTER TABLE `producciones`
  ADD PRIMARY KEY (`id_produccion`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- Indexes for table `req_BPG`
--
ALTER TABLE `req_BPG`
  ADD PRIMARY KEY (`id_req`),
  ADD KEY `Id_empleado` (`Id_empleado`);

--
-- Indexes for table `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD PRIMARY KEY (`id_ubicacion`),
  ADD KEY `id_ganado` (`id_ganado`),
  ADD KEY `id_potrero` (`id_potrero`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cria`
--
ALTER TABLE `cria`
  MODIFY `id_cria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `defuncion_ganado`
--
ALTER TABLE `defuncion_ganado`
  MODIFY `id_defuncion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `descendencias`
--
ALTER TABLE `descendencias`
  MODIFY `id_descendencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `empleado`
--
ALTER TABLE `empleado`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `enfermedades`
--
ALTER TABLE `enfermedades`
  MODIFY `id_diagnostico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ganado`
--
ALTER TABLE `ganado`
  MODIFY `id_ganado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `mano_de_obra`
--
ALTER TABLE `mano_de_obra`
  MODIFY `id_obra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `palpaciones`
--
ALTER TABLE `palpaciones`
  MODIFY `id_palpacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `plan_sanitario`
--
ALTER TABLE `plan_sanitario`
  MODIFY `id_sanidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `potreros`
--
ALTER TABLE `potreros`
  MODIFY `id_potrero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `id_ubicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `defuncion_ganado`
--
ALTER TABLE `defuncion_ganado`
  ADD CONSTRAINT `defuncion_ganado_ibfk_1` FOREIGN KEY (`id_ganado`) REFERENCES `ganado` (`id_ganado`);

--
-- Constraints for table `descendencias`
--
ALTER TABLE `descendencias`
  ADD CONSTRAINT `descendencias_ibfk_1` FOREIGN KEY (`id_ganado`) REFERENCES `ganado` (`id_ganado`) ON DELETE CASCADE,
  ADD CONSTRAINT `descendencias_ibfk_2` FOREIGN KEY (`id_madre`) REFERENCES `ganado` (`id_ganado`) ON DELETE SET NULL,
  ADD CONSTRAINT `descendencias_ibfk_3` FOREIGN KEY (`id_padre`) REFERENCES `ganado` (`id_ganado`) ON DELETE SET NULL;

--
-- Constraints for table `enfermedades`
--
ALTER TABLE `enfermedades`
  ADD CONSTRAINT `enfermedades_ibfk_1` FOREIGN KEY (`id_ganado`) REFERENCES `ganado` (`id_ganado`);

--
-- Constraints for table `mano_de_obra`
--
ALTER TABLE `mano_de_obra`
  ADD CONSTRAINT `mano_de_obra_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`);

--
-- Constraints for table `nuticion`
--
ALTER TABLE `nuticion`
  ADD CONSTRAINT `nuticion_ibfk_1` FOREIGN KEY (`id_ganado`) REFERENCES `ganado` (`id_ganado`);

--
-- Constraints for table `palpaciones`
--
ALTER TABLE `palpaciones`
  ADD CONSTRAINT `palpaciones_ibfk_1` FOREIGN KEY (`id_ganado`) REFERENCES `ganado` (`id_ganado`);

--
-- Constraints for table `peso`
--
ALTER TABLE `peso`
  ADD CONSTRAINT `peso_ibfk_1` FOREIGN KEY (`id_ganado`) REFERENCES `ganado` (`id_ganado`);

--
-- Constraints for table `plan_sanitario`
--
ALTER TABLE `plan_sanitario`
  ADD CONSTRAINT `plan_sanitario_ibfk_1` FOREIGN KEY (`id_ganado`) REFERENCES `ganado` (`id_ganado`);

--
-- Constraints for table `preñez`
--
ALTER TABLE `preñez`
  ADD CONSTRAINT `preñez_ibfk_1` FOREIGN KEY (`id_ganado`) REFERENCES `ganado` (`id_ganado`);

--
-- Constraints for table `producciones`
--
ALTER TABLE `producciones`
  ADD CONSTRAINT `producciones_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`);

--
-- Constraints for table `req_BPG`
--
ALTER TABLE `req_BPG`
  ADD CONSTRAINT `req_BPG_ibfk_1` FOREIGN KEY (`Id_empleado`) REFERENCES `empleado` (`id_empleado`);

--
-- Constraints for table `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD CONSTRAINT `ubicacion_ibfk_1` FOREIGN KEY (`id_ganado`) REFERENCES `ganado` (`id_ganado`),
  ADD CONSTRAINT `ubicacion_ibfk_2` FOREIGN KEY (`id_potrero`) REFERENCES `potreros` (`id_potrero`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
