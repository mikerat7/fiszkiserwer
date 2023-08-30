-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2023 at 04:21 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fiszki`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `fcdata`
--

CREATE TABLE `fcdata` (
  `fcdataID` int(11) NOT NULL,
  `flashcardsID` int(11) NOT NULL,
  `word1` varchar(255) NOT NULL,
  `word2` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `fcgroups`
--

CREATE TABLE `fcgroups` (
  `fcgroupsID` int(11) NOT NULL,
  `groupname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fcgroups`
--

INSERT INTO `fcgroups` (`fcgroupsID`, `groupname`) VALUES
(0, 'clothes'),
(1, 'food'),
(2, 'sports'),
(3, 'traffic'),
(4, 'jobs'),
(5, 'swear words'),
(6, 'city');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `fctype`
--

CREATE TABLE `fctype` (
  `fctypeID` int(11) NOT NULL,
  `flashcardsID` int(11) NOT NULL,
  `fcgroupsID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `flashcards`
--

CREATE TABLE `flashcards` (
  `flashcardsID` int(11) NOT NULL,
  `languageID` int(11) NOT NULL,
  `languageforeignID` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `userID` int(11) NOT NULL,
  `fcgroupsID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `language`
--

CREATE TABLE `language` (
  `languageID` int(11) NOT NULL,
  `languagename` varchar(32) NOT NULL,
  `languagepicture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`languageID`, `languagename`, `languagepicture`) VALUES
(0, 'Polish', 'pl_flag.jpg'),
(1, 'Italian', 'it_flag.jpg'),
(2, 'English', 'en_flag.jpg'),
(3, 'German', 'ge_flag.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` char(255) NOT NULL,
  `profilepic` varchar(255) NOT NULL,
  `email` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `usertoken`
--

CREATE TABLE `usertoken` (
  `usertokenID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `token` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `fcdata`
--
ALTER TABLE `fcdata`
  ADD PRIMARY KEY (`fcdataID`),
  ADD KEY `FK3` (`flashcardsID`);

--
-- Indeksy dla tabeli `fcgroups`
--
ALTER TABLE `fcgroups`
  ADD PRIMARY KEY (`fcgroupsID`);

--
-- Indeksy dla tabeli `fctype`
--
ALTER TABLE `fctype`
  ADD PRIMARY KEY (`fctypeID`),
  ADD KEY `FK4` (`flashcardsID`),
  ADD KEY `FK5` (`fcgroupsID`);

--
-- Indeksy dla tabeli `flashcards`
--
ALTER TABLE `flashcards`
  ADD PRIMARY KEY (`flashcardsID`),
  ADD KEY `FK` (`userID`),
  ADD KEY `FK2` (`languageID`);

--
-- Indeksy dla tabeli `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`languageID`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indeksy dla tabeli `usertoken`
--
ALTER TABLE `usertoken`
  ADD PRIMARY KEY (`usertokenID`),
  ADD KEY `FK6` (`userID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `fcdata`
--
ALTER TABLE `fcdata`
  ADD CONSTRAINT `FK3` FOREIGN KEY (`flashcardsID`) REFERENCES `flashcards` (`flashcardsID`);

--
-- Constraints for table `fctype`
--
ALTER TABLE `fctype`
  ADD CONSTRAINT `FK4` FOREIGN KEY (`flashcardsID`) REFERENCES `flashcards` (`flashcardsID`),
  ADD CONSTRAINT `FK5` FOREIGN KEY (`fcgroupsID`) REFERENCES `fcgroups` (`fcgroupsID`);

--
-- Constraints for table `flashcards`
--
ALTER TABLE `flashcards`
  ADD CONSTRAINT `FK` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `FK2` FOREIGN KEY (`languageID`) REFERENCES `language` (`languageID`);

--
-- Constraints for table `usertoken`
--
ALTER TABLE `usertoken`
  ADD CONSTRAINT `FK6` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
