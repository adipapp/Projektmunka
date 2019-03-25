-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2019. Már 25. 12:30
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
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `shibbolethid` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `veznev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `kernev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `szuletett` date NOT NULL,
  `email` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `jogosultsag` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `naplozas`
--

CREATE TABLE `naplozas` (
  `shibbolethid` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `datum` datetime NOT NULL,
  `tevekenyseg` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orarend`
--

CREATE TABLE `orarend` (
  `shibbolethid` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `orakezdete` time NOT NULL,
  `oravege` time NOT NULL,
  `tanora` bit(1) NOT NULL COMMENT 'Ha nem tanóra akkor fogadóóra',
  `rendszeres` bit(1) NOT NULL COMMENT 'Hamis, ha egyszeri alkalom',
  `hetnapja` tinyint(7) NOT NULL COMMENT 'A hét melyik napja'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szabadsagok`
--

CREATE TABLE `szabadsagok` (
  `shibbolethid` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `szkezdet` date NOT NULL,
  `szveg` date NOT NULL,
  `tipus` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szabadsagtipus`
--

CREATE TABLE `szabadsagtipus` (
  `tipus` tinyint(11) NOT NULL,
  `megnevezes` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `kiveheto` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `szabadsagtipus`
--

INSERT INTO `szabadsagtipus` (`tipus`, `megnevezes`, `kiveheto`) VALUES
(1, 'Fizetett tárgyévi szabadság', 30),
(2, 'Fizetett előzőévi szabadság', 20),
(3, 'Tanulányi szabadság', 20),
(4, 'Jutalomszabadság', 20),
(5, 'Fizetés nélküli igazolt távollét', 20),
(6, 'Betegség', 20),
(7, 'Igazolatlan távollét', 20),
(8, 'Apanap', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `utazas`
--

CREATE TABLE `utazas` (
  `shibbolethid` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `datum` date NOT NULL,
  `tavolsag` smallint(6) NOT NULL,
  `odavissza` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`shibbolethid`);

--
-- A tábla indexei `naplozas`
--
ALTER TABLE `naplozas`
  ADD KEY `shibbolethid` (`shibbolethid`);

--
-- A tábla indexei `orarend`
--
ALTER TABLE `orarend`
  ADD KEY `shibbolethid` (`shibbolethid`);

--
-- A tábla indexei `szabadsagok`
--
ALTER TABLE `szabadsagok`
  ADD KEY `shibbolethid` (`shibbolethid`),
  ADD KEY `tipus` (`tipus`);

--
-- A tábla indexei `szabadsagtipus`
--
ALTER TABLE `szabadsagtipus`
  ADD PRIMARY KEY (`tipus`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `szabadsagtipus`
--
ALTER TABLE `szabadsagtipus`
  MODIFY `tipus` tinyint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `naplozas`
--
ALTER TABLE `naplozas`
  ADD CONSTRAINT `naplozas_ibfk_1` FOREIGN KEY (`shibbolethid`) REFERENCES `felhasznalok` (`shibbolethid`) ON DELETE CASCADE;

--
-- Megkötések a táblához `orarend`
--
ALTER TABLE `orarend`
  ADD CONSTRAINT `orarend_ibfk_1` FOREIGN KEY (`shibbolethid`) REFERENCES `felhasznalok` (`shibbolethid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `szabadsagok`
--
ALTER TABLE `szabadsagok`
  ADD CONSTRAINT `szabadsagok_ibfk_1` FOREIGN KEY (`shibbolethid`) REFERENCES `felhasznalok` (`shibbolethid`),
  ADD CONSTRAINT `szabadsagok_ibfk_2` FOREIGN KEY (`tipus`) REFERENCES `szabadsagtipus` (`tipus`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
