-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2019. Már 05. 21:10
-- Kiszolgáló verziója: 10.1.37-MariaDB
-- PHP verzió: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `projektmunka`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `adatok`
--

CREATE TABLE `adatok` (
  `Felhasznalo` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_hungarian_ci NOT NULL DEFAULT 'valami@valami.hu',
  `tavolsag` tinyint(4) DEFAULT NULL,
  `adoazonositojel` int(10) NOT NULL,
  `kivehetoszabadsag` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `evesszabadsag`
--

CREATE TABLE `evesszabadsag` (
  `Felhasznalo` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `idoszak` varchar(5) COLLATE utf8_hungarian_ci NOT NULL,
  `db` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `login`
--

CREATE TABLE `login` (
  `Felhasznalo` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `Jelszo` varchar(50) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szabadsagok`
--

CREATE TABLE `szabadsagok` (
  `Felhasznalo` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `nap1` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap2` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap3` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap4` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap5` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap6` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap7` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap8` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap9` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap10` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap11` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap12` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap13` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap14` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap15` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap16` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap17` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap18` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap19` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap20` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap21` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap22` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap23` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap24` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap25` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap26` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap27` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap28` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap29` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap30` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `nap31` varchar(1) COLLATE utf8_hungarian_ci NOT NULL,
  `alairas` tinyint(1) NOT NULL,
  `idoszak` varchar(5) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
