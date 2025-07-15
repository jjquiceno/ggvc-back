-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 09, 2025 at 09:23 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `defuncion_ganado`
--

CREATE TABLE `defuncion_ganado` (
  `nombre` varchar(50) NOT NULL,
  `id_ganado` int(11) DEFAULT NULL,
  `genero` enum('Macho','Hembra') DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `lugar_de_defuncion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(3, 'isa123', 1000, 'isabella', 'isa@g.c', '4040404');

-- --------------------------------------------------------

--
-- Table structure for table `enfermedades`
--

CREATE TABLE `enfermedades` (
  `id_diagnóstico` int(11) NOT NULL,
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
  `edad` int(11) DEFAULT NULL,
  `origen` varchar(100) DEFAULT NULL,
  `propósito` enum('Leche','Carne','Reproducción') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ganado`
--

INSERT INTO `ganado` (`id_ganado`, `nombre`, `raza`, `sexo`, `fecha_nacimiento`, `edad`, `origen`, `propósito`) VALUES
(1, 'Luna', 'Holstein', 'Hembra', '2022-03-15', 2, 'Finca Los Álamos', 'Leche');

-- --------------------------------------------------------

--
-- Table structure for table `mano_de_obra`
--

CREATE TABLE `mano_de_obra` (
  `fecha` int(11) NOT NULL,
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
  `fecha` date NOT NULL,
  `id_ganado` int(11) DEFAULT NULL,
  `hallazgo` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `fecha_aplicacion` int(11) NOT NULL,
  `tipo_actividad` enum('Vacunación','Vitaminización','Desparacitación') DEFAULT NULL,
  `id_ganado` int(11) DEFAULT NULL,
  `dosis` varchar(100) DEFAULT NULL,
  `supervisor` decimal(10,2) DEFAULT NULL,
  `observaciones` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Table structure for table `ubicación`
--

CREATE TABLE `ubicación` (
  `fecha_ubicación` date NOT NULL,
  `ubicación` varchar(100) DEFAULT NULL,
  `id_ganado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('isa123', 'newPassword', 'admin', 1000, 'isabella');

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
  ADD PRIMARY KEY (`nombre`),
  ADD KEY `id_ganado` (`id_ganado`);

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
  ADD PRIMARY KEY (`id_diagnóstico`),
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
  ADD PRIMARY KEY (`fecha`),
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
  ADD PRIMARY KEY (`fecha`),
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
  ADD PRIMARY KEY (`fecha_aplicacion`),
  ADD KEY `id_ganado` (`id_ganado`);

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
-- Indexes for table `ubicación`
--
ALTER TABLE `ubicación`
  ADD PRIMARY KEY (`fecha_ubicación`),
  ADD KEY `id_ganado` (`id_ganado`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `empleado`
--
ALTER TABLE `empleado`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ganado`
--
ALTER TABLE `ganado`
  MODIFY `id_ganado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `defuncion_ganado`
--
ALTER TABLE `defuncion_ganado`
  ADD CONSTRAINT `defuncion_ganado_ibfk_1` FOREIGN KEY (`id_ganado`) REFERENCES `ganado` (`id_ganado`);

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
-- Constraints for table `ubicación`
--
ALTER TABLE `ubicación`
  ADD CONSTRAINT `ubicación_ibfk_1` FOREIGN KEY (`id_ganado`) REFERENCES `ganado` (`id_ganado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
